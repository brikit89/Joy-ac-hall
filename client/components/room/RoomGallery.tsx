import { useState } from "react";

interface Props {
  sectionID?: string;
  title?: string;
  images: string[];
  videos?: string[];
}

export const RoomGallery = ({
  sectionID="gallery",
  title,
  images,
  videos = [],
}: Props) => {
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);

  const totalMedia = images.length + videos.length;

  const isVideo = currentMediaIndex >= images.length;

  const mediaIndex = isVideo
    ? currentMediaIndex - images.length
    : currentMediaIndex;

  if (totalMedia === 0) {
    return null;
  }

  return (
    <section id={sectionID} className="py-20 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center text-primary mb-4">
          {title}
        </h2>

        <div className="w-20 h-1 bg-accent mx-auto rounded-full mb-12" />

        <div className="relative aspect-[4/3] w-full max-w-3xl mx-auto flex items-center justify-center group rounded-lg overflow-hidden">
          {isVideo ? (
            <video
              key={`v-${mediaIndex}`}
              src={videos[mediaIndex]}
              controls
              className="w-full h-full max-w-full object-cover"
            />
          ) : (
            <img
              src={images[mediaIndex]}
              alt={`${title} - Image ${mediaIndex + 1}`}
              className="w-full h-full max-w-full object-cover"
            />
          )}

          {totalMedia > 1 && (
            <>
              <button
                onClick={() =>
                  setCurrentMediaIndex((prev) =>
                    prev === 0 ? totalMedia - 1 : prev - 1,
                  )
                }
                className="absolute left-4 bg-white/80 hover:bg-white p-2 rounded-full transition-all"
                aria-label="Previous media"
              >
                <svg
                  className="w-6 h-6 text-primary"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>

              <button
                onClick={() =>
                  setCurrentMediaIndex((prev) =>
                    prev === totalMedia - 1 ? 0 : prev + 1,
                  )
                }
                className="absolute right-4 bg-white/80 hover:bg-white p-2 rounded-full transition-all"
                aria-label="Next media"
              >
                <svg
                  className="w-6 h-6 text-primary"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </>
          )}

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white px-4 py-2 rounded-full text-sm">
            {currentMediaIndex + 1} / {totalMedia}
          </div>
        </div>
      </div>
    </section>
  );
};