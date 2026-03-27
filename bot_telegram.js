
const TelegramBot = require('node-telegram-bot-api');
const cron = require('node-cron');
const token = '8594218638:AAGNQYMIRAIK664QS8jlrfxHmm3dqPXM7f8';
const bot = new TelegramBot(token, { polling: true });

//  HORÁRIOS // 

const horariosPorPeriodo = {
  "1": {
    "1": "07:55 – 08:40", "2": "08:40 – 09:25",
    "3": "09:45 – 10:30", "4": "10:30 – 11:15",
    "5": "11:25 – 12:10", "6": "12:10 – 12:55"
  },
  "outros": {
    "1": "07:45 – 08:35", "2": "08:35 – 09:25",
    "3": "09:35 – 10:25", "4": "10:25 – 11:15",
    "5": "11:15 – 12:05", "6": "12:05 – 12:55"
  }
};

function getHorarios(semestre) {
  return semestre === "1" ? horariosPorPeriodo["1"] : horariosPorPeriodo["outros"];
}

// GRADE COMPLETA - TODOS OS 6 SEMESTRES // 

const gradeFatec = {
  "1": {
    "1": {
      "1": { materia: "Sistemas Operacionais", professor: "Thales", sala: "Lab. 3" },
      "2": { materia: "Sistemas Operacionais", professor: "Thales", sala: "Lab. 3" },
      "3": null, "4": null,
      "5": { materia: "Com. e Expressão", professor: "Sandra", sala: "On-line" },
      "6": { materia: "Com. e Expressão", professor: "Sandra", sala: "On-line" }
    },
    "2": {
      "1": { materia: "Algoritmos e Lógica", professor: "Argemiro", sala: "Lab. 1" },
      "2": { materia: "Algoritmos e Lógica", professor: "Argemiro", sala: "Lab. 1" },
      "3": { materia: "Algoritmos e Lógica", professor: "Argemiro", sala: "Lab. 1" },
      "4": { materia: "Algoritmos e Lógica", professor: "Argemiro", sala: "Lab. 1" },
      "5": { materia: "Inglês I", professor: "Janaína", sala: "Lab. 7 – Bloco C" },
      "6": { materia: "Inglês I", professor: "Janaína", sala: "Lab. 7 – Bloco C" }
    },
    "3": {
      "1": null, "2": null,
      "3": { materia: "Eng. de Software I", professor: "Cláudio", sala: "Lab. 1" },
      "4": { materia: "Eng. de Software I", professor: "Cláudio", sala: "Lab. 1" },
      "5": { materia: "Eng. de Software I", professor: "Cláudio", sala: "Lab. 1" },
      "6": { materia: "Eng. de Software I", professor: "Cláudio", sala: "Lab. 1" }
    },
    "4": {
      "1": { materia: "Arq. e Org. Computadores", professor: "Thales", sala: "Sala 7" },
      "2": { materia: "Arq. e Org. Computadores", professor: "Thales", sala: "Sala 7" },
      "3": { materia: "Arq. e Org. Computadores", professor: "Thales", sala: "Sala 7" },
      "4": { materia: "Arq. e Org. Computadores", professor: "Thales", sala: "Sala 7" },
      "5": { materia: "Com. e Expressão", professor: "Sandra", sala: "On-line" },
      "6": { materia: "Com. e Expressão", professor: "Sandra", sala: "On-line" }
    },
    "5": {
      "1": null, "2": null,
      "3": { materia: "Proj. Integrador I", professor: "Rita", sala: "Lab. 1" },
      "4": { materia: "Proj. Integrador I", professor: "Rita", sala: "Lab. 1" },
      "5": null, "6": null
    }
  },

  "2": {
    "1": {
      "1": { materia: "Linguagem de Programação", professor: "Maromo", sala: "Lab. 2" },
      "2": { materia: "Linguagem de Programação", professor: "Maromo", sala: "Lab. 2" },
      "3": { materia: "Linguagem de Programação", professor: "Maromo", sala: "Lab. 2" },
      "4": { materia: "Linguagem de Programação", professor: "Maromo", sala: "Lab. 2" },
      "5": { materia: "Inglês II", professor: "Liliane", sala: "Sala 09" },
      "6": { materia: "Inglês II", professor: "Liliane", sala: "Sala 09" }
    },
    "2": {
      "1": { materia: "Gestão Financeira", professor: "Yasuko", sala: "Sala 08" },
      "2": { materia: "Gestão Financeira", professor: "Yasuko", sala: "Sala 08" },
      "3": { materia: "Com. e Expressão II", professor: "Sandra", sala: "Sala 08" },
      "4": { materia: "Com. e Expressão II", professor: "Sandra", sala: "Sala 08" },
      "5": { materia: "Interação Humano-Comp.", professor: "Thales", sala: "Lab. 5" },
      "6": { materia: "Interação Humano-Comp.", professor: "Thales", sala: "Lab. 5" }
    },
    "3": {
      "1": null, "2": null,
      "3": { materia: "Banco de Dados Relacional", professor: "Rita", sala: "Lab. 5" },
      "4": { materia: "Banco de Dados Relacional", professor: "Rita", sala: "Lab. 5" },
      "5": { materia: "Banco de Dados Relacional", professor: "Rita", sala: "Lab. 5" },
      "6": { materia: "Banco de Dados Relacional", professor: "Rita", sala: "Lab. 5" }
    },
    "4": {
      "1": null, "2": null,
      "3": { materia: "Cálculo", professor: "Vagner", sala: "Sala 10" },
      "4": { materia: "Cálculo", professor: "Vagner", sala: "Sala 10" },
      "5": { materia: "Cálculo", professor: "Vagner", sala: "Sala 10" },
      "6": null
    },
    "5": {
      "1": null, "2": null,
      "3": { materia: "Eng. de Software II", professor: "Thales", sala: "Lab. 2" },
      "4": { materia: "Eng. de Software II", professor: "Thales", sala: "Lab. 2" },
      "5": { materia: "Eng. de Software II", professor: "Thales", sala: "Lab. 2" },
      "6": { materia: "Eng. de Software II", professor: "Thales", sala: "Lab. 2" }
    }
  },

  "3": {
    "1": {
      "1": { materia: "Gestão de Projetos Ágeis", professor: "PC", sala: "Lab. 1" },
      "2": { materia: "Gestão de Projetos Ágeis", professor: "PC", sala: "Lab. 1" },
      "3": { materia: "Gestão de Projetos Ágeis", professor: "PC", sala: "Lab. 1" },
      "4": { materia: "Gestão de Projetos Ágeis", professor: "PC", sala: "Lab. 1" },
      "5": null, "6": null
    },
    "2": {
      "1": { materia: "Inglês III", professor: "Liliane", sala: "Sala 09" },
      "2": { materia: "Inglês III", professor: "Liliane", sala: "Sala 09" },
      "3": { materia: "Prog. Orientada a Objetos", professor: "Maromo", sala: "Lab. 4" },
      "4": { materia: "Prog. Orientada a Objetos", professor: "Maromo", sala: "Lab. 4" },
      "5": { materia: "Prog. Orientada a Objetos", professor: "Maromo", sala: "Lab. 4" },
      "6": { materia: "Prog. Orientada a Objetos", professor: "Maromo", sala: "Lab. 4" }
    },
    "3": {
      "1": { materia: "Gestão de Negócios e Inov.", professor: "Luiz Felipe", sala: "Lab. 2" },
      "2": { materia: "Gestão de Negócios e Inov.", professor: "Luiz Felipe", sala: "Lab. 2" },
      "3": { materia: "Gestão de Negócios e Inov.", professor: "Luiz Felipe", sala: "Lab. 2" },
      "4": { materia: "Gestão de Negócios e Inov.", professor: "Luiz Felipe", sala: "Lab. 2" },
      "5": null, "6": null
    },
    "4": {
      "1": null, "2": null,
      "3": { materia: "Lab. BD Relacional", professor: "Argemiro", sala: "Lab. 5" },
      "4": { materia: "Lab. BD Relacional", professor: "Argemiro", sala: "Lab. 5" },
      "5": { materia: "Lab. BD Relacional", professor: "Argemiro", sala: "Lab. 5" },
      "6": { materia: "Lab. BD Relacional", professor: "Argemiro", sala: "Lab. 5" }
    },
    "5": {
      "1": { materia: "Experiência Usuário (UX)", professor: "Rita", sala: "Lab. 1" },
      "2": { materia: "Experiência Usuário (UX)", professor: "Rita", sala: "Lab. 1" },
      "3": { materia: "Estrutura de Dados", professor: "Nava", sala: "Lab. 5" },
      "4": { materia: "Estrutura de Dados", professor: "Nava", sala: "Lab. 5" },
      "5": { materia: "Estrutura de Dados", professor: "Nava", sala: "Lab. 5" },
      "6": { materia: "Estrutura de Dados", professor: "Nava", sala: "Lab. 5" }
    }
  },

  "4": {
    "1": {
      "1": { materia: "Inglês IV", professor: "Liliane", sala: "Sala 09" },
      "2": { materia: "Inglês IV", professor: "Liliane", sala: "Sala 09" },
      "3": { materia: "Eletiva I – Testes Softw.", professor: "Cláudio", sala: "Lab. 4" },
      "4": { materia: "Eletiva I – Testes Softw.", professor: "Cláudio", sala: "Lab. 4" },
      "5": { materia: "Eletiva I – Testes Softw.", professor: "Cláudio", sala: "Lab. 4" },
      "6": { materia: "Eletiva I – Testes Softw.", professor: "Cláudio", sala: "Lab. 4" }
    },
    "2": {
      "1": { materia: "Sistemas Operacionais II", professor: "Thales", sala: "Lab. 2" },
      "2": { materia: "Sistemas Operacionais II", professor: "Thales", sala: "Lab. 2" },
      "3": { materia: "Sistemas Operacionais II", professor: "Thales", sala: "Lab. 2" },
      "4": { materia: "Sistemas Operacionais II", professor: "Thales", sala: "Lab. 2" },
      "5": { materia: "Eng. de Software III", professor: "PC", sala: "Lab. 2" },
      "6": { materia: "Eng. de Software III", professor: "PC", sala: "Lab. 2" }
    },
    "3": {
      "1": { materia: "Economia e Finanças", professor: "Yasuko", sala: "Sala 07" },
      "2": { materia: "Economia e Finanças", professor: "Yasuko", sala: "Sala 07" },
      "3": null, "4": null, "5": null, "6": null
    },
    "4": {
      "1": { materia: "Eng. de Software III", professor: "PC", sala: "Lab. 1" },
      "2": { materia: "Eng. de Software III", professor: "PC", sala: "Lab. 1" },
      "3": { materia: "Prog. Orientada a Objetos", professor: "Maromo", sala: "Lab. 4" },
      "4": { materia: "Prog. Orientada a Objetos", professor: "Maromo", sala: "Lab. 4" },
      "5": { materia: "Prog. Orientada a Objetos", professor: "Maromo", sala: "Lab. 4" },
      "6": { materia: "Prog. Orientada a Objetos", professor: "Maromo", sala: "Lab. 4" }
    },
    "5": {
      "1": null, "2": null,
      "3": { materia: "Estatística Aplicada", professor: "Fideli", sala: "Sala 10" },
      "4": { materia: "Estatística Aplicada", professor: "Fideli", sala: "Sala 10" },
      "5": { materia: "Estatística Aplicada", professor: "Fideli", sala: "Sala 10" },
      "6": { materia: "Estatística Aplicada", professor: "Fideli", sala: "Sala 10" }
    }
  },

  "5": {
    "1": {
      "1": { materia: "Segurança da Informação", professor: "Romildo", sala: "Lab. 4" },
      "2": { materia: "Segurança da Informação", professor: "Romildo", sala: "Lab. 4" },
      "3": { materia: "Inglês V", professor: "Liliane", sala: "Sala 09" },
      "4": { materia: "Inglês V", professor: "Liliane", sala: "Sala 09" },
      "5": null, "6": null
    },
    "2": {
      "1": { materia: "Sociedade e Tecnologia", professor: "Rita", sala: "Lab. 5" },
      "2": { materia: "Sociedade e Tecnologia", professor: "Rita", sala: "Lab. 5" },
      "3": { materia: "Prog. Linear e Aplicações", professor: "Vagner", sala: "Lab. 3" },
      "4": { materia: "Prog. Linear e Aplicações", professor: "Vagner", sala: "Lab. 3" },
      "5": { materia: "Prog. Linear e Aplicações", professor: "Vagner", sala: "Lab. 3" },
      "6": null
    },
    "3": {
      "1": { materia: "Lab. de Banco de Dados", professor: "PSS", sala: "Lab. 3" },
      "2": { materia: "Lab. de Banco de Dados", professor: "PSS", sala: "Lab. 3" },
      "3": null, "4": null, "5": null, "6": null
    },
    "4": {
      "1": null, "2": null,
      "3": { materia: "Lab. Eng. de Software", professor: "PC", sala: "Lab. 1" },
      "4": { materia: "Lab. Eng. de Software", professor: "PC", sala: "Lab. 1" },
      "5": { materia: "Lab. Eng. de Software", professor: "PC", sala: "Lab. 1" },
      "6": { materia: "Lab. Eng. de Software", professor: "PC", sala: "Lab. 1" }
    },
    "5": {
      "1": { materia: "Eletiva II – Prog. Web", professor: "Maromo", sala: "Lab. 4" },
      "2": { materia: "Eletiva II – Prog. Web", professor: "Maromo", sala: "Lab. 4" },
      "3": { materia: "Eletiva II – Prog. Web", professor: "Maromo", sala: "Lab. 4" },
      "4": { materia: "Eletiva II – Prog. Web", professor: "Maromo", sala: "Lab. 4" },
      "5": { materia: "Met. Pesquisa Cient.", professor: "Rita", sala: "Lab. 1" },
      "6": { materia: "Met. Pesquisa Cient.", professor: "Rita", sala: "Lab. 1" }
    }
  },

  "6": {
    "1": {
      "1": { materia: "Lab. de Redes", professor: "Rita", sala: "Lab. 5" },
      "2": { materia: "Lab. de Redes", professor: "Rita", sala: "Lab. 5" },
      "3": { materia: "Lab. de Redes", professor: "Rita", sala: "Lab. 5" },
      "4": { materia: "Lab. de Redes", professor: "Rita", sala: "Lab. 5" },
      "5": { materia: "Gestão de Equipes", professor: "César", sala: "Sala 10" },
      "6": { materia: "Gestão de Equipes", professor: "César", sala: "Sala 10" }
    },
    "2": {
      "1": null, "2": null,
      "3": { materia: "Inglês VI", professor: "Janaína", sala: "Lab. 7 – Bloco C" },
      "4": { materia: "Inglês VI", professor: "Janaína", sala: "Lab. 7 – Bloco C" },
      "5": { materia: "Empreendedorismo", professor: "Yasuko", sala: "Lab. 1" },
      "6": { materia: "Empreendedorismo", professor: "Yasuko", sala: "Lab. 1" }
    },
    "3": {
      "1": null, "2": null,
      "3": { materia: "Gest. e Gov. de TI", professor: "Carlos", sala: "Sala 8" },
      "4": { materia: "Gest. e Gov. de TI", professor: "Carlos", sala: "Sala 8" },
      "5": { materia: "Gest. e Gov. de TI", professor: "Carlos", sala: "Sala 8" },
      "6": { materia: "Gest. e Gov. de TI", professor: "Carlos", sala: "Sala 8" }
    },
    "4": {
      "1": null, "2": null,
      "3": { materia: "Gestão de Projetos", professor: "Douglas de Matteu", sala: "Lab. 2" },
      "4": { materia: "Gestão de Projetos", professor: "Douglas de Matteu", sala: "Lab. 2" },
      "5": { materia: "Gestão de Projetos", professor: "Douglas de Matteu", sala: "Lab. 2" },
      "6": { materia: "Gestão de Projetos", professor: "Douglas de Matteu", sala: "Lab. 2" }
    },
    "5": {
      "1": { materia: "Ética e Resp. Profissional", professor: "Rose", sala: "Sala 10" },
      "2": { materia: "Ética e Resp. Profissional", professor: "Rose", sala: "Sala 10" },
      "3": { materia: "Inteligência Artificial", professor: "Argemiro", sala: "Lab. 3" },
      "4": { materia: "Inteligência Artificial", professor: "Argemiro", sala: "Lab. 3" },
      "5": { materia: "Inteligência Artificial", professor: "Argemiro", sala: "Lab. 3" },
      "6": { materia: "Inteligência Artificial", professor: "Argemiro", sala: "Lab. 3" }
    }
  }
};

