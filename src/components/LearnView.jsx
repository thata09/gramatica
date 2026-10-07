import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  BookOpen, 
  CheckCircle2, 
  XCircle, 
  Lightbulb, 
  ArrowRight, 
  PlayCircle,
  Sparkles,
  Search
} from 'lucide-react';

export default function LearnView() {
  const { grammarRules, startPracticeForRule } = useApp();
  const [selectedCategory, setSelectedCategory] = useState('todas');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['todas', 'Enumeração', 'Termos da Oração', 'Expressões Intercaladas', 'Termos Acessórios', 'Período Composto'];

  const filteredRules = grammarRules.filter(rule => {
    const matchesCategory = selectedCategory === 'todas' || rule.categoria === selectedCategory;
    const matchesSearch = rule.nome.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          rule.explicacaoSimples.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="learn-page-container">
      {/* Cabeçalho da Seção */}
      <div className="section-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
          <span className="badge badge-primary">
            <BookOpen size={14} /> Teoria Descomplicada
          </span>
          <span className="badge badge-success">
            Ensino Médio & Redação
          </span>
        </div>
        <h2 className="section-title">Área “Aprender”: Regras do Uso da Vírgula</h2>
        <p className="section-desc">
          Entenda a lógica de cada regra sintática com explicações diretas, comparações visuais de frases certas e erradas e dicas práticas para você nunca mais esquecer.
        </p>
      </div>

      {/* Barra de Filtros e Busca */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
        <div className="category-filter-pills">
          {categories.map(cat => (
            <button
              key={cat}
              className={`filter-pill-btn ${selectedCategory === cat ? 'active' : ''}`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat === 'todas' ? 'Todas as Regras' : cat}
            </button>
          ))}
        </div>

        <div style={{ position: 'relative', minWidth: '240px' }}>
          <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-soft)' }} />
          <input
            type="text"
            placeholder="Buscar por termo ou regra..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              padding: '0.5rem 1rem 0.5rem 2.2rem',
              borderRadius: 'var(--radius-full)',
              border: '1px solid var(--border-subtle)',
              fontSize: '0.85rem',
              outline: 'none',
              fontFamily: 'var(--font-sans)'
            }}
          />
        </div>
      </div>

      {/* Lista de Regras Detalhadas */}
      <div className="rules-container">
        {filteredRules.map((rule, index) => (
          <div key={rule.id} className="rule-detail-card" id={`regra-${rule.id}`}>
            {/* Cabeçalho do Card */}
            <div className="rule-card-header">
              <div className="rule-title-group">
                <div className="rule-icon-circle">
                  {index + 1}
                </div>
                <div>
                  <span className="badge badge-primary" style={{ marginBottom: '0.3rem' }}>
                    {rule.categoria}
                  </span>
                  <h3 className="rule-card-title">{rule.nome}</h3>
                </div>
              </div>

              <button
                className="btn btn-secondary btn-sm"
                onClick={() => startPracticeForRule(rule.id)}
                title="Praticar apenas exercícios desta regra"
              >
                <PlayCircle size={15} /> Praticar Esta Regra
              </button>
            </div>

            {/* 1. Explicação Simples */}
            <div className="rule-explanation-box">
              <strong>Explicação Simples: </strong>
              {rule.explicacaoSimples}
            </div>

            {/* 2. Exemplos Gerais de Uso */}
            <div style={{ marginBottom: '1.25rem' }}>
              <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-soft)', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                Exemplos de Contexto:
              </div>
              <ul style={{ paddingLeft: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                {rule.exemplos.map((ex, i) => (
                  <li key={i} style={{ color: 'var(--text-main)', fontSize: '0.95rem' }}>
                    “{ex}”
                  </li>
                ))}
              </ul>
            </div>

            {/* 3 & 4. Comparativo Exemplo Correto vs Exemplo Incorreto */}
            <div className="examples-comparison-grid">
              <div className="example-box correct">
                <div>
                  <div className="example-header">
                    <CheckCircle2 size={18} /> EXEMPLO CORRETO
                  </div>
                  <div className="example-text">
                    “{rule.exemploCorreto}”
                  </div>
                </div>
                <div className="example-explanation" style={{ color: 'var(--success-dark)' }}>
                  ✓ Uso correto da pontuação conforme a norma padrão.
                </div>
              </div>

              <div className="example-box incorrect">
                <div>
                  <div className="example-header">
                    <XCircle size={18} /> EXEMPLO INCORRETO
                  </div>
                  <div className="example-text">
                    “{rule.exemploIncorreto}”
                  </div>
                </div>
                <div className="example-explanation" style={{ color: 'var(--danger-dark)' }}>
                  ✗ <strong>Por que está errado:</strong> {rule.motivoErro}
                </div>
              </div>
            </div>

            {/* 5. Dica para Memorizar */}
            <div className="mnemonic-tip-box">
              <Sparkles size={20} style={{ flexShrink: 0, marginTop: '2px' }} />
              <div>
                <strong>Dica de Ouro para Memorizar: </strong>
                <span>{rule.dicaMemorizar}</span>
              </div>
            </div>

            {/* Rodapé com Ação Direta */}
            <div className="rule-card-footer">
              <button
                className="btn btn-primary btn-sm"
                onClick={() => startPracticeForRule(rule.id)}
              >
                Fazer Questões de {rule.nome} <ArrowRight size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
