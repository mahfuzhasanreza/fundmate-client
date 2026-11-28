import React from 'react'
import { Heart, Users, Sparkles } from 'lucide-react'

const pillars = [
  {
    title: 'Transparent Funding',
    description: 'Track every contribution, milestone, and outcome in one trusted place.',
    icon: Sparkles
  },
  {
    title: 'Community First',
    description: 'Back causes and loans that strengthen neighborhoods and real people.',
    icon: Users
  },
  {
    title: 'Impact You Can Feel',
    description: 'See real progress, real stories, and real change driven by donors.',
    icon: Heart
  }
]

const highlights = [
  { title: 'Active donors', subtitle: 'Growing daily' },
  { title: 'Funds mobilized', subtitle: 'Across causes' },
  { title: 'On-time updates', subtitle: 'Transparent progress' }
]

const FeaturedCampaigns = () => {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container-custom">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Built for <span className="text-primary-600">People</span>, Powered by Trust
          </h2>
          <p className="text-lg text-gray-600">
            A calmer, clearer way to fund causes and loans, with transparency you can see.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {pillars.map(({ title, description, icon: Icon }) => (
            <div
              key={title}
              className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-md transition-shadow"
            >
              <div className="h-12 w-12 rounded-lg bg-primary-50 flex items-center justify-center text-primary-600">
                <Icon className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mt-4">{title}</h3>
              <p className="text-gray-600 mt-2">{description}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-secondary-700 rounded-2xl px-6 py-8 md:px-10 flex flex-col md:flex-row items-center justify-between gap-6 text-white text-center md:text-left">
          <div className="max-w-xl">
            <p className="text-sm text-white/70 uppercase tracking-wide">Community momentum</p>
            <h3 className="text-xl sm:text-2xl font-bold mt-2">
              Every contribution moves a real story forward.
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

export default FeaturedCampaigns
