import React, {useState} from "react";
import { NavLink } from "react-router-dom";

export default function Nav() {
    

    return (
        // Container for navigation bar
        <div className='nav-container'> 
            <nav className="navbar navbar-expand-lg">

                {/* Bootstrap class for a fluid container */}
                <div className="container-fluid">

                    {/* Brand name */}
                    <a className="navbar-brand logo-name" href="#"> Faizan' </a>
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
                        <a className="nav-link" href="#contact">Contact</a>
                        </li>
                    </ul>
                    </div>
                </div>
            </nav>
        </div>
    );
}