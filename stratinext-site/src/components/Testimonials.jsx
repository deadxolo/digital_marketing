import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react'
import './Testimonials.css'

const testimonials = [
  {
    quote: "marketingbyarju transformed our digital presence completely. Their strategic approach helped us achieve 300% growth in just 6 months.",
    author: "Sarah Johnson",
    role: "CEO, TechStart Inc",
    avatar: "SJ"
  },
  {
    quote: "The team's creativity and data-driven approach exceeded our expectations. They're not just an agency, they're true partners in growth.",
    author: "Michael Chen",
    role: "Marketing Director, Innovate Co",
    avatar: "MC"
  },
  {
    quote: "Working with marketingbyarju was a game-changer. Their SEO expertise put us on the first page of Google within months.",
    author: "Emily Rodriguez",
    role: "Founder, EcoLife Brand",
    avatar: "ER"
  }
]

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <section className="testimonials section" ref={ref}>
      <div className="testimonials-bg">
        <div className="testimonials-gradient"></div>
      </div>
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="section-subtitle">Testimonials</p>
          <h2 className="section-title">What Our Clients Say</h2>
        </motion.div>

        <motion.div
          className="testimonials-container"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="testimonial-card">
            <div className="quote-icon">
              <Quote size={40} />
            </div>
            <p className="testimonial-quote">{testimonials[currentIndex].quote}</p>
            <div className="testimonial-author">
              <div className="author-avatar">
                {testimonials[currentIndex].avatar}
              </div>
              <div className="author-info">
                <span className="author-name">{testimonials[currentIndex].author}</span>
                <span className="author-role">{testimonials[currentIndex].role}</span>
              </div>
            </div>
          </div>

          <div className="testimonial-controls">
            <button className="control-btn" onClick={prevTestimonial}>
              <ChevronLeft size={24} />
            </button>
            <div className="testimonial-dots">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  className={`dot ${index === currentIndex ? 'active' : ''}`}
                  onClick={() => setCurrentIndex(index)}
                />
              ))}
            </div>
            <button className="control-btn" onClick={nextTestimonial}>
              <ChevronRight size={24} />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Testimonials
