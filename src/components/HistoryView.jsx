import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  History, 
  Eye, 
  Calendar, 
  Clock, 
  Award, 
  Search, 
  Filter,
  CheckCircle2,
  XCircle,
  Play
} from 'lucide-react';

export default function HistoryView() {
  const { 
    attempts, 
    currentStudent, 
    setSelectedAttemptModal, 
    setActiveTab 
  } = useApp();

  const [searchTerm, setSearchTerm] = useState('');
  const [levelFilter, setLevelFilter] = useState('todos');

  // Filter attempts belonging strictly to the current logged-in student (privacy requirement Section 20)
  const studentAttempts = attempts.filter(a => a.alunoId === currentStudent?.id);

  const filtered = studentAttempts.filter(att => {
    const matchesSearch = att.atividadeTitulo.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLevel = levelFilter === 'todos' || att.nivel.toLowerCase() === levelFilter.toLowerCase();
    return matchesSearch && matchesLevel;
  });

  return (
    <div className="history-page-container">
      {/* Cabeçalho */}
      <div className="section-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
          <span className="badge badge-primary">
            <History size={14} /> Registro Contínuo
          </span>
          <span className="badge badge-success">
            {studentAttempts.length} Tentativas Salvas
          </span>
        </div>
        <h2 className="section-title">Histórico de Tentativas: {currentStudent?.nome}</h2>
        <p className="section-desc">
          Todas as suas resoluções de atividades ficam registradas aqui. Você pode reabrir qualquer tentativa passada 
          para revisar o gabarito, ver onde acertou e entender detalhadamente o porquê de cada erro.
        </p>
      </div>

      {/* Controles de Filtro e Busca */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
          <div style={{ position: 'relative', minWidth: '260px' }}>
            <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-soft)' }} />
            <input
              type="text"
              placeholder="Buscar por nome da atividade..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
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

          <select
            value={levelFilter}
            onChange={(e) => setLevelFilter(e.target.value)}
            style={{
              padding: '0.5rem 0.85rem',
              borderRadius: 'var(--radius-full)',
              border: '1px solid var(--border-subtle)',
              fontSize: '0.85rem',
              fontFamily: 'var(--font-sans)',
              backgroundColor: '#ffffff'
            }}
          >
            <option value="todos">Todos os Níveis</option>
            <option value="fácil">Fácil</option>
            <option value="médio">Médio</option>
            <option value="difícil">Difícil</option>
          </select>
        </div>

        <button 
          className="btn btn-primary btn-sm"
          onClick={() => setActiveTab('exercicios')}
        >
          <Play size={14} /> Fazer Nova Tentativa
        </button>
      </div>

      {/* Tabela do Histórico com Todos os Campos Exigidos */}
      {filtered.length > 0 ? (
        <div className="table-responsive">
          <table className="custom-table">
            <thead>
              <tr>
                <th>Atividade Realizada</th>
                <th>Tentativa Nº</th>
                <th>Data & Horário</th>
                <th>Nota / Pontos</th>
                <th>Acertos / Erros</th>
                <th>Aproveitamento</th>
                <th>Tempo</th>
                <th>Ação</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((att) => (
                <tr key={att.id}>
                  <td>
                    <div style={{ fontWeight: 600, color: 'var(--text-main)' }}>{att.atividadeTitulo}</div>
                    <span className="badge badge-primary" style={{ fontSize: '0.65rem', marginTop: '2px' }}>
                      {att.nivel}
                    </span>
                  </td>
                  <td>
                    <span className="badge badge-warning" style={{ fontWeight: 700 }}>
                      #{att.tentativaNumero}
                    </span>
                  </td>
                  <td>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-main)' }}>{att.data}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-soft)' }}>{att.horario}</div>
                  </td>
                  <td>
                    <div style={{ fontWeight: 800, color: 'var(--primary)' }}>
                      {att.pontuacaoTotal} pts
                    </div>
                  </td>
                  <td>
                    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                      <span style={{ color: 'var(--success-dark)', fontWeight: 600 }}>
                        ✓ {att.acertos}
                      </span>
                      <span style={{ color: 'var(--danger-dark)', fontWeight: 600 }}>
                        ✗ {att.erros}
                      </span>
                    </div>
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
                    {/* Botão Solicitado: Abrir tentativa antiga para visualizar questões e respostas */}
                    <button
                      className="btn btn-secondary btn-sm"
                      onClick={() => setSelectedAttemptModal(att)}
                      title="Abrir detalhes das questões desta tentativa"
                    >
                      <Eye size={14} /> Ver Tentativa Completa
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="card" style={{ textAlign: 'center', padding: '3.5rem 2rem' }}>
          <History size={48} color="var(--text-soft)" style={{ margin: '0 auto 1rem' }} />
          <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Nenhuma tentativa encontrada</h3>
          <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', maxWidth: '450px', margin: '0 auto 1.5rem' }}>
            {searchTerm 
              ? "Nenhum resultado corresponde aos filtros pesquisados."
              : "Você ainda não realizou atividades com este perfil. Que tal iniciar sua primeira prática agora?"}
          </p>
          <button className="btn btn-primary" onClick={() => setActiveTab('exercicios')}>
            Começar Meu Primeiro Exercício
          </button>
        </div>
      )}
    </div>
  );
}
