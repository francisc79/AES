// // Importações do Firebase (versão modular)
// import { initializeApp } from 'firebase/app';
//não sei pq esse comando nõa pegou entao usei o link direto das bibliotecas

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail
} from "https://www.gstatic.com/firebasejs/9.22.1/firebase-auth.js";

import {
  getDatabase,
  ref,
  set,
  get,
  remove
} from "https://www.gstatic.com/firebasejs/9.22.1/firebase-database.js";



// Configuração do Firebase (substitua os valores abaixo pelas suas credenciais)
const firebaseConfig = {
    apiKey: "AIzaSyBQP0hwQXbgam7WMq-91aSyueDBAprJbm4",
    authDomain: "academiaapp-b3307.firebaseapp.com",
    databaseURL: "https://academiaapp-b3307-default-rtdb.firebaseio.com",
    projectId: "academiaapp-b3307",
    storageBucket: "academiaapp-b3307.firebasestorage.app",
    messagingSenderId: "113309959427",
    appId: "1:113309959427:web:a285dee1b3068f51551536"
  };

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);

// ------------------------------
// FUNÇÕES DE AUTENTICAÇÃO
// ------------------------------

export function signupUser() {
  const email = document.getElementById("signup-email").value;
  const password = document.getElementById("signup-password").value;

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Usuário cadastrado com sucesso
      alert("Cadastro realizado com sucesso!");
      mostrarLogin();
    })
    .catch((error) => {
      console.error("Erro no cadastro:", error);
      alert("Erro no cadastro: " + error.message);
    });
}

export function loginUser() {
  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      alert("Login realizado com sucesso!");
      lerDadosUsuario();
    })
    .catch((error) => {
      console.error("Erro no login:", error);
      alert("Erro no login: " + error.message);
    });
}

export function resetPassword() {
  const email = document.getElementById("login-email").value;
  if (!email) {
    alert("Digite seu email para recuperação de senha.");
    return;
  }
  sendPasswordResetEmail(auth, email)
    .then(() => {
      alert("Email de recuperação enviado!");
    })
    .catch((error) => {
      console.error("Erro na recuperação de senha:", error);
      alert("Erro: " + error.message);
    });
}

export function mostrarCadastro() {
  document.getElementById("cadastroBox").style.display = "block";
}

export function mostrarLogin() {
  document.getElementById("cadastroBox").style.display = "none";
}

// ------------------------------
// FUNÇÕES DE CÁLCULO E CONTROLE (IMC e Água)
// ------------------------------

