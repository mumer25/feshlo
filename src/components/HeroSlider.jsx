import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import Cover from '../assets/CoverPhotos/Cover-Main.webp';
import Cover1 from '../assets/Mens/CasualShirt2.webp';
import Cover2 from '../assets/CoverPhotos/Cover-2.webp';
import Cover4 from '../assets/Collections/Watches.webp';

const HeroSlider = () => {
  const [loaded, setLoaded] = useState({});

  const slides = [
    { id: 1, img: Cover, title: 'Casual Shirt', desc: 'Up to 50% off' },
    { id: 2, img: Cover1, title: 'Casual Shirt', desc: 'Up to 50% off' },
    { id: 3, img: Cover2, title: 'Formal Shirt', desc: 'Shop the latest trends' },
    { id: 5, img: Cover4, title: 'Watches', desc: 'Our most popular picks' },
  ];

  return (
    <div className="w-full h-[600px]">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000 }}
        loop
        className="h-full"
      >
        {slides.map(slide => (
          <SwiperSlide key={slide.id}>
            <div className="relative w-full h-full flex items-center justify-center">
              {/* Background image */}
              <img
                src={slide.img}
                alt={slide.title}
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
                  loaded[slide.id] ? 'opacity-100' : 'opacity-0'
                }`}
                onLoad={() => setLoaded(prev => ({ ...prev, [slide.id]: true }))}
              />

              {/* Skeleton placeholder */}
              {!loaded[slide.id] && (
                <div className="absolute inset-0 bg-gray-300 animate-pulse"></div>
              )}

              {/* Overlay Content */}
              <div className="relative z-10 bg-black/40 p-6 rounded text-center text-white">
                <h2 className="text-4xl font-bold">{slide.title}</h2>
                <p className="mt-2">{slide.desc}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HeroSlider;




// import React from 'react';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import { Navigation, Pagination, Autoplay } from 'swiper/modules';
// import 'swiper/css';
// import 'swiper/css/navigation';
// import 'swiper/css/pagination';

// // Images
// import Cover1 from '../assets/Cover1.png';
// import Cover2 from '../assets/Cover2.png';
// import Cover3 from '../assets/Cover3.png';
// import Cover4 from '../assets/Cover4.png';




// const HeroSlider = () => {
//   const slides = [
//     {
//       id: 1,
//       img: Cover1,
//       title: 'Big Sale',
//       desc: 'Up to 50% off on all products'
//     },
//     {
//       id: 2,
//       img: Cover2,
//       title: 'New Arrivals',
//       desc: 'Shop the latest trends'
//     },
//     {
//       id: 3,
//       img: Cover3,
//       title: 'Best Sellers',
//       desc: 'Our most popular picks'
//     },
//       {
//       id: 4,
//       img: Cover4,
//       title: 'Best Sellers',
//       desc: 'Our most popular picks'
//     }
//   ];

//   return (
//     <div className="w-full h-[500px]">
//       <Swiper
//         modules={[Navigation, Pagination, Autoplay]}
//         navigation
//         pagination={{ clickable: true }}
//         autoplay={{ delay: 3000 }}
//         loop={true}
//         className="h-full"
//       >
//         {slides.map(slide => (
//           <SwiperSlide key={slide.id}>
//             <div
//               className="w-full h-full bg-gray-300 bg-cover bg-center flex items-center justify-center text-white"
//               style={{ backgroundImage: `url(${slide.img})` }}
//             >
//               <div className="bg-black/40 p-6 rounded text-center">
//                 <h2 className="text-4xl font-bold">{slide.title}</h2>
//                 <p className="mt-2">{slide.desc}</p>
//               </div>
//             </div>
//           </SwiperSlide>
//         ))}
//       </Swiper>
//     </div>
//   );
// };

// export default HeroSlider;
