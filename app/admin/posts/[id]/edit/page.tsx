"use client"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ArrowLeft, Save, Eye, X, Plus, Loader2 } from "lucide-react"
import ImageUpload from "@/components/admin/ImageUpload"
import MediaBrowser from "@/components/admin/MediaBrowser"

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

interface EditPostData {
  id: string
  title: string
  slug: string
  author: string
  excerpt: string
  content: string
  category: string
  status: "draft" | "published" | "archived"
  tags: string[]
  publishedDate: string
  featuredImage?: MediaFile
  seo: {
    title: string
    description: string
  }
}

const categoryOptions = [
  { value: "news", label: "Мэдээ" },
  { value: "projects", label: "Төслүүд" },
  { value: "green-development", label: "Ногоон хөгжил" },
  { value: "housing", label: "Орон сууц" },
  { value: "technology", label: "Технологи" },
]

// Helper function to extract plain text from Lexical rich text format
const extractTextFromLexical = (content: any): string => {
  if (typeof content === "string") {
    return content
  }

  if (!content || !content.root || !content.root.children) {
    return ""
  }

  const extractTextFromNode = (node: any): string => {
    if (node.type === "text") {
      return node.text || ""
    }

    if (node.children && Array.isArray(node.children)) {
      return node.children.map(extractTextFromNode).join("")
    }

    return ""
  }

  return content.root.children.map(extractTextFromNode).join("\n")
}

