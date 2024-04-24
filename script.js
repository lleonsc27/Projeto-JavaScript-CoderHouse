const notas = []; // Array para armazenar as notas

// Função para criar tags
function criarTags(notas) {
    const tags = new Set();

    notas.forEach(nota => {
        if (nota.tag) {
            tags.add(nota.tag);
        }
    });

    return Array.from(tags);
}

// Função para mostrar tags no console
function mostrarTagsNoConsole(notas) {
    const tags = criarTags(notas);
    
    console.log("Tags disponíveis:");
    tags.forEach((tag, index) => {
        console.log(`${index + 1}. ${tag}`);
    });
}

// Função para colocar primeira letra na string em maiúsculo
function primeiraMaiusculo(entrada) {
    return entrada.charAt(0).toUpperCase() + entrada.substring(1).toLowerCase();
}

// Função construtora de notas
function Nota(titulo, corpo, cor, tag, lembrete, fixar) {
    this.titulo = titulo;
    this.corpo = corpo;
    this.cor = cor;
    this.lembrete = lembrete;
    this.tag = tag;
    this.fixar = fixar;
}

// Função para mostrar as notas por título
function mostrarNotasAlert(notas) {
    var tituloNotas = "Notas cadastradas:\n\n";
    notas.forEach((nota) => {
        tituloNotas += nota.titulo + "\n";
    });
    alert(tituloNotas);
}

// Função para selecionar nota
function selecionarNota(nota) {
    for (let i = 0; i < notas.length; i++) {
        if (notas[i].titulo === nota) {
            return i;
        }
    }
    alert("Nota não encontrada!");
    return -1;
}

// Função para transformar entrada em booleano
function paraBoleano(entrada) {
    return entrada.toUpperCase() === "SIM" || entrada === "1";
}

// Loop do menu
while (true) {

    let entrada = prompt(`Menu inicial\n\nPor favor, selecione uma das opções abaixo digitando o número correspondente:\n\n1 - Adicionar nota\n2 - Editar nota\n3 - Excluir nota\n4 - Ver nota\n\nPara encerrar o programa, digite "Sair".`);

    if (entrada.toUpperCase() === "SAIR") {
        break;
    } else if (entrada < 1 || entrada > 4 || isNaN(entrada)) {
        alert("Entrada inválida!");
    }

    switch(entrada) {
        case "1":
            adicionarNota(notas);
            mostrarTagsNoConsole(notas); // Mostra as tags no console após adicionar uma nota
            break;
        case "2":
            editarNota(notas);
            break;
        case "3":
            excluirNota(notas);
            break;
        case "4":
            verNota(notas);
            break;
    }
}

// Função para adicionar notas
function adicionarNota(notas) {
    let entradaTitulo = primeiraMaiusculo(prompt("Escreva o título da nota:\n\nDigite \"Menu\" para voltar ao menu inicial"));

    if (entradaTitulo.toUpperCase() === "MENU") {
        return;
    } 

    let titulo = entradaTitulo;
    let corpo = primeiraMaiusculo(prompt("Escreva a sua nota:"));
    let cor = primeiraMaiusculo(prompt("Escreva a cor da nota:"));
    let tag = primeiraMaiusculo(prompt("Escreva a tag da nota:"));
    let lembrete = primeiraMaiusculo(prompt("Adicione uma data lembrete para a nota:"));
    let fixar = paraBoleano(prompt("Você deseja fixar a nota?\n\n1 - Sim\n2 - Não"));

    const nota = new Nota(titulo, corpo, cor, tag, lembrete, fixar);
    notas.push(nota);

    mostrarNotasAlert(notas);
}

