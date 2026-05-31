import React, { useState, useEffect } from "react";
import { motion, useAnimationControls } from "framer-motion";
import { SpeechBubble } from "../../components/ui";

const FishSwimming = ({ isClicked, errorLoad }) => {
  const controls = useAnimationControls();
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  function getLoopDuration(screenWidth) {
  if (screenWidth < 376) return 3.2;
  if (screenWidth < 576) return 3.6;
  if (screenWidth < 768) return 4;
  if (screenWidth < 1024) return 6;
  return 8.4;
}

  useEffect(() => {
    // Duration dinamica basata sulla larghezza
    const loopDuration = getLoopDuration(screenWidth);

    if (isClicked) {
      controls
        .start({
          x: [null, 600],
          y: [null, 80],
          rotateZ: [null, 30],
          opacity: [1, 0],
          transition: { duration: 5 },
        })
        .then(() => {
          controls.start({
            x: ["-80vw", "130vw"],
            y: [55, -125, 10, 55],
            rotateZ: [0, -20, 28, 35, 0],
            opacity: [1, 1],
            transition: {
              duration: loopDuration,
              ease: "easeOut",
              repeat: 3,
            },
          });
        });
    } else {
      controls.start({
        x: ["-60vw", "0vw"],
        y: [40, -40],
        rotateZ: -25,
        transition: { duration: 5 },
      });
    }
  }, [isClicked, screenWidth]);

  const [delaySpeechBubble, setDelaySpeechBubble] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDelaySpeechBubble(true);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-full h-[400px] absolute bottom-0">
      <div className="absolute left-[60%] top-[90%] md:left-[55%] lg:top-[88%] lg:left-[53%] xl:top-[80%]">
        {delaySpeechBubble &&
          !isClicked &&
          (errorLoad ? (
            <SpeechBubble>
              I'm sorry, the projects are currently unavailable
            </SpeechBubble>
          ) : (
            <SpeechBubble>
              What a beautiful day! Click the lanterns to see the projects
            </SpeechBubble>
          ))}
      </div>
      
      <svg
        viewBox="0 0 900 300"
        className="w-full h-full"
        preserveAspectRatio="xMidYMax slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path fill="#4ab3ff" stroke="#81c7f9">
          <animate
            attributeName="d"
            dur="10s"
            repeatCount="indefinite"
            values="M0,160 C150,180 350,110 500,160 C650,210 750,180 900,160 L900,300 L0,300 Z; 
                    M0,160 C150,140 350,190 500,160 C650,130 750,180 900,160 L900,300 L0,300 Z;
                    M0,160 C150,180 350,110 500,160 C650,210 750,180 900,160 L900,300 L0,300 Z"
          />
        </path>

        <motion.g animate={controls}>
          <path
            fill="#d7004b"
            d="M435.464,220.034 L401.416,226.266 c0.042,-0.146 0.086,-0.292 0.132,-0.436 c1.868,-5.972 5.34,-11.238 9.912,-15.292, c10.086,-3.894 19.808,-4.938 19.808,-4.938 C430.28,213.676 435.464,220.034 435.464,220.034 Z"
          />
          <path
            fill="#e5e5f7"
            d="M465.713,246.966 c0,0 0.799,-3.379 5.897,-4.433 c-0.163,-0.762 -0.595,-1.475 -1.3,-1.972 l-2.38,-1.676 l-14.586,-10.268 l-2.828,-1.992 c-11.212,-7.892 -25.608,-9.696 -38.418,-4.816 l-62.2,24.6 l62.2,12.6 c22.4,8.4 28.4,4 44.92,-2.76 Z"
          />
          <path
            fill="#d7004b"
            d="M443.793,251.746 c0,0 -6.981,-2.665 -17.601,0.246 c-2.439,0.669 -3.193,3.757 -1.36,5.5 c4.014,3.815 11.454,8.004 20.939,0.352 l-0.404,-0.323 C443.644,255.742 443.008,253.808 443.793,251.746 L443.793,251.746 Z"
          />
          <path
            fill="#d7004b"
            d="M465.713,246.966 c0,0 0.84,-3.553 6.296,-4.508 c-0.155,-0.542 -0.487,-1.042 -0.996,-1.4 l-17.67,-12.44 c0,0 -10.704,8.294 -8.232,21.149 c0.702,3.649 5.625,7.586 11.839,6.487 c2.287,-1.449 4.494,-3.048 6.608,-4.793 l7.614,-6.289 c0.238,-0.196 0.429,-0.425 0.576,-0.672 C469.982,244.877 467.41,245.619 465.713,246.966 Z"
          />
          <motion.path
            fill="#d7004b"
            d="M364.6,240.6 c-14,-5 -10.5,-0.5 -34,-11.2 c12.6,16.58 0,40.2 0,44.4 c4,-8 10.5,-12 34,-24.4 c-2,-2.8 4,-3 0,-8.8 Z"
            animate={{
              rotateY: [45, 35, 25, 15, 5, -15, -25, -35, -45],
              scale: [1, 1.025, 1.05, 1.075, 1.1, 1.075, 1.05, 1.025, 1],
            }}
            transition={{ duration: 1, repeat: Infinity, ease: "easeIn" }}
          />
          <circle fill="#FFFFFF" cx="462.252" cy="242.022" r="3.131" />
          <circle fill="#140198" cx="462.252" cy="242.022" r="1.346" />
        </motion.g>

        <path fill="#2196f3" opacity="0.8" stroke="#4ab3ff">
          <animate
            attributeName="d"
            dur="8s"
            repeatCount="indefinite"
            values="M0,190 C200,180 400,200 500,190 C600,180 800,190 900,190 L900,300 L0,300 Z;
                    M0,190 C200,200 400,180 500,190 C600,200 800,180 900,190 L900,300 L0,300 Z;
                    M0,190 C200,180 400,200 500,190 C600,180 800,190 900,190 L900,300 L0,300 Z"
          />
        </path>

        <path fill="#0d47a1" opacity="0.6" stroke="#299bf5">
          <animate
            attributeName="d"
            dur="6s"
            repeatCount="indefinite"
            values="M0,220 C300,220 400,210 500,220 C600,230 700,220 900,220 L900,300 L0,300 Z;
                    M0,220 C300,210 400,230 500,220 C600,210 700,230 900,220 L900,300 L0,300 Z;
                    M0,220 C300,220 400,210 500,220 C600,230 700,220 900,220 L900,300 L0,300 Z"
          />
        </path>
      </svg>
    </div>
  );
};

export default FishSwimming