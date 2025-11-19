import { Link } from "react-router-dom";
import { Clock, Heart } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { listsService } from "@/services/lists";

const Lists = () => {
  const { data: lists = [], isLoading } = useQuery({
    queryKey: ['lists'],
    queryFn: listsService.getAll,
  });
  return (
    <div className="min-h-screen pt-16">
      <main className="max-w-7xl mx-auto px-6 py-10">
        <div className="mb-8">
          <h1 className="font-pixel text-2xl text-accent mb-2">Listas da Comunidade</h1>
          <p className="text-muted-foreground">Descubra coleções curadas por outros jogadores</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoading ? (
            <div className="col-span-full text-center py-12 text-muted-foreground">
              Carregando listas...
            </div>
          ) : lists.length === 0 ? (
            <div className="col-span-full text-center py-12 text-muted-foreground">
              Nenhuma lista encontrada
            </div>
          ) : (
            lists.map((list) => (
              <Link key={list.id_lista} to={`/list/${list.id_lista}`}>
                <div className="bg-glass border border-border rounded-xl overflow-hidden hover:bg-card-hover hover:border-accent/30 transition-all group">
                  <div className="flex h-44">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className="flex-1 bg-gradient-to-br from-primary to-secondary flex items-center justify-center border-r border-border last:border-r-0"
                      >
                        <span className="font-pixel text-[8px] text-muted-foreground">{i}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="p-5 bg-glass border-t border-border">
                    <h3 className="font-pixel text-sm text-accent mb-3 leading-relaxed line-clamp-2 group-hover:text-accent/80 transition-colors">
                      {list.nm_lista}
                    </h3>
                    
                    <div className="space-y-2 text-sm text-muted-foreground">
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-foreground">{list.nm_usuario}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>{list.total_jogos} jogos</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>
      </main>
    </div>
  );
};

export default Lists;
