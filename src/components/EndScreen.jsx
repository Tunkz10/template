import React, { useState, useEffect } from "react";
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
  const [showIntroText2, setShowIntroText2] = useState(false); // For text_1 / text_2 toggle
  
  // Phase: 'intro' (text 1/2) -> 'products' (1st-4th items)
  const [phase, setPhase] = useState('intro'); 
  const [step, setStep] = useState(0); // 1=Prod1, 2=Prod2, etc.

  useEffect(() => {
    if (showEndScreen) {
      // 1. Fade in screen content
      const timer = setTimeout(() => setIsVisible(true), 100);

      // 2. Start the continuous loop immediately
      const startTimer = setTimeout(() => {
        setPhase('products');
      }, 500);

      return () => {
        clearTimeout(timer);
        clearTimeout(startTimer);
      };
    } else {
      // Reset everything if screen closes
      setIsVisible(false);
      setPhase('intro');
      setStep(0);
      setShowIntroText2(false);
    }
  }, [showEndScreen]);

  // 4. Product Sequence Interval (6-step loop: text1, text2, prod1, prod2, prod4, prod3)
  useEffect(() => {
    if (phase === 'products') {
      // Start the sequence immediately
      if (step === 0) setStep(1);

      const productInterval = setInterval(() => {
        setStep((prev) => {
          if (prev < 6) return prev + 1;
          return 1; // Loop back to step 1 (6-step cycle)
        });
      }, 1400); // Slower interval for smoother experience

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

  if (!showEndScreen) return null;

  return (
    <div 
      onClick={handleClickAction}
      className="absolute inset-0 w-full h-full flex flex-col items-center justify-between overflow-hidden z-50 cursor-pointer landscape:hidden"
    >
      
      {/* =========================================================
          LEFT SECTION (Logo & Text Areas)
      ========================================================== */}
      <div
        className={`
          flex flex-col items-center justify-start pt-[14%]
          transition-all duration-700 ease-out
          ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}
        `}
      >
        {/* Logo */}
        <img
          src={logoImg}
          alt="Particle Logo"
          className="w-[55%] max-w-[280px] sm:w-[65%] sm:max-w-[320px] md:w-[70%] md:max-w-[360px] lg:w-[65%] lg:max-w-[390px]
          mb-4"
        />

       {/* TEXT CONTAINER WRAPPER */}
       <div className="relative 
        /* Mobile Positioning */
        w-[95%] max-w-[420px] h-[140px] mt-4
        /* Tablet/iPad Mini Positioning - Bigger text */
        sm:w-[98%] sm:max-w-[580px] sm:h-[200px] sm:mt-8
        /* iPad Mini Portrait - Even bigger text */
        md:w-[95%] md:max-w-[680px] md:h-[220px] md:mt-12
        /* Desktop Positioning */
        lg:w-[90%] lg:max-w-[720px] lg:h-[240px] lg:mt-10
        flex items-center justify-center">
          
          {/* 6-STEP CONTINUOUS LOOP: text1, text2, 1st, 2nd, 4th, 3rd */}
          {phase === 'products' && (
             <>
              {/* Step 1: text1Img */}
            <img
              src={text1Img}
              alt="Intro 1"
              className={`absolute inset-0 w-full h-full object-contain transition-all duration-700 ease-spring
                ${step === 1 
                  /* CHANGED: translate-y-0 -> -translate-y-8 (Moves it up) */
                  ? "opacity-100 scale-115 sm:scale-125 md:scale-135 lg:scale-140 -translate-y-8" 
                  : "opacity-0 scale-90 translate-y-4"
                }`}
            />

            {/* Step 2: text2Img */}
            <img
              src={text2Img}
              alt="Intro 2"
              className={`absolute inset-0 w-full h-full object-contain transition-all duration-700 ease-spring
                ${step === 2 
                  /* CHANGED: translate-y-0 -> -translate-y-8 */
                  ? "opacity-100 scale-115 sm:scale-125 md:scale-135 lg:scale-140 -translate-y-8" 
                  : "opacity-0 scale-90 translate-y-4"
                }`}
            />
               
               {/* Step 3: text1st */}
               <img
                 src={text1st}
                 alt="Detail 1st"
                 className={`absolute inset-0 w-full h-full object-contain transition-all duration-700 ease-spring
                   ${step === 3 ? "opacity-100 scale-125 min-[390px]:scale-135 sm:scale-145 md:scale-155 lg:scale-165 translate-y-0" : "opacity-0 scale-90 translate-y-4"}`}
               />
               
               {/* Step 4: text2nd */}
               <img
                 src={text2nd}
                 alt="Detail 2nd"
                 className={`absolute inset-0 w-full h-full object-contain transition-all duration-700 ease-spring
                   ${step === 4 ? "opacity-100 scale-125 min-[390px]:scale-135 sm:scale-145 md:scale-155 lg:scale-165 translate-y-0" : "opacity-0 scale-90 translate-y-4"}`}
               />
               
               {/* Step 5: text4th */}
               <img
                 src={text4th}
                 alt="Detail 4th"
                 className={`absolute inset-0 w-full h-full object-contain transition-all duration-700 ease-spring
                   ${step === 5 ? "opacity-100 scale-125 min-[390px]:scale-135 sm:scale-145 md:scale-155 lg:scale-165 translate-y-0" : "opacity-0 scale-90 translate-y-4"}`}
               />
               
               {/* Step 6: text3rd */}
               <img
                 src={text3rd}
                 alt="Detail 3rd"
                 className={`absolute inset-0 w-full h-full object-contain transition-all duration-700 ease-spring
                   ${step === 6 ? "opacity-100 scale-125 min-[390px]:scale-135 sm:scale-145 md:scale-155 lg:scale-165 translate-y-0" : "opacity-0 scale-90 translate-y-4"}`}
               />
             </>
          )}

      </div>
      </div>

      {/* =========================================================
          RIGHT SECTION (Podium, Products, Button)
      ========================================================== */}
      <div
        className={`
          flex flex-col items-center relative w-full flex-grow
          /* Bottom alignment for Mobile */
          justify-end pb-[8%]
          transition-all duration-700 ease-out delay-200
          ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}
        `}
      >
        <div className="relative flex items-end justify-center w-full">
          
          {/* 1. Blast Background */}
          <img
            src={blastImg}
            alt="Blast Effect"
            className="absolute z-0 opacity-90 left-1/2 -translate-x-1/2
            w-[110%] max-w-[390px] 
            bottom-[20%]"
          />

          {/* 2. PODIUM & PRODUCTS GROUP */}
          <div className="relative z-10 
            /* Sizing for iPhone SE (Small Mobile) */
            w-[100%] max-w-[300px]
            min-[390px]:max-w-[380px] 
            /* Sizing for Tablet/Desktop */
            sm:max-w-[420px] md:w-[1020px] lg:max-w-[100px] min-[1000px]:lg:max-w-[600px]
            flex justify-center items-end mb-[-2rem] md:mb-[-4rem] lg:mb-[-5rem]"
          >
            {/* --- DECOR LAYER --- */}
            {/* The Podium Base */}
            <img 
              src={podiumImg} 
              alt="Podium" 
              className="relative z-10 w-full"
            />

           {/* Garland Overlay */}
            <img 
              src={garlandImg} 
              alt="Garland" 
              className="absolute z-40 w-[105%] -translate-x-1/2
              /* MOBILE DEFAULTS: */

              bottom-[5rem] left-[9rem]

              min-[390px]:bottom-[5.5rem] min-[390px]:left-[11.5rem]
              sm:left-[13rem] sm:bottom-[6.5rem]
              /* IPAD MINI / TABLET (md):
            
              md:left-[15rem] md:bottom-[7.5rem] 
              lg:left-[22rem] lg:bottom-[11rem] */"
            />

            {/* --- PRODUCTS CONTAINER LAYER --- 
                Separated container for easier sizing.
                'absolute inset-0' ensures it overlaps the podium perfectly.
            */}
            {/* --- PRODUCTS CONTAINER LAYER --- */}
            <div className={`
                absolute inset-0 w-full h-full z-20 
                /* Mobile (Default) */
                mt-[-2rem]

                min-[390px]:mt-[-4rem] 
                /* Small Tablet / Large Phone */
                sm:mt-[-5rem] 
                /* iPad Mini / Desktop */
                md:mt-[-5rem] 

                lg:mt-[-12rem]
             
            `}>
                        
                {/* Prod 1 (Shampoo - Left Back) */}
       
                <img 
                src={prod1} 
                alt="Prod 1"
                className={`${
                  step === 3 ? "fixed z-30 left-1/2 top-[13%] min-[390px]:top-[15%] sm:top-[20%] md:top-[13%] lg:top-[13%] -translate-x-1/2 -translate-y-1/2 scale-90 min-[390px]:scale-120 sm:scale-100 md:scale-90 lg:scale-85 min-[1000px]:lg:scale-70" :
                  "absolute"
                } 
                   w-[28%] min-[390px]:w-[28%] sm:w-[6%] md:w-[20%] lg:w-[22%]
                    transition-all duration-1000 ease-spring
                    opacity-100 
                    ${
                      step === 3 ? "" :
                      step > 3 ? "z-30 left-[5%] sm:left-[6%] md:left-[7%] bottom-[8rem] sm:bottom-[9rem] md:bottom-[10rem] translate-y-0 scale-120 min-[390px]:scale-120 sm:scale-150 lg:scale-90 min-[1000px]:lg:scale-130" :
                      "z-20 left-[5%] sm:left-[6%] md:left-[7%] bottom-[8rem] sm:bottom-[9rem] md:bottom-[10rem] translate-y-0 scale-120 min-[390px]:scale-120 sm:scale-150 lg:scale-120 min-[1000px]:lg:scale-130 grayscale-[30%]"
                    }
                `}
                />

                {/* Prod 2 (Perfume - Center Top - The Hero) */}
                <img 
                src={prod2} 
                alt="Prod 2"
                className={`${
                  step === 4 ? "fixed z-90 left-1/2 top-[10%] sm:top-[20%] md:top-[9%] lg:top-[11%] -translate-x-1/2 -translate-y-1/2 scale-80 min-[390px]:scale-90 sm:scale-100 md:scale-60 lg:scale-10 min-[1000px]:lg:scale-20" :
                  "absolute"
                } 
                    w-[38%] sm:w-[36%] md:w-[34%] lg:w-[24%] min-[1000px]:lg:scale-110
                    transition-all duration-1000 ease-spring delay-100
                    opacity-100 
                    ${
                      step === 4 ? "" :
                      step > 4 ? "z-60 left-[9rem] min-[390px]:left-[12rem] sm:left-[12rem] md:left-[12rem] lg:left-[21rem] min-[1000px]:lg:left-[19rem] -translate-x-1/2 bottom-[50%] sm:bottom-[52%] md:bottom-[8rem] translate-y-0 scale-90 sm:scale-95 md:scale-100 lg:scale-100 min-[1000px]:lg:scale-10" :
                      "z-100 left-[9rem] min-[390px]:left-[12rem] sm:left-[12rem] md:left-[12rem] lg:left-[21rem] min-[1000px]:lg:left-[19rem]  -translate-x-1/2 bottom-[50%] sm:bottom-[52%] md:bottom-[8rem] translate-y-0 scale-90 sm:scale-95  md:scale-100 lg:scale-100 min-[1000px]:lg:scale-10 grayscale-[30%]"
                    }
                `}
                />

                {/* Prod 3 (Face Cream - Right Back - BIGGER) */}
                <img 
                src={prod3} 
                alt="Prod 3"
                className={`${
                  step === 6 ? "fixed z-30 left-1/2 top-[8%] sm:top-[20%] md:top-[12%] lg:top-[10%] -translate-x-1/2 -translate-y-1/2 scale-100 min-[390px]:scale-120 sm:scale-100 md:scale-80 lg:scale-95" :
                  "absolute"
                } 
                    w-[30%] sm:w-[28%] md:w-[26%] lg:w-[24%]
                    transition-all duration-1000 ease-spring delay-100
                    opacity-100 
                    ${
                      step === 6 ? "" :
                      step > 6 || step < 6 ? "z-30 right-[-.05rem] sm:right-[0.5rem] md:right-[.5rem] lg:right-[3rem] bottom-[45%] min-[390px]:bottom-[40%] sm:bottom-[46%] md:bottom-[47%] lg:bottom-[29%] translate-y-0 scale-109 sm:scale-120 md:scale-80 lg:scale-110" :
                      "z-20 right-[-.05rem] sm:right-[0.5rem] md:right-[1rem] lg:right-[-1rem] bottom-[11rem] min-[390px]:bottom-[45%] sm:bottom-[46%] md:bottom-[47%] translate-y-0 scale-110 sm:scale-120 grayscale-[30%]"
                    }
                `}
                />

                {/* Prod 4 (Small Item - Center Front - BIGGER) */}
                <img 
                src={prod4} 
                alt="Prod 4"
                className={`${
                  step === 5 ? "fixed z-20 left-1/2 top-[13%] sm:top-[20%] md:top-[13%] lg:top-[11%] -translate-x-1/2 -translate-y-1/2  scale-70 min-[390px]:scale-90 sm:scale-100 md:scale-55 lg:scale-65" :
                  "absolute"
                } 
                    w-[24%] sm:w-[24%] md:w-[22%] lg:w-[20%]
                    transition-all duration-1000 ease-spring delay-100
                    opacity-100 
                    ${
                      step === 5 ? "" :
                      step > 5 || step < 5 ? "z-40 left-[61%] sm:left-[62%] md:left-[60%] bottom-[50%] sm:bottom-[52%] md:bottom-[46%] lg:bottom-[30%] translate-y-0 scale-90 sm:scale-95" :
                      "z-40 left-[61%] sm:left-[62%] md:left-[60%] bottom-[50%] sm:bottom-[10%] md:bottom-[55%] translate-y-0 scale-90 sm:scale-95 grayscale-[30%]"
                    }
                `}
                />

            </div>
          </div>
       
          {/* 3. CTA Button */}
          <button
            className={`
                absolute z-50 pointer-events-none
                /* Positioning for Mobile */
                bottom-[5%]
                transition-all duration-700 ease-out delay-500
                ${phase === 'products' ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}
                hover:scale-105 active:scale-95 animate-pulse
            `}
            >
            <img
                src={ctaButtonImg}
                alt="Shop Now"
                className="w-[160px] sm:w-[200px] lg:w-[320px] drop-shadow-lg"
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
        /* Bouncy spring for the elevation */
        .ease-spring {
            transition-timing-function: cubic-bezier(0.34, 1.56, 0.64, 1);
        }
      `}</style>
    </div>
  );
};

export default EndScreen;