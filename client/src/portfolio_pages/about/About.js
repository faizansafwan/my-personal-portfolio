import profile2 from '../about/Profile2.jpg'
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faUser, faEnvelope} from '@fortawesome/free-regular-svg-icons'
import {faLocationDot, faCakeCandles} from '@fortawesome/free-solid-svg-icons'

export default function About() {

    return (
        <div className='about-parent col'>
            <div className='d-flex justify-content-start about-head'>
                <h3 className='sub-heading'>About me</h3>
            </div>


            <div className='about-profile'>
                <p>Highly motivated & Detail-oriented software engineering enthusiast,
                offers analytical skills, strong problem-solving abilities, and 
                collaborative team spirit. My dedication and adaptability make me 
                an asset to any company.  
                </p>
            </div>
            

            <div className='about-detail'>

              <div className='d-flex mb-3'>
                <div className='order-1 p-2'>
                    <FontAwesomeIcon icon={faUser} size='1x' color='black'  /> &nbsp; Faizan Safwan </div>
                <div className='order-2 p-2'>
                <FontAwesomeIcon icon={faEnvelope} size='1x' color='black'  /> &nbsp; fai.saf010@gmail.com </div>
              </div> 

              <div className='d-flex flex-nowrap'>
                <div className='order-1 p-2'>
                    <FontAwesomeIcon icon={faLocationDot} size='1x' color='black'  /> &nbsp; Hemmathagama Kegalle, Sri Lanka </div>
                <div className='order-2 p-2'>
                    <FontAwesomeIcon icon={faCakeCandles} color='black' /> &nbsp; 29/02/2000
                </div>
              </div> 
              
            </div>

            <div className='download-btn'>
                <button className='primary-btn p-3 rounded-4 border-0' >Download Resume</button>
            </div>
            
            <div className='img2 '>
                <img src={profile2} alt="" height={'300px'} width={'300px'}/>
            </div>
        </div>
    );
}