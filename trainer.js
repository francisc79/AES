//import: importar salvar e retornar localStorage no chrome
import { setDb, getDb } from "../util/salvamentoLocal.js";

//import: logs
import { log } from "../util/essencial.js";
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

log.script("trainer modulos carregados");


// objeto dados 1ºvez no bd,caso não exista nada ou for null
var objPadrao = {
	sequencias: [],
};

var INDEX_TREINO = 0


// cards cardsDinamicos_addSequencias 
function cardsDinamicos_addSequencias(index, nomeSeq, exerciciosdados) {
	// Criar o <article>
	const article = document.createElement("article");
	article.className = "bg-dark";
	article.setAttribute("index", index);
	// event <article> click
	article.addEventListener("click", () => {
		var tab2 = document.querySelector('.tabs.responsive a[data-ui="#tab2"]');
		tab2.classList.add("active");
		tab2.click();
		// console.log(`article nome: ${nomeSeq}`);
		// func carregar dados da sequecia para proxima tela
		loadTela_addExercicio(index)
		INDEX_TREINO = index
		fabVisivel()
	});
	// Criar o <h5>
	const h5 = document.createElement("h5");
	h5.textContent = nomeSeq;
	article.appendChild(h5);
	// Criar o <div class="space">
	const spaceDiv = document.createElement("div");
	spaceDiv.className = "space";
	article.appendChild(spaceDiv);
	// Criar o <div class="tas responsive">
	const tasDiv = document.createElement("div");
	tasDiv.className = "tas responsive";
	// Array com os textos dos botões
	const treinos = ["treino 1", "treino 2", "treino 3", "treino 4", "..+5"];

	const chavesExercicios = Object.keys(exerciciosdados);
	const valuesExercicios = Object.values(exerciciosdados);

	console.log("valuesExercicios:", valuesExercicios);

	
					
// Define quantos itens mostrar normalmente antes do chip "reduzido"
const limiteItensNormais = 3;

// Limpa o container antes de adicionar os chips (opcional, dependendo do seu fluxo)
// tasDiv.innerHTML = '';

// Itera sobre os itens, mas apenas até o limite definido
for (let i = 0; i < valuesExercicios.length; i++) {
    const value = valuesExercicios[i];

    // Se o índice atual for menor que o limite, cria um chip normal
    if (i < limiteItensNormais) {
        const button = document.createElement("button");
        button.className = "chip fill"; // Use as classes CSS apropriadas
		button.style.margin = " 7px 0px"
        const icon = document.createElement("i");
        icon.textContent = "done"; // Ícone ou texto
        const span = document.createElement("span");
        span.textContent = value.nome; // Nome do exercício

        button.appendChild(icon);
        button.appendChild(span);
        tasDiv.appendChild(button);

    } else if (i === limiteItensNormais) {
        // Se este for o primeiro item APÓS o limite (o 4º item, índice 3),
        // cria o chip especial com a contagem restante.

        const button = document.createElement("button");
        button.className = "chip fill"; // Use as classes CSS apropriadas
		button.style.margin = " 7px 0px"
        // Opcional: Adicione uma classe diferente para estilizar este chip especial
        // button.classList.add("chip-more-items");

        const icon = document.createElement("i");
        icon.textContent = "more_horiz"; // Ícone para indicar mais itens (ex: três pontos)
        // Ou use outro ícone que faça sentido no seu design

        const span = document.createElement("span");
        // Calcula quantos itens restam (total - os itens normais já exibidos)
        const itensRestantes = valuesExercicios.length - limiteItensNormais;
        // Define o texto do span com o nome do 4º item e a contagem restante
        span.textContent = ` +${itensRestantes} treinos...`;

        button.appendChild(icon);
        button.appendChild(span);
        tasDiv.appendChild(button);

        // Como já adicionamos o chip especial para todos os itens restantes,
        // podemos sair do loop.
        break;
    }
    // Itens com índice > limiteItensNormais (do 5º em diante) não serão processados individualmente
    // porque saímos do loop no 'else if' acima.
}

	// Criar os botões
	// valuesExercicios.forEach((value, index) => {
	
	// 	const button = document.createElement("button");
	// 	button.className = "chip fill";
	// 	const icon = document.createElement("i");
	// 	icon.textContent = "done";
	// 	const span = document.createElement("span");
	// 	span.textContent = value.nome;
	// 	button.appendChild(icon);
	// 	button.appendChild(span);
	// 	tasDiv.appendChild(button);
		
	// });
	// Adicionar div com botões ao article
	article.appendChild(tasDiv);
	//retornar article
	return article;
}

