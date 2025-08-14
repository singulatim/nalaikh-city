'use client'

import Link from 'next/link'

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto py-8">
        <div className="bg-white rounded-lg shadow p-6">
          <h1 className="text-2xl font-bold mb-4">NCDC Admin Panel</h1>
          <p className="text-gray-600 mb-6">
            Welcome to the Nalaikh City Development Corporation content management system.
          </p>
          <div className="space-y-4">
            <p className="text-sm text-gray-500">
              <strong>Note:</strong> The full admin panel integration is in progress. 
              For now, you can access the API routes directly:
            </p>
            <ul className="text-sm text-gray-600 space-y-2">
              <li>• Posts API: <code className="bg-gray-100 px-2 py-1 rounded">/api/posts</code></li>
              <li>• Single Post: <code className="bg-gray-100 px-2 py-1 rounded">/api/posts/[slug]</code></li>
              <li>• Payload API: <code className="bg-gray-100 px-2 py-1 rounded">/api/payload/*</code></li>
            </ul>
            <div className="mt-6">
              <Link 
                href="/posts"
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
              >
                View Published Posts
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}