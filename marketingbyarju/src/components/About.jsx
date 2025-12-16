import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { Check, Zap, Target, Users } from 'lucide-react'
import './About.css'

const features = [
  'Data-driven strategies for measurable growth',
  'Dedicated team of marketing experts',
  'Transparent reporting and communication',
  'Custom solutions for every business'
]

const About = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section className="about section" id="about" aria-label="About marketingbyarju">
      <div className="container">
        <div className="about-grid" ref={ref}>
          <motion.div
            className="about-visual"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <div className="about-image-container">
              <div className="about-image-bg"></div>
              <div className="about-floating-card card-1">
                <Zap size={24} />
                <div>
                  <span className="floating-card-number">10x</span>
                  <span className="floating-card-label">Faster Growth</span>
                </div>
              </div>
              <div className="about-floating-card card-2">
                <Target size={24} />
                <div>
                  <span className="floating-card-number">95%</span>
                  <span className="floating-card-label">Goal Achievement</span>
                </div>
              </div>
              <div className="about-floating-card card-3">
                <Users size={24} />
                <div>
                  <span className="floating-card-number">500+</span>
                  <span className="floating-card-label">Happy Clients</span>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="about-content"
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <p className="section-subtitle">About Us</p>
            <h2 className="about-title">
              We're Your Partners in <span className="gradient-text">Digital Success</span>
            </h2>
            <p className="about-description">
              At marketingbyarju, we believe every brand has untapped potential waiting to be
              unleashed. Our mission is to bridge the gap between where you are and where
              you want to be through innovative, results-driven digital strategies.
            </p>
            <p className="about-description">
              With years of experience and a passion for excellence, we've helped businesses
              of all sizes transform their digital presence and achieve remarkable growth.
            </p>

            <ul className="about-features">
              {features.map((feature, index) => (
                <motion.li
                  key={index}
                  className="about-feature"
                  initial={{ opacity: 0, x: 20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                >
                  <span className="feature-check">
                    <Check size={16} />
                  </span>
                  {feature}
                </motion.li>
              ))}
            </ul>

            <a href="#contact" className="btn btn-primary">
              Work With Us
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default About
