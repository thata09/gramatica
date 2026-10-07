import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';
import confetti from 'canvas-confetti';
import { 
  CheckSquare, 
  Clock, 
  Award, 
  ArrowRight, 
  RotateCcw, 
  CheckCircle2, 
  XCircle, 
  HelpCircle,
  Sparkles,
  BarChart2,
  Filter,
  Play
} from 'lucide-react';

export default function ExercisesView() {
  const { 
    questions, 
    currentStudent, 
    saveAttempt, 
    exerciseFilter, 
    setExerciseFilter,
    grammarRules,
    setActiveTab,
    setSelectedAttemptModal
  } = useApp();

  // Activity session state
  const [sessionActive, setSessionActive] = useState(false);
  const [currentQuestionsList, setCurrentQuestionsList] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [timerActive, setTimerActive] = useState(false);

  // Current question interaction state
  const [selectedAnswer, setSelectedAnswer] = useState(null); // for choice & true/false
  const [placedCommaSlots, setPlacedCommaSlots] = useState([]); // for 'coloque_a_virgula'
  const [submittedFeedback, setSubmittedFeedback] = useState(null); // holds feedback after answering
  const [sessionResults, setSessionResults] = useState(null); // holds final results
  const [answersLog, setAnswersLog] = useState([]); // stores question-by-question log

  // Timer effect
  useEffect(() => {
    let interval = null;
    if (timerActive) {
      interval = setInterval(() => {
        setTimerSeconds(sec => sec + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [timerActive]);

  // Start new exercise activity
  const startSession = () => {
    let pool = [...questions];

    if (exerciseFilter.nivel !== 'todos') {
      pool = pool.filter(q => q.nivel === exerciseFilter.nivel);
    }

    if (exerciseFilter.regraId !== 'todas') {
      pool = pool.filter(q => q.regraId === exerciseFilter.regraId);
    }

    if (exerciseFilter.tipo !== 'todos') {
      pool = pool.filter(q => q.tipo === exerciseFilter.tipo);
    }

    // Fallback if filter returned 0 questions
    if (pool.length === 0) {
      pool = [...questions];
    }

    // Take up to 5 questions for a focused session
    const selected = pool.slice(0, 5);

    setCurrentQuestionsList(selected);
    setCurrentIndex(0);
    setScore(0);
    setTimerSeconds(0);
    setTimerActive(true);
    setSelectedAnswer(null);
    setPlacedCommaSlots([]);
    setSubmittedFeedback(null);
    setSessionResults(null);
    setAnswersLog([]);
    setSessionActive(true);
  };

  const currentQ = currentQuestionsList[currentIndex];

  // Helper: toggle comma placement in 'coloque_a_virgula'
  const toggleCommaSlot = (slotIndex) => {
    if (submittedFeedback) return; // already answered
    setPlacedCommaSlots(prev => {
      if (prev.includes(slotIndex)) {
        return prev.filter(idx => idx !== slotIndex);
      } else {
        return [...prev, slotIndex].sort((a, b) => a - b);
      }
    });
  };

  // Helper: format user sentence for 'coloque_a_virgula'
  const reconstructUserSentence = (tokens, slots) => {
    return tokens.map((word, idx) => {
      if (slots.includes(idx)) {
        return `${word},`;
      }
      return word;
    }).join(' ');
  };

  // Submit Answer
  const handleSubmitAnswer = () => {
    if (!currentQ || submittedFeedback) return;

    let isCorrect = false;
    let studentAnswerText = "";

    if (currentQ.tipo === 'coloque_a_virgula') {
      const correctSlots = (currentQ.correctSlots || []).sort((a, b) => a - b);
      const userSlots = [...placedCommaSlots].sort((a, b) => a - b);

      isCorrect = (
        correctSlots.length === userSlots.length &&
        correctSlots.every((val, idx) => val === userSlots[idx])
      );

      studentAnswerText = reconstructUserSentence(currentQ.tokens, placedCommaSlots);
    } else {
      if (!selectedAnswer) return; // Must select an answer
      isCorrect = selectedAnswer === currentQ.respostaCorreta;
      studentAnswerText = selectedAnswer;
    }

    const pointsGained = isCorrect ? 10 : 0;
    const newScore = score + pointsGained;
    setScore(newScore);

    const feedbackObj = {
      isCorrect,
      studentAnswerText,
      correctAnswerText: currentQ.fraseCorreta || currentQ.respostaCorreta,
      explanation: isCorrect ? currentQ.explicacao : (currentQ.explicacaoErro || currentQ.explicacao),
      ruleName: currentQ.regraNome,
      ruleId: currentQ.regraId,
      pointsGained
    };

    setSubmittedFeedback(feedbackObj);

    // Record answer log for attempt history & teacher review
    setAnswersLog(prev => [
      ...prev,
      {
        questaoId: currentQ.id,
        enunciado: currentQ.fraseCorreta ? currentQ.fraseCorreta : currentQ.enunciado,
        tipo: currentQ.tipo,
        respostaAluno: studentAnswerText,
        respostaCorreta: currentQ.fraseCorreta || currentQ.respostaCorreta,
        acertou: isCorrect,
        pontosGanhos: pointsGained,
        regraNome: currentQ.regraNome,
        regraId: currentQ.regraId,
        explicacao: currentQ.explicacao
      }
    ]);
  };

  // Next question or Finish
  const handleNextQuestion = () => {
    if (currentIndex + 1 < currentQuestionsList.length) {
      setCurrentIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setPlacedCommaSlots([]);
      setSubmittedFeedback(null);
    } else {
      // Activity completed!
      finishSession();
    }
  };

  // Finish session and compute metrics
  const finishSession = () => {
    setTimerActive(false);

    const totalQuestions = currentQuestionsList.length;
    // Calculate acertos from answersLog plus latest if applicable
    const acertos = answersLog.filter(a => a.acertou).length;
    const erros = totalQuestions - acertos;
    const percentage = totalQuestions > 0 ? Math.round((acertos / totalQuestions) * 100) : 0;

    const mins = Math.floor(timerSeconds / 60);
    const secs = timerSeconds % 60;
    const tempoFormatado = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;

    // Motivational message according to score (Section 9)
    let motivationalMsg = "";
    if (percentage >= 90) {
      motivationalMsg = "Excelente! Você está dominando o uso da vírgula.";
      try {
        confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
      } catch (e) {
        // Confetti fallback
      }
    } else if (percentage >= 70) {
      motivationalMsg = "Bom trabalho! Você já entendeu boa parte das regras.";
      try {
        confetti({ particleCount: 50, spread: 50, origin: { y: 0.6 } });
      } catch (e) {
        // Confetti fallback
      }
    } else {
      motivationalMsg = "Continue praticando! Revise as explicações e tente novamente.";
    }

    const activityTitle = exerciseFilter.regraId !== 'todas'
      ? `Prática de ${grammarRules.find(r => r.id === exerciseFilter.regraId)?.nome || 'Regra Específica'}`
      : `Treino de Pontuação (${exerciseFilter.nivel === 'todos' ? 'Geral' : exerciseFilter.nivel.toUpperCase()})`;

    const attemptToSave = {
      alunoId: currentStudent?.id || "aluno_lucas",
      alunoNome: currentStudent?.nome || "Lucas Silva",
      atividadeId: `ativ_${Date.now()}`,
      atividadeTitulo: activityTitle,
      nivel: exerciseFilter.nivel === 'todos' ? 'Misto' : exerciseFilter.nivel,
      pontuacaoTotal: acertos * 10,
      totalQuestoes: totalQuestions,
      acertos,
      erros,
      porcentagem: percentage,
      tempoSegundos: timerSeconds,
      tempoFormatado,
      mensagemMotivacional: motivationalMsg,
      questoesRespondidas: answersLog
    };

    const saved = saveAttempt(attemptToSave);

    setSessionResults({
      ...attemptToSave,
      id: saved.id,
      tentativaNumero: saved.tentativaNumero,
      fullAttemptObject: saved
    });
  };

  const formatTimer = (sec) => {
    const mins = Math.floor(sec / 60);
    const s = sec % 60;
    return `${mins.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="exercise-workspace">
      {/* SELETOR DE ATIVIDADE SE A SESSÃO NÃO ESTIVER ATIVA */}
      {!sessionActive && !sessionResults && (
        <div>
          <div className="section-header">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <span className="badge badge-success">
                <CheckSquare size={14} /> Prática Interativa
              </span>
              <span className="badge badge-primary">
                +10 Pontos por Acerto
              </span>
            </div>
            <h2 className="section-title">Área de Exercícios: Pratique a Vírgula</h2>
            <p className="section-desc">
              Escolha o nível de dificuldade e o assunto que deseja praticar. 
              Ao final de cada questão, você recebe feedback didático imediato explicando os acertos e erros.
            </p>
          </div>

          <div className="card" style={{ padding: '2rem', marginBottom: '2rem' }}>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Filter size={18} color="var(--primary)" /> Configurar Atividade
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
              {/* Nível dos Exercícios (Fácil, Médio, Difícil) */}
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-soft)', marginBottom: '0.5rem' }}>
                  NÍVEL DE DIFICULDADE
                </label>
                <select
                  value={exerciseFilter.nivel}
                  onChange={(e) => setExerciseFilter(prev => ({ ...prev, nivel: e.target.value }))}
                  style={{
                    width: '100%',
                    padding: '0.65rem',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--border-subtle)',
                    fontSize: '0.95rem',
                    fontFamily: 'var(--font-sans)',
                    backgroundColor: '#ffffff'
                  }}
                >
                  <option value="todos">Todos os Níveis (Misto)</option>
                  <option value="facil">Fácil (Regras básicas e frases simples)</option>
                  <option value="medio">Médio (Frases com múltiplas orações)</option>
                  <option value="dificil">Difícil (Atenção redobrada e pegadinhas)</option>
                </select>
              </div>

              {/* Filtrar por Regra */}
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-soft)', marginBottom: '0.5rem' }}>
                  CONTEÚDO / REGRA ESPECÍFICA
                </label>
                <select
                  value={exerciseFilter.regraId}
                  onChange={(e) => setExerciseFilter(prev => ({ ...prev, regraId: e.target.value }))}
                  style={{
                    width: '100%',
                    padding: '0.65rem',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--border-subtle)',
                    fontSize: '0.95rem',
                    fontFamily: 'var(--font-sans)',
                    backgroundColor: '#ffffff'
                  }}
                >
                  <option value="todas">Todas as Regras</option>
                  {grammarRules.map(r => (
                    <option key={r.id} value={r.id}>{r.nome}</option>
                  ))}
                  <option value="nao_usar_sujeito">Quando NÃO usar (Sujeito e Predicado)</option>
                  <option value="nao_usar_verbo">Quando NÃO usar (Verbo e Complemento)</option>
                </select>
              </div>

              {/* Formato da Questão */}
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-soft)', marginBottom: '0.5rem' }}>
                  TIPO DE QUESTÃO
                </label>
                <select
                  value={exerciseFilter.tipo}
                  onChange={(e) => setExerciseFilter(prev => ({ ...prev, tipo: e.target.value }))}
                  style={{
                    width: '100%',
                    padding: '0.65rem',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--border-subtle)',
                    fontSize: '0.95rem',
                    fontFamily: 'var(--font-sans)',
                    backgroundColor: '#ffffff'
                  }}
                >
                  <option value="todos">Todos os Formatos Interativos</option>
                  <option value="coloque_a_virgula">Coloque a vírgula (Interativo)</option>
                  <option value="correto_ou_incorreto">Correto ou Incorreto</option>
                  <option value="escolha_a_alternativa">Escolha a Alternativa</option>
                  <option value="identifique_a_regra">Identifique a Regra</option>
                </select>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
              <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                ℹ️ Atividade com <strong>5 questões</strong> dinâmicas com feedback pedagógico detalhado.
              </div>
              <button className="btn btn-primary btn-lg" onClick={startSession}>
                <Play size={18} /> Iniciar Exercícios Agora
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SESSÃO ATIVA (RESPONDENDO A QUESTÃO) */}
      {sessionActive && currentQ && (
        <div>
          {/* Header da sessão com progresso e cronômetro */}
          <div className="exercise-header-bar">
            <div>
              <span className="badge badge-primary" style={{ marginRight: '0.5rem' }}>
                Questão {currentIndex + 1} de {currentQuestionsList.length}
              </span>
              <span className="badge badge-warning" style={{ textTransform: 'capitalize' }}>
                Nível {currentQ.nivel}
              </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-soft)', fontWeight: 600, fontSize: '0.9rem' }}>
                <Clock size={16} /> {formatTimer(timerSeconds)}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--primary)', fontWeight: 800, fontSize: '1.1rem' }}>
                <Award size={18} /> {score} pts
              </div>
            </div>
          </div>

          {/* Barra de Progresso */}
          <div className="exercise-progress-container">
            <div className="progress-track">
              <div 
                className="progress-fill" 
                style={{ width: `${((currentIndex + 1) / currentQuestionsList.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Palco da Questão */}
          <div className="question-stage-card">
            <div className="question-meta-row">
              <span className="badge badge-primary">
                {currentQ.regraNome}
              </span>
              <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-soft)' }}>
                {currentQ.tipo === 'coloque_a_virgula' && "Interativo: Clique onde deve ter vírgula"}
                {currentQ.tipo === 'correto_ou_incorreto' && "Julgamento de Frase"}
                {currentQ.tipo === 'escolha_a_alternativa' && "Múltipla Escolha"}
                {currentQ.tipo === 'identifique_a_regra' && "Análise Sintática da Regra"}
              </span>
            </div>

            <div className="question-prompt" style={{ whiteSpace: 'pre-line' }}>
              {currentQ.enunciado}
            </div>

            {/* 1. TIPO: COLOQUE A VÍRGULA */}
            {currentQ.tipo === 'coloque_a_virgula' && currentQ.tokens && (
              <div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-soft)', marginBottom: '0.5rem' }}>
                  👉 Clique no espaço delimitado entre as palavras para inserir ou remover a vírgula:
                </div>

                <div className="token-placement-board">
                  {currentQ.tokens.map((token, idx) => {
                    const isLastToken = idx === currentQ.tokens.length - 1;
                    const hasComma = placedCommaSlots.includes(idx);

                    return (
                      <React.Fragment key={idx}>
                        <span className="token-word">{token}</span>
                        {!isLastToken && (
                          <button
                            type="button"
                            className={`comma-slot-btn ${hasComma ? 'has-comma' : ''}`}
                            onClick={() => toggleCommaSlot(idx)}
                            disabled={!!submittedFeedback}
                            title={hasComma ? "Clique para retirar a vírgula" : "Clique para adicionar uma vírgula aqui"}
                          >
                            {hasComma ? ',' : '␣'}
                          </button>
                        )}
                      </React.Fragment>
                    );
                  })}
                </div>

                <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
                  <strong>Prévia da sua frase: </strong>
                  <em>“{reconstructUserSentence(currentQ.tokens, placedCommaSlots)}”</em>
                </div>
              </div>
            )}

            {/* 2, 3, 4. TIPOS DE MÚLTIPLA ESCOLHA E CORRETO/INCORRETO */}
            {currentQ.opcoes && (
              <div className="options-list">
                {currentQ.opcoes.map((opcao, idx) => {
                  const isSelected = selectedAnswer === opcao;
                  return (
                    <button
                      key={idx}
                      type="button"
                      className={`option-choice-btn ${isSelected ? 'selected' : ''}`}
                      onClick={() => !submittedFeedback && setSelectedAnswer(opcao)}
                      disabled={!!submittedFeedback}
                    >
                      <div className="option-radio-indicator">
                        {isSelected && '✓'}
                      </div>
                      <div style={{ flex: 1 }}>{opcao}</div>
                    </button>
                  );
                })}
              </div>
            )}

            {/* BOTÃO DE CONFIRMAR RESPOSTA */}
            {!submittedFeedback && (
              <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'flex-end' }}>
                <button
                  className="btn btn-primary btn-lg"
                  onClick={handleSubmitAnswer}
                  disabled={
                    currentQ.tipo === 'coloque_a_virgula' 
                      ? false 
                      : !selectedAnswer
                  }
                >
                  Confirmar Resposta
                </button>
              </div>
            )}

            {/* SEÇÃO DE FEEDBACK IMEDIATO (SEÇÃO 7) */}
            {submittedFeedback && (
              <div className={`feedback-immediate-card ${submittedFeedback.isCorrect ? 'correct' : 'incorrect'}`}>
                <div className="feedback-title-row">
                  <div className="feedback-heading">
                    {submittedFeedback.isCorrect ? (
                      <>
                        <CheckCircle2 size={24} /> Resposta Correta! (+10 pontos)
                      </>
                    ) : (
                      <>
                        <XCircle size={24} /> Resposta Incorreta! (0 pontos)
                      </>
                    )}
                  </div>

                  <span className="badge badge-primary">
                    Regra: {submittedFeedback.ruleName}
                  </span>
                </div>

                <div className="feedback-explanation">
                  <strong>Explicação Pedagógica: </strong>
                  {submittedFeedback.explanation}
                </div>

                {!submittedFeedback.isCorrect && (
                  <div style={{ fontSize: '0.95rem', background: '#ffffff', padding: '0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--danger-border)' }}>
                    <strong>Forma Correta: </strong>
                    <span style={{ color: 'var(--success-dark)', fontWeight: 600 }}>{submittedFeedback.correctAnswerText}</span>
                  </div>
                )}

                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '0.75rem' }}>
                  <button
                    className="btn btn-primary"
                    onClick={handleNextQuestion}
                  >
                    {currentIndex + 1 < currentQuestionsList.length ? (
                      <>Próxima Questão <ArrowRight size={16} /></>
                    ) : (
                      <>Finalizar Atividade e Ver Resultado <Award size={16} /></>
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TELA DE CONCLUSÃO / RESULTADOS (SEÇÃO 9) */}
      {sessionResults && (
        <div className="completion-screen-card">
          <div className="completion-icon-celebration">
            {sessionResults.porcentagem >= 70 ? '🎉' : '📚'}
          </div>

          <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem', color: 'var(--text-main)' }}>
            Atividade Concluída!
          </h2>

          {/* Mensagem de acordo com o resultado (Seção 9) */}
          <div style={{ 
            fontSize: '1.15rem', 
            fontWeight: 600, 
            color: sessionResults.porcentagem >= 70 ? 'var(--success-dark)' : 'var(--primary)',
            backgroundColor: sessionResults.porcentagem >= 70 ? 'var(--success-light)' : 'var(--primary-light)',
            padding: '1rem',
            borderRadius: 'var(--radius-md)',
            marginBottom: '1.5rem'
          }}>
            “{sessionResults.mensagemMotivacional}”
          </div>

          {/* Grid de Estatísticas Finais Solicitadas */}
          <div className="stats-summary-grid">
            <div className="stat-metric-card">
              <div className="stat-metric-number">{sessionResults.pontuacaoTotal}</div>
              <div className="stat-metric-label">Pontuação</div>
            </div>

            <div className="stat-metric-card">
              <div className="stat-metric-number" style={{ color: 'var(--success)' }}>
                {sessionResults.acertos} / {sessionResults.totalQuestoes}
              </div>
              <div className="stat-metric-label">Acertos</div>
            </div>

            <div className="stat-metric-card">
              <div className="stat-metric-number" style={{ color: 'var(--danger)' }}>
                {sessionResults.erros}
              </div>
              <div className="stat-metric-label">Erros</div>
            </div>

            <div className="stat-metric-card">
              <div className="stat-metric-number">{sessionResults.porcentagem}%</div>
              <div className="stat-metric-label">Aproveitamento</div>
            </div>

            <div className="stat-metric-card">
              <div className="stat-metric-number">{sessionResults.tempoFormatado}</div>
              <div className="stat-metric-label">Tempo Utilizado</div>
            </div>

            <div className="stat-metric-card">
              <div className="stat-metric-number">#{sessionResults.tentativaNumero}</div>
              <div className="stat-metric-label">Tentativa</div>
            </div>
          </div>

          {/* Ações pós-atividade */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', justifyContent: 'center', marginTop: '2rem' }}>
            <button
              className="btn btn-secondary"
              onClick={() => {
                if (sessionResults.fullAttemptObject) {
                  setSelectedAttemptModal(sessionResults.fullAttemptObject);
                }
              }}
            >
              Revisar Gabarito Completo
            </button>

            <button
              className="btn btn-primary"
              onClick={() => {
                setSessionResults(null);
                setSessionActive(false);
                startSession();
              }}
            >
              <RotateCcw size={16} /> Praticar Novamente
            </button>

            <button
              className="btn btn-secondary"
              onClick={() => {
                setSessionResults(null);
                setSessionActive(false);
                setActiveTab('historico');
              }}
            >
              Ver Meu Histórico de Tentativas <ArrowRight size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
