function toggleMenu() {
    const menu = document.getElementById('menu');
    menu.classList.toggle('active');
}
document.addEventListener("DOMContentLoaded", () => {
    fetch("../json/posts.json")
        .then(response => response.json())
        .then(posts => {
            let container = document.getElementById("blog-container");
            container.innerHTML = "";
            
            posts.forEach(post => {
                let postHTML = `
               <article class="primary-container">
                    <div class="post">
                        <img class="responsive extra" src="${post.imagem}" alt="${post.titulo}">
                        <h2><a href="post.html?slug=${post.slug}">${post.titulo}</a></h2>
                        
                        <p>${post.resumo}</p>
                    </div>
                    </article>
                `;
                container.innerHTML += postHTML;
            });
        })
        .catch(error => console.error("Erro ao carregar os posts:", error));
});
