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
let totalTimes;

function selectTime(quantity) {
    totalTimes = quantity;
    document.querySelector("section.home").style.display = "none";
    document.querySelector("section.info-times").style.display = "flex";
    resetDadosTime();
}

let avatarsSelection = document.querySelectorAll(".options-avatar div.image");
let dadosTimes = [];
let dadosTimeAtual = 0;

avatarsSelection.forEach(avatar => {
    avatar.addEventListener("click", e => {
        avatarsSelection.forEach(e => e.classList.remove("select"));
        e.currentTarget.classList.add("select");
    });
});

function cadastroTime() {
    if (dadosTimeAtual < totalTimes) {
        let teamNameElement = document.getElementById('name_time');
        let teamName = teamNameElement.value.trim() || 'Time Default';

        let selectedAvatar = document.querySelector('.options-avatar .image.select');
        let avatarImageUrl = selectedAvatar ? selectedAvatar.querySelector('img').src : '';

        dadosTimes.push({
            nome: teamName,
            avatar: avatarImageUrl,
            timeLabel: `Time ${String.fromCharCode(65 + dadosTimeAtual)}`
        });

        dadosTimeAtual++;
        
        if (dadosTimeAtual < totalTimes) {
            resetDadosTime();
        } else {
            console.log('Todos os times foram registrados', dadosTimes);
            // Aqui você poderia redirecionar o usuário para outra página ou mostrar um resumo
        }
    }
}

function resetDadosTime() {
    document.getElementById('name_time').value = '';
    avatarsSelection.forEach(e => e.classList.remove("select"));
}