const diasNome = {
  "1": "Segunda", "2": "Terça", "3": "Quarta",
  "4": "Quinta", "5": "Sexta"
};

const usuarios = {}; 

// FUNÇÕES AUXILIARES //

function getDiaAtual() {
  const dia = new Date().getDay();
  return dia >= 1 && dia <= 5 ? String(dia) : null;
}

function formatarAula(aula, horario) {
  if (!aula) return "🚫 Sem aula";
  return `📚 ${aula.materia}\n👨‍🏫 ${aula.professor}\n🚪 ${aula.sala}\n🕐 ${horario}`;
}

function gerarGradeDia(semestre, dia) {
  const grade = gradeFatec[semestre]?.[dia];
  if (!grade) return "❌ Grade não encontrada";

  const hrs = getHorarios(semestre);
  let texto = `📅 *${diasNome[dia]}-feira - ${semestre}º Semestre*\n\n`;

  for (let b = 1; b <= 6; b++) {
    const aula = grade[String(b)];
    texto += `*Bloco ${b}* (${hrs[String(b)]})\n`;
    texto += formatarAula(aula, hrs[String(b)]) + "\n\n";
  }

  return texto;
}

function gerarGradeSemana(semestre) {
  let texto = `📅 *Grade da Semana - ${semestre}º Semestre*\n\n`;
  
  for (let dia = 1; dia <= 5; dia++) {
    texto += `*━━━ ${diasNome[String(dia)]}-feira ━━━*\n`;
    const grade = gradeFatec[semestre]?.[String(dia)];
    const hrs = getHorarios(semestre);
    
    if (!grade) {
      texto += "Sem dados\n\n";
      continue;
    }

    let temAula = false;
    for (let b = 1; b <= 6; b++) {
      const aula = grade[String(b)];
      if (aula) {
        temAula = true;
        texto += `${hrs[String(b)]} - ${aula.materia}\n`;
      }
    }
    if (!temAula) texto += "Sem aulas\n";
    texto += "\n";
  }

  return texto;
}

 // COMANDOS DO BOT //

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  
  bot.sendMessage(chatId, 
    "🎓 *Bem-vindo ao Bot da FATEC Mogi Mirim!*\n\n" +
    "Comandos disponíveis:\n" +
    "/semestre [1-6] - Define seu semestre\n" +
    "/hoje - Grade de hoje\n" +
    "/dia [seg-sex] - Grade de um dia\n" +
    "/semana - Grade da semana inteira\n" +
    "/proxima - Próxima aula\n" +
    "/notificar [on/off] - Ativa notificações\n" +
    "/ajuda - Mostra este menu",
    { parse_mode: 'Markdown' }
  );
});

