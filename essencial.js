// inf: modulos e pacotes npm, temas e etc
// inf:sempre usar nos html    
//nota: <script type="module" src="../js/util/essencial.js"></script>


//import: importar os dados firebaseFuncoes
import {
	salvarDados,
	obterDados,
	removerDados,
	loginComEmail,
	criarConta,
	redefinirSenha,
	adicionarItem,
	lerDadosUmaVez,
	lerLista,
  monitorarAutenticacao,
  UID
} from "../util/firebaseFuncoes.js";

monitorarAutenticacao()






// importing beercs design, só isso ela ja faz efeito na pagina em o script esta chamando
import "beercss";
import "material-dynamic-colors";


// import LOGS CUSTOM
import chalk from 'chalk';

export const log = {

  ok: (msg, ...args) => {
    console.log(chalk.bold.green(`✅ ${msg}`), ...args);
  },
  concluido: (msg, ...args) => {
    console.log(chalk.bold.green(`✅ ${msg}`), ...args);
  },
   erro: (msg, ...args) => {
    console.log(chalk.bold.red(`❌ ${msg}`), ...args);
  },
  aviso: (msg, ...args) => {
    console.log(chalk.bold.yellow(`⚠️ ${msg}`), ...args);
  },
  function: (msg, ...args) => {
    console.log(chalk.bold.cyanBright.bgBlack(`🛠️ ${msg}`), ...args);
  },
  nota: (msg, ...args) => {
    console.log(chalk.bold.yellow.bgBlack(`📝 ${msg}`), ...args);
  },
  script: (msg, ...args) => {
    console.log(chalk.bold.magentaBright.bgBlack(`📜 ${msg}`), ...args);
  },
  teste: (msg, ...args) => {
    console.log(chalk.bold.greenBright.bgBlack(`🧪 ${msg}`), ...args);
  },
   info: (msg, ...args) => {
    console.log(chalk.bold.blue(`ℹ️ ${msg}`), ...args);
  },

  success: (msg, ...args) => {
    console.log(chalk.bold.greenBright(`✅ ${msg}`), ...args);
  },
  error: (msg, ...args) => {
    console.log(chalk.bold.red(`❌ ${msg}`), ...args);
  },
  warn: (msg, ...args) => {
    console.log(chalk.bold.yellow(`⚠️ ${msg}`), ...args);
  },
  debug: (msg, ...args) => {
    console.log(chalk.gray(`🐞 DEBUG: ${msg}`), ...args);
  },
  custom: (styles = [], msg = '', ...args) => {
    let styled = chalk;
    styles.forEach(style => {
      if (styled[style]) styled = styled[style];
    });
    console.log(styled(msg), ...args);
  }
};




// tag: para alterar a cor do temas do beercss
// From color
//tag: tema so colocar a cor #0000
let theme = await ui("theme", "#ff5722");
console.log("tema beercss",theme)



function detectarTema() {
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      console.log('O sistema está em modo escuro!');
  } else {
      console.log('O sistema está em modo claro!');
  }
}

// detectarTema();









// log.success('Operação concluída com sucesso!');
// log.error('Erro ao salvar os dados!');
// log.warn('Cuidado! Isso pode ser perigoso.');
// log.info('Atualizando arquivos...');
// log.debug('Valor de x: ', 42);

// log.ok('okOperação concluída com sucesso!');
// log.concluido('concluidoErro ao salvar os dados!');
// log.erro('erroCuidado! Isso pode ser perigoso.');
// log.aviso('avisoAtualizando arquivos...');
// log.function('functionValor de x: ', 42);

// log.nota('notaokOperação concluída com sucesso!');
// log.script('scriptconcluidoErro ao salvar os dados!');
// log.teste('testenotaokOperação concluída com sucesso!');








// HEADER dinamico

const headerHTML = `
<header class="max responsive laranja">
    <nav>
        <button data-ui="#painel" class="circle transparent">
            <i>menu</i>
        </button>
        <h5 class="max responsive">
            <img src="../img/logo.png" alt="Logo">
        </h5>
        <a href="../paginas/perfil.html">
            <button class="circle black">
                <i>account_circle</i>
                <div class="tooltip bottom">Perfil</div>
            </button>
        </a>
        <a href="../paginas/trainer.html">
            <button class="circle black">
                <i>dashboard</i>
                <div class="tooltip bottom">Ficha de Treino</div>
            </button>
        </a>
        <a href="../paginas/blog.html">
            <button class="circle black">
                <i>newspaper</i>
                <div class="tooltip bottom">Blog</div>
            </button>
        </a>
        <a href="../paginas/tabelaTreino.html">
            <button class="circle black">
                <i>fitness_center</i>
                <div class="tooltip bottom">ficha</div>
            </button>
        </a>
    </nav>
</header>
`;

// Exemplo de como usar:
// Suponha que você tenha um elemento com o ID 'header-container' no seu HTML


const headerContainer = document.getElementById('headerDINAMICO');
if (headerContainer) {
    headerContainer.innerHTML = headerHTML;
}



const painelHTML = `
<dialog id="painel" class="left">
    <nav class="drawer min black">
        <header>
            <nav>
                <img class="circle extra" src="..//img/imagem.jpg">
                <h6>Estética e Saúde Academia</h6>
            </nav>
        </header>
        <nav class="vertical center-align middle-align">
            <h4 class="set_nome">nome</h4>
        </nav>

        <a href="../paginas/perfil.html">
            <i>account_circle</i>
            <span class="max">Perfil</span>
        </a>

        <a href="../paginas/login.html">
            <i>account_circle</i>
            <span class="max">Login/Cadastro</span>
        </a>
        <label>App</label>
        <a data-ui="#tab1">
            <i>conditions</i>
            <span>Calculadora de IMC</span>
        </a>
        <a data-ui="#tab2">
            <i>water_drop</i>
            <span> Contador de água</span>
        </a>
        <a data-ui="#tab3">
            <i>monitor_heart</i>
            <span> Calculadora de Gasto Calórico </span>
        </a>
        <a data-ui="#tab5">
            <i>water_loss</i>
            <span>Lembre-se de beber água</span>
        </a>
        <hr>
        <label>Usuario</label>

        <a href="../paginas/trainer.html">
            <i>fitness_center</i>
            <span class="max">Abrir Ficha de Treino</span>
        </a>

        <a href="../paginas/tabelaTreino.html">
            <i>fitness_center</i>
            <span class="max">Abrir Tabela de Treino</span>
        </a>
    </nav>
    </nav>
    <nav class="right-align">

    </dialog>
`;

// Exemplo de como usar:
// Suponha que você tenha um elemento no seu HTML onde deseja inserir este painel,
// por exemplo, um div com o ID 'app-container'
{/* <div id="painel-dinamico"></div> */}

const appContainer = document.getElementById('painel-dinamico');
if (appContainer) {
    appContainer.innerHTML += painelHTML; // Use += para adicionar sem substituir o conteúdo existente
}

// // Para mostrar o painel (já que é um <dialog>), você pode precisar de JavaScript adicional:
// const painelElement = document.getElementById('painel');
// if (painelElement) {
//    painelElement.showModal(); // Para mostrar como um modal
//    // ou painelElement.show(); // Para mostrar como um elemento normal
// }

log.script("essencial modulos carregados")
// sempre tem que mudae o nome no id apos isso? nao,ki to deixando mais de identificar no caso vai penas copiar e colar esee html,o resto auto