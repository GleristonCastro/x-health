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
        //console.log(`Tempo para "${sections[i]}": ${timeElapsed.toFixed(2)} ms`);
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

    const heroSlide = new bootstrap.Carousel('#hero');
    const teacherSlide = new bootstrap.Carousel('#teachersSlider');

    function range() {
      const height = document.getElementById("height");
      const weight = document.getElementById("weight");
      const result = document.getElementById("result");
      const bmiResult = document.getElementById("bmiResult");

      const scale = (num, in_min, in_max, out_min, out_max) => {
        return ((num - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min;
      };

      const updateResults = () => {
        const heightValue = +height.value;
        const weightValue = +weight.value;
        const bmiCalc = weightValue / ((heightValue / 100) * (heightValue / 100));

        const bmiFormatted = bmiCalc.toFixed(2).replace(".", ",");
        bmiResult.innerHTML = bmiFormatted;

        const weightFormatted = weightValue.toFixed(2).replace(".", ",");
        result.innerHTML = weightFormatted;
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
          value * (numWidth / max) - numLabelWidth / 2 + scale(value, min, max, 10, -10);
        label.style.left = `${left}px`;
        label.innerHTML = value;

        updateResults();
      };

      height.addEventListener("input", handleRangeInput);
      weight.addEventListener("input", handleRangeInput);

      updateResults();
      handleRangeInput({ target: height });
      handleRangeInput({ target: weight });
    }

    range();


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

      (function () {
        let backTop = document.getElementsByClassName('js-back-to-top')[0];
        if (backTop) {
          let dataElement = backTop.getAttribute('data-element');
          let scrollElement = dataElement ? document.querySelector(dataElement) : window;
          let scrollOffsetInit = parseInt(backTop.getAttribute('data-offset-in')) || parseInt(backTop.getAttribute('data-offset')) || 0,
            scrollOffsetOutInit = parseInt(backTop.getAttribute('data-offset-out')) || 0,
            scrollOffset = 0,
            scrollOffsetOut = 0,
            scrolling = false;

          let targetIn = backTop.getAttribute('data-target-in') ? document.querySelector(backTop.getAttribute('data-target-in')) : false,
            targetOut = backTop.getAttribute('data-target-out') ? document.querySelector(backTop.getAttribute('data-target-out')) : false;

          updateOffsets();

          backTop.addEventListener('click', function (event) {
            event.preventDefault();
            if (!window.requestAnimationFrame) {
              scrollElement.scrollTo(0, 0);
            } else {
              dataElement ? scrollElement.scrollTo({ top: 0, behavior: 'smooth' }) : window.scrollTo({ top: 0, behavior: 'smooth' });
            }
            moveFocus(document.getElementById(backTop.getAttribute('href').replace('#', '')));
          });

          checkBackToTop();
          if (scrollOffset > 0 || scrollOffsetOut > 0) {
            scrollElement.addEventListener("scroll", function (event) {
              if (!scrolling) {
                scrolling = true;
                (!window.requestAnimationFrame) ? setTimeout(function () { checkBackToTop(); }, 250) : window.requestAnimationFrame(checkBackToTop);
              }
            });
          }

          function checkBackToTop() {
            updateOffsets();
            let windowTop = scrollElement.scrollTop || document.documentElement.scrollTop;
            if (!dataElement) windowTop = window.scrollY || document.documentElement.scrollTop;
            let condition = windowTop >= scrollOffset;
            if (scrollOffsetOut > 0) {
              condition = (windowTop >= scrollOffset) && (window.innerHeight + windowTop < scrollOffsetOut);
            }
            backTop.classList.toggle('back-to-top--is-visible', condition);
            scrolling = false;
          }

          function updateOffsets() {
            scrollOffset = getOffset(targetIn, scrollOffsetInit, true);
            scrollOffsetOut = getOffset(targetOut, scrollOffsetOutInit);
          }

          function getOffset(target, startOffset, bool) {
            let offset = 0;
            if (target) {
              let windowTop = scrollElement.scrollTop || document.documentElement.scrollTop;
              if (!dataElement) windowTop = window.scrollY || document.documentElement.scrollTop;
              let boundingClientRect = target.getBoundingClientRect();
              offset = bool ? boundingClientRect.bottom : boundingClientRect.top;
              offset = offset + windowTop;
            }
            if (startOffset && startOffset) {
              offset = offset + parseInt(startOffset);
            }
            return offset;
          }

          function moveFocus(element) {
            if (!element) element = document.getElementsByTagName("body")[0];
            element.focus();
            if (document.activeElement !== element) {
              element.setAttribute('tabindex', '-1');
              element.focus();
            }
          };
        }
      }());

  }, 800)
};