//card cardDinamicos_addExercicio
function loadTela_addExercicio(index) {
	var nome_sequencia = document.querySelector(".nome_sequencia");
	var count_exercicio = document.querySelector(".count_exercicio");
	var lista_de_exercicios = document.querySelector(".lista_de_exercicios");
	lista_de_exercicios.innerHTML = "";

	// chamo e o banco de dados e acesso o array sequecias
	var db = getDb("treinamento") === null ? objPadrao : getDb("treinamento");
	// // console.log(db.sequencias[index]);
	// var sequenciaAtualDB = db.sequencias[index];

	// // injetar nome seq
	// nome_sequencia.innerHTML = sequenciaAtualDB.nome;
	// // injetar count
	// count_exercicio.innerHTML = `${sequenciaAtualDB.exercicios.length} Exercícios`;


	obterDados(`/usuarios/${UID}/treinamento/sequencias/${index}`).then((dados) => {
			// console.log("loadTela_addExercicio dados do Firebase", dados);
			nome_sequencia.innerHTML = dados.nome;
			const chavesexercicios = Object.keys(dados.exercicios);
			count_exercicio.innerHTML = `${chavesexercicios.length} Exercícios`;
		}
	);

	obterDados(
		`/usuarios/${UID}/treinamento/sequencias/${index}/exercicios`
	).then((dados) => {
		// console.log("loadTela_addExercicio dados do Firebase", dados);
		// Obtém um array com todas as chaves (IDs únicos) do objeto 'dados'
		const chavesSequencias = Object.keys(dados);
		// Opcional: Limpar a lista antes de renderizar (se necessário)
		lista_de_exercicios.innerHTML = "";
		// Itera sobre o array de chaves
		chavesSequencias.forEach((chave, index) => {
			// Para cada chave, acessa o objeto de sequência correspondente no objeto 'dados'
			const itemSequencia = dados[chave];
			// Agora 'itemSequencia' é o objeto { "nome": "seqX", "exercicios": [...] }
			// Você pode acessar itemSequencia.nome e itemSequencia.exercicios
			// Se a sequência tiver exercícios, você pode acessá-los assim:
			// console.log("Exercícios:", itemSequencia.exercicios);
			var cards = cardDinamicos_addExercicio_cardMini(index, itemSequencia);
			// injeta os card na lista
			lista_de_exercicios.appendChild(cards);
		});
	});
	

	// objPadrao.sequencias[0].exercicios.

	// acesso o array sequecias e pecorro cada item
	// db.sequencias[index].exercicios.forEach((item, index) => {
	// 	// teste cada nome seq
	// 	// console.log(`${item.nome}`);
	// 	console.log(item);

	// 	// gero os card dinamicos
	// 	var cards = cardDinamicos_addExercicio_cardMini(index, item);
	// 	// injeta os card na lista
	// 	lista_de_exercicios.appendChild(cards);
	// });
}

