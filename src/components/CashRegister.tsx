import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Printer, Trash2, Plus, X } from "lucide-react";

interface CategoryData {
  id: string;
  name: string;
  icon: string;
  values: number[];
}

const initialCategories: CategoryData[] = [
  { id: "dinheiro", name: "Dinheiro/Espécie", icon: "💵", values: [] },
  { id: "debito", name: "Débito", icon: "💳", values: [] },
  { id: "credito", name: "Crédito", icon: "💳", values: [] },
  { id: "pix", name: "PIX", icon: "📱", values: [] },
  { id: "moeda_social", name: "Moeda Social", icon: "🪙", values: [] },
  { id: "sangria1", name: "Sangria 1", icon: "📤", values: [] },
  { id: "sangria2", name: "Sangria 2", icon: "📤", values: [] },
  { id: "sangria_final", name: "Sangria Final", icon: "📤", values: [] },
  { id: "sangria_motoboy", name: "Sangria Motoboy", icon: "🏍️", values: [] },
  { id: "sangria_especial", name: "Sangria Especial", icon: "⭐", values: [] },
  { id: "despesas", name: "Despesas", icon: "📋", values: [] },
];

const formatCurrency = (value: number): string => {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
};

const CashRegister = () => {
  const [categories, setCategories] = useState<CategoryData[]>(initialCategories);
  const [inputValues, setInputValues] = useState<Record<string, string>>({});

  const handleAddValue = (categoryId: string) => {
    const inputValue = inputValues[categoryId];
    if (!inputValue) return;

    const numValue = parseFloat(inputValue.replace(",", "."));
    if (isNaN(numValue) || numValue <= 0) return;

    setCategories((prev) =>
      prev.map((cat) =>
        cat.id === categoryId
          ? { ...cat, values: [...cat.values, numValue] }
          : cat
      )
    );
    setInputValues((prev) => ({ ...prev, [categoryId]: "" }));
  };

  const handleRemoveValue = (categoryId: string, valueIndex: number) => {
    setCategories((prev) =>
      prev.map((cat) =>
        cat.id === categoryId
          ? { ...cat, values: cat.values.filter((_, idx) => idx !== valueIndex) }
          : cat
      )
    );
  };

  const handleInputChange = (categoryId: string, value: string) => {
    setInputValues((prev) => ({ ...prev, [categoryId]: value }));
  };

  const handleKeyPress = (e: React.KeyboardEvent, categoryId: string) => {
    if (e.key === "Enter") {
      handleAddValue(categoryId);
    }
  };

  const getCategoryTotal = (category: CategoryData): number => {
    return category.values.reduce((sum, val) => sum + val, 0);
  };

  const getGrandTotal = (): number => {
    return categories.reduce((sum, cat) => sum + getCategoryTotal(cat), 0);
  };

  const handleClear = () => {
    setCategories(initialCategories);
    setInputValues({});
  };

  const handlePrint = () => {
    const now = new Date();
    const dateStr = now.toLocaleDateString("pt-BR");
    const timeStr = now.toLocaleTimeString("pt-BR");

    const printContent = `
      <html>
        <head>
          <title>Fechamento de Caixa</title>
          <style>
            @page { margin: 0; size: 80mm auto; }
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body {
              font-family: 'Courier New', Courier, monospace;
              font-size: 10px;
              line-height: 1.3;
              width: 72mm;
              padding: 2mm;
            }
            .header {
              text-align: center;
              padding-bottom: 4px;
              margin-bottom: 4px;
              border-bottom: 1px dashed #000;
            }
            .title {
              font-size: 11px;
              font-weight: bold;
              letter-spacing: 1px;
            }
            .date {
              font-size: 9px;
              margin-top: 2px;
            }
            .items {
              margin: 4px 0;
            }
            .item {
              display: flex;
              justify-content: space-between;
              padding: 2px 0;
              font-size: 9px;
            }
            .item-name {
              max-width: 60%;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
            .item-value {
              text-align: right;
              font-family: 'Courier New', monospace;
            }
            .divider {
              border-top: 1px dashed #000;
              margin: 4px 0;
            }
            .total {
              display: flex;
              justify-content: space-between;
              font-weight: bold;
              font-size: 11px;
              padding: 4px 0;
            }
            .footer {
              text-align: center;
              font-size: 8px;
              margin-top: 6px;
              padding-top: 4px;
              border-top: 1px dashed #000;
            }
          </style>
        </head>
        <body>
          <div class="header">
            <div class="title">FECHAMENTO DE CAIXA</div>
            <div class="date">${dateStr} ${timeStr}</div>
          </div>
          <div class="items">
            ${categories
              .filter((cat) => getCategoryTotal(cat) > 0)
              .map(
                (cat) => `
              <div class="item">
                <span class="item-name">${cat.name}</span>
                <span class="item-value">${formatCurrency(getCategoryTotal(cat))}</span>
              </div>
            `
              )
              .join("")}
          </div>
          <div class="divider"></div>
          <div class="total">
            <span>TOTAL</span>
            <span>${formatCurrency(getGrandTotal())}</span>
          </div>
          <div class="footer">*** FIM ***</div>
        </body>
      </html>
    `;

    const printWindow = window.open("", "_blank");
    if (printWindow) {
      printWindow.document.write(printContent);
      printWindow.document.close();
      printWindow.print();
    }
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-6">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold text-foreground md:text-3xl">
            💰 Fechamento de Caixa
          </h1>
          <p className="mt-1 text-muted-foreground">
            Adicione os valores de cada categoria
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <Card key={category.id} className="overflow-hidden">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center justify-between text-base">
                  <span>
                    {category.icon} {category.name}
                  </span>
                  <span className="text-primary">
                    {formatCurrency(getCategoryTotal(category))}
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex gap-2">
                  <Input
                    type="text"
                    inputMode="decimal"
                    placeholder="0,00"
                    value={inputValues[category.id] || ""}
                    onChange={(e) =>
                      handleInputChange(category.id, e.target.value)
                    }
                    onKeyPress={(e) => handleKeyPress(e, category.id)}
                    className="flex-1"
                  />
                  <Button
                    size="icon"
                    onClick={() => handleAddValue(category.id)}
                    variant="secondary"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                {category.values.length > 0 && (
                  <div className="max-h-24 space-y-1 overflow-y-auto text-sm text-muted-foreground">
                    {category.values.map((val, idx) => (
                      <div key={idx} className="flex items-center justify-between rounded bg-muted px-2 py-1">
                        <span>{formatCurrency(val)}</span>
                        <button
                          onClick={() => handleRemoveValue(category.id, idx)}
                          className="ml-2 rounded p-0.5 text-muted-foreground hover:bg-destructive hover:text-destructive-foreground transition-colors"
                          aria-label="Remover valor"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Summary Panel */}
        <Card className="mt-6 border-primary">
          <CardHeader className="pb-3">
            <CardTitle className="text-center text-xl">📊 Resumo</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-2 text-sm md:grid-cols-2 lg:grid-cols-3">
              {categories.map((cat) => (
                <div
                  key={cat.id}
                  className="flex justify-between rounded bg-muted px-3 py-2"
                >
                  <span>
                    {cat.icon} {cat.name}
                  </span>
                  <span className="font-medium">
                    {formatCurrency(getCategoryTotal(cat))}
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-4 flex justify-between rounded-lg bg-primary px-4 py-3 text-lg font-bold text-primary-foreground">
              <span>TOTAL GERAL</span>
              <span>{formatCurrency(getGrandTotal())}</span>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Button
            onClick={handlePrint}
            size="lg"
            className="flex-1 sm:flex-none"
          >
            <Printer className="mr-2 h-5 w-5" />
            Imprimir Fechamento
          </Button>
          <Button
            onClick={handleClear}
            variant="destructive"
            size="lg"
            className="flex-1 sm:flex-none"
          >
            <Trash2 className="mr-2 h-5 w-5" />
            Limpar / Novo Caixa
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CashRegister;
