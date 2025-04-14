import React from "react";
import ProjectModel from "./ProjectModel";
import './ProjectModel.css'
import tripAt from '../../images/Trip-at.png'
import tripAtMobile from '../../images/trip-at-mobile.png'
import retailSystem from '../../images/retail-system.png'
import studentPortal from '../../images/student-portal.png'


export default function Project() {

    // List of projects
    const projectList = [
        {pName: 'Trip At - Traval Content Sharing Platform', src: tripAt, alt: 'Trip-At Web for travel content sharing',
            link: 'https://trip-at-one.vercel.app/',
            desc: `Trip At is a MERN stack-based web platform designed to let users share travel experiences, manage
            trips, and plan budgets collaboratively. It features a responsive UI built with Tailwind CSS and Redux
            for state management. The application integrates Firebase for real-time functionality and user 
            authentication, enabling secure interactions and dynamic content sharing among travel enthusiasts.
        `},

        

        {pName: 'Student Portal', src: studentPortal, alt: 'Student Portal for finding career opportunities',
            link: 'https://github.com/AmnaAroos2000/Student_Portal', 
            desc: `The Student Portal is a web-based platform built with JavaScript, PHP, MySQL, and JQuery. It 
            helps students discover suitable government universities and colleges in Sri Lanka based on their 
            A/L results. ` },

        {pName: 'Trip At - Mobile Application', src: tripAtMobile, alt: 'Trip-At Mobile Application',
            link: 'https://github.com/faizansafwan/Travel-Management-Mobile-Application',
            desc: `This mobile version of Trip At is developed using Java and Firebase, tailored for Android devices.
            It allows users to log trips, share photos and locations and connect with a community of
             travelers.` 
        },

        {pName: 'Retail Management System', src: retailSystem, alt: 'Retail Management System',
            link: 'https://github.com/faizansafwan/backend-retail-management',
            desc: `The Retail Management System is a full-stack ERP solution built using .NET (C#), MSSQL, React, 
            and Tailwind CSS. It streamlines retail operations by handling billing, inventory tracking, invoice 
            generation, and customer management with automatic invoice generation, making it ideal for small-sized 
            retail businesses looking to modernize and scale their operations efficiently. ` 
        },
    ]

    return(
        <div className="">
            {/* Sub Heading - Project */}
            <div className="text-center mb-4">
                <h3 className=" text-black fs-1 fw-semibold">Projects</h3>
            </div>

            {/* Project container with 2x2 grid layout */}
            <div className="d-grid gap-2 w-100 p-4" style={{ gridTemplateColumns: "repeat(4, 1fr)",
                gridAutoRows: "200px", // Defines base height for rows
                backgroundColor: "rgba(197, 217, 246, 0.7)" }} >
            
            {projectList.map((content, index) => (
                <div
                    key={index}
                    className="w-100 position-relative overflow-hidden rounded-3 project-card"
                    style={{
                    gridColumn: (index === 0 || index === 3) ? "span 2" : "span 1",
                    gridRow: (index === 0 || index === 3) ? "span 2" : "span 1"
                    }}
                >
                    <img
                    src={content.src}
                    alt={content.alt}
                    className="w-100 h-100"
                    style={{ objectFit: "cover", borderRadius: "12px" }}
                    />

                    <div className="project-overlay position-absolute bottom-0 start-0 w-100 h-25 text-white p-3">
                    <a href={content.link} className="project-link" target="_blank" rel="noopener noreferrer"><h5>{content.pName}</h5>
                    <p className="project-desc m-2">{content.desc}</p></a>
                    </div>
                </div>
                ))}



            </div>
        </div>
    );
}