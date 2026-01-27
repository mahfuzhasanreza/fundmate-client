import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useToast } from '../components/common/ToastProvider'

const PaymentFail = () => {
  const navigate = useNavigate()
  const { addToast } = useToast()

  useEffect(() => {
    const raw = localStorage.getItem('sslcom_pending_donation')
    let campaignId = ''
    if (raw) {
      try {
        const pending = JSON.parse(raw)
        campaignId = pending?.campaignId || ''
      } catch (err) {
        console.error('Invalid pending donation payload:', err)
      }
      localStorage.removeItem('sslcom_pending_donation')
    }
    addToast('Payment failed or cancelled.', 'error')
    if (campaignId) {
      navigate(`/campaign/${campaignId}`)
    } else {
      navigate('/campaigns')
    }
  }, [addToast, navigate])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white border border-gray-200 rounded-xl shadow-md p-6 text-center">
        <h1 className="text-xl font-bold text-gray-900 mb-2">Payment Failed</h1>
        <p className="text-gray-600">Redirecting you back...</p>
      </div>
    </div>
  )
}

export default PaymentFail
