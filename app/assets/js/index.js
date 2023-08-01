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
    'video',
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
    'teachers'
  ]);
  setTimeout(() => {

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
    const marqueeText = document.getElementById("marqueeText");
    if (marqueeText) {
      const scrollSpeed = 50;

      function moveMarquee() {
        marqueeText.style.transform = `translateX(${scrollSpeed}px)`;

        if (marqueeText.offsetLeft > marqueeText.offsetWidth) {
          marqueeText.style.transform = "translateX(-100%)";
        }
      }

      moveMarquee();
    }

    async function videoControl() {
      const btn = document.getElementById('btnVideo');
      const boxVideo = document.getElementById('videoId');
      const img = document.querySelector('.change');
      const textVideoCenter = document.getElementById('text-video-center')
    
      const execute = () => {
        if (boxVideo.paused) {
          boxVideo.play();
          img.setAttribute('src', './assets/images/pause.svg');
          img.classList.add('hoverEvent');
          btn.style.opacity = '0';
          textVideoCenter.style.display = 'none'
        } else {
          boxVideo.pause();
          btn.classList.remove('hoverEvent');
          img.setAttribute('src', './assets/images/video/play.svg');
          btn.style.opacity = '1';
          textVideoCenter.style.display = 'block'
        }
      }
    
      btn.addEventListener('click', execute);
    
      btn.addEventListener('mouseenter', () => {
        if (boxVideo.paused) {
          img.setAttribute('src', './assets/images/video/play.svg');
        } else {
          img.setAttribute('src', './assets/images/pause.svg');
        }
        btn.style.opacity = '1';
      });
    
      btn.addEventListener('mouseleave', () => {
        img.classList.remove('hoverEvent');
        btn.style.opacity = '0';
      });
    }

    function promiseControl(func) {
      return new Promise((resolve) => {
        setTimeout(() => resolve(func))
      }, 320)
    }

    async function exec1() {
      try {
        const step1 = await promiseControl(videoControl())
        return step1;
      } catch (error) {
        console.log(error.message);
      }
    }

    exec1()

    async function exec2() {
      try {
        const step2 = await promiseControl(range())
        return step2;
      } catch (error) {
        console.log(error.message);
      }
    }

    exec2()

  }, 800)
};