bot.onText(/\/semestre (\d)/, (msg, match) => {
  const chatId = msg.chat.id;
  const semestre = match[1];

  if (!gradeFatec[semestre]) {
    bot.sendMessage(chatId, "❌ Semestre inválido. Use /semestre [1-6]");
    return;
  }

  usuarios[chatId] = usuarios[chatId] || {};
  usuarios[chatId].semestre = semestre;

  bot.sendMessage(chatId, 
    `✅ Semestre definido: *${semestre}º*\n\n` +
    `Agora você pode usar:\n` +
    `/hoje - Ver grade de hoje\n` +
    `/semana - Ver grade da semana`,
    { parse_mode: 'Markdown' }
  );
});

bot.onText(/\/hoje/, (msg) => {
  const chatId = msg.chat.id;
  const user = usuarios[chatId];

  if (!user?.semestre) {
    bot.sendMessage(chatId, "⚠️ Primeiro defina seu semestre com /semestre [1-6]");
    return;
  }

  const dia = getDiaAtual();
  if (!dia) {
    bot.sendMessage(chatId, "📅 Hoje é fim de semana! Aproveite o descanso 😎");
    return;
  }

  const grade = gerarGradeDia(user.semestre, dia);
  bot.sendMessage(chatId, grade, { parse_mode: 'Markdown' });
});

