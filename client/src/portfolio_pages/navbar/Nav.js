import React, {useState} from "react";
import { NavLink } from "react-router-dom";

export default function Nav() {
    

    return (
        // Container for navigation bar
        <div className='nav-container' style={{
            backdropFilter: 'blur(8px)',
            backgroundColor: 'rgba(87, 153, 253, 0.8)',
            boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)'
        }}> 
            <nav className="navbar navbar-expand-lg">

                {/* Bootstrap class for a fluid container */}
                <div className="container-fluid">

                    {/* Brand name */}
                    <a className="navbar-brand logo-name" href="#"> FS<span className="text-primary">.</span> </a>
                    <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
                    
                    {/* class for a list of navigation items */}
                    <ul className="navbar-nav mx-2">

                        {/* Individual navigation item */}
                        <li className="nav-item px-2">
                        
                        {/* Link for navigation item */}
                        <a className="nav-link" aria-current="page" href="#home">Home</a>
                        </li>
                        
                        <li className="nav-item px-2">
                        <a className="nav-link" href="#about">About</a>
                        </li>                       
                        <li className="nav-item px-2">
                        <a className="nav-link" href="#skill">Skills</a>
                        </li>
                        <li className="nav-item px-2">
                        <a className="nav-link" href="#project">My Projects</a>
                        </li>
                        <li className="nav-item px-2">
                        <a className="nav-link" href="#blog">Blog</a>
                        </li>

                        <li className="nav-item px-2">
                        <a className="nav-link" href="#experience">Work Experience</a>
                        </li>

                        <li className="nav-item px-2">
                        <a className="nav-link" href="#contact">Contact</a>
                        </li>
                    </ul>
                    </div>
                </div>
            </nav>
        </div>
    );
}