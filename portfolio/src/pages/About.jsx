import React, { useState, useEffect } from "react";
import AboutCard from "../components/layout/AboutCard";
import { ResponsiveCloudinaryImage } from "../components/ui";
import { mediaService } from "../services/apiService";
import { useTheme } from "../context/ThemeContext";
import { ArrowRightIcon, XMarkIcon } from "@heroicons/react/24/solid";
import "./About.css";

export default function About() {
  const GRADUATION_CERTIFICATE_IMG = "68c1d1a7d12adfc2ce979970";

  // useState per salvare l'immagine Graduation Certificate
  const [certificate, setCertificate] = useState([]);

  // useState per gestire visualizzazione dell'immagine Graduation Certificate
  const [isClicked, setIsClicked] = useState(false);

  // useEffect per il caricamento dell'immagine Graduation Certificate
  useEffect(() => {
    const fetchImgData = async () => {
      try {
        const certificateImageData = await mediaService.getMediaById(
          GRADUATION_CERTIFICATE_IMG
        );
        if (certificateImageData) {
          setCertificate(certificateImageData.data);
        }
      } catch (error) {
        console.error(
          "Errore nel caricamento dell'immagine Graduation Certificate",
          error
        );
      }
    };

    fetchImgData();
  }, []);

  const { isDark } = useTheme();

  return (
    <>
      {isClicked && 
        <div 
          className={`
            w-full h-full z-20 fixed top-0 left-0
            ${isDark ? 'bg-black/60' : 'bg-black/50'}
          `}
        >
        </div>
      }
      <div className="z-10">
        <AboutCard
          type="profile"
          title="About Me"
          content={
            <p className="text-md">
              I'm a passionate Junior Web Developer with a deep interest in
              technology and web development. I'm constantly motivated to learn
              new technologies and improve my skills.
            </p>
          }
        />
        <AboutCard
          type="education"
          title="My Journey"
          content={
            <div>
              <p className="text-md">
                I completed an intensive 6-month Web Development course,
                featuring live-coding sessions, daily exercises, and weekly
                projects that simulated real-world development scenarios. The
                program provided an in-depth focus on the MERN stack (MongoDB,
                Express.js, React, Node.js), along with HTML5, CSS3, and modern
                JavaScript (ES6+). I gained expertise in both Front-end and
                Back-end development, culminating in the creation of full-stack
                web applications. This training allowed me to master industry
                best practices and develop a results-oriented, problem-solving
                mindset.
              </p>
              <div className="flex flex-column justify-end mt-4">
                <ArrowRightIcon className="w-8 px-1" />
                <p
                  className={`
                    font-lobster text-lg select-none hover:underline cursor-pointer
                    ${isDark ? "hover:text-[#fde047]" : "hover:text-[#515151]"}
                  `}
                  onClick={() => setIsClicked(true)}
                >
                  Graduation Certificate
                </p>
              </div>
            </div>
          }
        />
        <AboutCard
          type="project"
          title="Personal Projects"
          content={
            <div>
              <p className="text-md font-bold mb-2">
                Throughout my learning journey, I've developed several projects
                to put my skills into practice:
              </p>
              <ul className="text-md list-disc pl-5 space-y-2">
                <li>
                  E-commerce designed for selling plants and related products
                </li>
                <li>Responsive personal portfolio</li>
                <li>
                  <span className="inline-flex items-center">
                    Other minor projects <ArrowRightIcon className="w-6 px-1" />{" "}
                    check out my
                    <a
                      href="https://github.com/mihail093"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`
                        font-lobster px-1 text-lg select-none
                        ${
                          isDark
                            ? "hover:text-[#4ade80]"
                            : "hover:text-[#16a34a]"
                        }
                      `}
                    >
                      Github
                    </a>
                  </span>
                </li>
              </ul>
            </div>
          }
        />
        <AboutCard
          type="technicalSkills"
          title="Technical Skills"
          content={
            <div className="flex justify-end">
              <ul
                className="
                    max-w-fit py-6 px-14 bg-[#f7f4ff] text-purple-800 font-medium text-sm
                    rounded-full border-2 border-purple-400
                  "
              >
                <li
                  className="
                      max-w-fit px-3 py-1 bg-purple-100 rounded-full border border-purple-200 my-1
                    "
                >
                  HTML5
                </li>
                <li
                  className="
                      max-w-fit px-3 py-1 bg-purple-100 rounded-full border border-purple-200 my-1
                    "
                >
                  CSS3
                </li>
                <li
                  className="
                      max-w-fit px-3 py-1 bg-purple-100 rounded-full border border-purple-200 my-1
                    "
                >
                  JavaScript
                </li>
                <li
                  className="
                      max-w-fit px-3 py-1 bg-purple-100 rounded-full border border-purple-200 my-1
                    "
                >
                  React.js
                </li>
                <li
                  className="
                      max-w-fit px-3 py-1 bg-purple-100 rounded-full border border-purple-200 my-1
                    "
                >
                  Git
                </li>
                <li
                  className="
                      max-w-fit px-3 py-1 bg-purple-100 rounded-full border border-purple-200 my-1
                    "
                >
                  Responsive Design
                </li>
              </ul>
            </div>
          }
        />
        <AboutCard
          type="softSkills"
          title="Soft Skills"
          content={
            <ul
              className="
                max-w-fit py-6 px-10 bg-orange-50 text-orange-50 font-medium text-sm
                rounded-full border-2 border-orange-400
              "
            >
              <li
                className="
                  max-w-fit px-3 py-1 bg-[#846a6a] rounded-full border border-orange-200 my-1
                "
              >
                Problem Solving
              </li>
              <li
                className="
                  max-w-fit px-3 py-1 bg-[#846a6a] rounded-full border border-orange-200 my-1
                "
              >
                Fast Learner
              </li>
              <li
                className="
                  max-w-fit px-3 py-1 bg-[#846a6a] rounded-full border border-orange-200 my-1
                "
              >
                Attention to Detail
              </li>
              <li
                className="
                  max-w-fit px-3 py-1 bg-[#846a6a] rounded-full border border-orange-200 my-1
                "
              >
                Team Player
              </li>
              <li
                className="
                  max-w-fit px-3 py-1 bg-[#846a6a] rounded-full border border-orange-200 my-1
                "
              >
                Time Management
              </li>
            </ul>
          }
        />
        <AboutCard
          type="goals"
          title="Goals"
          content={
            <p className="text-md">
              My goal is to become a well-rounded web developer, specializing in
              React and modern frontend technologies. I'm seeking opportunities
              that will allow me to grow professionally, contribute to
              real-world projects, and learn from experienced developers.
            </p>
          }
        />
      </div>
      {isClicked &&
        <div className="main-container sticky bottom-[10%] left-[22%] z-50 bg-white border-2 border-[#23103e]">
          <div className="w-full flex justify-end">
            <XMarkIcon 
              className="w-6 m-2 text-black cursor-pointer hover:text-gray-600"
              onClick={() => setIsClicked(false)}
            />
          </div>
          <ResponsiveCloudinaryImage imageUrl={certificate.mediaUrl} alt="immagine certificato" />
        </div>
      }
    </>
  );
}
