import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  User, 
  Award, 
  CheckCircle2, 
  KeyRound, 
  UserPlus, 
  LogIn, 
  ShieldCheck, 
  Sparkles,
  BarChart3,
  Calendar,
  Mail,
  School
} from 'lucide-react';

export default function ProfileView() {
  const { 
    currentStudent, 
    students, 
    setCurrentStudentId, 
    registerStudent, 
    loginStudent 
  } = useApp();

  const [activeTabMode, setActiveTabMode] = useState('perfil'); // 'perfil', 'login', 'cadastro', 'recuperacao'

  // Form states
  const [loginEmail, setLoginEmail] = useState('');
  const [loginMsg, setLoginMsg] = useState(null);

  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regTurma, setRegTurma] = useState('2º Ano A');
  const [regSuccess, setRegSuccess] = useState(null);

  const [recEmail, setRecEmail] = useState('');
  const [recSuccess, setRecSuccess] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    const res = loginStudent(loginEmail);
    if (res.success) {
      setLoginMsg({ type: 'success', text: `Bem-vindo de volta, ${res.student.nome}!` });
      setTimeout(() => {
        setActiveTabMode('perfil');
        setLoginMsg(null);
      }, 1000);
    } else {
      setLoginMsg({ type: 'error', text: res.message });
    }
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if (!regName || !regEmail) return;

    const newS = registerStudent({
      nome: regName,
      email: regEmail,
      turma: regTurma
    });

    setRegSuccess(`Cadastro realizado com sucesso para ${newS.nome}!`);
    setTimeout(() => {
      setActiveTabMode('perfil');
      setRegSuccess(null);
      setRegName('');
      setRegEmail('');
    }, 1200);
  };

  const handleRecover = (e) => {
    e.preventDefault();
    if (!recEmail) return;
    setRecSuccess(true);
  };

  return (
    <div className="profile-page-container" style={{ maxWidth: '850px', margin: '0 auto' }}>
      {/* Navegador de Modos da Conta */}
      <div style={{ display: 'flex', gap: '0.5rem', borderBottom: '1px solid var(--border-subtle)', marginBottom: '2rem' }}>
        <button
          className={`teacher-tab-btn ${activeTabMode === 'perfil' ? 'active' : ''}`}
          onClick={() => setActiveTabMode('perfil')}
        >
          <User size={16} /> Meu Perfil
        </button>
        <button
          className={`teacher-tab-btn ${activeTabMode === 'login' ? 'active' : ''}`}
          onClick={() => setActiveTabMode('login')}
        >
          <LogIn size={16} /> Trocar Conta / Login
        </button>
        <button
          className={`teacher-tab-btn ${activeTabMode === 'cadastro' ? 'active' : ''}`}
          onClick={() => setActiveTabMode('cadastro')}
        >
          <UserPlus size={16} /> Cadastro de Aluno
        </button>
        <button
          className={`teacher-tab-btn ${activeTabMode === 'recuperacao' ? 'active' : ''}`}
          onClick={() => setActiveTabMode('recuperacao')}
        >
          <KeyRound size={16} /> Recuperação de Senha
        </button>
      </div>

      {/* 1. ABA DO PERFIL DO ALUNO COM TODOS OS DADOS SOLICITADOS (SEÇÃO 2) */}
      {activeTabMode === 'perfil' && currentStudent && (
        <div>
          <div className="card" style={{ padding: '2rem', marginBottom: '2rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '1.5rem', marginBottom: '1.5rem' }}>
              <div className="user-avatar-circle" style={{ width: '70px', height: '70px', fontSize: '2rem' }}>
                {currentStudent.nome.charAt(0)}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                  <h2 style={{ fontSize: '1.8rem', color: 'var(--text-main)' }}>{currentStudent.nome}</h2>
                  <span className="badge badge-primary">{currentStudent.turma}</span>
                  <span className="badge badge-warning">{currentStudent.nivelGamificacao}</span>
                </div>
                <div style={{ color: 'var(--text-soft)', fontSize: '0.9rem', marginTop: '0.25rem' }}>
                  <Mail size={14} style={{ display: 'inline', marginRight: '4px', verticalAlign: 'middle' }} />
                  {currentStudent.email}
                </div>
              </div>

              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-soft)', textTransform: 'uppercase', fontWeight: 700 }}>
                  Última Atividade
                </div>
                <div style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-main)' }}>
                  {currentStudent.ultimaAtividade}
                </div>
              </div>
            </div>

            {/* Métricas Solicitadas na Seção 2: Nome, Pontuação, Quantidade de Exercícios, Quantidade de Acertos, Porcentagem de Aproveitamento, Evolução */}
            <h4 style={{ fontSize: '1.1rem', marginBottom: '1rem', color: 'var(--text-main)' }}>
              Estatísticas Gerais do Aluno
            </h4>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
              <div className="stat-metric-card">
                <div className="stat-metric-number">{currentStudent.pontuacao}</div>
                <div className="stat-metric-label">Pontuação Total</div>
              </div>
              <div className="stat-metric-card">
                <div className="stat-metric-number">{currentStudent.exerciciosRealizados}</div>
                <div className="stat-metric-label">Exercícios Realizados</div>
              </div>
              <div className="stat-metric-card">
                <div className="stat-metric-number" style={{ color: 'var(--success)' }}>
                  {currentStudent.acertos}
                </div>
                <div className="stat-metric-label">Quantidade de Acertos</div>
              </div>
              <div className="stat-metric-card">
                <div className="stat-metric-number">{currentStudent.aproveitamento}%</div>
                <div className="stat-metric-label">Aproveitamento Geral</div>
              </div>
            </div>

            {/* Conquistas / Evolução nas Atividades */}
            <h4 style={{ fontSize: '1.1rem', marginBottom: '0.75rem', color: 'var(--text-main)' }}>
              Conquistas e Medalhas Sintáticas
            </h4>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
              {(currentStudent.conquistas || []).map((badge, idx) => (
                <div
                  key={idx}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.5rem 1rem',
                    backgroundColor: '#fef3c7',
                    border: '1px solid #fde68a',
                    borderRadius: 'var(--radius-full)',
                    color: '#92400e',
                    fontSize: '0.85rem',
                    fontWeight: 600
                  }}
                >
                  <Award size={16} color="#b45309" /> {badge}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 2. ABA DE LOGIN / TROCA RÁPIDA DE ALUNO */}
      {activeTabMode === 'login' && (
        <div className="card" style={{ padding: '2rem' }}>
          <h3 style={{ fontSize: '1.4rem', marginBottom: '0.5rem' }}>Acesso à Conta do Aluno</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '1.5rem' }}>
            Entre com seu e-mail cadastrado ou selecione rapidamente um aluno da turma para testar o sistema:
          </p>

          <form onSubmit={handleLogin} style={{ marginBottom: '2rem' }}>
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.35rem' }}>
                E-mail do Aluno
              </label>
              <input
                type="email"
                required
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                placeholder="exemplo: lucas.silva@escola.edu.br"
                style={{
                  width: '100%',
                  padding: '0.65rem 0.85rem',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--border-subtle)',
                  fontSize: '0.95rem'
                }}
              />
            </div>

            <div style={{ marginBottom: '1.25rem' }}>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.35rem' }}>
                Senha
              </label>
              <input
                type="password"
                required
                defaultValue="123456"
                placeholder="******"
                style={{
                  width: '100%',
                  padding: '0.65rem 0.85rem',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--border-subtle)',
                  fontSize: '0.95rem'
                }}
              />
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
              <LogIn size={16} /> Entrar no Sistema
            </button>
          </form>

          {loginMsg && (
            <div style={{
              padding: '0.75rem',
              borderRadius: 'var(--radius-sm)',
              marginBottom: '1.5rem',
              backgroundColor: loginMsg.type === 'success' ? 'var(--success-light)' : 'var(--danger-light)',
              color: loginMsg.type === 'success' ? 'var(--success-dark)' : 'var(--danger-dark)',
              fontWeight: 600,
              fontSize: '0.9rem'
            }}>
              {loginMsg.text}
            </div>
          )}

          {/* Troca Rápida de Alunos para Demonstração */}
          <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '1.5rem' }}>
            <h4 style={{ fontSize: '0.95rem', color: 'var(--text-soft)', textTransform: 'uppercase', marginBottom: '1rem' }}>
              Troca Rápida (Alunos da Turma para Testes):
            </h4>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '0.75rem' }}>
              {students.map(s => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => {
                    setCurrentStudentId(s.id);
                    setActiveTabMode('perfil');
                  }}
                  className={`btn btn-secondary btn-sm ${currentStudent?.id === s.id ? 'active' : ''}`}
                  style={{
                    justifyContent: 'flex-start',
                    borderColor: currentStudent?.id === s.id ? 'var(--primary)' : 'var(--border-subtle)',
                    backgroundColor: currentStudent?.id === s.id ? 'var(--primary-light)' : '#ffffff'
                  }}
                >
                  <div className="user-avatar-circle" style={{ width: '22px', height: '22px', fontSize: '0.7rem' }}>
                    {s.nome.charAt(0)}
                  </div>
                  <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {s.nome}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 3. ABA DE CADASTRO DE ALUNO */}
      {activeTabMode === 'cadastro' && (
        <div className="card" style={{ padding: '2rem' }}>
          <h3 style={{ fontSize: '1.4rem', marginBottom: '0.5rem' }}>Cadastro de Novo Aluno</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '1.5rem' }}>
            Crie sua conta para começar a estudar as regras da vírgula e acompanhar suas notas:
          </p>

          <form onSubmit={handleRegister}>
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.35rem' }}>
                Nome Completo do Aluno
              </label>
              <input
                type="text"
                required
                value={regName}
                onChange={(e) => setRegName(e.target.value)}
                placeholder="exemplo: Larissa Mendes"
                style={{
                  width: '100%',
                  padding: '0.65rem 0.85rem',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--border-subtle)',
                  fontSize: '0.95rem'
                }}
              />
            </div>

            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.35rem' }}>
                E-mail Institucional ou Pessoal
              </label>
              <input
                type="email"
                required
                value={regEmail}
                onChange={(e) => setRegEmail(e.target.value)}
                placeholder="exemplo: larissa.mendes@escola.edu.br"
                style={{
                  width: '100%',
                  padding: '0.65rem 0.85rem',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--border-subtle)',
                  fontSize: '0.95rem'
                }}
              />
            </div>

            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.35rem' }}>
                Turma / Ano Escolar
              </label>
              <select
                value={regTurma}
                onChange={(e) => setRegTurma(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.65rem 0.85rem',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--border-subtle)',
                  fontSize: '0.95rem',
                  backgroundColor: '#ffffff'
                }}
              >
                <option value="1º Ano A - Ensino Médio">1º Ano A - Ensino Médio</option>
                <option value="2º Ano A - Ensino Médio">2º Ano A - Ensino Médio</option>
                <option value="2º Ano B - Ensino Médio">2º Ano B - Ensino Médio</option>
                <option value="3º Ano A - Pré-Vestibular">3º Ano A - Pré-Vestibular</option>
              </select>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.35rem' }}>
                Crie uma Senha
              </label>
              <input
                type="password"
                required
                placeholder="Mínimo 6 caracteres"
                style={{
                  width: '100%',
                  padding: '0.65rem 0.85rem',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--border-subtle)',
                  fontSize: '0.95rem'
                }}
              />
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
              <UserPlus size={16} /> Finalizar Cadastro
            </button>
          </form>

          {regSuccess && (
            <div style={{
              marginTop: '1.5rem',
              padding: '0.85rem',
              borderRadius: 'var(--radius-sm)',
              backgroundColor: 'var(--success-light)',
              color: 'var(--success-dark)',
              fontWeight: 600,
              fontSize: '0.9rem'
            }}>
              ✓ {regSuccess}
            </div>
          )}
        </div>
      )}

      {/* 4. ABA DE RECUPERAÇÃO DE SENHA */}
      {activeTabMode === 'recuperacao' && (
        <div className="card" style={{ padding: '2rem' }}>
          <h3 style={{ fontSize: '1.4rem', marginBottom: '0.5rem' }}>Recuperação de Senha</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '1.5rem' }}>
            Esqueceu sua senha? Informe seu e-mail cadastrado e enviaremos um link seguro para redefinição:
          </p>

          {!recSuccess ? (
            <form onSubmit={handleRecover}>
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.35rem' }}>
                  E-mail do Aluno
                </label>
                <input
                  type="email"
                  required
                  value={recEmail}
                  onChange={(e) => setRecEmail(e.target.value)}
                  placeholder="seu.email@escola.edu.br"
                  style={{
                    width: '100%',
                    padding: '0.65rem 0.85rem',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--border-subtle)',
                    fontSize: '0.95rem'
                  }}
                />
              </div>

              <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                <KeyRound size={16} /> Enviar Link de Recuperação
              </button>
            </form>
          ) : (
            <div style={{
              padding: '1.5rem',
              borderRadius: 'var(--radius-md)',
              backgroundColor: 'var(--success-light)',
              color: 'var(--success-dark)',
              textAlign: 'center'
            }}>
              <CheckCircle2 size={36} style={{ margin: '0 auto 0.75rem' }} />
              <h4 style={{ fontSize: '1.15rem', marginBottom: '0.5rem' }}>Instruções Enviadas!</h4>
              <p style={{ fontSize: '0.95rem', marginBottom: '1.25rem' }}>
                Um link de redefinição de acesso foi enviado para <strong>{recEmail}</strong>. Verifique sua caixa de entrada e spam.
              </p>
              <button className="btn btn-secondary btn-sm" onClick={() => { setRecSuccess(false); setActiveTabMode('login'); }}>
                Voltar ao Login
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
