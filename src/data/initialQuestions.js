export const initialQuestions = [
  // --- TIPO: COLOQUE A VÍRGULA ---
  {
    id: "q1",
    tipo: "coloque_a_virgula",
    nivel: "facil",
    regraId: "vocativo",
    regraNome: "Vocativo",
    enunciado: "Clique nos espaços entre as palavras para inserir a vírgula necessária na frase:",
    // tokens da frase sem pontuação
    tokens: ["Lucas", "guarde", "seus", "materiais", "na", "mochila."],
    // Índices de slots onde deve haver vírgula (índice i significa após o token[i])
    correctSlots: [0], // após "Lucas"
    fraseCorreta: "Lucas, guarde seus materiais na mochila.",
    explicacao: "O nome 'Lucas' é um vocativo (estamos chamando a pessoa diretamente). O vocativo sempre deve ser isolado por vírgula no início da oração.",
    explicacaoErro: "Atenção: 'Lucas' é um chamamento (vocativo). Por isso, exige vírgula logo após o nome para separá-lo do restante da ordem."
  },
  {
    id: "q2",
    tipo: "coloque_a_virgula",
    nivel: "facil",
    regraId: "lista",
    regraNome: "Separação de elementos de uma lista",
    enunciado: "Insira as vírgulas necessárias para separar os itens da lista nesta oração:",
    tokens: ["Comprei", "cadernos", "canetas", "lápis", "e", "borrachas."],
    correctSlots: [1, 2], // após "cadernos" e "canetas"
    fraseCorreta: "Comprei cadernos, canetas, lápis e borrachas.",
    explicacao: "Os itens 'cadernos', 'canetas' e 'lápis' compõem uma enumeração (lista) de mesma função sintática. Devem ser separados por vírgula, e o último item é ligado por 'e'.",
    explicacaoErro: "Lembre-se da regra da feira: cada elemento da enumeração deve ser separado por vírgula, exceto o último que já tem a conjunção 'e'."
  },
  {
    id: "q3",
    tipo: "coloque_a_virgula",
    nivel: "medio",
    regraId: "aposto",
    regraNome: "Aposto",
    enunciado: "Isole o aposto explicativo inserindo as vírgulas nos locais corretos:",
    tokens: ["Dona", "Clara", "nossa", "professora", "de", "literatura", "elogiou", "as", "redações."],
    correctSlots: [1, 5], // após "Clara" e após "literatura"
    fraseCorreta: "Dona Clara, nossa professora de literatura, elogiou as redações.",
    explicacao: "'Nossa professora de literatura' é um aposto explicativo que detalha quem é Dona Clara. Termos explicativos intercalados devem vir entre vírgulas.",
    explicacaoErro: "O aposto explicativo funciona como um parêntese: precisa de uma vírgula antes ('Dona Clara,') e uma vírgula depois ('literatura,')."
  },
  {
    id: "q4",
    tipo: "coloque_a_virgula",
    nivel: "medio",
    regraId: "adjunto_deslocado",
    regraNome: "Adjunto adverbial deslocado",
    enunciado: "Marque a vírgula para separar a expressão de tempo deslocada no início da oração:",
    tokens: ["Na", "manhã", "de", "ontem", "os", "estudantes", "participaram", "do", "debate."],
    correctSlots: [3], // após "ontem"
    fraseCorreta: "Na manhã de ontem, os estudantes participaram do debate.",
    explicacao: "'Na manhã de ontem' é um adjunto adverbial de tempo com quatro palavras (longo) deslocado para o início da oração. A vírgula é obrigatória.",
    explicacaoErro: "A expressão de tempo 'Na manhã de ontem' foi deslocada para a frente da oração. Quando um adjunto adverbial longo vem no início, a vírgula é obrigatória logo após ele."
  },
  {
    id: "q5",
    tipo: "coloque_a_virgula",
    nivel: "dificil",
    regraId: "intercaladas",
    regraNome: "Expressões explicativas ou intercaladas",
    enunciado: "Isole a conjunção adversativa intercalada inserindo as vírgulas adequadas:",
    tokens: ["O", "resultado", "final", "porém", "não", "agradou", "a", "todos."],
    correctSlots: [2, 3], // após "final" e após "porém"
    fraseCorreta: "O resultado final, porém, não agradou a todos.",
    explicacao: "A palavra 'porém' é uma conjunção adversativa deslocada/intercalada no meio da oração. Deve ficar isolada entre duas vírgulas.",
    explicacaoErro: "Expressões adversativas no meio da frase quebram a ordem direta e precisam de vírgula antes e vírgula depois ('...final, porém,...')."
  },

  // --- TIPO: CORRETO OU INCORRETO ---
  {
    id: "q6",
    tipo: "correto_ou_incorreto",
    nivel: "facil",
    regraId: "nao_usar_sujeito",
    regraNome: "Quando NÃO usar a vírgula (Sujeito e Predicado)",
    enunciado: "Analise a frase a seguir e avalie se a pontuação está CORRETA ou INCORRETA:\n\n“O aluno mais dedicado da turma, conquistou a medalha de ouro.”",
    respostaCorreta: "Incorreto",
    opcoes: ["Correto", "Incorreto"],
    explicacao: "Está INCORRETO! NUNCA se deve separar o sujeito ('O aluno mais dedicado da turma') do seu predicado ('conquistou a medalha de ouro') com vírgula, mesmo que o sujeito pareça longo.",
    explicacaoErro: "Essa frase tem um erro clássico: colocou-se vírgula entre o sujeito e o verbo. A regra de ouro é: sujeito e predicado nunca se separam por vírgula!"
  },
  {
    id: "q7",
    tipo: "correto_ou_incorreto",
    nivel: "facil",
    regraId: "vocativo",
    regraNome: "Vocativo",
    enunciado: "Analise a frase a seguir e avalie se a pontuação está CORRETA ou INCORRETA:\n\n“Bom dia, professora Helena!”",
    respostaCorreta: "Correto",
    opcoes: ["Correto", "Incorreto"],
    explicacao: "Está CORRETO! O termo 'professora Helena' é um vocativo (chamamento direto) e foi devidamente isolado pela vírgula após a saudação.",
    explicacaoErro: "A frase está certa porque saudações dirigidas a alguém usam vírgula antes do vocativo ('Bom dia, professora')."
  },
  {
    id: "q8",
    tipo: "correto_ou_incorreto",
    nivel: "medio",
    regraId: "nao_usar_verbo",
    regraNome: "Quando NÃO usar a vírgula (Verbo e Complemento)",
    enunciado: "Analise a pontuação da frase a seguir:\n\n“A coordenadora explicou, aos pais todo o cronograma do ano letivo.”",
    respostaCorreta: "Incorreto",
    opcoes: ["Correto", "Incorreto"],
    explicacao: "Está INCORRETO! A vírgula foi inserida indevidamente entre o verbo ('explicou') e o seu objeto indireto ('aos pais'). O verbo não deve ser separado dos seus complementos imediatos.",
    explicacaoErro: "A vírgula cortou o verbo do seu complemento. Quem explica, explica algo a alguém, sem vírgula separando o verbo do objeto."
  },
  {
    id: "q9",
    tipo: "correto_ou_incorreto",
    nivel: "dificil",
    regraId: "oracoes_subordinadas",
    regraNome: "Orações subordinadas adverbiais",
    enunciado: "Avalie se a pontuação está CORRETA ou INCORRETA:\n\n“Assim que o sinal tocar, recolheremos as avaliações.”",
    respostaCorreta: "Correto",
    opcoes: ["Correto", "Incorreto"],
    explicacao: "Está CORRETO! A oração subordinada adverbial temporal ('Assim que o sinal tocar') veio antes da oração principal ('recolheremos as avaliações'). Portanto, a vírgula é obrigatória.",
    explicacaoErro: "A oração subordinada adverbial anteposta exige vírgula obrigatória. A frase respeita perfeitamente essa norma."
  },

  // --- TIPO: ESCOLHA A ALTERNATIVA ---
  {
    id: "q10",
    tipo: "escolha_a_alternativa",
    nivel: "facil",
    regraId: "oracoes_coordenadas",
    regraNome: "Orações coordenadas",
    enunciado: "Assinale a alternativa em que a pontuação com a conjunção adversativa 'mas' está CORRETA:",
    opcoes: [
      "Ele estudou muito, mas não conseguiu a nota desejada.",
      "Ele estudou muito mas, não conseguiu a nota desejada.",
      "Ele estudou muito mas não conseguiu, a nota desejada.",
      "Ele, estudou muito mas não conseguiu a nota desejada."
    ],
    respostaCorreta: "Ele estudou muito, mas não conseguiu a nota desejada.",
    explicacao: "A conjunção adversativa 'mas' que liga duas orações coordenadas sindéticas deve vir precedida por vírgula (a vírgula fica antes do 'mas').",
    explicacaoErro: "A vírgula deve vir imediatamente ANTES do 'mas' ('...muito, mas não...'), e não depois dele ou separando sujeito e verbo."
  },
  {
    id: "q11",
    tipo: "escolha_a_alternativa",
    nivel: "medio",
    regraId: "aposto",
    regraNome: "Aposto",
    enunciado: "Assinale a opção com o emprego ADEQUADO das vírgulas para isolar o aposto explicativo:",
    opcoes: [
      "Monteiro Lobato um dos maiores escritores infantis brasileiros, nasceu em Taubaté.",
      "Monteiro Lobato, um dos maiores escritores infantis brasileiros, nasceu em Taubaté.",
      "Monteiro Lobato, um dos maiores escritores infantis brasileiros nasceu em Taubaté.",
      "Monteiro Lobato um dos maiores escritores infantis brasileiros nasceu, em Taubaté."
    ],
    respostaCorreta: "Monteiro Lobato, um dos maiores escritores infantis brasileiros, nasceu em Taubaté.",
    explicacao: "O aposto explicativo 'um dos maiores escritores infantis brasileiros' precisa vir cercado por duas vírgulas: uma antes para abrir a explicação e outra depois para fechá-la.",
    explicacaoErro: "Atenção: esquecer a segunda vírgula é um erro comum! O aposto no meio da frase exige vírgula de abertura e de fechamento."
  },
  {
    id: "q12",
    tipo: "escolha_a_alternativa",
    nivel: "dificil",
    regraId: "intercaladas",
    regraNome: "Expressões explicativas ou intercaladas",
    enunciado: "Em qual das sentenças a expressão explicativa/retificadora 'ou seja' está pontuada CORRETAMENTE?",
    opcoes: [
      "As inscrições terminam hoje ou seja, não deixe para a última hora.",
      "As inscrições terminam hoje, ou seja não deixe para a última hora.",
      "As inscrições terminam hoje, ou seja, não deixe para a última hora.",
      "As inscrições, terminam hoje ou seja não deixe para a última hora."
    ],
    respostaCorreta: "As inscrições terminam hoje, ou seja, não deixe para a última hora.",
    explicacao: "Expressões explicativas como 'ou seja', 'isto é', 'por exemplo' devem vir isoladas por vírgulas quando intercaladas no período.",
    explicacaoErro: "A expressão 'ou seja' precisa ser delimitada por vírgulas em ambos os lados: vírgula antes e vírgula depois."
  },

  // --- TIPO: IDENTIFIQUE A REGRA ---
  {
    id: "q13",
    tipo: "identifique_a_regra",
    nivel: "facil",
    regraId: "vocativo",
    regraNome: "Vocativo",
    enunciado: "Observe a frase:\n\n“Atenção, caros alunos, as provas começarão pontualmente às oito horas.”\n\nQual regra gramatical justifica as vírgulas que isolam 'caros alunos'?",
    opcoes: [
      "Vocativo (termo de chamamento direto)",
      "Aposto explicativo",
      "Separação de orações coordenadas",
      "Adjunto adverbial deslocado"
    ],
    respostaCorreta: "Vocativo (termo de chamamento direto)",
    explicacao: "'Caros alunos' é uma interpelação direta aos ouvintes/leitores (vocativo). Por isso, vem obrigatoriamente isolado por vírgulas.",
    explicacaoErro: "Não confunda: aposto explica um termo que já foi dito; vocativo é o chamamento direto à pessoa ('caros alunos')."
  },
  {
    id: "q14",
    tipo: "identifique_a_regra",
    nivel: "medio",
    regraId: "adjunto_deslocado",
    regraNome: "Adjunto adverbial deslocado",
    enunciado: "Observe a oração:\n\n“No final do semestre, todos os grupos apresentarão seus projetos científicos.”\n\nQual é a regra que justifica o uso da vírgula?",
    opcoes: [
      "Adjunto adverbial de tempo deslocado para o início da oração",
      "Isolamento de vocativo",
      "Separação de sujeito e predicado",
      "Oração subordinada substantiva"
    ],
    respostaCorreta: "Adjunto adverbial de tempo deslocado para o início da oração",
    explicacao: "'No final do semestre' é uma locução adverbial temporal deslocada para a posição inicial da oração, exigindo a vírgula para marcar a quebra da ordem direta.",
    explicacaoErro: "'No final do semestre' indica circunstância de tempo (adjunto adverbial) e veio no começo da frase, e não no final onde seria sua posição típica."
  },
  {
    id: "q15",
    tipo: "identifique_a_regra",
    nivel: "dificil",
    regraId: "oracoes_coordenadas",
    regraNome: "Orações coordenadas",
    enunciado: "Analise o período composto:\n\n“O sino tocou três vezes, as luzes se apagaram, e a plateia fez silêncio.”\n\nAs vírgulas presentes neste período servem para:",
    opcoes: [
      "Separar orações coordenadas entre si (inclusive antes de 'e' com sujeitos distintos)",
      "Isolar apostos explicativos intercalados",
      "Destacar adjuntos adnominais e complementos nominais",
      "Separar termos de uma mesma oração em ordem direta"
    ],
    respostaCorreta: "Separar orações coordenadas entre si (inclusive antes de 'e' com sujeitos distintos)",
    explicacao: "O período é formado por orações coordenadas. As duas primeiras são assindéticas separadas por vírgula. A última oração possui sujeito próprio ('a plateia'), diferente dos anteriores ('o sino', 'as luzes'), justificando a vírgula antes do 'e'.",
    explicacaoErro: "Trata-se de orações coordenadas com sujeitos distintos ('o sino', 'as luzes', 'a plateia'), o que exige vírgula entre as orações e antes do 'e'."
  }
];
