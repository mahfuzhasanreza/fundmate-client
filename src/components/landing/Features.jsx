import React from 'react'
import { Shield, Zap, TrendingUp, Users, Lock, Bell } from 'lucide-react'

// Full class names so Tailwind includes them in the build
const iconStyles = {
  primary: 'bg-primary-50 text-primary-600',
  secondary: 'bg-secondary-50 text-secondary-600'
}

const features = [
  {
    icon: Shield,
    title: 'Secure & Transparent',
    description: 'Strong encryption and complete transparency in all transactions. Your data and funds are always protected.',
    color: 'primary'
  },
  {
    icon: Zap,
    title: 'Fast Processing',
    description: 'Quick loan approval and fund transfers. Get the support you need without unnecessary delays.',
    color: 'secondary'
  },
  {
    icon: TrendingUp,
    title: 'Fair Interest Rates',
    description: 'Competitive rates offered between peers. Choose the offer that works best for both parties.',
    color: 'primary'
  },
  {
    icon: Users,
    title: 'Community Driven',
    description: 'Built on trust within your community. Connect with people you know for financial support.',
    color: 'secondary'
  },
  {
    icon: Lock,
    title: 'Digital Agreements',
    description: 'Digital loan contracts that document every term, so everything stays clear and secure.',
    color: 'primary'
  },
  {
    icon: Bell,
    title: 'Smart Notifications',
    description: 'Never miss a payment with automated reminders and updates for all loan activities and campaigns.',
    color: 'secondary'
  }
]

const Features = () => {
  return (
    <section id="features" className="py-16 md:py-24 bg-gray-50">
      <div className="container-custom">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Why Choose <span className="text-primary-600">FundMate</span>
          </h2>
          <p className="text-lg text-gray-600">
            Peer-to-peer lending and crowdfunding with features designed for trust, transparency, and ease.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map(({ icon: Icon, title, description, color }) => (
            <div
              key={title}
              className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-md transition-shadow"
            >
              <div className={`inline-flex items-center justify-center h-12 w-12 rounded-lg mb-5 ${iconStyles[color]}`}>
                <Icon className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
              <p className="text-gray-600 leading-relaxed">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Features
