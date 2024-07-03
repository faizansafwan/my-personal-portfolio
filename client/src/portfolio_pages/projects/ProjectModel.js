import React from "react";
import './ProjectModel.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";

const ProjectModel = ({projectName,src, alt, pLink}) => {

    return(

        // Design the structure for each project 
        <div className="project-parent">

                {/* Image container and design the image container */}
                <div className="img-container">
                    <img src={src} alt={alt} className="img"/>
                </div>

                {/* Container to include project name,and project link  */}
                <div className="projectName-container">
                    <h4><b>{projectName}</b></h4> <br />
                    <a href={pLink}><FontAwesomeIcon icon={faArrowUpRightFromSquare} size="2x"/></a>
                </div>  

        </div>
    );
}

export default ProjectModel;