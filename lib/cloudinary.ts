import { apiUrl } from './api'

// Cloudinary image management
export interface CloudinaryImage {
  public_id: string
  secure_url: string
  url: string
  format: string
  width: number
  height: number
  bytes: number
  created_at: string
  folder: string
}

export interface CloudinaryResponse {
  success: boolean
  images?: CloudinaryImage[]
  image?: CloudinaryImage
  total?: number
  error?: string
}

// Get all images from Cloudinary
export async function getCloudinaryImages(folder = 'di-wholesale', maxResults = 100): Promise<CloudinaryImage[]> {
  try {
    const response = await fetch(`${apiUrl('/api/products/images')}?folder=${folder}&max_results=${maxResults}`)
    const data: CloudinaryResponse = await response.json()

    if (!response.ok || !data.success) {
      throw new Error(data.error || 'Failed to fetch images')
    }

    return data.images || []
  } catch (error) {
    console.error('Error fetching Cloudinary images:', error)
    throw error
  }
}

// Get specific image details
export async function getCloudinaryImage(publicId: string): Promise<CloudinaryImage> {
  try {
    const response = await fetch(apiUrl(`/api/products/images/${publicId}`))
    const data: CloudinaryResponse = await response.json()

    if (!response.ok || !data.success) {
      throw new Error(data.error || 'Failed to fetch image details')
    }

    return data.image!
  } catch (error) {
    console.error('Error fetching Cloudinary image:', error)
    throw error
  }
}

// Search images
export async function searchCloudinaryImages(query: string, folder = 'di-wholesale'): Promise<CloudinaryImage[]> {
  try {
    const response = await fetch(apiUrl(`/api/products/images/search/${encodeURIComponent(query)}?folder=${folder}`))
    const data: CloudinaryResponse = await response.json()

    if (!response.ok || !data.success) {
      throw new Error(data.error || 'Failed to search images')
    }

    return data.images || []
  } catch (error) {
    console.error('Error searching Cloudinary images:', error)
    throw error
  }
}

// Get transformed image URL
export function getTransformedImageUrl(publicId: string, transformations: Record<string, any> = {}) {
  const baseUrl = `https://res.cloudinary.com/ddriavoau/image/upload/`

  // Default transformations
  const defaultTransforms = {
    w: 800,
    h: 800,
    c: 'limit',
    q: 'auto'
  }

  // Merge with custom transformations
  const finalTransforms = { ...defaultTransforms, ...transformations }

  // Build transformation string
  const transformString = Object.entries(finalTransforms)
    .map(([key, value]) => `${key}_${value}`)
    .join(',')

  return `${baseUrl}${transformString}/${publicId}`
}

// Download image locally (client-side)
export function downloadImage(url: string, filename: string) {
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

// Extract public ID from Cloudinary URL
export function extractPublicId(url: string): string | null {
  if (!url || !url.includes('cloudinary.com')) return null

  // URL format: https://res.cloudinary.com/{cloud_name}/image/upload/{transformations}/{public_id}.{format}
  const parts = url.split('/')
  const uploadIndex = parts.findIndex(part => part === 'upload')

  if (uploadIndex === -1) return null

  // Get everything after upload, remove version and transformations
  const pathParts = parts.slice(uploadIndex + 1)
  const publicIdWithExt = pathParts[pathParts.length - 1]

  // Remove file extension
  return publicIdWithExt.split('.')[0]
}

// Utility to get optimized image URLs
export function getOptimizedImageUrl(url: string, width = 800, height = 800) {
  if (!url || !url.includes('cloudinary.com')) return url

  const publicId = extractPublicId(url)
  if (!publicId) return url

  return getTransformedImageUrl(publicId, { w: width, h: height })
}


