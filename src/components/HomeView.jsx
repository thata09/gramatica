import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  BookOpen, 
  CheckSquare, 
  BarChart3, 
  History, 
  GraduationCap, 
  AlertOctagon, 
  Sparkles, 
  ArrowRight,
  Lightbulb,
  Award,
  Target
} from 'lucide-react';

export default function HomeView() {
  const { 
    setActiveTab, 
    switchToTeacher, 
    currentStudent, 
    grammarRules 
  } = useApp();

  return (
    <div className="home-page-container">
      {/* 1. SEÇÃO HERO PRINCIPAL */}
      <section className="hero-section">
        <div className="hero-badge-tag">
          <Sparkles size={16} /> Parceria Pedagógica com o Professor de Português
        </div>

        <h1 className="hero-title">Vírgula sem Mistério</h1>

        <h2 className="hero-subtitle">
          “Aprenda onde usar a vírgula, pratique e acompanhe sua evolução.”
        </h2>

        <p className="hero-description">
          O <strong>Vírgula sem Mistério</strong> é uma ferramenta criada para facilitar o aprendizado do uso da vírgula. Aqui você pode aprender as regras, praticar com exercícios e acompanhar seu desempenho.
        </p>

        {/* 5 Botões Solicitados na Seção 1 */}
        <div className="hero-action-buttons">
          <button 
            className="btn btn-primary btn-lg"
            onClick={() => setActiveTab('aprender')}
          >
            <BookOpen size={18} /> Aprender
          </button>

          <button 
            className="btn btn-secondary btn-lg"
            onClick={() => setActiveTab('exercicios')}
          >
            <CheckSquare size={18} /> Exercícios
          </button>

          <button 
            className="btn btn-secondary btn-lg"
            onClick={() => setActiveTab('desempenho')}
          >
            <BarChart3 size={18} /> Meu desempenho
          </button>

          <button 
            className="btn btn-secondary btn-lg"
            onClick={() => setActiveTab('historico')}
          >
            <History size={18} /> Histórico de tentativas
          </button>

          <button 
            className="btn btn-primary btn-lg"
            onClick={() => switchToTeacher()}
            style={{ background: 'linear-gradient(135deg, #1e293b 0%, #334155 100%)' }}
          >
            <GraduationCap size={18} /> Área do Professor
          </button>
        </div>
      </section>

      {/* BANNER DE DESTAQUE: QUANDO NÃO USAR A VÍRGULA */}
      <section 
        className="prohibited-banner-home"
        onClick={() => setActiveTab('nao_usar')}
        style={{ cursor: 'pointer' }}
      >
        <div className="prohibited-banner-content">
          <h3>
            <AlertOctagon size={24} /> Atenção Máxima: Quando NÃO usar a vírgula!
          </h3>
          <p>
            Mais de 70% dos erros acontecem por colocar vírgula onde ela é proibida (como entre sujeito e verbo). 
            Descubra as 3 proibições sagradas da gramática antes de fazer a redação!
          </p>
        </div>
        <button className="btn btn-danger btn-sm" onClick={(e) => { e.stopPropagation(); setActiveTab('nao_usar'); }}>
          Ver Regras Proibidas <ArrowRight size={16} />
        </button>
      </section>

      {/* CARTÕES DE NAVEGAÇÃO RÁPIDA / RECURSOS */}
      <div className="features-grid">
        <div 
          className="feature-card"
          onClick={() => setActiveTab('aprender')}
        >
          <div>
            <div className="feature-card-header">
              <div className="feature-icon-circle" style={{ backgroundColor: '#e0e7ff', color: '#4338ca' }}>
                📖
              </div>
              <div>
                <h4 className="feature-title">Guia Prático de Regras</h4>
                <span className="badge badge-primary">{grammarRules.length} Regras Explicadas</span>
              </div>
            </div>
            <p className="feature-desc">
              Vocativo, Aposto, Orações Coordenadas e Subordinadas explicadas em linguagem clara para o Ensino Médio, com exemplos certos e errados.
            </p>
          </div>
          <div className="feature-link-text">
            Explorar Conteúdo Didático <ArrowRight size={16} />
          </div>
        </div>

        <div 
          className="feature-card"
          onClick={() => setActiveTab('exercicios')}
        >
          <div>
            <div className="feature-card-header">
              <div className="feature-icon-circle" style={{ backgroundColor: '#dcfce7', color: '#15803d' }}>
                ✏️
              </div>
              <div>
                <h4 className="feature-title">Prática Interativa</h4>
                <span className="badge badge-success">4 Formatos de Questões</span>
              </div>
            </div>
            <p className="feature-desc">
              Coloque a vírgula na frase, avalie certo ou errado, escolha alternativas e identifique a regra com feedback pedagógico imediato.
            </p>
          </div>
          <div className="feature-link-text">
            Iniciar Atividade Agora <ArrowRight size={16} />
          </div>
        </div>

        <div 
          className="feature-card"
          onClick={() => setActiveTab('dicas')}
        >
          <div>
            <div className="feature-card-header">
              <div className="feature-icon-circle" style={{ backgroundColor: '#fef3c7', color: '#b45309' }}>
                💡
              </div>
              <div>
                <h4 className="feature-title">Dicas Rápidas</h4>
                <span className="badge badge-warning">Cards de Memorização</span>
              </div>
            </div>
            <p className="feature-desc">
              Derrube o mito da pausa respiratória e aprenda macetes simples categorizados em “Pode usar”, “Não pode usar” e “Cuidado”.
            </p>
          </div>
          <div className="feature-link-text">
            Ver Dicas Mnemônicas <ArrowRight size={16} />
          </div>
        </div>
      </div>

      {/* SNAPSHOT DO ALUNO LOGADO */}
      {currentStudent && (
        <div className="card" style={{ marginTop: '1.5rem', background: 'linear-gradient(to right, #ffffff, #f8fafc)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div className="user-avatar-circle" style={{ width: '50px', height: '50px', fontSize: '1.3rem' }}>
                {currentStudent.nome.charAt(0)}
              </div>
              <div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-soft)', fontWeight: 600 }}>ALUNO ATIVO</div>
                <h3 style={{ fontSize: '1.25rem', color: 'var(--text-main)' }}>{currentStudent.nome} ({currentStudent.turma})</h3>
                <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.25rem' }}>
                  <span className="badge badge-primary">{currentStudent.nivelGamificacao}</span>
                  <span className="badge badge-success">{currentStudent.pontuacao} Pontos</span>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--primary)' }}>{currentStudent.aproveitamento}%</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-soft)' }}>Aproveitamento</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-main)' }}>{currentStudent.exerciciosRealizados}</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-soft)' }}>Atividades</div>
              </div>
              <button className="btn btn-secondary btn-sm" onClick={() => setActiveTab('desempenho')}>
                Ver Diagnóstico Completo <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
