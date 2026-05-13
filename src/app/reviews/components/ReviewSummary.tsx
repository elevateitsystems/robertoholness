"use client";

import { Star } from "lucide-react";

interface ReviewSummaryProps {
  averageRating: number;
  totalRatings: number;
  distribution: { stars: number; count: string; percentage: number }[];
  subScores: { label: string; score: number }[];
}

export function ReviewSummary({
  averageRating,
  totalRatings,
  distribution,
  subScores,
}: ReviewSummaryProps) {
  return (
    <div className="bg-white rounded-[5px] shadow-sm border border-black/5 p-8 md:p-12">
      <div className="space-y-6">
        {/* Main Score */}
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left lg:w-48">
          <span className="text-5xl md:text-6xl font-bold text-secondary mb-2">
            {averageRating.toFixed(1)}
          </span>
          <div className="flex gap-0.5 mb-2 text-primary">
            {[1, 2, 3, 4].map((s) => (
              <Star key={s} size={20} fill="currentColor" />
            ))}
            <Star size={20} className="text-secondary/20" />
          </div>
          <span className="text-secondary/60 text-sm font-medium">
            {totalRatings.toLocaleString()} ratings
          </span>
        </div>

        {/* Distribution Bars */}
        <div className="space-y-3">
          {distribution.map((d) => (
            <div key={d.stars} className="flex items-center gap-4">
              <span className="text-sm font-bold text-secondary/80 w-6">
                {d.stars.toFixed(1)}
              </span>
              <div className="w-60 h-2.5 bg-black/5 rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary"
                  style={{ width: `${d.percentage}%` }}
                />
              </div>
              <span className="text-xs font-bold text-secondary/60 w-20 text-right">
                {d.count} reviews
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Sub-scores */}
      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-3">
        {subScores.map((s) => (
          <div
            key={s.label}
            className="flex-1 flex items-center gap-2 px-4 py-2 bg-background border border-black/5 rounded-lg"
          >
            <span className="text-sm font-bold text-accent-green">
              {s.score.toFixed(1)}
            </span>
            <span className="text-xs font-medium text-secondary/70">
              {s.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
