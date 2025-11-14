// src/components/home/ActivitySection.jsx
import { useEffect, useState } from "react";
import { getAvaliacoes } from "../../services/avaliacoesService";

export default function ActivitySection() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    async function load() {
      try {
        const data = await getAvaliacoes(); // pega todas as avaliações
        if (!mounted) return;
        // Ordena por data desc e pega 6 itens (ajuste conforme sua preferência)
        const sorted = data.sort((a, b) => new Date(b.data_avaliacao) - new Date(a.data_avaliacao));
        setActivities(sorted.slice(0, 6));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    load();
    return () => (mounted = false);
  }, []);

  if (loading) {
    return (
      <section className="activity-section">
        <div className="section-header">
          <h2 className="section-title">Atividade Recente</h2>
          <p className="section-subtitle">Carregando...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="activity-section">
      <div className="section-header">
        <h2 className="section-title">Atividade Recente</h2>
        <p className="section-subtitle">Veja o que a comunidade está fazendo</p>
      </div>

      <div className="activity-list">
        {activities.length === 0 && <p className="text-gray-200">Nenhuma atividade recente.</p>}
        {activities.map((a) => (
          <div key={a.id_avaliacao} className="activity-card">
            <div className="activity-user">
              <div className="activity-avatar">👤</div>
              <span className="activity-username">{a.id_usuario /* substituir por nome se o endpoint retornar */}</span>
            </div>
            <p className="activity-action">
              Avaliou <span className="activity-game">{a.id_jogo}</span> com {a.nota} estrelas!
            </p>
            <span className="activity-timestamp">{new Date(a.data_avaliacao).toLocaleString()}</span>
          </div>
        ))}
      </div>

      <button className="view-more-btn">Ver Atividade Completa</button>
    </section>
  );
}
