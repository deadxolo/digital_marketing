import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { Send, Mail, Phone, MapPin } from 'lucide-react'
import './Contact.css'

const Contact = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const whatsappMessage = `Hello! I'm ${formData.name}.%0A%0AEmail: ${formData.email}%0ASubject: ${formData.subject}%0A%0AMessage: ${formData.message}`
    const whatsappUrl = `https://wa.me/918396066423?text=${whatsappMessage}`
    window.open(whatsappUrl, '_blank')
    setFormData({ name: '', email: '', subject: '', message: '' })
  }

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email Us',
      content: 'connect@arjusingh.com',
      link: 'mailto:connect@arjusingh.com'
    },
    {
      icon: Phone,
      title: 'Call Us',
      content: '+91 8396066423',
      link: 'tel:+918396066423'
    },
    {
      icon: MapPin,
      title: 'Visit Us',
      content: 'Hisar, Haryana, India',
      link: 'https://maps.google.com/?q=Hisar,Haryana,India'
    }
  ]

  return (
    <section className="contact section" id="contact" ref={ref} aria-label="Contact marketingbyarju">
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="section-subtitle">Get In Touch</p>
          <h2 className="section-title">Let's Start a Conversation</h2>
          <p className="section-description">
            Ready to transform your digital presence? We'd love to hear from you.
          </p>
        </motion.div>

        <div className="contact-grid">
          <motion.div
            className="contact-info"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="contact-info-title">Contact Information</h3>
            <p className="contact-info-description">
              Fill out the form and our team will get back to you within 24 hours.
            </p>

            <div className="contact-methods">
              {contactInfo.map((item, index) => (
                <a key={index} href={item.link} className="contact-method">
                  <div className="contact-method-icon">
                    <item.icon size={20} />
                  </div>
                  <div>
                    <span className="contact-method-title">{item.title}</span>
                    <span className="contact-method-content">{item.content}</span>
                  </div>
                </a>
              ))}
            </div>

            <div className="contact-decoration">
              <div className="decoration-circle circle-1"></div>
              <div className="decoration-circle circle-2"></div>
            </div>
          </motion.div>

          <motion.form
            className="contact-form"
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="form-row">
              <div className="form-group">
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="form-group">
              <input
                type="text"
                name="subject"
                placeholder="Subject"
                value={formData.subject}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <textarea
                name="message"
                placeholder="Your Message"
                rows="5"
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
            </div>
            <button type="submit" className="btn btn-primary">
              Send Message
              <Send size={18} />
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  )
}

export default Contact
