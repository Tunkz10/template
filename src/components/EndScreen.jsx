import React, { useState, useEffect } from "react";
import logoImg from "../assets/img/Logo.png";
import blastImg from "../assets/img/BLAST.png";
import itemsImg from "../assets/img/ITEMS.png";
import text1Img from "../assets/img/text_1.png";
import text2Img from "../assets/img/text_2.png";
import ctaButtonImg from "../assets/img/CTA.png";

const EndScreen = ({ showEndScreen }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [showText2, setShowText2] = useState(false);

  useEffect(() => {
    // Trigger entrance animations after showEndScreen becomes true
    if (showEndScreen) {
      const timer = setTimeout(() => setIsVisible(true), 100);
      return () => clearTimeout(timer);
    } else {
      setIsVisible(false);
    }
  }, [showEndScreen]);

  useEffect(() => {
    // Loop text animation: switch between text1 and text2 every 2 seconds
    if (showEndScreen) {
      const interval = setInterval(() => {
        setShowText2((prev) => !prev);
      }, 2000);
      
      return () => clearInterval(interval);
    }
  }, [showEndScreen]);

  const handleClickAction = () => {
    if (window.mraid && window.mraid.open && typeof window.mraid.open === "function") {
      window.mraid.open();
    } else {
      window.open();
    }
  };

  // Don't render anything if showEndScreen is false
  if (!showEndScreen) return null;

  return (
    // --- MAIN WRAPPER: Added onClick and cursor-pointer here ---
    <div 
      onClick={handleClickAction}
      className="absolute inset-0 w-full h-full flex flex-col landscape:flex-row items-center justify-between overflow-hidden z-50 cursor-pointer"
    >
      
      {/* =========================================================
          LEFT SECTION (Portrait Top / Landscape Left)
          Contains: Logo & Text
      ========================================================== */}
      <div
        className={`
          flex flex-col items-center justify-start pt-[16%]
          landscape:w-1/2 landscape:h-full landscape:justify-center landscape:pt-0 landscape:gap-4
          transition-all duration-700 ease-out
          ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}
        `}
      >
        {/* Logo */}
        <img
          src={logoImg}
          alt="Particle Logo"
          className="w-[60%] max-w-[440px] sm:w-[65%] sm:max-w-[300px] md:w-[70%] md:max-w-[350px] 
          landscape:w-[50%] landscape:max-w-[200px] 
          landscape:sm:w-[55%] landscape:sm:max-w-[240px]
          landscape:md:w-[60%] landscape:md:max-w-[280px]
          landscape:lg:w-[65%] landscape:lg:max-w-[320px]
          mb-6 landscape:mb-4"
        />

       {/* Text container with crossfade animation */}
      <div className="relative 
        /* --- MOVE HIGHER SETTINGS --- */
        -mt-[2rem]           /* Mobile Portrait: Moves up 20px */
        sm:-mt-[30px]        /* Tablet: Moves up 30px */
        md:-mt-[-.5rem]       /* Larger Screens: Moves up 40px */
        landscape:-mt-[10px] /* Landscape: Moves up 10px */
        
        /* --- SIZING --- */
        w-[80%] max-w-[680px] sm:w-[90%] sm:max-w-[400px] md:w-[95%] md:max-w-[480px] 
        landscape:w-[70%] landscape:max-w-[280px]
        landscape:sm:w-[75%] landscape:sm:max-w-[320px]
        landscape:md:w-[80%] landscape:md:max-w-[360px]
        landscape:lg:w-[85%] landscape:lg:max-w-[400px]
        h-[160px] sm:h-[100px] md:h-[120px] 
        landscape:h-[70px]
        landscape:sm:h-[80px]
        landscape:md:h-[90px]
        landscape:lg:h-[100px]">
          
         {/* Text 1 */}
          <img
            src={text1Img}
            alt="Promo Text 1"
            className={`
              absolute inset-0 w-full h-full object-contain
              transition-all duration-1000 ease-in-out
              
              /* --- NEW FIX IS HERE --- */
              /* 1. Move UP on mobile */
              -mt-[-.2rem] 
              /* 2. Reset to normal on Tablet (sm) and up */
              sm:mt-0
              
              ${!showText2 ? "opacity-100 scale-100 md:scale-125 rotate-0" : "opacity-0 scale-90 -rotate-3"}
            `}
          />
          {/* Text 2 - positioned absolute to overlap */}
          <img
            src={text2Img}
            alt="Promo Text 2"
            className={`
              absolute inset-0 w-full h-full object-contain
              transition-all duration-1000 ease-in-out
              ${showText2 ? "opacity-100 scale-100 rotate-0" : "opacity-0 scale-90 rotate-3"}
            `}
          />
      </div>
      </div>

      {/* =========================================================
          RIGHT SECTION (Portrait Bottom / Landscape Right)
          Contains: Blast, Items, Button
      ========================================================== */}
      <div
        className={`
          flex flex-col items-center relative w-full
          /* Portrait alignment */
          justify-end pb-[2%] sm:pb-[3%] md:pb-[4%] lg:pb-[5%]
          
          /* Landscape alignment */
          landscape:w-1/2 landscape:h-full 
          landscape:justify-center
          
          transition-all duration-700 ease-out delay-200
          ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}
        `}
      >
        {/* Container for bottom elements */}
        <div className="relative flex items-end justify-center w-full landscape:items-end
          /* Global Landscape Vertical Nudge */
          landscape:translate-y-[10vh]
          landscape:sm:translate-y-[12vh]
          landscape:md:translate-y-[15vh]
          landscape:lg:translate-y-[18vh]
        "
        >
          {/* 1. Blast Background */}
          <img
            src={blastImg}
            alt="Blast Effect"
            className="absolute z-0 opacity-90
            
            /* --- HORIZONTAL CENTERING (Locks it behind items) --- */
            left-1/2 -translate-x-1/2

            /* --- SIZING --- */
            w-[110%] max-w-[450px]
            md:w-[100%] md:max-w-[650px]
            landscape:w-[100%] landscape:max-w-[50rem]
            
            /* --- VERTICAL POSITIONING (Adjust these to move up/down) --- */
            
            /* Mobile Portrait */
            bottom-[50%] 

            /* Tablet Portrait (iPad) */
            md:bottom-[55%]

            /* Landscape (All sizes) */
            landscape:bottom-[55%]
            "
          />

          {/* 2. Items (Products) */}
         {/* ITEM IMAGE */}
          <img
            src={itemsImg}
            alt="Products"
            className="relative z-10
            
            /* --- PORTRAIT SIZE (UPDATED) --- */
            /* 1. Base size: allow full width, limit max size to avoid pixelation */
            w-full max-w-[600px]
            
            /* 2. Big Phones (iPhone Pro Max / Samsung Ultra): 
               Previously restricted to 360px. Now increased to 480px. */
            min-[390px]:max-w-[480px]
            
            /* 3. Tablets: Keep them controlled so they don't cover the buttons */
            sm:w-[85%] sm:max-w-[520px]
            md:w-[80%] md:max-w-[620px]

            /* --- LANDSCAPE SIZE (UNCHANGED) --- */
            landscape:w-[75%]    landscape:max-w-[180px]
            landscape:sm:w-[90%]  landscape:sm:max-w-[320px]
            landscape:md:w-[160%]  landscape:md:max-w-[320px]
            landscape:lg:w-[100%] landscape:lg:max-w-[500px]
            landscape:xl:w-[205%] landscape:xl:max-w-[650px]

            landscape:translate-y-[0px]
            landscape:sm:translate-y-[-20px]
            landscape:md:translate-y-[-1rem]
            "
          />

          {/* 3. CTA Button (Visual only, removed onClick since parent handles it) */}
          <button
            className={`
                absolute z-600
                pointer-events-none /* Ensures click passes through to parent wrapper if needed, though parent captures bubbling anyway */
                
                /* Mobile Portrait */
                bottom-[10%] 
                
                /* iPad / Tablet Portrait (768px+) */
                md:bottom-[13%] 
                
                /* Desktop / Large Screens (1024px+) */
                lg:bottom-[14%]

                /* Landscape Mode */
                landscape:bottom-[12%]
                landscape:sm:bottom-[17%]
                landscape:md:bottom-[20%]
                landscape:lg:bottom-[15%]
                landscape:xl:bottom-[23%]

                transition-all duration-700 ease-out delay-400
                ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}
                hover:scale-105 active:scale-95
                animate-pulse
            `}
            >
            <img
                src={ctaButtonImg}
                alt="Shop Now"
                className="w-[180px] sm:w-[220px] md:w-[260px] 
                landscape:w-[120px]
                landscape:sm:w-[140px]
                landscape:md:w-[130px]
                landscape:lg:w-[190px]
                max-w-full drop-shadow-lg"
            />
            </button>
        </div>
      </div>

      {/* Custom keyframe styles for heartbeat */}
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
        button:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
};

export default EndScreen;