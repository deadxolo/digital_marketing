import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { ExternalLink } from 'lucide-react'
import './Portfolio.css'

const projects = [
  {
    title: 'E-Commerce Revolution',
    category: 'Digital Marketing',
    description: '300% increase in online sales through targeted campaigns',
    color: '#c10fff'
  },
  {
    title: 'Tech Startup Launch',
    category: 'Brand Identity',
    description: 'Complete brand overhaul resulting in $2M seed funding',
    color: '#060097'
  },
  {
    title: 'Healthcare Platform',
    category: 'Web Development',
    description: 'Custom platform serving 100K+ patients monthly',
    color: '#ffcd57'
  },
  {
    title: 'Fashion Brand Growth',
    category: 'Social Media',
    description: '500K new followers in 6 months with 8x engagement',
    color: '#c10fff'
  },
  {
    title: 'SaaS Product Marketing',
    category: 'Growth Strategy',
    description: 'Achieved 10x ARR growth in 12 months',
    color: '#060097'
  },
  {
    title: 'Restaurant Chain',
    category: 'Local SEO',
    description: '150% increase in foot traffic across all locations',
    color: '#ffcd57'
  }
]

const ProjectCard = ({ project, index }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <motion.div
      ref={ref}
      className="project-card"
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <div
        className="project-image"
        style={{ background: `linear-gradient(135deg, ${project.color}40, ${project.color}10)` }}
      >
        <div className="project-overlay">
          <button className="project-link">
            <ExternalLink size={20} />
          </button>
        </div>
      </div>
      <div className="project-content">
        <span className="project-category">{project.category}</span>
        <h3 className="project-title">{project.title}</h3>
        <p className="project-description">{project.description}</p>
      </div>
    </motion.div>
  )
}

const Portfolio = () => {
  const headerRef = useRef(null)
  const isHeaderInView = useInView(headerRef, { once: true, margin: '-100px' })

  return (
    <section className="portfolio section" id="portfolio">
      <div className="container">
        <motion.div
          ref={headerRef}
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="section-subtitle">Our Work</p>
          <h2 className="section-title">Success Stories</h2>
          <p className="section-description">
            Real results for real businesses. Explore how we've helped brands
            transform their digital presence.
          </p>
        </motion.div>

        <div className="portfolio-grid">
          {projects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Portfolio
