import React from "react";
import './ProjectModel.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";

const ProjectModel = ({projectName,src, alt, desc}) => {

    return(
        <div className="project-parent">
         
                <div className="img-container">
                    <img src={src} alt={alt} className="img"/>
                </div>
                <div className="projectName-container">
                    <h4><b>{projectName}</b></h4> <br />
                    <a href=""><FontAwesomeIcon icon={faArrowUpRightFromSquare} size="2x"/></a>
                </div>  

        </div>
    );
}

export default ProjectModel;