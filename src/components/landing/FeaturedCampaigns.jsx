import React from 'react'
import { motion } from 'framer-motion'
import { Heart, TrendingUp, Users, Sparkles } from 'lucide-react'

const FeaturedCampaigns = () => {
  const pillars = [
    {
      id: 1,
      title: 'Transparent Funding',
      description: 'Track every contribution, milestone, and outcome in one trusted place.',
      icon: Sparkles,
      accent: 'from-primary-500/20 to-primary-600/10'
    },
    {
      id: 2,
      title: 'Community First',
      description: 'Back causes and loans that strengthen neighborhoods and real people.',
      icon: Users,
      accent: 'from-emerald-500/20 to-emerald-600/10'
    },
    {
      id: 3,
      title: 'Impact You Can Feel',
      description: 'See real progress, real stories, and real change driven by donors.',
      icon: Heart,
      accent: 'from-rose-500/20 to-rose-600/10'
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
    <section className="py-16 md:py-24 bg-gradient-to-b from-gray-50 via-white to-gray-50">
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
            className="inline-flex items-center gap-2 bg-primary-100 text-primary-700 text-sm font-semibold px-4 py-2 rounded-full mb-4"
            whileHover={{ scale: 1.05 }}
          >
            ✨ Our Impact Promise
          </motion.span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Built for <span className="text-primary-600">People</span>, Powered by Trust
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            A calmer, clearer way to fund causes and loans—with transparency you can see.
          </p>
        </motion.div>

        {/* Pillars */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {pillars.map((pillar) => {
            const Icon = pillar.icon

            return (
              <motion.div
                key={pillar.id}
                variants={cardVariants}
                whileHover={{ y: -8, boxShadow: "0 18px 35px rgba(0,0,0,0.08)" }}
                className="relative bg-white rounded-2xl p-6 shadow-lg border border-gray-100 overflow-hidden"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${pillar.accent}`} />
                <div className="relative">
                  <div className="h-12 w-12 rounded-2xl bg-white shadow-sm flex items-center justify-center text-primary-600">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mt-4">{pillar.title}</h3>
                  <p className="text-sm text-gray-600 mt-2">{pillar.description}</p>
                </div>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Impact Strip */}
        <motion.div 
          className="mt-12 bg-gray-900 rounded-3xl px-6 py-8 md:px-10 flex flex-col md:flex-row items-center justify-between gap-6 text-white"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <div>
            <p className="text-sm text-white/70 uppercase tracking-wide">Community momentum</p>
            <h3 className="text-2xl font-bold mt-2">Every contribution moves a real story forward.</h3>
          </div>
          <div className="flex items-center gap-6">
            <div className="text-center">
              <p className="text-2xl font-bold">Active donors</p>
              <p className="text-xs text-white/70">Growing daily</p>
            </div>
            <div className="h-10 w-px bg-white/20" />
            <div className="text-center">
              <p className="text-2xl font-bold">Funds mobilized</p>
              <p className="text-xs text-white/70">Across causes</p>
            </div>
            <div className="h-10 w-px bg-white/20" />
            <div className="text-center">
              <p className="text-2xl font-bold">On‑time updates</p>
              <p className="text-xs text-white/70">Transparent progress</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default FeaturedCampaigns
