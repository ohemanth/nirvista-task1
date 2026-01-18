import { useState } from 'react'
import axios from 'axios'
import './App.css'

// Use environment variable for API URL or fallback to localhost
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/leads'

function App() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  })
  const [status, setStatus] = useState({
    loading: false,
    success: false,
    error: ''
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus({ loading: true, success: false, error: '' })

    try {
      console.log('Submitting form data to:', API_URL)
      
      const response = await axios.post(API_URL, formData)
      
      if (response.data.success) {
        setStatus({ loading: false, success: true, error: '' })
        setFormData({ name: '', email: '', phone: '' })
      }

    } catch (err) {
      console.error(err)
      setStatus({ 
        loading: false, 
        success: false, 
        error: err.response?.data?.message || 'Something went wrong. Please try again.' 
      })
    }
  }

  return (
    <div className="landing-page">
      {/* Navigation Bar */}
      <nav className="navbar">
        <div className="container nav-content">
          <div className="logo">🌟 Nirvista</div>
          <button className="nav-cta" onClick={() => document.getElementById('contact-form').scrollIntoView({behavior: 'smooth'})}>
            Get Started
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero-section container">
        <div className="hero-content">
          <h1>Transform Your Business <br/>With <span className="highlight">Expert Insights</span></h1>
          <p className="subtitle">
            Join thousands of successful entrepreneurs who are scaling their ventures. 
            Tell us about your goals and we'll help you succeed.
          </p>
          <div className="hero-buttons">
            <button className="primary-btn" onClick={() => document.getElementById('contact-form').scrollIntoView({behavior: 'smooth'})}>
              Start Your Journey
            </button>
            <button className="secondary-btn">Learn More</button>
          </div>
        </div>
        
        <div className="form-container" id="contact-form">
          <div className="card">
            {status.success ? (
              <div className="success-message">
                <div className="success-icon">🎉</div>
                <h3>You're In!</h3>
                <p>Thanks for joining our exclusive list.</p>
                <p className="small-text">Keep an eye on your inbox for our welcome email.</p>
                <button 
                  onClick={() => setStatus({ ...status, success: false })}
                  className="reset-btn"
                >
                  Register Another Person
                </button>
              </div>
            ) : (
              <>
                <div className="form-header">
                  <h2>Get Started Today</h2>
                  <p>Fill out the form below to secure your spot.</p>
                </div>
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="name">Full Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. Sarah Johnson"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="email">Work Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="sarah@company.com"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="phone">Phone Number</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+1 (555) 123-4567"
                      required
                    />
                  </div>

                  {status.error && <div className="error-message">{status.error}</div>}

                  <button type="submit" disabled={status.loading} className="cta-button">
                    {status.loading ? 'Processing...' : 'Claim My Spot →'}
                  </button>
                  
                  <p className="privacy-note">
                    We respect your privacy. Unsubscribe at any time.
                  </p>
                </form>
              </>
            )}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="about-section">
        <div className="container">
          <div className="section-header">
            <h2>About Our Company</h2>
            <div className="underline"></div>
          </div>
          <div className="about-grid">
            <div className="about-card">
              <div className="icon">🎯</div>
              <h3>Our Mission</h3>
              <p>We empower businesses to reach their full potential through innovative solutions and strategic guidance.</p>
            </div>
            <div className="about-card">
              <div className="icon">📈</div>
              <h3>Our Vision</h3>
              <p>To create a world where every business has the tools and knowledge to scale efficiently and sustainably.</p>
            </div>
            <div className="about-card">
              <div className="icon">🏆</div>
              <h3>Our Values</h3>
              <p>Innovation, Integrity, Customer Success, and Continuous Learning guide everything we do.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="tech-section">
        <div className="container">
          <div className="section-header">
            <h2>Technologies We Use</h2>
            <div className="underline"></div>
          </div>
          <div className="tech-grid">
            <div className="tech-category">
              <h3>💻 Frontend</h3>
              <div className="tags">
                <span>⚛️ React</span>
                <span>⚡ JavaScript</span>
                <span>🎨 CSS3</span>
                <span>📄 HTML5</span>
                <span>🌈 Tailwind</span>
              </div>
            </div>
            <div className="tech-category">
              <h3>🔧 Backend</h3>
              <div className="tags">
                <span>🟢 Node.js</span>
                <span>🚀 Express</span>
                <span>🗄️ MongoDB</span>
                <span>🔗 REST API</span>
                <span>🔐 JWT</span>
              </div>
            </div>
            <div className="tech-category">
              <h3>☁️ DevOps</h3>
              <div className="tags">
                <span>🐳 Docker</span>
                <span>aws AWS</span>
                <span>⚡ Render</span>
                <span>🌐 Netlify</span>
                <span>⚡ Vercel</span>
              </div>
            </div>
            <div className="tech-category">
              <h3>🛠️ Tools</h3>
              <div className="tags">
                <span>🐙 Git</span>
                <span>💻 VS Code</span>
                <span>📮 Postman</span>
                <span>📦 npm</span>
                <span>📡 axios</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Blogs Section */}
      <section className="blogs-section">
        <div className="container">
          <div className="section-header">
            <h2>Latest Blogs</h2>
            <div className="underline"></div>
          </div>
          <div className="blogs-grid">
            <div className="blog-card">
              <div className="blog-icon">📝</div>
              <h3>Business Automation Tips</h3>
              <p>Learn how to automate your business processes and save time. From simple email workflows to complex CRM systems.</p>
              <a href="#" className="read-more">Read More →</a>
            </div>
            <div className="blog-card">
              <div className="blog-icon">📊</div>
              <h3>Growth Analytics</h3>
              <p>Discover the key metrics that matter for your business growth. Understanding your data is crucial for informed decisions.</p>
              <a href="#" className="read-more">Read More →</a>
            </div>
            <div className="blog-card">
              <div className="blog-icon">💡</div>
              <h3>Innovation Strategies</h3>
              <p>Explore innovative approaches to stay ahead of the competition. Innovation is not just an advantage—it's a necessity.</p>
              <a href="#" className="read-more">Read More →</a>
            </div>
            <div className="blog-card">
              <div className="blog-icon">🚀</div>
              <h3>Scaling Your Business</h3>
              <p>Practical steps to scale your business efficiently and sustainably without compromising quality.</p>
              <a href="#" className="read-more">Read More →</a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <p>© 2024 Nirvista. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

export default App
