import React, {useEffect} from "react";
import './SkillImage.css';
import AOS from 'aos'
import 'aos/dist/aos.css'


    const SkillImage = ({src, alt}) => {

        useEffect(() => {
            AOS.init({duration: 1000})
        }, []);

        return (
                // Structure to showcase each skill
                <div className="img-skill d-inline-block rounded-1 align-content-center" >
                    <img src={src} alt={alt} className="h-75 d-block" data-aos="zoom-in"/>
                </div>
            
        );
    };
    
export default SkillImage;