import React from 'react'
import { ArrowRight, Check } from 'lucide-react'
import { Link } from 'react-router-dom'

const CallToAction = () => {
  return (
    <section className="py-16 md:py-24 bg-primary-700">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Transform Your Financial Journey?
          </h2>
          <p className="text-lg text-white/90 mb-10 max-w-2xl mx-auto">
            Join the people who trust FundMate for their lending and crowdfunding needs.
            Start today with complete transparency and security.
          </p>

          <Link
            to="/register"
            className="inline-flex items-center gap-2 bg-white hover:bg-gray-100 text-primary-700 font-semibold py-3.5 px-8 rounded-lg transition-colors"
          >
            Create Free Account
            <ArrowRight className="h-5 w-5" />
          </Link>

          <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3 justify-center text-white/85 text-sm">
            {['No setup fees', 'Cancel anytime', '24/7 support'].map((text) => (
              <div key={text} className="flex items-center gap-2">
                <Check className="h-4 w-4" />
                <span>{text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default CallToAction
