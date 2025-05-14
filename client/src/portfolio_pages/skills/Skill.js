import React, { useState } from "react";
import SkillImage from "./SkillImage";
import './SkillImage.css';
import frontend from '../../images/frontend.gif'
import backend from '../../images/backend.gif'
import database from '../../images/database.gif'
import uiux from '../../images/uiux.gif'
import mobile from '../../images/mobile.gif'
import tools from '../../images/tools.gif'

export default function Skill() {
    const [hoveredSkill, setHoveredSkill] = useState(null);

    const skillList = [
        { name: 'Frontend', src: frontend, 
            elements: ["HTML5", "CSS3", "JavaScript", "TypeScript", "React", "TailwindCSS", "Bootstrap"],
              alt:'Javascript'},

        { name: 'Backend', src: backend, elements: ["Node.js", "Express", ".NET Core", "Java", "RESTful APIs" ], 
              alt:'Java'},

        { name: 'UI/UX Design', src: uiux, elements: ["Figma", "Wireframing", "Prototyping", "User Research" ],
              alt:'Python'},

        { name: 'Database & Cloud', src: database, elements: ["MongoDB", "MySQL", "MSSQL", "Firebase", "AWS"],
              alt:'React'},

        { name: 'Tools & Workflow', src: tools, elements: ["Git", "GitHub","VS Code", "Cursor", "Agile"],
              alt:'NodeJS'},

        { name: 'Mobile Development', src: mobile, elements: ["React Native", "Android Studio","Responsive Design"],
              alt:'Android'},
        
    ];

    return(
        <div className="m-4 text-black">
            {/* Sub heading - Skills */}
            <div className=" m-1 my-5">
                <h3 className='  fw-semibold border-start border-5 border-primary ps-3 py-2 '>My Skills</h3>
            </div>

            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4">
            {skillList.map((element, index) => (
                <div 
                key={index} 
                className="col"
                onMouseEnter={() => setHoveredSkill(index)}
                onMouseLeave={() => setHoveredSkill(null)}
                >
                <div className="m-1 p-3 bg-light rounded-2 shadow-lg h-100">
                    <div className="d-flex justify-content-center">
                    <img 
                        src={element.src} 
                        className="img-fluid w-50" 
                        alt={element.alt} 
                    />
                    </div>

                    <div className="my-4 text-center">
                    <h4 className={`fw-bold skill-title ${hoveredSkill === index ? 'slide-in' : ''}`}>
                        {element.name}
                    </h4>
                    </div>

                    <div className="d-flex flex-wrap gap-2 justify-content-center">
                    {element.elements.map((item, itemIndex) => (
                        <div key={itemIndex}>
                        <p className="rounded-5 p-2 px-3 skill-pill">
                            {item}
                        </p>
                        </div>
                    ))}
                    </div>
                </div>
                </div>
            ))}
            </div>

            
        </div>
    );
};