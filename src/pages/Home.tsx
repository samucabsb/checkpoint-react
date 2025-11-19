import { Button } from "@/components/ui/button";
import { ArrowRight, Star, Users, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/20 to-background" />
        
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <div className="inline-block mb-6 px-5 py-2 bg-accent/20 border-2 border-accent rounded-full">
            <span className="font-bold text-xs text-accent tracking-wider uppercase">
              Sua jornada começa aqui
            </span>
          </div>
          
          <h1 className="font-pixel text-xl md:text-3xl lg:text-4xl text-foreground mb-8 leading-relaxed">
            <div className="mb-4">Gerencie seus jogos,</div>
            <div className="mb-4">Compartilhe suas conquistas,</div>
            <div className="text-accent">Conecte-se com gamers</div>
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto font-medium">
            O Checkpoint é sua plataforma definitiva para organizar, descobrir e compartilhar 
            sua paixão por jogos.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/games">
              <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground font-bold px-8 py-6 text-base">
                Explorar Jogos
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/lists">
              <Button size="lg" variant="outline" className="border-2 border-accent text-accent hover:bg-accent/10 font-bold px-8 py-6 text-base">
                Ver Listas
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-pixel text-2xl text-center text-accent mb-16">
            Por que Checkpoint?
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-glass border border-border rounded-xl p-8 hover:bg-card-hover transition-all">
              <div className="w-14 h-14 bg-accent/20 rounded-lg flex items-center justify-center mb-6">
                <Star className="w-7 h-7 text-accent" />
              </div>
              <h3 className="font-pixel text-sm text-foreground mb-4">
                Organize Sua Coleção
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Mantenha controle de todos os jogos que você possui, está jogando ou quer jogar.
              </p>
            </div>

            <div className="bg-glass border border-border rounded-xl p-8 hover:bg-card-hover transition-all">
              <div className="w-14 h-14 bg-accent/20 rounded-lg flex items-center justify-center mb-6">
                <Users className="w-7 h-7 text-accent" />
              </div>
              <h3 className="font-pixel text-sm text-foreground mb-4">
                Crie Listas
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Monte listas personalizadas e compartilhe suas recomendações com a comunidade.
              </p>
            </div>

            <div className="bg-glass border border-border rounded-xl p-8 hover:bg-card-hover transition-all">
              <div className="w-14 h-14 bg-accent/20 rounded-lg flex items-center justify-center mb-6">
                <TrendingUp className="w-7 h-7 text-accent" />
              </div>
              <h3 className="font-pixel text-sm text-foreground mb-4">
                Acompanhe Progresso
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Veja estatísticas detalhadas do seu perfil gamer e conquistas ao longo do tempo.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
