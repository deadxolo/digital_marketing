import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import {
  Megaphone,
  Search,
  Palette,
  TrendingUp,
  Globe,
  Video
} from 'lucide-react'
import './Services.css'

const services = [
  {
    icon: Megaphone,
    title: 'Digital Marketing',
    description: 'Strategic campaigns that amplify your brand voice and drive measurable results across all digital channels.'
  },
  {
    icon: Search,
    title: 'SEO & SEM',
    description: 'Dominate search rankings with data-driven optimization strategies that put your brand in front of the right audience.'
  },
  {
    icon: Palette,
    title: 'Brand Identity',
    description: 'Craft a compelling visual identity that resonates with your audience and sets you apart from the competition.'
  },
  {
    icon: TrendingUp,
    title: 'Growth Strategy',
    description: 'Scale your business with proven growth frameworks tailored to your unique market position and goals.'
  },
  {
    icon: Globe,
    title: 'Web Development',
    description: 'Build stunning, high-performance websites that convert visitors into loyal customers.'
  },
  {
    icon: Video,
    title: 'Content Creation',
    description: 'Engage your audience with compelling content that tells your story and drives meaningful connections.'
  }
]

const ServiceCard = ({ service, index, hasAnimated }) => {
  const ref = useRef(null)
  const cardRef = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const showCard = hasAnimated || isInView

  const [rotateX, setRotateX] = useState(0)
  const [rotateY, setRotateY] = useState(0)
  const [glarePosition, setGlarePosition] = useState({ x: 50, y: 50 })

  const handleMouseMove = (e) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    const mouseX = e.clientX - centerX
    const mouseY = e.clientY - centerY

    const rotateXValue = (mouseY / (rect.height / 2)) * -12
    const rotateYValue = (mouseX / (rect.width / 2)) * 12

    setRotateX(rotateXValue)
    setRotateY(rotateYValue)

    const glareX = ((e.clientX - rect.left) / rect.width) * 100
    const glareY = ((e.clientY - rect.top) / rect.height) * 100
    setGlarePosition({ x: glareX, y: glareY })
  }

  const handleMouseLeave = () => {
    setRotateX(0)
    setRotateY(0)
    setGlarePosition({ x: 50, y: 50 })
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50, rotateX: -15 }}
      animate={showCard ? { opacity: 1, y: 0, rotateX: 0 } : { opacity: 0, y: 50, rotateX: -15 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      style={{ perspective: 1000 }}
    >
      <motion.div
        ref={cardRef}
        className="service-card service-card-3d"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        animate={{
          rotateX,
          rotateY,
          scale: rotateX !== 0 || rotateY !== 0 ? 1.02 : 1
        }}
        transition={{
          type: 'spring',
          stiffness: 300,
          damping: 20
        }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        <motion.div
          className="service-icon"
          style={{ transform: 'translateZ(30px)' }}
        >
          <service.icon size={28} />
        </motion.div>
        <h3 className="service-title" style={{ transform: 'translateZ(20px)' }}>
          {service.title}
        </h3>
        <p className="service-description" style={{ transform: 'translateZ(10px)' }}>
          {service.description}
        </p>
        <div className="service-hover-effect"></div>

        {/* 3D Glare Effect */}
        <div
          className="service-glare"
          style={{
            background: `radial-gradient(circle at ${glarePosition.x}% ${glarePosition.y}%, rgba(255,255,255,0.15) 0%, transparent 60%)`,
            opacity: rotateX !== 0 || rotateY !== 0 ? 1 : 0
          }}
        />

        {/* 3D Shadow Layer */}
        <div
          className="service-shadow-3d"
          style={{
            transform: `translateZ(-20px) translateX(${rotateY * 0.5}px) translateY(${-rotateX * 0.5}px)`
          }}
        />
      </motion.div>
    </motion.div>
  )
}

const Services = () => {
  const headerRef = useRef(null)
  const isHeaderInView = useInView(headerRef, { once: true, margin: '-100px' })
  const [hasAnimated, setHasAnimated] = useState(false)

  useEffect(() => {
    if (isHeaderInView && !hasAnimated) {
      setHasAnimated(true)
    }
  }, [isHeaderInView, hasAnimated])

  const showContent = hasAnimated || isHeaderInView

  return (
    <section className="services section" id="services" aria-label="Our digital marketing services">
      <div className="container">
        <motion.div
          ref={headerRef}
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          animate={showContent ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          <p className="section-subtitle">What We Do</p>
          <h2 className="section-title">Services That Drive Results</h2>
          <p className="section-description">
            From strategy to execution, we offer comprehensive digital solutions
            designed to fuel your brand's growth.
          </p>
        </motion.div>

        <div className="services-grid">
          {services.map((service, index) => (
            <ServiceCard key={service.title} service={service} index={index} hasAnimated={hasAnimated} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Services
