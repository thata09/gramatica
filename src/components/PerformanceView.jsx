import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  BarChart3, 
  TrendingUp, 
  Award, 
  CheckCircle2, 
  XCircle, 
  Target, 
  AlertTriangle, 
  BookOpen, 
  Sparkles,
  ArrowRight
} from 'lucide-react';

export default function PerformanceView() {
  const { 
    currentStudent, 
    attempts, 
    getStudentRuleBreakdown, 
    setActiveTab,
    startPracticeForRule 
  } = useApp();

  const studentAttempts = attempts.filter(a => a.alunoId === currentStudent?.id);
  const ruleBreakdown = getStudentRuleBreakdown(currentStudent?.id);

  // Identify strengths and weaknesses
  const masterRules = ruleBreakdown.filter(r => r.porcentagem >= 75);
  const reviewNeededRules = ruleBreakdown.filter(r => r.porcentagem < 75);

  return (
    <div className="performance-page-container">
      {/* Cabeçalho */}
      <div className="section-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
          <span className="badge badge-primary">
            <BarChart3 size={14} /> Diagnóstico do Aluno
          </span>
          <span className="badge badge-success">
            {currentStudent?.nivelGamificacao}
          </span>
        </div>
        <h2 className="section-title">Meu Desempenho Sintático: {currentStudent?.nome}</h2>
        <p className="section-desc">
          Acompanhe sua pontuação, analise as regras em que você se destaca e veja exatamente quais conteúdos exigem mais atenção e treino.
        </p>
      </div>

      {/* 1. CARDS COM AS 6 MÉTRICAS PRINCIPAIS EXIGIDAS (SEÇÃO 11) */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1.25rem', marginBottom: '2.5rem' }}>
        <div className="card" style={{ textAlign: 'center', borderTop: '4px solid var(--primary)' }}>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--primary)', fontFamily: 'var(--font-heading)' }}>
            {currentStudent?.pontuacao}
          </div>
          <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-soft)', textTransform: 'uppercase' }}>
            Pontuação Acumulada
          </div>
        </div>

        <div className="card" style={{ textAlign: 'center', borderTop: '4px solid var(--secondary)' }}>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-main)', fontFamily: 'var(--font-heading)' }}>
            {currentStudent?.exerciciosRealizados}
          </div>
          <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-soft)', textTransform: 'uppercase' }}>
            Exercícios Realizados
          </div>
        </div>

        <div className="card" style={{ textAlign: 'center', borderTop: '4px solid var(--accent-purple)' }}>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-main)', fontFamily: 'var(--font-heading)' }}>
            {currentStudent?.questoesRespondidas}
          </div>
          <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-soft)', textTransform: 'uppercase' }}>
            Questões Respondidas
          </div>
        </div>

        <div className="card" style={{ textAlign: 'center', borderTop: '4px solid var(--success)' }}>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--success-dark)', fontFamily: 'var(--font-heading)' }}>
            {currentStudent?.acertos}
          </div>
          <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-soft)', textTransform: 'uppercase' }}>
            Total de Acertos
          </div>
        </div>

        <div className="card" style={{ textAlign: 'center', borderTop: '4px solid var(--danger)' }}>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--danger-dark)', fontFamily: 'var(--font-heading)' }}>
            {currentStudent?.erros}
          </div>
          <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-soft)', textTransform: 'uppercase' }}>
            Total de Erros
          </div>
        </div>

        <div className="card" style={{ textAlign: 'center', borderTop: '4px solid var(--warning)' }}>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--warning-dark)', fontFamily: 'var(--font-heading)' }}>
            {currentStudent?.aproveitamento}%
          </div>
          <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-soft)', textTransform: 'uppercase' }}>
            Taxa de Aproveitamento
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '2rem', marginBottom: '2.5rem' }}>
        {/* 2. ANÁLISE POR REGRA: ONDE VOCÊ DOMINA VS ONDE PRECISA ESTUDAR MAIS */}
        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
            <h3 style={{ fontSize: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Target size={20} color="var(--primary)" /> Domínio por Conteúdo da Vírgula
            </h3>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-soft)' }}>
              Baseado nas suas respostas
            </span>
          </div>

          <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
            Identifique suas fortalezas e fraquezas. O sistema pontua automaticamente seu acerto por regra:
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {ruleBreakdown.length > 0 ? (
              ruleBreakdown.map((rule) => {
                const isDominado = rule.porcentagem >= 75;
                const isCritico = rule.porcentagem < 55;

                return (
                  <div key={rule.id}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                      <span style={{ fontWeight: 600, fontSize: '0.95rem', color: 'var(--text-main)' }}>
                        {rule.nome}
                      </span>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span style={{ 
                          fontWeight: 800, 
                          fontSize: '0.9rem', 
                          color: isDominado ? 'var(--success-dark)' : isCritico ? 'var(--danger-dark)' : 'var(--warning-dark)' 
                        }}>
                          {rule.porcentagem}% de acerto
                        </span>
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-soft)' }}>
                          ({rule.acertos}/{rule.total})
                        </span>
                      </div>
                    </div>

                    {/* Barra de Progresso Visual */}
                    <div style={{ height: '8px', backgroundColor: 'var(--bg-subtle)', borderRadius: '999px', overflow: 'hidden' }}>
                      <div 
                        style={{ 
                          height: '100%', 
                          width: `${rule.porcentagem}%`,
                          backgroundColor: isDominado ? 'var(--success)' : isCritico ? 'var(--danger)' : 'var(--warning)',
                          borderRadius: '999px',
                          transition: 'width 0.4s ease'
                        }}
                      />
                    </div>
                  </div>
                );
              })
            ) : (
              <div style={{ color: 'var(--text-soft)', fontStyle: 'italic', textAlign: 'center', padding: '1rem' }}>
                Responda a exercícios para gerar o gráfico detalhado por regras.
              </div>
            )}
          </div>
        </div>

        {/* 3. EVOLUÇÃO AO LONGO DAS TENTATIVAS */}
        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
            <h3 style={{ fontSize: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <TrendingUp size={20} color="var(--primary)" /> Evolução nas Tentativas
            </h3>
            <span className="badge badge-primary">Linha do Tempo</span>
          </div>

          <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
            Veja sua curva de aprendizado nas atividades realizadas ao longo dos dias:
          </p>

          {studentAttempts.length > 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {studentAttempts.map((att) => (
                <div 
                  key={att.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0.85rem',
                    backgroundColor: 'var(--bg-subtle)',
                    borderRadius: 'var(--radius-sm)',
                    borderLeft: `4px solid ${att.porcentagem >= 70 ? 'var(--success)' : 'var(--warning)'}`
                  }}
                >
                  <div>
                    <div style={{ fontWeight: 600, fontSize: '0.95rem' }}>
                      {att.atividadeTitulo}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-soft)' }}>
                      Tentativa #{att.tentativaNumero} • {att.data} às {att.horario}
                    </div>
                  </div>

                  <div style={{ textAlign: 'right' }}>
                    <div style={{ 
                      fontSize: '1.15rem', 
                      fontWeight: 800, 
                      color: att.porcentagem >= 70 ? 'var(--success-dark)' : 'var(--warning-dark)' 
                    }}>
                      {att.porcentagem}%
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-soft)' }}>
                      {att.acertos}/{att.totalQuestoes} acertos
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div style={{ color: 'var(--text-soft)', fontStyle: 'italic', textAlign: 'center', padding: '1rem' }}>
              Nenhuma tentativa registrada ainda.
            </div>
          )}
        </div>
      </div>

      {/* 4. RECOMENDAÇÃO PEDAGÓGICA PERSONALIZADA */}
      <div className="card" style={{ backgroundColor: '#fffbeb', border: '1px solid var(--warning-border)' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
          <Sparkles size={28} color="var(--warning-dark)" style={{ flexShrink: 0, marginTop: '2px' }} />
          <div>
            <h4 style={{ fontSize: '1.15rem', color: 'var(--warning-dark)', marginBottom: '0.35rem' }}>
              Plano de Ação Personalizado para {currentStudent?.nome}
            </h4>
            {reviewNeededRules.length > 0 ? (
              <p style={{ color: 'var(--text-main)', fontSize: '0.95rem', lineHeight: '1.6' }}>
                Você está indo muito bem, mas o sistema identificou que você precisa reforçar o estudo em: {' '}
                <strong>{reviewNeededRules.map(r => `${r.nome} (${r.porcentagem}%)`).join(', ')}</strong>.
                Revise as seções teóricas e resolva mais atividades focadas nessas regras para consolidar seu aprendizado!
              </p>
            ) : (
              <p style={{ color: 'var(--text-main)', fontSize: '0.95rem', lineHeight: '1.6' }}>
                Parabéns! Você apresenta excelente aproveitamento em todas as regras testadas até agora. 
                Continue praticando nos níveis médio e difícil para manter seu domínio afiado!
              </p>
            )}

            <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1rem', flexWrap: 'wrap' }}>
              <button className="btn btn-primary btn-sm" onClick={() => setActiveTab('aprender')}>
                <BookOpen size={14} /> Revisar Conteúdo Teórico
              </button>
              <button className="btn btn-secondary btn-sm" onClick={() => setActiveTab('nao_usar')}>
                <AlertTriangle size={14} /> Ver Zona Proibida
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
