import React from "react";

interface SkeletonProps {
  type: "preview" | "table" | "grid" | "banner";
}

export function Skeleton({ type }: SkeletonProps) {
  return (
    <div className="space-y-8 animate-pulse">
      {/* Page Header Skeleton */}
      <div className="space-y-3">
        <div className="h-8 bg-gray-200 rounded-md w-1/3" />
        <div className="h-4 bg-gray-200 rounded-md w-2/3" />
      </div>

      {type === "preview" && (
        <div className="bg-gray-100 p-8 rounded-xl border border-gray-200 shadow-sm space-y-6">
          <div className="flex justify-between items-center">
            <div className="h-4 bg-gray-200 rounded w-24" />
            <div className="h-4 bg-gray-200 rounded w-36" />
          </div>
          <div className="bg-white rounded-xl shadow-lg p-8 sm:p-12 flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1 space-y-6 w-full">
              <div className="h-10 bg-gray-200 rounded-md w-3/4" />
              <div className="h-10 bg-gray-200 rounded-md w-1/2" />
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded w-full" />
                <div className="h-4 bg-gray-200 rounded w-5/6" />
                <div className="h-4 bg-gray-200 rounded w-4/5" />
              </div>
              <div className="flex gap-4">
                <div className="h-12 bg-gray-200 rounded-md w-32" />
                <div className="h-12 bg-gray-200 rounded-md w-32" />
              </div>
            </div>
            <div className="flex-1 w-full flex justify-center">
              <div className="aspect-square bg-gray-200 rounded-xl w-72 sm:w-80 shadow-md" />
            </div>
          </div>
        </div>
      )}

      {type === "banner" && (
        <div className="bg-gray-100 p-8 rounded-xl border border-gray-200 shadow-sm space-y-6">
          <div className="flex justify-between items-center">
            <div className="h-4 bg-gray-200 rounded w-24" />
            <div className="h-4 bg-gray-200 rounded w-36" />
          </div>
          <div className="bg-white rounded-xl shadow-md p-16 flex flex-col items-center space-y-6">
            <div className="h-4 bg-gray-200 rounded w-16" />
            <div className="h-6 bg-gray-200 rounded w-32" />
            <div className="h-10 bg-gray-200 rounded w-1/2" />
            <div className="space-y-2 w-2/3">
              <div className="h-4 bg-gray-200 rounded w-full" />
              <div className="h-4 bg-gray-200 rounded w-5/6" />
            </div>
          </div>
        </div>
      )}

      {type === "table" && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-6 border-b border-gray-100 flex justify-between items-center">
            <div className="h-6 bg-gray-200 rounded w-32" />
            <div className="h-10 bg-gray-200 rounded-md w-28" />
          </div>
          <div className="p-6 space-y-4">
            <div className="flex gap-4 border-b border-gray-100 pb-4">
              <div className="h-4 bg-gray-200 rounded w-1/4" />
              <div className="h-4 bg-gray-200 rounded w-1/4" />
              <div className="h-4 bg-gray-200 rounded w-1/4" />
              <div className="h-4 bg-gray-200 rounded w-1/4" />
            </div>
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex gap-4 items-center py-2">
                <div className="h-8 bg-gray-200 rounded-md w-8" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-1/3" />
                  <div className="h-3 bg-gray-200 rounded w-1/2" />
                </div>
                <div className="h-4 bg-gray-200 rounded w-20" />
                <div className="h-4 bg-gray-200 rounded w-16" />
                <div className="flex gap-2">
                  <div className="h-8 bg-gray-200 rounded w-12" />
                  <div className="h-8 bg-gray-200 rounded w-12" />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {type === "grid" && (
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {[...Array(10)].map((_, i) => (
              <div key={i} className="aspect-square bg-gray-200 rounded-lg shadow-sm" />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
