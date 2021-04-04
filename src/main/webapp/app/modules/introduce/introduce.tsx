import './introduce.scss'
import React, {useEffect, useState} from 'react';
import {BreadcrumbsItem} from 'react-breadcrumbs-dynamic';
import {Storage} from 'react-jhipster';

const base_path = '/';

function Introduce({children})
{
  const Token = Storage.local.get('jhi-authenticationToken') || Storage.session.get('jhi-authenticationToken');
  const authToken = `Bearer ${Token}`;
  const promises = [];
  const carouselSlide: any = document.querySelector('.carousel-slide')

  const carouselImage: any = document.querySelectorAll('.carousel-slide img');

  // const prevBtn = document.querySelector('#prevBtn');
  // const nextBtn = document.querySelector('#nextBtn');

  // let counter =1;


  const [counter, setCounter] = useState(1);

  const size = carouselImage.length > 0 ? carouselImage[0].clientWidth : '';
  // carouselSlide ? carouselSlide.style.transform = 'translateX(' + (-size * counter) + 'px)' : '';
  const slideImage = (n) =>
  {
    // carouselSlide.style.transition="0.5s";
    // counter=n;
    // window.console.log(counter)
    // window.console.log(carouselSlide.style.transition);
    // carouselSlide.style.transform='translateX('+ (-size*counter) +'px)';
  }
  // nextBtn?nextBtn.addEventListener('click', ()=>{
  //   if(counter>=carouselImage.length-1) return
  //   carouselSlide.style.transition="0.5s";
  //   window.console.log(carouselSlide.style.transition)
  //   counter++;
  //   carouselSlide.style.transform='translateX('+ (-size*counter) +'px)';
  // }):'';
  //
  //
  // prevBtn?prevBtn.addEventListener('click', ()=>{
  //   if(counter<=0) return
  //   carouselSlide.style.transition= "0.5s";
  //   window.console.log(carouselSlide.style.transition)
  //   counter--;
  //   carouselSlide.style.transform='translateX('+ (-size*counter) +'px)';
  // }):'';


  // carouselSlide?carouselSlide.addEventListener('transitionend',()=>{
  //   window.console.log('Fired')
  //   if(carouselImage[counter].id==='last-clone'){
  //     carouselSlide.style.transition='none';
  //     counter=carouselImage.length-2;
  //     carouselSlide.style.transform='translateX('+ (-size*counter) +'px)';
  //   }
  //   if(carouselImage[counter].id==='first-clone'){
  //     carouselSlide.style.transition='none';
  //     counter=carouselImage.length-counter;
  //     carouselSlide.style.transform='translateX('+ (-size*counter) +'px)';
  //   }
  // }):'';


  // const onChangeUpCounter=()=>{
  //   if(counter < carouselImage.length-1){
  //     setCounter(counter+1)
  //   }
  // }
  // const onChangeDownCounter=()=>{
  //   if(counter>=1){
  //     setCounter(counter - 1)
  //   }
  // }
  const onChangeCounter = (n) =>
  {
    setCounter(counter + Number(n))
  }
  useEffect(() =>
  {
    if (carouselSlide && carouselImage[counter].id === 'last-clone')
    {
      setCounter(carouselImage.length - 2);
      carouselSlide.style.transition = 'none';
      carouselSlide.style.transform = 'translateX(' + (-size * (carouselImage.length - 2)) + 'px)';
    }

    if (carouselSlide && carouselImage[counter].id === 'first-clone')
    {
      setCounter(carouselImage.length - counter);
      carouselSlide.style.transition = 'none';
      carouselSlide.style.transform = 'translateX(' + (-size * (carouselImage.length - counter)) + 'px)';
    }

  })

  useEffect(() =>
  {
    // showCarousel()
    if (counter > 0 && counter < carouselImage.length - 1)
    {
      carouselSlide.style.transition = "0.5s";
      carouselSlide.style.transform = 'translateX(' + (-size * counter) + 'px)';
    }
  }, [counter])

  const modal = document.getElementById('image-modal');
  const openModal = () =>
  {
    // modal.style.display="block";
  }
  const onCloseModal = () =>
  {
    // modal.style.display="none";
  }
  const [count, setCount] = useState(1);
  const showSlides = () =>
  {
    if (count)
    {
      const slides = Array.from(document.getElementsByClassName('image-item') as HTMLCollectionOf<HTMLElement>);
      const dots = document.getElementsByClassName('dot-item');
      for (let i = 0; i < slides.length; i++)
      {
        slides[i].style.display = 'none';
      }
      for (let i = 0; i < dots.length; i++)
      {
        dots[i].className = dots[i].className.replace(' active', '');
      }
      if (slides && slides.length > 0)
      {
        slides[count - 1].style.display = "block";
      }
      if (dots && dots.length > 0)
      {
        dots[count - 1].className += ' active';
      }
      // slides[count-1].style.display = 'block';
      //  dots[count - 1].className += ' active';
    }
  };
  const currentSlide = n =>
  {
    setCount(n);
    showSlides();
  };
  useEffect(() =>
  {
    currentSlide(count);
  });

  return (
    <div className="show-light-box">
      <BreadcrumbsItem glyph="calendar" to="/introduce">
        Introduce
      </BreadcrumbsItem>
      <div className="carousel-content">
        <div className="carousel-slide d-flex">
          <img
            src="https://cdn.cellphones.com.vn/media/catalog/product/cache/7/image/9df78eab33525d08d6e5fb8d27136e95/m/a/macbook-air-space-gray-config-20.jpg"
            id="last-clone"/>
          <img
            src="https://cdn.cellphones.com.vn/media/catalog/product/cache/7/image/9df78eab33525d08d6e5fb8d27136e95/l/a/laptop-asus-zenbook-13-ux325ea_1_.jpg"/>
          <img
            src="https://cdn.cellphones.com.vn/media/catalog/product/cache/7/image/9df78eab33525d08d6e5fb8d27136e95/l/a/laptop_gaming_acer_nitro_5_an515-55-5923_nh.q7nsv.004__0004_layer_1.jpg"/>
          <img
            src="https://cdn.cellphones.com.vn/media/catalog/product/cache/7/image/9df78eab33525d08d6e5fb8d27136e95/l/a/laptop-huawei-matebook-13_0005_laptop-huawei-matebook-13_4_.jpg"/>
          <img
            src="https://cdn.cellphones.com.vn/media/catalog/product/cache/7/image/9df78eab33525d08d6e5fb8d27136e95/a/s/asus-tuf-gaming-f15-fx506li-hn039t-i5-10300h_1b0ebb8ab81946358a526da61f2e5b65_master.jpg"/>
          <img
            src="https://cdn.cellphones.com.vn/media/catalog/product/cache/7/image/9df78eab33525d08d6e5fb8d27136e95/m/a/macbook-air-space-gray-config-20.jpg"/>
          <img
            src="https://cdn.cellphones.com.vn/media/catalog/product/cache/7/image/9df78eab33525d08d6e5fb8d27136e95/l/a/laptop-asus-zenbook-13-ux325ea_1_.jpg"
            id="first-clone"/>
        </div>
      </div>
      <div className="row-box">
        <div className="slides d-flex justify-content-center">
          <div className="slide-item">
            <img onClick={() =>
            {
              openModal();
              slideImage(1);
              currentSlide(1)
            }} width="150"
              src="https://cdn.cellphones.com.vn/media/catalog/product/cache/7/image/9df78eab33525d08d6e5fb8d27136e95/l/a/laptop-asus-zenbook-13-ux325ea_1_.jpg"/>
          </div>
          <div className="slide-item">
            <img onClick={() =>
            {
              openModal();
              slideImage(2);
              currentSlide(2)
            }} width="150"
              src="https://cdn.cellphones.com.vn/media/catalog/product/cache/7/image/9df78eab33525d08d6e5fb8d27136e95/l/a/laptop_gaming_acer_nitro_5_an515-55-5923_nh.q7nsv.004__0004_layer_1.jpg"/>
          </div>
          <div className="slide-item">
            <img onClick={() =>
            {
              openModal();
              slideImage(3);
              currentSlide(3)
            }} width="150"
              src="https://cdn.cellphones.com.vn/media/catalog/product/cache/7/image/9df78eab33525d08d6e5fb8d27136e95/l/a/laptop-huawei-matebook-13_0005_laptop-huawei-matebook-13_4_.jpg"/>
          </div>
          <div className="slide-item">
            <img onClick={() =>
            {
              openModal();
              slideImage(4);
              currentSlide(4)
            }} width="150"
              src="https://cdn.cellphones.com.vn/media/catalog/product/cache/7/image/9df78eab33525d08d6e5fb8d27136e95/a/s/asus-tuf-gaming-f15-fx506li-hn039t-i5-10300h_1b0ebb8ab81946358a526da61f2e5b65_master.jpg"/>
          </div>
          <div className="slide-item">
            <img onClick={() =>
            {
              openModal();
              slideImage(5);
              currentSlide(5)
            }} width="150"
              src="https://cdn.cellphones.com.vn/media/catalog/product/cache/7/image/9df78eab33525d08d6e5fb8d27136e95/m/a/macbook-air-space-gray-config-20.jpg"/>
          </div>
        </div>
      </div>
      <div id="image-modal" className="modal-box">
        <div className="">
          <div className="mb-5">
            <span className="close-modal d-flex justify-content-end" onClick={onCloseModal}>&times;</span>
          </div>
          <div className="modal-content-image">
            <div className="image-item ">
              <img
                src="https://cdn.cellphones.com.vn/media/catalog/product/cache/7/image/9df78eab33525d08d6e5fb8d27136e95/l/a/laptop-asus-zenbook-13-ux325ea_1_.jpg"/>
            </div>
            <div className="image-item">
              <img
                src="https://cdn.cellphones.com.vn/media/catalog/product/cache/7/image/9df78eab33525d08d6e5fb8d27136e95/l/a/laptop_gaming_acer_nitro_5_an515-55-5923_nh.q7nsv.004__0004_layer_1.jpg"/>
            </div>
            <div className="image-item">
              <img
                src="https://cdn.cellphones.com.vn/media/catalog/product/cache/7/image/9df78eab33525d08d6e5fb8d27136e95/l/a/laptop-huawei-matebook-13_0005_laptop-huawei-matebook-13_4_.jpg"/>
            </div>
            <div className="image-item">
              <img
                src="https://cdn.cellphones.com.vn/media/catalog/product/cache/7/image/9df78eab33525d08d6e5fb8d27136e95/a/s/asus-tuf-gaming-f15-fx506li-hn039t-i5-10300h_1b0ebb8ab81946358a526da61f2e5b65_master.jpg"/>
            </div>
            <div className="image-item">
              <img
                src="https://cdn.cellphones.com.vn/media/catalog/product/cache/7/image/9df78eab33525d08d6e5fb8d27136e95/m/a/macbook-air-space-gray-config-20.jpg"/>
            </div>
          </div>
          <div className="dots d-flex justify-content-center">
            <div className="dot-item m-1">
              <img onClick={() =>
              {
                openModal();
                currentSlide(1)
              }} width="150"
                src="https://cdn.cellphones.com.vn/media/catalog/product/cache/7/image/9df78eab33525d08d6e5fb8d27136e95/l/a/laptop-asus-zenbook-13-ux325ea_1_.jpg"/>
            </div>
            <div className="dot-item m-1">
              <img onClick={() =>
              {
                openModal();
                currentSlide(2)
              }} width="150"
                src="https://cdn.cellphones.com.vn/media/catalog/product/cache/7/image/9df78eab33525d08d6e5fb8d27136e95/l/a/laptop_gaming_acer_nitro_5_an515-55-5923_nh.q7nsv.004__0004_layer_1.jpg"/>
            </div>
            <div className="dot-item m-1">
              <img onClick={() =>
              {
                openModal();
                currentSlide(3)
              }} width="150"
                src="https://cdn.cellphones.com.vn/media/catalog/product/cache/7/image/9df78eab33525d08d6e5fb8d27136e95/l/a/laptop-huawei-matebook-13_0005_laptop-huawei-matebook-13_4_.jpg"/>
            </div>
            <div className="dot-item m-1">
              <img onClick={() =>
              {
                openModal();
                currentSlide(4)
              }} width="150"
                src="https://cdn.cellphones.com.vn/media/catalog/product/cache/7/image/9df78eab33525d08d6e5fb8d27136e95/a/s/asus-tuf-gaming-f15-fx506li-hn039t-i5-10300h_1b0ebb8ab81946358a526da61f2e5b65_master.jpg"/>
            </div>
            <div className="dot-item m-1">
              <img onClick={() =>
              {
                openModal();
                currentSlide(5)
              }} width="150"
                src="https://cdn.cellphones.com.vn/media/catalog/product/cache/7/image/9df78eab33525d08d6e5fb8d27136e95/m/a/macbook-air-space-gray-config-20.jpg"/>
            </div>
          </div>
        </div>
      </div>
      <button id="prevBtn" onClick={() => onChangeCounter(-1)}>Prev</button>
      <button id="nextBtn" onClick={() => onChangeCounter(1)}>Next</button>
      {/*<button id="prevBtn">Prev</button>*/}
      {/*<button id="nextBtn">Next</button>*/}
    </div>
  );
}

export default Introduce;
