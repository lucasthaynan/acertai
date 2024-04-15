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


function selectTime(quantJogadores) {
    
    document.querySelector("section.home").style.display = "none"
    document.querySelector("section.info-times").style.display = "flex"

}


let avatarsSelection = document.querySelectorAll(".options-avatar div.image")

avatarsSelection.forEach(avatar => {
    avatar.addEventListener("click", e => {
        // Remover a classe "select" de todos os avatares
        avatarsSelection.forEach(e => e.classList.remove("select"));
        
        // Adicionar a classe "select" apenas ao elemento clicado
        avatar.classList.add("select");
    })
})



let dadosTimes = [
    { nome: '', avatar: '', timeLabel: 'Time A' },
    { nome: '', avatar: '', timeLabel: 'Time B' },
    { nome: '', avatar: '', timeLabel: 'Time C' }
];

let dadosTimeAtual = 0; // Índice do time atual sendo editado

function cadastroTime() {
    let teamNameElement = document.getElementById('name_time');
    let teamName = teamNameElement && teamNameElement.value.trim() !== '' ? teamNameElement.value : 'Time A';

    let selectedAvatar = document.querySelector('.options-avatar .image.select');
    let selectedAvatarId = selectedAvatar ? selectedAvatar.id : 'Avatar não selecionado';
    let avatarImageUrl = selectedAvatar ? selectedAvatar.querySelector('img').src : 'Imagem não encontrada';

    console.log('Nome do Time:', teamName);
    console.log('ID do Avatar Selecionado:', selectedAvatarId);
    console.log('URL da Imagem do Avatar:', avatarImageUrl);

    dadosTimes[dadosTimeAtual].nome = teamName;
    dadosTimes[dadosTimeAtual].avatar = avatarImageUrl;

    // Incrementa o índice do time atual ou reinicia se atingir o limite
    dadosTimeAtual = (dadosTimeAtual + 1) % dadosTimes.length;

    resetDadosTime();
}

function resetDadosTime() {
    let timeAtual = dadosTimeAtual;

    document.querySelector("body > section.info-times > div > div.name > label").textContent = "Nome do " + dadosTimes[timeAtual].timeLabel;

    let avatarsSelection = document.querySelectorAll('.options-avatar .image');
    avatarsSelection.forEach(e => e.classList.remove("select"));
}
