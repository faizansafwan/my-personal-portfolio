
import profile from '../../images/profile.png'
import collobration from '../../images/collobration.png'
import technical from '../../images/techical.png'
import solving from '../../images/problem-solving.png'
import learning from '../../images/fast-learning.png'
import React, { useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faUser, faEnvelope} from '@fortawesome/free-regular-svg-icons'
import {faLocationDot} from '@fortawesome/free-solid-svg-icons'
import { motion, useInView  } from 'framer-motion'

export default function About() {

    const ref = useRef(null);
    const isInView = useInView(ref, { once: false, amount: 0.2 });

    

    return (

        <motion.div
        ref={ref}
        initial={{ rotateX: -90, opacity: 0 }}
        animate={isInView ? { rotateX: 0, opacity: 1 } : { rotateX: 90, opacity: 0 }}
        transition={{ duration: 1, ease: 'backOut' }}
        style={{ transformOrigin: 'top center', perspective: 1000 }}
        >
        
            <div className='d-flex flex-column justify-content-center align-items-center about-head'>
                <h3 className='sub-heading'>About me</h3>
                <p className=' bg-primary ' style={{ height: '3px', width: '80px', marginBottom: '20px'}}></p>
            </div>

            <div className="m-5 text-center fs-3">
                <p className="mx-5 text-muted">
                    Get to know me, my skills, and what drives me as a software engineer.
                </p>
            </div>

{/* Flex */}
        <div className='d-flex justify-content-center m-5 text-black'>

                {/* Left Side - Contact */}
                <div className='w-50 px-5'>
                    <div className='d-flex justify-content-center'>
                        <img className='rounded-circle border border-4 border-primary' src={profile} alt="" height={'auto'} width={'150px'}/>
                    </div>

                    <div className='my-5'>
                        <div><h4>Contact</h4></div>

                        <div className='m-3'>
                            <div className="d-flex gap-2 mb-2">
                                <FontAwesomeIcon icon={faEnvelope}  className='text-primary' style={{fontSize: '1.5rem'}} />
                                <span className="ms-2">fai.saf010@gmail.com</span>
                            </div>

                            <div className="d-flex gap-2 mt-3">
                                <FontAwesomeIcon icon={faLocationDot} className='text-primary' style={{fontSize: '1.5rem'}} />
                                <span className="ms-2">Kegalle, Sri Lanka</span>
                            </div>
                        </div>

                    </div>

                </div>

                {/* Right Side - About */}

                <div className='d-flex flex-column gap-4'>
                    <div className='p-3 rounded-4 mx-5' style={{ border: "1px solid rgba(0, 0, 0, 0.1)"  }}>
                        <div className='p-4'>
                            <h3 className='fw-bold'>Faizan Safwan</h3>
                        </div>

                        <div className='px-4'>
                            <p className='text-primary fw-bold' style={{fontSize: '1.2rem'}}>Software Engineering Enthusiast</p>
                        </div>


                        <div className='px-4'>
                            <p className='text-muted'>Highly motivated & Detail-oriented software engineering enthusiast,
                            offers analytical skills, strong problem-solving abilities, and 
                            collaborative team spirit. My dedication and adaptability make me 
                            an asset to any company.  
                            </p>
                        </div>

                        <div className="m-4">
                            <div className="row row-cols-1 row-cols-md-2 g-4">
                                <div className="col d-flex">
                                    <img src={collobration} alt="collaboration" height="30px" width="30px" className="me-3" />
                                <div>
                                    <p className="fw-bold mb-1">Team Collaboration</p>
                                    <p className="text-muted mb-0">Effective communication and cooperative work ethic</p>
                                </div>
                            </div>

                            <div className="col d-flex">
                                <img src={technical} alt="technical skills" height="30px" width="30px" className="me-3" />
                                <div>
                                    <p className="fw-bold mb-1">Technical Skills</p>
                                    <p className="text-muted mb-0">Strong programming foundation with focus on web technologies</p>
                                </div>
                            </div>

                            <div className="col d-flex">
                                <img src={solving} alt="problem solving" height="30px" width="30px" className="me-3" />
                                <div>
                                    <p className="fw-bold mb-1">Problem Solving</p>
                                    <p className="text-muted mb-0">Analytical approach to finding efficient solutions</p>
                                </div>
                            </div>

                            <div className="col d-flex">
                                <img src={learning} alt="fast learning" height="30px" width="30px" className="me-3" />
                                <div>
                                    <p className="fw-bold mb-1">Fast Learning</p>
                                    <p className="text-muted mb-0">Quickly adapts to new technologies and methodologies</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className=' mx-4 d-flex flex-row gap-4 justify-content-center'>

                    <div className='p-2 px-3 rounded-2 mx-5' style={{ border: "1px solid rgba(0, 0, 0, 0.06)"  }}>
                        <p className='fw-bold mb-0 text-center text-primary' style={{fontSize: '2rem'}}>2+</p>
                        <p className='fw-bold text-center text-muted'>Experiences</p>
                    </div>

                    <div className='p-2 px-3 rounded-2 mx-5' style={{ border: "1px solid rgba(0, 0, 0, 0.1)"  }}>
                        <p className='fw-bold mb-0 text-center text-primary' style={{fontSize: '2rem'}}>5+</p>
                        <p className='fw-bold text-center text-muted'>Project</p>
                    </div>

                </div>

            </div>
            
        </div>

</motion.div>

        
    );
}