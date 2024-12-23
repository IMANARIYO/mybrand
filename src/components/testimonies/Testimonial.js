import "slick-carousel/slick/slick.css";
import LoadingIndicator from "../../LoadingIndicator";
import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import TestimonialSlide from "./TestimonialSlide";
import { HiArrowLeft, HiArrowRight } from "react-icons/hi";
import { RiStarFill } from "react-icons/ri";
import { getAllTestimonies } from "../../apirequest/testimonyApi";
import { quote, testimonialOne, testimonialTwo } from "../../assets";

// import Title from "../layouts/Title";

function SampleNextArrow (props) {
  const { onClick } = props
  return (
    <div
      className=' section w-14 h-12 bg-[#0c1821] hover:bg-black duration-300 rounded-md text-2xl text-gray-400 flex justify-center items-center absolute top-0 right-0 shadow-shadowOne cursor-pointer z-10'
      onClick={onClick}
    >
      <HiArrowRight />
    </div>
  )
}

function SamplePrevArrow (props) {
  const { onClick } = props
  return (
    <div
      className='w-14 h-12 bg-[#0c1821] hover:bg-black duration-300 rounded-md text-2xl text-gray-400 flex justify-center items-center absolute top-0 right-20 shadow-shadowOne cursor-pointer z-10'
      onClick={onClick}
    >
      <HiArrowLeft />
    </div>
  )
}
const testimonials = [
  {
    image: `${testimonialOne}`,
    name: 'Chris Lee',
    title: 'Software Engineer',
    company: 'Innovative Tech',
    mainTestimony:
      'Their expertise in software development is unparalleled. They delivered a robust solution that has greatly improved our efficiency. The team’s innovative approach and commitment to excellence were evident in every phase of the project, making them an invaluable partner in our digital transformation journey.',
    date: 'via Upwork - Apr 20, 2022 - Dec 10, 2022',
    head: 'Mobile App Designing'
  },
  {
    image: `${testimonialTwo}`,
    name: 'Emily Davis',
    title: 'Product Manager',

    company: 'E-Commerce Co.',
    mainTestimony:
      'The project was completed ahead of schedule and exceeded all our expectations. Their team is incredibly talented and professional. Their ability to understand our vision and translate it into a functional and aesthetically pleasing product was truly impressive. We couldn’t have asked for a better partnership.',
    date: 'via LinkedIn - May 1, 2021 - Jan 20, 2023'
  }
]
const initialTestimonials = testimonials
const Testimonial = () => {
  const [dotActive, setDocActive] = useState(0)
const[testimonials,setTestimonials]=useState(initialTestimonials)
const [loading, setLoading] = useState(true);

useEffect(() => {
  const fetchTestimonials = async () => {
    try {
      const response=await getAllTestimonies();
      console.log("testimonials",response.data);
      setTestimonials(response.data);
      setLoading(false);
    } catch (error) {
      console.log("error fetching testimalials")
    }
  };
  fetchTestimonials();
},[]);
  const settings = {
    dots: true,
    infinite: true,
    width: '100%',
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    focusOnSelect: true,
    pauseOnHover: true,
    swipeToSlide: true,
    autoplaySpeed: 2000,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    beforeChange: (prev, next) => {
      setDocActive(next)
    },
    appendDots: dots =>
      <div
        style={{
          borderRadius: '10px',
          padding: '10px'
        }}
      >
        <ul
          style={{
            display: 'flex',
            gap: '15px',
            justifyContent: 'center',
            marginTop: '20px'
          }}
        >
          {' '}{dots}{' '}
        </ul>
      </div>,
    customPaging: i =>
      <div
        style={
          i === dotActive
            ? {
              width: '12px',
              height: '12px',
              color: 'blue',
              background: '#ff014f',
              borderRadius: '50%',
              cursor: 'pointer'
            }
            : {
              width: '12px',
              height: '12px',
              color: 'blue',
              background: 'gray',
              borderRadius: '50%',
              cursor: 'pointer'
            }
        }
      />
  }
  return (
    <section
      id='testimonial'
      className=' '
    >
      <h2 className='content-title'>Testimonials</h2>
      <p className='content-subtitle'>
        Hear what My team members colleageues and satisfied clients had to say
        about working with me.
      </p>
      <div className='  '>

      { loading ? (
        
        <LoadingIndicator
        loadingMessage="Just a moment! We’re gathering feedback from my satisfied clients."
        speedMessage="internet speed can vary"
        performanceMessage="your device’s performance"
        additionalMessage="Thank you for your patience while we compile these testimonials!"
      />
        
         
              
                ) : (<Slider {...settings} className=" ">
          {testimonials.map((testimonial, index) =>
            <TestimonialSlide
              key={testimonial._id}
              image={testimonial.image}
              name={testimonial.name}
              title={testimonial.professional}
              company={testimonial.company}
              mainTestimony={testimonial.mainTestimony}
              date={` since  :${testimonial.from  } up to -> ${testimonial.to}`}
              head={testimonial.service}
            />
          )}
        </Slider>)
        }
      </div>
    </section>
  )
}

export default Testimonial
