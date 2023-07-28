const includes = (sections) => {
  for(let i = 0; i < sections.length; i++ ){
    fetch(`${sections[i]}.html`)
      .then(response => response.text())
      .then(html => {
          const footerDiv = document.getElementById(sections[i]);
          footerDiv.innerHTML = html;
      });
  }
}

window.onload = function () {
  includes([
  'about',
  'calcBmi',
  'cases',
  'decisionMaking',
  'dividerAnimation',
  'footer',
  'header',
  'plans',
  'schedules',
  'socialNetwork',
  'teachers',
  'video'
]);
};