let images = [{
    url: "img/image2.jpg",
    title: "Rostov-on-Don, Admiral",
  }, {
    url: "img/image2.2.jpg",
    title: "Sochi Thieves",
  }, {
    url: "img/image2.3.jpg",
    title: "Rostov-on-Don Patriotic",
  }];

  let sliderOptions = {
    dots: true,
    autoplay: true,
    autoplayInterval: 5000
  };

  function initSlider(options) {
    if (!images || !images.length) return;

    options = options || {
        dots: true,
        autoplay: false
      };

    let imgs = document.querySelector('.img_slide_2');
    let arrs = document.querySelectorAll('.arrows');
    let dots = document.querySelector('.dots');
    let titles = document.querySelector('.ul_slide_2');

    initImages();
    initArrows();
  

    if (options.dots) {
        initDots();
        initTitles();
      }
      
      if (options.autoplay) {
        initAutoplay();
      }

    function initImages () {
        images.forEach((image, index) => {
            let imageDiv = `<div class='image_slide_2 n${index} ${index === 0? 'active' : ''}' style='background-image:url(${images[index].url});' data-index='${index}'></div>`;
            imgs.innerHTML += imageDiv;
        })
    }

    function initArrows() {
        arrs.forEach(arrow => {
            arrow.addEventListener('click', function () {
                let curNumber = +imgs.querySelector('.active').dataset.index;
                let nextNumber;
                if (arrow.classList.contains('arrow1-completed')) {
                    nextNumber = curNumber === 0? images.length - 1 : curNumber - 1;
                } else {
                    nextNumber = curNumber === images.length - 1? 0  : curNumber + 1;
                }
                moveSlider(nextNumber);
            });
        });
    }
    function initTitles() {
        images.forEach ((image, index) => {
            let title = `<li class = 'ul_slide_2_items n${index} ${index === 0 ? 'active' : ''}' data-index = '${index}'>${images[index].title}</li>`;
            titles.innerHTML += title;
        });
        titles.querySelectorAll('.ul_slide_2_items').forEach(dot => {
            dot.addEventListener('click', function () {
                moveSlider(this.dataset.index);
            })
        })
    };
    function initDots () {
        images.forEach ((image, index) => {
            let dot = `<div class = 'dots-item n${index} ${index === 0 ? 'active' : ''}' data-index = '${index}'></div>`;
            dots.innerHTML += dot;
        });
        dots.querySelectorAll('.dots-item').forEach(dot => {
            dot.addEventListener('click', function () {
                moveSlider(this.dataset.index);
            })
        })
    }

    function moveSlider(num) {
        imgs.querySelector('.active').classList.remove('active');
        imgs.querySelector('.n' + num).classList.add('active');
        if (options.dots) {
            dots.querySelector(".active").classList.remove("active");
            dots.querySelector(".n" + num).classList.add("active");
            titles.querySelector(".active").classList.remove("active");
            titles.querySelector(".n" + num).classList.add("active");
          }
    }
    function initAutoplay() {
        setInterval(() => {
          let curNumber = +imgs.querySelector(".active").dataset.index;
          let nextNumber = curNumber === images.length - 1? 0 : curNumber + 1;
          moveSlider(nextNumber);
        }, options.autoplayInterval);
      }
}


document.addEventListener('DOMContentLoaded', ()=>{
    initSlider(sliderOptions)
})
