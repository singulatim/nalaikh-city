"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
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

export default function MediaManagement() {
  const [media, setMedia] = useState<MediaFile[]>([])
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [selectedFiles, setSelectedFiles] = useState<Set<string>>(new Set())
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [totalDocs, setTotalDocs] = useState(0)
  
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    fetchMedia()
  }, [currentPage])

  const fetchMedia = async () => {
    try {
      setLoading(true)
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
        setMedia(data.docs)
        setTotalPages(data.totalPages)
        setTotalDocs(data.totalDocs)
      }
    } catch (error) {
      console.error('Failed to fetch media:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleFileUpload = async (files: FileList) => {
    if (files.length === 0) return

    setUploading(true)
    
    try {
      for (const file of Array.from(files)) {
        const formData = new FormData()
        formData.append('file', file)
        formData.append('alt', file.name)

        const response = await fetch('/api/payload/media', {
          method: 'POST',
          body: formData,
        })

        if (!response.ok) {
          console.error(`Failed to upload ${file.name}`)
        }
      }
      
      // Refresh media list
      fetchMedia()
      
    } catch (error) {
      console.error('Error uploading files:', error)
      alert('Failed to upload some files')
    } finally {
      setUploading(false)
    }
  }

  const handleDeleteMedia = async (mediaId: string, filename: string) => {
    if (confirm(`Are you sure you want to delete "${filename}"? This action cannot be undone.`)) {
      try {
        const response = await fetch(`/api/payload/media/${mediaId}`, {
          method: 'DELETE',
        })
        
        if (response.ok) {
          fetchMedia()
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
        fetchMedia()
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
            className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors cursor-pointer"
            onClick={() => fileInputRef.current?.click()}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              e.preventDefault()
              handleFileUpload(e.dataTransfer.files)
            }}
          >
            <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 mb-2">Drop files here or click to upload</p>
            <p className="text-sm text-gray-500">
              Supports: JPG, PNG, GIF, WebP up to 5MB
            </p>
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
                    <img
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
                    
                    <img
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

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-4 mt-8">
            <Button
              variant="outline"
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            
            <span className="text-sm text-gray-600">
              Page {currentPage} of {totalPages}
            </span>

            <Button
              variant="outline"
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}