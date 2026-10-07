import React, { useState } from 'react';
import { prohibitedRules, detectorFrases } from '../data/prohibitedComma';
import { useApp } from '../context/AppContext';
import { 
  AlertOctagon, 
  Ban, 
  CheckCircle2, 
  XCircle, 
  Sparkles, 
  HelpCircle,
  ShieldAlert,
  ArrowRight
} from 'lucide-react';

export default function ProhibitedView() {
  const { setActiveTab } = useApp();
  
  // State for interactive detector mini-game
  const [detectorAnswers, setDetectorAnswers] = useState({});

  const handleDetectorChoice = (itemId, alunoEscolheuErro) => {
    setDetectorAnswers(prev => ({
      ...prev,
      [itemId]: alunoEscolheuErro
    }));
  };

  return (
    <div className="prohibited-page-wrapper">
      {/* 1. GRANDE DESTAQUE VISUAL (BANNER PROIBITIVO) */}
      <section className="prohibited-zone-wrapper">
        <div className="prohibited-zone-header">
          <div className="prohibited-badge">
            <AlertOctagon size={18} /> ZONA DE ATENÇÃO MÁXIMA
          </div>
          <h2 className="prohibited-main-title">
            Quando NÃO Usar a Vírgula!
          </h2>
          <p className="prohibited-main-desc">
            Saber onde <strong>NÃO</strong> colocar a vírgula é tão ou mais importante do que saber onde colocar. 
            A maioria dos descontos de nota em redações ocorre quando se quebram conexões sintáticas imediatas.
          </p>
        </div>

        {/* 2. AS 3 PROIBIÇÕES SAGRADAS DA LÍNGUA PORTUGUESA */}
        <div className="prohibited-rules-list">
          {prohibitedRules.map((item, index) => (
            <div key={item.id} className="prohibited-rule-card">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                <span className="badge badge-danger">
                  <Ban size={14} /> Proibição Absoluta #{index + 1}
                </span>
                <div style={{ display: 'flex', gap: '0.4rem' }}>
                  {item.tags.map(t => (
                    <span key={t} className="badge badge-warning" style={{ fontSize: '0.7rem' }}>{t}</span>
                  ))}
                </div>
              </div>

              <h3>{item.titulo}</h3>
              <p style={{ fontWeight: 600, color: 'var(--text-main)', fontSize: '1.05rem' }}>
                {item.resumo}
              </p>
              <p style={{ color: 'var(--text-muted)', lineHeight: '1.6' }}>
                {item.explicacao}
              </p>

              {/* Exemplos Incorreto vs Correto */}
              <div className="examples-comparison-grid" style={{ marginTop: '1.25rem' }}>
                <div className="example-box incorrect">
                  <div>
                    <div className="example-header">
                      <XCircle size={18} /> EXEMPLO INCORRETO (NUNCA FAÇA ISSO!)
                    </div>
                    <div className="example-text">
                      “{item.exemploIncorreto}”
                    </div>
                  </div>
                  <div className="example-explanation">
                    <strong>Motivo: </strong>{item.porQueIncorreto}
                  </div>
                </div>

                <div className="example-box correct">
                  <div>
                    <div className="example-header">
                      <CheckCircle2 size={18} /> FORMA CORRETA (SEM VÍRGULA)
                    </div>
                    <div className="example-text">
                      “{item.exemploCorreto}”
                    </div>
                  </div>
                  <div className="example-explanation">
                    ✓ A relação direta é preservada sem interrupções artificiais.
                  </div>
                </div>
              </div>

              {/* Mnemônico */}
              <div className="mnemonic-tip-box" style={{ marginTop: '1rem', backgroundColor: '#fff1f2', borderColor: '#fecaca', color: '#991b1b' }}>
                <ShieldAlert size={20} style={{ flexShrink: 0 }} />
                <div>{item.alertaMnemônico}</div>
              </div>
            </div>
          ))}
        </div>

        {/* 3. DETECTOR DE VÍRGULAS INDEVIDAS (MINI-CHALLENGE INTERATIVO) */}
        <div className="detector-interactive-box">
          <div className="detector-interactive-header">
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
                <span className="badge badge-danger">Desafio Rápido</span>
                <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-soft)' }}>Treine seu olhar clínico</span>
              </div>
              <h3 style={{ fontSize: '1.4rem', color: 'var(--text-main)' }}>
                Detector de Vírgula Proibida 🔍
              </h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
                Analise cada frase abaixo e diga se há uma vírgula proibida ou se a pontuação está correta:
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {detectorFrases.map((df) => {
              const respostaAluno = detectorAnswers[df.id];
              const jaRespondeu = respostaAluno !== undefined;
              const acertou = jaRespondeu && (respostaAluno === df.temErro);

              return (
                <div 
                  key={df.id} 
                  className={`detector-item-card ${jaRespondeu ? (acertou ? 'answered-correct' : 'answered-wrong') : ''}`}
                >
                  <div className="detector-sentence">
                    “{df.frase}”
                  </div>

                  {!jaRespondeu ? (
                    <div className="detector-btn-actions">
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDetectorChoice(df.id, true)}
                      >
                        <Ban size={15} /> Tem Vírgula Proibida!
                      </button>
                      <button
                        className="btn btn-success btn-sm"
                        onClick={() => handleDetectorChoice(df.id, false)}
                      >
                        <CheckCircle2 size={15} /> Está Correta (Sem Erro)
                      </button>
                    </div>
                  ) : (
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 700, marginBottom: '0.4rem', color: acertou ? 'var(--success-dark)' : 'var(--danger-dark)' }}>
                        {acertou ? <CheckCircle2 size={18} /> : <XCircle size={18} />}
                        {acertou ? "Muito bem! Você identificou corretamente!" : "Atenção ao detalhe!"}
                      </div>
                      <p style={{ fontSize: '0.95rem', color: 'var(--text-main)', marginBottom: '0.4rem' }}>
                        {df.explicacao}
                      </p>
                      {df.temErro && (
                        <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--success-dark)' }}>
                          Frase corrigida: “{df.correta}”
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
            <button
              className="btn btn-primary"
              onClick={() => setActiveTab('exercicios')}
            >
              Praticar Exercícios Completos com Pontuação <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
