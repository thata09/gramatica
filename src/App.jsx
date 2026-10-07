import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import Navbar from './components/Navbar';
import HomeView from './components/HomeView';
import LearnView from './components/LearnView';
import ProhibitedView from './components/ProhibitedView';
import QuickTipsView from './components/QuickTipsView';
import ExercisesView from './components/ExercisesView';
import PerformanceView from './components/PerformanceView';
import HistoryView from './components/HistoryView';
import ProfileView from './components/ProfileView';
import TeacherDashboard from './components/TeacherDashboard';
import AttemptModal from './components/AttemptModal';

function MainAppContent() {
  const { activeTab, setActiveTab, role, switchToTeacher, switchToStudent } = useApp();

  return (
    <div className="app-container">
      {/* Barra de Navegação Superior */}
      <Navbar />

      {/* Conteúdo Dinâmico por Aba */}
      <main className="main-content">
        {activeTab === 'home' && <HomeView />}
        {activeTab === 'aprender' && <LearnView />}
        {activeTab === 'nao_usar' && <ProhibitedView />}
        {activeTab === 'dicas' && <QuickTipsView />}
        {activeTab === 'exercicios' && <ExercisesView />}
        {activeTab === 'desempenho' && <PerformanceView />}
        {activeTab === 'historico' && <HistoryView />}
        {activeTab === 'perfil' && <ProfileView />}
        {activeTab === 'professor' && <TeacherDashboard />}
      </main>

      {/* Modal Global para Ver Tentativa Completa (Seções 10 e 13) */}
      <AttemptModal />

      {/* Rodapé Educacional */}
      <footer style={{
        backgroundColor: '#ffffff',
        borderTop: '1px solid var(--border-subtle)',
        padding: '2.5rem 1.5rem',
        marginTop: 'auto',
        color: 'var(--text-soft)',
        fontSize: '0.9rem'
      }}>
        <div style={{
          maxWidth: '1280px',
          margin: '0 auto',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1.5rem'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 700, color: 'var(--text-main)', fontSize: '1.05rem', marginBottom: '0.25rem' }}>
              ✍️ Vírgula sem Mistério
            </div>
            <div>Mini Sistema Educacional de Língua Portuguesa • Ensino Médio</div>
            <div style={{ fontSize: '0.8rem', marginTop: '0.25rem' }}>Desenvolvido em conjunto com a coordenação pedagógica e o professor da disciplina.</div>
          </div>

          <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
            <button 
              onClick={() => setActiveTab('aprender')}
              style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontFamily: 'inherit', fontSize: '0.85rem' }}
            >
              Regras da Vírgula
            </button>
            <button 
              onClick={() => setActiveTab('nao_usar')}
              style={{ background: 'none', border: 'none', color: 'var(--danger-dark)', fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', fontSize: '0.85rem' }}
            >
              Quando NÃO Usar
            </button>
            <button 
              onClick={() => setActiveTab('exercicios')}
              style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontFamily: 'inherit', fontSize: '0.85rem' }}
            >
              Exercícios
            </button>
            <button 
              onClick={() => switchToTeacher()}
              style={{ background: 'none', border: 'none', color: 'var(--primary)', fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', fontSize: '0.85rem' }}
            >
              Área do Professor
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <MainAppContent />
    </AppProvider>
  );
}
