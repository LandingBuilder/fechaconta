import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { usePlan } from "@/contexts/PlanContext";
import { Button } from "@/components/ui/button";
import { LogOut, Settings, Crown, History } from "lucide-react";

const Header = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { isPremium } = usePlan();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const handleNavigatePlans = () => {
    navigate("/plans");
  };

  const handleNavigateHistory = () => {
    navigate("/history");
  };

  return (
    <header className="border-b bg-white">
      <div className="mx-auto max-w-4xl px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-bold">💰 Fecha-Caixa</h1>
          {isPremium && (
            <span className="flex items-center gap-1 rounded-full bg-amber-100 px-2 py-1 text-xs font-semibold text-amber-800">
              <Crown className="h-3 w-3" />
              Premium
            </span>
          )}
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <span className="text-sm text-muted-foreground hidden sm:inline">
            {user?.email}
          </span>
          <Button
            onClick={handleNavigateHistory}
            size="sm"
            variant="outline"
            title="Ver histórico de fechamentos"
          >
            <History className="h-4 w-4" />
            <span className="hidden sm:inline ml-1">Histórico</span>
          </Button>
          {!isPremium && (
            <Button
              onClick={handleNavigatePlans}
              size="sm"
              className="bg-blue-600 hover:bg-blue-700 hidden sm:flex"
            >
              <Crown className="h-4 w-4 mr-1" />
              Upgrade
            </Button>
          )}
          <Button
            onClick={handleLogout}
            size="sm"
            variant="outline"
          >
            <LogOut className="h-4 w-4" />
            <span className="hidden sm:inline ml-1">Sair</span>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
