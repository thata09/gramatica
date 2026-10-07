export const prohibitedRules = [
  {
    id: "proibido_sujeito_predicado",
    titulo: "1. NUNCA separe Sujeito e Predicado",
    resumo: "Não coloque vírgula entre quem pratica/sofre a ação (sujeito) e a ação em si (verbo/predicado).",
    explicacao: "Esta é a regra mais violada em redações do ENEM e vestibulares. Muitos alunos colocam vírgula porque o sujeito é longo ou porque sentem uma 'pausa para respirar'. A vírgula sintática NÃO obedece ao fôlego dos pulmões! O sujeito está diretamente ligado ao seu predicado.",
    exemploIncorreto: "O estudante mais dedicado da turma, tirou nota máxima na redação.",
    exemploCorreto: "O estudante mais dedicado da turma tirou nota máxima na redação.",
    porQueIncorreto: "O termo 'O estudante mais dedicado da turma' é o sujeito inteiro. A vírgula quebra a relação essencial entre ele e o verbo 'tirou'.",
    alertaMnemônico: "🚫 Regra do Casal Inseparável: Sujeito e Predicado são como melhores amigos de infância: nada pode ficar entre eles, nem uma única vírgula!",
    tags: ["Erro Comum", "Pegadinha ENEM", "Sujeito Longo"]
  },
  {
    id: "proibido_verbo_complemento",
    titulo: "2. NUNCA separe Verbo e seu Complemento",
    resumo: "Não coloque vírgula entre o verbo e o que ele complementa (objeto direto ou indireto).",
    explicacao: "Quem compra, compra algo; quem gosta, gosta de alguém. Os complementos verbais completam o sentido do verbo imediatamente. Inserir uma vírgula entre eles interrompe a transitividade e comete erro grave de pontuação.",
    exemploIncorreto: "O professor explicou, toda a matéria sobre orações coordenadas.",
    exemploCorreto: "O professor explicou toda a matéria sobre orações coordenadas.",
    porQueIncorreto: "'Toda a matéria sobre orações coordenadas' é o objeto direto do verbo 'explicou'. A vírgula aí no meio é proibida pela gramática.",
    alertaMnemônico: "🚫 Ponte Direta: O verbo se conecta diretamente ao que ele faz. Se você colocar uma vírgula ali, corta a ponte do sentido!",
    tags: ["Transitividade", "Objeto Direto", "Objeto Indireto"]
  },
  {
    id: "proibido_nome_complemento",
    titulo: "3. NUNCA separe Nome e seu Complemento/Adjunto",
    resumo: "Não use vírgula entre substantivos/adjetivos e seus complementos nominais ou adjuntos adnominais.",
    explicacao: "Palavras como 'certeza de', 'medo de', 'orgulho de' precisam de termos que as completem. O complemento nominal ou adjunto adnominal é parte integrante daquela expressão e nunca deve ser separado por vírgula.",
    exemploIncorreto: "Todos os candidatos tinham certeza, de sua aprovação no teste.",
    exemploCorreto: "Todos os candidatos tinham certeza de sua aprovação no teste.",
    porQueIncorreto: "'De sua aprovação' completa o sentido do substantivo abstrato 'certeza'. Eles formam uma unidade inseparável.",
    alertaMnemônico: "🚫 Unidade Sagrada: O nome e quem o completa andam de mãos dadas. Sem espaço para vírgula!",
    tags: ["Complemento Nominal", "Adjunto Adnominal"]
  }
];

export const detectorFrases = [
  {
    id: 1,
    frase: "O jovem escritor de poemas, publicou seu primeiro livro no ano passado.",
    temErro: true,
    explicacao: "Erro grave! A vírgula está separando indevidamente o sujeito ('O jovem escritor de poemas') do verbo ('publicou').",
    correta: "O jovem escritor de poemas publicou seu primeiro livro no ano passado.",
    tipo: "Sujeito e Predicado"
  },
  {
    id: 2,
    frase: "Os alunos compraram todos os materiais necessários para a feira de ciências.",
    temErro: false,
    explicacao: "Perfeito! A frase está na ordem direta e sem nenhuma vírgula indevida entre verbo e complemento.",
    correta: "Os alunos compraram todos os materiais necessários para a feira de ciências.",
    tipo: "Correto"
  },
  {
    id: 3,
    frase: "A diretora entregou aos melhores alunos, os certificados de honra ao mérito.",
    temErro: true,
    explicacao: "Incorreto! A vírgula separa o verbo transitivo direto e indireto ('entregou') do seu objeto direto ('os certificados de honra ao mérito').",
    correta: "A diretora entregou aos melhores alunos os certificados de honra ao mérito.",
    tipo: "Verbo e Complemento"
  },
  {
    id: 4,
    frase: "Todos na sala tinham plena confiança, na liderança do representante.",
    temErro: true,
    explicacao: "Incorreto! A vírgula separa o nome ('confiança') de seu complemento nominal ('na liderança do representante').",
    correta: "Todos na sala tinham plena confiança na liderança do representante.",
    tipo: "Nome e Complemento"
  },
  {
    id: 5,
    frase: "Professores dedicados e alunos motivados transformam a realidade de qualquer escola.",
    temErro: false,
    explicacao: "Correto! Mesmo sendo um sujeito composto e longo ('Professores dedicados e alunos motivados'), não deve haver vírgula antes do verbo 'transformam'.",
    correta: "Professores dedicados e alunos motivados transformam a realidade de qualquer escola.",
    tipo: "Correto"
  }
];
