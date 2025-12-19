import { useEffect, useRef } from "react";

export const useSound = (src, volume = 0.7, loop = false) => {
  const audioRef = useRef(null);

  useEffect(() => {
    const audio = new Audio(src);
    audio.volume = volume;
    audio.loop = loop;
    audioRef.current = audio;

    return () => {
      audio.pause();
      audioRef.current = null;
    };
  }, [src, volume, loop]);

  const play = () => {
    if (!audioRef.current) return;
    audioRef.current.currentTime = 0;
    audioRef.current.play().catch(() => {});
  };

  const stop = () => {
    if (!audioRef.current) return;
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
  };

  return { play, stop };
};