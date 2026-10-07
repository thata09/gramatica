import React, { createContext, useContext, useState, useEffect } from 'react';
import { initialStudents, mockTeacher, initialAttempts } from '../data/initialData';
import { initialQuestions } from '../data/initialQuestions';
import { grammarRules } from '../data/grammarRules';

const AppContext = createContext();

const STORAGE_KEYS = {
  CURRENT_ROLE: 'vsm_user_role',
  CURRENT_STUDENT_ID: 'vsm_current_student_id',
  STUDENTS: 'vsm_students',
  ATTEMPTS: 'vsm_attempts',
  QUESTIONS: 'vsm_questions'
};

export function AppProvider({ children }) {
  // Load from LocalStorage or fall back to initial data
  const [role, setRole] = useState(() => {
    return localStorage.getItem(STORAGE_KEYS.CURRENT_ROLE) || 'aluno';
  });

  const [currentStudentId, setCurrentStudentId] = useState(() => {
    return localStorage.getItem(STORAGE_KEYS.CURRENT_STUDENT_ID) || 'aluno_lucas';
  });

  const [students, setStudents] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.STUDENTS);
    return saved ? JSON.parse(saved) : initialStudents;
  });

  const [attempts, setAttempts] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.ATTEMPTS);
    return saved ? JSON.parse(saved) : initialAttempts;
  });

  const [questions, setQuestions] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.QUESTIONS);
    return saved ? JSON.parse(saved) : initialQuestions;
  });

  const [activeTab, setActiveTab] = useState('home');
  const [selectedAttemptModal, setSelectedAttemptModal] = useState(null);

  // Exercise config for starting an activity with specific filters
  const [exerciseFilter, setExerciseFilter] = useState({
    nivel: 'todos',
    regraId: 'todas',
    tipo: 'todos'
  });

  // Save to LocalStorage when changed
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CURRENT_ROLE, role);
  }, [role]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CURRENT_STUDENT_ID, currentStudentId);
  }, [currentStudentId]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.STUDENTS, JSON.stringify(students));
  }, [students]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ATTEMPTS, JSON.stringify(attempts));
  }, [attempts]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.QUESTIONS, JSON.stringify(questions));
  }, [questions]);

  // Derived current student
  const currentStudent = students.find(s => s.id === currentStudentId) || students[0];

  // Switch between Aluno and Professor
  const switchToTeacher = () => {
    setRole('professor');
    setActiveTab('professor');
  };

  const switchToStudent = (studentId = null) => {
    setRole('aluno');
    if (studentId) setCurrentStudentId(studentId);
  };

  // Student registration
  const registerStudent = (newStudentData) => {
    const newStudent = {
      id: `aluno_${Date.now()}`,
      nome: newStudentData.nome,
      email: newStudentData.email,
      turma: newStudentData.turma || "2º Ano A",
      pontuacao: 0,
      exerciciosRealizados: 0,
      questoesRespondidas: 0,
      acertos: 0,
      erros: 0,
      aproveitamento: 0,
      nivelGamificacao: "Iniciante Curioso",
      conquistas: ["Primeiro Passo"],
      ultimaAtividade: "Novo Cadastro"
    };

    setStudents(prev => [newStudent, ...prev]);
    setCurrentStudentId(newStudent.id);
    setRole('aluno');
    return newStudent;
  };

  // Student login
  const loginStudent = (email) => {
    const found = students.find(s => s.email.toLowerCase() === email.toLowerCase());
    if (found) {
      setCurrentStudentId(found.id);
      setRole('aluno');
      return { success: true, student: found };
    }
    return { success: false, message: "Aluno não encontrado com este e-mail." };
  };

  // Save completed attempt
  const saveAttempt = (newAttempt) => {
    // Generate attempt ID and date
    const now = new Date();
    const dataStr = now.toISOString().split('T')[0];
    const horaStr = now.toTimeString().slice(0, 5);

    // Calculate attempt number for this student & activity
    const previousAttemptsCount = attempts.filter(
      a => a.alunoId === newAttempt.alunoId && a.atividadeId === newAttempt.atividadeId
    ).length;

    const fullAttempt = {
      ...newAttempt,
      id: `att_${Date.now()}`,
      data: dataStr,
      horario: horaStr,
      tentativaNumero: previousAttemptsCount + 1,
      comentarioProfessor: ""
    };

    // Save attempt (immutable history log)
    setAttempts(prev => [fullAttempt, ...prev]);

    // Update student aggregated stats
    setStudents(prevStudents => prevStudents.map(student => {
      if (student.id !== fullAttempt.alunoId) return student;

      const newTotalExercicios = student.exerciciosRealizados + 1;
      const newTotalQuestoes = student.questoesRespondidas + fullAttempt.totalQuestoes;
      const newTotalAcertos = student.acertos + fullAttempt.acertos;
      const newTotalErros = student.erros + fullAttempt.erros;
      const newPontuacao = student.pontuacao + fullAttempt.pontuacaoTotal;
      const newAproveitamento = newTotalQuestoes > 0 ? Math.round((newTotalAcertos / newTotalQuestoes) * 100) : 0;

      // Badges
      const currentConquistas = [...(student.conquistas || [])];
      if (newTotalExercicios >= 1 && !currentConquistas.includes("Primeiro Passo")) {
        currentConquistas.push("Primeiro Passo");
      }
      if (fullAttempt.porcentagem === 100 && !currentConquistas.includes("Invicto na Pontuação")) {
        currentConquistas.push("Invicto na Pontuação");
      }
      if (newPontuacao >= 300 && !currentConquistas.includes("Sentinela do Sujeito")) {
        currentConquistas.push("Sentinela do Sujeito");
      }
      if (newPontuacao >= 500 && !currentConquistas.includes("Mestre do Vocativo")) {
        currentConquistas.push("Mestre do Vocativo");
      }
      if (newTotalExercicios >= 10 && !currentConquistas.includes("Dedicação Total")) {
        currentConquistas.push("Dedicação Total");
      }

      // Gamification title
      let nivelGamificacao = "Aprendiz da Pontuação";
      if (newPontuacao >= 400) nivelGamificacao = "Mestre da Vírgula";
      else if (newPontuacao >= 250) nivelGamificacao = "Explorador da Gramática";
      else if (newPontuacao >= 100) nivelGamificacao = "Praticante Dedicado";

      return {
        ...student,
        exerciciosRealizados: newTotalExercicios,
        questoesRespondidas: newTotalQuestoes,
        acertos: newTotalAcertos,
        erros: newTotalErros,
        pontuacao: newPontuacao,
        aproveitamento: newAproveitamento,
        conquistas: currentConquistas,
        nivelGamificacao,
        ultimaAtividade: `${dataStr} ${horaStr}`
      };
    }));

    return fullAttempt;
  };

  // Add teacher feedback to student attempt
  const addTeacherFeedback = (attemptId, comment) => {
    setAttempts(prev => prev.map(a => {
      if (a.id === attemptId) {
        return { ...a, comentarioProfessor: comment };
      }
      return a;
    }));
  };

  // Question bank management (Teacher actions)
  const addQuestion = (newQ) => {
    const questionWithId = {
      ...newQ,
      id: `custom_q_${Date.now()}`
    };
    setQuestions(prev => [questionWithId, ...prev]);
    return questionWithId;
  };

  const updateQuestion = (updatedQ) => {
    setQuestions(prev => prev.map(q => q.id === updatedQ.id ? updatedQ : q));
  };

  const deleteQuestion = (qId) => {
    setQuestions(prev => prev.filter(q => q.id !== qId));
  };

  // Get specific student rule mastery analytics
  const getStudentRuleBreakdown = (studentId) => {
    const studentAttempts = attempts.filter(a => a.alunoId === studentId);
    const ruleStats = {};

    studentAttempts.forEach(att => {
      (att.questoesRespondidas || []).forEach(q => {
        const rName = q.regraNome || "Geral";
        const rId = q.regraId || "geral";
        if (!ruleStats[rId]) {
          ruleStats[rId] = { id: rId, nome: rName, total: 0, acertos: 0 };
        }
        ruleStats[rId].total += 1;
        if (q.acertou) ruleStats[rId].acertos += 1;
      });
    });

    return Object.values(ruleStats).map(r => ({
      ...r,
      porcentagem: r.total > 0 ? Math.round((r.acertos / r.total) * 100) : 0
    })).sort((a, b) => b.porcentagem - a.porcentagem);
  };

  // Class analytics for teacher
  const getClassAnalytics = () => {
    const totalAlunos = students.length;
    const totalTentativas = attempts.length;
    const mediaAproveitamento = totalAlunos > 0
      ? Math.round(students.reduce((acc, s) => acc + s.aproveitamento, 0) / totalAlunos)
      : 0;
    const mediaPontuacao = totalAlunos > 0
      ? Math.round(students.reduce((acc, s) => acc + s.pontuacao, 0) / totalAlunos)
      : 0;

    // Rule performance across entire class
    const classRuleStats = {};
    attempts.forEach(att => {
      (att.questoesRespondidas || []).forEach(q => {
        const rId = q.regraId || 'geral';
        const rName = q.regraNome || 'Regra Geral';
        if (!classRuleStats[rId]) {
          classRuleStats[rId] = { id: rId, nome: rName, total: 0, acertos: 0 };
        }
        classRuleStats[rId].total += 1;
        if (q.acertou) classRuleStats[rId].acertos += 1;
      });
    });

    const rankingDificuldades = Object.values(classRuleStats)
      .map(r => ({
        ...r,
        porcentagem: r.total > 0 ? Math.round((r.acertos / r.total) * 100) : 0
      }))
      .sort((a, b) => a.porcentagem - b.porcentagem); // lowest % first = hardest

    // Students with best evolution vs students needing attention
    const alunosAtencao = [...students].filter(s => s.aproveitamento < 70).sort((a, b) => a.aproveitamento - b.aproveitamento);
    const alunosDestaque = [...students].filter(s => s.aproveitamento >= 80).sort((a, b) => b.aproveitamento - a.aproveitamento);

    return {
      totalAlunos,
      totalTentativas,
      mediaAproveitamento,
      mediaPontuacao,
      rankingDificuldades,
      alunosAtencao,
      alunosDestaque
    };
  };

  // Start activity for a specific rule from the "Aprender" section
  const startPracticeForRule = (ruleId) => {
    setExerciseFilter({
      nivel: 'todos',
      regraId: ruleId,
      tipo: 'todos'
    });
    setActiveTab('exercicios');
  };

  return (
    <AppContext.Provider value={{
      role,
      setRole,
      currentStudentId,
      setCurrentStudentId,
      currentStudent,
      mockTeacher,
      students,
      attempts,
      questions,
      activeTab,
      setActiveTab,
      selectedAttemptModal,
      setSelectedAttemptModal,
      exerciseFilter,
      setExerciseFilter,
      switchToTeacher,
      switchToStudent,
      registerStudent,
      loginStudent,
      saveAttempt,
      addTeacherFeedback,
      addQuestion,
      updateQuestion,
      deleteQuestion,
      getStudentRuleBreakdown,
      getClassAnalytics,
      startPracticeForRule,
      grammarRules
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
