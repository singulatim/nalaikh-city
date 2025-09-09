"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  ArrowLeft, 
  Search, 
  Plus,
  Edit,
  Trash2,
  User,
  Mail,
  Calendar
} from "lucide-react"
import { Input } from "@/components/ui/input"

interface User {
  id: string
  email: string
  firstName?: string
  lastName?: string
  role: 'admin' | 'editor'
  createdAt: string
  updatedAt: string
  lastLoginAt?: string
}

interface UsersResponse {
  docs: User[]
  totalDocs: number
  totalPages: number
  page: number
  limit: number
}

export default function UsersManagement() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [totalDocs, setTotalDocs] = useState(0)

  useEffect(() => {
    fetchUsers()
  }, [currentPage])

  const fetchUsers = async () => {
    try {
      setLoading(true)
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: "10",
      })

      const response = await fetch(`/api/payload/users?${params}`, {
        headers: {
          'Content-Type': 'application/json',
        }
      })
      
      if (response.ok) {
        const data: UsersResponse = await response.json()
        setUsers(data.docs)
        setTotalPages(data.totalPages)
        setTotalDocs(data.totalDocs)
      }
    } catch (error) {
      console.error('Failed to fetch users:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteUser = async (userId: string, email: string) => {
    if (confirm(`Are you sure you want to delete user "${email}"? This action cannot be undone.`)) {
      try {
        const response = await fetch(`/api/payload/users/${userId}`, {
          method: 'DELETE',
        })
        
        if (response.ok) {
          fetchUsers()
        } else {
          alert('Хэрэглэгч устгахад алдаа гарлаа')
        }
      } catch (error) {
        console.error('Error deleting user:', error)
        alert('Хэрэглэгч устгахад алдаа гарлаа')
      }
    }
  }

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'admin':
        return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
      case 'editor':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400'
      default:
        return 'bg-gray-100 text-gray-800'
    }
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

  const getDisplayName = (user: User) => {
    if (user.firstName && user.lastName) {
      return `${user.firstName} ${user.lastName}`
    }
    return user.email
  }

  // Filter users by search term
  const filteredUsers = users.filter(user => 
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (user.firstName?.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (user.lastName?.toLowerCase().includes(searchTerm.toLowerCase()))
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
                <h1 className="text-2xl font-bold text-gray-900">Хэрэглэгчид удирдлага</h1>
                <p className="text-gray-600">Удирдлагын хэрэглэгчид, эрхүүд удирдах</p>
              </div>
            </div>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Хэрэглэгч уриах
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Stats */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-lg">Хэрэглэгчийн төлөв байдл</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">{totalDocs}</div>
                <div className="text-sm text-blue-800">Нийт хэрэглэгчд</div>
              </div>
              <div className="bg-red-50 p-4 rounded-lg">
                <div className="text-2xl font-bold text-red-600">
                  {users.filter(u => u.role === 'admin').length}
                </div>
                <div className="text-sm text-red-800">Удирдлагчд</div>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <div className="text-2xl font-bold text-green-600">
                  {users.filter(u => u.role === 'editor').length}
                </div>
                <div className="text-sm text-green-800">Найрулагчд</div>
              </div>
            </div>
            
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Хэрэглэгч хайх..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
          </CardContent>
        </Card>

        {/* Users List */}
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Хэрэглэгчдийг ачаалж байна...</p>
            </div>
          </div>
        ) : filteredUsers.length === 0 ? (
          <Card className="text-center py-12">
            <CardContent>
              <User className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Хэрэглэгч олдсонгүй</h3>
              <p className="text-gray-600 mb-4">Хайлгаын сонголтын олов засч эсвэл шинэ хэрэглэгч уриарай</p>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Анхны хэрэглэгч уриах
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {filteredUsers.map((user) => (
              <Card key={user.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                        <User className="h-6 w-6 text-gray-600" />
                      </div>
                      
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-lg font-semibold text-gray-900">
                            {getDisplayName(user)}
                          </h3>
                          <Badge className={getRoleBadgeColor(user.role)}>
                            {user.role}
                          </Badge>
                        </div>
                        
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <div className="flex items-center gap-1">
                            <Mail className="h-3 w-3" />
                            {user.email}
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            Бүртгүүлсэн огноо {formatDate(user.createdAt)}
                          </div>
                          {user.lastLoginAt && (
                            <div className="text-green-600">
                              Сүүлэ 14 идэвхтэй {formatDate(user.lastLoginAt)}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm" className="gap-2">
                        <Edit className="h-4 w-4" />
                        Засах
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="gap-2 text-red-600 hover:text-red-700 hover:bg-red-50"
                        onClick={() => handleDeleteUser(user.id, user.email)}
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

        {/* Info Card */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Хэрэглэгчийн үүрэг</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Badge className="bg-red-100 text-red-800">admin</Badge>
                  <span className="font-medium">Удирдлагч</span>
                </div>
                <p className="text-sm text-gray-600">
                  Хэрэглэгч удирдлага, агуулга үүсэх, системийн тохиргоо зэрэг бүх хандалтын бүрэн эрх.
                </p>
              </div>
              
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Badge className="bg-blue-100 text-blue-800">editor</Badge>
                  <span className="font-medium">Найрулагч</span>
                </div>
                <p className="text-sm text-gray-600">
                  Агуулга үүсэх, засварлах, нийтлэх чадвартай харин хэрэглэгч удирдах, системийн тохиргоо хийх эрхгүй.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}