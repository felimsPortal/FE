"use client";

import React, { useEffect, useRef, useState } from "react";
import Script from "next/script";

const Player = ({ id }) => {
  const playerRef = useRef(null);
  const [isPlayerLoaded, setIsPlayerLoaded] = useState(true);

  useEffect(() => {
    if (isPlayerLoaded && playerRef.current) {
      try {
        new window.Playerjs({
          id: playerRef.current.id,
        });
      } catch (error) {
        console.error("Error initializing Playerjs:", error);
      }
    }
  }, []);

  return (
    <div>
      <Script
        src="./playerScript.js" // Path to the locally hosted script
        type="text/javascript"
        async
        onLoad={() => setIsPlayerLoaded(true)}
        onError={() => console.error("Failed to load Playerjs script")}
      />
      <div id={id} ref={playerRef} className="w-full h-full" />
    </div>
  );
};

export default Player;
