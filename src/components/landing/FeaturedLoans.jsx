import React from 'react'
import { motion } from 'framer-motion'
import { DollarSign, CheckCircle, TrendingUp, Shield, BadgeCheck } from 'lucide-react'

const FeaturedLoans = () => {
  const values = [
    {
      id: 1,
      title: 'Verified Borrowers',
      description: 'Every request is screened with identity and intent checks.',
      icon: Shield,
      accent: 'from-secondary-500/20 to-secondary-600/10'
    },
    {
      id: 2,
      title: 'Fair Terms',
      description: 'Clear repayment plans and transparent loan details.',
      icon: BadgeCheck,
      accent: 'from-primary-500/20 to-primary-600/10'
    },
    {
      id: 3,
      title: 'Impact‑Focused',
      description: 'Support real goals—education, business, and family needs.',
      icon: TrendingUp,
      accent: 'from-emerald-500/20 to-emerald-600/10'
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  }

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-white via-gray-50 to-white">
      <div className="container-custom">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.span 
            className="inline-flex items-center gap-2 bg-secondary-100 text-secondary-700 text-sm font-semibold px-4 py-2 rounded-full mb-4"
            whileHover={{ scale: 1.05 }}
          >
            💰 Invest With Confidence
          </motion.span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Invest in <span className="text-primary-600">Opportunities</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Fund peer-to-peer loans and earn competitive returns while helping others achieve their goals
          </p>
        </motion.div>

        {/* Values Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {values.map((value) => {
            const Icon = value.icon
            return (
              <motion.div
                key={value.id}
                variants={cardVariants}
                whileHover={{ y: -8, boxShadow: "0 18px 35px rgba(0,0,0,0.08)" }}
                className="relative bg-white rounded-2xl p-6 shadow-lg border border-gray-100 overflow-hidden"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${value.accent}`} />
                <div className="relative">
                  <div className="h-12 w-12 rounded-2xl bg-white shadow-sm flex items-center justify-center text-secondary-600">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mt-4">{value.title}</h3>
                  <p className="text-sm text-gray-600 mt-2">{value.description}</p>
                </div>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Trust Strip */}
        <motion.div 
          className="mt-12 bg-secondary-900 rounded-3xl px-6 py-8 md:px-10 flex flex-col md:flex-row items-center justify-between gap-6 text-white"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <div>
            <p className="text-sm text-white/70 uppercase tracking-wide">Loan integrity</p>
            <h3 className="text-2xl font-bold mt-2">Invest with clarity, confidence, and community impact.</h3>
          </div>
          <div className="flex items-center gap-6">
            <div className="text-center">
              <p className="text-2xl font-bold">Transparent terms</p>
              <p className="text-xs text-white/70">Plain‑language agreements</p>
            </div>
            <div className="h-10 w-px bg-white/20" />
            <div className="text-center">
              <p className="text-2xl font-bold">Responsible lending</p>
              <p className="text-xs text-white/70">Ethical borrower checks</p>
            </div>
            <div className="h-10 w-px bg-white/20" />
            <div className="text-center">
              <p className="text-2xl font-bold">Ongoing updates</p>
              <p className="text-xs text-white/70">Progress you can trust</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default FeaturedLoans
