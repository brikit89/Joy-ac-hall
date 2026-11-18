import { useEffect, useState } from "react";

type GallerySectionProps = {
  title: string;
  description: string;
  images: string[];
};

export default function GallerySection({
  title,
  description,
  images,
}: GallerySectionProps) {
  const [activeImage, setActiveImage] = useState<number | null>(null);

  useEffect(() => {
    if (activeImage === null) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActiveImage(null);
      if (event.key === "ArrowRight") {
        setActiveImage((current) =>
          current === null ? null : (current + 1) % images.length,
        );
      }
      if (event.key === "ArrowLeft") {
        setActiveImage((current) =>
          current === null ? null : (current - 1 + images.length) % images.length,
        );
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [activeImage, images.length]);

  return (
    <section id="gallery" aria-labelledby="photo-gallery-title" className="px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <header className="mx-auto mb-8 max-w-2xl text-center">
        <h2 className="text-4xl md:text-4xl text-center font-bold text-primary mb-4">
              {title}
            </h2>
            <div className="w-20 h-1 bg-accent rounded-full mb-6 mx-auto" />
          <p className="mt-3 text-base leading-7 text-gray-600">{description}</p>
        </header>

        {images.length > 0 ? (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
            {images.map((src, index) => (
              <button
                key={`${src}-${index}`}
                type="button"
                onClick={() => setActiveImage(index)}
                aria-label={`Open gallery photo ${index + 1} of ${images.length}`}
                className={`group overflow-hidden rounded-xl bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black ${index === 0 ? "col-span-2 row-span-2" : ""}`}
              >
                <img
                  src={src}
                  alt={`SHA Stays property photo ${index + 1}`}
                  loading={index < 2 ? "eager" : "lazy"}
                  decoding="async"
                  className="h-full min-h-40 w-full object-cover transition duration-300 group-hover:scale-105 sm:min-h-52"
                />
              </button>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600">Gallery photos will be added soon.</p>
        )}
      </div>

      {activeImage !== null && images[activeImage] && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Photo gallery lightbox"
          onClick={() => setActiveImage(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
        >
          <button
            type="button"
            aria-label="Close photo"
            onClick={() => setActiveImage(null)}
            className="absolute right-4 top-4 rounded-full bg-black/50 px-4 py-2 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
          >
            Close
          </button>
          <button
            type="button"
            aria-label="Previous photo"
            onClick={(event) => {
              event.stopPropagation();
              setActiveImage((activeImage - 1 + images.length) % images.length);
            }}
            className="absolute left-3 rounded-full bg-black/50 px-4 py-3 text-2xl text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
          >
            ‹
          </button>
          <img
            src={images[activeImage]}
            alt={`SHA Stays property photo ${activeImage + 1}`}
            onClick={(event) => event.stopPropagation()}
            className="max-h-[85vh] max-w-[90vw] rounded-lg object-contain"
          />
          <button
            type="button"
            aria-label="Next photo"
            onClick={(event) => {
              event.stopPropagation();
              setActiveImage((activeImage + 1) % images.length);
            }}
            className="absolute right-3 rounded-full bg-black/50 px-4 py-3 text-2xl text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
          >
            ›
          </button>
        </div>
      )}
    </section>
  );
}
