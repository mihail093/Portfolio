import React, { useState, useEffect, useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import { easeInOut, motion } from "framer-motion";
import {
  HomeIcon,
  BookOpenIcon,
  InformationCircleIcon,
  AtSymbolIcon,
} from "@heroicons/react/20/solid";
import { useTheme } from "../../context/ThemeContext";
import "./Header.css";

export default function Header({ headerImg, headerTextureImg }) {
  const location = useLocation();
  const { isDark, toggleTheme } = useTheme();

  // Stati per tracking caricamento immagini
  const [isTextureLoaded, setIsTextureLoaded] = useState(false);
  const [isInnerImgLoaded, setIsInnerImgLoaded] = useState(false);

  // Funzione per ottimizzare gli URL Cloudinary
  const getOptimizedCloudinaryUrl = (url, width) => {
    if (!url || !url.includes("cloudinary.com")) return url;

    return url.replace(
      "/upload/",
      `/upload/w_${width},f_auto,q_auto,dpr_auto/`
    );
  };

  // Funzione che calcola la rotazione
  const calculateRotation = (pathname) => {
    const rotationMap = {
      "/": 0,
      "/projects": 90,
      "/about": 180,
      "/contact": 270,
    };
    return rotationMap[pathname] || 0;
  };

  const [rotation, setRotation] = useState(
    calculateRotation(location.pathname)
  );

  useEffect(() => {
    setRotation(calculateRotation(location.pathname));
  }, [location.pathname]);

  // Preload delle immagini con callback per blur effect
  useEffect(() => {
    if (headerTextureImg?.mediaUrl) {
      const img = new Image();
      img.src = getOptimizedCloudinaryUrl(headerTextureImg.mediaUrl, 380);
      img.onload = () => setIsTextureLoaded(true);
    }

    if (headerImg?.mediaUrl) {
      const img = new Image();
      img.src = getOptimizedCloudinaryUrl(headerImg.mediaUrl, 160);
      img.onload = () => setIsInnerImgLoaded(true);
    }
  }, [headerImg?.mediaUrl, headerTextureImg?.mediaUrl]);

  const navItems = useMemo(
    () => [
      { name: "Home", Icon: HomeIcon, angle: 0 },
      { name: "Projects", Icon: BookOpenIcon, angle: 90 },
      { name: "About", Icon: InformationCircleIcon, angle: 180 },
      { name: "Contact", Icon: AtSymbolIcon, angle: 270 },
    ],
    []
  );

  return (
    <div
      className={`flex items-center justify-center min-h-[64vh] mainDiv ${
        isDark ? "dark-mode" : "light-mode"
      }`}
    >
      <div className="relative w-[300px] h-[300px] sm:w-[400px] sm:h-[400px]">
        <div className="absolute inset-0">
          <motion.svg
            className="w-full h-full"
            viewBox="0 0 400 400"
            initial={{ rotate: calculateRotation(location.pathname) }}
            animate={{ rotate: rotation }}
            transition={{ duration: 1, ease: easeInOut }}
          >
            <defs>
              <pattern
                id="outerPattern"
                patternUnits="userSpaceOnUse"
                width="380"
                height="380"
                x="10"
                y="10"
              >
                <image
                  href={getOptimizedCloudinaryUrl(
                    headerTextureImg?.mediaUrl,
                    380
                  )}
                  width="380"
                  height="380"
                  preserveAspectRatio="xMidYMid slice"
                  style={{
                    opacity: isTextureLoaded ? 1 : 0.5,
                    filter: isTextureLoaded ? "blur(0px)" : "blur(10px)",
                    transition:
                      "opacity 0.3s ease-in-out, filter 0.5s ease-in-out",
                  }}
                />
              </pattern>

              <radialGradient id="sphereGradient">
                <stop offset="0%" stopColor="rgba(255,255,255,0.8)" />
                <stop offset="50%" stopColor="rgba(255,255,255,0)" />
                <stop offset="90%" stopColor="rgba(0,0,0,0.3)" />
                <stop offset="100%" stopColor="rgba(0,0,0,0.5)" />
              </radialGradient>

              <radialGradient id="vignetteOverlay">
                <stop offset="0%" stopColor="rgba(218,164,98,0)" />
                <stop offset="70%" stopColor="rgba(60,47,27,0.2)" />
                <stop offset="90%" stopColor="rgba(60,47,27,0.4)" />
                <stop offset="100%" stopColor="rgba(60,47,27,0.6)" />
              </radialGradient>

              <filter
                id="sphereShadow"
                x="-20%"
                y="-20%"
                width="140%"
                height="140%"
              >
                <feGaussianBlur in="SourceAlpha" stdDeviation="5" />
                <feOffset dx="2" dy="4" />
                <feComponentTransfer>
                  <feFuncA type="linear" slope="0.3" />
                </feComponentTransfer>
                <feMerge>
                  <feMergeNode />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            <g filter="url(#sphereShadow)">
              <circle cx="200" cy="200" r="190" fill="url(#outerPattern)" />

              <circle
                cx="200"
                cy="200"
                r="190"
                fill="url(#sphereGradient)"
                style={{ mixBlendMode: "overlay" }}
              />

              <circle
                cx="200"
                cy="200"
                r="190"
                fill="url(#vignetteOverlay)"
                style={{ mixBlendMode: "multiply" }}
              />
            </g>

            <g>
              {navItems.map(({ name, Icon, angle }) => {
                const isActive =
                  (name === "Home" && location.pathname === "/") ||
                  location.pathname === `/${name.toLowerCase()}`;

                return (
                  <g key={name} transform={`rotate(${angle} 200 200)`}>
                    <Link to={name === "Home" ? "/" : `/${name.toLowerCase()}`}>
                      <g transform={`rotate(-${angle + rotation} 200 45)`}>
                        <g transform="translate(196, 45)">
                          {isActive ? (
                            <g>
                              <motion.text
                                initial={{ opacity: 0, scale: 0.3 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.6 }}
                                textAnchor="middle"
                                dominantBaseline="middle"
                                className="header-text"
                              >
                                {name}
                              </motion.text>
                            </g>
                          ) : (
                            <motion.g
                              initial={{ opacity: 0, scale: 0.4 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ duration: 0.5 }}
                            >
                              <svg
                                viewBox="0 0 40 40"
                                width="38"
                                height="38"
                                color="#e29191"
                                x="-16"
                                y="-14"
                                className="cursor-pointer transition-transform duration-400 hover:scale-110"
                              >
                                <circle
                                  cx="20"
                                  cy="20"
                                  r="19"
                                  fill="#484e4c"
                                  stroke="#1f2222"
                                  strokeWidth="3"
                                />
                                <Icon />
                              </svg>
                            </motion.g>
                          )}
                        </g>
                      </g>
                    </Link>
                  </g>
                );
              })}
            </g>
          </motion.svg>
        </div>

        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-auto z-10">
          <input
            id="checkbox"
            type="checkbox"
            className="hidden"
            checked={isDark}
            onChange={toggleTheme}
          />
          <label className="switch" htmlFor="checkbox">
            <div className="powersign"></div>
          </label>
        </div>

        <motion.div
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          initial={{ rotate: 0 }}
          animate={{ rotate: 360 }}
          transition={{ duration: 1.8, ease: easeInOut }}
        >
          <svg className="w-2/3 h-2/3" viewBox="0 0 200 200">
            <defs>
              <pattern
                id="imagePattern"
                patternUnits="userSpaceOnUse"
                width="160"
                height="160"
                x="20"
                y="20"
              >
                <image
                  href={getOptimizedCloudinaryUrl(headerImg?.mediaUrl, 160)}
                  width="160"
                  height="160"
                  preserveAspectRatio="xMidYMid slice"
                  style={{
                    opacity: isTextureLoaded ? 1 : 0.5,
                    filter: isInnerImgLoaded ? "blur(0px)" : "blur(20px)",
                    transition:
                      "opacity 0.3s ease-in-out, filter 0.5s ease-in-out",
                  }}
                />
              </pattern>
            </defs>

            <circle cx="100" cy="100" r="80" fill="url(#imagePattern)" />
          </svg>
        </motion.div>
      </div>
    </div>
  );
}