import React from 'react'
import { FileText, UserCheck, CreditCard, CheckCircle } from 'lucide-react'
import { Link } from 'react-router-dom'

const steps = [
  {
    icon: FileText,
    title: 'Create Request',
    description: 'Post your loan request or create a crowdfunding campaign with your target amount and purpose.'
  },
  {
    icon: UserCheck,
    title: 'Receive Offers',
    description: 'Community members review your request and send loan offers with their interest terms, or contribute to your campaign.'
  },
  {
    icon: CreditCard,
    title: 'Accept & Fund',
    description: 'Choose the best offer, sign the digital agreement, and receive your funds through secure transfer.'
  },
  {
    icon: CheckCircle,
    title: 'Automated Management',
    description: 'Let our system handle repayment tracking, interest calculations, notifications, and complete transparency.'
  }
]

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-16 md:py-24 bg-white">
      <div className="container-custom">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            How <span className="text-primary-600">It Works</span>
          </h2>
          <p className="text-lg text-gray-600">
            Getting started with FundMate is simple. Follow these four steps to access financial support or help others.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map(({ icon: Icon, title, description }, index) => (
            <div key={title} className="rounded-xl border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-5">
                <div className="h-12 w-12 rounded-lg bg-primary-50 text-primary-600 flex items-center justify-center">
                  <Icon className="h-6 w-6" />
                </div>
                <span className="text-sm font-semibold text-gray-400">
                  Step {String(index + 1).padStart(2, '0')}
                </span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
              <p className="text-gray-600 leading-relaxed">{description}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link to="/login" className="btn-primary inline-block">
            Start Your Journey Today
          </Link>
        </div>
      </div>
    </section>
  )
}

export default HowItWorks
