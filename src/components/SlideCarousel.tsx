import { useState } from "react";

type SlideCarouselProps = {
  basePath: string;
  slideCount: number;
  imagePrefix?: string;
  imageExtension?: string;
  title?: string;
  description?: string;
};

const SlideCarousel = ({
  basePath,
  slideCount,
  imagePrefix = "Slide",
  imageExtension = "PNG",
  title,
  description,
}: SlideCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const previousSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const nextSlide = () => {
    if (currentIndex < slideCount - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const imageUrl = `${basePath}/${imagePrefix}${currentIndex + 1}.${imageExtension}`;

  return (
    <div className="w-full max-w-5xl mx-auto bg-[#111827] border border-gray-700 rounded-xl p-4 shadow-xl">
      {(title || description) && (
        <div className="mb-4">
          {title && <h2 className="text-2xl font-semibold text-white mb-2">{title}</h2>}
          {description && <p className="text-gray-300">{description}</p>}
        </div>
      )}

      <div className="relative">
        <img
          src={imageUrl}
          alt={`Slide ${currentIndex + 1}`}
          className="w-full h-auto rounded-lg border border-gray-600 object-contain"
        />

        {currentIndex > 0 && (
          <button
            type="button"
            onClick={previousSlide}
            className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-black/60 p-2 text-white hover:bg-black"
            aria-label="Previous slide"
          >
            ←
          </button>
        )}
        {currentIndex < slideCount - 1 && (
          <button
            type="button"
            onClick={nextSlide}
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-black/60 p-2 text-white hover:bg-black"
            aria-label="Next slide"
          >
            →
          </button>
        )}
      </div>

      <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <p className="text-gray-300">
          Slide {currentIndex + 1} of {slideCount}
        </p>
        <div className="flex items-center gap-2 overflow-x-auto">
          {Array.from({ length: slideCount }).map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setCurrentIndex(index)}
              title={`Skip to slide ${index + 1}`}
              className={`h-3 w-3 rounded-full ${index === currentIndex ? "bg-blue-400" : "bg-gray-500 hover:bg-gray-400"} cursor-pointer`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SlideCarousel;
