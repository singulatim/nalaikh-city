"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  Plus, 
  Edit, 
  Trash2, 
  Eye,
  ArrowLeft,
  Search,
  Filter,
  Calendar,
  User
} from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"

interface Post {
  id: string
  title: string
  slug: string
  author: string
  status: string
  category: string
  publishedDate: string
  excerpt?: string
  featuredImage?: {
    url: string
    alt: string
  }
}

interface PostsResponse {
  docs: Post[]
  totalDocs: number
  totalPages: number
  page: number
  limit: number
}

const categoryLabels = {
  news: { en: "News", mn: "Мэдээ", zh: "新闻" },
  projects: { en: "Projects", mn: "Төслүүд", zh: "项目" },
  "green-development": { en: "Green Development", mn: "Ногоон хөгжил", zh: "绿色发展" },
  housing: { en: "Housing", mn: "Орон сууц", zh: "住房" },
  technology: { en: "Technology", mn: "Технологи", zh: "技术" },
}

export default function PostsManagement() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [totalDocs, setTotalDocs] = useState(0)

  useEffect(() => {
    fetchPosts()
  }, [currentPage, statusFilter, categoryFilter])

  const fetchPosts = async () => {
    try {
      setLoading(true)
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: "10",
      })

      // Add filters
      if (statusFilter !== "all") {
        params.append("status", statusFilter)
      }
      if (categoryFilter !== "all") {
        params.append("category", categoryFilter)
      }

      const response = await fetch(`/api/payload/posts?${params}`, {
        headers: {
          'Content-Type': 'application/json',
        }
      })
      
      if (response.ok) {
        const data: PostsResponse = await response.json()
        setPosts(data.docs)
        setTotalPages(data.totalPages)
        setTotalDocs(data.totalDocs)
      }
    } catch (error) {
      console.error('Failed to fetch posts:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDeletePost = async (postId: string, title: string) => {
    if (confirm(`Are you sure you want to delete "${title}"? This action cannot be undone.`)) {
      try {
        const response = await fetch(`/api/payload/posts/${postId}`, {
          method: 'DELETE',
        })
        
        if (response.ok) {
          // Refresh posts list
          fetchPosts()
        } else {
          alert('Нийтлэл устгахад алдаа гарлаа')
        }
      } catch (error) {
        console.error('Error deleting post:', error)
        alert('Нийтлэл устгахад алдаа гарлаа')
      }
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
      case 'draft':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
      case 'archived':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getCategoryColor = (category: string) => {
    const colors = {
      news: "bg-blue-100 text-blue-800",
      projects: "bg-green-100 text-green-800",
      "green-development": "bg-emerald-100 text-emerald-800",
      housing: "bg-orange-100 text-orange-800",
      technology: "bg-purple-100 text-purple-800",
    }
    return colors[category as keyof typeof colors] || "bg-gray-100 text-gray-800"
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  // Filter posts by search term
  const filteredPosts = posts.filter(post => 
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.author.toLowerCase().includes(searchTerm.toLowerCase())
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
                  Самбар луу буцах
                </Button>
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Нийтлэлүүдийн удирдлага</h1>
                <p className="text-gray-600">Агуулга үүсгэх, засварлах, удирдах</p>
              </div>
            </div>
            <Link href="/admin/posts/create">
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Шинэ нийтлэл нэмэх
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters and Search */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-lg">Шүүлтүүр ба хайлт</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Нийтлэл хайх..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9"
                />
              </div>
              
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Төлөвөөр шүүлтүүр" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Бүх төлөв</SelectItem>
                  <SelectItem value="published">Нийтлэгдсэн</SelectItem>
                  <SelectItem value="draft">Ноорог</SelectItem>
                  <SelectItem value="archived">Архивлагдсан</SelectItem>
                </SelectContent>
              </Select>

              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Категориар шүүлтүүр" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Бүх категори</SelectItem>
                  {Object.entries(categoryLabels).map(([key, labels]) => (
                    <SelectItem key={key} value={key}>
                      {labels.mn}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Filter className="h-4 w-4" />
Нийт {totalDocs} нийтлэл
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Posts List */}
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Нийтлэлүүдийг ачаалж байна...</p>
            </div>
          </div>
        ) : filteredPosts.length === 0 ? (
          <Card className="text-center py-12">
            <CardContent>
              <div className="text-gray-500 mb-4">
                <Search className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <p className="text-lg font-medium">Нийтлэл олдсонгүй</p>
                <p>Хайлга эсвэл шүүлтүүреэ засч үзнэ үү</p>
              </div>
              <Link href="/admin/posts/create">
                <Button className="gap-2">
                  <Plus className="h-4 w-4" />
                  Анхны нийтлэл үүсгэх
                </Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {filteredPosts.map((post) => (
              <Card key={post.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4 flex-1">
                      {post.featuredImage && (
                        <img
                          src={post.featuredImage.url}
                          alt={post.featuredImage.alt}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                      )}
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge className={getStatusColor(post.status)}>
                            {post.status}
                          </Badge>
                          <Badge variant="outline" className={getCategoryColor(post.category)}>
                            {categoryLabels[post.category as keyof typeof categoryLabels]?.mn || post.category}
                          </Badge>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                          {post.title}
                        </h3>
                        {post.excerpt && (
                          <p className="text-gray-600 text-sm mb-2 line-clamp-2">
                            {post.excerpt}
                          </p>
                        )}
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <div className="flex items-center gap-1">
                            <User className="h-3 w-3" />
                            {post.author}
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {formatDate(post.publishedDate)}
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Link href={`/posts/${post.slug}`}>
                        <Button variant="ghost" size="sm" className="gap-2">
                          <Eye className="h-4 w-4" />
                          Үзэх
                        </Button>
                      </Link>
                      <Link href={`/admin/posts/${post.id}/edit`}>
                        <Button variant="ghost" size="sm" className="gap-2">
                          <Edit className="h-4 w-4" />
                          Засах
                        </Button>
                      </Link>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="gap-2 text-red-600 hover:text-red-700 hover:bg-red-50"
                        onClick={() => handleDeletePost(post.id, post.title)}
                      >
                        <Trash2 className="h-4 w-4" />
                        Устгах
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-4 mt-8">
            <Button
              variant="outline"
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
            >
              Өмнө
            </Button>
            
            <span className="text-sm text-gray-600">
              Хуудас {currentPage} / {totalPages}
            </span>

            <Button
              variant="outline"
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
            >
              Дараагийн
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}