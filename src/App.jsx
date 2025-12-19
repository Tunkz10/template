import React, { useState, useRef, useEffect } from "react";
import useScaleUI from "./hooks/useScaleUI";
import { useSound } from "./hooks/useSound";
import EndScreen from "./components/EndScreen";

// Image Imports
import backgroundImg from "./assets/img/background.png";
import garTop from "./assets/img/GAR_top.png";
import garBottom from "./assets/img/GAR_bottom.png";
import wheelImg from "./assets/img/WHEEL.png";
import insideImg from "./assets/img/inside.png";
import stopButton from "./assets/img/STOP_BUTTON.png";
import logoImg from "./assets/img/Logo.png";
import holidaySaleImg from "./assets/img/HOLIDAY_SALE.png";

// Sound Imports
import bgMusic from "./assets/sounds/Christmas Excitement_Full Mix (mp3cut.net).mp3";
import stopSound from "./assets/sounds/Slot Machine Logo (mp3).mp3";

function App() {
  const { appRef, wrapperRef } = useScaleUI(420, 820);
  const [isStopping, setIsStopping] = useState(false);
  const [showEndScreen, setShowEndScreen] = useState(false);
  const [showText2, setShowText2] = useState(false);
  const wheelRef = useRef(null);
  const landscapeWheelRef = useRef(null); 

  // --- SOUND EFFECTS ---
  const backgroundMusic = useSound(bgMusic, 0.3, true); 
  const stopButtonSound = useSound(stopSound, 0.5); 

  useEffect(() => {
    backgroundMusic.play();
    const playOnInteraction = () => {
      backgroundMusic.play();
      document.removeEventListener('click', playOnInteraction);
      document.removeEventListener('touchstart', playOnInteraction);
    };
    document.addEventListener('click', playOnInteraction);
    document.addEventListener('touchstart', playOnInteraction);
    
    return () => {
      document.removeEventListener('click', playOnInteraction);
      document.removeEventListener('touchstart', playOnInteraction);
    };
  }, []);

  // --- CONFIGURATION ---
  const IDLE_SPEED = 0.5; 
  const STOP_DURATION = 3.5; 
  const STOP_SPINS = 3; 

  const handleStop = () => {
    // 1. EXTRA GUARD: Logic prevents running if already stopping
    if (isStopping) return;
    setIsStopping(true);
    
    stopButtonSound.play();
    
    const wheels = [wheelRef.current, landscapeWheelRef.current];
    
    wheels.forEach(wheel => {
        if (wheel) {
            const style = window.getComputedStyle(wheel);
            const matrix = new DOMMatrixReadOnly(style.transform);
            const currentAngle = Math.atan2(matrix.b, matrix.a) * (180 / Math.PI);
            
            wheel.style.animation = 'none';
            wheel.style.transform = `translate(-50%, -50%) rotate(${currentAngle}deg)`;
            
            void wheel.offsetHeight; 
    
            const extraDegrees = (STOP_SPINS * 360) + (Math.random() * 360);
            const finalAngle = currentAngle + extraDegrees;
    
            wheel.style.transition = `transform ${STOP_DURATION}s cubic-bezier(0, 0, 0.2, 1)`;
            wheel.style.transform = `translate(-50%, -50%) rotate(${finalAngle}deg)`;
        }
    });
    
    setTimeout(() => {
      setShowEndScreen(true);
      setShowText2(false);
      setTimeout(() => {
        setShowText2(true);
      }, 2000);
    }, (STOP_DURATION * 1000) + 1500);
  };

  return (
    <div 
      ref={wrapperRef} 
      className="app-wrapper w-full h-screen relative flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage: `url(${backgroundImg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* --- GARLANDS --- */}
      <img
        src={garTop}
        alt=""
        className="fixed left-0 w-full z-[100] pointer-events-none select-none top-0 landscape:-top-[1rem]"
      />
      <img
        src={garBottom}
        alt=""
        className="fixed left-0 w-full z-[100] pointer-events-none select-none -bottom-1 landscape:-bottom-[1rem]"
      />

      {/* --- PORTRAIT LAYOUT --- */}
      {!showEndScreen && (
      <div 
        ref={appRef} 
        className="app relative flex flex-col items-center pt-12 pb-8 landscape:hidden"
        style={{ width: '420px', height: '820px' }}
      >
        <header className="flex flex-col items-center select-none pointer-events-none">
          <img src={logoImg} alt="Particle" className="w-[200px] mt-[4rem]" />
          <img src={holidaySaleImg} alt="Holiday Sale" className="w-[310px] mt-5" />
        </header>

        <main className="flex-1 flex flex-col items-center justify-center w-full px-4">
          <div className="relative flex items-center justify-center">
            {/* PORTRAIT WHEEL */}
            <img
              src={wheelImg}
              alt="Frame"
              className="z-20 w-[360px] pointer-events-none select-none"
            />
            
            <img
              ref={wheelRef}
              src={insideImg}
              alt="Prizes"
              className="absolute z-10"
              style={{
                width: "322px", 
                top: "50%",
                left: "50%",
                marginTop: "-3px",
                transform: `translate(-50%, -50%)`, 
                animation: `smooth-spin ${IDLE_SPEED}s linear infinite`, 
              }}
            />
          </div>

          <button 
            onClick={handleStop} 
            disabled={isStopping} // DISABLE CLICK
            className={`mt-12 transition-all duration-150 z-20 
              ${isStopping ? 'opacity-90 cursor-not-allowed scale-95' : 'animate-pulse-slow'}`}
          >
            <img src={stopButton} alt="STOP" className="w-[190px] drop-shadow-xl" />
          </button>
        </main>
      </div>
      )}

      {/* --- LANDSCAPE LAYOUT (Updated for iPad Mini) --- */}
      {!showEndScreen && (
      <div className="hidden landscape:flex w-full h-full items-center justify-center px-[3vw] gap-[2vw] xl:gap-[4vw]">
        <header className="flex flex-col items-center select-none pointer-events-none">
          <img src={logoImg} alt="Particle" className="w-[24vw] min-w-[160px] max-w-[320px] xl:w-[28vw]" />
          <img src={holidaySaleImg} alt="Holiday Sale" className="w-[32vw] min-w-[220px] max-w-[420px] mt-[1.5vh] xl:w-[38vw]" />
        </header>

        <main className="flex-1 flex flex-col items-center justify-center">
          <div className="relative flex items-center justify-center">
            {/* LANDSCAPE FRAME: Added md:w-[50vh] for Tablet/iPad */}
            <img
              src={wheelImg}
              alt="Frame"
              className="z-20 pointer-events-none select-none 
                         w-[30vh] min-w-[200px] max-w-[520px] 
                         md:w-[50vh] xl:w-[48vh]"
            />
            
            {/* LANDSCAPE INSIDE: Added md:w-[45vh] to match frame ratio */}
            <img
              ref={landscapeWheelRef} 
              src={insideImg}
              alt="Prizes"
              className="absolute z-10 landscape-wheel 
                         w-[27vh] min-w-[178px] max-w-[465px] 
                         md:w-[45vh] xl:w-[43vh]"
              style={{
                top: "50%",
                left: "50%",
                marginTop: "-2px",
                transform: `translate(-50%, -50%)`, 
                animation: `smooth-spin ${IDLE_SPEED}s linear infinite`, 
              }}
            />
          </div>

          <button 
            onClick={handleStop}
            disabled={isStopping} // DISABLE CLICK
            // Added conditional styling to remove animation when clicked
            className={`mt-[2vh] transition-all duration-150 z-20 
              ${isStopping ? 'opacity-90 cursor-not-allowed scale-95' : 'animate-pulse-slow'}`}
          >
            {/* BUTTON SIZE: Added md:w-[18vh] for Tablet */}
            <img src={stopButton} alt="STOP" 
                 className="w-[13vh] min-w-[100px] max-w-[260px] drop-shadow-xl 
                            md:w-[18vh] xl:w-[22vh]" 
            />
          </button>
        </main>
      </div>
      )}

      {/* --- END SCREEN COMPONENT --- */}
      <EndScreen showEndScreen={showEndScreen} showText2={showText2} />

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes smooth-spin {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to { transform: translate(-50%, -50%) rotate(360deg); }
        }

        @keyframes pulse-scale {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.05); } 
        }

        .animate-pulse-slow {
            animation: pulse-scale 2s ease-in-out infinite;
        }

        /* Removed :active state here because we handle it via React state/disabled prop now */
      `}} />
    </div>
  );
}

export default App;