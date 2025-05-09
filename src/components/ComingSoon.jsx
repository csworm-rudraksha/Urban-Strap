import { useState, useEffect } from "react"
import "./ComingSoonPage.css"

export default function ComingSoonPage() {
  const [loaded, setLoaded] = useState(false)
  const [typedText, setTypedText] = useState("")
  const fullTagline = "Wear your Attitude"

  useEffect(() => {
    setLoaded(true)
  }, [])

  useEffect(() => {
    if (typedText.length < fullTagline.length) {
      const timeout = setTimeout(() => {
        setTypedText(fullTagline.slice(0, typedText.length + 1))
      }, 100)
      return () => clearTimeout(timeout)
    }
  }, [typedText])

  useEffect(() => {
    if (loaded) {
      setTypedText(fullTagline.slice(0, 1))
    }
  }, [loaded])

  return (
    <div className="coming-soon-container">
      <div className="background-animated">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="floating-circle"
            style={{
              width: `${Math.random() * 300 + 50}px`,
              height: `${Math.random() * 300 + 50}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDuration: `${Math.random() * 10 + 15}s`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      <div className={`content ${loaded ? "fade-in" : ""}`}>
        <h1 className="brand-title">URBAN-STRAP</h1>
        <p className="tagline">
          {typedText}
          <span className="cursor">|</span>
        </p>
        <div className="line-divider"></div>

        <div className="coming-message">
          <h2>Coming Soon</h2>
          <p>We're crafting a premium shopping experience for the modern urban lifestyle.</p>
        </div>

        <div className="footer">
          <p>© {new Date().getFullYear()} Urban-Strap. All rights reserved.</p>
        </div>
      </div>
    </div>
  )
}
