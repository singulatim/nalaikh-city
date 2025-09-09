"use client"

import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Shield, ArrowLeft } from "lucide-react"

export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-red-100 rounded-lg mx-auto flex items-center justify-center mb-4">
            <Shield className="h-8 w-8 text-red-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Хандах эрхгүй
          </h1>
          <p className="text-gray-600">
            Та энэ хуудсыг үзэх эрхгүй байна
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-center text-red-600">403 - Хандах хориотой</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-gray-600">
              Энэ хэсэгт хандахын тулд зохих эрх шаардлагатай. 
              Хэрвээ танд энэ эрх байх ёстой гэж бодож байвал администратортай холбогдоно уу.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/">
                <Button variant="outline" className="w-full sm:w-auto gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  Нүүр хуудас руу буцах
                </Button>
              </Link>
              
              <Link href="/login">
                <Button className="w-full sm:w-auto">
                  Дахин нэвтрэх
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}