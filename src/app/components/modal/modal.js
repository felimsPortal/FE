import React from "react";

const Modal = ({ isOpen, onClose, youtubeTrailerId }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-4xl black rounded-lg overflow-hidden shadow-xl transform transition-all relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute text-white top-6 right-5 hover:text-gray-900 text-3xl font-bold z-10"
        >
          X
        </button>

        <div className="p-4">
          <div
            className="relative"
            style={{ paddingBottom: "56.25%", height: 0 }}
          >
            <iframe
              className="absolute top-0 left-0 w-full h-full"
              src={`https://www.youtube.com/embed/${youtubeTrailerId}?autoplay=1`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      </div>
    </div>
    // <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
    //   <div className="bg-black rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full">
    //     <div className="flex justify-end p-2">
    //       <button className="text-black hover:text-gray-700" onClick={onClose}>
    //         &times; {/* Close button */}
    //       </button>
    //     </div>
    //     <div className="p-4">
    //       <iframe
    //         width="640" // Adjust the width here
    //         height="360" // Adjust the height here
    //         src={`https://www.youtube.com/embed/${youtubeTrailerId}?autoplay=1`}
    //         title="YouTube video player"
    //         frameBorder="0"
    //         allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    //         allowFullScreen
    //       />
    //     </div>
    //   </div>
    // </div>
  );
};

export default Modal;
