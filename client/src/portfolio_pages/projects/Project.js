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
        {pName: 'Travel Management Mobile Application', src: project1, alt: 'project1', link: 'https://github.com/faizansafwan/Travel-Management-Mobile-Application' },
        {pName: 'Student Registration Portal', src: project2, alt: 'project2', link: 'https://github.com/faizansafwan/student-registration' },
        {pName: 'Web Apllication A/L Completed Students', src: project3, alt: 'project3', link: 'https://github.com/AmnaAroos2000/Student_Portal' },
        {pName: 'Car Rental Service', src: project4, alt: 'project4', link: 'https://github.com/faizansafwan/Car-Rental-Service' },
        {pName: 'Hospital Database Management System', src: project5, alt: 'project5', link: 'https://github.com/faizansafwan/Hospital-Database-Management-System' }
    ]

    return(
        <div>
            <div className="project-head">
                <h3 className="sub-heading">Projects</h3>
            </div>

            
            <div className="project-container d-flex flex-wrap align-content-between" >     
                    {projectList.map((content, index) => (
                    <ProjectModel key={index} projectName={content.pName} src={content.src} alt={content.alt} pLink={content.link} />
                    ))}      
            </div>   
            

            
        </div>
    );
}