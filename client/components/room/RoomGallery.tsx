
"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface Props {
  sectionID?: string;
  title?: string;
  images: string[];
  videos?: string[];
}

export const RoomGallery = ({
  sectionID = "gallery",
  title = "Our Gallery",
  images,
  videos = [],
}: Props) => {
  const totalMedia = [
    ...images.map((src) => ({ src, type: "image" })),
    ...videos.map((src) => ({ src, type: "video" })),
  ];

  if (totalMedia.length === 0) return null;

  return (
    <section id={sectionID} className="py-5 px-4 bg-white">
      <div className="max-w-7xl mx-auto">

        <h2 className="text-4xl md:text-5xl font-bold text-center text-primary mb-4">
          {title}
        </h2>

        <div className="w-20 h-1 bg-accent mx-auto rounded-full mb-12" />

        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={20}
          slidesPerView={3}
          pagination={{ clickable: true }}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          loop={totalMedia.length > 3}
          breakpoints={{
            640: {
              slidesPerView: 2,
            },
            1024: { 
              slidesPerView: 3,
            },
          }}
        >
          {totalMedia.map((media, index) => (
            <SwiperSlide key={`${media.type}-${index}`}>
              <div className="aspect-[4/3] overflow-hidden rounded-xl shadow-lg">

                {media.type === "video" ? (
                  <video
                    src={media.src}
                    controls
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <img
                    src={media.src}
                    alt={`${title} - Image ${index + 1}`}
                    loading="lazy"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                )}

              </div>
            </SwiperSlide>
          ))}
        </Swiper>

      </div>
    </section>
  );
};
