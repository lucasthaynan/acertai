let dataCartas;

// Função para carregar o JSON via Fetch
function carregarCartas() {
    fetch('./data/cartas.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao carregar o arquivo JSON');
            }
            return response.json();
        })
        .then(data => {
            dataCartas = data.cartas;
            // Aqui você pode fazer o que quiser com os dados carregados
            // console.log(data);
            // Por exemplo, você pode chamar uma função para manipular as cartas
            manipularCartas(data.cartas);
        })
        .catch(error => {
            console.error('Ocorreu um erro:', error);
        });
}

// Função para embaralhar a ordem das afirmações
function embaralharAfirmações(afirmações) {
    // Copiando o array de afirmações
    const afirmaçõesEmbaralhadas = afirmações.slice();
    // Embaralhando o array
    for (let i = afirmaçõesEmbaralhadas.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [afirmaçõesEmbaralhadas[i], afirmaçõesEmbaralhadas[j]] = [afirmaçõesEmbaralhadas[j], afirmaçõesEmbaralhadas[i]];
    }
    return afirmaçõesEmbaralhadas;
}

// Função para manipular as cartas
function manipularCartas(cartas) {
    // Aqui você pode fazer o que quiser com as cartas, como exibir na tela, etc.
    // Por enquanto, vamos apenas imprimir no console
    cartas.forEach(carta => {
        // console.log('Categoria:', carta.categoria);
        // console.log('Resposta:', carta.resposta);
        // console.log('Dificuldade:', carta.dificuldade);
        // console.log('Afirmações:');
        const afirmaçõesEmbaralhadas = embaralharAfirmações(carta.afirmações);
        // afirmaçõesEmbaralhadas.forEach(afirmação => {
        //     console.log('-', afirmação);
        // });
        // console.log('------------------');
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
        if (iteration >= getRandomInt(15, 25)) {
            clearInterval(interval);
            const lastCategory = document.querySelector('.view').classList[1];
            document.querySelector('.view').classList.add("select-view")
            console.log(lastCategory);

            setTimeout(function() {
                document.querySelector("section.random-category").style.display = "none"
                document.querySelector("section.select-tips").style.display = "flex"
                console.log("Isso é um teste!");
              }, 8000); // 500 milissegundos = meio segundo
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

// Chame a função para selecionar uma categoria aleatória inicialmente
// selectRandomCategory();