bot.onText(/\/dia (seg|ter|qua|qui|sex)/i, (msg, match) => {
  const chatId = msg.chat.id;
  const user = usuarios[chatId];

  if (!user?.semestre) {
    bot.sendMessage(chatId, "⚠️ Primeiro defina seu semestre com /semestre [1-6]");
    return;
  }

  const diaNomes = { seg: "1", ter: "2", qua: "3", qui: "4", sex: "5" };
  const dia = diaNomes[match[1].toLowerCase()];

  const grade = gerarGradeDia(user.semestre, dia);
  bot.sendMessage(chatId, grade, { parse_mode: 'Markdown' });
});

bot.onText(/\/semana/, (msg) => {
  const chatId = msg.chat.id;
  const user = usuarios[chatId];

  if (!user?.semestre) {
    bot.sendMessage(chatId, "⚠️ Primeiro defina seu semestre com /semestre [1-6]");
    return;
  }

  const grade = gerarGradeSemana(user.semestre);
  bot.sendMessage(chatId, grade, { parse_mode: 'Markdown' });
});

bot.onText(/\/proxima/, (msg) => {
  const chatId = msg.chat.id;
  const user = usuarios[chatId];

  if (!user?.semestre) {
    bot.sendMessage(chatId, "⚠️ Primeiro defina seu semestre com /semestre [1-6]");
    return;
  }

  const dia = getDiaAtual();
  if (!dia) {
    bot.sendMessage(chatId, "📅 Próxima aula: Segunda-feira!");
    return;
  }

  const agora = new Date();
  const horaAtual = agora.getHours() * 100 + agora.getMinutes();

  const grade = gradeFatec[user.semestre]?.[dia];
  const hrs = getHorarios(user.semestre);

  for (let b = 1; b <= 6; b++) {
    const horario = hrs[String(b)].split(' ')[0];
    const [h, m] = horario.split(':').map(Number);
    const horaAula = h * 100 + m;

    if (horaAula > horaAtual) {
      const aula = grade[String(b)];
      if (aula) {
        bot.sendMessage(chatId,
          `⏰ *Próxima aula*\n\n${formatarAula(aula, hrs[String(b)])}`,
          { parse_mode: 'Markdown' }
        );
        return;
      }
    }
  }

  bot.sendMessage(chatId, "✅ Sem mais aulas hoje! 🎉");
});

