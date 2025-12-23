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
  // eslint-disable-next-line no-unused-vars
  const [showIntroText2, setShowIntroText2] = useState(false); 

  // Phase: 'intro' (text 1/2) -> 'products' (1st-4th items)
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
      setShowIntroText2(false);
    }
  }, [showEndScreen]);

  // Product Sequence Interval (Loop increased to 6 steps to include text3rd)
  useEffect(() => {
    if (phase === 'products') {
      if (step === 0) setStep(1);

      const productInterval = setInterval(() => {
        setStep((prev) => {
          // Increased limit to 6 to accommodate the 3rd text item
          if (prev < 6) return prev + 1;
          return 1; 
        });
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

        /* --- UPDATED BREAKPOINT (400px) --- */
        min-[400px]:max-w-[480px] min-[400px]:h-[160px] min-[400px]:mt-6

        /* Tablet/iPad Mini Positioning */
        sm:w-[98%] sm:max-w-[580px] sm:h-[200px] sm:mt-8
        md:w-[95%] md:max-w-[680px] md:h-[220px] md:mt-12
        lg:w-[90%] lg:max-w-[720px] lg:h-[240px] lg:mt-10
        flex items-center justify-center">

          {phase === 'products' && (
            <>
              {/* Step 1: text1Img */}
              <img
                src={text1Img}
                alt="Intro 1"
                className={`absolute inset-0 w-full h-full object-contain transition-all duration-700 ease-spring
                ${step === 1
                    ? "opacity-100 scale-115 min-[400px]:scale-120 sm:scale-125 md:scale-135 lg:scale-140 -translate-y-8"
                    : "opacity-0 scale-90 translate-y-4"
                  }`}
              />

              {/* Step 2: text2Img */}
              <img
                src={text2Img}
                alt="Intro 2"
                className={`absolute inset-0 w-full h-full object-contain transition-all duration-700 ease-spring
                ${step === 2
                    ? "opacity-100 scale-115 min-[400px]:scale-120 sm:scale-125 md:scale-135 lg:scale-140 -translate-y-8"
                    : "opacity-0 scale-90 translate-y-4"
                  }`}
              />

              {/* Step 3: text1st */}
              <img
                src={text1st}
                alt="Detail 1st"
                className={`absolute inset-0 w-full h-full object-contain transition-all duration-700 ease-spring
                   ${step === 3 ? "opacity-100 scale-125 min-[390px]:scale-135 min-[400px]:scale-140 sm:scale-145 md:scale-155 lg:scale-165 translate-y-0" : "opacity-0 scale-90 translate-y-4"}`}
              />

              {/* Step 4: text2nd */}
              <img
                src={text2nd}
                alt="Detail 2nd"
                className={`absolute inset-0 w-full h-full object-contain transition-all duration-700 ease-spring
                   ${step === 4 ? "opacity-100 scale-125 min-[390px]:scale-135 min-[400px]:scale-140 sm:scale-145 md:scale-155 lg:scale-165 translate-y-0" : "opacity-0 scale-90 translate-y-4"}`}
              />

              {/* Step 5: text3rd (NEW ADDITION) */}
              <img
                src={text3rd}
                alt="Detail 3rd"
                className={`absolute inset-0 w-full h-full object-contain transition-all duration-700 ease-spring
                   ${step === 5 ? "opacity-100 scale-125 min-[390px]:scale-135 min-[400px]:scale-140 sm:scale-145 md:scale-155 lg:scale-165 translate-y-0" : "opacity-0 scale-90 translate-y-4"}`}
              />

              {/* Step 6: text4th (Shifted to Step 6) */}
              <img
                src={text4th}
                alt="Detail 4th"
                className={`absolute inset-0 w-full h-full object-contain transition-all duration-700 ease-spring
                   ${step === 6 ? "opacity-100 scale-125 min-[390px]:scale-135 min-[400px]:scale-140 sm:scale-145 md:scale-155 lg:scale-165 translate-y-0" : "opacity-0 scale-90 translate-y-4"}`}
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
            w-[110%] max-w-[390px] min-[400px]:max-w-[440px]
            bottom-[20%]"
          />

          {/* 2. PODIUM & PRODUCTS GROUP */}
          <div className="relative z-10
            w-[100%] max-w-[300px]
            min-[390px]:max-w-[380px]
            /* --- UPDATED BREAKPOINT (400px) --- */
            min-[400px]:max-w-[340px] min-[400px]:mb-[-2.5rem]

            sm:max-w-[420px] md:w-[1020px] lg:max-w-[700px]
            flex justify-center items-end mb-[-2rem] md:mb-[-4rem] lg:mb-[-5rem]"
          >
            {/* --- DECOR LAYER --- */}
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
              bottom-[5rem] left-[9rem]
              min-[390px]:bottom-[5.5rem] min-[390px]:left-[11.5rem]
              /* --- UPDATED BREAKPOINT (400px) --- */
              min-[400px]:left-[10.5rem] min-[400px]:bottom-[5rem]

              sm:left-[13rem] sm:bottom-[6.5rem]"
              
            />

            {/* --- PRODUCTS CONTAINER LAYER --- */}
            <div className={`
                absolute inset-0 w-full h-full z-20
                mt-[-2rem]
                min-[390px]:mt-[-4rem]
                min-[400px]:mt-[-3rem]
                sm:mt-[-5rem] md:mt-[-5rem] lg:mt-[-12rem]
                 min-[582px]:top-[5%]
                  min-[582px]:left-[-5%]
            `}>

              {/* Prod 1 (Shampoo - Left Back) */}
              <img
                src={prod1}
                alt="Prod 1"
                className={`${step === 3 ? 
                  "fixed z-30 left-1/2 -translate-x-1/2 -translate-y-1/2 " + 
                  "top-[13%] min-[390px]:top-[15%] min-[400px]:top-[15%] min-[582px]:top-[13%] sm:top-[20%] md:top-[13%] lg:top-[13%] " + 
                  "scale-90 min-[390px]:scale-120 min-[400px]:scale-90 min-[582px]:scale-70 sm:scale-100 md:scale-90 lg:scale-85" :
                  "absolute"
                  }
                   w-[28%] min-[390px]:w-[28%] sm:w-[6%] md:w-[20%] lg:w-[22%]
                   transition-all duration-1000 ease-spring opacity-100
                   ${step === 3 ? "" :
                    step > 3 ? "z-30 left-[5%] sm:left-[6%] md:left-[7%] bottom-[8rem] sm:bottom-[9rem] md:bottom-[10rem] translate-y-0 scale-120 min-[390px]:scale-120 sm:scale-150" :
                      "z-20 left-[5%] sm:left-[6%] md:left-[7%] bottom-[8rem] sm:bottom-[9rem] md:bottom-[10rem] translate-y-0 scale-120 min-[390px]:scale-120 sm:scale-150 grayscale-[30%]"
                  }
                `}
              />

              {/* Prod 2 (Perfume - Center Top) */}
              <img
                src={prod2}
                alt="Prod 2"
                className={`${step === 4 ? 
                  "fixed z-90 left-1/2 -translate-x-1/2 -translate-y-1/2 " + 
                  "top-[10%] min-[400px]:top-[14%] min-[582px]:top-[14%] sm:top-[20%] md:top-[9%] lg:top-[11%] " + 
                  "scale-80 min-[390px]:scale-90 min-[400px]:scale-80 min-[582px]:scale-60 sm:scale-100 md:scale-60 lg:scale-70" :
                  "absolute"
                  }
                    w-[38%] sm:w-[36%] md:w-[34%] lg:w-[32%]
                    transition-all duration-1000 ease-spring delay-100 opacity-100
                    ${step === 4 ? "" :
                    step > 4 ? "z-60 left-[9rem] min-[390px]:left-[12rem] min-[400px]:left-[10rem] min-[582px]:left-[10rem] sm:left-[12rem] md:left-[12rem] lg:left-[21rem] -translate-x-1/2 bottom-[50%] sm:bottom-[52%] md:bottom-[8rem] translate-y-0 scale-90 sm:scale-95 md:scale-100 lg:scale-100" :
                      "z-100 left-[9rem] min-[390px]:left-[12rem] min-[400px]:left-[10rem] min-[582px]:left-[10rem] sm:left-[12rem] md:left-[12rem] lg:left-[21rem] -translate-x-1/2 bottom-[50%] sm:bottom-[52%] md:bottom-[8rem] translate-y-0 scale-90 sm:scale-95  md:scale-100 lg:scale-100 grayscale-[30%]"
                  }
                `}
              />

              {/* Prod 4 (Small Item - Center Front) - THIS IS STEP 5 (matches Text 3rd) */}
              <img
                src={prod4}
                alt="Prod 4"
                className={`${step === 5 ? 
                  "fixed z-20 left-1/2 -translate-x-1/2 -translate-y-1/2 " + 
                  "top-[13%] min-[400px]:top-[16%] min-[582px]:top-[10%] sm:top-[20%] md:top-[13%] lg:top-[11%] " + 
                  "scale-70 min-[390px]:scale-90 min-[400px]:scale-70 min-[582px]:scale-60 sm:scale-100 md:scale-55 lg:scale-65" :
                  "absolute"
                  }
                    w-[24%] sm:w-[24%] md:w-[22%] lg:w-[20%]
                    transition-all duration-1000 ease-spring delay-100 opacity-100
                    ${step === 5 ? "" :
                    step > 5 || step < 5 ? "z-40 left-[61%] sm:left-[62%] md:left-[60%] bottom-[50%] sm:bottom-[52%] md:bottom-[46%] lg:bottom-[30%] translate-y-0 scale-90 sm:scale-95" :
                      "z-40 left-[61%] sm:left-[62%] md:left-[60%] bottom-[50%] sm:bottom-[10%] md:bottom-[55%] translate-y-0 scale-90 sm:scale-95 grayscale-[30%]"
                  }
                `}
              />

              {/* Prod 3 (Face Cream - Right Back) - THIS IS STEP 6 (matches Text 4th) */}
                <img 
                  src={prod3} 
                  alt="Prod 3"
                  className={`${
                    step === 6 
                    ? "fixed z-50 left-1/2 top-[8%] min-[400px]:top-[14%] min-[582px]:top-[14%] sm:top-[20%] md:top-[12%] lg:top-[10%] -translate-x-1/2 -translate-y-1/2 scale-100 min-[390px]:scale-120 sm:scale-100 md:scale-80 lg:scale-75 min-[582px]:scale-80" 
                    : 
                      "absolute " +
                      "right-[-.05rem] min-[400px]:right-[-.3rem] min-[582px]:right-[-.1rem] sm:right-[0.5rem] md:right-[.5rem] lg:right-[-1rem] " +
                      "bottom-[45%] min-[390px]:bottom-[40%] sm:bottom-[46%] md:bottom-[47%] lg:bottom-[23%] " +
                      "translate-y-0 " +
                      "z-30 scale-109 sm:scale-120 md:scale-130 lg:scale-100" 
                  } 
                    w-[30%] sm:w-[28%] md:w-[26%] lg:w-[35%] 
                    transition-all duration-1000 ease-spring delay-100 opacity-100 
                  `}
                />

            </div>
          </div>

          {/* 3. CTA Button */}
          <button
            className={`
                absolute z-50 pointer-events-none
                bottom-[5%]
                transition-all duration-700 ease-out delay-500
                ${phase === 'products' ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}
                hover:scale-105 active:scale-95 animate-pulse
            `}
          >
            <img
              src={ctaButtonImg}
              alt="Shop Now"
              className="w-[160px] sm:w-[200px] lg:w-[420px] drop-shadow-lg"
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

export default EndScreen;