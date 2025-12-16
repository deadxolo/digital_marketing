import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { ExternalLink } from 'lucide-react'
import ProjectModal from './ProjectModal'
import './Portfolio.css'

const projects = [
  {
    title: 'E-Commerce Revolution',
    category: 'Digital Marketing',
    description: '300% increase in online sales through targeted campaigns',
    color: '#c10fff',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop',
    fullDescription: 'We partnered with a leading e-commerce brand to completely transform their digital marketing strategy. Through a combination of data-driven advertising, conversion rate optimization, and strategic social media campaigns, we achieved unprecedented growth in online sales.',
    stats: [
      { value: '300%', label: 'Sales Increase' },
      { value: '150K', label: 'New Customers' },
      { value: '4.2x', label: 'ROAS' }
    ],
    duration: '6 months',
    client: 'ShopMax Retail',
    industry: 'E-Commerce',
    services: [
      'Paid Advertising (Google & Meta)',
      'Conversion Rate Optimization',
      'Email Marketing Automation',
      'Social Media Management',
      'Analytics & Reporting',
      'Landing Page Optimization'
    ],
    results: 'Our strategic approach resulted in a 300% increase in online sales within 6 months. We reduced customer acquisition costs by 40% while scaling ad spend profitably. The client now generates over $2M in monthly revenue through digital channels.',
    liveUrl: 'https://example.com/shopmax'
  },
  {
    title: 'Tech Startup Launch',
    category: 'Brand Identity',
    description: 'Complete brand overhaul resulting in $2M seed funding',
    color: '#060097',
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600&h=400&fit=crop',
    fullDescription: 'A promising tech startup approached us before their funding round. We developed a comprehensive brand identity that communicated their innovative vision and market potential, directly contributing to their successful seed round.',
    stats: [
      { value: '$2M', label: 'Funding Raised' },
      { value: '100%', label: 'Brand Recognition' },
      { value: '15+', label: 'Media Features' }
    ],
    duration: '3 months',
    client: 'InnovateTech AI',
    industry: 'Technology / AI',
    services: [
      'Brand Strategy & Positioning',
      'Logo & Visual Identity Design',
      'Brand Guidelines Development',
      'Pitch Deck Design',
      'Website Design & Development',
      'Investor Relations Materials'
    ],
    results: 'The new brand identity helped InnovateTech stand out in a crowded market. Within 3 months of launch, they secured $2M in seed funding from top-tier VCs. The brand has since been featured in TechCrunch, Forbes, and Wired.',
    liveUrl: 'https://example.com/innovatetech'
  },
  {
    title: 'Healthcare Platform',
    category: 'Web Development',
    description: 'Custom platform serving 100K+ patients monthly',
    color: '#ffcd57',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&h=400&fit=crop',
    fullDescription: 'We designed and developed a comprehensive healthcare platform that revolutionized how patients interact with their healthcare providers. The platform includes appointment scheduling, telemedicine, and patient portal features.',
    stats: [
      { value: '100K+', label: 'Monthly Patients' },
      { value: '99.9%', label: 'Uptime' },
      { value: '4.8★', label: 'User Rating' }
    ],
    duration: '8 months',
    client: 'MedCare Solutions',
    industry: 'Healthcare',
    services: [
      'UX/UI Design',
      'Custom Web Development',
      'Mobile App Development',
      'HIPAA Compliance',
      'Telemedicine Integration',
      'Patient Portal Development'
    ],
    results: 'The platform now serves over 100,000 patients monthly across 50+ healthcare facilities. Patient satisfaction scores increased by 45%, and administrative efficiency improved by 60%. The solution has become the standard for the client\'s network.',
    liveUrl: 'https://example.com/medcare'
  },
  {
    title: 'Fashion Brand Growth',
    category: 'Social Media',
    description: '500K new followers in 6 months with 8x engagement',
    color: '#c10fff',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop',
    fullDescription: 'We transformed a struggling fashion brand into a social media sensation through strategic content creation, influencer partnerships, and community building. Our approach focused on authentic storytelling and trend-driven content.',
    stats: [
      { value: '500K', label: 'New Followers' },
      { value: '8x', label: 'Engagement Rate' },
      { value: '200%', label: 'Sales Growth' }
    ],
    duration: '6 months',
    client: 'Luxe Fashion Co',
    industry: 'Fashion & Apparel',
    services: [
      'Social Media Strategy',
      'Content Creation & Curation',
      'Influencer Marketing',
      'Community Management',
      'User-Generated Content',
      'Social Commerce Integration'
    ],
    results: 'Our campaign generated 500K new followers across Instagram and TikTok in just 6 months. Engagement rates increased 8x compared to industry benchmarks, and social-driven sales grew by 200%. The brand is now recognized as a leader in sustainable fashion.',
    liveUrl: 'https://example.com/luxefashion'
  },
  {
    title: 'SaaS Product Marketing',
    category: 'Growth Strategy',
    description: 'Achieved 10x ARR growth in 12 months',
    color: '#060097',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop',
    fullDescription: 'A B2B SaaS company needed to scale their marketing efforts to match their product development pace. We implemented a full-funnel growth strategy that transformed their go-to-market approach and dramatically accelerated growth.',
    stats: [
      { value: '10x', label: 'ARR Growth' },
      { value: '500+', label: 'Enterprise Clients' },
      { value: '65%', label: 'Reduced CAC' }
    ],
    duration: '12 months',
    client: 'CloudStack Pro',
    industry: 'B2B SaaS',
    services: [
      'Go-to-Market Strategy',
      'Content Marketing',
      'SEO & Organic Growth',
      'Paid Acquisition',
      'Marketing Automation',
      'Sales Enablement'
    ],
    results: 'Our comprehensive growth strategy helped CloudStack Pro achieve 10x ARR growth in 12 months. We reduced customer acquisition cost by 65% while scaling to 500+ enterprise clients. The company successfully raised their Series B based on these growth metrics.',
    liveUrl: 'https://example.com/cloudstack'
  },
  {
    title: 'Restaurant Chain',
    category: 'Local SEO',
    description: '150% increase in foot traffic across all locations',
    color: '#ffcd57',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&h=400&fit=crop',
    fullDescription: 'A regional restaurant chain was struggling to compete with national franchises. We implemented a hyper-local SEO and marketing strategy that put them on the map and drove significant foot traffic to all locations.',
    stats: [
      { value: '150%', label: 'Foot Traffic' },
      { value: '#1', label: 'Local Rankings' },
      { value: '340%', label: 'Online Orders' }
    ],
    duration: '4 months',
    client: 'Urban Bites',
    industry: 'Food & Beverage',
    services: [
      'Local SEO Optimization',
      'Google Business Profile',
      'Review Management',
      'Local Paid Advertising',
      'Menu Engineering',
      'Online Ordering Integration'
    ],
    results: 'Our local SEO strategy resulted in a 150% increase in foot traffic across all 12 locations. The chain now ranks #1 for key local searches, and online orders increased by 340%. Revenue per location increased by an average of $50K monthly.',
    liveUrl: 'https://example.com/urbanbites'
  }
]

