"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { 
  ArrowLeft, 
  Save, 
  Eye, 
  Upload,
  X,
  Plus
} from "lucide-react"

interface CreatePostData {
  title: string
  slug: string
  author: string
  excerpt: string
  content: string
  category: string
  status: 'draft' | 'published' | 'archived'
  tags: string[]
  featuredImage?: string
  seo: {
    title: string
    description: string
  }
}

const categoryOptions = [
  { value: 'news', label: 'Мэдээ' },
  { value: 'projects', label: 'Төслүүд' },
  { value: 'green-development', label: 'Ногоон хөгжил' },
  { value: 'housing', label: 'Орон сууц' },
  { value: 'technology', label: 'Технологи' },
]

export default function CreatePost() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [currentTag, setCurrentTag] = useState("")
  
  const [formData, setFormData] = useState<CreatePostData>({
    title: '',
    slug: '',
    author: 'NCDC Admin',
    excerpt: '',
    content: '',
    category: 'news',
    status: 'draft',
    tags: [],
    seo: {
      title: '',
      description: ''
    }
  })

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim()
  }

  const handleTitleChange = (title: string) => {
    setFormData(prev => ({
      ...prev,
      title,
      slug: generateSlug(title),
      seo: {
        ...prev.seo,
        title: title
      }
    }))
  }

  const addTag = () => {
    if (currentTag.trim() && !formData.tags.includes(currentTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, currentTag.trim()]
      }))
      setCurrentTag("")
    }
  }

  const removeTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }))
  }

  const handleSubmit = async (e: React.FormEvent, isDraft = true) => {
    e.preventDefault()
    
    if (!formData.title.trim() || !formData.excerpt.trim() || !formData.content.trim()) {
      alert('Шаардлагатай талбаруудыг бөглөнө үү (Гарчиг, Товчлол, Агуулга)')
      return
    }

    setLoading(true)
    
    try {
      // Convert plain text content to Lexical rich text format
      const lexicalContent = {
        root: {
          type: 'root',
          format: '',
          indent: 0,
          version: 1,
          children: [
            {
              type: 'paragraph',
              format: '',
              indent: 0,
              version: 1,
              children: [
                {
                  type: 'text',
                  format: 0,
                  style: '',
                  mode: 'normal',
                  text: formData.content,
                  version: 1
                }
              ],
              direction: 'ltr'
            }
          ],
          direction: 'ltr'
        }
      }

      const postData = {
        ...formData,
        content: lexicalContent,
        status: isDraft ? 'draft' : 'published',
        publishedDate: new Date().toISOString(),
      }

      const response = await fetch('/api/payload/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
      })

      if (response.ok) {
        const result = await response.json()
        router.push(`/admin/posts`)
      } else {
        const error = await response.text()
        alert(`Нийтлэл үүсгэхэд алдаа гарлаа: ${error}`)
      }
    } catch (error) {
      console.error('Error creating post:', error)
      alert('Нийтлэл үүсгэхэд алдаа гарлаа. Дахин оролдоно уу.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center gap-4">
              <Link href="/admin/posts">
                <Button variant="ghost" size="sm" className="gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  Нийтлэлүүд луу буцах
                </Button>
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Шинэ нийтлэл үүсгэх</h1>
                <p className="text-gray-600">Вэб сайтдаа шинэ агуулга нэмэх</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Button 
                variant="outline" 
                onClick={(e) => handleSubmit(e, true)}
                disabled={loading}
                className="gap-2"
              >
                <Save className="h-4 w-4" />
                Ноорог болгон хадгалах
              </Button>
              <Button 
                onClick={(e) => handleSubmit(e, false)}
                disabled={loading}
                className="gap-2"
              >
                <Eye className="h-4 w-4" />
                Одоо нийтлэх
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <form onSubmit={(e) => handleSubmit(e, true)} className="space-y-8">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle>Бундсан мэдээлэл</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 gap-6">
                <div>
                  <Label htmlFor="title" className="text-sm font-medium">
                    Гарчиг *
                  </Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => handleTitleChange(e.target.value)}
                    placeholder="Нийтлэлийн гарчиг оруулна уу..."
                    className="mt-1"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="slug" className="text-sm font-medium">
                    URL слуг
                  </Label>
                  <Input
                    id="slug"
                    value={formData.slug}
                    onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                    placeholder="url-хэрэглэх-слуг"
                    className="mt-1"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    URL: /posts/{formData.slug}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="author" className="text-sm font-medium">
                      Зохиологч
                    </Label>
                    <Input
                      id="author"
                      value={formData.author}
                      onChange={(e) => setFormData(prev => ({ ...prev, author: e.target.value }))}
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="category" className="text-sm font-medium">
                      Категори *
                    </Label>
                    <Select
                      value={formData.category}
                      onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Категори сонгох" />
                      </SelectTrigger>
                      <SelectContent>
                        {categoryOptions.map(option => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="excerpt" className="text-sm font-medium">
                    Товчлол *
                  </Label>
                  <Textarea
                    id="excerpt"
                    value={formData.excerpt}
                    onChange={(e) => setFormData(prev => ({ ...prev, excerpt: e.target.value }))}
                    placeholder="Нийтлэлийн товч тодорхойлолт..."
                    className="mt-1"
                    rows={3}
                    required
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Энэ нь нийтлэлийн жагсаалт болон хайлтын үр дүнгэ харагдана
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Content */}
          <Card>
            <CardHeader>
              <CardTitle>Агуулга</CardTitle>
            </CardHeader>
            <CardContent>
              <div>
                <Label htmlFor="content" className="text-sm font-medium">
                  Нийтлэлийн агуулга *
                </Label>
                <Textarea
                  id="content"
                  value={formData.content}
                  onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                  placeholder="Нийтлэлийн агуулгыг энд бичнэ үү..."
                  className="mt-1 min-h-[300px]"
                  required
                />
                <p className="text-xs text-gray-500 mt-1">
                  Формат хийхэд HTML томьёолол дэмждэг
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Tags */}
          <Card>
            <CardHeader>
              <CardTitle>Шошго</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex gap-2">
                  <Input
                    value={currentTag}
                    onChange={(e) => setCurrentTag(e.target.value)}
                    placeholder="Шошго нэмэх..."
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                    className="flex-1"
                  />
                  <Button 
                    type="button"
                    onClick={addTag}
                    variant="outline"
                    size="sm"
                    className="gap-2"
                  >
                    <Plus className="h-4 w-4" />
                    Нэмэх
                  </Button>
                </div>
                
                {formData.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {formData.tags.map((tag, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-1 bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                      >
                        {tag}
                        <button
                          type="button"
                          onClick={() => removeTag(tag)}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* SEO */}
          <Card>
            <CardHeader>
              <CardTitle>SEO тохиргоо</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="seo-title" className="text-sm font-medium">
                  Мета гарчиг
                </Label>
                <Input
                  id="seo-title"
                  value={formData.seo.title}
                  onChange={(e) => setFormData(prev => ({ 
                    ...prev, 
                    seo: { ...prev.seo, title: e.target.value } 
                  }))}
                  placeholder="Хайлтын систэмээр зорилсон SEO гарчиг..."
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="seo-description" className="text-sm font-medium">
                  Мета тодорхойлолт
                </Label>
                <Textarea
                  id="seo-description"
                  value={formData.seo.description}
                  onChange={(e) => setFormData(prev => ({ 
                    ...prev, 
                    seo: { ...prev.seo, description: e.target.value } 
                  }))}
                  placeholder="Хайлтын систэмээр зорилсон товч тодорхойлолт..."
                  className="mt-1"
                  rows={2}
                />
              </div>
            </CardContent>
          </Card>

          {/* Featured Image */}
          <Card>
            <CardHeader>
              <CardTitle>Гол зураг</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 mb-2">Гол зургийг оруулах</p>
                <p className="text-sm text-gray-500">
                  Зургийг чирэж оруулах эсвэл дараж сонгоно уу
                </p>
                <Button type="button" variant="outline" className="mt-4">
                  Файл сонгох
                </Button>
              </div>
            </CardContent>
          </Card>
        </form>
      </div>
    </div>
  )
}