"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar, User, Tag, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: unknown;
  author: string;
  publishedDate: string;
  category: string;
  tags?: string[];
  status: string;
  featuredImage?: {
    url: string;
    alt: string;
    sizes?: {
      card?: {
        url: string;
        width: number;
        height: number;
      };
    };
  };
}

interface PostsResponse {
  docs: Post[];
  totalDocs: number;
  totalPages: number;
  page: number;
  limit: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

const categoryLabels = {
  news: { en: "News", mn: "Мэдээ", zh: "新闻" },
  projects: { en: "Projects", mn: "Төслүүд", zh: "项目" },
  "green-development": {
    en: "Green Development",
    mn: "Ногоон хөгжил",
    zh: "绿色发展",
  },
  housing: { en: "Housing", mn: "Орон сууц", zh: "住房" },
  technology: { en: "Technology", mn: "Технологи", zh: "技术" },
};

type Language = "mn" | "en" | "zh";

export default function PostsPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [language, setLanguage] = useState<Language>("mn");

  const pageTexts = {
    mn: {
      title: "Мэдээ ба мэдээлэл",
      description:
        "Налайх хотын хөгжлийн корпорацийн сүүлийн үеийн мэдээ, төслүүд болон шинэчлэлтүүд",
      allCategories: "Бүх ангилал",
      loadMore: "Цааш үзэх",
      loading: "Ачаалж байна...",
      readMore: "Унших",
      by: "Зохиогч:",
      published: "Нийтлэгдсэн:",
    },
    en: {
      title: "News & Updates",
      description:
        "Latest news, projects and updates from Nalaikh City Development Corporation",
      allCategories: "All Categories",
      loadMore: "Load More",
      loading: "Loading...",
      readMore: "Read More",
      by: "By:",
      published: "Published:",
    },
    zh: {
      title: "新闻与更新",
      description: "纳来哈市发展公司的最新新闻、项目和更新",
      allCategories: "所有类别",
      loadMore: "加载更多",
      loading: "加载中...",
      readMore: "阅读更多",
      by: "作者：",
      published: "发布时间：",
    },
  };

  const t = pageTexts[language];

  const fetchPosts = useCallback(async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: "9",
        locale: language,
      });

      if (category) {
        params.append("category", category);
      }

      const response = await fetch(`/api/posts?${params}`);
      const data: PostsResponse = await response.json();

      if (currentPage === 1) {
        setPosts(data.docs);
      } else {
        setPosts((prev) => [...prev, ...data.docs]);
      }
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
  }, [category, currentPage, language]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const handleCategoryChange = (newCategory: string) => {
    setCategory(newCategory);
    setCurrentPage(1);
    setPosts([]);
  };

  const loadMorePosts = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(
      language === "mn" ? "mn-MN" : language === "zh" ? "zh-CN" : "en-US"
    );
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="bg-gradient-to-br from-nalaikh-navy to-blue-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">{t.title}</h1>
            <p className="text-lg lg:text-xl text-blue-100">{t.description}</p>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <Select value={category} onValueChange={handleCategoryChange}>
              <SelectTrigger className="w-full sm:w-64">
                <SelectValue placeholder={t.allCategories} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">{t.allCategories}</SelectItem>
                {Object.entries(categoryLabels).map(([key, labels]) => (
                  <SelectItem key={key} value={key}>
                    {labels[language]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              value={language}
              onValueChange={(value: Language) => setLanguage(value)}
            >
              <SelectTrigger className="w-full sm:w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="mn">MN</SelectItem>
                <SelectItem value="en">EN</SelectItem>
                <SelectItem value="zh">中文</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </section>

      {/* Posts Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {loading && posts.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-lg text-gray-600">{t.loading}</div>
            </div>
          ) : (
            <>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                {posts.map((post) => (
                  <Card
                    key={post.id}
                    className="overflow-hidden hover:shadow-lg transition-shadow"
                  >
                    {post.featuredImage && (
                      <div className="relative h-48 w-full">
                        <Image
                          src={
                            post.featuredImage.sizes?.card?.url ||
                            post.featuredImage.url
                          }
                          alt={post.featuredImage.alt}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}
                    <CardHeader>
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="secondary">
                          {categoryLabels[
                            post.category as keyof typeof categoryLabels
                          ]?.[language] || post.category}
                        </Badge>
                        {post.tags && post.tags.length > 0 && (
                          <div className="flex items-center gap-1">
                            <Tag className="h-3 w-3" />
                            <span className="text-xs text-gray-500">
                              {post.tags.slice(0, 2).join(", ")}
                            </span>
                          </div>
                        )}
                      </div>
                      <CardTitle className="line-clamp-2">
                        {post.title}
                      </CardTitle>
                      <CardDescription className="line-clamp-3">
                        {post.excerpt}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                        <div className="flex items-center gap-1">
                          <User className="h-4 w-4" />
                          <span>
                            {t.by} {post.author}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          <span>{formatDate(post.publishedDate)}</span>
                        </div>
                      </div>
                      <Link href={`/posts/${post.slug}`}>
                        <Button variant="outline" className="w-full group">
                          {t.readMore}
                          <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Load More Button */}
              {currentPage < totalPages && (
                <div className="text-center">
                  <Button
                    onClick={loadMorePosts}
                    disabled={loading}
                    size="lg"
                    className="bg-nalaikh-navy hover:bg-nalaikh-navy/90"
                  >
                    {loading ? t.loading : t.loadMore}
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  );
}
