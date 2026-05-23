import React from "react";
import loadingVideo from "@/assets/logos/stalight loading animation.mp4";

export const LoadingScreen: React.FC = () => {
  return (
    <div className="fixed inset-0 z-50 bg-[#070514] flex items-center justify-center p-4">
      <div className="w-full max-w-xl mx-auto flex items-center justify-center">
        <video
          src={loadingVideo}
          autoPlay
          muted
          playsInline
          loop
          aria-label="Stalight loading animation"
          className="w-40 sm:w-64 md:w-80 lg:w-96 object-contain mx-auto"
        />
      </div>
    </div>
  );
};
