import { Star } from "lucide-react";

interface Review {
  name: string;
  role: string;
  institution: string;
  text: string;
  rating: number;
}

const ReviewsCarousel = ({ reviews, variant = "light" }: { reviews: Review[]; variant?: "light" | "dark" }) => {
  const isDark = variant === "dark";

  return (
    <div className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide"
      style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
    >
      {reviews.map((r, i) => (
        <div
          key={i}
          className={`reveal reveal-delay-${i % 5} snap-center shrink-0 w-[340px] p-6 rounded-sm border transition-all duration-300 hover:translate-y-[-6px] hover:shadow-xl ${
            isDark
              ? "bg-navy-light/50 border-primary-foreground/10 hover:border-copper/30"
              : "bg-background border-border hover:border-copper/30"
          }`}
        >
          <div className="flex gap-1 mb-4">
            {Array.from({ length: 5 }).map((_, s) => (
              <Star
                key={s}
                size={14}
                className={s < r.rating ? "text-copper fill-copper" : isDark ? "text-primary-foreground/20" : "text-border"}
              />
            ))}
          </div>
          <p className={`font-sans text-sm leading-relaxed mb-5 italic ${isDark ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
            "{r.text}"
          </p>
          <div className="border-t pt-4 border-border/30">
            <p className={`font-sans text-sm font-semibold ${isDark ? "text-primary-foreground" : "text-foreground"}`}>
              {r.name}
            </p>
            <p className={`font-sans text-xs ${isDark ? "text-primary-foreground/50" : "text-muted-foreground"}`}>
              {r.role} · {r.institution}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ReviewsCarousel;
