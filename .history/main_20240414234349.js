let dataCartas;

// Função para carregar o JSON via Fetch
async function carregarCartas() {
    try {
        const response = await fetch('./data/cartas.json');
        if (!response.ok) {
            throw new Error('Erro ao carregar o arquivo JSON');
        }
        const data = await response.json();
        dataCartas = data.cartas;
        manipularCartas(data.cartas);
    } catch (error) {
        console.error('Ocorreu um erro:', error);
    }
}

// Função para embaralhar a ordem das afirmações
function embaralharAfirmações(afirmações) {
    return afirmações.slice().sort(() => Math.random() - 0.5);
}

// Função para manipular as cartas
function manipularCartas(cartas) {
    cartas.forEach(carta => {
        const afirmaçõesEmbaralhadas = embaralharAfirmações(carta.afirmações);
        console.log('Categoria:', carta.categoria);
        console.log('Resposta:', carta.resposta);
        console.log('Dificuldade:', carta.dificuldade);
        console.log('Afirmações:');
        afirmaçõesEmbaralhadas.forEach(afirmação => {
            console.log('-', afirmação);
        });
        console.log('------------------');
    });
}

// Chamando a função para carregar as cartas quando a página é carregada

carregarCartas();


// função para escolher os times
let totalJogadores
let dadosTimes = [
    { nome: '', avatar: '', timeLabel: 'Time A' },
    { nome: '', avatar: '', timeLabel: 'Time B' },
    { nome: '', avatar: '', timeLabel: 'Time C' }
];
let dadosTimeAtual = 0; // Índice do time atual sendo editado

function selectTime(quantJogadores) {
    totalJogadores = quantJogadores
    document.querySelector("section.home").style.display = "none"
    document.querySelector("section.info-times").style.display = "flex"
}

let avatarsSelection = document.querySelectorAll(".options-avatar div.image")

avatarsSelection.forEach(avatar => {
    avatar.addEventListener("click", e => {
        avatarsSelection.forEach(e => e.classList.remove("select"));
        avatar.classList.add("select");
    })
})

function cadastroTime() {
    console.log("dadosTimeAtual :" + dadosTimeAtual)
    if ((dadosTimeAtual +1) <= totalJogadores) {
        let teamNameElement = document.getElementById('name_time');
        let teamName = teamNameElement && teamNameElement.value.trim() !== '' ? teamNameElement.value : 'Time A';
        let selectedAvatar = document.querySelector('.options-avatar .image.select');
        let selectedAvatarId = selectedAvatar ? selectedAvatar.id : 'Avatar não selecionado';
        let avatarImageUrl = selectedAvatar ? selectedAvatar.querySelector('img').src : 'Imagem não encontrada';

        dadosTimes[dadosTimeAtual].nome = teamName;
        dadosTimes[dadosTimeAtual].avatar = avatarImageUrl;

        console.log('Informações do Time', dadosTimeAtual + 1);
        console.log('Nome do Time:', teamName);
        console.log('ID do Avatar Selecionado:', selectedAvatarId);
        console.log('URL da Imagem do Avatar:', avatarImageUrl);

        dadosTimeAtual++;
        resetDadosTime();
    } else {
        alert("Você já inseriu todos os times permitidos.");
    }
}

function resetDadosTime() {

    // caso já tenha cadastrado todos os times
    if (dadosTimeAtual >= totalJogadores) {
        document.querySelector("section.info-times").style.display = "none"
        document.querySelector("section.random-category").style.display = "flex"
        addViewClass()
    } else {
        let timeAtual = dadosTimeAtual;
        document.querySelector(".name label").textContent = "Nome do " + dadosTimes[timeAtual].timeLabel;
        let avatarsSelection = document.querySelectorAll('.options-avatar .image');
        avatarsSelection.forEach(e => {
            e.classList.remove("select")
            if (e.id == "a") {
                e.classList.add("select")
            }
        });

    }
}
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

let cartaAtual

function addViewClass() {
    const categories = document.querySelectorAll('.category');
    
    let iteration = 0;

    const interval = setInterval(() => {
        // Escolhe uma categoria aleatória
        const randomIndex = getRandomInt(0, categories.length - 1);
        const randomCategory = categories[randomIndex];

        // Adiciona a classe 'view' à categoria atual e remove das demais
        categories.forEach(category => {
            if (category === randomCategory) {
                category.classList.add('view');
            } else {
                category.classList.remove('view');
            }
        });

        iteration++;

        // Verifica se o loop deve parar
        if (iteration >= getRandomInt(5, 10)) {
            clearInterval(interval);
            const lastCategory = document.querySelector('.view').classList[1];
            document.querySelector('.view').classList.add("select-view")
            console.log(lastCategory);

            // selecionar uma carta dentro dos dados
            cartaAtual = selecionarCarta(lastCategory)
            console.log(cartaAtual)

            setTimeout(function() {
                document.querySelector("section.random-category").style.display = "none"
                document.querySelector("section.select-tips").style.display = "flex"
                document.querySelector("section.select-tips .container.options-game").style.display = "flex"
                
                console.log("Isso é um teste!");
              }, 1000); // 500 milissegundos = meio segundo
        }
    }, 200); // meio segundo
}



function randomCategoryPlay () {
    let valueRandom = Math.floor(Math.random() * 6) + 10;
    console.log(valueRandom);

}

function selectRandomCategory() {
    // Obtenha todas as categorias
    const categories = document.querySelectorAll('.random-category .category');

    // Gere um índice aleatório dentro do intervalo de categorias
    const randomIndex = Math.floor(Math.random() * categories.length);

    // Remova a classe 'view' de todas as categorias
    categories.forEach(category => {
        category.classList.remove('view');
    });

    // Adicione a classe 'view' à categoria selecionada aleatoriamente
    categories[randomIndex].classList.add('view');
}

// botoes das dicas

document.querySelectorAll("div.container.options-game .options > div.btn").forEach(btn => {
    btn.addEventListener("click", e => {
        e.target.classList.add("select");

        // selecionando dica
        let numeroDica = e.target.id
        exibirDicaCarta(numeroDica)

    });
});

function exibirDicaCarta(numeroDica) {
    dicaID = numeroDica - 1
    let textoDica = cartaAtual.afirmações[dicaID]
    console.log(textoDica)

    document.querySelector("section.select-tips .container.options-game").style.display = "none"
    document.querySelector("section.select-tips .container.tip").style.display = "flex"

    document.querySelector("section.select-tips div.number-tip").textContent = numeroDica

    document.querySelector("section.select-tips div.phrase > p").textContent = textoDica

    document.querySelector("section.select-tips p.name-correct").textContent = cartaAtual.resposta


    setTimeout(function() {
        document.querySelector("section.select-tips .container.options-game").style.display = "flex"

        document.querySelector("section.select-tips .container.tip").style.display = "none"

      }, 5000); // 500 milissegundos = meio segundo
}


// Função para selecionar uma carta aleatória de uma categoria específica
function selecionarCarta(categoria) {
    // Filtrar as cartas pela categoria especificada
    const cartasCategoria = dataCartas.filter(carta => carta.categoria.toLowerCase() === categoria.toLowerCase());
    // Verificar se há cartas na categoria especificada
    if (cartasCategoria.length === 0) {
        console.error(`Nenhuma carta encontrada na categoria "${categoria}".`);
        return null;
    }
    // Selecionar uma carta aleatória da categoria
    const cartaSelecionada = cartasCategoria[Math.floor(Math.random() * cartasCategoria.length)];
    cartaSelecionada.carta_ja_escolhida = "sim";
    return cartaSelecionada;
}