//card cardDinamicos_addExercicio
function cardDinamicos_addExercicio_cardMini(index,item){
	// 1. Opcional: Obter a referência para a lista onde você quer adicionar o item
// Certifique-se de que este <ul> já existe no seu HTML

// 2. Criar o elemento <li> principal
const novoLi = document.createElement('li');
novoLi.classList.add('li-card-min'); // Adiciona a classe ao li

// 3. Criar os elementos internos e adicionar conteúdo e classes
const buttonA = document.createElement('button');
buttonA.classList.add('circle');
buttonA.textContent = obterDuasPrimeirasLetrasCombinadas(item.nome); // Define o texto do botão

const divMaxResponsive = document.createElement('div');
divMaxResponsive.classList.add('max', 'responsive'); // Adiciona múltiplas classes

const h6Small = document.createElement('h6');
h6Small.classList.add('small');
h6Small.textContent = item.nome; // Você pode querer mudar isso dinamicamente

const navElement = document.createElement('nav');

// Criar e adicionar os spans e texto à nav
const spanSeries = document.createElement('span');
spanSeries.textContent =  `${item.series} series`; // Exemplo de valor
navElement.appendChild(spanSeries);
navElement.appendChild(document.createTextNode('X')); // Adiciona o texto "X"

const spanRepeticoes = document.createElement('span');
spanRepeticoes.textContent = `${item.repeticoes} repetições`; // Exemplo de valor
navElement.appendChild(spanRepeticoes);
navElement.appendChild(document.createTextNode('X')); // Adiciona o texto "X"

const spanCarga = document.createElement('span');
spanCarga.textContent = `${item.carga} carga`; // Exemplo de valor
navElement.appendChild(spanCarga);

// Montar a div max-responsive
divMaxResponsive.appendChild(h6Small);
divMaxResponsive.appendChild(navElement);

const buttonEditar = document.createElement('button');
buttonEditar.classList.add('small');
buttonEditar.style.width = 'min-content'; // Define o estilo inline
buttonEditar.textContent = 'editar'; // Define o texto do botão

// 4. Montar o li, adicionando todos os elementos criados
// A ordem de adição importa para a estrutura HTML
novoLi.appendChild(buttonA);
novoLi.appendChild(divMaxResponsive);
novoLi.appendChild(buttonEditar);



return novoLi
	
}

// func
function obterDuasPrimeirasLetrasCombinadas(texto) {
	// Verifica se a entrada é uma string. Se não for, retorna uma string vazia.
	if (typeof texto !== 'string') {
	  return "";
	}
  
	// Remove espaços extras no início e fim e divide a string em um array de palavras
	const palavras = texto.trim().split(' ');
  
	// Array para armazenar a primeira letra de cada palavra
	const primeirasLetras = [];
  
	// Itera sobre as palavras
	for (const palavra of palavras) {
	  // Verifica se a palavra não está vazia e tem pelo menos um caractere
	  if (palavra.length > 0) {
		// Pega a primeira letra da palavra, converte para minúscula e adiciona ao array
		primeirasLetras.push(palavra.charAt(0).toLowerCase());
	  }
	  // Se a palavra estiver vazia (de múltiplos espaços), simplesmente a ignoramos.
	}
  
	// Junta todas as primeiras letras em uma única string
	const resultadoCombinado = primeirasLetras.join('');
  
	// Retorna os primeiros 2 caracteres da string combinada.
	// slice(0, 2) retorna a string inteira se ela tiver 0, 1 ou 2 caracteres.
	return resultadoCombinado.slice(0, 2);
  }

// func fab visivel
function fabVisivel(){
	if (document.querySelector('.tabs.responsive a[data-ui="#tab2"]').classList.value === 'active'){
		document.querySelector("#fab_add_treino").style.display = 'block'
	} else{
		document.querySelector("#fab_add_treino").style.display = 'none'
	}
}


// component: ADD SEQUENCIA
// div da lista onde vai ser injetada dinamicamente
const lista = document.querySelector(".lista_de_sequecias");
// add sequencia
var input_Seq = document.querySelector("#input_Seq");
var btn_salvarSeq = document.querySelector("#btn_salvarSeq");
// btn
btn_salvarSeq.addEventListener("click", function () {
	// db banco de dados ,condicional ternario
	var db = getDb("treinamento") === null ? objPadrao : getDb("treinamento");

	adicionarItem(`/usuarios/${UID}/treinamento/sequencias`, {
		nome: input_Seq.value,
		exercicios: [],
	});



	// o mesmo que objPadrao.sequencias, acessa o array sequencias
	// push adiciona mais 1 item dentro do array sequencias
	db.sequencias.push({
		nome: input_Seq.value,
		exercicios: [],
	});
	// salva o novo treinamento com array atualizado no db
	setDb("treinamento", db);
	 
	console.log(db);
	// limpar o input seq
	input_Seq.value = "";

	// inf: no caso aqui uso para chamar o valor do db treinamento e pecorrer os  valores
	// inf e injetar na lista dinamica

	// esvazia a lista, o mesmo que remover os filhos elementos dentro dela
	lista.innerHTML = "";

	// chamo e o banco de dados e acesso o array sequecias
	var db = getDb("treinamento") === null ? objPadrao : getDb("treinamento");
	// console.log(" db", db);

	// acesso o array sequecias e pecorro cada item
	db.sequencias.forEach((item,index) => {
		// teste cada nome seq
		// console.log(`${item.nome}`);

		// gero os card dinamicos
		var cards = cardsDinamicos_addSequencias(index,item.nome, []);
		// injeta os card na lista
		lista.appendChild(cards);
	});
}); //end click


