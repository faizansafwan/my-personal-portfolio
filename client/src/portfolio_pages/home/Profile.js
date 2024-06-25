import React, { useState, useEffect } from 'react';
import Nav from '../navbar/Nav';
import Typed from 'typed.js';
import profile1 from './profile1.jpg';
import About from '../about/About';
import profile2 from '../about/Profile2.jpg'
import Skill from '../skills/Skill';
import AOS from 'aos';
import 'aos/dist/aos.css'
import Project from '../projects/Project';
import Blog from '../blog/Blog';
import Contact from '../contact/Contact';
import Footer from '../footer/Footer';


export default function Profile() {

    const autoType = React.useRef(null);

    React.useEffect ( () => {
        const typed = new Typed(autoType.current, {
            strings: ['<i> Faizan </i>', '<i> Programmer </i>'], 
            typeSpeed: 130,
            backSpeed: 100,
            loop: true,
        
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

            <div className='row row-cols-1'>
                <div className='home-parent col' data-aos="fade-up" id='home'>
                    <div className=' d-flex justify-content-around'>
                        <div className='greet'>
                            <h3>Hey! Viewers</h3>
                            <h4>I am <span ref={autoType} className='auto-type' /></h4>
                            <p>Passionate and eager to coding, <br /> volunteeering and teaching</p> 
                        </div>
                        <div className='profile-img1'>
                        <img src={profile1} alt="" height={'190px'} width={'170px'} />
                        </div>
                    </div>

                    <div className='d-flex justify-content-center'>
                        <div className='quote m-4'>
                        <p>“ Keep Goal, Don’t stop work <br />smart until you achieve it “</p>
                        </div>
                    </div>
                    
                    <div className='d-flex justify-content-center'>
                        <div className='contact-btn'>
                            <button className='primary-btn p-3 rounded-4 border-0'> Contact Me </button>
                        </div>
                    </div>
                </div>


            </div>

            <div className='position-relative about-layout' data-aos="fade-right" id='about'>
                <About/>   
            </div>
               
            <div className='skill-layout' data-aos="fade-up" id='skill'>
                <Skill/>
            </div>

            <div className='project-layout' data-aos="zoom-out" id='project'>
                <Project/>
            </div>
               
            <div className='blog-layout' id='blog'>
                <Blog/>
            </div>

            <div className='contact-layout' id='contact'>
                <Contact/>
            </div>

            <div className='footer-layout' id='footer'>
                <Footer/>
            </div>

        </div>    
    );
}



