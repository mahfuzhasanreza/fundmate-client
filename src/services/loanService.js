import API_BASE_URL from '../config/api'

/**
 * Create a new loan request
 * @param {Object} loanData - Loan request data
 * @returns {Promise<Object>} Created loan request response
 */
export const createLoanRequest = async (loanData) => {
  try {
    console.log('📤 Creating loan request...', loanData)

    const isFormData = typeof FormData !== 'undefined' && loanData instanceof FormData
    const response = await fetch(`${API_BASE_URL}/api/loan-requests`, {
      method: 'POST',
      headers: {
        ...(isFormData ? {} : { 'Content-Type': 'application/json' }),
      },
      body: isFormData ? loanData : JSON.stringify(loanData),
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.message || 'Failed to create loan request')
    }

    console.log('✅ Loan request created successfully:', data)
    return data
  } catch (error) {
    console.error('❌ Create loan request error:', error)
    throw error
  }
}

/**
 * Get all loan requests with optional filters
 * @param {Object} filters - Optional filters (userEmail, status)
 * @returns {Promise<Array>} Array of loan requests
 */
export const getAllLoanRequests = async (filters = {}) => {
  try {
    console.log('📥 Fetching loan requests with filters:', filters)
    
    // Build query string from filters
    const queryParams = new URLSearchParams()
    if (filters.userEmail) queryParams.append('userEmail', filters.userEmail)
    if (filters.status) queryParams.append('status', filters.status)
    
    const queryString = queryParams.toString()
    const url = `${API_BASE_URL}/api/loan-requests${queryString ? `?${queryString}` : ''}`
    
    console.log('🌐 Making GET request to:', url)
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    console.log('📊 Response status:', response.status, response.statusText)
    
    const data = await response.json()
    console.log('📋 Raw API response:', data)

    if (!response.ok) {
      throw new Error(data.message || 'Failed to fetch loan requests')
    }

    console.log('✅ Loan requests fetched successfully:', Array.isArray(data) ? data.length : 'Not an array', 'items')
    console.log('📄 Sample data structure:', data[0])
    return data
  } catch (error) {
    console.error('❌ Fetch loan requests error:', error)
    throw error
  }
}

/**
 * Get a single loan request by ID
 * @param {string} id - Loan request ID
 * @returns {Promise<Object>} Loan request data
 */
export const getLoanRequestById = async (id) => {
  try {
    console.log('📥 Fetching loan request by ID:', id)
    
    const response = await fetch(`${API_BASE_URL}/api/loan-requests/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.message || 'Failed to fetch loan request')
    }

    console.log('✅ Loan request fetched successfully:', data)
    return data
  } catch (error) {
    console.error('❌ Fetch loan request error:', error)
    throw error
  }
}

/**
 * Create a new loan offer for a loan request
 * @param {string} loanRequestId - Loan request ID
 * @param {Object} offerData - Offer payload
 * @returns {Promise<Object>} Created offer response
 */
export const createLoanOffer = async (loanRequestId, offerData) => {
  try {
    console.log('📤 Creating loan offer...', loanRequestId, offerData)

    const response = await fetch(`${API_BASE_URL}/api/loan-requests/${loanRequestId}/offers`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(offerData),
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.message || 'Failed to create loan offer')
    }

    console.log('✅ Loan offer created successfully:', data)
    return data
  } catch (error) {
    console.error('❌ Create loan offer error:', error)
    throw error
  }
}

/**
 * Get offers for a loan request
 * @param {string} loanRequestId - Loan request ID
 * @returns {Promise<Array>} Array of offers
 */
export const getLoanOffersByLoanId = async (loanRequestId) => {
  try {
    console.log('📥 Fetching loan offers for loan:', loanRequestId)

    const response = await fetch(`${API_BASE_URL}/api/loan-requests/${loanRequestId}/offers`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.message || 'Failed to fetch loan offers')
    }

    console.log('✅ Loan offers fetched successfully:', data)
    return data
  } catch (error) {
    console.error('❌ Fetch loan offers error:', error)
    throw error
  }
}

/**
 * Delete a loan offer
 * @param {string} loanRequestId - Loan request ID
 * @param {string} offerId - Offer ID
 * @returns {Promise<Object>} Delete response
 */
export const deleteLoanOffer = async (loanRequestId, offerId) => {
  try {
    console.log('🗑️ Deleting loan offer:', loanRequestId, offerId)

    const response = await fetch(`${API_BASE_URL}/api/loan-requests/${loanRequestId}/offers/${offerId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.message || 'Failed to delete loan offer')
    }

    console.log('✅ Loan offer deleted successfully:', data)
    return data
  } catch (error) {
    console.error('❌ Delete loan offer error:', error)
    throw error
  }
}

/**
 * Accept a loan offer and create a loan agreement
 * @param {string} loanRequestId - Loan request ID
 * @param {string} offerId - Offer ID
 * @returns {Promise<Object>} Agreement response
 */
export const acceptLoanOffer = async (loanRequestId, offerId) => {
  try {
    console.log('✅ Accepting loan offer:', loanRequestId, offerId)

    const response = await fetch(`${API_BASE_URL}/api/loan-requests/${loanRequestId}/offers/${offerId}/accept`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      }
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.message || 'Failed to accept loan offer')
    }

    console.log('✅ Loan offer accepted:', data)
    return data
  } catch (error) {
    console.error('❌ Accept loan offer error:', error)
    throw error
  }
}

/**
 * Get loan agreement by ID
 * @param {string} agreementId - Agreement ID
 * @returns {Promise<Object>} Agreement data
 */
export const getLoanAgreementById = async (agreementId) => {
  try {
    console.log('📥 Fetching loan agreement by ID:', agreementId)

    const response = await fetch(`${API_BASE_URL}/api/loan-agreements/${agreementId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.message || 'Failed to fetch loan agreement')
    }

    console.log('✅ Loan agreement fetched successfully:', data)
    return data
  } catch (error) {
    console.error('❌ Fetch loan agreement error:', error)
    throw error
  }
}

/**
 * Get offers by lender email
 * @param {string} lenderEmail - Lender email
 * @returns {Promise<Array>} Array of offers
 */
export const getOffersByLenderEmail = async (lenderEmail) => {
  try {
    const queryParams = new URLSearchParams()
    if (lenderEmail) queryParams.append('lenderEmail', lenderEmail)
    const url = `${API_BASE_URL}/api/offers${queryParams.toString() ? `?${queryParams.toString()}` : ''}`

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })

    const data = await response.json()
    if (!response.ok) {
      throw new Error(data.message || 'Failed to fetch offers')
    }
    return data
  } catch (error) {
    console.error('❌ Fetch offers by lender error:', error)
    throw error
  }
}


/**
 * Get loan requests for the current user
 * @param {string} userEmail - User's email address
 * @returns {Promise<Array>} Array of user's loan requests
 */
export const getUserLoanRequests = async (userEmail) => {
  return getAllLoanRequests({ userEmail })
}

/**
 * Get loan requests by status
 * @param {string} status - Loan status (pending, approved, rejected)
 * @returns {Promise<Array>} Array of loan requests with the specified status
 */
export const getLoanRequestsByStatus = async (status) => {
  return getAllLoanRequests({ status })
}