// component: ADD TREINOS
//func: organizadas em funcoes ,iniciar junto ao DOM
//tag add itens no menu exercicio
function addTreino_MENU_exercicio(){
		
		const ListaexerciciosAcademia = [
			// Membros Inferiores
			"Agachamento Livre",
			"Agachamento Smith",
			"Leg Press",
			"Cadeira Extensora",
			"Cadeira Flexora",
			"Stiff",
			"Levantamento Terra Romeno",
			"Afundo (ou Avanço)",
			"Cadeira Abdutora",
			"Cadeira Adutora",
			"Panturrilha em Pé",
			"Panturrilha Sentado",
	
			// Peito
			"Supino Reto com Barra",
			"Supino Reto com Halteres",
			"Supino Inclinado com Barra",
			"Supino Inclinado com Halteres",
			"Supino Declinado",
			"Crucifixo Reto com Halteres",
			"Crucifixo Inclinado com Halteres",
			"Cross Over (Polia Alta)",
			"Flexão de Braço",
	
			// Costas
			"Barra Fixa (Pull-up)",
			"Puxada Alta (Lat Pulldown)",
			"Remada Curvada com Barra",
			"Remada com Halteres (Serrote)",
			"Remada Baixa (Cavalo)",
			"Remada Sentada na Polia Baixa",
			"Levantamento Terra",
	
			// Ombros
			"Desenvolvimento com Barra (Overhead Press)",
			"Desenvolvimento com Halteres Sentado",
			"Elevação Lateral com Halteres",
			"Elevação Frontal com Halteres",
			"Remada Alta com Barra",
			"Crucifixo Invertido (Peck Deck ou Halteres)",
	
			// Braços (Bíceps e Tríceps)
			"Rosca Direta com Barra",
			"Rosca Direta com Halteres",
			"Rosca Alternada com Halteres",
			"Rosca Scott",
			"Rosca Concentrada",
			"Tríceps Pulley (Barra Reta ou Corda)",
			"Tríceps Testa com Barra ou Halteres",
			"Tríceps Francês (com Haltere ou Barra)",
			"Paralelas (Dips)",
			"Tríceps Coice",
	
			// Core (Abdômen e Lombar)
			"Prancha",
			"Prancha Lateral",
			"Abdominal Crunch",
			"Elevação de Pernas",
			"Abdominal Bicicleta",
			"Russian Twist",
			"Hiperextensão Lombar",
	
			// Cardio
			"Esteira (Corrida/Caminhada)",
			"Elíptico",
			"Bicicleta Ergométrica (Vertical/Horizontal)",
			"Simulador de Escada (Stairmill)",
			"Remo (Máquina de Remo)",
			"Pular Corda",
		];
	
		var menuTreinos = document.querySelector("#menuTreinos");
		menuTreinos.innerHTML = "";
		ListaexerciciosAcademia.forEach((item) => {
			// gero os card dinamicos
			const li = document.createElement("li");
			li.innerHTML = `<i>history</i>
						<div>${item}</div>`;
			// injeta os card na lista
			menuTreinos.appendChild(li);
		});
		const searchBox = document.querySelector(".searchBox");
	
		// Seleciona todos os itens <li> do menu, exceto o primeiro (input interno)
		document.querySelectorAll("menu.min li").forEach((li) => {
			li.addEventListener("click", () => {
				const selectedText = li.querySelector("div")?.innerText;
				if (selectedText && searchBox) {
					searchBox.value = selectedText;
				}
			});
		});
}
//tag repeticoes
function addTreino_REPETICOES(){
	
	const inputRepeticao = document.getElementById("inp_repeticao");
	const btnRepAdd = document.getElementById("btn-rep-add");
	const btnRepRemove = document.getElementById("btn-rep-remove");

	// Adiciona um "ouvinte" de evento de clique ao botão de adicionar
	btnRepAdd.addEventListener("click", function () {
		// Obtém o valor atual do input, converte para número inteiro
		let valorAtual = parseInt(inputRepeticao.value);
		// Verifica se a conversão foi bem-sucedida (não é NaN)
		if (!isNaN(valorAtual)) {
			// Incrementa o valor em 1
			valorAtual++;
			// Atualiza o valor do input com o novo valor
			inputRepeticao.value = valorAtual;
		} else {
			// Se o valor atual não for um número válido, define como 1
			inputRepeticao.value = 1;
		}
	});
	// Adiciona um "ouvinte" de evento de clique ao botão de remover
	btnRepRemove.addEventListener("click", function () {
		// Obtém o valor atual do input, converte para número inteiro
		let valorAtual = parseInt(inputRepeticao.value);
		// Verifica se a conversão foi bem-sucedida e se o valor é maior que 0
		if (!isNaN(valorAtual) && valorAtual > 0) {
			// Decrementa o valor em 1
			valorAtual--;
			// Atualiza o valor do input com o novo valor
			inputRepeticao.value = valorAtual;
		} else if (isNaN(valorAtual)) {
			// Se o valor atual não for um número válido, define como 0
			inputRepeticao.value = 0;
		}
		// Se o valor for 0 ou menor, não faz nada para evitar números negativos
	});
}
// tag series
function addTreino_SERIES() {
	
	const inputSeries = document.getElementById("inp_series");
	const btnSeriespAdd = document.getElementById("btn-series-add");
	const btnSeriesRemove = document.getElementById("btn-series-remove");

	// Adiciona um "ouvinte" de evento de clique ao botão de adicionar
	btnSeriespAdd.addEventListener("click", function () {
		// Obtém o valor atual do input, converte para número inteiro
		let valorAtual = parseInt(inputSeries.value);
		// Verifica se a conversão foi bem-sucedida (não é NaN)
		if (!isNaN(valorAtual)) {
			// Incrementa o valor em 1
			valorAtual++;
			// Atualiza o valor do input com o novo valor
			inputSeries.value = valorAtual;
		} else {
			// Se o valor atual não for um número válido, define como 1
			inputSeries.value = 1;
		}
	});
	// Adiciona um "ouvinte" de evento de clique ao botão de remover
	btnSeriesRemove.addEventListener("click", function () {
		// Obtém o valor atual do input, converte para número inteiro
		let valorAtual = parseInt(inputSeries.value);
		// Verifica se a conversão foi bem-sucedida e se o valor é maior que 0
		if (!isNaN(valorAtual) && valorAtual > 0) {
			// Decrementa o valor em 1
			valorAtual--;
			// Atualiza o valor do input com o novo valor
			inputSeries.value = valorAtual;
		} else if (isNaN(valorAtual)) {
			// Se o valor atual não for um número válido, define como 0
			inputSeries.value = 0;
		}
		// Se o valor for 0 ou menor, não faz nada para evitar números negativos
	});
}
// tag carga
function addTreino_CARGA(){
	
	const inputCarga = document.getElementById("inp_carga");
	const btnCargapAdd = document.getElementById("btn-carga-add");
	const btnCargaRemove = document.getElementById("btn-carga-remove");

	// Adiciona um "ouvinte" de evento de clique ao botão de adicionar
	btnCargapAdd.addEventListener("click", function () {
		// Obtém o valor atual do input, converte para número inteiro
		let valorAtual = parseInt(inputCarga.value);
		// Verifica se a conversão foi bem-sucedida (não é NaN)
		if (!isNaN(valorAtual)) {
			// Incrementa o valor em 1
			valorAtual++;
			// Atualiza o valor do input com o novo valor
			inputCarga.value = valorAtual;
		} else {
			// Se o valor atual não for um número válido, define como 1
			inputCarga.value = 1;
		}
	});
	// Adiciona um "ouvinte" de evento de clique ao botão de remover
	btnCargaRemove.addEventListener("click", function () {
		// Obtém o valor atual do input, converte para número inteiro
		let valorAtual = parseInt(inputCarga.value);
		// Verifica se a conversão foi bem-sucedida e se o valor é maior que 0
		if (!isNaN(valorAtual) && valorAtual > 0) {
			// Decrementa o valor em 1
			valorAtual--;
			// Atualiza o valor do input com o novo valor
			inputCarga.value = valorAtual;
		} else if (isNaN(valorAtual)) {
			// Se o valor atual não for um número válido, define como 0
			inputCarga.value = 0;
		}
		// Se o valor for 0 ou menor, não faz nada para evitar números negativos
	});
}

