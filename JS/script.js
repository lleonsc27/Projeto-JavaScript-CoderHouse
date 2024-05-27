// Função que controla o menu hambúrguer
function clickMenu() {
    const menu = document.getElementById('menu');
    if (menu.style.display === 'block') {
        menu.style.display = 'none';
    } else {
        menu.style.display = 'block';
    }
}

// Adiciona um event listener ao evento de redimensionamento da janela para verificar o tamanho da janela e ocultar o menu se a largura da janela for maior que 768px
window.addEventListener('resize', () => {
    const menu = document.getElementById('menu');
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
function loadNotes(filter = 'all') {
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

            // Filtro de notas
            if ((filter === 'archive' && !isArchived) || (filter === 'trash' && !isTrashed) || 
                (filter === 'all' && (isArchived || isTrashed)) || 
                (filter === 'archive' && isTrashed) || 
                (filter === 'trash' && !isTrashed)) {
                continue;
            }

            let novaNota = document.createElement("li");
            novaNota.setAttribute('data-id', noteId);

            novaNota.innerHTML = `
                <div class="atributos">
                    <div class="lixeira ${isTrashed ? '' : 'hidden'}"><img src="./icons/trash.svg" alt=""></div>
                    <div class="arquivo ${isArchived ? '' : 'hidden'}"><img src="./icons/archive.svg" alt=""></div>
                    <div class="tag hidden"></div>
                </div>
                <h3>${noteTitle}</h3>
                <pre>${noteContent}</pre>
            `;

            // Adiciona evento para abrir a nota ao clicar
            novaNota.addEventListener('click', function() {
                window.location.href = `note.html?id=${noteId}`;
            });

            listaNotas.appendChild(novaNota);
        }
    }
}

// Botão para adicionar notas
document.querySelector('.adicionar-nota').addEventListener('click', function() {
    // Gera um ID único para a nova nota
    const noteId = generateUniqueId();
    
    // Define o conteúdo da nova nota
    let novaNota = document.createElement("li");
    novaNota.setAttribute('data-id', noteId);
    novaNota.innerHTML = `
        <div class="atributos">
            <div class="lixeira hidden"><img src="./icons/trash.svg" alt=""></div>
            <div class="arquivo hidden"><img src="./icons/archive.svg" alt=""></div>
            <div class="tag hidden"></div>
        </div>
        <h3>Nova Nota</h3>
        <pre>Conteúdo da nova nota...</pre>
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

// Botão para adicionar tags
document.querySelector('#tag-criar').addEventListener('click', function() {
    let nomeNovaTag = prompt("Digite o nome da nova Tag:"); // Pensar em outra forma que não use prompt
    
    if (nomeNovaTag) {
        let novaTag = document.createElement("div");
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
    }
});

// Função para definir a classe ativa ao item do menu
function setActiveMenuItem(activeItem) {
    const menuItems = document.querySelectorAll('.menu-item');
    menuItems.forEach(item => {
        item.classList.remove('active');
    });
    activeItem.classList.add('active');
}

// Função para filtrar notas e definir o item ativo do menu
function filterNotes(filter) {
    loadNotes(filter);
    const menuItem = document.querySelector(`.menu-item[data-filter="${filter}"]`);
    setActiveMenuItem(menuItem);
}

// Inicialização
document.addEventListener("DOMContentLoaded", function() {
    loadNotes();

    // Adiciona eventos aos itens do menu
    const menuItems = document.querySelectorAll('.menu-item');
    menuItems.forEach(item => {
        const filter = item.getAttribute('data-filter');
        item.addEventListener('click', function() {
            filterNotes(filter);
            setActiveMenuItem(item);
        });
    });
});
