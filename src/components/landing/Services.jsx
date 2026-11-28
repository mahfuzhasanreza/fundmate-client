import React from 'react'
import { Wallet, TrendingUp, Check } from 'lucide-react'
import { Link } from 'react-router-dom'

const services = [
  {
    icon: Wallet,
    title: 'Loan Support',
    description: 'Access personal loans from your trusted community with competitive interest rates.',
    features: [
      'Flexible loan amounts',
      'Competitive interest rates',
      'Digital loan agreements',
      'Automated repayment tracking',
      'Multiple offer selection'
    ],
    headerClass: 'bg-primary-600',
    link: '/all-loans'
  },
  {
    icon: TrendingUp,
    title: 'Crowdfunding Campaigns',
    description: 'Raise funds for your goals through community-supported crowdfunding campaigns.',
    features: [
      'Easy campaign creation',
      'Real-time progress tracking',
      'Multiple payment options',
      'Campaign transparency',
      'Admin approval for trust'
    ],
    headerClass: 'bg-secondary-700',
    link: '/campaigns'
  }
]

const Services = () => {
  return (
    <section id="services" className="py-16 md:py-24 bg-white">
      <div className="container-custom">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Our <span className="text-primary-600">Services</span>
          </h2>
          <p className="text-lg text-gray-600">
            Choose the service that fits your needs, whether you need a loan or want to raise funds for a cause.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {services.map(({ icon: Icon, title, description, features, headerClass, link }) => (
            <div key={title} className="bg-white rounded-xl border border-gray-200 overflow-hidden flex flex-col">
              <div className={`${headerClass} p-8 text-white`}>
                <div className="flex items-center gap-3 mb-3">
                  <Icon className="h-8 w-8" />
                  <h3 className="text-2xl font-bold">{title}</h3>
                </div>
                <p className="text-white/90">{description}</p>
              </div>

              <div className="p-8 flex flex-col flex-1">
                <ul className="space-y-3 mb-8 flex-1">
                  {features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-primary-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link to={link} className="btn-outline text-center">
                  Learn More
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Services
