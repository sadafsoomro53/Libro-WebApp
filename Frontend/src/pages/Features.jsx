import React, { useEffect, useRef, useState } from 'react'

const features = [
  { id: 1, title: 'User-Friendly Interface', desc: 'Navigate easily through our intuitive design', icon: 'bi-ui-checks-grid' },
  { id: 2, title: 'Wide Book Selection', desc: 'Access thousands of books across various genres and categories', icon: 'bi-journal-bookmark' },
  { id: 3, title: 'Easy Ordering', desc: 'Simple and secure checkout process for all your book purchases', icon: 'bi-cart-check' },
  { id: 4, title: 'Fast Delivery', desc: 'Get your books delivered quickly to your doorstep', icon: 'bi-truck' },
  { id: 5, title: 'User Reviews', desc: 'Read and share reviews to help others make informed decisions', icon: 'bi-star' },
  { id: 6, title: 'Wishlist', desc: 'Save your favorite books for later with our wishlist feature', icon: 'bi-bookmarks' },
  { id: 7, title: '24/7 Support', desc: 'Get help whenever you need it with our dedicated support team', icon: 'bi-headset' },
]

const Features = () => {
  const sliderRef = useRef(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const autoplayRef = useRef(null)
  const isDragging = useRef(false)
  const startX = useRef(0)
  const scrollLeft = useRef(0)

  useEffect(() => {
    // Inject Bootstrap & icons if missing
    const bs = 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css'
    if (!document.querySelector(`link[href="${bs}"]`)) {
      const l = document.createElement('link')
      l.rel = 'stylesheet'
      l.href = bs
      document.head.appendChild(l)
    }
    const icons = 'https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.css'
    if (!document.querySelector(`link[href="${icons}"]`)) {
      const li = document.createElement('link')
      li.rel = 'stylesheet'
      li.href = icons
      document.head.appendChild(li)
    }

    // theme styles (responsive + wider layout)
    const cssId = 'features-seagreen-enhanced'
    if (!document.getElementById(cssId)) {
      const style = document.createElement('style')
      style.id = cssId
      style.innerHTML = `
        :root{ --sea-50:#f3f9f7; --sea-500:#2e8b7b; --sea-600:#246b57; --muted:#5b6b6a; --gap:28px; }
        .features-container{ max-width: 1400px; margin:0 auto; padding:1rem; }
        body{ background: linear-gradient(#15282E, #0F969C); color:#063a36; }
        .features-hero{ background: linear-gradient(90deg, rgba(46,139,123,0.08), rgba(46,139,123,0.02)); border-left:6px solid var(--sea-500); padding:1.6rem; border-radius:.8rem; margin-bottom:1.5rem; }

        /* Slider */
        .slider-wrap{ position:relative }
        /* use side padding so slides peek on large screens; overflow hidden for cleaner behavior */
        .slider { display:flex; gap:var(--gap); overflow-x:hidden; scroll-behavior:smooth; padding:1rem 6vw; padding-bottom:1.6rem; }
        .slider::-webkit-scrollbar{ height:10px }
        .slider::-webkit-scrollbar-thumb{ background:linear-gradient(90deg,var(--sea-500),var(--sea-600)); border-radius:999px }

        /* responsive slide sizing: wider on desktop, good on mobile */
        .card.slide {
          min-width: clamp(300px, 44vw, 520px);
          height: clamp(200px, 36vh, 380px);
          flex-shrink:0;
          border-radius:16px;
          overflow:hidden;
          border:1px solid rgba(6,58,54,0.06);
          background-size:cover;
          background-position:center;
          position:relative;
        }
        /* gentle light overlay to keep black text readable */
        .card.slide::after { content: ''; position:absolute; inset:0; background: linear-gradient(180deg, rgba(255,255,255,0.25), rgba(255,255,255,0.55)); }
        .slide-inner{ display:flex; gap:1rem; align-items:flex-end; padding:1.25rem; position:relative; z-index:2; min-height:100%; box-sizing:border-box }
        .feature-icon{ width:84px; height:84px; display:grid; place-items:center; border-radius:14px; background:rgba(255,255,255,0.95); color:var(--sea-600); font-size:2rem; box-shadow:0 6px 18px rgba(6,58,54,0.06) }
        .slide h3{ font-size:1.25rem; margin-bottom:.35rem; color:#000 }
        .slide p{ color:#222; margin:0 }

        /* focus/active effect */
        .slider .card { transform-origin:center; transition: transform .32s cubic-bezier(.2,.9,.2,1), box-shadow .32s; }
        .slider .card.active { transform: translateY(-10px) scale(1.03); box-shadow: 0 18px 40px rgba(20,40,36,0.14) }

        /* arrows */
        .arrow { position:absolute; top:50%; transform:translateY(-50%); width:46px; height:46px; border-radius:10px; display:grid; place-items:center; background:rgba(255,255,255,0.95); border:1px solid rgba(6,58,54,0.06); cursor:pointer; z-index:8 }
        .arrow.left{ left:10px }
        .arrow.right{ right:10px }

        .dots{ display:flex; gap:.5rem; justify-content:center; margin-top:.75rem }
        .dot{ width:10px; height:10px; border-radius:999px; background:rgba(6,58,54,0.12); cursor:pointer; border:none }
        .dot.active{ background:linear-gradient(90deg,var(--sea-500),var(--sea-600)); box-shadow:0 6px 16px rgba(46,139,123,0.12); }

        @media (max-width: 1024px){ .features-container{ padding:0.75rem } }
        @media (max-width: 768px){ .card.slide{ min-width:320px; height:220px } .feature-icon{ width:68px; height:68px } .slider{ padding-left:6vw; padding-right:6vw } }
        @media (max-width: 420px){ .card.slide{ min-width:260px; height:200px } .feature-icon{ width:60px; height:60px } .arrow{ display:none } }
      `
      document.head.appendChild(style)
    }

    // start autoplay
    startAutoplay()
    return () => stopAutoplay()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // faster autoplay and continuous looping by index
  const startAutoplay = () => {
    stopAutoplay()
    // faster interval (1s)
    autoplayRef.current = setInterval(() => {
      setActiveIndex(prev => (prev + 1) % features.length)
    }, 1000)
  }
  const stopAutoplay = () => { if (autoplayRef.current) { clearInterval(autoplayRef.current); autoplayRef.current = null } }

  // scroll to center the active slide whenever activeIndex changes
  useEffect(() => {
    const s = sliderRef.current
    if (!s) return
    const slide = s.querySelector('.card.slide')
    if (!slide) return
    const gap = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--gap')) || 28
    const w = slide.offsetWidth + gap
    // center the slide in the container
    const containerWidth = s.clientWidth
    const left = Math.max(0, (activeIndex * w) - (containerWidth - w) / 2)
    s.scrollTo({ left, behavior: 'smooth' })
  }, [activeIndex])

  // manual prev/next
  const prev = () => { stopAutoplay(); setActiveIndex(prev => (prev - 1 + features.length) % features.length); startAutoplay() }
  const next = () => { stopAutoplay(); setActiveIndex(prev => (prev + 1) % features.length); startAutoplay() }

  // Drag-to-scroll
  const onPointerDown = (e) => {
    isDragging.current = true
    startX.current = e.pageX || e.touches?.[0]?.pageX
    scrollLeft.current = sliderRef.current.scrollLeft
    stopAutoplay()
  }
  const onPointerMove = (e) => {
    if (!isDragging.current) return
    const x = e.pageX || e.touches?.[0]?.pageX
    const walk = (startX.current - x)
    sliderRef.current.scrollLeft = scrollLeft.current + walk
  }
  const onPointerUp = () => { isDragging.current = false; handleScroll(); startAutoplay(); }

  // update activeIndex based on current scroll position (used after drag)
  const handleScroll = () => {
    const s = sliderRef.current
    if (!s) return
    const slide = s.querySelector('.card.slide')
    if (!slide) return
    const gap = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--gap')) || 28
    const w = slide.offsetWidth + gap
    const idx = Math.round(s.scrollLeft / w)
    setActiveIndex(Math.max(0, Math.min(features.length - 1, idx)))
  }

  const jumpTo = (index) => { stopAutoplay(); setActiveIndex(index % features.length); startAutoplay() }

  const bgUrl = "https://media.gettyimages.com/id/655825162/photo/close-up-of-blue-paper-on-yellow-background.jpg?s=612x612&w=0&k=20&c=0gWhUOSUANW-_nTgGV3Oy6fqL_e89FxuwPIDFJqEYts="

  return (
    <div className="features-container bg-light" >
      <div className="text-center mb-4 features-hero">
        <h1 className="fw-bold mb-1" style={{ color: '#15282E' }}>Features</h1>
        <p className="mb-0 text-dark">All About Us</p>
      </div>

      <div className="slider-wrap">
        <button aria-label="Previous" className="arrow left" onClick={prev}>
          <i className="bi bi-chevron-left"></i>
        </button>

        <div
          ref={sliderRef}
          className="slider"
          onMouseDown={onPointerDown}
          onMouseMove={onPointerMove}
          onMouseUp={onPointerUp}
          onMouseLeave={onPointerUp}
          onTouchStart={onPointerDown}
          onTouchMove={onPointerMove}
          onTouchEnd={onPointerUp}
          role="list"
          tabIndex={0}
          onFocus={stopAutoplay}
          onBlur={startAutoplay}
          style={{ outline: 'none' }}
        >
          {features.map((f, idx) => (
            <article
              key={f.id}
              className={`card slide ${idx === activeIndex ? 'active' : ''}`}
              role="listitem"
              aria-labelledby={`feat-${f.id}`}
              style={{ backgroundImage: `url('${bgUrl}')` }}
            >
              <div className="slide-inner">
                <div className="feature-icon">
                  <i className={`bi ${f.icon}`} aria-hidden></i>
                </div>
                <div>
                  <h3 id={`feat-${f.id}`}>{f.title}</h3>
                  <p>{f.desc}</p>
                </div>
              </div>
            </article>
          ))}
        </div>

        <button aria-label="Next" className="arrow right" onClick={next}>
          <i className="bi bi-chevron-right"></i>
        </button>
      </div>

      <div className="dots" role="tablist" aria-label="Feature pages">
        {features.map((_, i) => (
          <button
            key={i}
            className={`dot ${i === activeIndex ? 'active' : ''}`}
            onClick={() => { jumpTo(i) }}
            aria-label={`Go to feature ${i + 1}`}
            role="tab"
            aria-selected={i === activeIndex}
          />
        ))}
        
      </div>
    </div>
  )
}

export default Features
