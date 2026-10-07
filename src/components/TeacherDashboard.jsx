import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  GraduationCap, 
  Users, 
  Eye, 
  BarChart3, 
  TrendingUp, 
  PlusCircle, 
  BookOpen, 
  AlertTriangle, 
  CheckCircle2, 
  XCircle, 
  Calendar, 
  Clock, 
  Search, 
  Trash2, 
  Edit3, 
  Filter,
  Sparkles,
  Award,
  HelpCircle
} from 'lucide-react';

export default function TeacherDashboard() {
  const { 
    mockTeacher, 
    students, 
    attempts, 
    questions, 
    setSelectedAttemptModal, 
    getClassAnalytics, 
    getStudentRuleBreakdown, 
    addQuestion, 
    deleteQuestion, 
    grammarRules 
  } = useApp();

  const [activeTab, setActiveTab] = useState('turma'); 
  // 'turma' | 'review_tentativas' | 'diagnostico' | 'desempenho_geral' | 'banco_exercicios'

  // Filter states for Review de Tentativas
  const [selectedStudentFilter, setSelectedStudentFilter] = useState('todos');
  const [attemptSearch, setAttemptSearch] = useState('');

  // Selected student for individual deep diagnosis and attempt comparison (Seção 14 e 15)
  const [selectedStudentIdForDiag, setSelectedStudentIdForDiag] = useState(students[0]?.id || 'aluno_lucas');

  // Exercise creation form state (Seção 18)
  const [newQModalOpen, setNewQModalOpen] = useState(false);
  const [newQPrompt, setNewQPrompt] = useState('');
  const [newQTipo, setNewQTipo] = useState('escolha_a_alternativa');
  const [newQNivel, setNewQNivel] = useState('medio');
  const [newQRegraId, setNewQRegraId] = useState('vocativo');
  const [newQAlternativas, setNewQAlternativas] = useState(['', '', '', '']);
  const [newQRespostaCorreta, setNewQRespostaCorreta] = useState('');
  const [newQExplicacao, setNewQExplicacao] = useState('');
  const [newQSuccess, setNewQSuccess] = useState(false);

  // Filter states for Banco de Questões (Seção 19)
  const [bankRegraFilter, setBankRegraFilter] = useState('todas');
  const [bankNivelFilter, setBankNivelFilter] = useState('todos');
  const [bankTipoFilter, setBankTipoFilter] = useState('todos');

  const classAnalytics = getClassAnalytics();

  // Handlers for Question Creation
  const handleCreateQuestion = (e) => {
    e.preventDefault();
    if (!newQPrompt || !newQRespostaCorreta) return;

    const regraObj = grammarRules.find(r => r.id === newQRegraId) || { nome: "Geral" };

    const newQuestionObj = {
      enunciado: newQPrompt,
      tipo: newQTipo,
      nivel: newQNivel,
      regraId: newQRegraId,
      regraNome: regraObj.nome,
      respostaCorreta: newQRespostaCorreta,
      opcoes: newQTipo === 'escolha_a_alternativa' 
        ? newQAlternativas.filter(a => a.trim() !== '') 
        : (newQTipo === 'correto_ou_incorreto' ? ["Correto", "Incorreto"] : []),
      explicacao: newQExplicacao,
      explicacaoErro: newQExplicacao
    };

    addQuestion(newQuestionObj);
    setNewQSuccess(true);
    setTimeout(() => {
      setNewQSuccess(false);
      setNewQModalOpen(false);
      setNewQPrompt('');
      setNewQRespostaCorreta('');
      setNewQExplicacao('');
      setNewQAlternativas(['', '', '', '']);
    }, 1200);
  };

  // Filtered attempts for Review tab
  const filteredAttempts = attempts.filter(att => {
    const matchesStudent = selectedStudentFilter === 'todos' || att.alunoId === selectedStudentFilter;
    const matchesSearch = att.atividadeTitulo.toLowerCase().includes(attemptSearch.toLowerCase()) || 
                          att.alunoNome.toLowerCase().includes(attemptSearch.toLowerCase());
    return matchesStudent && matchesSearch;
  });

  // Filtered questions for Question Bank
  const filteredBank = questions.filter(q => {
    const matchesRegra = bankRegraFilter === 'todas' || q.regraId === bankRegraFilter;
    const matchesNivel = bankNivelFilter === 'todos' || q.nivel === bankNivelFilter;
    const matchesTipo = bankTipoFilter === 'todos' || q.tipo === bankTipoFilter;
    return matchesRegra && matchesNivel && matchesTipo;
  });

  // Individual student diagnosis data
  const currentDiagStudent = students.find(s => s.id === selectedStudentIdForDiag) || students[0];
  const diagStudentAttempts = attempts
    .filter(a => a.alunoId === currentDiagStudent?.id)
    .sort((a, b) => a.tentativaNumero - b.tentativaNumero);
  const diagRuleBreakdown = getStudentRuleBreakdown(currentDiagStudent?.id);
  const hardestRuleForDiag = diagRuleBreakdown.length > 0 ? diagRuleBreakdown[diagRuleBreakdown.length - 1] : null;

  return (
    <div className="teacher-dashboard-container">
      {/* CABEÇALHO DO PROFESSOR */}
      <div className="section-header" style={{ borderBottom: '1px solid var(--border-subtle)', paddingBottom: '1.25rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
              <span className="badge badge-primary">
                <GraduationCap size={14} /> Painel Docente Exclusivo
              </span>
              <span className="badge badge-success">
                {mockTeacher.turma}
              </span>
            </div>
            <h2 className="section-title">{mockTeacher.nome}</h2>
            <p className="section-desc">
              {mockTeacher.disciplina} • {mockTeacher.escola}
            </p>
          </div>

          <button 
            className="btn btn-primary"
            onClick={() => setNewQModalOpen(true)}
          >
            <PlusCircle size={16} /> Cadastrar Novo Exercício
          </button>
        </div>
      </div>

      {/* TABS DE NAVEGAÇÃO DO PROFESSOR */}
      <div className="teacher-tab-navigation">
        <button
          className={`teacher-tab-btn ${activeTab === 'turma' ? 'active' : ''}`}
          onClick={() => setActiveTab('turma')}
        >
          <Users size={18} /> 1. Visão dos Alunos
        </button>
        <button
          className={`teacher-tab-btn ${activeTab === 'review_tentativas' ? 'active' : ''}`}
          onClick={() => setActiveTab('review_tentativas')}
          style={{ fontWeight: 700 }}
        >
          <Eye size={18} /> 2. Review das Tentativas ⭐
        </button>
        <button
          className={`teacher-tab-btn ${activeTab === 'diagnostico' ? 'active' : ''}`}
          onClick={() => setActiveTab('diagnostico')}
        >
          <TrendingUp size={18} /> 3. Análise & Comparação
        </button>
        <button
          className={`teacher-tab-btn ${activeTab === 'desempenho_geral' ? 'active' : ''}`}
          onClick={() => setActiveTab('desempenho_geral')}
        >
          <BarChart3 size={18} /> 4. Desempenho da Turma
        </button>
        <button
          className={`teacher-tab-btn ${activeTab === 'banco_exercicios' ? 'active' : ''}`}
          onClick={() => setActiveTab('banco_exercicios')}
        >
          <BookOpen size={18} /> 5. Banco de Questões
        </button>
      </div>

      {/* =====================================================================
          1. VISÃO DOS ALUNOS DA TURMA (SEÇÃO 12)
          ===================================================================== */}
      {activeTab === 'turma' && (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
            <div>
              <h3 style={{ fontSize: '1.3rem', color: 'var(--text-main)' }}>
                Alunos Cadastrados na Turma ({students.length})
              </h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                Acompanhe o engajamento individual, médias de acerto e evolução de cada estudante.
              </p>
            </div>
          </div>

          <div className="table-responsive">
            <table className="custom-table">
              <thead>
                <tr>
                  <th>Nome do Aluno</th>
                  <th>Atividades Realizadas</th>
                  <th>Média de Acertos</th>
                  <th>Média de Erros</th>
                  <th>Pontuação Total</th>
                  <th>Evolução Geral</th>
                  <th>Última Atividade</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student) => (
                  <tr key={student.id}>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                        <div className="user-avatar-circle" style={{ width: '32px', height: '32px', fontSize: '0.85rem' }}>
                          {student.nome.charAt(0)}
                        </div>
                        <div>
                          <div style={{ fontWeight: 600 }}>{student.nome}</div>
                          <div style={{ fontSize: '0.75rem', color: 'var(--text-soft)' }}>{student.email}</div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span style={{ fontWeight: 700, color: 'var(--text-main)' }}>
                        {student.exerciciosRealizados} atividades
                      </span>
                    </td>
                    <td>
                      <span style={{ color: 'var(--success-dark)', fontWeight: 700 }}>
                        {student.acertos} ({student.questoesRespondidas > 0 ? Math.round((student.acertos / student.questoesRespondidas) * 100) : 0}%)
                      </span>
                    </td>
                    <td>
                      <span style={{ color: 'var(--danger-dark)', fontWeight: 700 }}>
                        {student.erros}
                      </span>
                    </td>
                    <td>
                      <span className="badge badge-primary" style={{ fontWeight: 700 }}>
                        {student.pontuacao} pts
                      </span>
                    </td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                        <span className={`badge ${student.aproveitamento >= 70 ? 'badge-success' : 'badge-warning'}`}>
                          {student.aproveitamento}%
                        </span>
                        <span style={{ fontSize: '0.8rem', color: 'var(--text-soft)' }}>
                          {student.nivelGamificacao}
                        </span>
                      </div>
                    </td>
                    <td style={{ fontSize: '0.85rem', color: 'var(--text-soft)' }}>
                      {student.ultimaAtividade}
                    </td>
                    <td>
                      <button
                        className="btn btn-secondary btn-sm"
                        onClick={() => {
                          setSelectedStudentIdForDiag(student.id);
                          setActiveTab('diagnostico');
                        }}
                        title="Ver diagnóstico e dificuldades deste aluno"
                      >
                        Diagnóstico
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* =====================================================================
          2. REVIEW DAS TENTATIVAS DOS ALUNOS (SEÇÃO 13 - DESTAQUE PRINCIPAL)
          ===================================================================== */}
      {activeTab === 'review_tentativas' && (
        <div>
          <div style={{ marginBottom: '1.5rem' }}>
            <span className="badge badge-primary" style={{ marginBottom: '0.35rem' }}>
              <Eye size={14} /> Auditoria Pedagógica Completa
            </span>
            <h3 style={{ fontSize: '1.4rem', color: 'var(--text-main)' }}>
              Review das Tentativas da Turma
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
              Abra qualquer resolução e veja <strong>exatamente o que o aluno marcou, onde errou e qual era a resposta correta</strong>, permitindo intervenções assertivas.
            </p>
          </div>

          {/* Filtros por Aluno e Busca */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center', marginBottom: '1.5rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-soft)', textTransform: 'uppercase', marginBottom: '0.25rem' }}>
                Filtrar por Aluno:
              </label>
              <select
                value={selectedStudentFilter}
                onChange={(e) => setSelectedStudentFilter(e.target.value)}
                style={{
                  padding: '0.5rem 0.85rem',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--border-subtle)',
                  fontSize: '0.9rem',
                  fontFamily: 'var(--font-sans)',
                  backgroundColor: '#ffffff'
                }}
              >
                <option value="todos">Todos os Alunos ({attempts.length} tentativas)</option>
                {students.map(s => (
                  <option key={s.id} value={s.id}>{s.nome}</option>
                ))}
              </select>
            </div>

            <div style={{ flex: 1, minWidth: '240px' }}>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-soft)', textTransform: 'uppercase', marginBottom: '0.25rem' }}>
                Pesquisar:
              </label>
              <input
                type="text"
                placeholder="Buscar por nome do aluno ou da atividade..."
                value={attemptSearch}
                onChange={(e) => setAttemptSearch(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.5rem 0.85rem',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--border-subtle)',
                  fontSize: '0.9rem',
                  fontFamily: 'var(--font-sans)'
                }}
              />
            </div>
          </div>

          {/* Tabela do Review das Tentativas Solicitada na Seção 13 */}
          <div className="table-responsive">
            <table className="custom-table">
              <thead>
                <tr>
                  <th>Aluno</th>
                  <th>Data & Horário</th>
                  <th>Atividade Realizada</th>
                  <th>Tentativa Nº</th>
                  <th>Questões</th>
                  <th>Acertos / Erros</th>
                  <th>Aproveitamento</th>
                  <th>Tempo</th>
                  <th>Ação Pedagógica</th>
                </tr>
              </thead>
              <tbody>
                {filteredAttempts.map((att) => (
                  <tr key={att.id}>
                    <td>
                      <div style={{ fontWeight: 600, color: 'var(--text-main)' }}>{att.alunoNome}</div>
                    </td>
                    <td>
                      <div style={{ fontSize: '0.85rem' }}>{att.data}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-soft)' }}>{att.horario}</div>
                    </td>
                    <td>
                      <div style={{ fontWeight: 600 }}>{att.atividadeTitulo}</div>
                      <span className="badge badge-primary" style={{ fontSize: '0.65rem' }}>{att.nivel}</span>
                    </td>
                    <td>
                      <span className="badge badge-warning" style={{ fontWeight: 700 }}>
                        #{att.tentativaNumero}
                      </span>
                    </td>
                    <td>{att.totalQuestoes}</td>
                    <td>
                      <span style={{ color: 'var(--success-dark)', fontWeight: 600 }}>✓ {att.acertos}</span>
                      {' / '}
                      <span style={{ color: 'var(--danger-dark)', fontWeight: 600 }}>✗ {att.erros}</span>
                    </td>
                    <td>
                      <span className={`badge ${att.porcentagem >= 70 ? 'badge-success' : 'badge-danger'}`}>
                        {att.porcentagem}%
                      </span>
                    </td>
                    <td style={{ fontSize: '0.85rem', color: 'var(--text-soft)' }}>
                      {att.tempoFormatado || `${att.tempoSegundos}s`}
                    </td>
                    <td>
                      {/* Botão Solicitado na Seção 13: "Ver tentativa completa" */}
                      <button
                        className="btn btn-primary btn-sm"
                        onClick={() => setSelectedAttemptModal(att)}
                        title="Ver cada questão, resposta do aluno e resposta correta"
                      >
                        <Eye size={14} /> Ver Tentativa Completa
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* =====================================================================
          3. ANÁLISE DAS DIFICULDADES & COMPARAÇÃO ENTRE TENTATIVAS (SEÇÕES 14 E 15)
          ===================================================================== */}
      {activeTab === 'diagnostico' && (
        <div>
          {/* Seletor de Aluno para Diagnóstico */}
          <div className="card" style={{ marginBottom: '2rem', padding: '1.25rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
              <div>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-soft)', textTransform: 'uppercase' }}>
                  SELECIONE O ALUNO PARA DIAGNÓSTICO INDIVIDUAL:
                </span>
                <select
                  value={selectedStudentIdForDiag}
                  onChange={(e) => setSelectedStudentIdForDiag(e.target.value)}
                  style={{
                    display: 'block',
                    marginTop: '0.35rem',
                    padding: '0.5rem 1rem',
                    fontSize: '1rem',
                    fontWeight: 600,
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--border-subtle)',
                    fontFamily: 'var(--font-sans)',
                    backgroundColor: '#ffffff'
                  }}
                >
                  {students.map(s => (
                    <option key={s.id} value={s.id}>{s.nome} ({s.turma})</option>
                  ))}
                </select>
              </div>

              <div style={{ display: 'flex', gap: '1rem' }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--primary)' }}>
                    {currentDiagStudent?.aproveitamento}%
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-soft)' }}>Média Geral</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-main)' }}>
                    {diagStudentAttempts.length}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-soft)' }}>Tentativas</div>
                </div>
              </div>
            </div>
          </div>

          {/* DIAGNÓSTICO AUTOMÁTICO DE ERROS (SEÇÃO 14) */}
          <div className="card" style={{ marginBottom: '2rem' }}>
            <h3 style={{ fontSize: '1.3rem', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <AlertTriangle size={20} color="var(--warning-dark)" /> Análise Automática de Dificuldades (Seção 14)
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '1.5rem' }}>
              O sistema analisa os erros acumulados do aluno e emite o parecer diagnóstico imediato:
            </p>

            {/* Mensagem Diagnóstica Automática no Modelo Exato da Seção 14 */}
            <div style={{
              padding: '1.25rem',
              borderRadius: 'var(--radius-md)',
              backgroundColor: '#fffbeb',
              border: '1px solid var(--warning-border)',
              color: '#92400e',
              fontSize: '1.05rem',
              fontWeight: 600,
              marginBottom: '1.5rem'
            }}>
              {hardestRuleForDiag ? (
                <>
                  📢 <strong>Aluno: {currentDiagStudent?.nome}</strong><br />
                  “{currentDiagStudent?.nome} apresenta maior dificuldade no conteúdo de <u>{hardestRuleForDiag.nome}</u> ({hardestRuleForDiag.porcentagem}% de acerto). Recomenda-se revisar essa regra em sala de aula ou atribuir lista de exercícios específica.”
                </>
              ) : (
                <>
                  “{currentDiagStudent?.nome} ainda não possui histórico de respostas suficiente para o diagnóstico de erros.”
                </>
              )}
            </div>

            {/* Lista com o Aproveitamento por Regra do Aluno (Modelo da Seção 14) */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
              {diagRuleBreakdown.map(r => (
                <div 
                  key={r.id} 
                  style={{
                    padding: '1rem',
                    borderRadius: 'var(--radius-sm)',
                    backgroundColor: 'var(--bg-subtle)',
                    borderLeft: `4px solid ${r.porcentagem >= 75 ? 'var(--success)' : r.porcentagem < 50 ? 'var(--danger)' : 'var(--warning)'}`
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                    <span style={{ fontWeight: 600, fontSize: '0.95rem' }}>{r.nome}</span>
                    <span style={{ fontWeight: 800, color: r.porcentagem >= 75 ? 'var(--success-dark)' : 'var(--danger-dark)' }}>
                      {r.porcentagem}%
                    </span>
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-soft)' }}>
                    {r.acertos} acertos em {r.total} questões analisadas
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* COMPARAÇÃO ENTRE TENTATIVAS (SEÇÃO 15) */}
          <div className="card">
            <h3 style={{ fontSize: '1.3rem', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <TrendingUp size={20} color="var(--primary)" /> Comparação entre Tentativas do Aluno (Seção 15)
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '1.5rem' }}>
              Verifique se o aluno está melhorando após revisar o conteúdo e refazer os exercícios (Ex: Tentativa 1: 50% ➔ Tentativa 2: 70% ➔ Tentativa 3: 90%):
            </p>

            {diagStudentAttempts.length > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                {diagStudentAttempts.map((att, idx) => {
                  const prevAtt = idx > 0 ? diagStudentAttempts[idx - 1] : null;
                  const evolucaoDelta = prevAtt ? att.porcentagem - prevAtt.porcentagem : null;

                  return (
                    <div 
                      key={att.id}
                      style={{
                        padding: '1.25rem',
                        backgroundColor: '#ffffff',
                        border: '1px solid var(--border-subtle)',
                        borderRadius: 'var(--radius-md)',
                        boxShadow: 'var(--shadow-sm)'
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                        <div>
                          <strong style={{ fontSize: '1.1rem' }}>
                            Tentativa {att.tentativaNumero}: {att.porcentagem}% de aproveitamento
                          </strong>
                          <span style={{ fontSize: '0.8rem', color: 'var(--text-soft)', marginLeft: '0.5rem' }}>
                            ({att.data} às {att.horario})
                          </span>
                        </div>

                        {evolucaoDelta !== null && (
                          <span className={`badge ${evolucaoDelta >= 0 ? 'badge-success' : 'badge-danger'}`}>
                            {evolucaoDelta >= 0 ? `+${evolucaoDelta}% de evolução` : `${evolucaoDelta}% de queda`}
                          </span>
                        )}
                      </div>

                      {/* Barra de Progresso Visual */}
                      <div style={{ height: '14px', backgroundColor: 'var(--bg-subtle)', borderRadius: '999px', overflow: 'hidden', marginBottom: '0.75rem' }}>
                        <div 
                          style={{
                            height: '100%',
                            width: `${att.porcentagem}%`,
                            backgroundColor: att.porcentagem >= 70 ? 'var(--success)' : 'var(--warning)',
                            borderRadius: '999px',
                            transition: 'width 0.5s ease'
                          }}
                        />
                      </div>

                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.85rem' }}>
                        <span style={{ color: 'var(--text-muted)' }}>
                          Atividade: <strong>{att.atividadeTitulo}</strong> ({att.acertos}/{att.totalQuestoes} acertos em {att.tempoFormatado})
                        </span>
                        <button 
                          className="btn btn-secondary btn-sm"
                          onClick={() => setSelectedAttemptModal(att)}
                        >
                          Ver Detalhes Desta Tentativa
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div style={{ color: 'var(--text-soft)', fontStyle: 'italic', textAlign: 'center', padding: '1rem' }}>
                Nenhuma tentativa encontrada para este aluno.
              </div>
            )}
          </div>
        </div>
      )}

      {/* =====================================================================
          4. DESEMPENHO GERAL DA TURMA & CONTEÚDOS A REVISAR (SEÇÕES 16 E 17)
          ===================================================================== */}
      {activeTab === 'desempenho_geral' && (
        <div>
          {/* Métricas Globais Solicitadas */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.25rem', marginBottom: '2rem' }}>
            <div className="card" style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--primary)', fontFamily: 'var(--font-heading)' }}>
                {classAnalytics.mediaAproveitamento}%
              </div>
              <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-soft)', textTransform: 'uppercase' }}>
                Média Geral da Turma
              </div>
            </div>

            <div className="card" style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--text-main)', fontFamily: 'var(--font-heading)' }}>
                {classAnalytics.totalAlunos}
              </div>
              <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-soft)', textTransform: 'uppercase' }}>
                Total de Alunos
              </div>
            </div>

            <div className="card" style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--text-main)', fontFamily: 'var(--font-heading)' }}>
                {classAnalytics.totalTentativas}
              </div>
              <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-soft)', textTransform: 'uppercase' }}>
                Total de Tentativas
              </div>
            </div>

            <div className="card" style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--success-dark)', fontFamily: 'var(--font-heading)' }}>
                {classAnalytics.mediaPontuacao}
              </div>
              <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-soft)', textTransform: 'uppercase' }}>
                Pontuação Média
              </div>
            </div>
          </div>

          {/* INSIGHTS PEDAGÓGICOS E REVISÃO RECOMENDADA (SEÇÃO 17) */}
          <div className="card" style={{ backgroundColor: '#eff6ff', borderColor: '#bfdbfe', marginBottom: '2rem' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
              <Sparkles size={28} color="var(--primary)" style={{ flexShrink: 0, marginTop: '2px' }} />
              <div>
                <h4 style={{ fontSize: '1.2rem', color: 'var(--primary-text)', marginBottom: '0.5rem' }}>
                  Identificação dos Conteúdos para Nova Aula / Revisão (Seção 17)
                </h4>
                <p style={{ color: 'var(--text-main)', fontSize: '1rem', lineHeight: '1.6', marginBottom: '0.75rem' }}>
                  📌 <strong>Diagnóstico Pedagógico do Sistema: </strong>
                  “A maioria dos alunos apresentou dificuldade no uso da vírgula em <strong>orações coordenadas sindéticas adversativas</strong> e no <strong>adjunto adverbial longo</strong>. 
                  Recomenda-se iniciar a próxima aula de Língua Portuguesa com um reforço sobre a posição obrigatória da vírgula antes de 'mas' e 'porém'.”
                </p>
                <p style={{ color: 'var(--text-main)', fontSize: '1rem', lineHeight: '1.6' }}>
                  📈 <strong>Curva de Aprendizagem Positiva: </strong>
                  “Após a segunda tentativa, a média da turma em <em>Vocativo e Aposto</em> aumentou expressivamente de <strong>62% para 85%</strong> de aproveitamento.”
                </p>
              </div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '2rem' }}>
            {/* RANKING: MAIOR DIFICULDADE DA TURMA (SEÇÃO 16) */}
            <div className="card">
              <h4 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>
                Ranking: Maior Dificuldade da Turma
              </h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-soft)', marginBottom: '1.25rem' }}>
                Conteúdos ordenados do menor para o maior percentual de acerto da turma:
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {classAnalytics.rankingDificuldades.map((item, index) => (
                  <div key={item.id} className="difficulty-ranking-bar">
                    <div className="difficulty-label">
                      <span style={{ fontWeight: 800, color: 'var(--danger-dark)', marginRight: '6px' }}>
                        {index + 1}º
                      </span>
                      {item.nome}
                    </div>

                    <div className="difficulty-meter">
                      <div 
                        className="difficulty-fill" 
                        style={{
                          width: `${item.porcentagem}%`,
                          backgroundColor: item.porcentagem < 60 ? 'var(--danger)' : item.porcentagem < 75 ? 'var(--warning)' : 'var(--success)'
                        }}
                      />
                    </div>

                    <div style={{ width: '60px', textAlign: 'right', fontWeight: 800, fontSize: '0.9rem', color: 'var(--text-main)' }}>
                      {item.porcentagem}%
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* DESTAQUE DE ALUNOS: MAIOR EVOLUÇÃO VS PRECISAM DE ATENÇÃO (SEÇÃO 16) */}
            <div className="card">
              <h4 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>
                Foco Pedagógico nos Estudantes
              </h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-soft)', marginBottom: '1.25rem' }}>
                Alunos com alto desempenho e alunos que necessitam de intervenção docente:
              </p>

              <div style={{ marginBottom: '1.5rem' }}>
                <span className="badge badge-success" style={{ marginBottom: '0.5rem' }}>
                  🌟 Alunos que Mais Evoluíram (Destaques)
                </span>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '0.5rem' }}>
                  {classAnalytics.alunosDestaque.slice(0, 3).map(s => (
                    <div key={s.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.6rem 0.85rem', backgroundColor: 'var(--success-light)', borderRadius: 'var(--radius-sm)' }}>
                      <span style={{ fontWeight: 600, color: 'var(--success-dark)' }}>{s.nome}</span>
                      <span style={{ fontWeight: 800, color: 'var(--success-dark)' }}>{s.aproveitamento}% ({s.pontuacao} pts)</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <span className="badge badge-danger" style={{ marginBottom: '0.5rem' }}>
                  ⚠️ Alunos que Precisam de Maior Atenção
                </span>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '0.5rem' }}>
                  {classAnalytics.alunosAtencao.slice(0, 3).map(s => (
                    <div key={s.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.6rem 0.85rem', backgroundColor: 'var(--danger-light)', borderRadius: 'var(--radius-sm)' }}>
                      <span style={{ fontWeight: 600, color: 'var(--danger-dark)' }}>{s.nome}</span>
                      <span style={{ fontWeight: 800, color: 'var(--danger-dark)' }}>{s.aproveitamento}% (Reforço Recomendado)</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================================
          5. BANCO DE QUESTÕES & GESTÃO DE EXERCÍCIOS (SEÇÕES 18 E 19)
          ===================================================================== */}
      {activeTab === 'banco_exercicios' && (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem' }}>
            <div>
              <h3 style={{ fontSize: '1.4rem', color: 'var(--text-main)' }}>
                Banco de Questões de Vírgula ({questions.length} questões)
              </h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
                Organize, filtre por conteúdo sintático, edite e cadastre novos exercícios para as atividades da turma.
              </p>
            </div>

            <button className="btn btn-primary" onClick={() => setNewQModalOpen(true)}>
              <PlusCircle size={16} /> Cadastrar Nova Questão
            </button>
          </div>

          {/* Filtros Solicitados na Seção 19: Conteúdo, Dificuldade, Tipo de Questão */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center', marginBottom: '1.5rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-soft)', textTransform: 'uppercase', marginBottom: '0.25rem' }}>
                Filtrar Conteúdo:
              </label>
              <select
                value={bankRegraFilter}
                onChange={(e) => setBankRegraFilter(e.target.value)}
                style={{
                  padding: '0.5rem 0.85rem',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--border-subtle)',
                  fontSize: '0.85rem',
                  fontFamily: 'var(--font-sans)',
                  backgroundColor: '#ffffff'
                }}
              >
                <option value="todas">Todos os Conteúdos</option>
                {grammarRules.map(r => (
                  <option key={r.id} value={r.id}>{r.nome}</option>
                ))}
                <option value="nao_usar_sujeito">Quando NÃO Usar: Sujeito e Predicado</option>
                <option value="nao_usar_verbo">Quando NÃO Usar: Verbo e Complemento</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-soft)', textTransform: 'uppercase', marginBottom: '0.25rem' }}>
                Dificuldade:
              </label>
              <select
                value={bankNivelFilter}
                onChange={(e) => setBankNivelFilter(e.target.value)}
                style={{
                  padding: '0.5rem 0.85rem',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--border-subtle)',
                  fontSize: '0.85rem',
                  fontFamily: 'var(--font-sans)',
                  backgroundColor: '#ffffff'
                }}
              >
                <option value="todos">Todos os Níveis</option>
                <option value="facil">Fácil</option>
                <option value="medio">Médio</option>
                <option value="dificil">Difícil</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-soft)', textTransform: 'uppercase', marginBottom: '0.25rem' }}>
                Tipo de Questão:
              </label>
              <select
                value={bankTipoFilter}
                onChange={(e) => setBankTipoFilter(e.target.value)}
                style={{
                  padding: '0.5rem 0.85rem',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--border-subtle)',
                  fontSize: '0.85rem',
                  fontFamily: 'var(--font-sans)',
                  backgroundColor: '#ffffff'
                }}
              >
                <option value="todos">Todos os Formatos</option>
                <option value="coloque_a_virgula">Coloque a vírgula</option>
                <option value="correto_ou_incorreto">Correto ou Incorreto</option>
                <option value="escolha_a_alternativa">Escolha a Alternativa</option>
                <option value="identifique_a_regra">Identifique a Regra</option>
              </select>
            </div>
          </div>

          {/* Listagem das Questões do Banco */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {filteredBank.map((q) => (
              <div 
                key={q.id}
                style={{
                  backgroundColor: '#ffffff',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-md)',
                  padding: '1.25rem',
                  boxShadow: 'var(--shadow-sm)'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                  <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                    <span className="badge badge-primary">{q.regraNome}</span>
                    <span className="badge badge-warning" style={{ textTransform: 'capitalize' }}>Nível {q.nivel}</span>
                    <span className="badge badge-secondary" style={{ fontSize: '0.7rem' }}>
                      Tipo: {q.tipo.replace(/_/g, ' ')}
                    </span>
                  </div>

                  <button
                    className="btn btn-secondary btn-sm"
                    onClick={() => deleteQuestion(q.id)}
                    style={{ color: 'var(--danger-dark)', borderColor: 'var(--danger-border)' }}
                    title="Excluir questão do banco"
                  >
                    <Trash2 size={14} /> Excluir
                  </button>
                </div>

                <div style={{ fontSize: '1.05rem', fontWeight: 600, color: 'var(--text-main)', marginBottom: '0.75rem', whiteSpace: 'pre-line' }}>
                  {q.enunciado}
                </div>

                <div style={{ fontSize: '0.9rem', color: 'var(--success-dark)', backgroundColor: 'var(--success-light)', padding: '0.5rem 0.85rem', borderRadius: 'var(--radius-sm)', marginBottom: '0.5rem' }}>
                  <strong>Gabarito Correto: </strong> {q.fraseCorreta || q.respostaCorreta}
                </div>

                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                  <strong>Explicação Didática: </strong> {q.explicacao}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* =====================================================================
          MODAL: CADASTRO DE EXERCÍCIO PELO PROFESSOR (SEÇÃO 18)
          ===================================================================== */}
      {newQModalOpen && (
        <div className="modal-overlay" onClick={() => setNewQModalOpen(false)}>
          <div className="modal-dialog" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '700px' }}>
            <div className="modal-header">
              <h3 style={{ fontSize: '1.3rem' }}>Cadastrar Novo Exercício no Banco</h3>
              <button className="modal-close-btn" onClick={() => setNewQModalOpen(false)}>✕</button>
            </div>

            <form onSubmit={handleCreateQuestion}>
              <div className="modal-body" style={{ maxHeight: '70vh', overflowY: 'auto' }}>
                <div style={{ marginBottom: '1rem' }}>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.35rem' }}>
                    Regra da Vírgula Relacionada
                  </label>
                  <select
                    value={newQRegraId}
                    onChange={(e) => setNewQRegraId(e.target.value)}
                    style={{ width: '100%', padding: '0.6rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}
                  >
                    {grammarRules.map(r => (
                      <option key={r.id} value={r.id}>{r.nome}</option>
                    ))}
                    <option value="nao_usar_sujeito">Quando NÃO Usar: Sujeito e Predicado</option>
                    <option value="nao_usar_verbo">Quando NÃO Usar: Verbo e Complemento</option>
                  </select>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.35rem' }}>
                      Nível de Dificuldade
                    </label>
                    <select
                      value={newQNivel}
                      onChange={(e) => setNewQNivel(e.target.value)}
                      style={{ width: '100%', padding: '0.6rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}
                    >
                      <option value="facil">Fácil</option>
                      <option value="medio">Médio</option>
                      <option value="dificil">Difícil</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.35rem' }}>
                      Tipo da Questão
                    </label>
                    <select
                      value={newQTipo}
                      onChange={(e) => setNewQTipo(e.target.value)}
                      style={{ width: '100%', padding: '0.6rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}
                    >
                      <option value="escolha_a_alternativa">Escolha a Alternativa</option>
                      <option value="correto_ou_incorreto">Correto ou Incorreto</option>
                      <option value="identifique_a_regra">Identifique a Regra</option>
                    </select>
                  </div>
                </div>

                <div style={{ marginBottom: '1rem' }}>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.35rem' }}>
                    Enunciado / Pergunta Apresentada ao Aluno
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={newQPrompt}
                    onChange={(e) => setNewQPrompt(e.target.value)}
                    placeholder="Ex: Assinale a frase em que o vocativo foi pontuado corretamente:"
                    style={{ width: '100%', padding: '0.6rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)', fontFamily: 'var(--font-sans)' }}
                  />
                </div>

                {newQTipo === 'escolha_a_alternativa' && (
                  <div style={{ marginBottom: '1rem' }}>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.35rem' }}>
                      Alternativas da Questão (Preencha 4 opções)
                    </label>
                    {newQAlternativas.map((alt, idx) => (
                      <input
                        key={idx}
                        type="text"
                        placeholder={`Alternativa ${String.fromCharCode(65 + idx)}`}
                        value={alt}
                        onChange={(e) => {
                          const updated = [...newQAlternativas];
                          updated[idx] = e.target.value;
                          setNewQAlternativas(updated);
                        }}
                        style={{ width: '100%', padding: '0.5rem', marginBottom: '0.4rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}
                      />
                    ))}
                  </div>
                )}

                <div style={{ marginBottom: '1rem' }}>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.35rem' }}>
                    Resposta Correta (Gabarito Exato)
                  </label>
                  <input
                    type="text"
                    required
                    value={newQRespostaCorreta}
                    onChange={(e) => setNewQRespostaCorreta(e.target.value)}
                    placeholder="Cole aqui o texto exato da resposta correta (ou Correto/Incorreto)"
                    style={{ width: '100%', padding: '0.6rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}
                  />
                </div>

                <div style={{ marginBottom: '1rem' }}>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.35rem' }}>
                    Explicação Didática da Regra
                  </label>
                  <textarea
                    rows={2}
                    required
                    value={newQExplicacao}
                    onChange={(e) => setNewQExplicacao(e.target.value)}
                    placeholder="Explique ao aluno de forma simples o porquê desta resposta..."
                    style={{ width: '100%', padding: '0.6rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)', fontFamily: 'var(--font-sans)' }}
                  />
                </div>

                {newQSuccess && (
                  <div style={{ padding: '0.75rem', backgroundColor: 'var(--success-light)', color: 'var(--success-dark)', borderRadius: 'var(--radius-sm)', fontWeight: 600 }}>
                    ✓ Questão salva com sucesso no Banco de Questões!
                  </div>
                )}
              </div>

              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setNewQModalOpen(false)}>
                  Cancelar
                </button>
                <button type="submit" className="btn btn-primary">
                  Salvar Questão
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
