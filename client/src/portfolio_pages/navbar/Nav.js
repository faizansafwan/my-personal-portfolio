import React from "react";
import { NavLink } from "react-router-dom";

export default function Nav() {
    return (
        <div
            className="nav-container"
            style={{
                backdropFilter: "blur(8px)",
                backgroundColor: "rgba(87, 153, 253, 0.8)",
                boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
                position: "sticky",
                top: 0,
                zIndex: 999
            }}
        >
            <nav className="navbar navbar-expand-lg navbar-light">
                <div className="container-fluid">
                    {/* Brand name */}
                    <a className="navbar-brand logo-name" href="#">
                        FS<span className="text-primary">.</span>
                    </a>

                    {/* Toggler button for small screens */}
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarNav"
                        aria-controls="navbarNav"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    {/* Collapsible content */}
                    <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
                        <ul className="navbar-nav mx-2">
                            <li className="nav-item px-2">
                                <a className="nav-link" href="#home">
                                    Home
                                </a>
                            </li>
                            <li className="nav-item px-2">
                                <a className="nav-link" href="#about">
                                    About
                                </a>
                            </li>
                            <li className="nav-item px-2">
                                <a className="nav-link" href="#skill">
                                    Skills
                                </a>
                            </li>
                            <li className="nav-item px-2">
                                <a className="nav-link" href="#project">
                                    My Projects
                                </a>
                            </li>
                            <li className="nav-item px-2">
                                <a className="nav-link" href="#blog">
                                    Blog
                                </a>
                            </li>
                            <li className="nav-item px-2">
                                <a className="nav-link" href="#experience">
                                    Work Experience
                                </a>
                            </li>
                            <li className="nav-item px-2">
                                <a className="nav-link" href="#contact">
                                    Contact
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    );
}
