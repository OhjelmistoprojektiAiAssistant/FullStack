'use client';
import React from 'react';

export type Review = {
  id: string;
  quote: string;
  name: string;
  role?: string;
  rating?: number; // 1–5
};

type Props = {
  title?: string;
  subtitle?: string;
  reviews: Review[];
  className?: string;
};

const Star: React.FC<{ filled?: boolean; className?: string }> = ({ filled, className }) => (
  <svg
    viewBox="0 0 20 20"
    aria-hidden="true"
    className={className ?? 'h-5 w-5'}
  >
    <path
      d="M10 1.7l2.47 5.01 5.53.8-4 3.9.95 5.53L10 14.9l-4.95 2.94.95-5.53-4-3.9 5.53-.8L10 1.7z"
      fill={filled ? 'currentColor' : 'none'}
      stroke="currentColor"
      strokeWidth="1.2"
    />
  </svg>
);

const Stars: React.FC<{ value?: number; outOf?: number }> = ({ value = 5, outOf = 5 }) => {
  const stars = Array.from({ length: outOf }, (_, i) => i < value);
  return (
    <div className="flex items-center gap-1 text-yellow-400" aria-label={`${value} out of ${outOf} stars`}>
      {stars.map((filled, i) => (
        <Star key={i} filled={filled} />
      ))}
    </div>
  );
};

const ReviewCard: React.FC<{ review: Review }> = ({ review }) => (
  <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
    <Stars value={review.rating ?? 5} />
    <p className="mt-3 text-slate-700 italic">&quot;{review.quote}&quot;</p>
    <div className="mt-5">
      <p className="font-semibold text-slate-900">{review.name}</p>
      {review.role && <p className="text-sm text-slate-500">{review.role}</p>}
    </div>
  </article>
);

const Testimonials: React.FC<Props> = ({
  title = 'Loved by job seekers',
  subtitle = 'See how AI Career Assistant has helped people land their dream jobs.',
  reviews,
  className,
}) => {
  return (
    <section className={['w-full bg-slate-50 py-14', className].filter(Boolean).join(' ')}>
      <div className="mx-auto max-w-6xl px-4">
        <header className="text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">{title}</h2>
          <p className="mt-2 text-slate-600">{subtitle}</p>
        </header>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {reviews.map((r) => (
            <ReviewCard key={r.id} review={r} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
