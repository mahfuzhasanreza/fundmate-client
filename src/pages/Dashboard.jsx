import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  LayoutDashboard, 
  FileText, 
  Target, 
  UserCheck, 
  CreditCard, 
  Heart, 
  MessageSquare, 
  Settings, 
  DollarSign, 
  TrendingUp, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  Users,
  Calendar,
  PieChart,
  ArrowUpRight,
  ArrowDownRight,
  Menu,
  X,
  LogOut,
  Bell,
  Search
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../config/firebase'
import { getOffersByLenderEmail, getUserLoanRequests } from '../services/loanService'
import { getAllCampaigns } from '../services/campaignService'

const Dashboard = () => {
  const [activeSection, setActiveSection] = useState('overview')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [authUser, authLoading] = useAuthState(auth)
  const [loanRequests, setLoanRequests] = useState([])
  const [offersMade, setOffersMade] = useState([])
  const [acceptedOffers, setAcceptedOffers] = useState([])
  const [campaigns, setCampaigns] = useState([])
  const [completedCampaigns, setCompletedCampaigns] = useState([])
  const [incompleteCampaigns, setIncompleteCampaigns] = useState([])
  const [dataLoading, setDataLoading] = useState(true)
  const [dataError, setDataError] = useState('')
  
  // Dummy user data
  const user = {
    name: authUser?.displayName || authUser?.email?.split('@')[0] || 'User',
    avatar: '👤',
    role: 'Borrower, Lender & Donor',
    memberSince: '—'
  }

  useEffect(() => {
    const fetchDashboardData = async () => {
      if (!authUser?.email) {
        setLoanRequests([])
        setOffersMade([])
        setAcceptedOffers([])
        setDataLoading(false)
        return
      }

      try {
        setDataLoading(true)
        setDataError('')
        const [loanRes, offersRes, campaignsRes] = await Promise.all([
          getUserLoanRequests(authUser.email),
          getOffersByLenderEmail(authUser.email),
          getAllCampaigns({ creatorEmail: authUser.email })
        ])

        const loans = loanRes?.data ?? loanRes
        const offers = offersRes?.data ?? offersRes
        const campaignsResult = campaignsRes?.data ?? campaignsRes
        const loanList = Array.isArray(loans) ? loans : []
        const offerList = Array.isArray(offers) ? offers : []
        const campaignList = Array.isArray(campaignsResult) ? campaignsResult.filter((c) => c.status !== 'deleted') : []

        setLoanRequests(loanList.filter((loan) => loan.status !== 'deleted'))
        setOffersMade(offerList)
        setAcceptedOffers(offerList.filter((offer) => (offer.status || 'pending') === 'accepted'))
        setCampaigns(campaignList)
        const completed = campaignList.filter((campaign) => {
          const raised = campaign.raisedAmount || 0
          const target = campaign.targetAmount || 0
          return (target > 0 && raised >= target) || campaign.status === 'completed'
        })
        const incomplete = campaignList.filter((campaign) => !completed.includes(campaign))
        setCompletedCampaigns(completed)
        setIncompleteCampaigns(incomplete)
      } catch (err) {
        console.error('Dashboard data error:', err)
        setDataError('Failed to load dashboard data.')
      } finally {
        setDataLoading(false)
      }
    }

    if (!authLoading) {
      fetchDashboardData()
    }
  }, [authUser?.email, authLoading])

  // Dashboard statistics
  const stats = [
    {
      title: 'Total Loan Requests',
      value: '3',
      change: '+1 this month',
      icon: FileText,
      color: 'primary',
      bgColor: 'bg-primary-100',
      textColor: 'text-primary-600'
    },
    {
      title: 'Active Loans',
      value: '2',
      change: 'As Borrower',
      icon: TrendingUp,
      color: 'primary',
      bgColor: 'bg-primary-100',
      textColor: 'text-primary-600'
    },
    {
      title: 'Loan Offers Received',
      value: '8',
      change: '3 pending review',
      icon: UserCheck,
      color: 'blue',
      bgColor: 'bg-blue-100',
      textColor: 'text-blue-600'
    },
    {
      title: 'Donations Given',
      value: '৳2,450',
      change: '12 campaigns',
      icon: Heart,
      color: 'pink',
      bgColor: 'bg-pink-100',
      textColor: 'text-pink-600'
    },
    {
      title: 'Campaigns Created',
      value: '1',
      change: '85% funded',
      icon: Target,
      color: 'purple',
      bgColor: 'bg-purple-100',
      textColor: 'text-purple-600'
    },
    {
      title: 'Payments Due',
      value: '৳850',
      change: 'Due in 5 days',
      icon: AlertCircle,
      color: 'orange',
      bgColor: 'bg-orange-100',
      textColor: 'text-orange-600'
    },
    {
      title: 'Payments To Receive',
      value: '৳1,200',
      change: 'Expected this month',
      icon: DollarSign,
      color: 'primary',
      bgColor: 'bg-primary-100',
      textColor: 'text-primary-600'
    },
    {
      title: 'Total Invested',
      value: '৳5,000',
      change: 'As Lender',
      icon: PieChart,
      color: 'indigo',
      bgColor: 'bg-indigo-100',
      textColor: 'text-indigo-600'
    }
  ]

  // Recent activities
  const recentActivities = [
    {
      id: 1,
      type: 'loan_approved',
      title: 'Loan Request Approved',
      description: 'Your business loan of ৳5,000 has been approved',
      time: '2 hours ago',
      icon: CheckCircle,
      color: 'text-primary-600'
    },
    {
      id: 2,
      type: 'offer_received',
      title: 'New Loan Offer',
      description: 'John Doe offered ৳2,000 at 7.5% interest',
      time: '5 hours ago',
      icon: UserCheck,
      color: 'text-blue-600'
    },
    {
      id: 3,
      type: 'donation',
      title: 'Donation Made',
      description: 'You donated ৳100 to Medical Emergency Fund',
      time: '1 day ago',
      icon: Heart,
      color: 'text-pink-600'
    },
    {
      id: 4,
      type: 'payment',
      title: 'Payment Received',
      description: 'Received ৳500 loan repayment from Sarah',
      time: '1 day ago',
      icon: DollarSign,
      color: 'text-primary-600'
    },
  ]

  // Upcoming payments
  const upcomingPayments = [
    {
      id: 1,
      title: 'Business Loan',
      amount: 450,
      dueDate: '2025-12-03',
      status: 'upcoming'
    },
    {
      id: 2,
      title: 'Education Loan',
      amount: 400,
      dueDate: '2025-12-08',
      status: 'upcoming'
    }
  ]

  // Active campaigns
  const activeCampaigns = [
    {
      id: 1,
      title: 'My Community Project',
      raised: 8500,
      goal: 10000,
      backers: 45,
      daysLeft: 12
    }
  ]

  const sidebarItems = [
    { id: 'overview', icon: LayoutDashboard, label: 'Overview' },
    { id: 'loan-requests', icon: FileText, label: 'My Loan Requests' },
    { id: 'campaigns', icon: Target, label: 'My Campaigns' },
    { id: 'offers', icon: UserCheck, label: 'Offers' }
  ]

  const renderContent = () => {
    switch (activeSection) {
      case 'overview':
        return (
          <OverviewSection
            user={user}
            stats={stats}
            recentActivities={recentActivities}
            upcomingPayments={upcomingPayments}
            activeCampaigns={activeCampaigns}
            loanRequests={loanRequests}
            campaigns={campaigns}
            completedCampaigns={completedCampaigns}
            incompleteCampaigns={incompleteCampaigns}
            offers={offersMade}
            acceptedOffers={acceptedOffers}
          />
        )
      case 'loan-requests':
        return <LoanRequestsSection isAuthenticated={Boolean(authUser?.email)} loading={dataLoading} error={dataError} loanRequests={loanRequests} />
      case 'campaigns':
        return <CampaignsSection loading={dataLoading} error={dataError} campaigns={campaigns} completedCampaigns={completedCampaigns} incompleteCampaigns={incompleteCampaigns} />
      case 'offers':
        return <OffersSection isAuthenticated={Boolean(authUser?.email)} loading={dataLoading} error={dataError} offers={offersMade} acceptedOffers={acceptedOffers} />
      case 'repayments':
        return <RepaymentsSection />
      case 'donations':
        return <DonationsSection />
      case 'messages':
        return <MessagesSection />
      default:
        return (
          <OverviewSection
            user={user}
            stats={stats}
            recentActivities={recentActivities}
            upcomingPayments={upcomingPayments}
            activeCampaigns={activeCampaigns}
            loanRequests={loanRequests}
            campaigns={campaigns}
            completedCampaigns={completedCampaigns}
            incompleteCampaigns={incompleteCampaigns}
            offers={offersMade}
            acceptedOffers={acceptedOffers}
          />
        )
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        {/* Sidebar */}
        {/* <AnimatePresence>
          {(sidebarOpen || typeof window !== 'undefined' && window.innerWidth >= 1024) && (
            <motion.aside
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ duration: 0.3 }}
              className="fixed lg:static inset-y-0 left-0 top-16 z-20 w-64 bg-white border-r border-gray-200 overflow-y-auto h-screen pt-4"
            >
            
              <div className="lg:hidden p-4">
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="text-gray-600 hover:text-gray-900"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <div className="p-4 space-y-2">
                {sidebarItems.map((item) => {
                  const Icon = item.icon
                  const isActive = activeSection === item.id
                  
                  return (
                    <motion.button
                      key={item.id}
                      onClick={() => {
                        setActiveSection(item.id)
                        setSidebarOpen(false)
                      }}
                      whileHover={{ x: 5 }}
                      whileTap={{ scale: 0.98 }}
                      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
                        isActive
                          ? 'bg-primary-50 text-primary-600 font-semibold'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                      <span>{item.label}</span>
                    </motion.button>
                  )
                })}

                <div className="pt-4 mt-4 border-t border-gray-200">
                  <motion.button
                    whileHover={{ x: 5 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition-all"
                  >
                    <LogOut className="h-5 w-5" />
                    <span>Logout</span>
                  </motion.button>
                </div>
              </div>
            </motion.aside>
          )}
        </AnimatePresence> */}

        {/* Main Content */}
        <main className="flex-1 p-4 lg:p-8 overflow-x-hidden">
          {/* Mobile Header */}
          <div className="lg:hidden mb-6 flex items-center justify-between">
            <button
              onClick={() => setSidebarOpen(true)}
              className="text-gray-600 hover:text-gray-900"
            >
              <Menu className="h-6 w-6" />
            </button>
            <h1 className="text-xl font-bold text-gray-900">Dashboard</h1>
            <div className="text-2xl">{user.avatar}</div>
          </div>

          {/* Section Tabs */}
          <div className="mb-6 flex flex-wrap gap-2">
            {sidebarItems.map((item) => {
              const Icon = item.icon
              const isActive = activeSection === item.id
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-semibold transition-all ${
                    isActive
                      ? 'bg-primary-600 text-white border-primary-600'
                      : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </button>
              )
            })}
          </div>

          <motion.div
            key={activeSection}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {renderContent()}
          </motion.div>
        </main>
      </div>
    </div>
  )
}

// Overview Section Component
const OverviewSection = ({
  user,
  stats,
  recentActivities,
  upcomingPayments,
  activeCampaigns,
  loanRequests,
  campaigns,
  completedCampaigns,
  incompleteCampaigns,
  offers,
  acceptedOffers
}) => {
  const loanCount = Array.isArray(loanRequests) ? loanRequests.length : 0
  const campaignCount = Array.isArray(campaigns) ? campaigns.length : 0
  const completedCount = Array.isArray(completedCampaigns) ? completedCampaigns.length : 0
  const incompleteCount = Array.isArray(incompleteCampaigns) ? incompleteCampaigns.length : 0
  const offersCount = Array.isArray(offers) ? offers.length : 0
  const acceptedCount = Array.isArray(acceptedOffers) ? acceptedOffers.length : 0

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, {user.name}! 👋</h1>
        <p className="text-gray-600">Here's what's happening with your account today.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        <div className="relative overflow-hidden bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <div className="absolute -top-6 -right-6 h-20 w-20 rounded-full bg-primary-50" />
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">My Loan Requests</p>
          <p className="text-3xl font-bold text-gray-900 mt-3">{loanCount}</p>
          <p className="text-xs text-gray-500 mt-1">Total requests</p>
        </div>
        <div className="relative overflow-hidden bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <div className="absolute -top-6 -right-6 h-20 w-20 rounded-full bg-emerald-50" />
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">My Campaigns</p>
          <p className="text-3xl font-bold text-gray-900 mt-3">{campaignCount}</p>
          <p className="text-xs text-gray-500 mt-1">{completedCount} completed · {incompleteCount} active</p>
        </div>
        <div className="relative overflow-hidden bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <div className="absolute -top-6 -right-6 h-20 w-20 rounded-full bg-amber-50" />
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Offers</p>
          <p className="text-3xl font-bold text-gray-900 mt-3">{offersCount}</p>
          <p className="text-xs text-gray-500 mt-1">{acceptedCount} accepted</p>
        </div>
        <div className="relative overflow-hidden bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-5 shadow-sm text-white">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-white/15 flex items-center justify-center text-lg">
              {user.avatar}
            </div>
            <div>
              <p className="text-xs uppercase tracking-wide text-white/70">Profile</p>
              <p className="text-base font-semibold">{user.name}</p>
            </div>
          </div>
          <div className="mt-4 text-xs text-white/70">{user.role}</div>
          <div className="text-xs text-white/60">Member since {user.memberSince}</div>
        </div>
      </div>

      
    </div>
  )
}

