document.addEventListener("DOMContentLoaded", function() {
    // Função para gerar IDs únicos
    function generateUniqueId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }

    const urlParams = new URLSearchParams(window.location.search);
    let noteId = urlParams.get('id');

    // Se não houver ID na URL, gera um novo ID
    if (!noteId) {
        noteId = generateUniqueId();
        const newUrl = window.location.href.split('?')[0] + `?id=${noteId}`;
        history.replaceState({}, document.title, newUrl);
    }

    // Recupera os valores do localStorage, se existirem
    const storedTitle = localStorage.getItem(`note-${noteId}-title`);
    const storedContent = localStorage.getItem(`note-${noteId}-content`);
    const isArchived = localStorage.getItem(`note-${noteId}-archived`) === "true";
    const isTrashed = localStorage.getItem(`note-${noteId}-trashed`) === "true";

    // Define os valores nos campos de título e conteúdo
    document.getElementById('note-title').value = storedTitle ? storedTitle : "";
    document.getElementById('note-content').value = storedContent ? storedContent : "";

    // Verifica se a nota está salva e sem alterações
    const isNoteSaved = storedTitle === document.getElementById('note-title').value && 
                        storedContent === document.getElementById('note-content').value;

    // Define o texto do botão com base na condição acima
    const saveButtonText = isNoteSaved ? "Nota salva" : "Salvar";
    document.getElementById('save-note').innerText = saveButtonText;

    // Define o estado dos elementos archive e trash
    const archiveButton = document.querySelector('.archive');
    const trashButton = document.querySelector('.trash');
    archiveButton.classList.toggle('active', isArchived);
    trashButton.classList.toggle('active', isTrashed);

    // Função para atualizar a visibilidade dos divs based on localStorage values
    function updateVisibility() {
        const isArchived = localStorage.getItem(`note-${noteId}-archived`) === "true";
        const isTrashed = localStorage.getItem(`note-${noteId}-trashed`) === "true";

        const archiveDiv = document.getElementById('archive-property-view');
        const trashDiv = document.getElementById('trash-property-view');

        archiveDiv.style.display = isArchived ? 'block' : 'none';
        trashDiv.style.display = isTrashed ? 'block' : 'none';
    }

    // Inicializa a visibilidade dos divs
    updateVisibility();

    // Adiciona ouvintes de eventos aos botões archive e trash
    archiveButton.addEventListener('click', function() {
        const newValue = localStorage.getItem(`note-${noteId}-archived`) !== "true";
        localStorage.setItem(`note-${noteId}-archived`, newValue);
        archiveButton.classList.toggle('active', newValue);
        updateVisibility();
    });

    trashButton.addEventListener('click', function() {
        const newValue = localStorage.getItem(`note-${noteId}-trashed`) !== "true";
        localStorage.setItem(`note-${noteId}-trashed`, newValue);
        trashButton.classList.toggle('active', newValue);
        updateVisibility();
    });

    // Adiciona ouvintes de eventos aos campos de entrada para detectar mudanças
    document.getElementById('note-title').addEventListener('input', handleInputChange);
    document.getElementById('note-content').addEventListener('input', handleInputChange);

    function handleInputChange() {
        // Atualiza o texto do botão para "Salvar" quando ocorrer uma modificação
        document.getElementById('save-note').innerText = "Salvar";
    }

    document.getElementById('save-note').addEventListener('click', function() {
        const updatedTitle = document.getElementById('note-title').value;
        const updatedContent = document.getElementById('note-content').value;

        // Salva os valores atualizados no localStorage
        localStorage.setItem(`note-${noteId}-title`, updatedTitle);
        localStorage.setItem(`note-${noteId}-content`, updatedContent);

        // Atualiza o texto do botão após salvar a nota
        document.getElementById('save-note').innerText = "Nota salva";
    });

    // Event listener for storage changes
    window.addEventListener('storage', function(event) {
        if (event.key === `note-${noteId}-archived` || event.key === `note-${noteId}-trashed`) {
            updateVisibility();
        }
    });
});
