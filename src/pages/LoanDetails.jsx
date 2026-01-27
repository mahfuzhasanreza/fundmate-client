import React, { useEffect, useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  DollarSign, 
  Calendar, 
  User, 
  Clock, 
  Target, 
  CheckCircle, 
  Star, 
  MapPin, 
  Briefcase, 
  TrendingUp,
  AlertCircle,
  MessageSquare,
  ArrowLeft,
  Share2,
  Heart,
  Shield,
  Percent
} from 'lucide-react'
import { useNavigate, useParams } from 'react-router-dom'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../config/firebase'
import { acceptLoanOffer, createLoanOffer, getLoanOffersByLoanId, getLoanRequestById } from '../services/loanService'

const LoanDetails = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const [user, authLoading] = useAuthState(auth)
  const [showOfferModal, setShowOfferModal] = useState(false)
  const [offerAmount, setOfferAmount] = useState('')
  const [offerInterest, setOfferInterest] = useState('')
  const [offerTenure, setOfferTenure] = useState('')
  const [offerMessage, setOfferMessage] = useState('')
  const [loanData, setLoanData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [offers, setOffers] = useState([])
  const [offersLoading, setOffersLoading] = useState(true)
  const [offersError, setOffersError] = useState('')
  const [acceptingOfferId, setAcceptingOfferId] = useState(null)

  const dedupeOffers = (items) => {
    const list = Array.isArray(items) ? items : []
    const seen = new Set()
    const unique = []
    for (const offer of list) {
      const key = [
        offer?.lenderEmail,
        offer?.lenderName,
        offer?.amount,
        offer?.interestRate,
        offer?.tenure || offer?.tenureMonths,
        offer?.message,
        offer?.status
      ].join('|')
      if (!seen.has(key)) {
        seen.add(key)
        unique.push(offer)
      }
    }
    return unique
  }

  useEffect(() => {
    const fetchLoan = async () => {
      if (!id) return
      try {
        setLoading(true)
        setError('')
        const response = await getLoanRequestById(id)
        const data = response?.data ?? response
        setLoanData(data)
      } catch (err) {
        console.error('Failed to load loan details:', err)
        setError('Failed to load loan details. Please try again.')
        setLoanData(null)
      } finally {
        setLoading(false)
      }
    }

    fetchLoan()
  }, [id])

  useEffect(() => {
    const fetchOffers = async () => {
      if (!id) return
      try {
        setOffersLoading(true)
        setOffersError('')
        const response = await getLoanOffersByLoanId(id)
        const data = response?.data ?? response
        setOffers(dedupeOffers(data))
      } catch (err) {
        console.error('Failed to load offers:', err)
        setOffersError('Failed to load offers.')
        setOffers([])
      } finally {
        setOffersLoading(false)
      }
    }

    fetchOffers()
  }, [id])

  const derivedLoan = useMemo(() => {
    if (!loanData) return null
    return {
      id: loanData._id || loanData.id,
      title: loanData.loanTitle || loanData.title || 'Loan Request',
      amount: loanData.loanAmount || loanData.amount || 0,
      purpose: loanData.purpose || 'General',
      description: loanData.description || loanData.collateralNotes || 'No description provided.',
      tenure: loanData.preferredTenure || loanData.tenure || 0,
      preferredInterest: loanData.interestRate || loanData.preferredInterest || 0,
      repaymentSchedule: loanData.repaymentSchedule || 'monthly',
      collateral: loanData.collateral || loanData.collateralNotes || '',
      status: loanData.status || 'pending',
      postedDate: loanData.createdAt || loanData.postedDate || Date.now(),
      deadline: loanData.deadline || loanData.createdAt || Date.now(),
      currentOffers: loanData.offersCount || 0,
      borrower: {
        name: loanData.borrower?.name || loanData.borrowerName || loanData.userName || loanData.userEmail?.split('@')[0] || 'Unknown User',
        avatar: loanData.borrower?.avatar || loanData.borrowerAvatar || '👤',
        rating: loanData.borrower?.rating || 4.5,
        totalBorrowed: loanData.borrower?.totalBorrowed || 0,
        successfulLoans: loanData.borrower?.successfulLoans || 0,
        memberSince: loanData.borrower?.memberSince || 'N/A',
        location: loanData.borrower?.location || loanData.borrowerLocation || 'Location not specified',
        occupation: loanData.borrower?.occupation || 'Borrower',
        verified: Boolean(loanData.borrower?.verified)
      }
    }
  }, [loanData])

  const isCreator = Boolean(user?.email && loanData?.userEmail && user.email === loanData.userEmail)

  // Timeline data
  const timeline = [
    {
      id: 1,
      date: '2024-11-15',
      time: '10:30 AM',
      type: 'created',
      title: 'Loan Request Created',
      description: 'Sarah posted this loan request for business expansion',
      icon: Target,
      color: 'text-blue-600'
    },
    {
      id: 2,
      date: '2024-11-16',
      time: '2:15 PM',
      type: 'offer',
      title: 'First Offer Received',
      description: 'John D. offered ৳10,000 at 7.5% interest',
      icon: DollarSign,
      color: 'text-primary-600'
    },
    {
      id: 3,
      date: '2024-11-18',
      time: '9:45 AM',
      type: 'update',
      title: 'Additional Information Added',
      description: 'Borrower uploaded business financial statements',
      icon: CheckCircle,
      color: 'text-primary-600'
    },
    {
      id: 4,
      date: '2024-11-20',
      time: '4:20 PM',
      type: 'offer',
      title: 'New Competitive Offer',
      description: 'Multiple lenders submitted offers',
      icon: TrendingUp,
      color: 'text-purple-600'
    }
  ]

  // Offers data
  const handleSubmitOffer = (e) => {
    e.preventDefault()
    if (!user || !user.email) {
      setOffersError('Please log in to submit an offer.')
      return
    }

    const payload = {
      lenderName: user.displayName || user.email.split('@')[0] || 'User',
      lenderEmail: user.email,
      amount: Number(offerAmount),
      interestRate: Number(offerInterest),
      tenureMonths: Number(offerTenure),
      message: offerMessage.trim()
    }

    const submit = async () => {
      try {
        await createLoanOffer(id, payload)
        const response = await getLoanOffersByLoanId(id)
        const data = response?.data ?? response
        setOffers(dedupeOffers(data))
        setShowOfferModal(false)
        setOfferAmount('')
        setOfferInterest('')
        setOfferTenure('')
        setOfferMessage('')
      } catch (err) {
        console.error('Offer submit failed:', err)
        setOffersError('Failed to submit offer.')
      }
    }

    submit()
  }

  const handleAcceptOffer = async (offer) => {
    if (!isCreator || !offer) return
    const offerId = offer._id || offer.id
    if (!offerId) return
    try {
      setAcceptingOfferId(offerId)
      setOffersError('')
      const response = await acceptLoanOffer(id, offerId)
      const agreementId = response?.data?.agreementId || response?.data?._id || response?.agreementId || response?._id
      const refreshed = await getLoanOffersByLoanId(id)
      const refreshedData = refreshed?.data ?? refreshed
      setOffers(dedupeOffers(refreshedData))
      if (agreementId) {
        navigate(`/agreement/${agreementId}`)
      }
    } catch (err) {
      console.error('Accept offer failed:', err)
      setOffersError('Failed to accept offer.')
    } finally {
      setAcceptingOfferId(null)
    }
  }

  const calculateMonthlyPayment = (principal, rate, months) => {
    const monthlyRate = rate / 100 / 12
    if (!principal || !rate || !months) return '0.00'
    const payment = principal * (monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1)
    return payment.toFixed(2)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-primary-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <motion.button
            onClick={() => navigate(-1)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>Back</span>
          </motion.button>

          <div className="flex items-center space-x-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 text-gray-600 hover:text-primary-600 transition-colors"
            >
              <Share2 className="h-5 w-5" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 text-gray-600 hover:text-red-500 transition-colors"
            >
              <Heart className="h-5 w-5" />
            </motion.button>
          </div>
        </div>

        {loading && (
          <div className="flex items-center justify-center py-16 text-gray-600 font-semibold">
            Loading loan details...
          </div>
        )}

        {error && !loading && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center text-red-600 font-semibold">
            {error}
          </div>
        )}

        {!loading && !error && derivedLoan && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Loan Overview */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100"
            >
              <div className="flex items-start justify-between mb-6">
                <div>
                  <span className="inline-block bg-primary-100 text-primary-700 text-sm font-semibold px-3 py-1 rounded-full mb-3">
                    ID: {derivedLoan.id}
                  </span>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{derivedLoan.title}</h1>
                  <p className="text-gray-600">{derivedLoan.description}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                  derivedLoan.status === 'active' 
                    ? 'bg-primary-100 text-primary-700' 
                    : 'bg-yellow-100 text-yellow-700'
                }`}>
                  {derivedLoan.status === 'active' ? 'Active' : 'Pending'}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="text-center p-4 bg-primary-50 rounded-xl">
                  <DollarSign className="h-8 w-8 text-primary-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-gray-900">৳{derivedLoan.amount.toLocaleString()}</p>
                  <p className="text-sm text-gray-600">Loan Amount</p>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-xl">
                  <Calendar className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-gray-900">{derivedLoan.tenure}</p>
                  <p className="text-sm text-gray-600">Months</p>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-xl">
                  <Percent className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-gray-900">{derivedLoan.preferredInterest}%</p>
                  <p className="text-sm text-gray-600">Preferred Rate</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                <div>
                  <p className="font-semibold text-gray-900 mb-1">Purpose</p>
                  <p className="text-gray-600">{derivedLoan.purpose}</p>
                </div>
                <div>
                  <p className="font-semibold text-gray-900 mb-1">Repayment</p>
                  <p className="text-gray-600 capitalize">{derivedLoan.repaymentSchedule}</p>
                </div>
                <div>
                  <p className="font-semibold text-gray-900 mb-1">Posted Date</p>
                  <p className="text-gray-600">{new Date(derivedLoan.postedDate).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="font-semibold text-gray-900 mb-1">Application Deadline</p>
                  <p className="text-gray-600">{new Date(derivedLoan.deadline).toLocaleDateString()}</p>
                </div>
              </div>

              {Array.isArray(loanData?.attachments) && loanData.attachments.length > 0 && (
                <div className="mt-6">
                  <p className="font-semibold text-gray-900 mb-2">Attachments</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {loanData.attachments.map((file, idx) => {
                      const name = file?.name || file?.originalName || file?.filename || `Attachment ${idx + 1}`
                      const url = file?.url || file?.path || file
                      const type = file?.type || ''
                      const isImage = type.startsWith('image/') || /\.(png|jpe?g|gif|webp)$/i.test(url)

                      return (
                        <div key={`${name}-${idx}`} className="border border-gray-200 rounded-xl p-3">
                          {isImage && (
                            <a href={url} target="_blank" rel="noreferrer">
                              <img
                                src={url}
                                alt={name}
                                className="w-full h-40 object-cover rounded-lg mb-2"
                                loading="lazy"
                              />
                            </a>
                          )}
                          <a
                            href={url}
                            target="_blank"
                            rel="noreferrer"
                            className="block text-sm text-primary-600 hover:text-primary-700 underline"
                          >
                            {name}
                          </a>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )}

              {derivedLoan.collateral && (
                <div className="mt-6 p-4 bg-yellow-50 rounded-xl border border-yellow-200">
                  <div className="flex items-start space-x-3">
                    <Shield className="h-5 w-5 text-yellow-600 mt-0.5" />
                    <div>
                      <p className="font-semibold text-gray-900 mb-1">Collateral Offered</p>
                      <p className="text-gray-600">{derivedLoan.collateral}</p>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>

            {/* Timeline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Timeline</h2>
              <div className="space-y-4">
                {timeline.map((event, index) => {
                  const Icon = event.icon
                  return (
                    <motion.div
                      key={event.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start space-x-4 p-4 rounded-lg hover:bg-gray-50 transition-all"
                    >
                      <div className={`p-2 rounded-lg bg-opacity-10 ${event.color.replace('text-', 'bg-')}`}>
                        <Icon className={`h-5 w-5 ${event.color}`} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <h3 className="font-semibold text-gray-900">{event.title}</h3>
                          <span className="text-xs text-gray-500">
                            {new Date(event.date).toLocaleDateString()} {event.time}
                          </span>
                        </div>
                        <p className="text-gray-600">{event.description}</p>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </motion.div>

            {/* Offers */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  Loan Offers ({offers.length})
                </h2>
                {!isCreator && (
                  <motion.button
                    onClick={() => setShowOfferModal(true)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-all"
                  >
                    Submit Loan Offer
                  </motion.button>
                )}
              </div>

              {offersLoading && (
                <div className="text-gray-600 font-semibold">Loading offers...</div>
              )}
              {offersError && !offersLoading && (
                <div className="text-red-600 font-semibold">{offersError}</div>
              )}
              {!offersLoading && !offersError && offers.length === 0 && (
                <div className="text-gray-600">No offers yet. Be the first to submit an offer.</div>
              )}
              {!offersLoading && !offersError && offers.length > 0 && (
              <div className="space-y-4">
                {offers.map((offer, index) => (
                  <motion.div
                    key={offer._id || offer.id || index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-all"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-4">
                        <div className="text-3xl">{offer.lenderAvatar || '👤'}</div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{offer.lenderName || 'Anonymous Lender'}</h3>
                          <div className="flex items-center space-x-2">
                            <div className="flex items-center">
                              <Star className="h-4 w-4 text-yellow-400 mr-1" />
                              <span className="text-sm font-medium text-gray-700">{offer.lenderRating || '4.5'}</span>
                            </div>
                            <span className="text-gray-300">•</span>
                            <span className="text-sm text-gray-500">
                              {new Date(offer.submittedDate || offer.createdAt || Date.now()).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        (offer.status || 'pending') === 'pending' 
                          ? 'bg-yellow-100 text-yellow-700' 
                          : 'bg-primary-100 text-primary-700'
                      }`}>
                        {(offer.status || 'pending') === 'pending' ? 'Pending' : 'Accepted'}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Amount</p>
                        <p className="font-bold text-gray-900">৳{Number(offer.amount || 0).toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Interest Rate</p>
                        <p className="font-bold text-gray-900">{offer.interestRate || 0}%</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Tenure</p>
                        <p className="font-bold text-gray-900">{offer.tenure || offer.tenureMonths || 0} months</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Monthly Payment</p>
                        <p className="font-bold text-primary-600">
                          ৳{calculateMonthlyPayment(offer.amount, offer.interestRate, offer.tenure || offer.tenureMonths)}
                        </p>
                      </div>
                    </div>

                    {offer.message && (
                      <div className="bg-gray-50 rounded-lg p-4">
                        <div className="flex items-start space-x-2">
                          <MessageSquare className="h-4 w-4 text-gray-400 mt-1" />
                          <p className="text-gray-700 text-sm">{offer.message}</p>
                        </div>
                      </div>
                    )}
                    {isCreator && (offer.status || 'pending') === 'pending' && (
                      <div className="mt-4 flex justify-end">
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => handleAcceptOffer(offer)}
                          disabled={acceptingOfferId === (offer._id || offer.id)}
                          className="px-4 py-2 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                        >
                          Accept Offer
                        </motion.button>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
              )}
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Borrower Profile */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 sticky top-8"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-4">Borrower Profile</h3>
              
              <div className="text-center mb-6">
                <div className="text-6xl mb-3">{derivedLoan.borrower.avatar}</div>
                <h4 className="text-lg font-semibold text-gray-900 mb-1">
                  {derivedLoan.borrower.name}
                  {derivedLoan.borrower.verified && (
                    <CheckCircle className="inline h-5 w-5 text-primary-500 ml-2" />
                  )}
                </h4>
                <div className="flex items-center justify-center space-x-1 mb-2">
                  <Star className="h-4 w-4 text-yellow-400" />
                  <span className="font-medium text-gray-700">{derivedLoan.borrower.rating}</span>
                  <span className="text-gray-500">/5</span>
                </div>
                <p className="text-gray-600">{derivedLoan.borrower.occupation}</p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Member Since</span>
                  <span className="font-semibold text-gray-900">{derivedLoan.borrower.memberSince}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Total Borrowed</span>
                  <span className="font-semibold text-gray-900">
                    ৳{derivedLoan.borrower.totalBorrowed.toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Successful Loans</span>
                  <span className="font-semibold text-gray-900">{derivedLoan.borrower.successfulLoans}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 flex items-center">
                    <MapPin className="h-4 w-4 mr-1" />
                    Location
                  </span>
                  <span className="font-semibold text-gray-900">{derivedLoan.borrower.location}</span>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-gray-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-600">Current Offers</span>
                  <span className="font-semibold text-primary-600">{offers.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    Days Left
                  </span>
                  <span className="font-semibold text-orange-600">
                    {Math.ceil((new Date(derivedLoan.deadline) - new Date()) / (1000 * 60 * 60 * 24))}
                  </span>
                </div>
              </div>
            </motion.div>

           
          </div>
        </div>
        )}

      
      </div>

      {/* Offer Modal */}
      <AnimatePresence>
      {!isCreator && showOfferModal && (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowOfferModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl p-8 max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Submit Loan Offer</h3>
              
              <form onSubmit={handleSubmitOffer} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Lender
                  </label>
                  <div className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl bg-gray-50 text-gray-700">
                    {authLoading ? 'Loading user...' : (user?.displayName || user?.email?.split('@')[0] || 'Guest')}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Email
                  </label>
                  <div className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl bg-gray-50 text-gray-700">
                    {authLoading ? 'Loading user...' : (user?.email || 'Not signed in')}
                  </div>
                </div>
                {!authLoading && !user?.email && (
                  <p className="text-sm text-red-600 font-semibold">Please log in to submit an offer.</p>
                )}

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Offer Amount (৳)
                  </label>
                  <input
                    type="number"
                    value={offerAmount}
                    onChange={(e) => setOfferAmount(e.target.value)}
                    placeholder="Enter amount"
                    max={derivedLoan?.amount || 0}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary-500 outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Interest Rate (%)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={offerInterest}
                    onChange={(e) => setOfferInterest(e.target.value)}
                    placeholder="Enter interest rate"
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary-500 outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Tenure (months)
                  </label>
                  <input
                    type="number"
                    value={offerTenure}
                    onChange={(e) => setOfferTenure(e.target.value)}
                    placeholder="Enter tenure in months"
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary-500 outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Message to Borrower (Optional)
                  </label>
                  <textarea
                    value={offerMessage}
                    onChange={(e) => setOfferMessage(e.target.value)}
                    placeholder="Add a personal message..."
                    rows="3"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary-500 outline-none transition-all resize-none"
                  />
                </div>

                <div className="flex space-x-4 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowOfferModal(false)}
                    className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={authLoading || !user?.email}
                    className="flex-1 px-6 py-3 bg-primary-600 text-white rounded-xl font-semibold hover:bg-primary-700 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    Submit Offer
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default LoanDetails
