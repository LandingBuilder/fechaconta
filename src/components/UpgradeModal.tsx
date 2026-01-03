import { useNavigate } from "react-router-dom";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { AlertCircle, Lock } from "lucide-react";

interface UpgradeModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const UpgradeModal = ({ open, onOpenChange }: UpgradeModalProps) => {
  const navigate = useNavigate();

  const handleUpgrade = () => {
    onOpenChange(false);
    navigate("/plans");
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="max-w-md">
        <AlertDialogHeader>
          <div className="flex items-center gap-2">
            <Lock className="h-5 w-5 text-orange-600" />
            <AlertDialogTitle>Limite de Fechamentos Atingido</AlertDialogTitle>
          </div>
          <AlertDialogDescription className="space-y-3 text-left pt-2">
            <p>
              Você atingiu o limite de fechamentos permitidos para o plano gratuito.
            </p>
            <div className="rounded-lg bg-blue-50 p-3 space-y-2">
              <p className="font-semibold text-blue-900">Upgrade para Premium:</p>
              <ul className="space-y-1 text-sm text-blue-800">
                <li>✓ Fechamentos ilimitados</li>
                <li>✓ Impressão térmica</li>
                <li>✓ Relatórios detalhados</li>
                <li>✓ Suporte prioritário</li>
              </ul>
            </div>
            <p className="text-sm">
              Começe com <span className="font-bold">7 dias grátis</span> de Premium!
            </p>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="flex gap-2 justify-end pt-4">
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={handleUpgrade} className="bg-blue-600 hover:bg-blue-700">
            Fazer Upgrade Agora
          </AlertDialogAction>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default UpgradeModal;
