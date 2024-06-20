import React from "react";
import BlogModel from "./BlogModel";
import blog1 from '../blog/blog1.png'
import blog2 from '../blog/blog2.png'
import blog3 from '../blog/blog3.png'


export default function Blog() {

    const blogList = [
        {src: blog1, alt: 'Blog 1', blogHead: 'Heading 1', desc: 'Welcome to Blog 1', url: ''},
        {src: blog2, alt: 'Blog 2', blogHead: 'Heading 2', desc: 'Welcome to Blog 2', url: ''},
        {src: blog3, alt: 'Blog 3', blogHead: 'Heading 3', desc: 'Welcome to Blog 3', url: ''},
    ]

    return(
        <div>

            <div className="blog-head">
                <h3 className="sub-heading">Blog</h3>
            </div>

            <div className="d-flex flex-wrap blog-gallery">
                {
                    blogList.map((content, index) => (
                        <BlogModel key={index} src={content.src} alt={content.alt} blogHead={content.blogHead} desc={content.desc} url={content.url} />
                    ))
                }
            </div>
        </div>
    );
}