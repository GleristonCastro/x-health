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
  setTimeout(range, 100);
};

async function range() {
  const range = document.getElementById("height");
  const range2 = document.getElementById("weight");

  const scale = (num, in_min, in_max, out_min, out_max) => {
    return ((num - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min;
  };

  const handleRangeInput = (e) => {
    const value = +e.target.value;
    const label = e.target.nextElementSibling;
    const rangeWidth = getComputedStyle(e.target).getPropertyValue("width");
    const labelWidth = getComputedStyle(label).getPropertyValue("width");

    const numWidth = +rangeWidth.substring(0, rangeWidth.length - 2);
    const numLabelWidth = +labelWidth.substring(0, labelWidth.length - 2);
    const max = +e.target.max;
    const min = +e.target.min;
    const left =
      value * (numWidth / max) -
      numLabelWidth / 2 +
      scale(value, min, max, 10, -10);
    label.style.left = `${left}px`;
    label.innerHTML = value;
  };

  range.addEventListener("input", handleRangeInput);
  range2.addEventListener("input", handleRangeInput);
}

document.addEventListener("DOMContentLoaded", () => {
  const marqueeText = document.getElementById("marqueeText");
  if (marqueeText) {
    const scrollSpeed = 50;

    function moveMarquee() {
      marqueeText.style.transform = `translateX(${scrollSpeed}px)`;

      if (marqueeText.offsetLeft > marqueeText.offsetWidth) {
        marqueeText.style.transform = "translateX(-100%)";
      }

      setTimeout(moveMarquee, 0);
    }

    
  setTimeout(moveMarquee, 101);
  }
});