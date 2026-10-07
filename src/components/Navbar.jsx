import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  BookOpen, 
  HelpCircle, 
  CheckSquare, 
  BarChart3, 
  History, 
  GraduationCap, 
  AlertTriangle,
  Lightbulb,
  User,
  Home
} from 'lucide-react';

export default function Navbar() {
  const { 
    activeTab, 
    setActiveTab, 
    role, 
    switchToTeacher, 
    switchToStudent, 
    currentStudent, 
    mockTeacher 
  } = useApp();

  return (
    <header className="navbar-wrapper">
      <div className="navbar-inner">
        {/* Logo / Brand */}
        <button 
          className="brand-link" 
          onClick={() => setActiveTab('home')}
          title="Ir para a Página Inicial"
        >
          <div className="brand-icon-box">✍️</div>
          <div className="brand-text-col">
            <div className="brand-title">Vírgula sem Mistério</div>
            <div className="brand-subtitle-tag">Português • Ensino Médio</div>
          </div>
        </button>

        {/* Navigation Tabs */}
        <nav>
          <ul className="nav-links">
            <li>
              <button 
                className={`nav-item-btn ${activeTab === 'home' ? 'active' : ''}`}
                onClick={() => setActiveTab('home')}
              >
                <Home size={16} /> Início
              </button>
            </li>
            <li>
              <button 
                className={`nav-item-btn ${activeTab === 'aprender' ? 'active' : ''}`}
                onClick={() => setActiveTab('aprender')}
              >
                <BookOpen size={16} /> Aprender
              </button>
            </li>
            <li>
              <button 
                className={`nav-item-btn ${activeTab === 'nao_usar' ? 'active' : ''}`}
                onClick={() => setActiveTab('nao_usar')}
                style={{ color: activeTab === 'nao_usar' ? 'var(--danger-dark)' : 'var(--danger)' }}
              >
                <AlertTriangle size={16} /> Quando NÃO Usar
              </button>
            </li>
            <li>
              <button 
                className={`nav-item-btn ${activeTab === 'dicas' ? 'active' : ''}`}
                onClick={() => setActiveTab('dicas')}
              >
                <Lightbulb size={16} /> Dicas Rápidas
              </button>
            </li>
            <li>
              <button 
                className={`nav-item-btn ${activeTab === 'exercicios' ? 'active' : ''}`}
                onClick={() => setActiveTab('exercicios')}
              >
                <CheckSquare size={16} /> Exercícios
              </button>
            </li>
            <li>
              <button 
                className={`nav-item-btn ${activeTab === 'desempenho' ? 'active' : ''}`}
                onClick={() => setActiveTab('desempenho')}
              >
                <BarChart3 size={16} /> Meu Desempenho
              </button>
            </li>
            <li>
              <button 
                className={`nav-item-btn ${activeTab === 'historico' ? 'active' : ''}`}
                onClick={() => setActiveTab('historico')}
              >
                <History size={16} /> Histórico
              </button>
            </li>
            <li>
              <button 
                className={`nav-item-btn ${activeTab === 'professor' ? 'active' : ''}`}
                onClick={() => {
                  switchToTeacher();
                }}
                style={{ fontWeight: 700 }}
              >
                <GraduationCap size={16} /> Área do Professor
              </button>
            </li>
          </ul>
        </nav>

        {/* User Role Switcher & Profile Badge */}
        <div className="nav-actions">
          {/* Alternador Rápido Aluno / Professor */}
          <div className="role-switcher-badge" title="Alternar visão entre Aluno e Professor">
            <button 
              className={`role-switch-btn ${role === 'aluno' ? 'active' : ''}`}
              onClick={() => switchToStudent()}
            >
              <User size={13} /> Aluno
            </button>
            <button 
              className={`role-switch-btn ${role === 'professor' ? 'active' : ''}`}
              onClick={() => switchToTeacher()}
            >
              <GraduationCap size={13} /> Professor
            </button>
          </div>

          {/* Badge do Usuário Logado */}
          <button 
            className="user-profile-badge"
            onClick={() => setActiveTab(role === 'aluno' ? 'perfil' : 'professor')}
            title="Ver perfil / configurações de conta"
          >
            <div className="user-avatar-circle">
              {role === 'aluno' 
                ? (currentStudent?.nome?.charAt(0) || 'A')
                : 'P'
              }
            </div>
            <div className="user-badge-name">
              {role === 'aluno' ? currentStudent?.nome : mockTeacher?.nome}
            </div>
          </button>
        </div>
      </div>
    </header>
  );
}
