"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { 
  Upload, 
  ArrowLeft, 
  Search, 
  Trash2, 
  Download,
  Eye,
  Copy,
  Image as ImageIcon,
  Grid,
  List
} from "lucide-react"

interface MediaFile {
  id: string
  filename: string
  alt: string
  caption?: string
  url: string
  filesize: number
  width?: number
  height?: number
  createdAt: string
  updatedAt: string
  sizes?: {
    thumbnail?: { url: string, width: number, height: number }
    card?: { url: string, width: number, height: number }
    tablet?: { url: string, width: number, height: number }
  }
}

interface MediaResponse {
  docs: MediaFile[]
  totalDocs: number
  totalPages: number
  page: number
  limit: number
}

// Lazy Loading Image Component
const LazyImage = ({ src, alt, className, ...props }: { src: string; alt: string; className?: string; [key: string]: any }) => {
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)
  const [isInView, setIsInView] = useState(false)
  const imgRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.1, rootMargin: '50px' }
    )

    if (imgRef.current) {
      observer.observe(imgRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <div ref={imgRef} className={`relative ${className}`} {...props}>
      {isLoading && (
        <div className="absolute inset-0 bg-gray-100 animate-pulse flex items-center justify-center">
          <ImageIcon className="h-8 w-8 text-gray-300" />
        </div>
      )}
      {hasError && (
        <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
          <ImageIcon className="h-8 w-8 text-red-300" />
        </div>
      )}
      {isInView && (
        <img
          src={src}
          alt={alt}
          className={`${className} ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
          onLoad={() => setIsLoading(false)}
          onError={() => {
            setIsLoading(false)
            setHasError(true)
          }}
        />
      )}
    </div>
  )
}

export default function MediaManagement() {
  const [media, setMedia] = useState<MediaFile[]>([])
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState<{[key: string]: number}>({})
  const [dragActive, setDragActive] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [selectedFiles, setSelectedFiles] = useState<Set<string>>(new Set())
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [totalDocs, setTotalDocs] = useState(0)
  const [hasMore, setHasMore] = useState(true)
  const [loadingMore, setLoadingMore] = useState(false)
  
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    fetchMedia()
  }, [])

  useEffect(() => {
    if (currentPage > 1) {
      loadMoreMedia()
    }
  }, [currentPage])

  const fetchMedia = async (reset = true) => {
    try {
      if (reset) {
        setLoading(true)
        setCurrentPage(1)
      }
      
      const params = new URLSearchParams({
        page: "1",
        limit: "20",
      })

      const response = await fetch(`/api/payload/media?${params}`, {
        headers: {
          'Content-Type': 'application/json',
        }
      })
      
      if (response.ok) {
        const data: MediaResponse = await response.json()
        setMedia(data.docs)
        // setTotalPages(data.totalPages) // Not used with infinite scroll
        setTotalDocs(data.totalDocs)
        setHasMore(data.totalPages > 1)
      }
    } catch (error) {
      console.error('Failed to fetch media:', error)
    } finally {
      if (reset) setLoading(false)
    }
  }

  const loadMoreMedia = async () => {
    if (loadingMore || !hasMore) return
    
    try {
      setLoadingMore(true)
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: "20",
      })

      const response = await fetch(`/api/payload/media?${params}`, {
        headers: {
          'Content-Type': 'application/json',
        }
      })
      
      if (response.ok) {
        const data: MediaResponse = await response.json()
        setMedia(prev => [...prev, ...data.docs])
        setHasMore(currentPage < data.totalPages)
      }
    } catch (error) {
      console.error('Failed to load more media:', error)
    } finally {
      setLoadingMore(false)
    }
  }

  // Infinite scroll handler
  const handleScroll = useCallback(() => {
    if (window.innerHeight + document.documentElement.scrollTop 
        >= document.documentElement.offsetHeight - 1000) {
      if (hasMore && !loadingMore) {
        setCurrentPage(prev => prev + 1)
      }
    }
  }, [hasMore, loadingMore])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  const handleFileUpload = async (files: FileList) => {
    if (files.length === 0) return

    // Validate files
    const validFiles = Array.from(files).filter(file => {
      const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp']
      const maxSize = 5 * 1024 * 1024 // 5MB
      
      if (!validTypes.includes(file.type)) {
        alert(`${file.name}: Invalid file type. Please upload images only.`)
        return false
      }
      
      if (file.size > maxSize) {
        alert(`${file.name}: File too large. Please upload files smaller than 5MB.`)
        return false
      }
      
      return true
    })

    if (validFiles.length === 0) return

    setUploading(true)
    const newProgress: {[key: string]: number} = {}
    
    try {
      // Upload files concurrently
      const uploadPromises = validFiles.map(async (file) => {
        const fileKey = `${file.name}-${file.size}`
        newProgress[fileKey] = 0
        setUploadProgress({...newProgress})
        
        const formData = new FormData()
        formData.append('file', file)
        formData.append('alt', file.name)

        return new Promise<void>((resolve, reject) => {
          const xhr = new XMLHttpRequest()
          
          xhr.upload.onprogress = (e) => {
            if (e.lengthComputable) {
              const percentComplete = Math.round((e.loaded / e.total) * 100)
              setUploadProgress(prev => ({
                ...prev,
                [fileKey]: percentComplete
              }))
            }
          }
          
          xhr.onload = () => {
            if (xhr.status === 200 || xhr.status === 201) {
              setUploadProgress(prev => {
                const newPrev = {...prev}
                delete newPrev[fileKey]
                return newPrev
              })
              resolve()
            } else {
              reject(new Error(`Failed to upload ${file.name}`))
            }
          }
          
          xhr.onerror = () => reject(new Error(`Network error uploading ${file.name}`))
          
          xhr.open('POST', '/api/payload/media')
          xhr.send(formData)
        })
      })
      
      await Promise.allSettled(uploadPromises)
      
      // Refresh media list
      await fetchMedia(true)
      
    } catch (error) {
      console.error('Error uploading files:', error)
      alert('Failed to upload some files')
    } finally {
      setUploading(false)
      setUploadProgress({})
    }
  }

  const handleDeleteMedia = async (mediaId: string, filename: string) => {
    if (confirm(`Are you sure you want to delete "${filename}"? This action cannot be undone.`)) {
      try {
        const response = await fetch(`/api/payload/media/${mediaId}`, {
          method: 'DELETE',
        })
        
        if (response.ok) {
          fetchMedia(true)
        } else {
          alert('Failed to delete media file')
        }
      } catch (error) {
        console.error('Error deleting media:', error)
        alert('Failed to delete media file')
      }
    }
  }

  const handleBulkDelete = async () => {
    if (selectedFiles.size === 0) return
    
    if (confirm(`Delete ${selectedFiles.size} selected files? This action cannot be undone.`)) {
      try {
        for (const fileId of selectedFiles) {
          await fetch(`/api/payload/media/${fileId}`, {
            method: 'DELETE',
          })
        }
        
        setSelectedFiles(new Set())
        fetchMedia(true)
      } catch (error) {
        console.error('Error bulk deleting media:', error)
        alert('Failed to delete some files')
      }
    }
  }

  const copyToClipboard = (url: string) => {
    navigator.clipboard.writeText(url)
    // You could add a toast notification here
    alert('URL copied to clipboard!')
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  // Filter media by search term
  const filteredMedia = media.filter(file => 
    file.filename.toLowerCase().includes(searchTerm.toLowerCase()) ||
    file.alt.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center gap-4">
              <Link href="/admin">
                <Button variant="ghost" size="sm" className="gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  Back to Dashboard
                </Button>
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Media Library</h1>
                <p className="text-gray-600">Upload and manage your media files</p>
              </div>
            </div>
            <Button 
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading}
              className="gap-2"
            >
              <Upload className="h-4 w-4" />
              {uploading ? 'Uploading...' : 'Upload Files'}
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Controls */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="flex items-center gap-4 flex-1">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search media files..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-9"
                  />
                </div>
                
                <div className="text-sm text-gray-600">
                  {totalDocs} files
                </div>
              </div>

              <div className="flex items-center gap-2">
                {selectedFiles.size > 0 && (
                  <Button 
                    variant="destructive" 
                    size="sm" 
                    onClick={handleBulkDelete}
                    className="gap-2"
                  >
                    <Trash2 className="h-4 w-4" />
                    Delete Selected ({selectedFiles.size})
                  </Button>
                )}
                
                <div className="flex rounded-md border">
                  <Button
                    variant={viewMode === 'grid' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('grid')}
                    className="rounded-r-none"
                  >
                    <Grid className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('list')}
                    className="rounded-l-none"
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Upload Area */}
        <div className="mb-8">
          <div 
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors cursor-pointer ${
              dragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'
            }`}
            onClick={() => fileInputRef.current?.click()}
            onDragOver={(e) => {
              e.preventDefault()
              setDragActive(true)
            }}
            onDragLeave={(e) => {
              e.preventDefault()
              setDragActive(false)
            }}
            onDrop={(e) => {
              e.preventDefault()
              setDragActive(false)
              handleFileUpload(e.dataTransfer.files)
            }}
          >
            <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className={`mb-2 ${dragActive ? 'text-blue-600' : 'text-gray-600'}`}>
              {dragActive ? 'Release to upload files' : 'Drop files here or click to upload'}
            </p>
            <p className="text-sm text-gray-500">
              Supports: JPG, PNG, GIF, WebP up to 5MB
            </p>
            
            {/* Upload Progress */}
            {Object.keys(uploadProgress).length > 0 && (
              <div className="mt-4 space-y-2">
                {Object.entries(uploadProgress).map(([fileKey, progress]) => {
                  const fileName = fileKey.split('-')[0]
                  return (
                    <div key={fileKey} className="text-left">
                      <div className="flex justify-between text-sm">
                        <span className="truncate">{fileName}</span>
                        <span>{progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${progress}%` }}
                        ></div>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
          
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/*"
            onChange={(e) => e.target.files && handleFileUpload(e.target.files)}
            className="hidden"
          />
        </div>

        {/* Media Grid/List */}
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading media...</p>
            </div>
          </div>
        ) : filteredMedia.length === 0 ? (
          <Card className="text-center py-12">
            <CardContent>
              <ImageIcon className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No media files</h3>
              <p className="text-gray-600 mb-4">Upload your first image to get started</p>
              <Button onClick={() => fileInputRef.current?.click()}>
                Upload Files
              </Button>
            </CardContent>
          </Card>
        ) : viewMode === 'grid' ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {filteredMedia.map((file) => (
              <Card 
                key={file.id} 
                className={`cursor-pointer transition-all hover:shadow-md ${
                  selectedFiles.has(file.id) ? 'ring-2 ring-blue-500' : ''
                }`}
              >
                <CardContent className="p-0">
                  <div className="relative">
                    <LazyImage
                      src={file.sizes?.thumbnail?.url || file.url}
                      alt={file.alt}
                      className="w-full h-32 object-cover rounded-t-md"
                    />
                    
                    <div className="absolute top-2 left-2">
                      <input
                        type="checkbox"
                        checked={selectedFiles.has(file.id)}
                        onChange={(e) => {
                          const newSelected = new Set(selectedFiles)
                          if (e.target.checked) {
                            newSelected.add(file.id)
                          } else {
                            newSelected.delete(file.id)
                          }
                          setSelectedFiles(newSelected)
                        }}
                        className="rounded"
                      />
                    </div>
                    
                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="flex gap-1">
                        <Button
                          size="sm"
                          variant="secondary"
                          onClick={(e) => {
                            e.stopPropagation()
                            window.open(file.url, '_blank')
                          }}
                        >
                          <Eye className="h-3 w-3" />
                        </Button>
                        <Button
                          size="sm"
                          variant="secondary"
                          onClick={(e) => {
                            e.stopPropagation()
                            copyToClipboard(file.url)
                          }}
                        >
                          <Copy className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-3">
                    <p className="text-xs font-medium text-gray-900 truncate" title={file.filename}>
                      {file.filename}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {formatFileSize(file.filesize)}
                    </p>
                    {file.width && file.height && (
                      <p className="text-xs text-gray-500">
                        {file.width} × {file.height}
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="p-0">
              <div className="divide-y divide-gray-200">
                {filteredMedia.map((file) => (
                  <div key={file.id} className="flex items-center p-4 hover:bg-gray-50">
                    <input
                      type="checkbox"
                      checked={selectedFiles.has(file.id)}
                      onChange={(e) => {
                        const newSelected = new Set(selectedFiles)
                        if (e.target.checked) {
                          newSelected.add(file.id)
                        } else {
                          newSelected.delete(file.id)
                        }
                        setSelectedFiles(newSelected)
                      }}
                      className="rounded mr-4"
                    />
                    
                    <LazyImage
                      src={file.sizes?.thumbnail?.url || file.url}
                      alt={file.alt}
                      className="w-12 h-12 object-cover rounded mr-4"
                    />
                    
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{file.filename}</p>
                      <p className="text-sm text-gray-500">
                        {formatFileSize(file.filesize)} • 
                        {file.width && file.height && ` ${file.width}×${file.height} • `}
                        {formatDate(file.createdAt)}
                      </p>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => window.open(file.url, '_blank')}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyToClipboard(file.url)}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          const a = document.createElement('a')
                          a.href = file.url
                          a.download = file.filename
                          a.click()
                        }}
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteMedia(file.id, file.filename)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Load More / Infinite Scroll */}
        {loadingMore && (
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <span className="ml-2 text-gray-600">Loading more...</span>
          </div>
        )}
        
        {!hasMore && media.length > 0 && (
          <div className="text-center py-8 text-gray-500">
            <p>All media files loaded ({totalDocs} total)</p>
          </div>
        )}
      </div>
    </div>
  )
}