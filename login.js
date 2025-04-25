//import: importar os dados do firebaseConfig 
import {
	app,
	database,
	auth,
	onAuthStateChanged,
	signOut,
	setPersistence,
	browserLocalPersistence,
	ref,
	set,
	get,
	push,
	remove,
	signInWithEmailAndPassword,
	createUserWithEmailAndPassword,
	sendPasswordResetEmail,
  getUID,
  getCurrentUser
} from "../util/firebaseConfig.js";

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
} from "../util/firebaseFuncoes.js";

//import: importar salvar e retornar localStorage no chrome
import {setDb,getDb} from "../util/salvamentoLocal.js"

//import: logs
import {log} from "../util/essencial.js"

log.script("login modulos carregados")


//function: Login
const Login = document.querySelector("#btn-login")
Login.addEventListener('click', function () {

  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;

  //firebase: login firebase email
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      console.log(`userCredential:`, userCredential)
      setDb("email", email) //!salvar no local
      setDb("senha", password) //!salvar no local
      setDb("user", userCredential.user.uid) //*salvar o uid

      //script:abrir outra pagina
      window.location.href = "fitness.html"
      //script:dentro dessa funcction usar para ler os dados ou mudar de tela pos login
      
    })
    .catch((error) => {
      console.error("Erro no login:", error);
      alert("Erro no login: " + error.message);
    });
});


//function: cadastrar
const Cadastrar = document.querySelector("#btn-cadastrar")
Cadastrar.addEventListener('click', function () {

  const email = document.getElementById("signup-email").value;
  const password = document.getElementById("signup-password").value;

  //firebase: 
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Usuário cadastrado com sucesso
      console.log(`userCredential: ${userCredential}`)
      setDb("email", email) //!salvar no local
      setDb("senha", password) //!salvar no local
      setDb("user", userCredential.user.uid) //*salvar o uid      

      alert("Cadastro realizado com sucesso!");
      //script:quando cadastrar a 1ºvez ela ja faz o login retornar os dados ,mas pode chamar a tela do login
       //script:abrir outra pagina, no caso quando se cadastra ja ta logado
      window.location.href = "fitness.html"
     
    })
    .catch((error) => {
      console.error("Erro no cadastro:", error);
      alert("Erro no cadastro: " + error.message);
    });
});

//function: recuperar a senha
const recuperarSenha =  document.querySelector("#recuperarSenha")
recuperarSenha.addEventListener('click', function () {

    const email = document.getElementById("login-email").value;
    if (!email) {
      alert("Digite seu email para recuperação de senha.");
      return;
    }
     //firebase: aqui se for email valido cai na caixa do gmail informando como recuperar a senha
    sendPasswordResetEmail(auth, email)
      .then(() => {
        alert("Email de recuperação enviado!");
      })
      .catch((error) => {
        console.error("Erro na recuperação de senha:", error);
        alert("Erro: " + error.message);
      });
  });

// btn login e cadastro card
const loginCard =  document.querySelector(".login-card")
const cadastroCard =  document.querySelector(".cadastro-card")

//function: mostrarLogin
const mostrarLogin = document.querySelector("#mostrarLogin");
mostrarLogin.addEventListener("click", function () {
	cadastroCard.style.display = "none";
  loginCard.style.display = "block";
});

//function: mostrarCadastro
const mostrarCadastro = document.querySelector("#mostrarCadastro");
mostrarCadastro.addEventListener("click", function () {
	cadastroCard.style.display = "block";
  loginCard.style.display = "none";
}); 
  
//event: carregar o dom,quando o navegador ao exibir o app
document.addEventListener("DOMContentLoaded", () => {
  //btn ocultar cadastro
  cadastroCard.style.display = "none";

  //func salvar e recuperar dados locais
  document.getElementById("login-email").value = getDb("email")
  document.getElementById("login-password").value = getDb("senha")

});


///function: compartilhar
// Seu código JavaScript com as funções shareWhatsApp, shareFacebook, etc.
function shareWhatsApp() {
  const url = encodeURIComponent(window.location.href);
  const text = encodeURIComponent("Confira este site incrível!");
  window.open(`https://api.whatsapp.com/send?text=${text} ${url}`, "_blank");
}

function shareFacebook() {
  alert('Botão clicado!'); // Mantenha isso para testar!
  const url = encodeURIComponent(window.location.href);
  window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, "_blank");
}

function shareEmail() {
  const subject = encodeURIComponent("Confira este site incrível!");
  const body = encodeURIComponent(
      `Dê uma olhada neste site: ${window.location.href}`
  );
  window.open(`mailto:?subject=${subject}&body=${body}`, "_blank");
}

function shareTwitter() {
  const url = encodeURIComponent(window.location.href);
  const text = encodeURIComponent("Confira este site incrível!");
  window.open(
      `https://twitter.com/intent/tweet?text=${text}&url=${url}`,
      "_blank"
  );
}