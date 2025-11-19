import { useState } from "react";
import { User, Library, Heart, Trophy } from "lucide-react";

const tabs = [
  { id: "overview", label: "Visão Geral", icon: User },
  { id: "library", label: "Biblioteca", icon: Library },
  { id: "lists", label: "Minhas Listas", icon: Heart },
  { id: "achievements", label: "Conquistas", icon: Trophy },
];

const Profile = () => {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="min-h-screen pt-16">
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-72 bg-glass border-r border-border sticky top-16 h-[calc(100vh-4rem)] p-6">
          <nav className="space-y-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-5 py-3 rounded-lg font-semibold text-sm transition-all ${
                    activeTab === tab.id
                      ? "bg-primary/30 text-foreground border-2 border-accent/30"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-10 max-w-6xl">
          {activeTab === "overview" && (
            <div>
              <div className="relative h-48 bg-gradient-to-br from-primary to-secondary rounded-xl mb-20 overflow-hidden">
                <div className="absolute -bottom-16 left-10 w-32 h-32 bg-glass border-4 border-background rounded-full flex items-center justify-center">
                  <User className="w-16 h-16 text-accent" />
                </div>
              </div>

              <div className="mb-12">
                <h1 className="font-pixel text-2xl text-foreground mb-2">João Silva</h1>
                <p className="text-muted-foreground">@joaosilva • Membro desde 2024</p>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                {[
                  { label: "Jogos na Biblioteca", value: "127" },
                  { label: "Horas Jogadas", value: "1,432" },
                  { label: "Listas Criadas", value: "8" },
                  { label: "Conquistas", value: "342" },
                ].map((stat) => (
                  <div key={stat.label} className="bg-glass border border-border rounded-xl p-6 text-center">
                    <div className="font-pixel text-2xl text-accent mb-2">{stat.value}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </div>
                ))}
              </div>

              <div>
                <h2 className="font-pixel text-lg text-accent mb-6">Jogos Recentes</h2>
                <div className="grid sm:grid-cols-3 gap-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="bg-glass border border-border rounded-xl overflow-hidden hover:border-accent/30 transition-all">
                      <div className="aspect-video bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                        <span className="font-pixel text-xs text-muted-foreground">GAME {i}</span>
                      </div>
                      <div className="p-4">
                        <div className="font-pixel text-xs text-foreground mb-1">Game Title {i}</div>
                        <div className="text-sm text-muted-foreground">12h jogadas</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "library" && (
            <div>
              <h2 className="font-pixel text-xl text-accent mb-6">Minha Biblioteca</h2>
              <p className="text-muted-foreground">Gerencie todos os seus jogos aqui.</p>
            </div>
          )}

          {activeTab === "lists" && (
            <div>
              <h2 className="font-pixel text-xl text-accent mb-6">Minhas Listas</h2>
              <p className="text-muted-foreground">Veja e edite suas listas personalizadas.</p>
            </div>
          )}

          {activeTab === "achievements" && (
            <div>
              <h2 className="font-pixel text-xl text-accent mb-6">Conquistas</h2>
              <p className="text-muted-foreground">Acompanhe suas conquistas e troféus.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Profile;
