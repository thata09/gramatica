export const grammarRules = [
  {
    id: "lista",
    nome: "Separação de elementos de uma lista",
    categoria: "Enumeração",
    icone: "ListOrdered",
    explicacaoSimples: "A vírgula serve para separar palavras ou expressões da mesma função gramatical em uma enumeração. O último item geralmente é ligado pela conjunção 'e', dispensando a vírgula.",
    exemplos: [
      "Comprei arroz, feijão, macarrão e carne.",
      "Precisamos de canetas, lápis, borrachas e cadernos para a aula.",
      "O dia estava frio, cinzento e chuvoso."
    ],
    exemploCorreto: "Comprei arroz, feijão, macarrão e carne.",
    exemploIncorreto: "Comprei arroz feijão macarrão e carne.",
    motivoErro: "Sem a vírgula, os itens se misturam e a leitura fica confusa, parecendo um bloco só de palavras.",
    dicaMemorizar: "💡 Regra da Feira: Imagine que cada item da sua sacola precisa de um espaço próprio. Use a vírgula para separar cada um, e troque a última vírgula por 'e'."
  },
  {
    id: "vocativo",
    nome: "Vocativo (Chamamento)",
    categoria: "Termos da Oração",
    icone: "MessageSquare",
    explicacaoSimples: "O vocativo é o termo usado para chamar, invocar ou interpelar alguém diretamente na conversa. Ele NUNCA faz parte do sujeito e SEMPRE deve ser isolado por vírgula, esteja no início, no meio ou no fim da frase.",
    exemplos: [
      "Maria, venha aqui agora.",
      "Venha aqui, Maria, agora mesmo.",
      "Não faça isso, meu amigo."
    ],
    exemploCorreto: "Maria, venha aqui.",
    exemploIncorreto: "Maria venha aqui.",
    motivoErro: "Sem a vírgula, o leitor pode confundir o chamamento com o sujeito ou mudar o sentido da frase (ex: 'Vamos comer, crianças!' vs 'Vamos comer crianças!').",
    dicaMemorizar: "💡 Dica do Chamado: Se você pode colocar as mãos em volta da boca para gritar o nome da pessoa, esse nome é vocativo e EXIGE vírgula!"
  },
  {
    id: "aposto",
    nome: "Aposto (Termo Explicativo)",
    categoria: "Termos da Oração",
    icone: "Sparkles",
    explicacaoSimples: "O aposto explicativo detalha, resume ou esclarece um termo anterior. Como é uma informação extra, ele vem sempre isolado por vírgulas (ou travessões). Se você retirar o aposto, a frase continuará fazendo sentido.",
    exemplos: [
      "Pedro, meu irmão, chegou cedo.",
      "Machado de Assis, grande escritor brasileiro, fundou a Academia Brasileira de Letras.",
      "Brasília, a capital do Brasil, foi inaugurada em 1960."
    ],
    exemploCorreto: "Pedro, meu irmão, chegou cedo.",
    exemploIncorreto: "Pedro meu irmão chegou cedo.",
    motivoErro: "Sem as vírgulas, 'meu irmão' fica colado ao nome sem a pausa explicativa necessária, dificultando a clareza sintática.",
    dicaMemorizar: "💡 Teste do Parêntese: Se você puder colocar a explicação entre parênteses sem estragar a frase, ela é um aposto e precisa de duas vírgulas (uma antes e outra depois)."
  },
  {
    id: "intercaladas",
    nome: "Expressões explicativas ou intercaladas",
    categoria: "Expressões Intercaladas",
    icone: "Quote",
    explicacaoSimples: "Expressões de retificação, exemplificação, continuação ou conclusão (como 'isto é', 'por exemplo', 'ou seja', 'aliás', 'porém', 'portanto') quando estão no meio da frase devem vir isoladas por vírgulas.",
    exemplos: [
      "João, porém, não compareceu.",
      "O projeto, por exemplo, trouxe ótimos resultados.",
      "Eles viajaram, isto é, tiraram férias merecidas."
    ],
    exemploCorreto: "João, porém, não compareceu.",
    exemploIncorreto: "João porém não compareceu.",
    motivoErro: "A palavra 'porém' quebra o fluxo direto da oração. Sem as vírgulas intercaladas, a frase perde o ritmo e a fluidez.",
    dicaMemorizar: "💡 Intrusos entre Vírgulas: Palavras como 'ou seja', 'isto é' e 'porém' no meio da oração são como convidados surpresa — precisam de tapete vermelho dos dois lados (uma vírgula antes e outra depois)."
  },
  {
    id: "adjunto_deslocado",
    nome: "Adjunto adverbial deslocado",
    categoria: "Termos Acessórios",
    icone: "Compass",
    explicacaoSimples: "A ordem natural da frase em português é: Sujeito + Verbo + Complemento + Adjunto Adverbial (tempo, lugar, modo). Quando o adjunto adverbial é deslocado para o início ou meio da frase, deve ser isolado por vírgula (obrigatório se for longo; recomendável se for curto).",
    exemplos: [
      "Na manhã de ontem, os alunos fizeram o simulado de português.",
      "Com muita paciência, o professor explicou a matéria novamente.",
      "Ontem à noite, todos comemoraram a vitória."
    ],
    exemploCorreto: "Na manhã de ontem, os alunos fizeram o simulado.",
    exemploIncorreto: "Na manhã de ontem os alunos fizeram o simulado sem pausa.",
    motivoErro: "Quando uma expressão de tempo, lugar ou modo com mais de 3 palavras vem no início da frase, a vírgula é obrigatória para marcar o deslocamento da ordem direta.",
    dicaMemorizar: "💡 Fora do Lugar? Leva Vírgula! Se o tempo ('Ontem à tarde'), o lugar ('Na escola') ou o modo ('Com calma') vieram para o início da frase, carimbe com uma vírgula!"
  },
  {
    id: "oracoes_coordenadas",
    nome: "Orações coordenadas",
    categoria: "Período Composto",
    icone: "Link2",
    explicacaoSimples: "São orações independentes entre si. Usa-se vírgula para separar orações coordenadas assindéticas (sem conjunção) e coordenadas sindéticas iniciadas por 'mas', 'porém', 'contudo', 'portanto', 'logo', 'pois' (conclusivo/explicativo). Antes de 'e', usa-se vírgula se os sujeitos forem diferentes.",
    exemplos: [
      "Estudei muito para a prova, mas ainda tenho algumas dúvidas.",
      "Cheguei em casa, tomei um banho, jantei e fui dormir.",
      "O dia estava frio, portanto levei um casaco pesado."
    ],
    exemploCorreto: "Estudei muito, mas ainda tenho dúvidas.",
    exemploIncorreto: "Estudei muito mas ainda tenho dúvidas.",
    motivoErro: "A conjunção adversativa 'mas' exige vírgula imediatamente antes dela para indicar o contraste entre as orações.",
    dicaMemorizar: "💡 O 'Mas' Pede Licença: Antes de 'mas', 'porém', 'contudo' e 'todavia', a vírgula é sua melhor amiga e deve estar sempre colada na frente deles!"
  },
  {
    id: "oracoes_subordinadas",
    nome: "Orações subordinadas adverbiais",
    categoria: "Período Composto",
    icone: "GitBranch",
    explicacaoSimples: "Quando a oração subordinada adverbial (que expressa causa, condição, tempo, concessão, etc.) vem ANTES da oração principal ou intercalada nela, a vírgula é OBRIGATÓRIA. Se vier depois da principal, a vírgula é opcional ou dispensável.",
    exemplos: [
      "Quando o sinal tocou, todos os alunos saíram da sala.",
      "Se você estudar com afinco, alcançará excelentes notas.",
      "Embora estivesse chovendo muito, eles foram ao jogo."
    ],
    exemploCorreto: "Quando o sinal tocou, todos saíram da sala.",
    exemploIncorreto: "Quando o sinal tocou todos saíram da sala.",
    motivoErro: "A oração adverbial temporal ('Quando o sinal tocou') está anteposta à oração principal. A separação por vírgula é uma regra formal obrigatória.",
    dicaMemorizar: "💡 Oração Adverbial na Frente? Vírgula Urgente! Se a frase começar com 'Quando...', 'Se...', 'Porque...', 'Embora...', coloque a vírgula assim que terminar a primeira ideia."
  }
];