bot.onText(/\/notificar (on|off)/i, (msg, match) => {
  const chatId = msg.chat.id;
  const user = usuarios[chatId];

  if (!user?.semestre) {
    bot.sendMessage(chatId, "⚠️ Primeiro defina seu semestre com /semestre [1-6]");
    return;
  }

  const acao = match[1].toLowerCase();
  usuarios[chatId].notificacoes = (acao === 'on');

  bot.sendMessage(chatId, 
    acao === 'on' 
      ? "🔔 Notificações ativadas! Você será avisado 15min antes de cada aula."
      : "🔕 Notificações desativadas."
  );
});

bot.onText(/\/ajuda/, (msg) => {
  bot.sendMessage(msg.chat.id,
    "📚 *Comandos do Bot FATEC*\n\n" +
    "/semestre [1-6] - Define seu semestre\n" +
    "/hoje - Grade de hoje\n" +
    "/dia [seg-sex] - Grade de um dia específico\n" +
    "/semana - Grade da semana inteira\n" +
    "/proxima - Mostra a próxima aula\n" +
    "/notificar [on/off] - Liga/desliga notificações\n\n" +
    "Exemplo: /dia ter",
    { parse_mode: 'Markdown' }
  );
});

// NOTIFICAÇÕES AUTOMÁTICAS (15min antes) //

