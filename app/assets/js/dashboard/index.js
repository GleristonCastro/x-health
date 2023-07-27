// Função para buscar e inserir o conteúdo do cabeçalho
function incluirHeader() {
  fetch('../header.html')
      .then(response => response.text())
      .then(html => {
          const headerDiv = document.getElementById('header');
          headerDiv.innerHTML = html;
      });
}

// Função para buscar e inserir o conteúdo do rodapé
function incluirFooter() {
  fetch('../footer.html')
      .then(response => response.text())
      .then(html => {
          const footerDiv = document.getElementById('footer');
          footerDiv.innerHTML = html;
      });
}

// Chama as funções para incluir o conteúdo do cabeçalho e rodapé quando a página é carregada
window.onload = function () {
  incluirHeader();
  incluirFooter();
};
