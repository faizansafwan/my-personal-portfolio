import React, { useState, useEffect, useRef } from 'react';
import Nav from '../navbar/Nav';
import Typed from 'typed.js';
import profile1 from './profile1.jpg';
import About from '../about/About';
import '../../index.css'
import Skill from '../skills/Skill';
import AOS from 'aos';
import 'aos/dist/aos.css'
import Project from '../projects/Project';
import Blog from '../blog/Blog';
import Contact from '../contact/Contact';
import Footer from '../footer/Footer';
import Experience from '../workExperience/Experience';


export default function Profile() {

    const autoType = useRef(null);

    React.useEffect ( () => {
        const typed = new Typed(autoType.current, {
            strings: ['<i> Faizan </i>'], 
            typeSpeed: 130,
            backSpeed: 100,
            loop: false,
        
        });


        return () => {
            typed.destroy();
        }
    }, []);

    useEffect(() => {
        AOS.init({duration: 2000})
    }, []);

    return (
        <div className='profile-container container-fluid'>
            <Nav/>

                {/* Home Layout */}
                <div className='home-parent col' data-aos="fade-up" id='home'>
                    <div className=' d-flex justify-content-around'>

                        <div className='greet'>
                            <h3 className='fw-bold text-center' style={{fontSize: '2.5rem'}}>Hi! I am <span ref={autoType} className='auto-type' /></h3>
                            <p className='text-center' style={{fontSize: '1.5rem'}}>Software Engineering Enthusiast & Full Stack Developer</p> 
                        </div>

                    </div>

                   
                        {/* Design linkedIn, GitHub logo with link */}
                    <div className="d-flex justify-content-center gap-4 my-3">
                        <a 
                            href="https://github.com/faizansafwan"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="social-icon-link">
                            <i className="bi bi-github text-white rounded-circle"></i>
                        </a>
                        <a
                            href="https://www.linkedin.com/in/faizansafwan-20000/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="social-icon-link">
                            <i className="bi bi-linkedin text-white rounded-circle"></i>
                        </a>
                    </div>

                    <div className='d-flex justify-content-center'>
                        <div className='contact-btn'>
                        <button className='primary-btn p-3 rounded-4 border-0 d-flex align-items-center gap-2'>
  <a className="nav-link text-white text-decoration-none" href="#about">
    View My work <i className="bi bi-arrow-down-circle-fill ms-2"></i>
  </a>
</button>

                        </div>
                    </div>
                    
                </div>


            {/* About Layout */}
            <div className='position-relative about-layout' data-aos="fade-right" id='about'>
                <About/>   
            </div>
               
            {/* Skills Layout */}
            <div className='skill-layout' data-aos="fade-up" id='skill'>
                <Skill/>
            </div>

            {/* Project Layout */}
            <div className='project-layout' data-aos="zoom-out" id='project'>
                <Project/>
            </div>
               
            {/* Blog Layout */}
            <div className='blog-layout' id='blog'>
                <Blog/>
            </div>

            {/* Experience Layout */}
            <div className='experience-layout' id='experience'>
                <Experience />
            </div>

            {/* Contact Layout */}
            <div className='contact-layout' id='contact'>
                <Contact/>
            </div>

            {/* Footer Layout */}
            <div className='footer-layout' id='footer'>
                <Footer/>
            </div>

        </div>    
    );
}