// Frase do Dia
const frases = [
    "A saúde é o maior presente, cultive-a bem.",
    "Beba água, seu corpo agradece!",
    "Mexa-se! O corpo foi feito para se movimentar.",
    "Uma boa noite de sono é um dos melhores remédios.",
    "Respire fundo e aproveite o momento.",
    "Sorria mais, faz bem para a alma.",
    "Seja gentil, o mundo precisa disso.",
    "Um dia de cada vez, sem pressa.",
    "O sol nasce para todos, aproveite o seu dia.",
    "Cada novo dia é uma nova oportunidade.",
    "A paciência é a chave para muitas portas.",
    "O importante é seguir em frente.",
    "Aproveite as pequenas coisas da vida.",
    "A felicidade está nas coisas simples.",
    "Cuide de sua mente como cuida do corpo.",
    "Leia um livro, sua mente agradece.",
    "A música pode transformar seu dia.",
    "Mantenha-se positivo, tudo tem solução.",
    "Seu esforço de hoje trará frutos amanhã.",
    "O descanso também faz parte do progresso.",
    "Valorize quem está ao seu lado.",
    "Um café e um sorriso mudam qualquer manhã.",
    "Faça algo novo, saia da rotina.",
    "Seja grato pelo que tem.",
    "A vida é feita de escolhas, faça boas escolhas.",
    "Acredite no seu potencial.",
    "Caminhe ao ar livre e sinta a natureza.",
    "Boas vibrações atraem coisas boas.",
    "O tempo é precioso, use-o com sabedoria.",
    "Desafie-se e supere seus limites.",
    "O conhecimento é um tesouro infinito.",
    "Seja a mudança que deseja no mundo.",
    "Ajude alguém hoje, mesmo que com um sorriso.",
    "O que você planta hoje, colhe amanhã.",
    "A sorte favorece os que trabalham duro.",
    "Não tenha medo de errar, é parte do aprendizado.",
    "Você é mais forte do que imagina.",
    "O segredo do sucesso é a persistência.",
    "O silêncio também é uma resposta.",
    "A gratidão transforma dias comuns em especiais.",
    "Respire fundo e sinta a paz interior.",
    "Sonhe grande, comece pequeno, mas vá longe.",
    "A vida é curta para guardar rancores.",
    "Seja um exemplo, inspire os outros.",
    "O passado não pode ser mudado, mas o futuro sim.",
    "A gentileza sempre volta.",
    "O amor começa dentro de você.",
    "Cuide de sua saúde mental.",
    "A simplicidade é a verdadeira sofisticação.",
    "Faça o bem sem esperar nada em troca.",
    "Sua energia atrai coisas semelhantes.",
    "A mente é poderosa, alimente-a bem.",
    "Não desista, os desafios nos tornam mais fortes.",
    "Toda jornada começa com um primeiro passo.",
    "Encontre beleza nos pequenos detalhes.",
    "Nada é impossível para quem persiste.",
    "O tempo certo para agir é agora.",
    "Acredite no poder dos seus sonhos.",
    "Seja luz na vida de alguém hoje.",
    "As palavras têm poder, escolha bem as suas.",
    "A vida é um reflexo das suas atitudes.",
    "Pequenas ações diárias criam grandes mudanças.",
    "Ouça mais, fale menos.",
    "A verdadeira riqueza está no que você sente.",
    "Evite comparações, cada um tem seu tempo.",
    "A bondade nunca sai de moda.",
    "Não tenha medo de recomeçar.",
    "A felicidade mora dentro de você.",
    "Valorize suas conquistas, por menores que sejam.",
    "A paz começa com um sorriso.",
    "Dê o seu melhor, sempre.",
    "Confie no processo, tudo tem seu tempo.",
    "O sucesso é feito de pequenos avanços diários.",
    "A vida é um presente, aproveite-o.",
    "Menos preocupação, mais gratidão.",
    "A fé move montanhas.",
    "O amor próprio é o começo de tudo.",
    "Não deixe para amanhã o que pode fazer hoje.",
    "Cada dia é uma nova chance de ser melhor.",
    "O aprendizado nunca acaba.",
    "Valorize cada momento, pois ele é único.",
    "O equilíbrio é a chave para uma vida plena.",
    "Seja flexível, mas mantenha seus princípios.",
    "Seja dono do seu destino.",
    "Não existe um caminho certo, existe o seu caminho.",
    "Respire fundo e recomece quantas vezes for necessário.",
    "Transforme desafios em oportunidades.",
    "O amor sempre encontra um caminho.",
    "Não tema as mudanças, elas trazem crescimento.",
    "A beleza da vida está nos detalhes.",
    "Mantenha sua mente aberta a novas possibilidades.",
    "O otimismo muda perspectivas.",
    "Seu tempo é valioso, invista em coisas que importam.",
    "Siga em frente, sempre há algo bom à frente.",
    "Lembre-se: você é capaz de mais do que imagina.",
    "Grandes mudanças começam com pequenas atitudes.",
    "A maior coragem é seguir seu coração.",
    "A felicidade se constrói dia após dia."
];
export function exibirFraseAleatoria() {
  document.getElementById("frase").innerText =
    frases[Math.floor(Math.random() * frases.length)];
}

// Cálculo do IMC
export function calcularIMC() {
  const peso = parseFloat(document.getElementById("peso").value);
  const altura = parseFloat(document.getElementById("altura").value);
  const resultadoDiv = document.getElementById("resultadoIMC");

  if (!peso || !altura || altura <= 0) {
    resultadoDiv.innerText = "Insira valores válidos.";
    resultadoDiv.className = "";
    return;
  }

  const imc = peso / (altura * altura);
  const classificacao =
    imc < 18.5 ? "Abaixo do peso" :
    imc < 24.9 ? "Peso normal" :
    imc < 29.9 ? "Sobrepeso" : "Obesidade";

  resultadoDiv.innerText = `IMC: ${imc.toFixed(2)} - ${classificacao}`;

  // Define classes para estilizar o resultado
  resultadoDiv.className = "";
  if (classificacao === "Abaixo do peso") resultadoDiv.classList.add("abaixo-do-peso");
  else if (classificacao === "Peso normal") resultadoDiv.classList.add("peso-normal");
  else if (classificacao === "Sobrepeso") resultadoDiv.classList.add("sobrepeso");
  else if (classificacao === "Obesidade") resultadoDiv.classList.add("obesidade");
}

// Contador de Água
let totalAgua = 0;

export function atualizarProgresso() {
  const meta = parseInt(document.getElementById("meta-agua").value);
  const progresso = (totalAgua / meta) * 100;
  document.getElementById("progress-bar").style.width = `${Math.min(progresso, 100)}%`;
}

export function adicionarAgua(qtd) {
  totalAgua += qtd;
  document.getElementById("agua-total").innerText = totalAgua;
  atualizarProgresso();
}

export function adicionarAguaCustom() {
  const qtd = parseInt(document.getElementById("agua-custom").value);
  if (qtd > 0) adicionarAgua(qtd);
}

export function resetarAgua() {
  totalAgua = 0;
  document.getElementById("agua-total").innerText = 0;
  atualizarProgresso();
}