// component: TABELA dinamica
	function criarTabelasDeTreinoFirebase(firebaseData) {
		const containerElement = document.getElementById('container-da-tabela');
		// Verifica se o elemento container é válido
		if (!containerElement || !containerElement.appendChild) {
			console.error("Elemento container inválido fornecido. As tabelas não podem ser adicionadas.");
			return; // Sai da função se o container for inválido
		}
	
		// Opcional: Limpar o conteúdo atual do container antes de adicionar as novas tabelas
		containerElement.innerHTML = '';
	
		// Verifica se os dados do Firebase existem e têm a propriedade 'sequencias'
		if (!firebaseData || typeof firebaseData !== 'object' || !firebaseData.sequencias || typeof firebaseData.sequencias !== 'object') {
			console.warn("Dados de treino do Firebase inválidos ou sem sequências. Nenhuma tabela será criada.");
			return; // Sai da função se os dados não forem válidos ou sem sequências
		}
	
		// Acessa o objeto de sequências dentro dos dados do Firebase
		const sequencias = firebaseData.sequencias;
	
		// Obtém um array com as chaves (IDs únicos) das sequências
		const chavesSequencias = Object.keys(sequencias);
	
		// Verifica se há sequências para iterar
		if (chavesSequencias.length === 0) {
			console.log("Nenhuma sequência encontrada no Firebase. Nenhuma tabela será criada.");
			return;
		}
	
		console.log(`Gerando tabelas para ${chavesSequencias.length} sequências.`);
	
		// Itera sobre as chaves (IDs) de cada sequência
		chavesSequencias.forEach(chaveSequencia => {
			// Obtém o objeto da sequência usando a chave
			const sequencia = sequencias[chaveSequencia];
	
			// Verifica se o objeto da sequência é válido
			if (!sequencia || typeof sequencia !== 'object') {
				console.warn(`Dados inválidos para a sequência com chave ${chaveSequencia}. Pulando.`);
				return; // Pula para a próxima chave se os dados da sequência forem inválidos
			}
	
			// 1. Cria o elemento principal da tabela para esta sequência
			const table = document.createElement('table');
			// table.classList.add('stripes'); // Adicione esta classe se estiver usando o CSS 'stripes'
	
			// 2. Cria e adiciona o caption com o nome da sequência
			const caption = document.createElement('caption');
			// Usa o nome da sequência. Você pode formatar como "Sequência - X" se o nome for "seqX"
			caption.textContent = sequencia.nome ? `Sequência - ${sequencia.nome.replace('seq', '').trim()}` : 'Sequência Sem Nome';
			table.appendChild(caption);
	
			// 3. Cria o cabeçalho da tabela (<thead>)
			const thead = document.createElement('thead');
			const headerRow = document.createElement('tr');
	
			// Define as colunas para os detalhes dos exercícios
			const headers = ["Exercício", "Séries", "Repetições", "Carga"];
	
			// Cria as células de cabeçalho (<th>)
			headers.forEach(headerText => {
				const th = document.createElement('th');
				th.textContent = headerText;
				headerRow.appendChild(th);
			});
	
			// Adiciona a linha de cabeçalho ao thead
			thead.appendChild(headerRow);
			// Adiciona o thead à tabela atual
			table.appendChild(thead);
	
			// 4. Cria o corpo da tabela (<tbody>)
			const tbody = document.createElement('tbody');
	
			// Verifica se a sequência tem a propriedade 'exercicios' e se é um objeto
			if (sequencia.exercicios && typeof sequencia.exercicios === 'object') {
				// Obtém um array com as chaves (IDs únicos) dos exercícios desta sequência
				const chavesExercicios = Object.keys(sequencia.exercicios);
	
				 // Itera sobre as chaves (IDs) de cada exercício
				chavesExercicios.forEach(chaveExercicio => {
					 // Obtém o objeto do exercício usando a chave
					const exercicio = sequencia.exercicios[chaveExercicio];
	
					 // Verifica se o objeto do exercício é válido
					if (!exercicio || typeof exercicio !== 'object') {
						console.warn(`Dados inválidos para o exercício com chave ${chaveExercicio} na sequência ${chaveSequencia}. Pulando.`);
						return; // Pula para a próxima chave de exercício se os dados forem inválidos
					}
	
					// Cria uma linha para o exercício
					const exerciseRow = document.createElement('tr');
	
					// Cria e preenche as células para cada detalhe do exercício
					const exercicioCell = document.createElement('td');
					exercicioCell.textContent = exercicio.nome || 'Exercício Sem Nome'; // Usa nome ou um placeholder
					exerciseRow.appendChild(exercicioCell);
	
					const seriesCell = document.createElement('td');
					// Formata as séries como "Nx" se o valor existir, senão usa "0x" ou similar
					seriesCell.textContent = exercicio.series ? `${exercicio.series}x` : '0x';
					exerciseRow.appendChild(seriesCell);
	
					const repeticoesCell = document.createElement('td');
					// Usa o valor de repetições se existir, senão um placeholder
					repeticoesCell.textContent = exercicio.repeticoes || '0';
					exerciseRow.appendChild(repeticoesCell);
	
					const cargaCell = document.createElement('td');
					// Usa o valor de carga se existir e não for "0", senão usa "A definir"
					cargaCell.textContent = (exercicio.carga && exercicio.carga !== "0") ? exercicio.carga : 'A definir';
					exerciseRow.appendChild(cargaCell);
	
					// Adiciona a linha do exercício ao corpo da tabela atual
					tbody.appendChild(exerciseRow);
				});
			} else {
				 console.log(`Nenhum exercício encontrado para a sequência "${sequencia.nome}" (Chave: ${chaveSequencia}).`);
				 // Opcional: Adicionar uma linha indicando que não há exercícios
				 const noExerciseRow = document.createElement('tr');
				 const noExerciseCell = document.createElement('td');
				 noExerciseCell.textContent = 'Nenhum exercício adicionado a esta sequência.';
				 noExerciseCell.setAttribute('colspan', headers.length); // Ocupa todas as colunas
				 noExerciseCell.style.textAlign = 'center';
				 noExerciseCell.style.fontStyle = 'italic';
				 tbody.appendChild(noExerciseRow);
			}
	
			// 5. Adiciona o tbody à tabela atual
			table.appendChild(tbody);
	
			// 6. Adiciona a tabela completa desta sequência ao container no HTML
			containerElement.appendChild(table);
		});
	
		// console.log("Processamento de tabelas do Firebase concluído.");
	}

