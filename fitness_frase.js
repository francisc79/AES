//func FRASE DO DIA

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

let ultimoIndice = -1;

function obterFraseAleatoria() {
    let indice;
    do {
        indice = Math.floor(Math.random() * frases.length);
    } while (indice === ultimoIndice); // Evita repetição consecutiva
    ultimoIndice = indice;
    return frases[indice];
}

function exibirFraseAleatoria() {
    document.getElementById("frase").innerText = obterFraseAleatoria();
}

// Atualiza a frase a cada 24 horas (86.400.000 milissegundos)
setInterval(exibirFraseAleatoria, 15000);

//event Exibe uma frase ao carregar a página
document.addEventListener("DOMContentLoaded", exibirFraseAleatoria);


// window.onload = exibirFraseAleatoria;