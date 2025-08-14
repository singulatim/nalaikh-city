"use client"

import { useState, useEffect, useCallback } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, User, Tag, ArrowLeft, Share2 } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useParams } from "next/navigation"

interface Post {
  id: string
  title: string
  slug: string
  excerpt: string
  content: unknown
  author: string
  publishedDate: string
  category: string
  tags?: string[]
  status: string
  featuredImage?: {
    url: string
    alt: string
  }
  seo?: {
    title?: string
    description?: string
  }
}

type Language = 'mn' | 'en' | 'zh'

const categoryLabels = {
  news: { en: 'News', mn: 'Мэдээ', zh: '新闻' },
  projects: { en: 'Projects', mn: 'Төслүүд', zh: '项目' },
  'green-development': { en: 'Green Development', mn: 'Ногоон хөгжил', zh: '绿色发展' },
  housing: { en: 'Housing', mn: 'Орон сууц', zh: '住房' },
  technology: { en: 'Technology', mn: 'Технологи', zh: '技术' },
}

export default function PostPage() {
  const params = useParams()
  const slug = params.slug as string
  const [post, setPost] = useState<Post | null>(null)
  const [loading, setLoading] = useState(true)
  const [language] = useState<Language>('mn')

  const pageTexts = {
    mn: {
      backToPosts: 'Мэдээ рүү буцах',
      by: 'Зохиогч:',
      published: 'Нийтлэгдсэн:',
      share: 'Хуваалцах',
      notFound: 'Мэдээ олдсонгүй',
      loading: 'Ачаалж байна...',
    },
    en: {
      backToPosts: 'Back to Posts',
      by: 'By:',
      published: 'Published:',
      share: 'Share',
      notFound: 'Post not found',
      loading: 'Loading...',
    },
    zh: {
      backToPosts: '返回文章',
      by: '作者：',
      published: '发布时间：',
      share: '分享',
      notFound: '未找到文章',
      loading: '加载中...',
    },
  }

  const t = pageTexts[language]

  const fetchPost = useCallback(async () => {
    try {
      setLoading(true)
      const response = await fetch(`/api/posts/${slug}?locale=${language}`)
      if (response.ok) {
        const data: Post = await response.json()
        setPost(data)
      } else {
        setPost(null)
      }
    } catch (error) {
      console.error('Error fetching post:', error)
      setPost(null)
    } finally {
      setLoading(false)
    }
  }, [slug, language])

  useEffect(() => {
    if (slug) {
      fetchPost()
    }
  }, [slug, fetchPost])


  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(language === 'mn' ? 'mn-MN' : language === 'zh' ? 'zh-CN' : 'en-US')
  }

  const sharePost = () => {
    if (navigator.share && post) {
      navigator.share({
        title: post.title,
        text: post.excerpt,
        url: window.location.href,
      })
    } else {
      navigator.clipboard.writeText(window.location.href)
    }
  }

  // Simple function to render rich text content
  const renderContent = (content: unknown) => {
    if (!content) return null
    
    // This is a basic implementation. In production, you'd want a more robust rich text renderer
    if (typeof content === 'string') {
      return <div dangerouslySetInnerHTML={{ __html: content }} />
    }
    
    // For Lexical editor content, you'll need to implement proper rendering
    // For now, we'll just show a basic structure
    return (
      <div className="prose prose-lg max-w-none">
        <p>Content rendering for Lexical editor needs to be implemented based on your content structure.</p>
        <pre className="bg-gray-100 p-4 rounded overflow-auto">
          {JSON.stringify(content, null, 2)}
        </pre>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-lg text-gray-600">{t.loading}</div>
      </div>
    )
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">{t.notFound}</h1>
          <Link href="/posts">
            <Button variant="outline">
              <ArrowLeft className="mr-2 h-4 w-4" />
              {t.backToPosts}
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Back Navigation */}
      <div className="border-b bg-white sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <Link href="/posts">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              {t.backToPosts}
            </Button>
          </Link>
        </div>
      </div>

      {/* Featured Image */}
      {post.featuredImage && (
        <div className="relative h-64 md:h-96 w-full">
          <Image
            src={post.featuredImage.url}
            alt={post.featuredImage.alt}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/20" />
        </div>
      )}

      {/* Article Content */}
      <article className="py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <header className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Badge variant="secondary">
                {categoryLabels[post.category as keyof typeof categoryLabels]?.[language] || post.category}
              </Badge>
              {post.tags && post.tags.length > 0 && (
                <div className="flex items-center gap-2">
                  {post.tags.map((tag, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      <Tag className="h-3 w-3 mr-1" />
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}
            </div>
            
            <h1 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              {post.title}
            </h1>
            
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <User className="h-4 w-4" />
                  <span>{t.by} {post.author}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>{t.published} {formatDate(post.publishedDate)}</span>
                </div>
              </div>
              
              <Button 
                onClick={sharePost}
                variant="outline"
                size="sm"
                className="self-start sm:self-auto"
              >
                <Share2 className="h-4 w-4 mr-2" />
                {t.share}
              </Button>
            </div>
            
            <div className="text-lg lg:text-xl text-gray-600 leading-relaxed">
              {post.excerpt}
            </div>
          </header>

          <div className="prose prose-lg max-w-none">
            {renderContent(post.content)}
          </div>
        </div>
      </article>
    </div>
  )
}