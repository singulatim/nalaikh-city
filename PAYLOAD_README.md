# Payload CMS Implementation for Nalaikh City Development Corporation

This document provides comprehensive information about the Payload CMS implementation in the NCDC project.

## 🚀 Quick Start

### Prerequisites
- Node.js (v18 or later)
- MongoDB running locally or MongoDB Atlas connection
- npm or yarn package manager

### Environment Setup
1. Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```

2. Configure your environment variables in `.env.local`:
```env
# Required
PAYLOAD_SECRET=your-secret-key-here-replace-in-production
MONGODB_URI=mongodb://localhost:27017/nalaikh-city

# Optional
NEXT_PUBLIC_PAYLOAD_URL=http://localhost:3000
```

### Running the Application
```bash
npm run dev
```

## 📁 Project Structure

```
src/
├── collections/
│   ├── Posts.ts          # Blog posts and news articles
│   └── Media.ts          # File uploads and media management
└── payload.config.ts     # Main Payload CMS configuration

app/
├── admin/                # Admin panel routes
│   └── [[...segments]]/
│       └── page.tsx      # Dynamic admin routes
├── api/
│   ├── payload/          # Main Payload API endpoints
│   │   └── [...slug]/
│   │       └── route.ts
│   └── posts/            # Custom posts API
│       ├── route.ts      # List posts endpoint
│       └── [slug]/
│           └── route.ts  # Single post endpoint
└── posts/                # Frontend posts pages
    ├── page.tsx          # Posts listing page
    └── [slug]/
        └── page.tsx      # Individual post page
```

## 🛠 Features Implemented

### Collections

#### Posts Collection
- **Multilingual Support**: Content in Mongolian (mn), English (en), and Chinese (zh)
- **Rich Text Content**: Lexical editor with full formatting capabilities
- **Media Integration**: Featured images with automatic resizing
- **SEO Fields**: Meta title and description for search optimization
- **Categorization**: news, projects, green-development, housing, technology
- **Status Management**: draft, published, archived
- **Tags**: Multiple tags per post for better organization

#### Media Collection
- **File Upload**: Support for images with automatic optimization
- **Multiple Sizes**: Thumbnail (400x300), Card (768x432), Tablet (1024x)
- **Alt Text**: Accessibility support with required alt text
- **Captions**: Optional captions for images

#### Users Collection
- **Role-Based Access**: Admin and Editor roles
- **Authentication**: Email/password authentication
- **Profile Management**: First name, last name fields
- **Security Features**: Login attempt limits, account lockout

### Admin Panel
- **Location**: Access at `http://localhost:3000/admin`
- **Responsive Design**: Mobile-friendly admin interface
- **Multilingual Admin**: Supports all three languages
- **Media Management**: Drag-and-drop file uploads
- **Content Preview**: Rich text editor with live preview

### API Endpoints

#### Payload API (`/api/payload/[...slug]`)
- Full REST API for all collections
- Authentication endpoints
- File upload handling
- GraphQL support (if enabled)

#### Custom Posts API
- **GET `/api/posts`**: List posts with filtering and pagination
  - Query parameters: `page`, `limit`, `category`, `locale`
- **GET `/api/posts/[slug]`**: Get single post by slug
  - Query parameters: `locale`

### Frontend Integration

#### Posts Listing (`/posts`)
- **Pagination**: Load more functionality
- **Category Filtering**: Filter by content categories
- **Language Switching**: Multilingual content display
- **Responsive Grid**: Mobile-first responsive design
- **Search Functionality**: Filter posts by category

#### Individual Posts (`/posts/[slug]`)
- **Dynamic Routing**: SEO-friendly URLs
- **Social Sharing**: Built-in share functionality
- **Related Content**: Tag-based content discovery
- **Reading Time**: Estimated reading time calculation

## 🔧 Configuration Details

### Database Configuration
```typescript
db: mongooseAdapter({
  url: process.env.MONGODB_URI || 'mongodb://localhost:27017/nalaikh-city',
  connectOptions: {
    dbName: 'nalaikh-city',
  },
})
```

