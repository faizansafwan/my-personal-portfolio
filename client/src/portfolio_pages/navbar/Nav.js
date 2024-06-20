import React, {useState} from "react";
import { NavLink } from "react-router-dom";

export default function Nav() {
    

    return (
        <div className='nav-container'>
            <nav className="navbar navbar-expand-lg">
                <div className="container-fluid">
                    <a className="navbar-brand logo-name" href="#"> Faizan' </a>
                    <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
                    <ul className="navbar-nav mx-2">
                        <li className="nav-item px-2">
                        <a className="nav-link" aria-current="page" href="#">Home</a>
                        </li>
                        <li className="nav-item px-2">
                        <a className="nav-link" href="#">About</a>
                        </li>
                        <li className="nav-item px-2">
                        <a className="nav-link" href="#">Skills</a>
                        </li>
                        <li className="nav-item px-2">
                        <a className="nav-link" href="#">My Projects</a>
                        </li>
                        <li className="nav-item px-2">
                        <a className="nav-link" href="#">Blog</a>
                        </li>
                        <li className="nav-item px-2">
                        <a className="nav-link" href="#">Contact</a>
                        </li>
                    </ul>
                    </div>
                </div>
            </nav>
        </div>
    );
}