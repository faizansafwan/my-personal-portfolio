import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMobileAlt, faMapMarkedAlt, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faFacebook, faLinkedin, faInstagram, faGithub} from "@fortawesome/free-brands-svg-icons"

export default function Contact() {

    return(
         
        <div className="contact-parent">

            {/* Contact heading */}
            <div className="contact-head">
                <h3 className="sub-heading">Get In Touch</h3>
            </div>

            <div className="contact-container d-flex">
             
                {/*  Container Column left */}
                <div className="contact-col1 d-flex flex-row mb-3">

                    {/* Form Container */}
                    <form className="row g-3">
                        <div className="col-md-6">
                            <input type="text" className="form-control form-control-lg" placeholder="Jhon Smith"/>
                        </div>
                        <div className="col-md-6">
                            <input type="email" className="form-control form-control-lg" placeholder="abc@gmail.com"/>
                        </div>
                        <div className="col-12">
                            <input type="text" className="form-control form-control-lg"  placeholder="Subject"/>
                        </div>
                        <div class="col-12">
                            <textarea type="text" className="form-control form-control-lg" id="inputAddress2" placeholder="Write your message..."/>
                        </div>
                        
                        <div className="submit-btn">
                            <button type="submit" className="primary-btn p-3 rounded-4 border-0">Submit</button>
                        </div>
                    </form>

                </div>

                {/* Container column right */}
                <div className="contact-col2">
                    <div>
                        <p><FontAwesomeIcon icon={faMobileAlt} size="2x" color="#87B2F4" /> &nbsp;&nbsp; +94 76 8084843</p>
                    </div>

                    <div>
                        <p><FontAwesomeIcon icon={faMapMarkedAlt} size="2x" color="#87B2F4" /> &nbsp; Hemmathagama, Kegalle, Sri Lanka</p>
                    </div>

                    <div>
                        <p><FontAwesomeIcon icon={faEnvelope} size="2x" color="#87B2F4" /> &nbsp; fai.saf010@gmail.com</p>
                    </div>

                    <div className="d-flex logo-contact">
                        <div>
                            <span><a href="https://www.linkedin.com/in/faizansafwan-20000" className="logo-link" > <FontAwesomeIcon icon={faLinkedin} size="2x" color="#87B2F4" /> </a></span>
                        </div>
                        
                        <div>
                            <span><a href="https://facebook.com/mohammed.faizan.374549" className="logo-link" > <FontAwesomeIcon icon={faFacebook} size="2x" color="#87B2F4" /> </a></span>
                        </div>
                         
                        <div>
                            <span><a href="https://github.com/faizansafwan" className="logo-link" > <FontAwesomeIcon icon={faGithub} size="2x" color="#87B2F4" /> </a></span>
                        </div>
                        
                        <div>
                            <span><a href="https://www.instagram.com/faizan_safwan/" className="logo-link" > <FontAwesomeIcon icon={faInstagram} size="2x" color="#87B2F4" /> </a></span>
                        </div>
                    </div>
                </div> 

            </div>
            
        </div>
    );
}