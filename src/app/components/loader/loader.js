import React from "react";

const Loader = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <video className="w-80 h-80" autoPlay muted loop>
        <source src="/Comp 1.mp4" type="video/mp4" />
        {/* Fallback content if the video can't be loaded */}
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default Loader;
