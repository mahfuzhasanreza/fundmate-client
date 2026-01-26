import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Calendar, DollarSign, Loader, MapPin, Target, Users } from 'lucide-react'
import { useNavigate, useParams } from 'react-router-dom'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../config/firebase'
import { createCampaignDonation, deleteCampaignDonation, getCampaignById, getCampaignDonations } from '../services/campaignService'

const CampaignDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [user, authLoading] = useAuthState(auth)
  const [campaign, setCampaign] = useState(null)
  const [donations, setDonations] = useState([])
  const [amount, setAmount] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(true)
  const [donationsLoading, setDonationsLoading] = useState(true)
  const [error, setError] = useState('')
  const [submitError, setSubmitError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    const fetchCampaign = async () => {
      if (!id) return
      try {
        setLoading(true)
        setError('')
        const response = await getCampaignById(id)
        const data = response?.data ?? response
        setCampaign(data)
      } catch (err) {
        console.error('Failed to load campaign:', err)
        setError('Failed to load campaign.')
      } finally {
        setLoading(false)
      }
    }

    fetchCampaign()
  }, [id])

  useEffect(() => {
    const fetchDonations = async () => {
      if (!id) return
      try {
        setDonationsLoading(true)
        const response = await getCampaignDonations(id)
        const data = response?.data ?? response
        setDonations(Array.isArray(data) ? data : [])
      } catch (err) {
        console.error('Failed to load donations:', err)
        setDonations([])
      } finally {
        setDonationsLoading(false)
      }
    }

    fetchDonations()
  }, [id])

  const handleDonate = async (e) => {
    e.preventDefault()
    if (!user?.email) {
      setSubmitError('Please log in to donate.')
      return
    }
    if (!amount || Number(amount) <= 0) {
      setSubmitError('Please enter a valid amount.')
      return
    }

    try {
      setSubmitting(true)
      setSubmitError('')
      await createCampaignDonation(id, {
        donorName: user.displayName || user.email.split('@')[0],
        donorEmail: user.email,
        amount: Number(amount),
        message: message.trim()
      })
      const refreshed = await getCampaignDonations(id)
      const data = refreshed?.data ?? refreshed
      setDonations(Array.isArray(data) ? data : [])
      setAmount('')
      setMessage('')
    } catch (err) {
      console.error('Donation failed:', err)
      setSubmitError('Failed to donate.')
    } finally {
      setSubmitting(false)
    }
  }

  const handleDeleteDonation = async (donationId) => {
    if (!donationId) return
    try {
      await deleteCampaignDonation(id, donationId)
      const refreshed = await getCampaignDonations(id)
      const data = refreshed?.data ?? refreshed
      setDonations(Array.isArray(data) ? data : [])
    } catch (err) {
      console.error('Delete donation failed:', err)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-primary-50 flex items-center justify-center">
        <div className="text-center">
          <Loader className="h-8 w-8 animate-spin text-primary-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading campaign...</p>
        </div>
      </div>
    )
  }

  if (error || !campaign) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-primary-50 flex items-center justify-center">
        <p className="text-red-600 font-semibold">{error || 'Campaign not found.'}</p>
      </div>
    )
  }

  const imageSrc = campaign.campaignImage || (campaign.campaignImages && campaign.campaignImages[0])
  const raised = campaign.raisedAmount || 0
  const target = campaign.targetAmount || 0
  const progress = target > 0 ? Math.min(100, (raised / target) * 100) : 0

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-primary-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6">
          <button
            onClick={() => navigate('/campaigns')}
            className="text-gray-600 hover:text-primary-600 font-semibold"
          >
            ← Back to Campaigns
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
              <div className="h-64 bg-gray-100">
                {imageSrc ? (
                  <img src={imageSrc} alt={campaign.campaignTitle} className="h-full w-full object-cover" />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <Target className="h-16 w-16 text-gray-300" />
                  </div>
                )}
              </div>
              <div className="p-6">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{campaign.campaignTitle}</h1>
                <p className="text-gray-600 mb-4">{campaign.shortDescription}</p>
                <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                  <span className="flex items-center">
                    <MapPin className="h-4 w-4 mr-1" />
                    {campaign.location || 'Location not set'}
                  </span>
                  <span className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    {campaign.campaignDuration || '—'}
                  </span>
                  <span className="flex items-center">
                    <Target className="h-4 w-4 mr-1" />
                    {campaign.category || 'General'}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-3">Campaign Story</h2>
              <p className="text-gray-700 leading-relaxed">{campaign.campaignStory}</p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Donations</h2>
              {donationsLoading && <p className="text-gray-600">Loading donations...</p>}
              {!donationsLoading && donations.length === 0 && (
                <p className="text-gray-600">No donations yet.</p>
              )}
              {!donationsLoading && donations.length > 0 && (
                <div className="space-y-3">
                  {donations.map((donation) => {
                    const canDelete =
                      user?.email &&
                      (donation.donorEmail === user.email || campaign.creatorEmail === user.email)
                    return (
                      <div key={donation._id || donation.id} className="border border-gray-200 rounded-xl p-4">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-semibold text-gray-900">{donation.donorName || 'Anonymous'}</span>
                          <span className="text-sm text-gray-500">৳{Number(donation.amount || 0).toLocaleString()}</span>
                        </div>
                        {donation.message && <p className="text-sm text-gray-600">{donation.message}</p>}
                        {canDelete && (
                          <div className="mt-2 text-right">
                            <button
                              onClick={() => handleDeleteDonation(donation._id || donation.id)}
                              className="text-xs font-semibold text-red-600 hover:text-red-700"
                            >
                              Delete
                            </button>
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-500">Raised</span>
                <span className="text-sm text-gray-500">Goal</span>
              </div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-2xl font-bold text-gray-900">৳{raised.toLocaleString()}</span>
                <span className="text-lg font-semibold text-gray-700">৳{target.toLocaleString()}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                <div
                  className="bg-primary-600 h-2 rounded-full"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className="flex items-center justify-between text-sm text-gray-600">
                <span>{progress.toFixed(1)}% funded</span>
                <span className="flex items-center">
                  <Users className="h-4 w-4 mr-1" />
                  {donations.length} donors
                </span>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Contribute</h2>
              <form onSubmit={handleDonate} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Your Name</label>
                  <div className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl bg-gray-50 text-gray-700">
                    {authLoading ? 'Loading user...' : (user?.displayName || user?.email?.split('@')[0] || 'Guest')}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                  <div className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl bg-gray-50 text-gray-700">
                    {authLoading ? 'Loading user...' : (user?.email || 'Not signed in')}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Amount (৳)</label>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    min="1"
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary-500 outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Message (Optional)</label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows="3"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary-500 outline-none transition-all resize-none"
                  />
                </div>
                {submitError && <p className="text-sm text-red-600 font-semibold">{submitError}</p>}
                <button
                  type="submit"
                  disabled={submitting || !user?.email}
                  className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-primary-600 text-white rounded-xl font-semibold hover:bg-primary-700 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  <DollarSign className="h-4 w-4" />
                  {submitting ? 'Submitting...' : 'Donate Now'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CampaignDetails
