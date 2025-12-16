import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, X, Send, Bot, User } from 'lucide-react'
import './ChatBot.css'

const botResponses = {
  // English Responses
  greeting: [
    "Hello! Welcome to marketingbyarju. How can I help you today?",
    "Hi there! I'm here to assist you with any questions about our digital marketing services.",
    "Welcome! I'm your AI assistant. What would you like to know about our services?",
    "Hey! Great to see you here. Ask me anything about marketing, Arju Singh, or our services!"
  ],
  greeting_hindi: [
    "नमस्ते! marketingbyarju में आपका स्वागत है। मैं आज आपकी कैसे मदद कर सकता हूं?",
    "हैलो! मैं आपकी डिजिटल मार्केटिंग से जुड़े किसी भी सवाल में मदद के लिए यहां हूं।"
  ],
  greeting_spanish: [
    "¡Hola! Bienvenido a marketingbyarju. ¿Cómo puedo ayudarte hoy?",
    "¡Bienvenido! Soy tu asistente de IA. ¿Qué te gustaría saber?"
  ],
  greeting_french: [
    "Bonjour! Bienvenue chez marketingbyarju. Comment puis-je vous aider aujourd'hui?",
    "Salut! Je suis votre assistant IA. Que souhaitez-vous savoir?"
  ],

  // About Arju Singh
  arju: [
    "Arju Singh is a multi-talented professional with expertise in multiple domains:\n\n👩‍💻 **Software Developer**\nFull-stack developer skilled in modern web technologies, React, Node.js, and more.\n\n🔍 **OSINT Investigator**\nExpert in Open Source Intelligence gathering and analysis for security research.\n\n📱 **Digital Marketing Expert**\nFounder of marketingbyarju, helping businesses grow their online presence.\n\n🛡️ **Cybersecurity Enthusiast**\nPassionate about security research and ethical hacking.\n\n🎯 **Entrepreneur**\nBuilding innovative solutions and helping startups scale.\n\n📞 **Contact Arju:**\n📱 WhatsApp: 8396066423\n📧 Email: connect@arjusingh.com",
    "Arju Singh is the founder of marketingbyarju and a versatile tech professional:\n\n• 👩‍💻 Software Developer - Building web & mobile applications\n• 🔎 OSINT Specialist - Open Source Intelligence Expert\n• 📈 Digital Marketer - Helping brands grow online\n• 🔐 Security Researcher - Cybersecurity & ethical hacking\n• 🚀 Tech Entrepreneur - Creating innovative solutions\n\nShe combines technical skills with marketing expertise to deliver exceptional results!\n\n📞 **Get in Touch:**\n📱 8396066423 | 📧 connect@arjusingh.com"
  ],
  arju_hindi: [
    "अर्जु सिंह एक बहुमुखी प्रतिभाशाली पेशेवर हैं:\n\n👩‍💻 **सॉफ्टवेयर डेवलपर**\nआधुनिक वेब तकनीकों में कुशल\n\n🔍 **OSINT इन्वेस्टिगेटर**\nओपन सोर्स इंटेलिजेंस विशेषज्ञ\n\n📱 **डिजिटल मार्केटिंग एक्सपर्ट**\nmarketingbyarju की संस्थापक\n\n📞 **संपर्क करें:**\n📱 व्हाट्सएप: 8396066423\n📧 ईमेल: connect@arjusingh.com"
  ],

  services: [
    "We offer a comprehensive range of digital marketing services:\n\n🚀 **Social Media Marketing**\n📈 **Search Engine Optimization (SEO)**\n✍️ **Content Marketing**\n💰 **Pay-Per-Click Advertising**\n📧 **Email Marketing**\n🎨 **Brand Strategy**\n📊 **Analytics & Reporting**\n🎯 **Lead Generation**\n📱 **Mobile Marketing**\n🌐 **Website Development**\n\nWould you like to know more about any specific service?\n\n📞 **Contact Us:**\n📱 8396066423 | 📧 connect@arjusingh.com",
  ],
  services_hindi: [
    "हम डिजिटल मार्केटिंग सेवाओं की एक व्यापक श्रृंखला प्रदान करते हैं:\n\n🚀 सोशल मीडिया मार्केटिंग\n📈 SEO\n✍️ कंटेंट मार्केटिंग\n💰 PPC विज्ञापन\n📧 ईमेल मार्केटिंग\n\n📞 **संपर्क करें:**\n📱 8396066423 | 📧 connect@arjusingh.com"
  ],

  pricing: [
    "Our pricing is customized based on your specific needs and goals:\n\n💎 **Starter Package** - Perfect for small businesses\n🥈 **Growth Package** - For scaling businesses\n🥇 **Enterprise Package** - Full-service solution\n\n✅ Flexible payment options\n✅ No hidden costs\n✅ 100% transparency\n\n📞 **Get a Quote Now:**\n📱 WhatsApp: 8396066423\n📧 Email: connect@arjusingh.com",
  ],
  pricing_hindi: [
    "हमारी कीमतें आपकी जरूरतों के अनुसार तय की जाती हैं:\n\n💎 स्टार्टर पैकेज\n🥈 ग्रोथ पैकेज\n🥇 एंटरप्राइज पैकेज\n\n📞 **कोट के लिए संपर्क करें:**\n📱 8396066423 | 📧 connect@arjusingh.com"
  ],

  contact: [
    "You can reach us through multiple channels:\n\n📧 **Email:** connect@arjusingh.com\n📱 **WhatsApp:** +91 8396066423\n💬 **Live Chat:** You're using it right now!\n🌐 **Website:** Fill out our contact form\n\n⏰ Response time: Within 24 hours\n🌍 We work with clients worldwide!",
  ],
  contact_hindi: [
    "आप हमसे इन माध्यमों से संपर्क कर सकते हैं:\n\n📧 ईमेल: connect@arjusingh.com\n📱 व्हाट्सएप: +91 8396066423\n\n24 घंटे के भीतर जवाब!"
  ],

  seo: [
    "Our comprehensive SEO services include:\n\n🔍 **Keyword Research & Strategy**\n📝 **On-Page Optimization**\n⚙️ **Technical SEO Audits**\n🔗 **Link Building**\n📍 **Local SEO**\n📊 **Monthly Reporting**\n🎯 **Competitor Analysis**\n📱 **Mobile SEO**\n⚡ **Page Speed Optimization**\n\nWe focus on sustainable, white-hat techniques to improve your search rankings organically!\n\n📞 **Start Ranking Higher:**\n📱 8396066423 | 📧 connect@arjusingh.com",
  ],

  social: [
    "Our Social Media Marketing services cover:\n\n📱 **Platform Strategy**\n- Instagram, Facebook, LinkedIn, Twitter, YouTube, TikTok\n\n🎨 **Content Creation**\n- Graphics, Videos, Reels, Stories\n\n👥 **Community Management**\n📢 **Paid Social Advertising**\n🤝 **Influencer Partnerships**\n📊 **Analytics & Insights**\n🎯 **Targeted Campaigns**\n\nWe help brands build engaged communities and drive real results!\n\n📞 **Grow Your Social Presence:**\n📱 8396066423 | 📧 connect@arjusingh.com",
  ],

  about: [
    "**About marketingbyarju**\n\nWe are a results-driven digital marketing agency founded by Arju Singh. She specializes in helping businesses grow their online presence through innovative strategies.\n\n✨ **10x Faster Growth**\n✨ **95% Goal Achievement Rate**\n✨ **500+ Happy Clients**\n✨ **50+ Industries Served**\n\n🎯 Our Mission: Transform your digital dreams into reality!\n\n💡 She combines creativity with data-driven strategies to deliver exceptional results.\n\n📞 **Let's Connect:**\n📱 8396066423 | 📧 connect@arjusingh.com",
  ],

  portfolio: [
    "We've worked with diverse clients across various industries:\n\n🛒 **E-commerce** - 300% sales increase\n🏥 **Healthcare** - Lead generation\n💻 **Technology** - Brand awareness\n🏠 **Real Estate** - Social media growth\n🍽️ **Food & Beverage** - Local SEO\n👗 **Fashion** - Influencer marketing\n\nCheck out our Success Stories section to see detailed case studies!\n\n📞 **Start Your Success Story:**\n📱 8396066423 | 📧 connect@arjusingh.com",
  ],

  // Technical/Developer Questions
  developer: [
    "Yes! Arju Singh is an experienced Software Developer with expertise in:\n\n👩‍💻 **Frontend:** React, Vue.js, Next.js, HTML/CSS\n⚙️ **Backend:** Node.js, Python, PHP\n📱 **Mobile:** React Native, Flutter\n🗄️ **Database:** MongoDB, MySQL, PostgreSQL\n☁️ **Cloud:** AWS, Google Cloud, Vercel\n🔧 **Tools:** Git, Docker, CI/CD\n\nShe builds amazing digital solutions!\n\n📞 **Need a Website or App?**\n📱 8396066423 | 📧 connect@arjusingh.com",
  ],

  osint: [
    "Arju Singh is an OSINT (Open Source Intelligence) Investigator:\n\n🔍 **What is OSINT?**\nGathering intelligence from publicly available sources\n\n🛡️ **Her Services Include:**\n• Digital Footprint Analysis\n• Social Media Investigation\n• Background Research\n• Threat Intelligence\n• Security Assessments\n• Data Analysis\n\n⚠️ All investigations are conducted ethically and legally.\n\n📞 **Need Investigation Services?**\n📱 8396066423 | 📧 connect@arjusingh.com",
  ],

  cybersecurity: [
    "Arju Singh has expertise in Cybersecurity:\n\n🔐 **Her Security Services:**\n• Security Audits\n• Vulnerability Assessment\n• Penetration Testing\n• Security Consulting\n• Incident Response\n\n🛡️ **Specializations:**\n• Web Application Security\n• Network Security\n• OSINT & Threat Intelligence\n\n📞 **Security Consultation:**\n📱 8396066423 | 📧 connect@arjusingh.com",
  ],

  website: [
    "Yes, we build websites! Our web development services include:\n\n🌐 **Website Development**\n• Business Websites\n• E-commerce Stores\n• Landing Pages\n• Portfolio Sites\n• Web Applications\n\n⚡ **Technologies:**\nReact, Next.js, Node.js, WordPress\n\n✅ Mobile Responsive\n✅ SEO Optimized\n✅ Fast Loading\n\n📞 **Get a Quote:**\n📱 8396066423 | 📧 connect@arjusingh.com",
  ],

  // Multilingual responses
  help: [
    "I can help you with:\n\n🇬🇧 **English** - Full support\n🇮🇳 **हिंदी** - पूर्ण समर्थन\n🇪🇸 **Español** - Soporte disponible\n🇫🇷 **Français** - Support disponible\n\n**Topics I can discuss:**\n• Our Services\n• Pricing & Packages\n• About Arju Singh\n• Contact Information\n• SEO & Social Media\n• Web Development\n• OSINT & Security\n\nJust ask in your preferred language!\n\n📞 **Direct Contact:**\n📱 8396066423 | 📧 connect@arjusingh.com",
  ],

  thanks: [
    "You're welcome! 😊 Is there anything else I can help you with?\n\nFeel free to ask about:\n• Our services\n• Pricing\n• About Arju Singh\n• Or anything else!\n\n📞 **Reach Us Anytime:**\n📱 8396066423 | 📧 connect@arjusingh.com",
    "Happy to help! 🙌 Don't hesitate to reach out if you have more questions.\n\n📞 **Contact Us:**\n📱 8396066423 | 📧 connect@arjusingh.com"
  ],

  bye: [
    "Goodbye! 👋 Thanks for chatting with us.\n\nRemember, we're always here to help:\n📱 WhatsApp: 8396066423\n📧 Email: connect@arjusingh.com\n\nHave a great day!",
    "See you later! 👋 Feel free to come back anytime.\n\n📞 **Stay Connected:**\n📱 8396066423 | 📧 connect@arjusingh.com\n\n🌟 Follow us on social media for tips and updates!"
  ],

  joke: [
    "Here's a marketing joke for you! 😄\n\nWhy did the marketer break up with the calendar?\n\nBecause they felt like they were just another date! 📅😂\n\n...Anyway, how can I really help you today?\n\n📱 8396066423 | 📧 connect@arjusingh.com",
    "A little tech humor! 🤓\n\nWhy do programmers prefer dark mode?\n\nBecause light attracts bugs! 🐛💡\n\nNow, what would you like to know about our services?\n\n📱 8396066423 | 📧 connect@arjusingh.com"
  ],

  location: [
    "We operate globally! 🌍\n\n📍 **Primary Location:** India\n🌐 **Service Area:** Worldwide\n\nWe work with clients from:\n🇮🇳 India\n🇺🇸 USA\n🇬🇧 UK\n🇦🇪 UAE\n🇨🇦 Canada\n🇦🇺 Australia\n\nAnd many more countries!\n\n⏰ We adapt to your timezone for meetings.\n\n📞 **Contact Us:**\n📱 8396066423 | 📧 connect@arjusingh.com",
  ],

  hire: [
    "Ready to work with us? Here's how to get started:\n\n1️⃣ **Contact Us**\n   📱 WhatsApp: 8396066423\n   📧 Email: connect@arjusingh.com\n\n2️⃣ **Free Consultation**\n   We'll discuss your goals\n\n3️⃣ **Custom Proposal**\n   Tailored to your needs\n\n4️⃣ **Start Growing!**\n   We begin the work\n\n🚀 Let's transform your business together!\n\n📞 **Message Us Now:**\n📱 8396066423 | 📧 connect@arjusingh.com",
  ],

  default: [
    "Thanks for your message! I can help you with:\n\n👤 **About Arju Singh** - Developer, OSINT Expert, Marketer\n📱 **Our Services** - Digital Marketing, Web Dev, SEO\n💰 **Pricing** - Custom packages available\n📞 **Contact** - Multiple ways to reach us\n🔐 **Security** - OSINT & Cybersecurity services\n\nWhat would you like to know more about?\n\n📞 **Quick Contact:**\n📱 8396066423 | 📧 connect@arjusingh.com",
    "I'm here to help! Feel free to ask about:\n\n• Who is Arju Singh?\n• Digital marketing services\n• Website development\n• Pricing and packages\n• OSINT investigation\n• How to contact us\n\nYou can also ask in Hindi! हिंदी में पूछें!\n\n📱 8396066423 | 📧 connect@arjusingh.com",
    "Great question! I can assist you with information about:\n\n🧑‍💻 Arju Singh's background\n📈 Marketing services\n💻 Development services\n🔍 OSINT & Security\n\n📞 **Contact:**\n📱 8396066423 | 📧 connect@arjusingh.com"
  ]
}

