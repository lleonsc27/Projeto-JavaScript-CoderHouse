// const notas = []; // Array para armazenar as notas

// // Função para colocar primeira letra na string em maiúsculo
// const primeiraMaiusculo = entrada => entrada.charAt(0).toUpperCase() + entrada.substring(1).toLowerCase();

// // Função para exibir mensagem, aviso de retorno ao menu e formatação da entrada.
// const obterEntradaUsuario = mensagem => primeiraMaiusculo(prompt(`${mensagem}\n\nDigite "Menu" para voltar ao menu inicial`));

// // Função para criar tags
// const criarTags = notas => Array.from(new Set(notas.flatMap(nota => nota.tag ? [nota.tag] : [])));

// // Função para mostrar tags no console
// const mostrarTagsNoConsole = notas => console.log(`Tags disponíveis:\n\n${criarTags(notas).join("\n")}`);

// // Função para filtrar notas com base em uma propriedade
// function filtrar(entrada, propriedade) {
//     const resultadoFiltro = notas.filter((nota) => nota[propriedade].includes(primeiraMaiusculo(entrada)));
//     const titulosFiltrados = resultadoFiltro.map(nota => nota.titulo); // Array provisório para ser usado com alerts
//     return titulosFiltrados;
// }

// // Função construtora de notas
// function Nota(titulo, corpo, cor, tag, lembrete, fixar) {
//     this.titulo = titulo;
//     this.corpo = corpo;
//     this.cor = cor;
//     this.lembrete = lembrete;
//     this.tag = tag;
//     this.fixar = fixar;
// }

// // Função para mostrar as notas por título
// function mostrarNotasAlert(notas) {
//     const tituloNotas = notas.map((notas) => notas.titulo).join("\n");

//     alert(`Notas cadastradas:\n\n${tituloNotas}`);
// }

// // Função para selecionar nota
// function selecionarNota(nota) {
//     const index = notas.findIndex(n => n.titulo === nota);
//     return index !== -1 ? index : (alert("Nota não encontrada!"), -1);
// }

// function mostrarInfosDaNota(index, mensagem) {
//     if (mensagem === undefined) mensagem = "Informações da nota:";
//     alert(`${mensagem}\n\nTítulo: ${notas[index].titulo}\nCorpo: ${notas[index].corpo}\nCor: ${notas[index].cor}\nTag: ${notas[index].tag}\nLembrete: ${notas[index].lembrete}\nFixar: ${notas[index].fixar}`); 
// }

// // Função para transformar entrada em booleano
// const paraBooleano = entrada => entrada.toUpperCase() === "SIM" || entrada === "1";

// // Loop do menu
// while (true) {

//     let entrada = prompt(`Menu inicial\n\nPor favor, selecione uma das opções abaixo digitando o número correspondente:\n\n1 - Adicionar nota\n2 - Editar nota\n3 - Excluir nota\n4 - Ver nota\n5 - Filtrar por tag\n\nPara encerrar o programa, digite "Sair".`);

//     if (entrada.toUpperCase() === "SAIR") {
//         break;
//     } else if (entrada < 1 || entrada > 5 || isNaN(entrada)) {
//         alert("Entrada inválida!");
//     }

//     switch(entrada) {
//         case "1":
//             adicionarNota(notas);
//             mostrarTagsNoConsole(notas); // Mostra as tags no console após adicionar uma nota
//             console.log(criarTags(notas));
//             break;
//         case "2":
//             editarNota(notas);
//             break;
//         case "3":
//             excluirNota(notas);
//             break;
//         case "4":
//             verNota(notas);
//             break;
//         case "5":
//             filtrarTag(notas);
//             break;
//     }
// }

// // Função para adicionar notas
// function adicionarNota(notas) {
//     let entradaTitulo = obterEntradaUsuario("Escreva o título da nota:");

//     if (entradaTitulo.toUpperCase() === "MENU") return;

//     let titulo = entradaTitulo;
//     let corpo = primeiraMaiusculo(prompt("Escreva a sua nota:"));
//     let cor = primeiraMaiusculo(prompt("Escreva a cor da nota:"));
//     let tag = primeiraMaiusculo(prompt("Escreva a tag da nota:"));
//     let lembrete = primeiraMaiusculo(prompt("Adicione uma data lembrete para a nota:"));
//     let fixar = paraBooleano(prompt("Você deseja fixar a nota?\n\n1 - Sim\n2 - Não"));

//     const nota = new Nota(titulo, corpo, cor, tag, lembrete, fixar);
//     notas.push(nota);

//     mostrarNotasAlert(notas);
// }

// // Função para editar nota
// function editarNota(notas) {
//     mostrarNotasAlert(notas);

//     let notaParaEditar = obterEntradaUsuario("Qual nota você deseja alterar?");

//     if (notaParaEditar.toUpperCase() === "MENU") return;

//     let paraEditar = selecionarNota(notaParaEditar);

//     if (paraEditar === -1) return;

//     mostrarInfosDaNota(paraEditar, "Informações que podem ser alteradas:")

