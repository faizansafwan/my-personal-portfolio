import React from "react";
import BlogModel from "./BlogModel";
import blog1 from '../blog/blog1.png'
import blog2 from '../blog/blog2.png'
import blog3 from '../blog/blog3.png'


export default function Blog() {

    // List of blog
    const blogList = [
        {src: blog1, alt: 'Blog 1', blogHead: 'Marketing analysis for online business and their operational management', desc: 'Nowadays online market is trending all over the world. Most of the people over 18 ages are started online business without gender differentiation, it may be small and large business...', url: 'https://medium.com/@faizansafwan075/marketing-analysis-for-online-business-and-their-operational-management-1f58965eb92'},
        {src: blog2, alt: 'Blog 2', blogHead: 'why do we need exercises or sports?', desc: 'Exercise and sports are most important part of our life. It will help to control our mind, body and health well, as well as it will be felt our mind better and reduce the diseases...', url: 'https://medium.com/@faizansafwan075/why-do-we-need-exercises-or-sports-ca1c62d329a9'},
        {src: blog3, alt: 'Blog 3', blogHead: 'Heading 3', desc: 'Welcome to Blog 3', url: ''},
    ]

    return(

        // Blog Container
        <div>
            {/* Blog heading */}
            <div className="blog-head">
                <h3 className="sub-heading">Blog</h3>
            </div>

            {/* Design of each blog */}
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