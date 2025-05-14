import profile from '../../images/profile.png';
import collobration from '../../images/collobration.png';
import technical from '../../images/techical.png';
import solving from '../../images/problem-solving.png';
import learning from '../../images/fast-learning.png';
import React, { useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { motion, useInView } from 'framer-motion';

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
                <p className='bg-primary' style={{ height: '3px', width: '80px', marginBottom: '20px' }}></p>
            </div>

            <div className="text-center fs-5 px-3 px-md-5 mb-4">
                <p className="text-muted">
                    Get to know me, my skills, and what drives me as a software engineer.
                </p>
            </div>

            {/* Flex container responsive */}
            <div className='d-flex flex-column flex-md-row justify-content-center align-items-center m-3 text-black'>
                
                {/* Left Side - Contact */}
                <div className='w-100 w-md-50 px-md-5 mb-4 mb-md-0 text-center'>
                    <div className='d-flex justify-content-center mb-3'>
                        <img className='rounded-circle border border-4 border-primary' src={profile} alt="" width="150px" />
                    </div>

                    <div className='my-4'>
                        <h4>Contact</h4>

                        <div className='mt-3'>
                            <div className="d-flex justify-content-center align-items-center gap-2 mb-2">
                                <FontAwesomeIcon icon={faEnvelope} className='text-primary' style={{ fontSize: '1.5rem' }} />
                                <span>fai.saf010@gmail.com</span>
                            </div>

                            <div className="d-flex justify-content-center align-items-center gap-2 mt-3">
                                <FontAwesomeIcon icon={faLocationDot} className='text-primary' style={{ fontSize: '1.5rem' }} />
                                <span>Kegalle, Sri Lanka</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Side - About Info */}
                <div className='d-flex flex-column gap-4 w-100 px-3'>
                    <div className='p-3 rounded-4 mx-auto' style={{ border: "1px solid rgba(0, 0, 0, 0.1)", maxWidth: '700px' }}>
                        <div className='p-3'>
                            <h3 className='fw-bold'>Faizan Safwan</h3>
                            <p className='text-primary fw-bold fs-5'>Software Engineering Enthusiast</p>
                            <p className='text-muted'>
                                Highly motivated & detail-oriented software engineering enthusiast, offers analytical skills,
                                strong problem-solving abilities, and collaborative team spirit. My dedication and adaptability
                                make me an asset to any company.
                            </p>
                        </div>

                        <div className="px-3">
                            <div className="row row-cols-1 row-cols-sm-2 g-4">
                                <div className="col d-flex">
                                    <img src={collobration} alt="collaboration" width="30px" height="30px" className="me-3" />
                                    <div>
                                        <p className="fw-bold mb-1">Team Collaboration</p>
                                        <p className="text-muted mb-0">Effective communication and cooperative work ethic</p>
                                    </div>
                                </div>

                                <div className="col d-flex">
                                    <img src={technical} alt="technical" width="30px" height="30px" className="me-3" />
                                    <div>
                                        <p className="fw-bold mb-1">Technical Skills</p>
                                        <p className="text-muted mb-0">Strong programming foundation in web technologies</p>
                                    </div>
                                </div>

                                <div className="col d-flex">
                                    <img src={solving} alt="problem solving" width="30px" height="30px" className="me-3" />
                                    <div>
                                        <p className="fw-bold mb-1">Problem Solving</p>
                                        <p className="text-muted mb-0">Analytical approach to efficient solutions</p>
                                    </div>
                                </div>

                                <div className="col d-flex">
                                    <img src={learning} alt="fast learning" width="30px" height="30px" className="me-3" />
                                    <div>
                                        <p className="fw-bold mb-1">Fast Learning</p>
                                        <p className="text-muted mb-0">Quickly adapts to new tech & methodologies</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Stats */}
                    <div className='d-flex flex-column flex-sm-row gap-4 justify-content-center mt-4'>
                        <div className='p-3 rounded-2 text-center border border-1 border-light shadow-sm'>
                            <p className='fw-bold text-primary fs-3 mb-0'>2+</p>
                            <p className='fw-bold text-muted'>Experiences</p>
                        </div>

                        <div className='p-3 rounded-2 text-center border border-1 border-light shadow-sm'>
                            <p className='fw-bold text-primary fs-3 mb-0'>5+</p>
                            <p className='fw-bold text-muted'>Projects</p>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
