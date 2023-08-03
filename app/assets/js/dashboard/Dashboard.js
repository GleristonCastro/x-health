const includes = (sections) => {
  for (let i = 0; i < sections.length; i++) {
    const startTime = performance.now();

    fetch(`${sections[i]}.html`)
      .then(response => response.text())
      .then(html => {
        const includeHtml = document.getElementById(sections[i]);
        includeHtml.innerHTML = html;

        const endTime = performance.now();
        const timeElapsed = endTime - startTime;
        console.log(`Tempo para "${sections[i]}": ${timeElapsed.toFixed(2)} ms`);
      });
  }
}

window.onload = function () {
  includes([
    'header',
    'footer',
    'userArea'
  ]);
  setTimeout(() => {
    const userServices = document.querySelector('.user-services')
    const evaluationBtn = document.querySelector('.btnEvaluation')
    let clicked = false
    evaluationBtn.addEventListener('click', (e) => {
      e.preventDefault()
      if (!clicked) {
        const div = document.createElement('div')
        userServices.append(div)
        div.className = 'divCreate'
        div.innerHTML = `
        <div class="alert alert-warning alert-dismissible">
        <button class="btnClose">X</button>
        <strong>Aviso!</strong> Você já realizou esta avaliação e possui o plano: <span>Global Xhealth Passport</span> 
        </div>`
        clicked = true
    const btnClose = document.querySelector('.btnClose')
    const divCreate = document.querySelector('.divCreate')
    const alert = document.querySelector('.alert')
        btnClose.addEventListener('click', (e) => {
          e.preventDefault()
          divCreate.removeChild(alert)
          divCreate.remove()
          clicked = false
        })
      }
    })

  }, 1000)
};