import React from 'react';
import AboutCard from '../components/layout/AboutCard';

export default function About() {
  return (
    <div className='my-4'>
      <AboutCard 
        type='profile'
        title='About Me'
        content={
          <p className='text-lg'>
          I'm a passionate Junior Web Developer with a deep interest in technology and web development.
          My journey into programming began when -describe how you got into web development-. 
          I'm constantly motivated to learn new technologies and improve my skills.
          </p>
        }
      />
      <AboutCard 
        type='education'
        title='My Journey'
        content={
          <div>
            <h3 className='text-center text-2xl mb-2'>Education</h3>
            <ul className='text-md list-disc pl-5 space-y-2'>
              <li>Course/Bootcamp/University in Web Development</li>
              <li>Online certifications (e.g., freeCodeCamp, Coursera)</li>
              <li>Practical projects and completed tutorials</li>
            </ul>
          </div>
        }
      />
      <AboutCard 
        type='project'
        title='Personal Projects'
        content={
          <div>
            <p className='text-md font-bold mb-2'>
              Throughout my learning journey, I've developed several projects to put my skills into practice:
            </p>
            <ul className='text-md list-disc pl-5 space-y-2'>
              <li>To-Do App built with React and localStorage</li>
              <li>Weather App with API integration</li>
              <li>Responsive personal portfolio</li>
            </ul>
          </div>
        }
      />
      <AboutCard 
        type='technicalSkills'
        title='Technical Skills'
        content={
            <ul>
              <li className='max-w-fit px-3 py-1 bg-purple-100 text-purple-800 rounded-full font-medium text-sm border border-purple-200 my-1'>HTML5</li>
              <li className='max-w-fit px-3 py-1 bg-purple-100 text-purple-800 rounded-full font-medium text-sm border border-purple-200 my-1'>CSS3</li>
              <li className='max-w-fit px-3 py-1 bg-purple-100 text-purple-800 rounded-full font-medium text-sm border border-purple-200 my-1'>JavaScript</li>
              <li className='max-w-fit px-3 py-1 bg-purple-100 text-purple-800 rounded-full font-medium text-sm border border-purple-200 my-1'>React.js</li>
              <li className='max-w-fit px-3 py-1 bg-purple-100 text-purple-800 rounded-full font-medium text-sm border border-purple-200 my-1'>Git</li>
              <li className='max-w-fit px-3 py-1 bg-purple-100 text-purple-800 rounded-full font-medium text-sm border border-purple-200 my-1'>Responsive Design</li>
            </ul>
        }
      />
      <AboutCard 
        type='softSkills'
        title='Soft Skills'
        content={
          <ul>
            <li className='max-w-fit px-3 py-1 bg-orange-50 text-orange-800 rounded-full font-medium text-sm border border-orange-200 my-1'>Problem Solving</li>
            <li className='max-w-fit px-3 py-1 bg-orange-50 text-orange-800 rounded-full font-medium text-sm border border-orange-200 my-1'>Fast Learner</li>
            <li className='max-w-fit px-3 py-1 bg-orange-50 text-orange-800 rounded-full font-medium text-sm border border-orange-200 my-1'>Attention to Detail</li>
            <li className='max-w-fit px-3 py-1 bg-orange-50 text-orange-800 rounded-full font-medium text-sm border border-orange-200 my-1'>Team Player</li>
            <li className='max-w-fit px-3 py-1 bg-orange-50 text-orange-800 rounded-full font-medium text-sm border border-orange-200 my-1'>Time Management</li>
          </ul>
        }
      />
      <AboutCard 
        type='goals'
        title='Goals'
        content={
          <p>
            My goal is to become a well-rounded web developer, specializing in React and modern frontend technologies.
            I'm seeking opportunities that will allow me to grow professionally, contribute to real-world projects, 
            and learn from experienced developers.
          </p>
      }
      />
    </div>
  )
}
