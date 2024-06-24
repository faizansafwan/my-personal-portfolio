import React, { useRef } from "react";
import ProjectModel from "./ProjectModel";
import project1 from '../projects/project1.jpg'
import project2 from '../projects/project2.jpeg'
import project3 from '../projects/project3.jpeg'
import project4 from '../projects/project4.jpg'
import project5 from '../projects/project5.jpg'
import {faChevronLeft, faChevronRight} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Project() {



    const projectList = [
        {pName: 'Project1', src: project1, alt: 'project1', pDesc: 'welcome to project1' },
        {pName: 'Project2', src: project2, alt: 'project2', pDesc: 'welcome to project2' },
        {pName: 'Project3', src: project3, alt: 'project3', pDesc: 'welcome to project3' },
        {pName: 'Project4', src: project4, alt: 'project4', pDesc: 'welcome to project4' },
        {pName: 'Project5', src: project5, alt: 'project5', pDesc: 'welcome to project5' }
    ]

    return(
        <div>
            <div className="project-head">
                <h3 className="sub-heading">Projects</h3>
            </div>

            
            <div className="project-container d-flex flex-wrap align-content-between" >     
                    {projectList.map((content, index) => (
                    <ProjectModel key={index} projectName={content.pName} src={content.src} alt={content.alt} link={content.pDesc} />
                    ))}      
            </div>   
            

            
        </div>
    );
}