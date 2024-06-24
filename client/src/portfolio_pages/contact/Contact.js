import React from "react";

export default function Contact() {

    return(
        <div className="contact-parent">

            <div className="contact-head">
                <h3 className="sub-heading">Get In Touch</h3>
            </div>

            <div className="contact-container d-flex">
                <div className="contact-col1 d-flex flex-row mb-3">

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
                            <button type="submit" className="primary-btn p-2 rounded-3 border-0">Submit</button>
                        </div>
                    </form>
                </div>

                <div className="contact-col2">
                    <div>
                        <p>+94 76 8084843</p>
                    </div>

                    <div>
                        <p>Hemmathagama, Kegalle</p>
                    </div>

                    <div>
                        <p>fai.saf010@gmail.com</p>
                    </div>

                    <div>
                        link
                    </div>
                </div>
                
            </div>
        </div>
    );
}