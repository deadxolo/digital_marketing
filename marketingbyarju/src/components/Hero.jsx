import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion'
import { ArrowRight, Sparkles } from 'lucide-react'
import { useRef, useEffect } from 'react'
import './Hero.css'

const Hero = () => {
  const containerRef = useRef(null)

  // Mouse position values
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // Smooth spring animations
  const springConfig = { damping: 25, stiffness: 150 }
  const smoothMouseX = useSpring(mouseX, springConfig)
  const smoothMouseY = useSpring(mouseY, springConfig)

  // Transform values for 3D parallax layers
  const layer1X = useTransform(smoothMouseX, [-0.5, 0.5], [30, -30])
  const layer1Y = useTransform(smoothMouseY, [-0.5, 0.5], [30, -30])
  const layer2X = useTransform(smoothMouseX, [-0.5, 0.5], [-20, 20])
  const layer2Y = useTransform(smoothMouseY, [-0.5, 0.5], [-20, 20])
  const layer3X = useTransform(smoothMouseX, [-0.5, 0.5], [15, -15])
  const layer3Y = useTransform(smoothMouseY, [-0.5, 0.5], [15, -15])

  // Rotation for 3D tilt effect
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

  return (
    <section className="hero" id="home" ref={containerRef} aria-label="Hero section - Welcome to marketingbyarju digital marketing agency">
      <div className="hero-bg">
        <motion.div
          className="hero-gradient-1"
          style={{ x: layer1X, y: layer1Y }}
        />
        <motion.div
          className="hero-gradient-2"
          style={{ x: layer2X, y: layer2Y }}
        />
        <motion.div
          className="hero-grid"
          style={{ x: layer3X, y: layer3Y }}
        />

        {/* 3D Floating orbs */}
        <motion.div
          className="hero-orb hero-orb-1"
          style={{ x: layer1X, y: layer1Y }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="hero-orb hero-orb-2"
          style={{ x: layer2X, y: layer2Y }}
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.4, 0.7, 0.4]
          }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="hero-orb hero-orb-3"
          style={{ x: layer3X, y: layer3Y }}
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.5, 0.2]
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <motion.div
        className="container hero-container"
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
          perspective: 1000
        }}
      >
        <motion.div
          className="hero-badge hero-3d-element"
          initial={{ opacity: 0, y: 20, rotateX: -20 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ duration: 0.5 }}
          style={{ transformStyle: 'preserve-3d', translateZ: 60 }}
        >
          <Sparkles size={16} />
          <span>Welcome to marketingbyarju</span>
        </motion.div>

        <motion.h1
          className="hero-title hero-3d-element"
          initial={{ opacity: 0, y: 30, rotateX: -15 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          style={{ transformStyle: 'preserve-3d', translateZ: 40 }}
        >
          Fueling Brands.
          <br />
          <span className="gradient-text">Powering Growth.</span>
        </motion.h1>

        <motion.p
          className="hero-subtitle hero-3d-element"
          initial={{ opacity: 0, y: 30, rotateX: -10 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{ transformStyle: 'preserve-3d', translateZ: 30 }}
        >
          Where Strategy Meets Next-Level Marketing
        </motion.p>

        <motion.p
          className="hero-description hero-3d-element"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          style={{ transformStyle: 'preserve-3d', translateZ: 20 }}
        >
          We don't just market—we transform. Whether you're a startup or scaling up,
          our tailored digital strategies ignite real results.
        </motion.p>

        <motion.div
          className="hero-cta hero-3d-element"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          style={{ transformStyle: 'preserve-3d', translateZ: 50 }}
        >
          <motion.a
            href="#contact"
            className="btn btn-primary btn-3d"
            whileHover={{ scale: 1.05, translateZ: 20 }}
            whileTap={{ scale: 0.95 }}
          >
            Start Your Journey
            <ArrowRight size={18} />
          </motion.a>
          <motion.a
            href="#services"
            className="btn btn-secondary btn-3d"
            whileHover={{ scale: 1.05, translateZ: 20 }}
            whileTap={{ scale: 0.95 }}
          >
            Explore Services
          </motion.a>
        </motion.div>

        <motion.div
          className="hero-stats hero-3d-element"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          style={{ transformStyle: 'preserve-3d', translateZ: 30 }}
        >
          <motion.div
            className="hero-stat hero-stat-3d"
            whileHover={{ scale: 1.1, translateZ: 20 }}
          >
            <span className="hero-stat-number">150+</span>
            <span className="hero-stat-label">Projects Delivered</span>
          </motion.div>
          <div className="hero-stat-divider"></div>
          <motion.div
            className="hero-stat hero-stat-3d"
            whileHover={{ scale: 1.1, translateZ: 20 }}
          >
            <span className="hero-stat-number">98%</span>
            <span className="hero-stat-label">Client Satisfaction</span>
          </motion.div>
          <div className="hero-stat-divider"></div>
          <motion.div
            className="hero-stat hero-stat-3d"
            whileHover={{ scale: 1.1, translateZ: 20 }}
          >
            <span className="hero-stat-number">5+</span>
            <span className="hero-stat-label">Years Experience</span>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Floating Hero Images */}
      <motion.div
        className="hero-images"
        style={{
          x: layer2X,
          y: layer2Y
        }}
      >
        <motion.div
          className="hero-image-card hero-image-1"
          initial={{ opacity: 0, scale: 0.8, rotateY: -30 }}
          animate={{ opacity: 1, scale: 1, rotateY: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          whileHover={{ scale: 1.05, rotateY: 10 }}
        >
          <img src="https://images.unsplash.com/photo-1551434678-e076c223a692?w=300&h=200&fit=crop" alt="Team collaboration" />
        </motion.div>
        <motion.div
          className="hero-image-card hero-image-2"
          initial={{ opacity: 0, scale: 0.8, rotateY: 30 }}
          animate={{ opacity: 1, scale: 1, rotateY: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          whileHover={{ scale: 1.05, rotateY: -10 }}
        >
          <img src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=300&h=200&fit=crop" alt="Marketing strategy" />
        </motion.div>
        <motion.div
          className="hero-image-card hero-image-3"
          initial={{ opacity: 0, scale: 0.8, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          whileHover={{ scale: 1.05, y: -10 }}
        >
          <img src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=300&h=200&fit=crop" alt="Digital growth" />
        </motion.div>
      </motion.div>

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
