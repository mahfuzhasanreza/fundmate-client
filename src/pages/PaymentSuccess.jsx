import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useToast } from '../components/common/ToastProvider'

const PaymentSuccess = () => {
  const navigate = useNavigate()
  const { addToast } = useToast()
  const [message, setMessage] = useState('Finalizing your donation...')

  useEffect(() => {
    const finalizeDonation = async () => {
      const raw = localStorage.getItem('sslcom_pending_donation')
      if (!raw) {
        addToast('Payment completed, but no pending donation found.', 'error')
        navigate('/campaigns')
        return
      }

      let pending
      try {
        pending = JSON.parse(raw)
      } catch (err) {
        console.error('Invalid pending donation payload:', err)
        localStorage.removeItem('sslcom_pending_donation')
        addToast('Payment completed, but donation data is invalid.', 'error')
        navigate('/campaigns')
        return
      }

      
    }

    finalizeDonation()
  }, [addToast, navigate])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white border border-gray-200 rounded-xl shadow-md p-6 text-center">
        <h1 className="text-xl font-bold text-gray-900 mb-2">Payment Success</h1>
        <p className="text-gray-600">{message}</p>
      </div>
    </div>
  )
}

export default PaymentSuccess
