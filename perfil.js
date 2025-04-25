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
} from "../../js/util/firebaseFuncoes.js";



 
var ICON_PERFIL;

function createButtonIconItem(arrayButton) {
    // Cria um contêiner para os botões; use uma tag apropriada, como <div> ou <ul>
    const container = document.createElement("div");
    arrayButton.forEach((item) => {
      // Cria o botão com as classes iniciais
      const button = document.createElement("button");
      button.classList.add("border", "square", "round", "extra");
      // Cria o elemento que exibirá o ícone ou o texto
      const icon = document.createElement("i");
      icon.textContent = item;
      button.appendChild(icon);
      // Evento de clique: remove "active" de todos e adiciona somente ao botão clicado
      button.addEventListener("click", function() {
        // Remove a classe "active" de todos os botões dentro do container
        container.querySelectorAll("button").forEach((btn) => {
          btn.classList.remove("active");
        });
        // Adiciona a classe "active" ao botão atual
        button.classList.add("active");
        // Atualiza a variável global ou executa outra ação
      
        console.log(`Item selecionado: ${item}`);
        ICON_PERFIL = item
  
  
  
      });
      // Adiciona o botão ao contêiner
      container.appendChild(button);
    });
    return container;
  }

  const ul = document.querySelector(".list_img_perfil");
  // lista de icones
  var buttonArray = ["bolt","face","sports_gymnastics","cruelty_free","girl", "man_4","boy" ,"mood", "bolt" ]
  ul.appendChild( createButtonIconItem(buttonArray));





  var input_Nome = document.querySelector("#input_Nome");
  var input_Altura = document.querySelector("#input_Altura");
  var input_Peso = document.querySelector("#input_Peso");
var btn_salvar_perfil = document.querySelector("#btn_salvar_perfil");
    // btn
    btn_salvar_perfil.addEventListener("click", function () {
       
      //tag: firebase
      //*            /usuarios/mdxeyATeC9WS9GowpoT4btKZFDK2/perfil
      // é tipo quando vai exporer C:\Program Files\AMD do mesmo jeito que accessa olocal via esse link,o mesmo é firebase, entao para salvar so fazer o mesmo
        salvarDados(`/usuarios/${UID}/perfil`, {
            nome: input_Nome.value ,
            altura: input_Altura.value,
            peso:input_Peso.value,
            icon: ICON_PERFIL
        });
         window.location.href = "perfil.html"
       
        input_Nome.value = '';
        input_Altura.value = '';
        input_Peso.value = ''; 
            
    }); //end click
  
    console.log("UID",  UID)


//event quando inciar a paginas ja chama os valores guaradados e injeta na pagina
 //tag: firebase
    obterDados(`/usuarios/${UID}/perfil`).then((dados) => {
			console.log("dados", dados);
            
			// os input do perfil editar
			input_Nome.value = dados.nome;
			input_Altura.value = dados.altura;
			input_Peso.value = dados.peso;

			// html dinamicos
			var set_icon = document.querySelector("#set_icon");
			var set_nome = document.querySelector("#set_nome");
			var set_altura = document.querySelector("#set_altura");
			var set_peso = document.querySelector("#set_peso");
			set_icon.innerHTML = dados.icon;
			set_nome.innerHTML = dados.nome;
			set_altura.innerHTML = dados.altura+" cm";// desse jeito uma vai da erro caso presise de muito texto
      // ou posso usar `` com ${} que é melhor, desse a logo praso é melhor e mais facil editar
			set_peso.innerHTML = `${dados.peso} Kg`;
		});

           // aqui depois
           var set_sequencia  = document.querySelector("#set_sequencia")
           var set_treino  = document.querySelector("#set_treino")
          


       