// Função para editar nota
function editarNota(notas) {
    mostrarNotasAlert(notas);

    let notaParaEditar = primeiraMaiusculo(prompt("Qual nota você deseja alterar?\n\nDigite \"Menu\" para voltar ao menu inicial"));

    if (notaParaEditar.toUpperCase() === "MENU") {
        return;
    } 

    let paraEditar = selecionarNota(notaParaEditar);

    if (paraEditar === -1) {
        return;
    }

    alert(`Informações que podem ser alteradas:\n\nTítulo: ${notas[paraEditar].titulo}\nCorpo: ${notas[paraEditar].corpo}\nCor: ${notas[paraEditar].cor}\nTag: ${notas[paraEditar].tag}\nLembrete: ${notas[paraEditar].lembrete}\nFixar: ${notas[paraEditar].fixar}`);

    let propriedadeParaEditar = prompt("Informe o numero da propriedade você deseja alterar?\n\n1 - Título\n2 - Corpo\n3 - Cor\n4 - Tag\n5 - Lembrete\n6 - Fixar\n\nDigite \"Menu\" para voltar ao menu inicial");

    if (propriedadeParaEditar.toUpperCase() === "MENU") {
        return;
    } else if (propriedadeParaEditar <1 || propriedadeParaEditar >6 || isNaN(propriedadeParaEditar)){
        alert("Entrada inválida!");
        return;
    }

    switch(propriedadeParaEditar) {
        case "1":
            let novoTitulo = primeiraMaiusculo(prompt("Escreva o novo título:"));
            notas[paraEditar].titulo = novoTitulo;
            break;
        case "2":
            let novoCorpo = primeiraMaiusculo(prompt("Escreva a nova nota:"));
            notas[paraEditar].corpo = novoCorpo;
            break;
        case "3":
            let novaCor = primeiraMaiusculo(prompt("Escreva a nova cor:"));
            notas[paraEditar].cor = novaCor;
            break;
        case "4":
            let novaTag = primeiraMaiusculo(prompt("Escreva a nova tag:"));
            notas[paraEditar].tag = novaTag;
            break;
        case "5":
            let novoLembrete = primeiraMaiusculo(prompt("Escreva o novo lembrete:"));
            notas[paraEditar].lembrete = novoLembrete;
            break;
        case "6":
            let novoFixar = paraBoleano(prompt("Você deseja fixar a nota?\n\n1 - Sim\n2 - Não"));
            notas[paraEditar].fixar = novoFixar;
            break;
    }

    alert(`Informações atualizadas da nota:\n\nTítulo: ${notas[paraEditar].titulo}\nCorpo: ${notas[paraEditar].corpo}\nCor: ${notas[paraEditar].cor}\nTag: ${notas[paraEditar].tag}\nLembrete: ${notas[paraEditar].lembrete}\nFixar: ${notas[paraEditar].fixar}`);
}

// Função para excluir nota
function excluirNota(notas) {
    mostrarNotasAlert(notas);

    let notaParaExcluir = primeiraMaiusculo(prompt("Qual nota você deseja excluir?\n\nDigite \"Menu\" para voltar ao menu inicial"));

    if (notaParaExcluir.toUpperCase() === "MENU") {
        return;
    } 

    let paraExcluir = selecionarNota(notaParaExcluir);

    if (paraExcluir === -1) {
        return;
    }
    
    notas.splice(paraExcluir, 1);

    alert("Nota excluída com sucesso.");

    mostrarNotasAlert(notas);
}

// Função para ver nota
function verNota(notas) {
    mostrarNotasAlert(notas);

    let notaParaVer = primeiraMaiusculo(prompt("Qual nota você deseja ver?\n\nDigite \"Menu\" para voltar ao menu inicial"));

    if (notaParaVer.toUpperCase() === "MENU") {
        return;
    } 

    let paraVer = selecionarNota(notaParaVer);

    if (paraVer === -1) {
        return;
    }

    alert(`Informações da nota:\n\nTítulo: ${notas[paraVer].titulo}\nCorpo: ${notas[paraVer].corpo}\nCor: ${notas[paraVer].cor}\nTag: ${notas[paraVer].tag}\nLembrete: ${notas[paraVer].lembrete}\nFixar: ${notas[paraVer].fixar}`);
}
