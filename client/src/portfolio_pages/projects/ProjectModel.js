import React from "react";
import './ProjectModel.css'

const ProjectModel = ({projectName,src, alt, desc}) => {

    return(
        <div className="project-parent">

                <div className="img-container">
                    <img src={src} alt={alt} />
                </div>

                <div className="projectName-container">
                    <h4><b>{projectName}</b></h4>
                </div>  
                
        </div>
    );
}

export default ProjectModel;