import React from "react";
import SkillImage from "./SkillImage";
import javascript from '../skills/javascript.png'
import java from '../skills/java.png'
import python from '../skills/python.png'
import android from '../skills/android.png'
import mongodb from '../skills/mongodb.png'
import react from '../skills/react.png'
import nodejs from '../skills/nodejs.png'
import mysql from '../skills/mysql.png'


export default function Skill() {

    const imageList = [
        { src: javascript,  alt:'Javascript'},
        { src: java,  alt:'Java'},
        { src: python,  alt:'Python'},
        { src: react,  alt:'React'},
        { src: nodejs,  alt:'NodeJS'},
        { src: android,  alt:'Android'},
        { src: mysql,  alt:'mysql'},
        { src: mongodb,  alt:'Java'},
       
    ];

    return(
        <div>
            <div className="skill-head">
                <h3 className='sub-heading'>Skills</h3>
            </div>

            <div className="image-gallery d-flex flex-wrap align-content-lg-center justify-content-center">
                {imageList.map((image, index) => (
                    <SkillImage key={index} src={image.src} alt={image.alt} />
                ))}
            </div>
        </div>
    );
};