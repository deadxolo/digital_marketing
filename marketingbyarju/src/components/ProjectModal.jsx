import { motion, AnimatePresence } from 'framer-motion'
import { X, ExternalLink, Calendar, Users, TrendingUp, CheckCircle } from 'lucide-react'
import './ProjectModal.css'

const ProjectModal = ({ project, isOpen, onClose }) => {
  if (!project) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal Wrapper for centering */}
          <div className="modal-wrapper">
            <motion.div
              className="project-modal"
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 50 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            >
              <button className="modal-close" onClick={onClose}>
                <X size={24} />
              </button>

              <div className="modal-image">
                <img src={project.image} alt={project.title} />
                <div className="modal-image-overlay">
                  <span className="modal-category">{project.category}</span>
                </div>
              </div>

              <div className="modal-content">
                <h2 className="modal-title">{project.title}</h2>
                <p className="modal-description">{project.fullDescription}</p>

                <div className="modal-stats">
                  {project.stats.map((stat, index) => (
                    <motion.div
                      key={index}
                      className="modal-stat"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 * index }}
                    >
                      <span className="modal-stat-value">{stat.value}</span>
                      <span className="modal-stat-label">{stat.label}</span>
                    </motion.div>
                  ))}
                </div>

                <div className="modal-details">
                  <div className="modal-detail">
                    <Calendar size={18} />
                    <span>Duration: {project.duration}</span>
                  </div>
                  <div className="modal-detail">
                    <Users size={18} />
                    <span>Client: {project.client}</span>
                  </div>
                  <div className="modal-detail">
                    <TrendingUp size={18} />
                    <span>Industry: {project.industry}</span>
                  </div>
                </div>

                <div className="modal-services">
                  <h4>Services Provided</h4>
                  <ul>
                    {project.services.map((service, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 + 0.05 * index }}
                      >
                        <CheckCircle size={16} />
                        {service}
                      </motion.li>
                    ))}
                  </ul>
                </div>

                <div className="modal-results">
                  <h4>Key Results</h4>
                  <p>{project.results}</p>
                </div>

                <div className="modal-actions">
                  {project.liveUrl && (
                    <motion.a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-primary"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      View Live Project
                      <ExternalLink size={18} />
                    </motion.a>
                  )}
                  <motion.a
                    href="#contact"
                    className="btn btn-secondary"
                    onClick={onClose}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Start Similar Project
                  </motion.a>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}

export default ProjectModal