// event ao inciar a pagina
document.addEventListener("DOMContentLoaded", () => {
	// component: INICIO SEQUENCIA
	// inf: no caso aqui uso para chamar o valor do db treinamento e pecorrer os  valores
	// inf e injetar na lista dinamica
	fabVisivel()
	// esvazia a lista, o mesmo que remover os filhos elementos dentro dela
	lista.innerHTML = "";

	// chamo e o banco de dados e acesso o array sequecias
	var db = getDb("treinamento") === null ? objPadrao : getDb("treinamento");
	// console.log(" db", db);

	//card tabela dinamica

	obterDados(`/usuarios/${UID}/treinamento`).then((dados) => {
		// console.log("criarTabelasDeTreinoPorSequencia", dados);

		criarTabelasDeTreinoFirebase(dados)

		// console.log("db.sequencias", db.sequencias);


		// criarTabelasDeTreinoPorSequencia(db.sequencias);

	})


	

			obterDados(`/usuarios/${UID}/treinamento/sequencias`).then((dados) => {
				// console.log("dados do Firebase", dados);
			
					// Obtém um array com todas as chaves (IDs únicos) do objeto 'dados'
					const chavesSequencias = Object.keys(dados);
			
					// Opcional: Limpar a lista antes de renderizar (se necessário)
					const lista = document.querySelector(".lista_de_sequecias"); // Certifique-se de obter a referência
					lista.innerHTML = "";
			
					// Itera sobre o array de chaves
					chavesSequencias.forEach((chave, index) => {
						// Para cada chave, acessa o objeto de sequência correspondente no objeto 'dados'
						const itemSequencia = dados[chave];
			
						// Agora 'itemSequencia' é o objeto { "nome": "seqX", "exercicios": [...] }
						// Você pode acessar itemSequencia.nome e itemSequencia.exercicios
			
						// console.log(`Processando sequência com ID: ${chave}`);
						// console.log("Nome da sequência:", itemSequencia.nome);
						// Se a sequência tiver exercícios, você pode acessá-los assim:
					console.log("Exercícios:", itemSequencia.exercicios);

	
						// Chame sua função para gerar o card dinâmico
						// Passe o índice, o nome da sequência e a lista de exercícios (se existir)
						// Certifique-se de que cardsDinamicos_addSequencias lida com 'exercicios' sendo undefined ou um array vazio se necessário
						var cards = cardsDinamicos_addSequencias(chave, itemSequencia.nome, itemSequencia.exercicios || {}); // Use || [] para garantir que é um array
			
						// Injete o card na lista (certifique-se de que 'lista' está acessível aqui)
						const lista = document.querySelector(".lista_de_sequecias"); // Obtenha a referência aqui se não estiver no escopo
						lista.appendChild(cards);
					
					});
			
			})
			

	// acesso o array sequecias e pecorro cada item
	// db.sequencias.forEach((item, index) => {
	// 	// teste cada nome seq
	// 	// console.log(`${item.nome}`);
	// 	// console.log(index);

	// 	// gero os card dinamicos
	// 	var cards = cardsDinamicos_addSequencias(index, item.nome, []);
	// 	// injeta os card na lista
	// 	lista.appendChild(cards);
	// });

	// component:ADD TREINOS
	// func: inciar as funcoes no dom
	addTreino_MENU_exercicio();
	addTreino_REPETICOES();
	addTreino_SERIES();
	addTreino_CARGA();

	// event salvar treino

	// div da lista onde vai ser injetada dinamicamente
	// var lista_de_exercicios = document.querySelector(".lista_de_exercicios");
	// lista_de_exercicios.innerHTML = "";
	// add sequencia
	var btn_salvarTreino = document.querySelector("#btn_salvarTreino");
	// valores dos input
	var input_treinoNome = document.querySelector("#input_treinoNome");
	var inp_repeticao = document.querySelector("#inp_repeticao");
	var inp_series = document.querySelector("#inp_series");
	var inp_carga = document.querySelector("#inp_carga");
	// btn
	btn_salvarTreino.addEventListener("click", function () {




	
		
	adicionarItem(`/usuarios/${UID}/treinamento/sequencias/${INDEX_TREINO}/exercicios`, {
		nome: input_treinoNome.value,
		series: inp_series.value,
		repeticoes: inp_repeticao.value,
		carga: inp_carga.value,
	});


	
		// add novos treino no db
		// db.sequencias[INDEX_TREINO].exercicios.push({
		// 	nome: input_treinoNome.value,
		// 	series: inp_series.value,
		// 	repeticoes: inp_repeticao.value,
		// 	carga: inp_carga.value,
		// });
		// console.log(db);
		// setDb("treinamento", db);

			 input_treinoNome.value = '';
			 inp_series.value = '';
			 inp_repeticao.value = '';
			 inp_carga.value = '';
			 loadTela_addExercicio(INDEX_TREINO)
	}); //end click



	document.querySelector('.tabs.responsive a[data-ui="#tab1"]').addEventListener("click", function () {
		fabVisivel()
	}); 
	document.querySelector('.tabs.responsive a[data-ui="#tab3"]').addEventListener("click", function () {
		fabVisivel()
	}); 

	monitorarAutenticacao()

	// event load
}); //end
