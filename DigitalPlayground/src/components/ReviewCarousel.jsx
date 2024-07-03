import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css"; 

const ReviewCarousel = ({ reviews }) => {
    return (
        <Carousel
            showArrows={true}
            infiniteLoop={true}
            showThumbs={false}
            autoPlay={true}
            interval={3000}
        >
            {reviews.map((review, index) => (
                <div key={index} style={{ paddingBottom: '50px' }}>
                    <br/><br/><br/><br/><br/>
                    <p>{review}</p>
                </div>
            ))}
        </Carousel>
    );
};

export default ReviewCarousel;