// Placeholder sections
const LoanRequestsSection = ({ isAuthenticated, loading, error, loanRequests }) => {
  const navigate = useNavigate()

  return (
    <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
      <h1 className="text-3xl font-bold text-gray-900 mb-4">My Loan Requests</h1>
      {!isAuthenticated && <p className="text-gray-600">Please log in to view your loan requests.</p>}
      {isAuthenticated && loading && <p className="text-gray-600 font-semibold">Loading loan requests...</p>}
      {isAuthenticated && !loading && error && <p className="text-red-600 font-semibold">{error}</p>}
      {isAuthenticated && !loading && !error && loanRequests.length === 0 && (
        <p className="text-gray-600">No loan requests found.</p>
      )}
      {isAuthenticated && !loading && !error && loanRequests.length > 0 && (
        <div className="space-y-4">
          {loanRequests.map((loan) => {
            const isAccepted =
              loan?.status === 'accepted' ||
              loan?.status === 'funded' ||
              loan?.status === 'closed' ||
              Boolean(loan?.agreementId || loan?.acceptedOfferId)

            const agreementId = loan?.agreementId
            const loanId = loan?._id || loan?.id

            return (
              <div key={loanId} className="border border-gray-200 rounded-xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-gray-900">{loan.loanTitle || loan.title || 'Loan Request'}</h3>
                  <span className="text-sm text-gray-500">{loan.status || 'pending'}</span>
                </div>
                <p className="text-sm text-gray-600">{loan.purpose || 'General'}</p>
                <div className="mt-2 text-sm text-gray-700">
                  Amount: ৳{Number(loan.loanAmount || loan.amount || 0).toLocaleString()}
                </div>
                <div className="mt-4 flex justify-end">
                  {isAccepted ? (
                    <button
                      onClick={() => agreementId && navigate(`/agreement/${agreementId}`)}
                      disabled={!agreementId}
                      className="px-4 py-2 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      Agreement Details
                    </button>
                  ) : (
                    <button
                      onClick={() => loanId && navigate(`/loan/${loanId}`)}
                      disabled={!loanId}
                      className="px-4 py-2 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      Loan Details
                    </button>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

const CampaignsSection = ({ loading, error, campaigns, completedCampaigns, incompleteCampaigns }) => {
  const navigate = useNavigate()

  const renderCampaignRow = (campaign, statusLabel, statusClass) => (
    <div key={campaign._id || campaign.id} className="border border-gray-200 rounded-xl p-4">
      <div className="flex items-center justify-between mb-1">
        <span className="font-semibold text-gray-900">{campaign.campaignTitle}</span>
        <span className={`text-sm ${statusClass}`}>{statusLabel}</span>
      </div>
      <div className="text-sm text-gray-700">
        Raised: ৳{Number(campaign.raisedAmount || 0).toLocaleString()} / ৳{Number(campaign.targetAmount || 0).toLocaleString()}
      </div>
      <div className="mt-3 text-right">
        <button
          onClick={() => navigate(`/campaign/${campaign._id || campaign.id}`)}
          className="px-4 py-2 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition-all"
        >
          View Details
        </button>
      </div>
    </div>
  )

  return (
    <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
      <h1 className="text-3xl font-bold text-gray-900 mb-4">My Campaigns</h1>
      {loading && <p className="text-gray-600 font-semibold">Loading campaigns...</p>}
      {!loading && error && <p className="text-red-600 font-semibold">{error}</p>}
      {!loading && !error && campaigns.length === 0 && (
        <p className="text-gray-600">No campaigns found.</p>
      )}
      {!loading && !error && campaigns.length > 0 && (
        <div className="space-y-6">
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">Incomplete Campaigns</h2>
            {incompleteCampaigns.length === 0 && (
              <p className="text-gray-600">No incomplete campaigns.</p>
            )}
            {incompleteCampaigns.length > 0 && (
              <div className="space-y-3">
                {incompleteCampaigns.map((campaign) =>
                  renderCampaignRow(campaign, campaign.status || 'active', 'text-gray-500')
                )}
              </div>
            )}
          </div>

          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">Completed Campaigns</h2>
            {completedCampaigns.length === 0 && (
              <p className="text-gray-600">No completed campaigns.</p>
            )}
            {completedCampaigns.length > 0 && (
              <div className="space-y-3">
                {completedCampaigns.map((campaign) =>
                  renderCampaignRow(campaign, 'completed', 'text-green-600')
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

const OffersSection = ({ isAuthenticated, loading, error, offers, acceptedOffers }) => {
  const navigate = useNavigate()

  const getAgreementId = (offer) =>
    offer?.agreementId || offer?.acceptedAgreementId || offer?.agreement?._id || offer?.agreement?.id

  const renderOfferRow = (offer, statusLabel, statusClass, actionLabel) => {
    const agreementId = getAgreementId(offer)
    const loanRequestId = offer?.loanRequestId

    return (
    <div key={offer._id || offer.id} className="border border-gray-200 rounded-xl p-4">
      <div className="flex items-center justify-between mb-1">
        <span className="font-semibold text-gray-900">{offer.lenderName || 'Me'}</span>
        <span className={`text-sm ${statusClass}`}>{statusLabel}</span>
      </div>
      <div className="text-sm text-gray-700">
        Amount: ৳{Number(offer.amount || 0).toLocaleString()} · {offer.interestRate || 0}% · {offer.tenureMonths || offer.tenure || 0} months
      </div>
      {offer.message && <p className="text-sm text-gray-600 mt-1">{offer.message}</p>}
      <div className="mt-3 text-right">
        <button
          onClick={() => {
            if (offer.status === 'accepted' && agreementId) {
              navigate(`/agreement/${agreementId}`)
            } else if (offer.loanRequestId) {
              navigate(`/loan/${offer.loanRequestId}`)
            }
          }}
          disabled={offer.status === 'accepted' ? !agreementId : !loanRequestId}
          className="px-4 py-2 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {actionLabel || 'View Details'}
        </button>
      </div>
    </div>
  )
  }

  return (
    <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
      <h1 className="text-3xl font-bold text-gray-900 mb-4">Offers</h1>
      {!isAuthenticated && <p className="text-gray-600">Please log in to view your offers.</p>}
      {isAuthenticated && loading && <p className="text-gray-600 font-semibold">Loading offers...</p>}
      {isAuthenticated && !loading && error && <p className="text-red-600 font-semibold">{error}</p>}
      {isAuthenticated && !loading && !error && offers.length === 0 && (
        <p className="text-gray-600">No offers found.</p>
      )}
      {isAuthenticated && !loading && !error && offers.length > 0 && (
        <div className="space-y-6">
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">Offers I Created</h2>
            <div className="space-y-3">
              {offers.map((offer) =>
                renderOfferRow(offer, offer.status || 'pending', 'text-gray-500', 'View Details')
              )}
            </div>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">Accepted Offers</h2>
            {acceptedOffers.length === 0 && (
              <p className="text-gray-600">No accepted offers yet.</p>
            )}
            {acceptedOffers.length > 0 && (
              <div className="space-y-3">
                {acceptedOffers.map((offer) =>
                  renderOfferRow(offer, 'accepted', 'text-green-600', 'View Agreement')
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}



const DonationsSection = () => (
  <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
    <h1 className="text-3xl font-bold text-gray-900 mb-4">Donations History</h1>
    <p className="text-gray-600">View all your donation history.</p>
    {/* Add donations content */}
  </div>
)

const MessagesSection = () => (
  <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
    <h1 className="text-3xl font-bold text-gray-900 mb-4">Messages</h1>
    <p className="text-gray-600">Your messages and notifications.</p>
    {/* Add messages content */}
  </div>
)

export default Dashboard
