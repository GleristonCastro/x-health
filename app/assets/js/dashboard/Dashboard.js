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
    'footer'
  ]);
};