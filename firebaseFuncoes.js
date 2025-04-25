//config: Importação das funções do Firebase já configuradas no arquivo firebaseConfig.js
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
  } from './firebaseConfig.js';
    

//import: importar salvar e retornar localStorage no chrome
import { setDb, getDb } from "../util/salvamentoLocal.js";

//function: Verifica se o usuário já está autenticado
//class: Como usar: Chame esta função ao iniciar o app para verificar se o usuário está autenticado: monitorarAutenticacao();
  export function monitorarAutenticacao() {
    onAuthStateChanged(auth, (usuario) => {
      if (usuario) {
        // console.log("Usuário está logado:", usuario);
        console.log("Usuário está logado:", usuario.email);
        console.log("Usuário está logado uid:", usuario.uid);
        setDb("UID",usuario.uid)
      } else {
        console.log("Nenhum usuário logado.");
        //nota :caso nõa seja logado vai sempre voltar para login, desde que use esse funcao em todas as paginas monitorarAutenticacao()
         window.location.href = "login.html"
      }
    });
  }
 
  //class: Como usar: retornar uid
  export  const UID = getDb("UID") === null ? null  : getDb("UID")  ;
  
//function: Faz logout do usuário 
 export async function fazerLogout() {
   try {
     await signOut(auth);
     console.log("Usuário deslogado.");
   } catch (erro) {
     console.error("Erro ao sair:", erro.message);
   }
 }

//function:  Criar ou atualizar dados no Firebase Realtime Database
//class:  Como usar: salvarDados('usuarios/user1', { nome: "João", idade: 25 });
  export function salvarDados(caminho, dados) {
    return set(ref(database, caminho), dados)
      .then(() => {
        console.log("Dados salvos com sucesso!");
      })
      .catch((erro) => {
        console.error("Erro ao salvar dados:", erro);
      });
  }
  
//function:  Obter dados do Firebase Realtime Database
//class: Como usar: obterDados('usuarios/user1').then((dados) => { console.log("dados",dados)   });
  export async function obterDados(caminho) {
    try {
      const snapshot = await get(ref(database, caminho));
      if (snapshot.exists()) {
        return snapshot.val();
      } else {
        console.log("Nenhum dado encontrado.");
        return null;
      }
    } catch (erro) {
      console.error("Erro ao obter dados:", erro);
      return null;
    }
  }
  
//function: Remover dados do Firebase Realtime Database
//class: Como usar: removerDados('usuarios/user1');
  export function removerDados(caminho) {
    return remove(ref(database, caminho))
      .then(() => {
        console.log("Dados removidos com sucesso!");
      })
      .catch((erro) => {
        console.error("Erro ao remover dados:", erro);
      });
  }
  
//function: Autenticar usuário com e-mail e senha
//class: Como usar: loginComEmail("email@example.com", "senha123");
  export async function loginComEmail(email, senha) {
    try {
      const usuario = await signInWithEmailAndPassword(auth, email, senha);

     //script: Define a persistência para manter login mesmo após fechar o navegador
      await setPersistence(auth, browserLocalPersistence);
      console.log("Usuário autenticado:", usuario.user);
      return usuario.user;
    } catch (erro) {
      console.error("Erro ao autenticar:", erro);
      return null;
    }
  }  

 //function: Criar um novo usuário com e-mail e senha
 //class: Como usar: criarConta("email@example.com", "senha123");
  export async function criarConta(email, senha) {
    try {
      const novoUsuario = await createUserWithEmailAndPassword(auth, email, senha);
      //script: Define a persistência para manter login mesmo após fechar o navegador
      await setPersistence(auth, browserLocalPersistence);
      console.log("Usuário criado com sucesso:", novoUsuario.user);
      return novoUsuario.user;
    } catch (erro) {
      console.error("Erro ao criar conta:", erro);
      return null;
    }
  }
  
 //function: Enviar e-mail para redefinição de senha
 //class: Como usar: redefinirSenha("email@example.com");
  export function redefinirSenha(email) {
    return sendPasswordResetEmail(auth, email)
      .then(() => {
        console.log("E-mail de redefinição enviado!");
      })
      .catch((erro) => {
        console.error("Erro ao enviar e-mail de redefinição:", erro);
      });
  }


 //function: Adicionar um novo item à lista no Firebase Realtime Database com chave única (push)
 //class: Como usar: adicionarItem('tarefas', { descricao: "Nova tarefa", status: "pendente" });
export async function adicionarItem(caminho, dados) {
    try {
      const novoItemRef = push(ref(database, caminho)); // Gera uma chave única
      await set(novoItemRef, dados); // Salva os dados no caminho gerado
      console.log("Item adicionado com sucesso!", novoItemRef.key);
      return novoItemRef.key; // Retorna a chave gerada
    } catch (erro) {
      console.error("Erro ao adicionar item:", erro);
      return null;
    }
  }

  

 //function: Ler os dados uma única vez do Firebase Realtime Database
 //class: Como usar: lerDadosUmaVez('usuarios/user1').then(dados => console.log(dados)); 
  export async function lerDadosUmaVez(caminho) {
    try {
      const snapshot = await get(ref(database, caminho)); // Obtém os dados uma única vez
      if (snapshot.exists()) {
        console.log("Dados obtidos:", snapshot.val());
        return snapshot.val();
      } else {
        console.log("Nenhum dado encontrado.");
        return null;
      }
    } catch (erro) {
      console.error("Erro ao obter dados:", erro);
      return null;
    }
  }

 //function: Ler uma lista de itens do Firebase Realtime Database (salvos via `push`)
 //class: Como usar: lerLista('fichas').then(lista => console.log(lista)); 
    // Se quiser processar cada item da lista, use forEach:
        // lerLista('fichas').then(lista => {
        // lista.forEach(ficha => {
        //     console.log(`Ficha ID: ${ficha.id}, Nome: ${ficha.nome}, Pontos: ${ficha.pontos}`);
        // });
        // });
export async function lerLista(caminho) {
    try {
      const snapshot = await get(ref(database, caminho)); // Lê os dados uma única vez
      if (snapshot.exists()) {
        const dados = snapshot.val(); // Obtém os dados como objeto
        
        // Converte o objeto em um array, incluindo a chave única de cada item
        const lista = Object.keys(dados).map((chave) => ({
          id: chave, // Adiciona a chave do item
          ...dados[chave] // Mantém os dados do item
        }));
  
        console.log("Lista carregada:", lista);
        return lista;
      } else {
        console.log("Nenhum item encontrado na lista.");
        return [];
      }
    } catch (erro) {
      console.error("Erro ao obter lista:", erro);
      return [];
    }
  }
  

  