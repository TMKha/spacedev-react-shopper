import React, { useEffect, useRef } from 'react'

export default function Testimonial() {
    
    const ref = useRef()

    useEffect(()=>{
        function testimonialSlider() {

            const $this = $(ref.current)
             
                var $carousel = $this.find(".images .list").flickity({
                    contain: true,
                    wrapAround: false,
                    freeScroll: false,
                    cellAlign: 'center',
                    lazyLoad: 2,
                    imagesLoaded: true,
                    prevNextButtons: false,
                    on: {
                        ready: function () {
                            let dotsSlideTes = $this.find(' .flickity-page-dots');
                            let dotsNew = $this.find(' .dots');
                            dotsSlideTes.appendTo(dotsNew);
                        },
                        change: function (index) {
                            $this.find( '.ct').removeClass('active');
                            $this.find( '.ct-' + (index + 1)).addClass('active');
                        }
                    }
                });
                var flkty = $carousel.data('flickity');
                var $imgs = $this.find(' .carousel-cell picture img');
    
                $carousel.on('scroll.flickity', function (event, progress) {
                    flkty.slides.forEach(function (slide, i) {
                        var img = $imgs[i];
                        var x = (slide.target + flkty.x) * -1 / 2;
                        img.style.transform = 'translateX( ' + x + 'px)';
                    });
                });
    
                let ctrPrevTes = $this.find(' .btn_ctr.prev'),
                    ctrNextTes = $this.find(' .btn_ctr.next');
    
                ctrPrevTes.on('click', function () {
                    $carousel.flickity('previous', true);
                });
                ctrNextTes.on('click', function () {
                    $carousel.flickity('next', true);
                });
            
        }
        testimonialSlider();
    },[])

  return (
    <section className="section-testimonial" ref={ref}>
      <div className="container">
        <div className="textbox">
          <h2 className="main-title white">H???c vi??n c???m nh???n v??? Spacedev</h2>
        </div>
        <div className="testimonial">
          <div className="testimonial-item">
            <div className="item">
              <div className="text">
                <div className="ct ct-1 active">
                  <div className="info">
                    <div className="name">
                      <h4>?????ng Thuy???n V????ng</h4>
                      <p>Th??nh vi??n Spacedev 1</p>
                    </div>
                    <div className="quotes"><img src="img/quotes.svg" alt="" /></div>
                  </div>
                  <div className="content">
                    Mentor c?? t??m, t???n t??nh. M??nh t??m ???????c h?????ng ??i trong l???p tr??nh front-end qua
                    kh??a h???c. N??i ch???n l???a an t??m cho m???i ng?????i.
                  </div>
                  <div className="bottom">
                    <a href="#" target="_blank"><img src="img/facebook.svg" alt="" /></a>
                    <span>09/10/2020</span>
                  </div>
                </div>
                <div className="ct ct-2">
                  <div className="info">
                    <div className="name">
                      <h4>?????ng Thuy???n Qu??n</h4>
                      <p>Th??nh vi??n Spacedev 2</p>
                    </div>
                    <div className="quotes"><img src="img/quotes.svg" alt="" /></div>
                  </div>
                  <div className="content">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sollicitudin libero
                    id magna finibus, in maximus urna tincidunt. Nam at leo lacinia, interdum dolor
                    in, molestie lectus. Aenean porttitor purus at purus euismod tristique
                  </div>
                  <div className="bottom">
                    <a href="#" target="_blank"><img src="img/facebook.svg" alt="" /></a>
                    <span>01/10/2020</span>
                  </div>
                </div>
                <div className="ct ct-3">
                  <div className="info">
                    <div className="name">
                      <h4>L?? Ch??u H???u Thi???n</h4>
                      <p>Th??nh vi??n Spacedev 3</p>
                    </div>
                    <div className="quotes"><img src="img/quotes.svg" alt="" /></div>
                  </div>
                  <div className="content">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sollicitudin libero
                    id magna finibus, in maximus urna tincidunt. Nam at leo lacinia, interdum dolor
                    in, molestie lectus. Aenean porttitor purus at purus euismod tristique
                  </div>
                  <div className="bottom">
                    <a href="#" target="_blank"><img src="img/facebook.svg" alt="" /></a>
                    <span>01/10/2020</span>
                  </div>
                </div>
              </div>
              <div className="images">
                <div className="list">
                  <div className="carousel-cell">
                    <div className="img">
                      <picture>
                        <source media="(max-width: 767px)" srcSet="img/Intersect.png" />
                        <img data-flickity-lazyload="img/tes.jpg" alt="" />
                      </picture>
                    </div>
                    <div className="ct_m">
                      <div className="info">
                        <div className="name">
                          <h4>Ti???n T??i</h4>
                          <p>Th??nh vi??n Spacedev1</p>
                        </div>
                        <div className="quotes"><img src="img/quotes.svg" alt="" /></div>
                      </div>
                      <div className="content">
                        Mentor c?? t??m, t???n t??nh. M??nh t??m ???????c h?????ng ??i trong l???p tr??nh
                        front-end qua
                        kh??a h???c. Like cho 4 mentor.
                      </div>
                      <div className="bottom">
                        <a href="#" target="_blank"><img src="img/facebook.svg" alt="" /></a>
                        <span>09/10/2020</span>
                      </div>
                    </div>
                  </div>
                  <div className="carousel-cell">
                    <div className="img">
                      <picture>
                        <source media="(max-width: 767px)" srcSet="img/Intersect.png" />
                        <img data-flickity-lazyload="img/tes.jpg" alt="" />
                      </picture>
                    </div>
                    <div className="ct_m">
                      <div className="info">
                        <div className="name">
                          <h4>Nguy???n V??n Tu???n</h4>
                          <p>Th??nh vi??n Spacedev1</p>
                        </div>
                        <div className="quotes"><img src="img/quotes.svg" alt="" /></div>
                      </div>
                      <div className="content">
                        Mentor c?? t??m, t???n t??nh. M??nh t??m ???????c h?????ng ??i trong l???p tr??nh
                        front-end qua
                        kh??a h???c. Like cho 4 mentor.
                      </div>
                      <div className="bottom">
                        <a href="#" target="_blank"><img src="img/facebook.svg" alt="" /></a>
                        <span>09/10/2020</span>
                      </div>
                    </div>
                  </div>
                  <div className="carousel-cell">
                    <div className="img">
                      <picture>
                        <source media="(max-width: 767px)" srcSet="img/Intersect.png" />
                        <img data-flickity-lazyload="img/tes.jpg" alt="" />
                      </picture>
                    </div>
                    <div className="ct_m">
                      <div className="info">
                        <div className="name">
                          <h4>Ph???m Th??nh Trung</h4>
                          <p>Th??nh vi??n Spacedev1</p>
                        </div>
                        <div className="quotes"><img src="img/quotes.svg" alt="" /></div>
                      </div>
                      <div className="content">
                        Mentor c?? t??m, t???n t??nh. M??nh t??m ???????c h?????ng ??i trong l???p tr??nh
                        front-end qua
                        kh??a h???c. Like cho 4 mentor.
                      </div>
                      <div className="bottom">
                        <a href="#" target="_blank"><img src="img/facebook.svg" alt="" /></a>
                        <span>09/10/2020</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="dots" />
            <div className="btn_ctr prev" />
            <div className="btn_ctr next" />
          </div>
        </div>
      </div>
    </section>
  )
}
