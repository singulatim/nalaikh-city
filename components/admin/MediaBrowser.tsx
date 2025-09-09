"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Search, X, Check } from "lucide-react"

interface MediaFile {
  id: string
  filename: string
  alt: string
  url: string
  filesize: number
  width?: number
  height?: number
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

interface MediaBrowserProps {
  isOpen: boolean
  onClose: () => void
  onSelect: (media: MediaFile) => void
  selectedId?: string
}

export default function MediaBrowser({ 
  isOpen, 
  onClose, 
  onSelect, 
  selectedId 
}: MediaBrowserProps) {
  const [media, setMedia] = useState<MediaFile[]>([])
  const [loading, setLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)

  useEffect(() => {
    if (isOpen) {
      fetchMedia(true)
    }
  }, [isOpen])

  useEffect(() => {
    if (currentPage > 1) {
      loadMoreMedia()
    }
  }, [currentPage])

  const fetchMedia = async (reset = false) => {
    try {
      setLoading(true)
      if (reset) setCurrentPage(1)
      
      const params = new URLSearchParams({
        page: "1",
        limit: "20",
      })

      const response = await fetch(`/api/payload/media?${params}`)
      
      if (response.ok) {
        const data: MediaResponse = await response.json()
        setMedia(data.docs)
        setHasMore(data.totalPages > 1)
      }
    } catch (error) {
      console.error('Failed to fetch media:', error)
    } finally {
      setLoading(false)
    }
  }

  const loadMoreMedia = async () => {
    try {
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: "20",
      })

      const response = await fetch(`/api/payload/media?${params}`)
      
      if (response.ok) {
        const data: MediaResponse = await response.json()
        setMedia(prev => [...prev, ...data.docs])
        setHasMore(currentPage < data.totalPages)
      }
    } catch (error) {
      console.error('Failed to load more media:', error)
    }
  }

  const handleLoadMore = () => {
    if (hasMore && !loading) {
      setCurrentPage(prev => prev + 1)
    }
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 KB'
    const k = 1024
    const sizes = ['B', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i]
  }

  // Filter media by search term
  const filteredMedia = media.filter(file => 
    file.filename.toLowerCase().includes(searchTerm.toLowerCase()) ||
    file.alt.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-4xl max-h-[80vh] flex flex-col">
        <CardContent className="p-6 flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">Медиа сан</h2>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Search */}
          <div className="relative mb-6">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Медиа файл хайх..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div>

          {/* Loading State */}
          {loading && media.length === 0 ? (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                <p className="text-gray-600">Медиа файлууд ачаалж байна...</p>
              </div>
            </div>
          ) : (
            <>
              {/* Media Grid */}
              <div className="flex-1 overflow-auto">
                {filteredMedia.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <p>Медиа файл олдсонгүй</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {filteredMedia.map((file) => (
                      <div
                        key={file.id}
                        className={`
                          relative cursor-pointer rounded-lg overflow-hidden border-2 transition-all
                          ${selectedId === file.id 
                            ? 'border-blue-500 ring-2 ring-blue-200' 
                            : 'border-transparent hover:border-gray-300'
                          }
                        `}
                        onClick={() => onSelect(file)}
                      >
                        <div className="aspect-square relative">
                          <img
                            src={file.sizes?.thumbnail?.url || file.url}
                            alt={file.alt}
                            className="w-full h-full object-cover"
                          />
                          
                          {selectedId === file.id && (
                            <div className="absolute inset-0 bg-blue-500/20 flex items-center justify-center">
                              <div className="bg-blue-500 text-white rounded-full p-1">
                                <Check className="h-4 w-4" />
                              </div>
                            </div>
                          )}
                        </div>
                        
                        <div className="p-2 bg-white">
                          <p className="text-xs font-medium truncate" title={file.filename}>
                            {file.filename}
                          </p>
                          <p className="text-xs text-gray-500">
                            {formatFileSize(file.filesize)}
                          </p>
                          {file.width && file.height && (
                            <p className="text-xs text-gray-500">
                              {file.width} × {file.height}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Load More Button */}
              {hasMore && (
                <div className="mt-6 text-center">
                  <Button 
                    variant="outline" 
                    onClick={handleLoadMore}
                    disabled={loading}
                  >
                    {loading ? 'Ачаалж байна...' : 'Илүү ачаалах'}
                  </Button>
                </div>
              )}
            </>
          )}

          {/* Footer */}
          <div className="mt-6 pt-4 border-t flex justify-end gap-2">
            <Button variant="outline" onClick={onClose}>
              Болих
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}