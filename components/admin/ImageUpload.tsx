"use client"

import { useState, useRef, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Upload, X, Eye, Image as ImageIcon, Loader2 } from "lucide-react"

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

interface ImageUploadProps {
  value?: MediaFile
  onChange: (media: MediaFile | undefined) => void
  onBrowse?: () => void
  className?: string
  disabled?: boolean
  placeholder?: string
}

export default function ImageUpload({
  value,
  onChange,
  onBrowse,
  className = "",
  disabled = false,
  placeholder = "Зураг оруулах эсвэл сонгох"
}: ImageUploadProps) {
  const [uploading, setUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [dragActive, setDragActive] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const validateFile = (file: File): string | null => {
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp']
    const maxSize = 5 * 1024 * 1024 // 5MB

    if (!validTypes.includes(file.type)) {
      return 'Зөвхөн зураг файл дэмждэг (JPG, PNG, GIF, WebP)'
    }

    if (file.size > maxSize) {
      return 'Файлын хэмжээ 5MB-аас бага байх ёстой'
    }

    return null
  }

  const uploadFile = async (file: File): Promise<MediaFile | null> => {
    const validationError = validateFile(file)
    if (validationError) {
      alert(validationError)
      return null
    }

    setUploading(true)
    setUploadProgress(0)

    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('alt', file.name)

      const response = await fetch('/api/payload/media', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        const errorText = await response.text()
        let errorMessage = 'Upload failed'
        try {
          const errorData = JSON.parse(errorText)
          errorMessage = errorData.message || errorData.errors?.[0]?.message || errorMessage
        } catch {
          // Use default error message
        }
        throw new Error(errorMessage)
      }

      const result = await response.json()
      return result.doc || result

    } catch (error) {
      console.error('Upload error:', error)
      throw error
    } finally {
      setUploading(false)
      setUploadProgress(0)
    }
  }

  const handleFileSelect = async (files: FileList | null) => {
    if (!files || files.length === 0) return

    const file = files[0]
    const uploadedMedia = await uploadFile(file)
    
    if (uploadedMedia) {
      onChange(uploadedMedia)
    }
  }

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setDragActive(false)
    
    if (disabled || uploading) return
    
    const files = e.dataTransfer.files
    handleFileSelect(files)
  }, [disabled, uploading])

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    if (!disabled && !uploading) {
      setDragActive(true)
    }
  }, [disabled, uploading])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setDragActive(false)
  }, [])

  const removeImage = () => {
    onChange(undefined)
  }

  const openFilePicker = () => {
    if (!disabled && !uploading) {
      fileInputRef.current?.click()
    }
  }

  if (value && !uploading) {
    return (
      <Card className={className}>
        <CardContent className="p-4">
          <div className="space-y-4">
            <div className="relative">
              <img
                src={value.sizes?.card?.url || value.url}
                alt={value.alt}
                className="w-full max-w-md h-48 object-cover rounded-lg"
              />
              
              <div className="absolute top-2 right-2 flex gap-2">
                <Button
                  type="button"
                  size="sm"
                  variant="secondary"
                  onClick={() => window.open(value.url, '_blank')}
                  className="bg-white/90 hover:bg-white"
                >
                  <Eye className="h-4 w-4" />
                </Button>
                
                <Button
                  type="button"
                  size="sm"
                  variant="destructive"
                  onClick={removeImage}
                  disabled={disabled}
                  className="bg-red-500/90 hover:bg-red-600"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <div className="text-sm text-gray-600">
              <p className="font-medium">{value.filename}</p>
              <p>{Math.round(value.filesize / 1024)} KB</p>
              {value.width && value.height && (
                <p>{value.width} × {value.height}</p>
              )}
            </div>

            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={openFilePicker}
                disabled={disabled}
                className="flex-1"
              >
                <Upload className="h-4 w-4 mr-2" />
                Өөр зураг сонгох
              </Button>
              
              {onBrowse && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={onBrowse}
                  disabled={disabled}
                  className="flex-1"
                >
                  <ImageIcon className="h-4 w-4 mr-2" />
                  Медиа санаас сонгох
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className={className}>
      <div
        className={`
          border-2 border-dashed rounded-lg p-6 text-center transition-colors cursor-pointer
          ${dragActive 
            ? 'border-blue-500 bg-blue-50' 
            : 'border-gray-300 hover:border-gray-400'
          }
          ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
        `}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={openFilePicker}
      >
        {uploading ? (
          <div className="space-y-4">
            <Loader2 className="h-12 w-12 text-blue-600 mx-auto animate-spin" />
            <div className="space-y-2">
              <p className="text-blue-600">Файл оруулж байна...</p>
              <div className="w-full bg-gray-200 rounded-full h-2 max-w-xs mx-auto">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                ></div>
              </div>
              <p className="text-sm text-gray-500">{uploadProgress}%</p>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <Upload className={`h-12 w-12 mx-auto ${dragActive ? 'text-blue-500' : 'text-gray-400'}`} />
            <div>
              <p className={`mb-2 ${dragActive ? 'text-blue-600' : 'text-gray-600'}`}>
                {dragActive ? 'Зургуудыг энд тавина уу' : placeholder}
              </p>
              <p className="text-sm text-gray-500">
                JPG, PNG, GIF, WebP форматыг дэмждэг (5MB хүртэл)
              </p>
            </div>
            
            <div className="flex gap-2 justify-center">
              <Button 
                type="button" 
                variant="outline" 
                disabled={disabled}
                onClick={(e) => e.stopPropagation()}
              >
                Файл сонгох
              </Button>
              
              {onBrowse && (
                <Button 
                  type="button" 
                  variant="outline" 
                  disabled={disabled}
                  onClick={(e) => {
                    e.stopPropagation()
                    onBrowse()
                  }}
                >
                  Медиа санаас сонгох
                </Button>
              )}
            </div>
          </div>
        )}
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={(e) => handleFileSelect(e.target.files)}
        className="hidden"
        disabled={disabled}
      />
    </div>
  )
}