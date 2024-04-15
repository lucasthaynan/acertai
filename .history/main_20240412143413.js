


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
        // Aqui você pode fazer o que quiser com os dados carregados
        console.log(data);
        // Por exemplo, você pode chamar uma função para manipular as cartas
        manipularCartas(data.cartas);
      })
      .catch(error => {
        console.error('Ocorreu um erro:', error);
      });
  }
  
  // Função para manipular as cartas
  function manipularCartas(cartas) {
    // Aqui você pode fazer o que quiser com as cartas, como exibir na tela, etc.
    // Por enquanto, vamos apenas imprimir no console
    cartas.forEach(carta => {
      console.log('Categoria:', carta.categoria);
      console.log('Resposta:', carta.resposta);
      console.log('Dificuldade:', carta.dificuldade);
    //   console.log('Afirmações:');
    //   carta.afirmações.forEach(afirmação => {
    //     console.log('-', afirmação);
    //   });
      console.log('------------------');
    });
  }
  
  // Chamando a função para carregar as cartas quando a página é carregada
  carregarCartas();
  