'use client'

import React, { useState } from 'react';
import {
  Carousel,
  CarouselItem,
  CarouselControl
} from 'reactstrap';


import logo from '@/lib/silk-road-500.png'
import Image from 'next/image';

const items = [
  {
    src: 'https://im.uniqlo.com/global-cms/spa/res6fbe5fffc0b26ce61c11878b9122d256fr.jpg',
    altText: 'Slide 1',
    key: 1,
  },
  {
    src: 'https://im.uniqlo.com/global-cms/spa/resb328f77a75398ec856c8a00b6add8078fr.jpg',
    altText: 'Slide 2',
    key: 2,
  },
  {
    src: 'https://im.uniqlo.com/global-cms/spa/res78be7a82ac12a0de3b629170e3c98848fr.jpg',
    altText: 'Slide 3',
    key: 3,
  },
  {
    src: 'https://im.uniqlo.com/global-cms/spa/res5408f5fd7d1bccc83d23e76875f98b9cfr.jpg',
    altText: 'Slide 4',
    key: 4,
  },
];

function Home() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  const next = () => {
    if (animating) return;
    const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  };

  const previous = () => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  };

  const slides = items.map((item) => {
    return (
      <CarouselItem
        onExiting={() => setAnimating(true)}
        onExited={() => setAnimating(false)}
        key={item.src}
        className='vh-100 overflow-hidden'
      >
        <Image src={item.src} alt={item.altText} className='h-100'/>
      </CarouselItem>
    );
  });

  return (
    <main className='pt-0 position-relative'>
      <Carousel
        activeIndex={activeIndex}
        next={next}
        previous={previous}
        interval={3500}
        className='home-background'
      >
        {slides}
        <CarouselControl
          direction="prev"
          directionText="Previous"
          onClickHandler={previous}
        />
        <CarouselControl
          direction="next"
          directionText="Next"
          onClickHandler={next}
        />
      </Carousel>
      <div className='position-absolute h-50 w-50 top-50 start-50 home-screen'>
        <Image src={logo.src} alt="" />
        <div>
          <h1>Silkroad</h1>
          <h2>The place for all your clothing needs.</h2>
        </div>
      </div>
    </main>
  )
}

export default Home