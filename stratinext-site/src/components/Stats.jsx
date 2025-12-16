import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import './Stats.css'

const stats = [
  { number: 150, suffix: '+', label: 'Projects Completed' },
  { number: 50, suffix: '+', label: 'Happy Clients' },
  { number: 5, suffix: '+', label: 'Years Experience' },
  { number: 98, suffix: '%', label: 'Client Retention' }
]

const Counter = ({ target, suffix, isInView }) => {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!isInView) return

    const duration = 2000
    const increment = target / (duration / 16)
    let current = 0

    const timer = setInterval(() => {
      current += increment
      if (current >= target) {
        setCount(target)
        clearInterval(timer)
      } else {
        setCount(Math.floor(current))
      }
    }, 16)

    return () => clearInterval(timer)
  }, [isInView, target])

  return (
    <span className="stat-number">
      {count}
      {suffix}
    </span>
  )
}

const Stats = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section className="stats" ref={ref}>
      <div className="stats-bg">
        <div className="stats-gradient"></div>
      </div>
      <div className="container">
        <div className="stats-grid">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              className="stat-item"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Counter target={stat.number} suffix={stat.suffix} isInView={isInView} />
              <span className="stat-label">{stat.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Stats
