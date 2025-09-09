"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  FileText, 
  Image as ImageIcon, 
  Users, 
  Plus, 
  ExternalLink,
  Activity,
  Database
} from "lucide-react"

interface Post {
  id: string
  title: string
  author: string
  status: string
  category: string
  publishedDate: string
}

export default function AdminDashboard() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({
    totalPosts: 0,
    publishedPosts: 0,
    draftPosts: 0
  })

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      setLoading(true)
      
      // Fetch recent posts for display (from Payload API to get all posts)
      const recentPostsResponse = await fetch('/api/payload/posts?limit=5&sort=-publishedDate')
      if (recentPostsResponse.ok) {
        const recentPostsData = await recentPostsResponse.json()
        setPosts(recentPostsData.docs || [])
      }
      
      // Fetch all posts for accurate statistics using Payload API
      const allPostsResponse = await fetch('/api/payload/posts?limit=1000') // Get all posts regardless of status
      if (allPostsResponse.ok) {
        const allPostsData = await allPostsResponse.json()
        
        // Calculate stats from all posts
        const total = allPostsData.totalDocs || 0
        const published = allPostsData.docs?.filter((p: Post) => p.status === 'published').length || 0
        const draft = allPostsData.docs?.filter((p: Post) => p.status === 'draft').length || 0
        
        setStats({
          totalPosts: total,
          publishedPosts: published,
          draftPosts: draft
        })
      }
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error)
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  return (
    <div>
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">НХХК Удирдлагын Самбар</h1>
              <p className="text-gray-600">Налайх Хотын Хөгжлийн Корпорацийн CMS</p>
            </div>
            <Link href="/">
              <Button variant="outline" className="gap-2">
                <ExternalLink className="h-4 w-4" />
                Сайт үзэх
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Нийт нийтлэл</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalPosts}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Нийтэлсэн</CardTitle>
              <Activity className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{stats.publishedPosts}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Ноорог</CardTitle>
              <FileText className="h-4 w-4 text-yellow-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">{stats.draftPosts}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">API төлөв</CardTitle>
              <Database className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">Идэвхтэй</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Posts */}
          <Card>
            <CardHeader>
              <CardTitle>Сүүлийн нийтлэлүүд</CardTitle>
              <CardDescription>Хамгийн сүүлийн агуулгын шинэчлэлтүүд</CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="text-center py-4">Ачаалж байна...</div>
              ) : posts.length > 0 ? (
                <div className="space-y-4">
                  {posts.map((post) => (
                    <div key={post.id} className="flex items-start justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex-1">
                        <h4 className="font-medium text-sm">{post.title}</h4>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge 
                            variant={post.status === 'published' ? 'default' : 'secondary'}
                            className="text-xs"
                          >
                            {post.status}
                          </Badge>
                          <span className="text-xs text-gray-500">{formatDate(post.publishedDate)}</span>
                        </div>
                        <p className="text-xs text-gray-600 mt-1">By {post.author}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <FileText className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <p>Нийтлэл олдсонгүй</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Шуурхай үйлдлүүд</CardTitle>
              <CardDescription>Нийтлэг удирдлагын ажлууд</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-3">
                <Link href="/admin/posts/create" className="block">
                  <Button className="w-full justify-start gap-3 h-auto p-4" variant="outline">
                    <Plus className="h-5 w-5" />
                    <div className="text-left">
                      <div className="font-medium">Шинэ нийтлэл нэмэх</div>
                      <div className="text-sm text-gray-600">Мэдээ эсвэл төслийн шинэчлэлт нэмэх</div>
                    </div>
                  </Button>
                </Link>
                
                <Link href="/admin/media" className="block">
                  <Button className="w-full justify-start gap-3 h-auto p-4" variant="outline">
                    <ImageIcon className="h-5 w-5" />
                    <div className="text-left">
                      <div className="font-medium">Зураг файл удирдах</div>
                      <div className="text-sm text-gray-600">Зургууд оруулах, эмхэтгэх</div>
                    </div>
                  </Button>
                </Link>
                
                <Link href="/admin/posts" className="block">
                  <Button className="w-full justify-start gap-3 h-auto p-4" variant="outline">
                    <FileText className="h-5 w-5" />
                    <div className="text-left">
                      <div className="font-medium">Нийтлэлүүд удирдах</div>
                      <div className="text-sm text-gray-600">Агуулга засварлах, эмхэтгэх</div>
                    </div>
                  </Button>
                </Link>
                
                <Link href="/admin/users" className="block">
                  <Button className="w-full justify-start gap-3 h-auto p-4" variant="outline">
                    <Users className="h-5 w-5" />
                    <div className="text-left">
                      <div className="font-medium">Хэрэглэгчид удирдах</div>
                      <div className="text-sm text-gray-600">Хэрэглэгчид, эрхүүд удирдах</div>
                    </div>
                  </Button>
                </Link>
                
                <Link href="/posts" className="block">
                  <Button className="w-full justify-start gap-3 h-auto p-4" variant="outline">
                    <ExternalLink className="h-5 w-5" />
                    <div className="text-left">
                      <div className="font-medium">Нийтэлсэн нийтлэлүүд үзэх</div>
                      <div className="text-sm text-gray-600">Вэб сайт даха агуулга үзэх</div>
                    </div>
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* API Information */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>API харилцаа</CardTitle>
            <CardDescription>Агуулга удирдахад боломжтой REST API эндпоинтүүд</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <h4 className="font-medium text-sm mb-2">Нийтлэл удирдлага</h4>
                <div className="space-y-1 text-xs text-gray-600">
                  <div><code>GET /api/posts</code> - Бүх нийтлэл</div>
                  <div><code>GET /api/posts/[slug]</code> - Нэг нийтлэл</div>
                </div>
              </div>
              
              <div className="p-4 bg-gray-50 rounded-lg">
                <h4 className="font-medium text-sm mb-2">Payload Удирдлага API</h4>
                <div className="space-y-1 text-xs text-gray-600">
                  <div><code>POST /api/payload/posts</code> - Нийтлэл үүсгэх</div>
                  <div><code>PUT /api/payload/posts/[id]</code> - Нийтлэл шинэчлэх</div>
                  <div><code>DELETE /api/payload/posts/[id]</code> - Нийтлэл устгах</div>
                </div>
              </div>
              
              <div className="p-4 bg-gray-50 rounded-lg">
                <h4 className="font-medium text-sm mb-2">Медиа файл удирдлага</h4>
                <div className="space-y-1 text-xs text-gray-600">
                  <div><code>POST /api/payload/media</code> - Медиа оруулах</div>
                  <div><code>GET /api/payload/media</code> - Медиа файлууд</div>
                </div>
              </div>
            </div>
            
            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <h4 className="font-medium text-sm text-blue-900 mb-2">Хөгжлийн тэмдэглэл</h4>
              <p className="text-xs text-blue-800">
                Энэ удирдлагын самбар нь Payload CMS-ийн үндсэн удирдлагын хөлрөг Next.js 15-д оптимажлагдаж байх хугацаанд таны агуулгыг удирдах боломжтой харилцаа олгодог. 
                Бүх API эндпоинт нь бүрэн бүтэн ажиллах чадвартай бөгөөд гадны хэрэгслүүд эсвэл сонгодог удирдлагын харилцаагаар агуулга удирдахад ашиглаж болно.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}