// ------------------------------
// FUNÇÕES DE CRUD NO FIREBASE REALTIME DATABASE
// ------------------------------

export function salvarDadosUsuario() {
  const user = auth.currentUser;
  if (!user) {
    alert("Você precisa estar logado para salvar os dados.");
    return;
  }
  const dados = {
    imc: document.getElementById("resultadoIMC").innerText,
    agua: totalAgua,
    timestamp: Date.now()
  };
  //aqui onde tem set,ela salvar e susbtutir o anterior, no caso na documentaçao do firebase tem exemplo bem simples de como usar,
  set(ref(database, 'usuarios/' + user.uid + '/dados'), dados)
    .then(() => {
      alert("Dados salvos com sucesso!");
    })
    .catch((error) => {
      console.error("Erro ao salvar dados:", error);
      alert("Erro ao salvar dados: " + error.message);
    });
}

export function lerDadosUsuario() {
  const user = auth.currentUser;
  if (!user) {
    alert("Você precisa estar logado para ler os dados.");
    return;
  }
  const dadosRef = ref(database, 'usuarios/' + user.uid + '/dados');
  get(dadosRef)
    .then((snapshot) => {
      if (snapshot.exists()) {
        const dados = snapshot.val();
        alert(`Dados do usuário:\nIMC: ${dados.imc}\nÁgua consumida: ${dados.agua} ml`);
      } else {
        alert("Nenhum dado encontrado.");
      }
    })
    .catch((error) => {
      console.error("Erro ao ler dados:", error);
      alert("Erro ao ler dados: " + error.message);
    });
}

export function excluirDadosUsuario() {
  const user = auth.currentUser;
  if (!user) {
    alert("Você precisa estar logado para excluir os dados.");
    return;
  }
  const dadosRef = ref(database, 'usuarios/' + user.uid + '/dados');
  remove(dadosRef)
    .then(() => {
      alert("Dados excluídos com sucesso!");
    })
    .catch((error) => {
      console.error("Erro ao excluir dados:", error);
      alert("Erro ao excluir dados: " + error.message);
    });
}

// ------------------------------
// CONFIGURAÇÃO DOS EVENT LISTENERS AO CARREGAR O DOM
// ------------------------------

document.addEventListener("DOMContentLoaded", () => {
  // Exibe a frase do dia assim que o DOM estiver carregado
  exibirFraseAleatoria();

  // Configura eventos para autenticação
  document.getElementById("login-email").addEventListener("keypress", (e) => {
    if (e.key === "Enter") loginUser();
  });
  document.getElementById("login-password").addEventListener("keypress", (e) => {
    if (e.key === "Enter") loginUser();
  });

  // Remove os onclick inline e adiciona os event listeners para os botões
  document.querySelector(".menu-icon").addEventListener("click", () => {
    const menu = document.getElementById("menu");
    menu.style.display = menu.style.display === "block" ? "none" : "block";
  });

  document.getElementById("signup-email").addEventListener("keypress", (e) => {
    if (e.key === "Enter") signupUser();
  });
  document.getElementById("signup-password").addEventListener("keypress", (e) => {
    if (e.key === "Enter") signupUser();
  });

  // Botões de autenticação
  document.querySelector("button[onclick='loginUser()']").addEventListener("click", loginUser);
  document.querySelector("button[onclick='signupUser()']").addEventListener("click", signupUser);
  // Para links de recuperação de senha e troca de telas, também associamos:
  document.querySelector("a[onclick='mostrarCadastro()']").addEventListener("click", mostrarCadastro);
  document.querySelector("a[onclick='mostrarLogin()']").addEventListener("click", mostrarLogin);
  document.querySelector("a[onclick='resetPassword()']").addEventListener("click", resetPassword);

  // Botões e inputs dos cálculos
  document.querySelector("button[onclick='calcularIMC()']").addEventListener("click", calcularIMC);
  document.getElementById("meta-agua").addEventListener("change", atualizarProgresso);
  document.querySelector("button[onclick='adicionarAgua(250)']").addEventListener("click", () => adicionarAgua(250));
  document.querySelector("button[onclick='adicionarAgua(400)']").addEventListener("click", () => adicionarAgua(400));
  document.querySelector("button[onclick='adicionarAguaCustom()']").addEventListener("click", adicionarAguaCustom);
  document.querySelector("button[onclick='resetarAgua()']").addEventListener("click", resetarAgua);

  // Botões de CRUD no Firebase
  document.querySelector("button[onclick='salvarDadosUsuario()']").addEventListener("click", salvarDadosUsuario);
  document.querySelector("button[onclick='lerDadosUsuario()']").addEventListener("click", lerDadosUsuario);
  document.querySelector("button[onclick='excluirDadosUsuario()']").addEventListener("click", excluirDadosUsuario);
});
