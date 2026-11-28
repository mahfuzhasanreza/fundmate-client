import React from 'react'
import { TrendingUp, Shield, BadgeCheck } from 'lucide-react'

const values = [
  {
    title: 'Verified Borrowers',
    description: 'Every request is screened with identity and intent checks.',
    icon: Shield
  },
  {
    title: 'Fair Terms',
    description: 'Clear repayment plans and transparent loan details.',
    icon: BadgeCheck
  },
  {
    title: 'Impact-Focused',
    description: 'Support real goals: education, business, and family needs.',
    icon: TrendingUp
  }
]

const highlights = [
  { title: 'Transparent terms', subtitle: 'Plain-language agreements' },
  { title: 'Responsible lending', subtitle: 'Ethical borrower checks' },
  { title: 'Ongoing updates', subtitle: 'Progress you can trust' }
]

const FeaturedLoans = () => {
  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container-custom">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Invest in <span className="text-primary-600">Opportunities</span>
          </h2>
          <p className="text-lg text-gray-600">
            Fund peer-to-peer loans and earn competitive returns while helping others achieve their goals.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {values.map(({ title, description, icon: Icon }) => (
            <div
              key={title}
              className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-md transition-shadow"
            >
              <div className="h-12 w-12 rounded-lg bg-secondary-50 flex items-center justify-center text-secondary-600">
                <Icon className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mt-4">{title}</h3>
              <p className="text-gray-600 mt-2">{description}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-secondary-700 rounded-2xl px-6 py-8 md:px-10 flex flex-col md:flex-row items-center justify-between gap-6 text-white text-center md:text-left">
          <div className="max-w-xl">
            <p className="text-sm text-white/70 uppercase tracking-wide">Loan integrity</p>
            <h3 className="text-xl sm:text-2xl font-bold mt-2">
              Invest with clarity, confidence, and community impact.
            </h3>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
            {highlights.map((item, i) => (
              <React.Fragment key={item.title}>
                {i > 0 && <div className="hidden sm:block h-10 w-px bg-white/20" />}
                <div className="text-center">
                  <p className="text-lg font-semibold">{item.title}</p>
                  <p className="text-xs text-white/70">{item.subtitle}</p>
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default FeaturedLoans
