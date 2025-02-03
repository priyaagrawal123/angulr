import React from "react";

const SkeletonCard = () => {
  return (
    <div className="p-4 bg-gray-200 animate-pulse rounded-md shadow border border-gray-300">
      <div className="h-6 bg-gray-300 rounded w-3/4 mb-4"></div>
      <div className="h-4 bg-gray-300 rounded w-1/2 mb-2"></div>
      <div className="h-4 bg-gray-300 rounded w-1/3"></div>
    </div>
  );
};

export default SkeletonCard;
