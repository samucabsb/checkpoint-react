import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Star, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { gamesService } from "@/services/games";
import { reviewsService } from "@/services/reviews";

const GameDetail = () => {
  const { id } = useParams();

  const { data: game, isLoading: gameLoading } = useQuery({
    queryKey: ['game', id],
    queryFn: () => gamesService.getById(Number(id)),
    enabled: !!id,
  });

  const { data: reviews = [], isLoading: reviewsLoading } = useQuery({
    queryKey: ['reviews', id],
    queryFn: () => reviewsService.getByGame(Number(id)),
    enabled: !!id,
  });

  const averageRating = reviews.length > 0
    ? (reviews.reduce((sum, r) => sum + r.nota, 0) / reviews.length).toFixed(1)
    : '0.0';

  return (
    <div className="min-h-screen pt-16">
      <main className="max-w-6xl mx-auto px-6 py-10">
        <Link to="/games">
          <Button variant="ghost" className="mb-6 text-muted-foreground hover:text-foreground">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar para Jogos
          </Button>
        </Link>

        {gameLoading ? (
          <div className="text-center py-12 text-muted-foreground">
            Carregando jogo...
          </div>
        ) : !game ? (
          <div className="text-center py-12 text-muted-foreground">
            Jogo não encontrado
          </div>
        ) : (
          <>
            <div className="grid lg:grid-cols-[300px_1fr] gap-8 mb-12">
              {/* Game Cover */}
              <div className="bg-gradient-to-br from-primary to-secondary rounded-xl aspect-[3/4] flex items-center justify-center overflow-hidden">
                {game.tem_imagem ? (
                  <img 
                    src={gamesService.getImageUrl(game.id_jogo)} 
                    alt={game.nm_jogo}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="font-pixel text-xs text-muted-foreground">POSTER</span>
                )}
              </div>

              {/* Game Info */}
              <div>
                <span className="inline-block font-pixel text-xs text-accent mb-3">JOGO #{id}</span>
                <h1 className="font-pixel text-3xl md:text-4xl text-foreground mb-6 leading-relaxed">
                  {game.nm_jogo}
                </h1>

                <div className="flex flex-wrap gap-6 mb-8 text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Star className="w-5 h-5 text-accent" />
                    <span className="font-semibold">{averageRating}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-5 h-5" />
                    <span>{new Date(game.dt_jogo).getFullYear()}</span>
                  </div>
                  <div>
                    <span>{reviews.length} avaliações</span>
                  </div>
                </div>

                <div className="space-y-4 mb-8">
                  <div>
                    <h3 className="font-pixel text-sm text-accent mb-2">Gênero</h3>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1 bg-glass border border-border rounded-lg text-sm text-muted-foreground">
                        {game.genero}
                      </span>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-pixel text-sm text-accent mb-2">Classificação</h3>
                    <span className="px-3 py-1 bg-glass border border-border rounded-lg text-sm text-muted-foreground">
                      {game.classificacao}
                    </span>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Button className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold">
                    Adicionar à Biblioteca
                  </Button>
                  <Button variant="outline" className="border-border hover:bg-muted">
                    Adicionar à Lista
                  </Button>
                </div>
              </div>
            </div>

            {/* Reviews Section */}
            <div>
              <h2 className="font-pixel text-xl text-accent mb-6">Avaliações da Comunidade</h2>
              {reviewsLoading ? (
                <div className="text-center py-8 text-muted-foreground">
                  Carregando avaliações...
                </div>
              ) : reviews.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  Nenhuma avaliação ainda. Seja o primeiro a avaliar!
                </div>
              ) : (
                <div className="space-y-4">
                  {reviews.map((review) => (
                    <div key={review.id_avaliacao} className="bg-glass border border-border rounded-xl p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <div className="font-semibold text-foreground mb-1">{review.nm_usuario}</div>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Star className="w-4 h-4 text-accent fill-accent" />
                              <span>{review.nota.toFixed(1)}</span>
                            </div>
                            <span>•</span>
                            <span>{new Date(review.dt_avaliacao).toLocaleDateString('pt-BR')}</span>
                          </div>
                        </div>
                      </div>
                      <p className="text-muted-foreground leading-relaxed">
                        {review.comentario}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default GameDetail;
