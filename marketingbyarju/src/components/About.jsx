import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'
import { Check, Zap, Target, Users } from 'lucide-react'
import './About.css'

const features = [
  'Data-driven strategies for measurable growth',
  'Dedicated team of marketing experts',
  'Transparent reporting and communication',
  'Custom solutions for every business'
]

const FloatingCard3D = ({ children, className, delay = 0 }) => {
  return (
    <motion.div
      className={`about-floating-card ${className}`}
      initial={{ opacity: 0, scale: 0.8, rotateY: -30 }}
      animate={{
        opacity: 1,
        scale: 1,
        rotateY: 0,
        y: [0, -15, 0],
        rotateZ: [-2, 2, -2]
      }}
      transition={{
        opacity: { duration: 0.6, delay },
        scale: { duration: 0.6, delay },
        rotateY: { duration: 0.8, delay },
        y: { duration: 3, repeat: Infinity, ease: "easeInOut", delay: delay * 0.5 },
        rotateZ: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: delay * 0.3 }
      }}
      whileHover={{
        scale: 1.1,
        rotateY: 10,
        z: 50,
        transition: { duration: 0.3 }
      }}
      style={{ transformStyle: 'preserve-3d' }}
    >
      {children}
    </motion.div>
  )
}

const About = () => {
  const ref = useRef(null)
  const containerRef = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [hasAnimated, setHasAnimated] = useState(false)

  // Lock the animation state once it becomes true
  useEffect(() => {
    if (isInView && !hasAnimated) {
      setHasAnimated(true)
    }
  }, [isInView, hasAnimated])

  // Mouse tracking for 3D effect
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const springConfig = { damping: 30, stiffness: 150 }
  const smoothMouseX = useSpring(mouseX, springConfig)
  const smoothMouseY = useSpring(mouseY, springConfig)

  // Subtle 3D rotation based on mouse
  const rotateX = useTransform(smoothMouseY, [-0.5, 0.5], [5, -5])
  const rotateY = useTransform(smoothMouseX, [-0.5, 0.5], [-5, 5])

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width - 0.5
      const y = (e.clientY - rect.top) / rect.height - 0.5
      mouseX.set(x)
      mouseY.set(y)
    }

    const container = containerRef.current
    if (container) {
      container.addEventListener('mousemove', handleMouseMove)
      return () => container.removeEventListener('mousemove', handleMouseMove)
    }
  }, [mouseX, mouseY])

  const showContent = hasAnimated || isInView

  return (
    <section className="about section" id="about" aria-label="About marketingbyarju">
      <div className="container">
        <div className="about-grid" ref={ref}>
          <motion.div
            ref={containerRef}
            className="about-visual"
            initial={{ opacity: 0, x: -50 }}
            animate={showContent ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.6 }}
            style={{ perspective: 1000 }}
          >
            <motion.div
              className="about-image-container"
              style={{
                rotateX,
                rotateY,
                transformStyle: 'preserve-3d'
              }}
            >
              <div className="about-image-bg">
                <img
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&h=700&fit=crop"
                  alt="Our team at work"
                  className="about-main-image"
                />
              </div>

              {/* 3D Floating Cards */}
              <FloatingCard3D className="card-1" delay={0.2}>
                <div className="floating-card-icon">
                  <Zap size={24} />
                </div>
                <div>
                  <span className="floating-card-number">10x</span>
                  <span className="floating-card-label">Faster Growth</span>
                </div>
              </FloatingCard3D>

              <FloatingCard3D className="card-2" delay={0.4}>
                <div className="floating-card-icon">
                  <Target size={24} />
                </div>
                <div>
                  <span className="floating-card-number">95%</span>
                  <span className="floating-card-label">Goal Achievement</span>
                </div>
              </FloatingCard3D>

              <FloatingCard3D className="card-3" delay={0.6}>
                <div className="floating-card-icon">
                  <Users size={24} />
                </div>
                <div>
                  <span className="floating-card-number">500+</span>
                  <span className="floating-card-label">Happy Clients</span>
                </div>
              </FloatingCard3D>

              {/* 3D Background Orbs */}
              <motion.div
                className="about-orb about-orb-1"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.5, 0.3]
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div
                className="about-orb about-orb-2"
                animate={{
                  scale: [1.2, 1, 1.2],
                  opacity: [0.2, 0.4, 0.2]
                }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              />
            </motion.div>
          </motion.div>

          <motion.div
            className="about-content"
            initial={{ opacity: 0, x: 50 }}
            animate={showContent ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
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
                  animate={showContent ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                  transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                  whileHover={{ x: 10, scale: 1.02 }}
                >
                  <motion.span
                    className="feature-check"
                    whileHover={{ scale: 1.2, rotate: 360 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Check size={16} />
                  </motion.span>
                  {feature}
                </motion.li>
              ))}
            </ul>

            <motion.a
              href="#contact"
              className="btn btn-primary btn-3d"
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.95 }}
            >
              Work With Us
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default About
