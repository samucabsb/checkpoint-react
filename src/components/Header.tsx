// components/Header.tsx
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { authService } from "@/services/auth";
import { LoginModal, RegisterModal } from "@/components/AuthModals";
import { Gamepad2 } from "lucide-react";

export const Header = () => {
  const [user, setUser] = useState(authService.getCurrentUser());
  const [loginOpen, setLoginOpen] = useState(false);
  const [registerOpen, setRegisterOpen] = useState(false);

  // Atualiza o usuário quando faz login
  const handleLoginSuccess = () => {
    setUser(authService.getCurrentUser());
  };

  const handleLogout = () => {
    authService.logout();
    setUser(null);
  };

  useEffect(() => {
    // Inicializa o token no axios
    authService.initializeAuth();
  }, []);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 bg-glass/95 backdrop-blur-md border-b border-border z-40">
        
                <div className="flex items-center gap-3">

        </div>
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
          <Gamepad2 className="w-10 h-10 text-topbar-foreground" />
            <span className="font-pixel text-2xl text-accent">Checkpoint</span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <Link to="/games" className="text-muted-foreground hover:text-foreground transition-colors font-semibold">
              Jogos
            </Link>
            <Link to="/lists" className="text-muted-foreground hover:text-foreground transition-colors font-semibold">
              Listas
            </Link>
            {user && (
              <Link to="/profile" className="text-muted-foreground hover:text-foreground transition-colors font-semibold">
                Perfil
              </Link>
            )}
          </nav>

          <div className="flex items-center gap-4">
            {user ? (
              <>
                <div className="flex items-center gap-3 bg-accent/10 border border-accent/30 rounded-lg px-4 py-2">
                  <User className="w-5 h-5 text-accent" />
                  <span className="text-foreground font-semibold">{user.nm_usuario}</span>
                  {user.tipo_usuario === 'admin' && (
                    <span className="bg-accent text-accent-foreground text-xs px-2 py-1 rounded font-bold">
                      ADMIN
                    </span>
                  )}
                </div>
                <Button
                  onClick={handleLogout}
                  variant="ghost"
                  size="icon"
                  className="text-muted-foreground hover:text-foreground"
                >
                  <LogOut className="w-5 h-5" />
                </Button>
              </>
            ) : (
              <>
                <Button
                  onClick={() => setLoginOpen(true)}
                  variant="ghost"
                  className="text-muted-foreground hover:text-foreground font-semibold"
                >
                  Entrar
                </Button>
                <Button
                  onClick={() => setRegisterOpen(true)}
                  className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold"
                >
                  Criar Conta
                </Button>
              </>
            )}
          </div>
        </div>
      </header>

      <LoginModal
        isOpen={loginOpen}
        onClose={() => setLoginOpen(false)}
        onSwitchToRegister={() => {
          setLoginOpen(false);
          setRegisterOpen(true);
        }}
        onLoginSuccess={handleLoginSuccess}
      />

      <RegisterModal
        isOpen={registerOpen}
        onClose={() => setRegisterOpen(false)}
        onSwitchToLogin={() => {
          setRegisterOpen(false);
          setLoginOpen(true);
        }}
      />
    </>
  );
};