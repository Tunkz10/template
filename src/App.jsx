import React, { useState, useRef, useEffect } from "react";
import useScaleUI from "./hooks/useScaleUI";
import { useSound } from "./hooks/useSound";
import EndScreen from "./components/EndScreen";
import EndScreenLandscape from "./components/EndScreenLandscape";

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
  
  // We don't strictly need musicStarted state for logic anymore if we check .paused, 
  // but we keep it if you want to track state for other reasons.
  const [musicStarted, setMusicStarted] = useState(false);
  
  const wheelRef = useRef(null);
  const landscapeWheelRef = useRef(null); 
  const fadeIntervalRef = useRef(null); 

  // --- SOUND CONFIGURATION ---
  const NORMAL_VOLUME = 0.15; 
  const DUCK_VOLUME = 0.03;   
  
  const backgroundMusic = useSound(bgMusic, NORMAL_VOLUME, true); 
  const stopButtonSound = useSound(stopSound, 0.8); 

  // --- UNIVERSAL FADE FUNCTION ---
  const fadeTo = (audioSound, targetVol, duration = 1000) => {
    if (!audioSound) return;
    
    const audio = audioSound.getAudio();
    if (!audio) return;
    
    // Clear any existing fade
    if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);

    const startVol = audio.volume;
    const diff = targetVol - startVol;
    
    // If audio is paused, we must try to play it
    if (audio.paused && targetVol > 0) {
        audio.volume = startVol; 
        const playPromise = audio.play();
        
        // FIX: Handle Autoplay blocking
        if (playPromise !== undefined) {
            playPromise.catch(error => {
                console.log("Autoplay prevented:", error);
                // If play fails, do NOT run the fade interval
                // This prevents volume from 'fading up' while silent
                return; 
            });
        }
    }

    const steps = 20; 
    const stepTime = duration / steps;
    const stepVol = diff / steps;
    let currentStep = 0;

    fadeIntervalRef.current = setInterval(() => {
      // Safety check: if audio got paused mid-fade (e.g. browser policy), stop fading
      if (audio.paused && targetVol > 0) {
         clearInterval(fadeIntervalRef.current);
         return;
      }

      currentStep++;
      const newVol = startVol + (stepVol * currentStep);

      if (newVol >= 0 && newVol <= 1) {
        audio.volume = newVol;
      }

      if (currentStep >= steps) {
        audio.volume = targetVol;
        clearInterval(fadeIntervalRef.current);
      }
    }, stepTime);
  };

  // --- MUSIC HANDLER (FIXED) ---
  const startMusic = () => {
    if (!backgroundMusic) return;
    
    const audio = backgroundMusic.getAudio();
    if (!audio) return;

    // FIX: Check if audio is strictly PAUSED. 
    // This ensures that if the initial auto-play failed, the click will still work.
    if (audio.paused) {
      audio.volume = 0; 
      fadeTo(backgroundMusic, NORMAL_VOLUME, 2000);
      setMusicStarted(true);
    }
  };

  useEffect(() => {
    const globalHandler = () => startMusic();
    
    // Try auto-start (likely to fail, but harmless now with the fix)
    startMusic(); 
    
    window.addEventListener('click', globalHandler);
    window.addEventListener('touchstart', globalHandler);
    
    return () => {
      window.removeEventListener('click', globalHandler);
      window.removeEventListener('touchstart', globalHandler);
      if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);
    };
  }, [backgroundMusic]); // Added backgroundMusic dependency

  // --- CONFIGURATION ---
  const IDLE_SPEED = 3.0; 
  const STOP_DURATION = 3.5; 
  const STOP_SPINS = 3; 

  const handleStop = () => {
    if (isStopping) return;
    setIsStopping(true);
    
    // 1. FADE OUT background music when button is clicked
    fadeTo(backgroundMusic, 0, 800);
    
    // 2. Play stop sound after a short delay to let fade start
    setTimeout(() => {
      stopButtonSound.play();
    }, 200);
    
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
    
    // 3. FADE IN background music when wheel stops rotating
    setTimeout(() => {
      const audio = backgroundMusic?.getAudio();
      if (backgroundMusic && audio) {
        // Fade in the music smoothly when rotation stops
        fadeTo(backgroundMusic, NORMAL_VOLUME, 1500);
      }
    }, STOP_DURATION * 1000); 
    
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
      onClickCapture={startMusic}
      onTouchStartCapture={startMusic}
      className="app-wrapper w-full h-screen relative flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage: `url(${backgroundImg})`,
        backgroundSize: "100% 100%", 
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat"
      }}
    >
      <img src={garTop} alt="" className="fixed left-0 w-full z-[100] pointer-events-none select-none top-0 landscape:-top-[1rem]" />
      <img src={garBottom} alt="" className="fixed left-0 w-full z-[100] pointer-events-none select-none -bottom-1 landscape:-bottom-[1rem]" />

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
            <img src={wheelImg} alt="Frame" className="z-20 w-[360px] pointer-events-none select-none" />
            <img
              ref={wheelRef}
              src={insideImg}
              alt="Prizes"
              className="absolute z-10"
              style={{
                width: "322px", 
                top: "50%", left: "50%", marginTop: "-3px",
                transform: `translate(-50%, -50%)`, 
                animation: `smooth-spin ${IDLE_SPEED}s linear infinite`, 
              }}
            />
          </div>

          <p className="text-[#0038B1] font-bold text-center text-sm drop-shadow-md mt-6 px-4 animate-pulse select-none">
              Stop the wheel to reveal a mystery discount!
          </p>

          <button 
            onClick={handleStop} 
            disabled={isStopping} 
            className={`mt-4 transition-all duration-150 z-20 ${isStopping ? 'opacity-90 cursor-not-allowed scale-95' : 'animate-pulse-slow'}`}
          >
            <img src={stopButton} alt="STOP" className="w-[190px] drop-shadow-xl" />
          </button>
        </main>
      </div>
      )}

      {!showEndScreen && (
      <div className="hidden landscape:flex w-full h-full items-center justify-center px-[3vw] gap-[2vw] xl:gap-[4vw]">
        <header className="flex flex-col items-center select-none pointer-events-none">
          <img src={logoImg} alt="Particle" className="w-[24vw] min-w-[160px] max-w-[320px] xl:w-[28vw]" />
          <img src={holidaySaleImg} alt="Holiday Sale" className="w-[32vw] min-w-[220px] max-w-[420px] mt-[1.5vh] xl:w-[38vw]" />
        </header>

        <main className="flex-1 flex flex-col items-center justify-center">
          <div className="relative flex items-center justify-center">
            <img src={wheelImg} alt="Frame" className="z-20 pointer-events-none select-none w-[30vh] min-w-[200px] max-w-[520px] md:w-[50vh] xl:w-[48vh]" />
            <img
              ref={landscapeWheelRef} 
              src={insideImg}
              alt="Prizes"
              className="absolute z-10 landscape-wheel w-[27vh] min-w-[178px] max-w-[465px] md:w-[45vh] xl:w-[43vh]"
              style={{
                top: "50%", left: "50%", marginTop: "-2px",
                transform: `translate(-50%, -50%)`, 
                animation: `smooth-spin ${IDLE_SPEED}s linear infinite`, 
              }}
            />
          </div>

          <p className="text-[#0038B1] font-bold text-center text-sm lg:text-base drop-shadow-md mt-[2vh] px-4 animate-pulse select-none">
              Stop the wheel to reveal a mystery discount!
          </p>

          <button 
            onClick={handleStop}
            disabled={isStopping}
            className={`mt-[1vh] transition-all duration-150 z-20 ${isStopping ? 'opacity-90 cursor-not-allowed scale-95' : 'animate-pulse-slow'}`}
          >
            <img src={stopButton} alt="STOP" className="w-[13vh] min-w-[100px] max-w-[260px] drop-shadow-xl md:w-[18vh] xl:w-[22vh]" />
          </button>
        </main>
      </div>
      )}

      <EndScreen showEndScreen={showEndScreen} showText2={showText2} />
      <EndScreenLandscape showEndScreen={showEndScreen} />

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
      `}} />
    </div>
  );
}

export default App;