//     let propriedadeParaEditar = obterEntradaUsuario("Informe o numero da propriedade você deseja alterar?\n\n1 - Título\n2 - Corpo\n3 - Cor\n4 - Tag\n5 - Lembrete\n6 - Fixar");

//     if (propriedadeParaEditar.toUpperCase() === "MENU") return;

//     if (propriedadeParaEditar < 1 || propriedadeParaEditar > 6 || isNaN(propriedadeParaEditar)) {
//         alert("Entrada inválida!");
//         return;
//     }

//     switch(propriedadeParaEditar) {
//         case "1":
//             let novoTitulo = primeiraMaiusculo(prompt("Escreva o novo título:"));
//             notas[paraEditar].titulo = novoTitulo;
//             break;
//         case "2":
//             let novoCorpo = primeiraMaiusculo(prompt("Escreva a nova nota:"));
//             notas[paraEditar].corpo = novoCorpo;
//             break;
//         case "3":
//             let novaCor = primeiraMaiusculo(prompt("Escreva a nova cor:"));
//             notas[paraEditar].cor = novaCor;
//             break;
//         case "4":
//             let novaTag = primeiraMaiusculo(prompt("Escreva a nova tag:"));
//             notas[paraEditar].tag = novaTag;
//             break;
//         case "5":
//             let novoLembrete = primeiraMaiusculo(prompt("Escreva o novo lembrete:"));
//             notas[paraEditar].lembrete = novoLembrete;
//             break;
//         case "6":
//             let novoFixar = paraBooleano(prompt("Você deseja fixar a nota?\n\n1 - Sim\n2 - Não"));
//             notas[paraEditar].fixar = novoFixar;
//             break;
//     }

//     mostrarInfosDaNota(paraEditar, "Informações atualizadas da nota:");
// }

// // Função para excluir nota
// function excluirNota(notas) {
//     mostrarNotasAlert(notas);

//     let notaParaExcluir = obterEntradaUsuario("Qual nota você deseja excluir?");

//     if (notaParaExcluir.toUpperCase() === "MENU") return;

//     let paraExcluir = selecionarNota(notaParaExcluir);

//     if (paraExcluir === -1) return;
    
//     notas.splice(paraExcluir, 1);

//     alert("Nota excluída com sucesso.");

//     mostrarNotasAlert(notas);
// }

// // Função para ver nota
// function verNota(notas) {
//     mostrarNotasAlert(notas);

//     let notaParaVer = obterEntradaUsuario("Qual nota você deseja ver?");

//     if (notaParaVer.toUpperCase() === "MENU") return;

//     let paraVer = selecionarNota(notaParaVer);

//     if (paraVer === -1) return;

//     mostrarInfosDaNota(paraVer);
// }

// // Função para filtrar as notas por tags
// function filtrarTag(notas) {
//     let tags = criarTags(notas);

//     alert(`Lista de Tags:\n\n${tags.join("\n")}`);

//     let entrada = obterEntradaUsuario("Escreva a tag que você deseja filtrar:");

//     if (entrada.toUpperCase() === "MENU") return;

//     if (!tags.includes(entrada)) {
//         alert("Tag não encontrada!");
//         return;
//     }
    
//     let resultado = filtrar(entrada, "tag");

//     alert(`Notas com a tag ${primeiraMaiusculo(entrada)}:\n\n${resultado.join("\n")}`);

//     let notaParaVer = obterEntradaUsuario("Qual nota você deseja ver?");

//     if (notaParaVer.toUpperCase() === "MENU") return;

//     let paraVer = selecionarNota(notaParaVer);

//     if (paraVer === -1) return;

//     mostrarInfosDaNota(paraVer);
// }

////////// PARTE 2 //////////


////////// MEDIA QUERIES //////////

// Função que controla o menu hamburguer
function clickMenu() {
    if (menu.style.display == 'block') {
        menu.style.display = 'none'
    } else { 
        menu.style.display = 'block'
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

////////// REFATORANDO //////////

// Botão para adicionar notas
document.querySelector('.adicionar-nota').addEventListener('click', function() {
    let novaNota = document.createElement("li");
    
    // Define o conteúdo da nova nota
    novaNota.innerHTML = `
        <div class="atributos">
            <div class="arquivo"><img src="./icons/arquivo.svg" alt=""></div>
            <div class="tag"></div>
        </div>
        <h3>Nova Nota</h3>
        <p>Conteúdo da nova nota...</p>
    `;
    
    // Seleciona a lista existente
    let listaNotas = document.querySelector(".board-notas");
    
    // Adiciona a nova nota à lista existente
    listaNotas.appendChild(novaNota);

    // Ocultar box de tags se estiver vazio
    const tags = novaNota.querySelector('.tag');
    if (tags.textContent.trim() === '') {
        tags.classList.add('hidden');
    }

    // Ocultar box de arquivo se estiver vazio
    const arquivos = novaNota.querySelector('.arquivo');
    if (arquivos.textContent.trim() === '') {
        arquivos.classList.add('hidden');
    }
    
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