cron.schedule('* * * * *', () => {
  const agora = new Date();
  const dia = getDiaAtual();
  if (!dia) return;

  const horaAtual = agora.getHours() * 100 + agora.getMinutes();

  Object.keys(usuarios).forEach(chatId => {
    const user = usuarios[chatId];
    if (!user.notificacoes || !user.semestre) return;

    const grade = gradeFatec[user.semestre]?.[dia];
    if (!grade) return;

    const hrs = getHorarios(user.semestre);

    for (let b = 1; b <= 6; b++) {
      const aula = grade[String(b)];
      if (!aula) continue;

      const horario = hrs[String(b)].split(' ')[0];
      const [h, m] = horario.split(':').map(Number);
      const horaAula = h * 100 + m;

      if (horaAula - horaAtual === 15) {
        bot.sendMessage(chatId,
          `⏰ *Atenção!*\n\n` +
          `Sua aula começa em 15 minutos:\n\n` +
          formatarAula(aula, hrs[String(b)]),
          { parse_mode: 'Markdown' }
        );
      }
    }
  });
});

const http = require('http');
http.createServer((req, res) => {
  res.write('Bot online');
  res.end();
}).listen(process.env.PORT || 3000);

// INICIALIZAÇÃO //

console.log('🤖 Bot FATEC Mogi Mirim rodando...');
console.log('📱 Todos os 6 semestres carregados!');
console.log('🔔 Sistema de notificações ativo');