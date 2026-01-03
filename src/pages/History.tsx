import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { getClosingHistory, ClosingRecord } from "@/lib/closing-service";
import Header from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Download, BarChart3 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const formatCurrency = (value: number): string => {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
};

const formatDate = (date: Date): string => {
  return date.toLocaleDateString("pt-BR", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const formatTime = (date: Date): string => {
  return date.toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  });
};

export const History = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [records, setRecords] = useState<ClosingRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user) return;

    const loadHistory = async () => {
      try {
        setLoading(true);
        const data = await getClosingHistory(user.uid);
        setRecords(data);
      } catch (err) {
        console.error("Erro ao carregar histórico:", err);
        setError("Erro ao carregar histórico de fechamentos");
      } finally {
        setLoading(false);
      }
    };

    loadHistory();
  }, [user]);

  const totalClosings = records.length;
  const totalValue = records.reduce((sum, record) => sum + record.total, 0);
  const averageValue = totalClosings > 0 ? totalValue / totalClosings : 0;

  const handleExportCSV = () => {
    if (records.length === 0) return;

    const headers = ["Data", "Hora", "Total", "Categorias"];
    const rows = records.map((record) => [
      formatDate(record.date),
      formatTime(record.date),
      formatCurrency(record.total),
      JSON.stringify(record.categories),
    ]);

    const csv = [
      headers.join(","),
      ...rows.map((row) => row.map((cell) => `"${cell}"`).join(",")),
    ].join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `fechamentos-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
  };

  if (loading) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-background p-4 md:p-6 flex items-center justify-center">
          <p className="text-muted-foreground">Carregando histórico...</p>
        </div>
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-background p-4 md:p-6">
        <div className="mx-auto max-w-4xl">
          {/* Header */}
          <div className="mb-6 flex items-center justify-between">
            <div>
              <Button
                onClick={() => navigate("/")}
                variant="ghost"
                size="sm"
                className="mb-2"
              >
                <ChevronLeft className="h-4 w-4 mr-1" />
                Voltar
              </Button>
              <h1 className="text-2xl font-bold text-foreground md:text-3xl">
                📊 Histórico de Fechamentos
              </h1>
            </div>
            {records.length > 0 && (
              <Button
                onClick={handleExportCSV}
                size="sm"
                className="bg-green-600 hover:bg-green-700"
              >
                <Download className="h-4 w-4 mr-1" />
                Exportar CSV
              </Button>
            )}
          </div>

          {error && (
            <div className="mb-4 rounded-lg bg-red-50 p-4 text-sm text-red-600">
              {error}
            </div>
          )}

          {/* Stats */}
          {totalClosings > 0 && (
            <div className="grid gap-4 md:grid-cols-3 mb-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Total de Fechamentos
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold">{totalClosings}</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Valor Total
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold">{formatCurrency(totalValue)}</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Média por Fechamento
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold">{formatCurrency(averageValue)}</p>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Records List */}
          {records.length > 0 ? (
            <div className="space-y-3">
              {records.map((record) => (
                <Card key={record.id} className="hover:border-primary/50 transition-colors">
                  <CardContent className="pt-6">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      <div className="space-y-1">
                        <p className="font-semibold">
                          {formatDate(record.date)}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {formatTime(record.date)}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-primary">
                          {formatCurrency(record.total)}
                        </p>
                      </div>
                    </div>
                    {Object.keys(record.categories).length > 0 && (
                      <div className="mt-4 pt-4 border-t">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
                          {Object.entries(record.categories).map(([key, value]) => (
                            <div key={key}>
                              <p className="text-muted-foreground capitalize">
                                {key.replace("_", " ")}
                              </p>
                              <p className="font-medium">
                                {formatCurrency(value as number)}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="border-dashed">
              <CardContent className="py-12 text-center">
                <BarChart3 className="h-12 w-12 mx-auto text-muted-foreground/50 mb-4" />
                <p className="text-muted-foreground mb-2">
                  Nenhum fechamento registrado ainda
                </p>
                <p className="text-sm text-muted-foreground mb-4">
                  Faça seu primeiro fechamento para ver o histórico aqui
                </p>
                <Button onClick={() => navigate("/")} className="bg-blue-600 hover:bg-blue-700">
                  Ir para Fechamento
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </>
  );
};

export default History;
