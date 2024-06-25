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