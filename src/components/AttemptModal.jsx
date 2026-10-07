import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  X, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  Calendar, 
  Award, 
  User, 
  BookOpen,
  MessageSquare,
  Send
} from 'lucide-react';

export default function AttemptModal() {
  const { 
    selectedAttemptModal, 
    setSelectedAttemptModal, 
    role, 
    addTeacherFeedback 
  } = useApp();

  const [feedbackInput, setFeedbackInput] = useState(
    selectedAttemptModal?.comentarioProfessor || ""
  );
  const [feedbackSaved, setFeedbackSaved] = useState(false);

  if (!selectedAttemptModal) return null;

  const handleSaveFeedback = () => {
    addTeacherFeedback(selectedAttemptModal.id, feedbackInput);
    setFeedbackSaved(true);
    setTimeout(() => setFeedbackSaved(false), 2500);
  };

  const att = selectedAttemptModal;

  return (
    <div className="modal-overlay" onClick={() => setSelectedAttemptModal(null)}>
      <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
        {/* Cabeçalho do Modal */}
        <div className="modal-header">
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
              <span className="badge badge-primary">
                Tentativa #{att.tentativaNumero}
              </span>
              <span className="badge badge-warning">
                {att.nivel || "Geral"}
              </span>
              {att.porcentagem >= 70 ? (
                <span className="badge badge-success">{att.porcentagem}% de Aproveitamento</span>
              ) : (
                <span className="badge badge-danger">{att.porcentagem}% de Aproveitamento</span>
              )}
            </div>
            <h3 style={{ fontSize: '1.35rem', color: 'var(--text-main)' }}>
              Revisão Detalhada: {att.atividadeTitulo}
            </h3>
          </div>

          <button 
            className="modal-close-btn" 
            onClick={() => setSelectedAttemptModal(null)}
            title="Fechar janela"
          >
            <X size={22} />
          </button>
        </div>

        {/* Metadados da Tentativa */}
        <div style={{ padding: '0.85rem 1.75rem', backgroundColor: 'var(--bg-subtle)', display: 'flex', flexWrap: 'wrap', gap: '1.25rem', fontSize: '0.85rem', color: 'var(--text-soft)', borderBottom: '1px solid var(--border-subtle)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            <User size={14} /> <strong>Aluno:</strong> {att.alunoNome}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            <Calendar size={14} /> <strong>Data:</strong> {att.data} às {att.horario}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            <Clock size={14} /> <strong>Tempo Gasto:</strong> {att.tempoFormatado || `${att.tempoSegundos}s`}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            <Award size={14} /> <strong>Acertos:</strong> {att.acertos} / {att.totalQuestoes} ({att.pontuacaoTotal} pts)
          </div>
        </div>

        {/* Corpo: Lista de Questões com Resposta do Aluno vs Resposta Correta (Seção 13) */}
        <div className="modal-body">
          <div style={{ marginBottom: '1.5rem', fontSize: '0.95rem', color: 'var(--text-muted)' }}>
            Abaixo está a reprodução exata de cada questão realizada nesta tentativa:
          </div>

          {(att.questoesRespondidas || []).map((q, idx) => (
            <div 
              key={idx} 
              className={`modal-question-review-card ${q.acertou ? 'correct' : 'incorrect'}`}
            >
              {/* Cabeçalho da Questão */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ fontWeight: 800, color: 'var(--text-main)', fontSize: '0.95rem' }}>
                    Questão {idx + 1}
                  </span>
                  <span className="badge badge-primary" style={{ fontSize: '0.7rem' }}>
                    {q.regraNome || "Regra Geral"}
                  </span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontWeight: 700, fontSize: '0.85rem', color: q.acertou ? 'var(--success-dark)' : 'var(--danger-dark)' }}>
                  {q.acertou ? (
                    <>
                      <CheckCircle2 size={16} /> Acertou (+{q.pontosGanhos || 10} pts)
                    </>
                  ) : (
                    <>
                      <XCircle size={16} /> Errou (0 pts)
                    </>
                  )}
                </div>
              </div>

              {/* 1. Enunciado da Questão */}
              <div style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-main)', marginBottom: '0.85rem', whiteSpace: 'pre-line' }}>
                {q.enunciado}
              </div>

              {/* 2. Resposta do Aluno */}
              <div className="review-answer-row user-answer">
                <span style={{ fontWeight: 700, color: 'var(--text-soft)', display: 'block', fontSize: '0.75rem', marginBottom: '2px' }}>
                  RESPOSTA DO ALUNO:
                </span>
                <span style={{ color: q.acertou ? 'var(--success-dark)' : 'var(--danger-dark)', fontWeight: 600 }}>
                  “{q.respostaAluno || "(Sem resposta enviada)"}”
                </span>
              </div>

              {/* 3. Resposta Correta Esperada */}
              {!q.acertou && (
                <div className="review-answer-row correct-answer">
                  <span style={{ fontWeight: 700, display: 'block', fontSize: '0.75rem', marginBottom: '2px' }}>
                    RESPOSTA CORRETA ESPERADA:
                  </span>
                  <span style={{ fontWeight: 600 }}>
                    “{q.respostaCorreta}”
                  </span>
                </div>
              )}

              {/* 4. Explicação Pedagógica da Regra */}
              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.5rem', backgroundColor: '#f8fafc', padding: '0.65rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
                <strong>Explicação da Regra: </strong>
                {q.explicacao}
              </div>
            </div>
          ))}

          {/* Feedback / Anotação do Professor (Seção 13 / 20) */}
          <div style={{ marginTop: '2rem', padding: '1.25rem', backgroundColor: '#f8fafc', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <MessageSquare size={16} color="var(--primary)" />
              <strong style={{ fontSize: '0.95rem', color: 'var(--text-main)' }}>
                Parecer Pedagógico do Professor
              </strong>
            </div>

            {role === 'professor' ? (
              <div>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-soft)', marginBottom: '0.5rem' }}>
                  Escreva uma orientação personalizada para o aluno sobre os pontos que ele precisa revisar nesta tentativa:
                </p>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <input
                    type="text"
                    value={feedbackInput}
                    onChange={(e) => setFeedbackInput(e.target.value)}
                    placeholder="Ex: Excelente avanço em vocativo! Revise a posição do mas em orações coordenadas."
                    style={{
                      flex: 1,
                      padding: '0.6rem 0.85rem',
                      borderRadius: 'var(--radius-sm)',
                      border: '1px solid var(--border-subtle)',
                      fontSize: '0.9rem',
                      fontFamily: 'var(--font-sans)'
                    }}
                  />
                  <button 
                    className="btn btn-primary btn-sm"
                    onClick={handleSaveFeedback}
                  >
                    <Send size={14} /> Salvar Parecer
                  </button>
                </div>
                {feedbackSaved && (
                  <span style={{ fontSize: '0.8rem', color: 'var(--success-dark)', fontWeight: 600, display: 'inline-block', marginTop: '0.4rem' }}>
                    ✓ Parecer pedagógico salvo com sucesso na tentativa do aluno!
                  </span>
                )}
              </div>
            ) : (
              <div>
                {att.comentarioProfessor ? (
                  <div style={{ fontStyle: 'italic', color: 'var(--text-main)', fontSize: '0.95rem' }}>
                    “{att.comentarioProfessor}”
                  </div>
                ) : (
                  <div style={{ color: 'var(--text-soft)', fontSize: '0.85rem', fontStyle: 'italic' }}>
                    Nenhum parecer emitido ainda pelo professor para esta tentativa.
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Rodapé do Modal */}
        <div className="modal-footer">
          <button 
            className="btn btn-secondary" 
            onClick={() => setSelectedAttemptModal(null)}
          >
            Fechar Janela
          </button>
        </div>
      </div>
    </div>
  );
}
