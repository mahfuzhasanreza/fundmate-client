import React, { useState, useEffect } from 'react'
import { ArrowRight, PlayCircle, ShieldCheck, Wallet, X } from 'lucide-react'
import { Link } from 'react-router-dom'
import cover from '../../../assets/cover.png'

const Hero = () => {
  const [showVideoModal, setShowVideoModal] = useState(false)

  // Close the demo modal with the Escape key
  useEffect(() => {
    if (!showVideoModal) return
    const onKey = (e) => e.key === 'Escape' && setShowVideoModal(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [showVideoModal])

  return (
    <section id="home" className="relative flex items-center min-h-[85vh] overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${cover})` }}
      />
      <div className="absolute inset-0 bg-gray-900/65" />

      <div className="container-custom relative z-10 py-24">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <span className="inline-block text-sm font-semibold tracking-wide uppercase text-primary-200">
            Your Ultimate Fund Mate
          </span>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
            Financial Support, <span className="text-primary-300">Simplified</span>
          </h1>

          <p className="text-lg md:text-xl text-gray-200 leading-relaxed max-w-2xl mx-auto">
            FundMate connects people for peer-to-peer loans and crowdfunding campaigns.
            Support meaningful projects, community causes, and loans by funding.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-2">
            <Link
              to="/login"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-lg bg-primary-600 hover:bg-primary-700 text-white font-semibold transition-colors"
            >
              Get Started
              <ArrowRight className="h-5 w-5" />
            </Link>
            <button
              type="button"
              onClick={() => setShowVideoModal(true)}
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-lg border border-white/40 text-white font-semibold hover:bg-white/10 transition-colors"
            >
              <PlayCircle className="h-5 w-5" />
              Watch Demo
            </button>
          </div>

          <div className="flex flex-wrap gap-x-8 gap-y-3 justify-center pt-8 text-sm text-gray-200">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-primary-300" />
              <span>Safe &amp; Transparent</span>
            </div>
            <div className="flex items-center gap-2">
              <Wallet className="h-5 w-5 text-primary-300" />
              <span>Loans &amp; Crowdfunding in One Place</span>
            </div>
          </div>
        </div>
      </div>

      {/* Video Modal */}
      {showVideoModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          onClick={() => setShowVideoModal(false)}
        >
          <div
            className="relative w-full max-w-5xl bg-gray-900 rounded-xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              aria-label="Close video"
              onClick={() => setShowVideoModal(false)}
              className="absolute top-3 right-3 z-10 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
              <iframe
                className="absolute top-0 left-0 w-full h-full"
                src="https://www.youtube.com/embed/vKupj4y46gU?si=oWE1l8bBph1r_nRN&autoplay=1"
                title="FundMate Demo Video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>

            <div className="p-6 bg-gray-800">
              <h3 className="text-xl font-bold text-white mb-1">FundMate Platform Demo</h3>
              <p className="text-gray-300">
                See how FundMate connects people for peer-to-peer loans and crowdfunding campaigns.
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

export default Hero
