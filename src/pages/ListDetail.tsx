import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { listsService } from "@/services/lists";
import { gamesService } from "@/services/games";

const ListDetail = () => {
  const { id } = useParams();

  const { data: list, isLoading } = useQuery({
    queryKey: ['list', id],
    queryFn: () => listsService.getById(Number(id)),
    enabled: !!id,
  });

  return (
    <div className="min-h-screen pt-16">
      <main className="max-w-5xl mx-auto px-6 py-10">
        <Link to="/lists">
          <Button variant="ghost" className="mb-6 text-muted-foreground hover:text-foreground">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar para Listas
          </Button>
        </Link>

        {isLoading ? (
          <div className="text-center py-12 text-muted-foreground">
            Carregando lista...
          </div>
        ) : !list ? (
          <div className="text-center py-12 text-muted-foreground">
            Lista não encontrada
          </div>
        ) : (
          <>
            <div className="text-center mb-12 pb-8 border-b border-border">
              <span className="inline-block font-pixel text-xs text-accent mb-3">LISTA #{id}</span>
              <h1 className="font-pixel text-2xl md:text-3xl text-accent mb-4 leading-relaxed">
                {list.nm_lista}
              </h1>
              <p className="text-lg text-muted-foreground mb-6">Por {list.nm_usuario}</p>
              
              <div className="flex items-center justify-center gap-8 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <span className="font-semibold">{list.jogos?.length || 0} jogos</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              {list.jogos && list.jogos.length > 0 ? (
                list.jogos.map((game, index) => (
                  <Link key={game.id_jogo} to={`/game/${game.id_jogo}`}>
                    <div className="bg-glass border border-border rounded-xl p-6 hover:bg-card-hover hover:border-accent/30 transition-all group flex items-center gap-6">
                      <div className="font-pixel text-2xl text-accent/50 w-12 text-center">
                        {index + 1}
                      </div>
                      
                      <div className="w-24 h-32 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden">
                        {game.tem_imagem ? (
                          <img 
                            src={gamesService.getImageUrl(game.id_jogo)} 
                            alt={game.nm_jogo}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <span className="font-pixel text-[8px] text-muted-foreground">POSTER</span>
                        )}
                      </div>
                      
                      <div className="flex-1">
                        <h3 className="font-pixel text-sm text-foreground mb-2 group-hover:text-accent transition-colors">
                          {game.nm_jogo}
                        </h3>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span>{game.dt_jogo ? new Date(game.dt_jogo).getFullYear() : 'N/A'}</span>
                          <span>{game.genero}</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))
              ) : (
                <div className="text-center py-12 text-muted-foreground">
                  Esta lista ainda não tem jogos
                </div>
              )}
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default ListDetail;
