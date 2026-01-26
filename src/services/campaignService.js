import API_BASE_URL from '../config/api'

export const createCampaign = async (campaignData) => {
  try {
    const isFormData = typeof FormData !== 'undefined' && campaignData instanceof FormData
    const response = await fetch(`${API_BASE_URL}/api/campaigns`, {
      method: 'POST',
      headers: isFormData ? {} : { 'Content-Type': 'application/json' },
      body: isFormData ? campaignData : JSON.stringify(campaignData),
    })
    if (!response.ok) throw new Error('Failed to create campaign')
    return await response.json()
  } catch (error) {
    console.error('Create campaign error:', error)
    throw error
  }
}

export const getAllCampaigns = async (filters = {}) => {
  try {
    const queryParams = new URLSearchParams(filters)
    const url = `${API_BASE_URL}/api/campaigns${queryParams.toString() ? '?' + queryParams : ''}`
    const response = await fetch(url)
    if (!response.ok) throw new Error('Failed to fetch campaigns')
    const result = await response.json()
    if (Array.isArray(result)) return result
    return result.data || result.campaigns || []
  } catch (error) {
    console.error('Get campaigns error:', error)
    throw error
  }
}

export const getCampaignById = async (campaignId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/campaigns/${campaignId}`)
    if (!response.ok) throw new Error('Failed to fetch campaign')
    return await response.json()
  } catch (error) {
    console.error('Get campaign error:', error)
    throw error
  }
}

export const getCampaignDonations = async (campaignId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/campaigns/${campaignId}/donations`)
    if (!response.ok) throw new Error('Failed to fetch donations')
    const result = await response.json()
    return result.data || result.donations || result
  } catch (error) {
    console.error('Get donations error:', error)
    throw error
  }
}

export const createCampaignDonation = async (campaignId, donationData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/campaigns/${campaignId}/donations`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(donationData),
    })
    if (!response.ok) throw new Error('Failed to create donation')
    return await response.json()
  } catch (error) {
    console.error('Create donation error:', error)
    throw error
  }
}

export const deleteCampaignDonation = async (campaignId, donationId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/campaigns/${campaignId}/donations/${donationId}`, {
      method: 'DELETE'
    })
    if (!response.ok) throw new Error('Failed to delete donation')
    return await response.json()
  } catch (error) {
    console.error('Delete donation error:', error)
    throw error
  }
}