const ProjectCard = ({ project, index, onClick, hasAnimated }) => {
  const ref = useRef(null)
  const cardRef = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  const showCard = hasAnimated || isInView

  const [rotateX, setRotateX] = useState(0)
  const [rotateY, setRotateY] = useState(0)
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseMove = (e) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    const mouseX = e.clientX - centerX
    const mouseY = e.clientY - centerY

    const rotateXValue = (mouseY / (rect.height / 2)) * -10
    const rotateYValue = (mouseX / (rect.width / 2)) * 10

    setRotateX(rotateXValue)
    setRotateY(rotateYValue)
  }

  const handleMouseEnter = () => setIsHovered(true)

  const handleMouseLeave = () => {
    setRotateX(0)
    setRotateY(0)
    setIsHovered(false)
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50, rotateX: -20 }}
      animate={showCard ? { opacity: 1, y: 0, rotateX: 0 } : { opacity: 0, y: 50, rotateX: -20 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      style={{ perspective: 1200 }}
    >
      <motion.div
        ref={cardRef}
        className="project-card project-card-3d"
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={() => onClick(project)}
        animate={{
          rotateX,
          rotateY,
          scale: isHovered ? 1.03 : 1
        }}
        transition={{
          type: 'spring',
          stiffness: 300,
          damping: 20
        }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        <motion.div
          className="project-image"
          style={{
            background: `linear-gradient(135deg, ${project.color}40, ${project.color}10)`,
            transform: 'translateZ(20px)'
          }}
        >
          <img
            src={project.image}
            alt={project.title}
            className="project-img"
          />
          <motion.div
            className="project-overlay"
            animate={{ opacity: isHovered ? 1 : 0 }}
          >
            <motion.button
              className="project-link"
              whileHover={{ scale: 1.2, rotateZ: 15 }}
              whileTap={{ scale: 0.9 }}
              style={{ transform: 'translateZ(40px)' }}
            >
              <ExternalLink size={20} />
            </motion.button>
          </motion.div>

          {/* Floating 3D elements */}
          <motion.div
            className="project-float-element"
            style={{
              background: project.color,
              transform: 'translateZ(30px)'
            }}
            animate={{
              y: isHovered ? [-5, 5, -5] : 0,
              opacity: isHovered ? 1 : 0
            }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>

        <motion.div
          className="project-content"
          style={{ transform: 'translateZ(25px)' }}
        >
          <motion.span
            className="project-category"
            style={{ transform: 'translateZ(5px)' }}
          >
            {project.category}
          </motion.span>
          <h3 className="project-title">{project.title}</h3>
          <p className="project-description">{project.description}</p>
          <span className="project-view-more">Click to view details →</span>
        </motion.div>

        {/* 3D Glare Effect */}
        <div
          className="project-glare"
          style={{
            opacity: isHovered ? 0.3 : 0
          }}
        />

        {/* 3D Shadow */}
        <motion.div
          className="project-shadow-3d"
          style={{
            background: `${project.color}30`
          }}
          animate={{
            opacity: isHovered ? 1 : 0,
            scale: isHovered ? 1 : 0.8
          }}
        />
      </motion.div>
    </motion.div>
  )
}

const Portfolio = () => {
  const headerRef = useRef(null)
  const isHeaderInView = useInView(headerRef, { once: true, margin: '-100px' })
  const [selectedProject, setSelectedProject] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [hasAnimated, setHasAnimated] = useState(false)

  useEffect(() => {
    if (isHeaderInView && !hasAnimated) {
      setHasAnimated(true)
    }
  }, [isHeaderInView, hasAnimated])

  const showContent = hasAnimated || isHeaderInView

  const handleProjectClick = (project) => {
    setSelectedProject(project)
    setIsModalOpen(true)
    document.body.style.overflow = 'hidden'
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    document.body.style.overflow = 'auto'
  }

  return (
    <section className="portfolio section" id="portfolio" aria-label="Our portfolio and success stories">
      <div className="container">
        <motion.div
          ref={headerRef}
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          animate={showContent ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
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
            <ProjectCard
              key={project.title}
              project={project}
              index={index}
              onClick={handleProjectClick}
              hasAnimated={hasAnimated}
            />
          ))}
        </div>
      </div>

      <ProjectModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </section>
  )
}

export default Portfolio
