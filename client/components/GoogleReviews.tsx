import { Star } from "lucide-react";
import reviewsData from "@/data/reviews.json";
import siteConfig from "@/data/site.json";

const reviews = reviewsData.items;
const GOOGLE_REVIEWS_URL = siteConfig.googleReviewsUrl;

interface Props {
  /** Section background — use to keep section rhythm with neighboring sections */
  background?: "white" | "gray";
}

export const GoogleReviews = ({ background = "gray" }: Props) => {
  const bg = background === "white" ? "bg-white" : "bg-gray-50";

  return (
    <section className={`py-20 overflow-hidden ${bg}`}>
      <div className="max-w-6xl mx-auto px-4 mb-12">
        <div className="flex items-center justify-center gap-3 mb-4">
          <svg className="w-9 h-9" viewBox="0 0 48 48" aria-hidden="true">
            <path
              fill="#FFC107"
              d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"
            />
            <path
              fill="#FF3D00"
              d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z"
            />
            <path
              fill="#4CAF50"
              d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238C29.211 35.091 26.715 36 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"
            />
            <path
              fill="#1976D2"
              d="M43.611 20.083H42V20H24v8h11.303c-.792 2.237-2.231 4.166-4.087 5.571.001-.001.002-.001.003-.002l6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z"
            />
          </svg>
          <h2 className="text-4xl md:text-5xl font-bold text-center text-primary">
            Google Reviews
          </h2>
        </div>
        <div className="w-20 h-1 bg-accent mx-auto rounded-full mb-6" />
        <div className="flex items-center justify-center gap-2 text-gray-700 flex-wrap">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={18} className="fill-accent text-accent" />
            ))}
          </div>
          <span className="font-semibold">5.0</span>
          <span className="text-gray-500">·</span>
          <a
            href={GOOGLE_REVIEWS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline font-medium"
          >
            Read all reviews on Google
          </a>
        </div>
      </div>

      <div className="relative overflow-hidden">
        <div className="flex gap-8 animate-marquee-x">
          {[...reviews, ...reviews].map((review, idx) => (
            <div
              key={idx}
              className={`flex-shrink-0 w-[85vw] sm:w-[420px] rounded-lg p-8 shadow-md hover:shadow-lg transition-all ${
                background === "white" ? "bg-gray-50" : "bg-white"
              }`}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-semibold">
                  {review.author.charAt(0)}
                </div>
                <div>
                  <p className="font-semibold text-primary">{review.author}</p>
                  <p className="text-xs text-gray-500">{review.time}</p>
                </div>
              </div>
              <div className="flex gap-1 mb-3">
                {[...Array(review.rating)].map((_, i) => (
                  <Star
                    key={i}
                    size={18}
                    className="fill-accent text-accent"
                  />
                ))}
              </div>
              <p className="text-gray-700 italic">"{review.text}"</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
