import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
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

const ServiceCard = ({ service, index }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <motion.div
      ref={ref}
      className="service-card"
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <div className="service-icon">
        <service.icon size={28} />
      </div>
      <h3 className="service-title">{service.title}</h3>
      <p className="service-description">{service.description}</p>
      <div className="service-hover-effect"></div>
    </motion.div>
  )
}

const Services = () => {
  const headerRef = useRef(null)
  const isHeaderInView = useInView(headerRef, { once: true, margin: '-100px' })

  return (
    <section className="services section" id="services">
      <div className="container">
        <motion.div
          ref={headerRef}
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
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
            <ServiceCard key={service.title} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Services
