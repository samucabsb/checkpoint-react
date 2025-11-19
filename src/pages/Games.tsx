import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Search, Plus, Edit, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { gamesService, type Game, type CreateGameData } from "@/services/games";

const Games = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [platform, setPlatform] = useState("");
  const [genre, setGenre] = useState("");
  
  // CRUD States
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  
  // Form States
  const [formData, setFormData] = useState<CreateGameData>({
    nm_jogo: "",
    genero: "",
    classificacao: "",
    dt_jogo: "",
  });
  const [imageFile, setImageFile] = useState<File | null>(null);

  const queryClient = useQueryClient();

  const { data: games = [], isLoading } = useQuery({
    queryKey: ['games'],
    queryFn: gamesService.getAll,
  });

  // Create Mutation
  const createMutation = useMutation({
    mutationFn: (data: CreateGameData) => gamesService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['games'] });
      setIsCreateModalOpen(false);
      resetForm();
    },
  });

  // Update Mutation
  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<CreateGameData> }) => 
      gamesService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['games'] });
      setIsEditModalOpen(false);
      resetForm();
    },
  });

  // Delete Mutation
  const deleteMutation = useMutation({
    mutationFn: (id: number) => gamesService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['games'] });
      setIsDeleteModalOpen(false);
      setSelectedGame(null);
    },
  });

  const resetForm = () => {
    setFormData({
      nm_jogo: "",
      genero: "",
      classificacao: "",
      dt_jogo: "",
    });
    setImageFile(null);
    setSelectedGame(null);
  };

  const handleCreate = () => {
    const data: CreateGameData = {
      ...formData,
      img_jogo: imageFile || undefined,
    };
    createMutation.mutate(data);
  };

  const handleEdit = () => {
    if (!selectedGame) return;
    
    const data: Partial<CreateGameData> = {};
    if (formData.nm_jogo) data.nm_jogo = formData.nm_jogo;
    if (formData.genero) data.genero = formData.genero;
    if (formData.classificacao) data.classificacao = formData.classificacao;
    if (formData.dt_jogo) data.dt_jogo = formData.dt_jogo;
    if (imageFile) data.img_jogo = imageFile;

    updateMutation.mutate({ id: selectedGame.id_jogo, data });
  };

  const handleDelete = () => {
    if (!selectedGame) return;
    deleteMutation.mutate(selectedGame.id_jogo);
  };

  const openEditModal = (game: Game) => {
    setSelectedGame(game);
    setFormData({
      nm_jogo: game.nm_jogo,
      genero: game.genero,
      classificacao: game.classificacao,
      dt_jogo: game.dt_jogo.split('T')[0],
    });
    setIsEditModalOpen(true);
  };

  const openDeleteModal = (game: Game) => {
    setSelectedGame(game);
    setIsDeleteModalOpen(true);
  };

  const filteredGames = games.filter((game) => {
    const matchesSearch = game.nm_jogo.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGenre = !genre || game.genero.toLowerCase().includes(genre.toLowerCase());
    return matchesSearch && matchesGenre;
  });

  return (
    <div className="min-h-screen pt-16">
      <main className="max-w-7xl mx-auto px-6 py-10">
        {/* Header with Add Button */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-pixel text-foreground">Jogos</h1>
          <Button 
            onClick={() => setIsCreateModalOpen(true)}
            className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold"
          >
            <Plus className="w-4 h-4 mr-2" />
            Adicionar Jogo
          </Button>
        </div>

        {/* Search Section */}
        <div className="bg-glass border border-border rounded-xl p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Pesquisar jogos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-background border-border"
              />
            </div>
            <Button className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold">
              Pesquisar
            </Button>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Select value={platform} onValueChange={setPlatform}>
              <SelectTrigger className="bg-background border-border">
                <SelectValue placeholder="Plataforma" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pc">PC</SelectItem>
                <SelectItem value="playstation">PlayStation</SelectItem>
                <SelectItem value="xbox">Xbox</SelectItem>
                <SelectItem value="nintendo">Nintendo Switch</SelectItem>
              </SelectContent>
            </Select>

            <Select value={genre} onValueChange={setGenre}>
              <SelectTrigger className="bg-background border-border">
                <SelectValue placeholder="Gênero" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="acao">Ação</SelectItem>
                <SelectItem value="aventura">Aventura</SelectItem>
                <SelectItem value="rpg">RPG</SelectItem>
                <SelectItem value="estrategia">Estratégia</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Games Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoading ? (
            <div className="col-span-full text-center py-12 text-muted-foreground">
              Carregando jogos...
            </div>
          ) : filteredGames.length === 0 ? (
            <div className="col-span-full text-center py-12 text-muted-foreground">
              Nenhum jogo encontrado
            </div>
          ) : (
            filteredGames.map((game) => (
              <div key={game.id_jogo} className="bg-glass border border-border rounded-xl overflow-hidden hover:bg-card-hover hover:border-accent/30 transition-all group">
                <Link to={`/game/${game.id_jogo}`}>
                  <div className="aspect-[3/4] bg-gradient-to-br from-primary to-secondary flex items-center justify-center overflow-hidden">
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
                  <div className="p-4">
                    <h3 className="font-pixel text-xs text-foreground mb-2 leading-relaxed line-clamp-2 group-hover:text-accent transition-colors">
                      {game.nm_jogo}
                    </h3>
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span>{new Date(game.dt_jogo).getFullYear()}</span>
                    </div>
                    <div className="mt-2 text-xs text-muted-foreground">
                      {game.genero} • {game.classificacao}
                    </div>
                  </div>
                </Link>
                
                {/* Admin Actions */}
                <div className="p-4 pt-0 flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={(e) => {
                      e.preventDefault();
                      openEditModal(game);
                    }}
                    className="flex-1"
                  >
                    <Edit className="w-3 h-3 mr-1" />
                    Editar
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={(e) => {
                      e.preventDefault();
                      openDeleteModal(game);
                    }}
                    className="flex-1 text-red-500 hover:text-red-600 hover:border-red-500"
                  >
                    <Trash2 className="w-3 h-3 mr-1" />
                    Deletar
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Create Modal */}
        <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Adicionar Novo Jogo</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="nm_jogo">Nome do Jogo</Label>
                <Input
                  id="nm_jogo"
                  value={formData.nm_jogo}
                  onChange={(e) => setFormData({ ...formData, nm_jogo: e.target.value })}
                  placeholder="Digite o nome do jogo"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="genero">Gênero</Label>
                <Input
                  id="genero"
                  value={formData.genero}
                  onChange={(e) => setFormData({ ...formData, genero: e.target.value })}
                  placeholder="Ex: Ação/Aventura"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="classificacao">Classificação</Label>
                <Input
                  id="classificacao"
                  value={formData.classificacao}
                  onChange={(e) => setFormData({ ...formData, classificacao: e.target.value })}
                  placeholder="Ex: 18+"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="dt_jogo">Data de Lançamento</Label>
                <Input
                  id="dt_jogo"
                  type="date"
                  value={formData.dt_jogo}
                  onChange={(e) => setFormData({ ...formData, dt_jogo: e.target.value })}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="img_jogo">Imagem do Jogo</Label>
                <Input
                  id="img_jogo"
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => {
                  setIsCreateModalOpen(false);
                  resetForm();
                }}
              >
                Cancelar
              </Button>
              <Button
                onClick={handleCreate}
                disabled={createMutation.isPending || !formData.nm_jogo}
                className="bg-accent hover:bg-accent/90"
              >
                {createMutation.isPending ? "Criando..." : "Criar Jogo"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Edit Modal */}
        <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Editar Jogo</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="edit_nm_jogo">Nome do Jogo</Label>
                <Input
                  id="edit_nm_jogo"
                  value={formData.nm_jogo}
                  onChange={(e) => setFormData({ ...formData, nm_jogo: e.target.value })}
                  placeholder="Digite o nome do jogo"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="edit_genero">Gênero</Label>
                <Input
                  id="edit_genero"
                  value={formData.genero}
                  onChange={(e) => setFormData({ ...formData, genero: e.target.value })}
                  placeholder="Ex: Ação/Aventura"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="edit_classificacao">Classificação</Label>
                <Input
                  id="edit_classificacao"
                  value={formData.classificacao}
                  onChange={(e) => setFormData({ ...formData, classificacao: e.target.value })}
                  placeholder="Ex: 18+"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="edit_dt_jogo">Data de Lançamento</Label>
                <Input
                  id="edit_dt_jogo"
                  type="date"
                  value={formData.dt_jogo}
                  onChange={(e) => setFormData({ ...formData, dt_jogo: e.target.value })}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="edit_img_jogo">Nova Imagem (opcional)</Label>
                <Input
                  id="edit_img_jogo"
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => {
                  setIsEditModalOpen(false);
                  resetForm();
                }}
              >
                Cancelar
              </Button>
              <Button
                onClick={handleEdit}
                disabled={updateMutation.isPending}
                className="bg-accent hover:bg-accent/90"
              >
                {updateMutation.isPending ? "Salvando..." : "Salvar Alterações"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Delete Confirmation Modal */}
        <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
          <DialogContent className="sm:max-w-[400px]">
            <DialogHeader>
              <DialogTitle>Confirmar Exclusão</DialogTitle>
            </DialogHeader>
            <div className="py-4">
              <p className="text-sm text-muted-foreground">
                Tem certeza que deseja deletar o jogo <strong>{selectedGame?.nm_jogo}</strong>? 
                Esta ação não pode ser desfeita.
              </p>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => {
                  setIsDeleteModalOpen(false);
                  setSelectedGame(null);
                }}
              >
                Cancelar
              </Button>
              <Button
                onClick={handleDelete}
                disabled={deleteMutation.isPending}
                className="bg-red-500 hover:bg-red-600 text-white"
              >
                {deleteMutation.isPending ? "Deletando..." : "Deletar"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </main>
    </div>
  );
};

export default Games;