const getKeywords = (message) => {
  const lowerMessage = message.toLowerCase()

  // Hindi greetings
  if (lowerMessage.match(/\b(namaste|namaskar|नमस्ते|नमस्कार|कैसे हो|कैसे हैं)\b/)) {
    return 'greeting_hindi'
  }

  // Spanish greetings
  if (lowerMessage.match(/\b(hola|buenos dias|buenas tardes|como estas)\b/)) {
    return 'greeting_spanish'
  }

  // French greetings
  if (lowerMessage.match(/\b(bonjour|bonsoir|salut|comment allez)\b/)) {
    return 'greeting_french'
  }

  // English greetings
  if (lowerMessage.match(/\b(hi|hello|hey|good morning|good evening|greetings|howdy|sup|what's up)\b/)) {
    return 'greeting'
  }

  // About Arju Singh
  if (lowerMessage.match(/\b(arju|arjun|singh|founder|owner|ceo|who are you|who is|अर्जु|अर्जुन|सिंह)\b/)) {
    if (lowerMessage.match(/\b(हिंदी|hindi|अर्जु|कौन)\b/)) {
      return 'arju_hindi'
    }
    return 'arju'
  }

  // Developer/Programming questions
  if (lowerMessage.match(/\b(developer|programming|code|coding|software|app|application|react|node|python|web dev)\b/)) {
    return 'developer'
  }

  // OSINT questions
  if (lowerMessage.match(/\b(osint|investigation|investigator|intelligence|research|background check|digital footprint)\b/)) {
    return 'osint'
  }

  // Cybersecurity questions
  if (lowerMessage.match(/\b(security|cybersecurity|hacking|ethical|penetration|vulnerability|audit|cyber)\b/)) {
    return 'cybersecurity'
  }

  // Website development
  if (lowerMessage.match(/\b(website|web development|build website|create website|landing page|ecommerce|e-commerce)\b/)) {
    return 'website'
  }

  // Services - Hindi
  if (lowerMessage.match(/\b(सेवाएं|सेवा|क्या करते|सर्विस)\b/)) {
    return 'services_hindi'
  }

  // Services - English
  if (lowerMessage.match(/\b(service|services|offer|provide|what do you do|offerings)\b/)) {
    return 'services'
  }

  // Pricing - Hindi
  if (lowerMessage.match(/\b(कीमत|दाम|पैसा|कितना|खर्च|पैकेज)\b/)) {
    return 'pricing_hindi'
  }

  // Pricing - English
  if (lowerMessage.match(/\b(price|pricing|cost|rate|package|quote|budget|fee|charge|affordable)\b/)) {
    return 'pricing'
  }

  // Contact - Hindi
  if (lowerMessage.match(/\b(संपर्क|फोन|ईमेल|व्हाट्सएप|कॉल)\b/)) {
    return 'contact_hindi'
  }

  // Contact - English
  if (lowerMessage.match(/\b(contact|email|phone|reach|call|whatsapp|message|connect)\b/)) {
    return 'contact'
  }

  // SEO
  if (lowerMessage.match(/\b(seo|search engine|ranking|google|keywords|organic|serp)\b/)) {
    return 'seo'
  }

  // Social Media
  if (lowerMessage.match(/\b(social|instagram|facebook|linkedin|twitter|youtube|tiktok|media|reels|posts)\b/)) {
    return 'social'
  }

  // About company
  if (lowerMessage.match(/\b(about|company|team|story|mission|vision|marketingbyarju)\b/)) {
    return 'about'
  }

  // Portfolio
  if (lowerMessage.match(/\b(portfolio|work|projects|case study|clients|examples|success stories)\b/)) {
    return 'portfolio'
  }

  // Help
  if (lowerMessage.match(/\b(help|assist|support|what can you|मदद|सहायता)\b/)) {
    return 'help'
  }

  // Thanks
  if (lowerMessage.match(/\b(thank|thanks|thankyou|thank you|धन्यवाद|शुक्रिया|gracias|merci)\b/)) {
    return 'thanks'
  }

  // Goodbye
  if (lowerMessage.match(/\b(bye|goodbye|see you|later|अलविदा|बाय|adios|au revoir)\b/)) {
    return 'bye'
  }

  // Joke
  if (lowerMessage.match(/\b(joke|funny|laugh|humor|मजाक)\b/)) {
    return 'joke'
  }

  // Location
  if (lowerMessage.match(/\b(location|where|address|office|country|city|कहाँ|पता)\b/)) {
    return 'location'
  }

  // Hire/Work together
  if (lowerMessage.match(/\b(hire|work with|collaborate|partner|start|begin|get started|join)\b/)) {
    return 'hire'
  }

  return 'default'
}

const getBotResponse = (message) => {
  const category = getKeywords(message)
  const responses = botResponses[category]
  return responses[Math.floor(Math.random() * responses.length)]
}

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      text: "Hello! I'm your AI assistant. How can I help you today?",
      time: new Date()
    }
  ])
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Listen for custom event from navbar
  useEffect(() => {
    const handleOpenChat = () => {
      setIsOpen(true)
    }
    window.addEventListener('openChatBot', handleOpenChat)
    return () => window.removeEventListener('openChatBot', handleOpenChat)
  }, [])

  const handleSend = () => {
    if (!inputValue.trim()) return

    const userMessage = {
      id: messages.length + 1,
      type: 'user',
      text: inputValue,
      time: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputValue('')
    setIsTyping(true)

    // Simulate bot typing delay
    setTimeout(() => {
      const botResponse = {
        id: messages.length + 2,
        type: 'bot',
        text: getBotResponse(inputValue),
        time: new Date()
      }
      setMessages(prev => [...prev, botResponse])
      setIsTyping(false)
    }, 1000 + Math.random() * 1000)
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
  }

  return (
    <>
      {/* Chat Toggle Button */}
      <motion.div
        className="chat-toggle-wrapper"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1, type: 'spring', stiffness: 200 }}
      >
        {!isOpen && (
          <motion.span
            className="chat-toggle-label"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.5 }}
          >
            Chat with AI
          </motion.span>
        )}
        <motion.button
          className="chat-toggle-btn"
          onClick={() => setIsOpen(!isOpen)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          aria-label="Toggle chat"
        >
          <span className="chat-toggle-pulse"></span>
          <span className="chat-toggle-pulse delay"></span>
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="chat-toggle-icon"
              >
                <X size={24} />
              </motion.div>
            ) : (
              <motion.div
                key="open"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="chat-toggle-icon"
              >
                <Bot size={26} />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </motion.div>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="chat-window"
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          >
            {/* Chat Header */}
            <div className="chat-header">
              <div className="chat-header-info">
                <div className="chat-avatar">
                  <Bot size={24} />
                </div>
                <div>
                  <h4>AI Assistant</h4>
                  <span className="chat-status">
                    <span className="status-dot"></span>
                    Online
                  </span>
                </div>
              </div>
              <button className="chat-close-btn" onClick={() => setIsOpen(false)}>
                <X size={20} />
              </button>
            </div>

            {/* Chat Messages */}
            <div className="chat-messages">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  className={`chat-message ${message.type}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="message-avatar">
                    {message.type === 'bot' ? <Bot size={16} /> : <User size={16} />}
                  </div>
                  <div className="message-content">
                    <p>{message.text}</p>
                    <span className="message-time">{formatTime(message.time)}</span>
                  </div>
                </motion.div>
              ))}

              {isTyping && (
                <motion.div
                  className="chat-message bot"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <div className="message-avatar">
                    <Bot size={16} />
                  </div>
                  <div className="message-content typing">
                    <span className="typing-dot"></span>
                    <span className="typing-dot"></span>
                    <span className="typing-dot"></span>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Chat Input */}
            <div className="chat-input-container">
              <input
                type="text"
                placeholder="Type your message..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                className="chat-input"
              />
              <motion.button
                className="chat-send-btn"
                onClick={handleSend}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                disabled={!inputValue.trim()}
              >
                <Send size={18} />
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default ChatBot
