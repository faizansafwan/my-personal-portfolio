import experienceIcon from "../../images/experience.png";
import { useEffect, useState } from "react";

export default function Experience() {
    const [showMore, setShowMore] = useState(false);
    const [animatedIndexes, setAnimatedIndexes] = useState([]);
    const [isAnimating, setIsAnimating] = useState(false);

    const skills = ["HTML", "CSS", "JavaScript", "React", "Node.js", "Express", "MongoDB", "Redux", "Firebase", "Tailwind CSS"];
    
    const experience = [
        "Built a responsive UI for admin product management, user product rating, and user settings management, improving user experience by 15%.",
        "Created and maintained secure RESTful APIs, enabling smooth frontend-backend integration.",
        "Conducted functionality and usability testing to enhance product quality.",
        "Collaborated remotely with dev team using Git & GitHub for version control."
    ];

    useEffect(() => {
        if (showMore) {
            setAnimatedIndexes([]); // Reset
            let delay = 0;
            for (let i = 0; i < experience.length; i++) {
                setTimeout(() => {
                    setAnimatedIndexes(prev => [...prev, i]);
                }, delay);
                delay += 150;
            }
        } else if (isAnimating) {
            // Animate in reverse before hiding
            let delay = 0;
            for (let i = experience.length - 1; i >= 0; i--) {
                setTimeout(() => {
                    setAnimatedIndexes(prev => prev.filter(index => index !== i));
                }, delay);
                delay += 150;
            }

            // Wait until the animation is done before actually hiding
            setTimeout(() => {
                setIsAnimating(false);
            }, experience.length * 150 + 100);
        }
    }, [showMore, isAnimating]);

    const handleToggle = () => {
        if (showMore) {
            setIsAnimating(true);
            setShowMore(false); // Trigger reverse animation
        } else {
            setShowMore(true); // Show with normal animation
        }
    };

    return (
        <div className="py-3" style={{ backgroundColor: "rgba(197, 217, 246, 0.2)" }}>
            <div>
                <h2 className="sub-heading border-start border-5 border-primary ps-3 py-2 d-inline-block">
                    Work Experience
                </h2>
            </div>

            <div className="m-5 text-center fs-3">
                <p className="mx-5 text-muted">
                    My professional journey in web development, where I've contributed to impactful 
                    projects and continuously grown my technical skill set.
                </p>
            </div>

            <div className="m-5 p-5 bg-white rounded-4" style={{ 
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)", 
                border: "1px solid rgba(0, 0, 0, 0.05)" 
            }}>
                <div className="d-flex justify-content-between">
                    <div className="d-flex gap-2">
                        <div className="d-inline-block">
                            <img src={experienceIcon} alt="experience" />
                        </div>
                        <div className="d-flex flex-column gap-0">
                            <p className="fw-bold mb-0">Intern Full Stack Developer</p>
                            <p className="text-muted mb-0">SKYREK (PVT) Ltd</p>
                        </div>
                    </div>
                    <div>
                        <p className="text-muted fw-bold">2024 - 2025</p>
                    </div>
                </div>

                <div className="my-3 d-flex flex-wrap gap-2">
                    {skills.map((skill, index) => (
                        <div key={index} className="text-muted px-2 rounded-4" style={{ backgroundColor: "rgba(206, 222, 245, 0.7)" }}>
                            <p className="mb-0">{skill}</p>
                        </div>
                    ))}
                </div>

                {(showMore || isAnimating) && (
                    <div>
                        {experience.map((item, index) => (
                            <ul
                                key={index}
                                style={{
                                    opacity: animatedIndexes.includes(index) ? 1 : 0,
                                    transform: animatedIndexes.includes(index) ? 'translateY(0)' : 'translateY(20px)',
                                    transition: 'opacity 0.5s ease, transform 0.5s ease',
                                    marginBottom: '10px',
                                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
                                    padding: '10px 15px',
                                    borderRadius: '4px',
                                    backgroundColor: 'rgba(255, 255, 255, 0.8)'
                                }}
                            >
                                <li style={{ color: "#5e9af7" }}>
                                    <p className="text-muted">{item}</p>
                                </li>
                            </ul>
                        ))}
                    </div>
                )}

                <div>
                    <button 
                        onClick={handleToggle}
                        className="fw-medium mt-3"
                        style={{ border: "none", backgroundColor: "transparent", color: "#5e9af7" }}
                        disabled={isAnimating}
                    >
                        {showMore ? "See Less" : "See More"}
                    </button>
                </div>
            </div>
        </div>
    );
}
