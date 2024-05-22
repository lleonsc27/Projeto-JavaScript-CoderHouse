// Função que controla o menu hamburguer
function clickMenu() {
    if (menu.style.display == 'block') {
        menu.style.display = 'none';
    } else { 
        menu.style.display = 'block';
    }
}

// Adiciona um event listener ao evento de redimensionamento da janela para verificar o tamanho da janela e ocultar o menu se a largura da janela for maior que 768px
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        menu.style.display = 'block';
    } else {
        menu.style.display = 'none';
    }
});

// Função para gerar IDs únicos
function generateUniqueId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

// Função para carregar e renderizar as notas do localStorage
function loadNotes() {
    let listaNotas = document.querySelector(".board-notas");
    listaNotas.innerHTML = ''; // Limpa a lista de notas existente

    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key.startsWith('note-') && key.endsWith('-title')) {
            const noteId = key.split('-')[1];
            const noteTitle = localStorage.getItem(`note-${noteId}-title`);
            const noteContent = localStorage.getItem(`note-${noteId}-content`);
            const isArchived = localStorage.getItem(`note-${noteId}-archived`) === "true";
            const isTrashed = localStorage.getItem(`note-${noteId}-trashed`) === "true";

            if (!isArchived && !isTrashed) {
                let novaNota = document.createElement("li");

                novaNota.innerHTML = `
                    <div class="atributos">
                        <div class="arquivo hidden"><img src="./icons/arquivo.svg" alt=""></div>
                        <div class="tag hidden"></div>
                    </div>
                    <h3>${noteTitle}</h3>
                    <p>${noteContent}</p>
                `;

                // Adiciona evento para abrir a nota ao clicar
                novaNota.addEventListener('click', function() {
                    window.location.href = `note.html?id=${noteId}`;
                });

                listaNotas.appendChild(novaNota);
            }
        }
    }

    // Esconde as boxes de tags e arquivos se estiverem vazias
    const tags = document.querySelectorAll('.tag');
    tags.forEach(tag => {
        if (tag.textContent.trim() === '') {
            tag.classList.add('hidden');
        }
    });

    const arquivos = document.querySelectorAll('.arquivo');
    arquivos.forEach(tag => {
        if (tag.textContent.trim() === '') {
            tag.classList.add('hidden');
        }
    });
}

// Botão para adicionar notas
document.querySelector('.adicionar-nota').addEventListener('click', function() {
    let novaNota = document.createElement("li");
    
    // Gera um ID único para a nova nota
    const noteId = generateUniqueId();
    
    // Define o conteúdo da nova nota
    novaNota.innerHTML = `
        <div class="atributos">
            <div class="arquivo hidden"><img src="./icons/arquivo.svg" alt=""></div>
            <div class="tag hidden"></div>
        </div>
        <h3>Nova Nota</h3>
        <p>Conteúdo da nova nota...</p>
    `;
    
    // Seleciona a lista existente
    let listaNotas = document.querySelector(".board-notas");
    
    // Adiciona a nova nota à lista existente
    listaNotas.appendChild(novaNota);
    
    // Salva a nova nota no localStorage
    localStorage.setItem(`note-${noteId}-title`, "");
    localStorage.setItem(`note-${noteId}-content`, "");
    localStorage.setItem(`note-${noteId}-archived`, "false");
    localStorage.setItem(`note-${noteId}-trashed`, "false");
    
    // Redireciona para a página da nova nota
    window.location.href = `note.html?id=${noteId}`;
});

// Escondendo box de tags se estiver vazio (talvez seja preciso somente enquanto tiver as notas de exemplo)
document.addEventListener("DOMContentLoaded", function() {
    const tags = document.querySelectorAll('.tag');
    tags.forEach(tag => {
        if (tag.textContent.trim() === '') {
            tag.classList.add('hidden');
        }
    });
});

// Escondendo box de arquivos se estiver vazio
document.addEventListener("DOMContentLoaded", function() {
    const arquivos = document.querySelectorAll('.arquivo');
    arquivos.forEach(tag => {
        if (tag.textContent.trim() === '') {
            tag.classList.add('hidden');
        }
    });
});

// Botão para adicionar tags
document.querySelector('#tag-criar').addEventListener('click', function() {
    let novaTag = document.createElement("div");

    let nomeNovaTag = prompt("Digite o nome da nova Tag:"); // pensar em outra forma que não use prompt
    
    // Define as propriedades da nova tag
    novaTag.setAttribute('role', 'button');
    novaTag.classList.add('menu-item');

    // Define o conteúdo da nova tag
    novaTag.innerHTML = `
    <img class="icon" src="./icons/tag.svg" alt="">
    <p>${nomeNovaTag}</p>
    `;
    
    // Seleciona a lista existente
    let listaTags = document.querySelector("#actions-tags");
    
    // Adiciona a nova tag à lista existente
    listaTags.appendChild(novaTag);
});

// Carregar notas quando o documento estiver pronto
document.addEventListener("DOMContentLoaded", function() {
    loadNotes();
});
