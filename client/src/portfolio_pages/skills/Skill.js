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
                <h3 className=' fs-1 fw-semibold '>My Skills</h3>
            </div>

            <div className=" w-100 m-2 d-grid gap-3 " style= {{ gridTemplateColumns: "repeat(3, 1fr)" }}>
                {skillList.map((element, index) => (
                   <div 
                        key={index} 
                        className="m-1 p-3 bg-light rounded-2 shadow-lg"
                        onMouseEnter={() => setHoveredSkill(index)}
                        onMouseLeave={() => setHoveredSkill(null)}
                    >
                        <div className="d-flex justify-content-center">
                            <img 
                                src={element.src} 
                                className="w-25" 
                                alt={element.alt} />
                        </div>

                        <div className="my-4">
                            <h4 className={`fw-bold skill-title ${hoveredSkill === index ? 'slide-in' : ''}`} >
                                {element.name}
                            </h4>
                        </div>


                        <div className="d-flex flex-wrap gap-2">
                            {
                                element.elements.map((item, itemIndex) => (
                                    <div key={itemIndex}>
                                        <p className="rounded-5 p-2 px-3" style={{
                                            backdropFilter: 'blur(8px)',
                                            backgroundColor: 'rgba(197, 217, 246, 0.7)',
                                            boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
                                            transition: 'all 0.3s ease',
                                            transform: hoveredSkill === index ? 'scale(1.04)' : 'scale(1)',
                                        }}>{item}</p>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                
                ))}
                
            </div>
            
        </div>
    );
};