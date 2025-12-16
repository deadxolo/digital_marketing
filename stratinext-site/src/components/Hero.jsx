import { motion } from 'framer-motion'
import { ArrowRight, Sparkles } from 'lucide-react'
import './Hero.css'

const Hero = () => {
  return (
    <section className="hero" id="home">
      <div className="hero-bg">
        <div className="hero-gradient-1"></div>
        <div className="hero-gradient-2"></div>
        <div className="hero-grid"></div>
      </div>

      <div className="container hero-container">
        <motion.div
          className="hero-badge"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Sparkles size={16} />
          <span>Welcome to marketingbyarju</span>
        </motion.div>

        <motion.h1
          className="hero-title"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Fueling Brands.
          <br />
          <span className="gradient-text">Powering Growth.</span>
        </motion.h1>

        <motion.p
          className="hero-subtitle"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Where Strategy Meets Next-Level Marketing
        </motion.p>

        <motion.p
          className="hero-description"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          We don't just market—we transform. Whether you're a startup or scaling up,
          our tailored digital strategies ignite real results.
        </motion.p>

        <motion.div
          className="hero-cta"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <a href="#contact" className="btn btn-primary">
            Start Your Journey
            <ArrowRight size={18} />
          </a>
          <a href="#services" className="btn btn-secondary">
            Explore Services
          </a>
        </motion.div>

        <motion.div
          className="hero-stats"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <div className="hero-stat">
            <span className="hero-stat-number">150+</span>
            <span className="hero-stat-label">Projects Delivered</span>
          </div>
          <div className="hero-stat-divider"></div>
          <div className="hero-stat">
            <span className="hero-stat-number">98%</span>
            <span className="hero-stat-label">Client Satisfaction</span>
          </div>
          <div className="hero-stat-divider"></div>
          <div className="hero-stat">
            <span className="hero-stat-number">5+</span>
            <span className="hero-stat-label">Years Experience</span>
          </div>
        </motion.div>
      </div>

      <div className="hero-scroll">
        <motion.div
          className="scroll-indicator"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <div className="scroll-line"></div>
        </motion.div>
      </div>
    </section>
  )
}

export default Hero
