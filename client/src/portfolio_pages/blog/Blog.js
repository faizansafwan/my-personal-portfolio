import React, { useEffect } from "react";
import BlogModel from "./BlogModel";
import blog1 from '../blog/blog1.png'
import blog2 from '../blog/blog2.png'
import blog3 from '../blog/blog3.png'
import aiAnn from '../../images/ANNs.png'
import Aos from "aos";


export default function Blog() {


    useEffect( () => {
        Aos.init({
            duration: 1000,
            offset: 10,
            easing: "ease-in-out-quart",
            
        })      
    }, []);

    // List of blog
    const blogList = [
        {src: aiAnn, alt: 'Artificial Neural Network', blogHead: 'Understanding Artificial Neural Networks', 
            desc: 'An artificial neural network (ANN) is a type of machine learning model that mimics the way biological neurons in the brain work to process information. ANNs are especially powerful for handling complex tasks like image and speech...', 
            url: 'https://medium.com/@faizansafwan075/understanding-artificial-neural-networks-anns-acee21b5597f'},
        {src: blog1, alt: 'Blog 1', blogHead: 'Marketing analysis for online business and their operational management', 
            desc: 'Nowadays online market is trending all over the world. Most of the people over 18 ages are started online business without gender differentiation, it may be small and large business...', url: 'https://medium.com/@faizansafwan075/marketing-analysis-for-online-business-and-their-operational-management-1f58965eb92'},
        {src: blog2, alt: 'Blog 2', blogHead: 'why do we need exercises or sports?', 
            desc: 'Exercise and sports are most important part of our life. It will help to control our mind, body and health well, as well as it will be felt our mind better and reduce the diseases...', url: 'https://medium.com/@faizansafwan075/why-do-we-need-exercises-or-sports-ca1c62d329a9'},
    ]

    return(

        // Blog Container
        <div>
            
            <div className="blog-head text-left mb-4 " data-aos="slide-right">
                <h3 className="sub-heading d-inline-block border-bottom border-5 border-primary pb-2"
                 > Blog </h3>
            </div>


            {/* Design of each blog */}
            <div className="d-flex flex-wrap blog-gallery" data-aos="slide-up">
                {
                    blogList.map((content, index) => (
                        <BlogModel key={index} src={content.src} alt={content.alt} blogHead={content.blogHead} desc={content.desc} url={content.url} />
                    ))
                }
            </div>
        </div>
    );
}