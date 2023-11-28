'use client'

import React, { useState } from 'react';
import {
  Carousel,
  CarouselItem,
  CarouselControl
} from 'reactstrap';

const items = [
  {
    src: 'https://picsum.photos/id/123/2000',
    altText: 'Slide 1',
    key: 1,
  },
  {
    src: 'https://picsum.photos/id/456/2000',
    altText: 'Slide 2',
    key: 2,
  },
  {
    src: 'https://picsum.photos/id/678/2000',
    altText: 'Slide 3',
    key: 3,
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
        <img src={item.src} alt={item.altText}/>
      </CarouselItem>
    );
  });

  return (
    <main className='pt-0'>
      <Carousel
        activeIndex={activeIndex}
        next={next}
        previous={previous}
        interval={false}
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
    </main>
  )
}

export default Home