export default function EditPost() {
  const router = useRouter()
  const params = useParams()
  const postId = params.id as string

  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [currentTag, setCurrentTag] = useState("")
  const [formData, setFormData] = useState<EditPostData | null>(null)
  const [showMediaBrowser, setShowMediaBrowser] = useState(false)

  useEffect(() => {
    if (postId) {
      fetchPost()
    }
  }, [postId])

  const fetchPost = async () => {
    try {
      const response = await fetch(`/api/payload/posts/${postId}`)
      if (response.ok) {
        const post = await response.json()
        setFormData({
          id: post.id,
          title: post.title || "",
          slug: post.slug || "",
          author: post.author || "NCDC Admin",
          excerpt: post.excerpt || "",
          content: extractTextFromLexical(post.content),
          category: post.category || "news",
          status: post.status || "draft",
          tags: Array.isArray(post.tags) ? post.tags : [],
          publishedDate: post.publishedDate || "",
          featuredImage: post.featuredImage || undefined,
          seo: {
            title: post.seo?.title || "",
            description: post.seo?.description || "",
          },
        })
      } else {
        router.push("/admin/posts")
      }
    } catch (error) {
      console.error("Error fetching post:", error)
      router.push("/admin/posts")
    } finally {
      setLoading(false)
    }
  }

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim()
  }

  const handleTitleChange = (title: string) => {
    if (!formData) return

    setFormData((prev) => ({
      ...prev!,
      title,
      slug: generateSlug(title),
      seo: {
        ...prev!.seo,
        title: title,
      },
    }))
  }

  const addTag = () => {
    if (!formData) return

    if (currentTag.trim() && !formData.tags.includes(currentTag.trim())) {
      setFormData((prev) => ({
        ...prev!,
        tags: [...prev!.tags, currentTag.trim()],
      }))
      setCurrentTag("")
    }
  }

  const removeTag = (tagToRemove: string) => {
    if (!formData) return

    setFormData((prev) => ({
      ...prev!,
      tags: prev!.tags.filter((tag) => tag !== tagToRemove),
    }))
  }

  const handleSubmit = async (e: React.FormEvent, publishNow = false) => {
    e.preventDefault()

    if (
      !formData ||
      !formData.title.trim() ||
      !formData.excerpt.trim() ||
      !formData.content.trim()
    ) {
      alert("Шаардлагатай талбаруудыг бөглөнө үү (Гарчиг, Товчлол, Агуулга)")
      return
    }

    setSaving(true)

    try {
      // Convert plain text content to Lexical rich text format
      const lexicalContent = {
        root: {
          type: "root",
          format: "",
          indent: 0,
          version: 1,
          children: [
            {
              type: "paragraph",
              format: "",
              indent: 0,
              version: 1,
              children: [
                {
                  type: "text",
                  format: 0,
                  style: "",
                  mode: "normal",
                  text: formData.content,
                  version: 1,
                },
              ],
              direction: "ltr",
            },
          ],
          direction: "ltr",
        },
      }

      const updateData = {
        ...formData,
        content: lexicalContent,
        status: publishNow ? "published" : formData.status,
        publishedDate:
          publishNow && formData.status === "draft"
            ? new Date().toISOString()
            : formData.publishedDate,
        featuredImage: formData.featuredImage?.id || undefined,
      }

      const response = await fetch(`/api/payload/posts/${postId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateData),
      })

      if (response.ok) {
        router.push("/admin/posts")
      } else {
        const error = await response.text()
        alert(`Нийтлэл шинэчлэхэд алдаа гарлаа: ${error}`)
      }
    } catch (error) {
      console.error("Error updating post:", error)
      alert("Нийтлэл шинэчлэхэд алдаа гарлаа. Дахин оролдоно уу.")
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Нийтлэл ачаалж байна...</p>
        </div>
      </div>
    )
  }

  if (!formData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Нийтлэл олдсонгүй</p>
          <Link href="/admin/posts">
            <Button>Нийтлэл рүү буцах</Button>
          </Link>
        </div>
      </div>
    )
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
                  Нийтлэл рүү буцах
                </Button>
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Нийтлэл засах
                </h1>
                <p className="text-gray-600">Агуулгаа шинэчлэх</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                onClick={(e) => handleSubmit(e, false)}
                disabled={saving}
                className="gap-2"
              >
                {saving ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Save className="h-4 w-4" />
                )}
                Өөрчлөлт хадгалах
              </Button>

              {formData.status !== "published" && (
                <Button
                  onClick={(e) => handleSubmit(e, true)}
                  disabled={saving}
                  className="gap-2"
                >
                  <Eye className="h-4 w-4" />
                  Одоо нийтлэх
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <form onSubmit={(e) => handleSubmit(e, false)} className="space-y-8">
          {/* Status Badge */}
          <div className="flex items-center justify-between p-4 px-6 bg-blue-50 rounded-lg border border-blue-200">
            <div className="flex items-center gap-3">
              <div
                className={`w-3 h-3 rounded-full ${
                  formData.status === "published"
                    ? "bg-green-500"
                    : formData.status === "draft"
                      ? "bg-yellow-500"
                      : "bg-gray-500"
                }`}
              />
              <span className="font-medium text-blue-900">
                Төлөв:{" "}
                <span className="capitalize">
                  {formData.status === "published"
                    ? "Нийтлэгдсэн"
                    : formData.status === "draft"
                      ? "Ноорог"
                      : "Архивлагдсан"}
                </span>
              </span>
              {formData.publishedDate && (
                <span className="text-sm text-blue-700">
                  Нийтлэгдсэн:{" "}
                  {new Date(formData.publishedDate).toLocaleDateString()}
                </span>
              )}
            </div>

            <Select
              value={formData.status}
              onValueChange={(value: "draft" | "published" | "archived") =>
                setFormData((prev) => ({ ...prev!, status: value }))
              }
            >
              <SelectTrigger className="w-36">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="draft">Ноорог</SelectItem>
                <SelectItem value="published">Нийтлэгдсэн</SelectItem>
                <SelectItem value="archived">Архивлагдсан</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle>Үндсэн мэдээлэл</CardTitle>
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
                    placeholder="Нийтлэлийн гарчиг оруулах..."
                    className="mt-1"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="slug" className="text-sm font-medium">
                    URL хаяг
                  </Label>
                  <Input
                    id="slug"
                    value={formData.slug}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev!,
                        slug: e.target.value,
                      }))
                    }
                    placeholder="url-найрсаг-хаяг"
                    className="mt-1"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    URL: /posts/{formData.slug}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="author" className="text-sm font-medium">
                      Зохиогч
                    </Label>
                    <Input
                      id="author"
                      value={formData.author}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev!,
                          author: e.target.value,
                        }))
                      }
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="category" className="text-sm font-medium">
                      Категори *
                    </Label>
                    <Select
                      value={formData.category}
                      onValueChange={(value) =>
                        setFormData((prev) => ({ ...prev!, category: value }))
                      }
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Категори сонгох" />
                      </SelectTrigger>
                      <SelectContent>
                        {categoryOptions.map((option) => (
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
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev!,
                        excerpt: e.target.value,
                      }))
                    }
                    placeholder="Нийтлэлийн товч тайлбар..."
                    className="mt-1"
                    rows={3}
                    required
                  />
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
                  Нийтлэлийн агуулга
                </Label>
                <Textarea
                  id="content"
                  value={formData.content}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev!,
                      content: e.target.value,
                    }))
                  }
                  placeholder="Нийтлэлийн агуулгаа энд бичнэ үү..."
                  className="mt-1 min-h-[300px]"
                />
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
                    onKeyDown={(e) =>
                      e.key === "Enter" && (e.preventDefault(), addTag())
                    }
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
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev!,
                      seo: { ...prev!.seo, title: e.target.value },
                    }))
                  }
                  placeholder="Хайлтын системд зориулсан SEO гарчиг..."
                  className="mt-1"
                />
              </div>

              <div>
                <Label
                  htmlFor="seo-description"
                  className="text-sm font-medium"
                >
                  Мета тайлбар
                </Label>
                <Textarea
                  id="seo-description"
                  value={formData.seo.description}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev!,
                      seo: { ...prev!.seo, description: e.target.value },
                    }))
                  }
                  placeholder="Хайлтын системд зориулсан товч тайлбар..."
                  className="mt-1"
                  rows={2}
                />
              </div>
            </CardContent>
          </Card>

          {/* Featured Image */}
          <Card>
            <CardHeader>
              <CardTitle>Онцлох зураг</CardTitle>
            </CardHeader>
            <CardContent>
              <ImageUpload
                value={formData.featuredImage}
                onChange={(media) => setFormData(prev => prev ? ({ ...prev, featuredImage: media }) : null)}
                onBrowse={() => setShowMediaBrowser(true)}
                placeholder="Онцлох зураг оруулах эсвэл сонгох"
                disabled={saving}
              />
            </CardContent>
          </Card>
        </form>

        {/* Media Browser Modal */}
        <MediaBrowser
          isOpen={showMediaBrowser}
          onClose={() => setShowMediaBrowser(false)}
          onSelect={(media) => {
            setFormData(prev => prev ? ({ ...prev, featuredImage: media }) : null)
            setShowMediaBrowser(false)
          }}
          selectedId={formData?.featuredImage?.id}
        />
      </div>
    </div>
  )
}
