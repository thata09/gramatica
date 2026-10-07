import React, { useState } from 'react';
import { quickTips } from '../data/quickTips';
import { 
  Lightbulb, 
  CheckCircle2, 
  Ban, 
  AlertTriangle, 
  Wind, 
  ShieldAlert, 
  HelpCircle,
  Sparkles
} from 'lucide-react';

export default function QuickTipsView() {
  const [activeCategory, setActiveCategory] = useState('todas');

  const categories = [
    { id: 'todas', label: 'Todas as Dicas' },
    { id: 'Pode usar', label: '✓ Pode Usar', cor: 'var(--success)' },
    { id: 'Não pode usar', label: '🚫 Não Pode Usar', cor: 'var(--danger)' },
    { id: 'Cuidado', label: '⚠️ Cuidado (Pegadinhas)', cor: 'var(--warning)' }
  ];

  const filteredTips = quickTips.filter(tip => {
    if (activeCategory === 'todas') return true;
    return tip.categoria === activeCategory;
  });

  const getBadgeClass = (categoria) => {
    switch (categoria) {
      case 'Pode usar': return 'badge-success';
      case 'Não pode usar': return 'badge-danger';
      case 'Cuidado': return 'badge-warning';
      default: return 'badge-primary';
    }
  };

  const getCardCategoryClass = (categoria) => {
    switch (categoria) {
      case 'Pode usar': return 'categoria-pode';
      case 'Não pode usar': return 'categoria-nao-pode';
      case 'Cuidado': return 'categoria-cuidado';
      default: return '';
    }
  };

  return (
    <div className="quick-tips-page-container">
      {/* Cabeçalho */}
      <div className="section-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
          <span className="badge badge-warning">
            <Lightbulb size={14} /> Flashcards Rápidos
          </span>
          <span className="badge badge-primary">
            Memorização Ágil
          </span>
        </div>
        <h2 className="section-title">Dicas Rápidas de Pontuação</h2>
        <p className="section-desc">
          Cards didáticos diretos ao ponto para consulta rápida antes de simulados e redações. 
          Filtre por regras permitidas, proibições e alertas de atenção.
        </p>
      </div>

      {/* Filtros por Categoria Solicitada */}
      <div className="category-filter-pills" style={{ marginBottom: '2rem' }}>
        {categories.map(cat => (
          <button
            key={cat.id}
            className={`filter-pill-btn ${activeCategory === cat.id ? 'active' : ''}`}
            onClick={() => setActiveCategory(cat.id)}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Grid de Flashcards */}
      <div className="tips-grid">
        {filteredTips.map((tip) => (
          <div key={tip.id} className={`tip-flashcard ${getCardCategoryClass(tip.categoria)}`}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span className={`badge ${getBadgeClass(tip.categoria)}`}>
                  {tip.categoria}
                </span>
                <span style={{ fontSize: '1.2rem' }}>
                  {tip.categoria === 'Pode usar' ? '✅' : tip.categoria === 'Não pode usar' ? '🛑' : '⚡'}
                </span>
              </div>

              <h3 className="tip-card-title">{tip.titulo}</h3>
              <p className="tip-card-text">{tip.texto}</p>
            </div>

            <div className="tip-example-snippet">
              <span style={{ fontWeight: 700, color: 'var(--text-soft)', display: 'block', fontSize: '0.75rem', marginBottom: '2px' }}>
                EXEMPLO PRÁTICO:
              </span>
              {tip.exemplo}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
