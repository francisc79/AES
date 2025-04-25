function toggleMenu() {
    const menu = document.getElementById('menu');
    menu.classList.toggle('active');
}
document.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(window.location.search);
    const slug = params.get("slug");

    fetch("../json/posts.json")
        .then(response => response.json())
        .then(posts => {
            let post = posts.find(p => p.slug === slug);
            if (post) {
                document.getElementById("post-container").innerHTML = `
                    <h1>${post.titulo}</h1>
                    <p class="post-date">${post.data}</p> <!-- Adicionada a classe post-date -->
                    <img class="responsive extra" src="${post.imagem}" alt="${post.titulo}">
                    <p>${post.conteudo}</p>
                `;
            } else {
                document.getElementById("post-container").innerHTML = "<p>Post não encontrado.</p>";
            }
        })
        .catch(error => console.error("Erro ao carregar o post:", error));
}); 