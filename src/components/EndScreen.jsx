import React, { useState, useEffect } from "react";
// Import your Landscape Component
import EndScreenLandscape from "./EndScreenLandscape"; 

import logoImg from "../assets/img/Logo.png";
import blastImg from "../assets/img/BLAST.png";
import ctaButtonImg from "../assets/img/CTA.png";

// Original Intro Text
import text1Img from "../assets/img/text_1.png";
import text2Img from "../assets/img/text_2.png";

// Product Sequence Text
import text1st from "../assets/img/1st.png";
import text2nd from "../assets/img/2nd.png";
import text3rd from "../assets/img/3rd.png";
import text4th from "../assets/img/4th.png";

// Products
import prod1 from "../assets/img/1.png";
import prod2 from "../assets/img/2.png";
import prod3 from "../assets/img/3.png";
import prod4 from "../assets/img/4.png";

// Decor
import podiumImg from "../assets/img/podium with back garland.png";
import garlandImg from "../assets/img/GARLAND.png";

const EndScreen = ({ showEndScreen }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [phase, setPhase] = useState('intro');
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (showEndScreen) {
      const timer = setTimeout(() => setIsVisible(true), 100);
      const startTimer = setTimeout(() => {
        setPhase('products');
      }, 500);

      return () => {
        clearTimeout(timer);
        clearTimeout(startTimer);
      };
    } else {
      setIsVisible(false);
      setPhase('intro');
      setStep(0);
    }
  }, [showEndScreen]);

  // Loop Logic: 1->2->3->4->5->6 (Loop back to 1)
  useEffect(() => {
    if (phase === 'products') {
      if (step === 0) setStep(1);
      const productInterval = setInterval(() => {
        setStep((prev) => (prev < 6 ? prev + 1 : 1));
      }, 1400);
      return () => clearInterval(productInterval);
    }
  }, [phase, step]);

  const handleClickAction = () => {
    if (window.mraid && window.mraid.open && typeof window.mraid.open === "function") {
      window.mraid.open();
    } else {
      window.open();
    }
  };

  // Helper to generate text classes
  const getTextClass = (activeStep) => {
    const isActive = step === activeStep;
    return `absolute inset-0 w-full h-full object-contain transition-all duration-700 ease-spring 
      ${isActive ? "opacity-100 scale-125 -translate-y-2" : "opacity-0 scale-90 translate-y-4"}`;
  };

  if (!showEndScreen) return null;

  return (
    <>
      {/* =================================================================
          LANDSCAPE VIEW
      ================================================================== */}
      <div className="landscape-only w-full h-full absolute inset-0 z-50">
        <EndScreenLandscape showEndScreen={showEndScreen} />
      </div>

      {/* =================================================================
          PORTRAIT VIEW
      ================================================================== */}
      <div
        onClick={handleClickAction}
        className="portrait-only absolute inset-0 w-full h-full flex-col items-center justify-between overflow-hidden z-50 cursor-pointer bg-white/0"
      >
        
        {/* =========================================================
            TOP SECTION (Logo & Text)
        ========================================================== */}
        <div
          className={`flex flex-col items-center justify-start pt-[15%] md:pt-[15%] w-full transition-all duration-700 ease-out 
          ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          {/* Logo */}
          <img
            src={logoImg}
            alt="Particle Logo"
            className="w-[65%] sm:w-[65%] md:w-[50%] mb-10 md:mb-[5rem] drop-shadow-sm"
          />

          {/* TEXT CONTAINER
             iPad Adjustment: md:w-[60%] (Slightly narrower on tablets for cleaner look)
          */}
          <div className="relative w-[75%] min-[400px]:w-[75%] md:w-[45%] mt-[-2rem] h-[180px] flex items-center justify-center">
            {phase === 'products' && (
              <>
                <img src={text1Img} alt="Text 1" className={getTextClass(1)} />
                <img src={text2Img} alt="Text 2" className={getTextClass(2)} />
                <img src={text1st} alt="Text Prod 1" className={getTextClass(3)} />
                <img src={text2nd} alt="Text Prod 2" className={getTextClass(4)} />
                <img src={text4th} alt="Text Prod 4" className={getTextClass(5)} />
                <img src={text3rd} alt="Text Prod 3" className={getTextClass(6)} />
              </>
            )}
          </div>
        </div>

        {/* =========================================================
            BOTTOM SECTION (Podium, Products, CTA)
        ========================================================== */}
        <div
          className={`relative w-full flex flex-col items-center justify-end pb-[10%] md:pb-[11%] transition-all duration-700 ease-out delay-200
          ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          
          {/* Blast Background */}
          <img
            src={blastImg}
            alt="Blast"
            className="absolute z-0 w-[120%] bottom-[15%] opacity-90 animate-pulse-slow"
          />

          {/* PODIUM GROUP CONTAINER 
              iPad Adjustment: md:w-[70%] (Prevents podium from being too huge on tablets)
          */}
          <div className="relative z-10 w-[85%] md:w-[70%] flex flex-col items-center justify-end">
            
            {/* Garland */}
            <img
              src={garlandImg}
              alt="Garland"
              className="absolute z-60 w-[105%] -left-[2%] bottom-[30%]"
            />

            {/* Podium Base */}
            <img
              src={podiumImg}
              alt="Podium"
              className="relative z-10 w-full"
            />

            {/* --- PRODUCTS CONTAINER --- */}
            <div className="absolute inset-0 w-full h-full z-30">
              
              {/* PRODUCT 1: Shampoo (Left Back) */}
              <img
                src={prod1}
                alt="Prod 1"
                className={`transition-all duration-1000 ease-spring
                  ${step === 3 
                    ? // === ACTIVE STATE ===
                      "fixed z-50 left-1/2 -translate-x-1/2 " + 
                      // 1. Base Mobile
                      "bottom-[18rem] w-[25%] scale-90 " + 

                       "min-[300px]:bottom-[25rem] min-[400px]:scale-100 " +
                      // 2. Large Phone
                       "min-[390px]:bottom-[28rem] min-[400px]:scale-110 " +
                      // 3. iPAD / TABLET (md:) <--- NEW
                      "md:bottom-[26rem] md:w-[18%] md:scale-110 " +
                      // 4. Desktop (sm/lg logic)
                      "sm:bottom-[25rem] sm:w-[20%] sm:scale-125"
                    : // === RESTING STATE ===
                      "absolute z-10 bottom-[64%] left-[8%] w-[25%] grayscale-[30%]" 
                  }
                  ${step > 3 ? "grayscale-0" : ""} 
                `}
              />

              {/* PRODUCT 2: Perfume (Center Top) */}
              <img
                src={prod2}
                alt="Prod 2"
                className={`transition-all duration-1000 ease-spring
                  ${step === 4 
                    ? // === ACTIVE STATE ===
                      "fixed z-50 left-1/2 -translate-x-1/2 " +
                      // 1. Base Mobile
                      "bottom-[20rem] w-[45%] scale-90 " +

                      "min-[320px]:bottom-[15rem] min-[400px]:scale-100 " +
                      // 2. Large Phone
                       "min-[390px]:bottom-[25rem] min-[400px]:scale-90 " +
                      // 3. iPAD / TABLET (md:) <--- NEW
                      "md:bottom-[26rem] md:w-[30%] md:scale-90 " +
                      // 4. Desktop
                      "sm:bottom-[24rem] sm:w-[35%] sm:scale-110"
                    : // === RESTING STATE ===
                      "absolute z-50 bottom-[59%] left-[48%] -translate-x-1/2 w-[35%] grayscale-[30%]"
                  }
                  ${step > 4 ? "grayscale-0" : ""}
                `}
              />

              {/* PRODUCT 4: Small Item (Front Center) */}
              <img
                src={prod4}
                alt="Prod 4"
                className={`transition-all duration-1000 ease-spring
                  ${step === 5
                    ? // === ACTIVE STATE ===
                      "fixed z-50 left-1/2 -translate-x-1/2 " +
                      // 1. Base Mobile
                      "bottom-[15rem] w-[22%] scale-90 " +
                      // 2. Large Phone
                         "min-[390px]:bottom-[25rem] min-[400px]:scale-100 " +

                       "min-[400px]:bottom-[28rem] min-[400px]:scale-90 " +
                      // 3. iPAD / TABLET (md:) <--- NEW
                      "md:bottom-[26rem] md:w-[15%] md:scale-90 " +
                      // 4. Desktop
                      "sm:bottom-[24rem] sm:w-[15%] sm:scale-125"
                    : // === RESTING STATE ===
                      "absolute z-10 bottom-[59%] left-[60%] w-[22%] grayscale-[30%]"
                  }
                  ${step > 5 || step < 5 ? "" : ""}
                `}
              />

               {/* PRODUCT 3: Face Cream (Right Back) */}
              <img
                src={prod3}
                alt="Prod 3"
                className={`transition-all duration-1000 ease-spring
                  ${step === 6
                    ? // === ACTIVE STATE ===
                      "fixed z-50 left-1/2 -translate-x-1/2 " +
                      // 1. Base Mobile
                      "bottom-[15rem] w-[40%] scale-90 " +
                      // 2. Large Phone
                         "min-[390px]:bottom-[25rem] min-[400px]:scale-100 " +

                      "min-[400px]:bottom-[28rem] min-[400px]:scale-90 " +
                      // 3. iPAD / TABLET (md:) <--- NEW
                      "md:bottom-[26rem] md:w-[28%] md:scale-90 " +
                      // 4. Desktop
                      "sm:bottom-[24rem] sm:w-[30%] sm:scale-110"
                    : // === RESTING STATE ===
                      "absolute z-5 bottom-[55%] right-[-.5%] w-[32%] grayscale-[30%]"
                  }
                `}
              />

            </div>
          </div>

          {/* CTA Button */}
          <button
            className={`relative z-50 mt-[-20%] transition-all duration-700 ease-out delay-500
              ${phase === 'products' ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}
            `}
          >
            <img
              src={ctaButtonImg}
              alt="Shop Now"
              className="w-[220px] md:w-[320px] drop-shadow-xl animate-heartbeat"
            />
          </button>
        </div>

        <style>{`
          @keyframes heartbeat {
            0%, 100% { transform: scale(1); }
            14% { transform: scale(1.05); }
            28% { transform: scale(1); }
            42% { transform: scale(1.05); }
            70% { transform: scale(1); }
          }
          .animate-heartbeat {
            animation: heartbeat 1.5s ease-in-out infinite;
          }
          .ease-spring {
             transition-timing-function: cubic-bezier(0.34, 1.56, 0.64, 1);
          }
        `}</style>
      </div>
    </>
  );
};

export default EndScreen;