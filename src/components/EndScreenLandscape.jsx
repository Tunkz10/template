import React, { useState, useEffect } from "react";
import logoImg from "../assets/img/Logo.png";
import blastImg from "../assets/img/BLAST.png";
import ctaButtonImg from "../assets/img/CTA.png";

// Intro Text
import text1Img from "../assets/img/text_1.png";
import text2Img from "../assets/img/text_2.png";

// Combined Items Image (replaces individual products)
import itemsImg from "../assets/img/ITEMS.png";

const EndScreenLandscape = ({ showEndScreen }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [showText2, setShowText2] = useState(false);

  useEffect(() => {
    if (showEndScreen) {
      // Fade in screen content
      const timer = setTimeout(() => setIsVisible(true), 100);

      // Toggle between text1 and text2
      const textInterval = setInterval(() => {
        setShowText2((prev) => !prev);
      }, 2000);

      return () => {
        clearTimeout(timer);
        clearInterval(textInterval);
      };
    } else {
      setIsVisible(false);
      setShowText2(false);
    }
  }, [showEndScreen]);

  const handleClickAction = () => {
    if (window.mraid && window.mraid.open && typeof window.mraid.open === "function") {
      window.mraid.open();
    } else {
      window.open();
    }
  };

  if (!showEndScreen) return null;

  return (
    <div
      onClick={handleClickAction}
      className="landscape-only absolute inset-0 w-full h-full flex-row items-center justify-between overflow-hidden z-50 cursor-pointer"
    >
      {/* =========================================================
          LEFT SECTION (Logo & Text)
      ========================================================== */}
      <div
        className={`
          flex flex-col items-center justify-center 
          w-[45%] h-full px-4
          transition-all duration-700 ease-out
          ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"}
        `}
      >
        {/* Logo */}
        <img
          src={logoImg}
          alt="Particle Logo"
          className="
            w-[70%] max-w-[200px]
            min-[568px]:max-w-[180px]
            min-[667px]:max-w-[200px]
            min-[812px]:max-w-[240px]
            min-[1024px]:max-w-[280px]
            min-[1280px]:max-w-[320px]
            mb-4 min-[812px]:mb-6
          "
        />

        {/* Text Container */}
        <div className="relative 
          w-[90%] max-w-[280px] h-[80px]
          min-[568px]:max-w-[240px] min-[568px]:h-[70px]
          min-[667px]:max-w-[280px] min-[667px]:h-[80px]
          min-[812px]:max-w-[340px] min-[812px]:h-[100px]
          min-[1024px]:max-w-[400px] min-[1024px]:h-[120px]
          min-[1280px]:max-w-[480px] min-[1280px]:h-[140px]
          flex items-center justify-center"
        >
          {/* Text 1 */}
          <img
            src={text1Img}
            alt="Intro 1"
            className={`absolute inset-0 w-full h-full object-contain transition-all duration-700 ease-spring
              ${!showText2 
                ? "opacity-100 scale-110" 
                : "opacity-0 scale-90"
              }`}
          />

          {/* Text 2 */}
          <img
            src={text2Img}
            alt="Intro 2"
            className={`absolute inset-0 w-full h-full object-contain transition-all duration-700 ease-spring
              ${showText2 
                ? "opacity-100 scale-110" 
                : "opacity-0 scale-90"
              }`}
          />
        </div>
      </div>

      {/* =========================================================
          RIGHT SECTION (Podium, Items, Button)
      ========================================================== */}
      <div
        className={`
          flex flex-col items-center justify-center relative 
          w-[55%] h-full
          transition-all duration-700 ease-out delay-200
          ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"}
        `}
      >
        <div className="relative flex items-end justify-center w-full h-full">
          
          {/* Blast Background */}
          <img
            src={blastImg}
            alt="Blast Effect"
            className="absolute z-0 opacity-90 left-1/2 -translate-x-1/2
              w-[120%] max-w-[400px]
              min-[568px]:max-w-[320px]
              min-[667px]:max-w-[360px]
              min-[812px]:max-w-[420px]
              min-[1024px]:max-w-[500px]
              min-[1280px]:max-w-[600px]
              bottom-[30%]
              min-[812px]:bottom-[25%]
              min-[1024px]:bottom-[20%]
            "
          />

          {/* Items Container - No Podium/Garland */}
          {/* HOW TO MOVE ITEMS:
              1. To move HIGHER: Increase mb-[...] (e.g. mb-[15%]) OR add -mt-[5%]
              2. To move LOWER: Decrease mb-[...] (e.g. mb-[5%]) OR add mt-[5%]
          */}
          <div className="relative z-10 
            w-[90%] max-w-[320px]
            min-[568px]:max-w-[180px]
            min-[667px]:max-w-[320px]
            min-[812px]:max-w-[330px]
            min-[1024px]:max-w-[450px]
            min-[1280px]:max-w-[620px]
            flex justify-center items-center 
            
            /* ▼ EDIT THIS TO ADJUST VERTICAL POSITION ▼ */
            mb-[-2%]              /* Default Mobile Landscape */
            min-[1024px]:mb-[5%]  /* Desktop / Tablet Landscape */
          ">
            {/* ITEMS Image (Static - No Animation, No Podium) */}
            <img 
              src={itemsImg} 
              alt="Products"
              className={`w-full
                transition-all duration-700 ease-out delay-300
                ${isVisible ? "opacity-100 scale-100" : "opacity-0 scale-90"}
              `}
            />
          </div>

          {/* CTA Button */}
          {/* HOW TO MOVE BUTTON:
              1. To move HIGHER: Increase bottom-[...] (e.g. bottom-[10%])
              2. To move LOWER: Decrease bottom-[...] (e.g. bottom-[1%])
          */}
          <button
            className={`
              absolute z-50 pointer-events-none
              
              /* ▼ EDIT THIS TO ADJUST VERTICAL POSITION ▼ */
              bottom-[10%]                /* Default Mobile Landscape */
              min-[568px]:bottom-[15%]    /* Small Phones (iPhone SE Landscape) */
              min-[812px]:bottom-[15%]    /* Medium Phones */
              min-[1024px]:bottom-[18%]   /* Large Tablets/Desktop */
              
              transition-all duration-700 ease-out delay-500
              ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}
              hover:scale-105 active:scale-95
            `}
          >
            <img
              src={ctaButtonImg}
              alt="Shop Now"
              className="
                w-[120px]
                min-[568px]:w-[100px]
                min-[667px]:w-[120px]
                min-[812px]:w-[140px]
                min-[1024px]:w-[160px]
                min-[1280px]:w-[220px]
                drop-shadow-lg
              "
            />
          </button>
        </div>
      </div>

      <style>{`
        @keyframes heartbeat {
          0%, 100% { transform: scale(1); }
          14% { transform: scale(1.08); }
          28% { transform: scale(1); }
          42% { transform: scale(1.08); }
          70% { transform: scale(1); }
        }
        button {
          animation: heartbeat 1.5s ease-in-out infinite;
        }
        .ease-spring {
          transition-timing-function: cubic-bezier(0.34, 1.56, 0.64, 1);
        }
      `}</style>
    </div>
  );
};

export default EndScreenLandscape;