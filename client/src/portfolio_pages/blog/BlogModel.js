import React from "react";
import './BlogModel.css';

const BlogModel = ({src, alt, blogHead, desc, url}) => {

    return(
            // Structure or model of each blog
            <div className="blog-parent border-1 rounded-2">
                <div className="blogImg-container">
                    <img src={src} alt={alt} className="" />
                </div>

                <div className="blogHead-container">
                    <h4>{blogHead}</h4>
                </div>

                <div className="desc-container">
                    <p>{desc}</p>
                </div>

                <div className="url-container">
                    <a href={url}>Learn More</a>
                </div>
            </div>


    );
}

export default BlogModel;