### Localization Setup
```typescript
localization: {
  locales: [
    { label: 'Mongolian', code: 'mn' },
    { label: 'English', code: 'en' },
    { label: 'Chinese', code: 'zh' },
  ],
  defaultLocale: 'mn',
  fallback: true,
}
```

### Security Configuration
- **CORS**: Configured for development and production domains
- **CSRF Protection**: Enabled for form submissions
- **File Upload Limits**: 5MB maximum file size
- **Login Security**: 5 max attempts, 10-minute lockout

## 🎨 Customization

### Adding New Collections
1. Create a new collection file in `src/collections/`
2. Import and add to `payload.config.ts`
3. Run the development server to auto-generate types

### Modifying Existing Collections
- Edit collection files in `src/collections/`
- Payload will automatically migrate schema changes
- Backup your database before major changes

### Custom Fields
```typescript
// Example: Adding a new field to Posts
{
  name: 'customField',
  type: 'text',
  required: false,
  localized: true, // Makes field translatable
  admin: {
    description: 'Custom field description'
  }
}
```

## 📱 Frontend Usage

### Fetching Posts
```typescript
// Fetch posts with pagination
const response = await fetch(`/api/posts?page=1&limit=10&locale=mn`)
const data = await response.json()

// Fetch single post
const response = await fetch(`/api/posts/post-slug?locale=mn`)
const post = await response.json()
```

### Rendering Rich Text
The project includes a basic rich text renderer in the post detail page. For production, consider implementing a more robust Lexical renderer.

## 🚀 Deployment

### Environment Variables for Production
```env
PAYLOAD_SECRET=your-secure-secret-key
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/nalaikh-city
NEXT_PUBLIC_PAYLOAD_URL=https://yourdomain.com
```

### Build Commands
```bash
npm run build
npm run start
```

### MongoDB Atlas Setup
1. Create a MongoDB Atlas cluster
2. Create a database user
3. Whitelist your deployment IP
4. Use the connection string in `MONGODB_URI`

## 🛠 Development

### Adding New Languages
1. Update the `localization.locales` array in `payload.config.ts`
2. Add translations to frontend components
3. Update the language selector UI

### Custom Admin Components
- Create custom field components in `src/components/admin/`
- Register components in the collection field configuration
- Use Payload's admin API for custom functionality

## 📊 Performance Considerations

### Image Optimization
- Sharp is recommended for image processing
- Install with: `npm install sharp`
- Automatic thumbnail generation for faster loading

### Caching
- Consider implementing Redis for session storage
- Use CDN for media files in production
- Enable Next.js static generation where appropriate

### Database Indexing
- MongoDB indexes are automatically created for common queries
- Consider additional indexes for custom query patterns

## 🔐 Security Best Practices

1. **Environment Variables**: Never commit secrets to version control
2. **Database Security**: Use MongoDB Atlas or secure your own MongoDB instance
3. **Admin Access**: Limit admin panel access to trusted networks
4. **File Uploads**: Validate file types and sizes
5. **Regular Updates**: Keep Payload CMS and dependencies updated

## 📞 Support

For issues specific to this implementation:
1. Check the console logs for detailed error messages
2. Verify MongoDB connection and collections
3. Ensure all environment variables are set correctly
4. Check Payload CMS documentation: https://payloadcms.com/docs

## 🎯 Next Steps

### Recommended Enhancements
1. **Email Configuration**: Set up SMTP for user notifications
2. **Rich Text Renderer**: Implement proper Lexical content rendering
3. **File Storage**: Consider cloud storage (AWS S3, Cloudinary) for production
4. **Search**: Implement full-text search functionality
5. **Analytics**: Add content analytics and performance tracking
6. **Backup**: Set up automated database backups
7. **Monitoring**: Implement error tracking and performance monitoring

### Advanced Features
- **Webhooks**: Trigger actions on content changes
- **API Rate Limiting**: Prevent abuse of public APIs
- **Content Versioning**: Track content changes over time
- **Workflow Management**: Add content approval workflows
- **Multi-tenant Support**: Support for multiple sites/brands