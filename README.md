# 🛍️ Google Shopping API Alternative - Product Search API Demo

[![RapidAPI](https://img.shields.io/badge/RapidAPI-Product%20Search%20API-blue)](https://rapidapi.com/remote-skills-remote-skills-default/api/product-search-api)
[![Next.js](https://img.shields.io/badge/Next.js-14-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

** The complete solution for developers seeking a powerful Google Shopping API alternative!**

This comprehensive demo showcases how to integrate the **Product Search API** - a robust, cost-effective alternative to Google Shopping API that searches across **40+ major marketplaces** and e-commerce platforms in real-time.

## Why Choose This Google Shopping API Alternative?

### ✅ **Google Shopping API Limitations Solved:**
- ❌ **Google Shopping API**: Expensive, complex authentication, limited vendor coverage
- ✅ **Our Product Search API**: Affordable, simple integration, 40+ vendors, no complex OAuth

### **Key Advantages Over Google Shopping API:**
- 🌐 **Multi-Vendor Coverage**: Search Amazon, eBay, Walmart, Target, Best Buy + 35 more
- 💰 **Cost-Effective**: Up to 90% cheaper than Google Shopping API
- ⚡ **Fast Integration**: 5-minute setup vs hours of Google API configuration  
- 🔄 **Real-Time Data**: Live pricing, availability, and reviews
- 📱 **Country Support**: US, Canada, France, Germany, UK, Australia, Japan
- 🛡️ **Reliable**: 99.9% uptime SLA

## Perfect For Developers Building:

- 🛒 **E-commerce Price Comparison Tools**
- 📊 **Market Research Applications** 
- 🔍 **Product Discovery Platforms**
- 💡 **Affiliate Marketing Sites**
- 📈 **Inventory Management Systems**
- 🏪 **Multi-Marketplace Integration**

## Live Demo Features

### **Interactive Demo Includes:**
- **Smart Search Interface** with autocomplete and suggestions
- **Advanced Filtering**: Price range, ratings, vendor selection, country-specific results
- **Real-Time Results** from 40+ marketplaces simultaneously  
- **Detailed Product Pages** with image galleries, reviews analysis, seller comparison
- **Price Comparison Table** showing best deals across vendors
- **Mobile-Responsive Design** optimized for all devices

## Quick Start Guide

### **Get Your API Key**
```bash
🔗 Sign up: https://rapidapi.com/remote-skills-remote-skills-default/api/product-search-api
💳 Choose your plan (Free tier available!)
🔑 Copy your API key
```

### **Clone & Setup**
```bash
git clone https://github.com/your-username/google-shopping-api-alternative-demo
cd google-shopping-api-alternative-demo
npm install
```

### **Configure Environment**
```bash
cp .env.example .env.local
```

Edit `.env.local`:
```env
# 🔒 Server-side only (API key protected from client exposure)
RAPIDAPI_KEY=your_rapidapi_key_here
# 🌐 Public host (safe to expose)
NEXT_PUBLIC_RAPIDAPI_HOST=product-search-api.p.rapidapi.com
```

### **Launch Demo**
```bash
npm run dev
# Open http://localhost:3000
```

**🎉You're ready! Start searching across 40+ marketplaces instantly!**

## 🔌 API Integration Guide

### **Secure Server-Side Implementation**
Unlike many examples that expose API keys, this demo implements **production-ready security**:

```javascript
// ✅ SECURE: Server-side API route (API key protected)
// /api/search - Your API key stays safe on the server

// Client-side usage (recommended):
const response = await fetch(`/api/search?query=iPhone&country=us`);
const products = await response.json();
```

### **Complete API Endpoints**

#### 🔍 **Product Search Endpoint**
```javascript
// Search across 40+ marketplaces
const searchProducts = async (query, country = 'us') => {
  const response = await fetch('/api/search?' + new URLSearchParams({
    query: query,
    country: country // us, ca, fr, de, uk, au, jp
  }));
  return response.json();
};
```

#### **Product Details Endpoint**  
```javascript
// Get detailed product information
const getProductDetails = async (productId) => {
  const response = await fetch(`/api/product/${productId}`);
  return response.json();
};
```

### **Supported Countries & Marketplaces**

| Country | Code | Major Marketplaces Covered |
|---------|------|----------------------------|
| 🇺🇸 United States | `us` | Amazon, Walmart, Target, Best Buy, Home Depot, eBay |
| 🇨🇦 Canada | `ca` | Amazon.ca, Walmart.ca, Canadian Tire, Best Buy Canada |
| 🇫🇷 France | `fr` | Amazon.fr, Cdiscount, Fnac, Darty |
| 🇩🇪 Germany | `de` | Amazon.de, Otto, MediaMarkt, Saturn |
| 🇬🇧 United Kingdom | `uk` | Amazon.co.uk, Argos, Currys, John Lewis |
| 🇦🇺 Australia | `au` | Amazon.com.au, JB Hi-Fi, Harvey Norman |
| 🇯🇵 Japan | `jp` | Amazon.co.jp, Rakuten, Yahoo Shopping |

## API Response Examples

### **Search Response Structure**
```json
{
  "products": [
    {
      "title": "iPhone 15 Pro Max 256GB Natural Titanium",
      "source": "amazon.com",
      "link": "https://amazon.com/product-link",
      "price": "$1,199.00", 
      "imageUrl": "https://product-image.jpg",
      "rating": 4.8,
      "ratingCount": 1247,
      "productId": "prod_abc123",
      "position": 1
    }
```

### **Product Details Response**
```json
{
  "id": "prod_abc123",
  "title": "iPhone 15 Pro Max 256GB Natural Titanium",
  "description": "The most advanced iPhone ever...",
  "images": {
    "main_images": [
      {
        "url": "https://high-res-image-1.jpg",
        "type": "main"
      }
    ]
  },
  "reviews": {
    "rating": 4.8,
    "count": 1247,
    "aspects": [
      {
        "name": "Camera Quality",
        "rating": 4.9,
        "mentions": 892
      }
    ]
  },
  "buying_options": {
    "sellers": [
      {
        "seller_name": "Amazon",
        "item_price": "$1,199.00",
        "total_price": "$1,199.00",
        "shipping": "Free"
      }
    ]
  }
}
```

## **Tech Stack & Architecture**

### 🛠️ **Frontend Technologies**
- ⚡ **Next.js 14** - React framework with App Router
- 🎨 **Tailwind CSS + shadcn/ui** - Modern component library
- 📝 **TypeScript** - Type-safe development
- 🔔 **Sonner** - Toast notifications
- 🎭 **Lucide React** - Beautiful icons

### 🔒 **Security & Performance**
- 🛡️ **Server-Side API Routes** - API keys protected from client exposure
- ⚡ **Next.js Image Optimization** - Automatic image optimization
- 📱 **Responsive Design** - Mobile-first approach
- 🚀 **Performance Optimized** - Fast loading and smooth interactions
    ]
  },
  "images": {
    "main_images": [
      {
### **Project Structure**
```
src/
├── app/
│   ├── api/
│   │   ├── search/route.ts      # 🔍 Product search endpoint
│   │   └── product/[id]/route.ts # 📄 Product details endpoint
│   ├── product/[id]/page.tsx    # 📱 Product detail pages
│   └── page.tsx                 # 🏠 Main search interface
├── components/
│   ├── ui/                      # 🎨 shadcn/ui components
│   ├── SearchBar.tsx           # 🔍 Advanced search component
│   ├── ProductCard.tsx         # 🛍️ Product display card
│   └── ProductModal.tsx        # 📱 Product quick view
└── lib/
    └── utils.ts                 # 🛠️ Utility functions
```

## **Use Cases & Success Stories**

### 🛒 **E-commerce Applications**
- **Price Comparison Sites**: Compare prices across all major retailers
- **Deal Aggregators**: Find the best deals automatically  
- **Product Research Tools**: Comprehensive market analysis

### **Mobile Applications**
- **Shopping Apps**: Real-time product search and comparison
- **Barcode Scanners**: Instant price checking across retailers
- **Wishlist Managers**: Track products across multiple stores

### **Enterprise Solutions**
- **Inventory Management**: Monitor competitor pricing
- **Market Research**: Analyze product trends and pricing
- **Affiliate Networks**: Access to diverse product catalogs

## **Deployment Guide**

### **Deploy to Vercel (Recommended)**
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod

# Add environment variables in Vercel dashboard
```

### **Docker Deployment**
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

### ☁**Other Platforms**
- **Netlify**: Connect GitHub repo, add env vars
- **Railway**: One-click deploy from GitHub  
- **Heroku**: Standard Node.js deployment
- **AWS/GCP**: Use container services

## **Performance & Analytics**

### **Performance Metrics**
- 🚀 **Average Response Time**: < 2 seconds
- 📊 **Success Rate**: 99.9% uptime
- 🔄 **Cache Strategy**: Smart caching for optimal speed
- � **Mobile Performance**: Perfect Lighthouse scores

## **Community & Support**

### 📞 **Get Help**
- 📚 **API Documentation**: [RapidAPI Docs](https://rapidapi.com/remote-skills-remote-skills-default/api/product-search-api)
- 💬 **Community Support**: [GitHub Issues](https://github.com/your-username/repo/issues)
- 📧 **Direct Support**: Available through RapidAPI platform
- 🎥 **Video Tutorials**: Coming soon!

## 📋 **FAQ**

### **Common Questions**

**Q: What's included in the free tier?**
A: Free tier includes 10 monthly requests - perfect for testing and small projects.

**Q: Can I use this for commercial projects?**
A: Yes! The API is designed for commercial use with various pricing tiers to match your needs.

**Q: How often is the data updated?**
A: Product data is updated in real-time, ensuring you always get the latest pricing and availability.

**Q: Which countries are supported?**
A: Currently supports US, Canada, France, Germany, UK, Australia, and Japan with more coming soon.

## 📄 **License & Legal**

This demo is MIT licensed. The Product Search API is provided by Remote Skills through RapidAPI platform.

### **Important Links**
- 🔑 **Get API Key**: [RapidAPI Product Search API](https://rapidapi.com/remote-skills-remote-skills-default/api/product-search-api)
- 📚 **API Documentation**: [View Docs](https://rapidapi.com/remote-skills-remote-skills-default/api/product-search-api)
- 💰 **Pricing Plans**: [View Pricing](https://rapidapi.com/remote-skills-remote-skills-default/api/product-search-api)
- 📞 **Support**: [Get Help](https://rapidapi.com/remote-skills-remote-skills-default/api/product-search-api)

---

## **Start Building Today!**

Ready to build the next generation of e-commerce applications? 

[![Get Started](https://img.shields.io/badge/Get%20Started-Free%20API%20Key-green?style=for-the-badge)](https://rapidapi.com/remote-skills-remote-skills-default/api/product-search-api)

**⭐ Star this repository if it helps your project!**

---

*Built with ❤️ by developers, for developers. Making product search simple and powerful.*

4. Run the development server:
```bash
bun dev
# or
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

### Important Notes
- The application is configured to load images from Google Shopping CDN domains
- If you encounter image loading issues, make sure the `next.config.js` file includes the proper image domains
- The API requires valid RapidAPI credentials to function properly

## Project Structure

```
src/
├── app/
│   ├── globals.css          # Global styles
│   ├── layout.tsx           # Root layout
│   ├── not-found.tsx        # 404 page
│   ├── page.tsx             # Main search page
│   └── product/
│       └── [id]/
│           └── page.tsx     # Detailed product page
├── components/
│   ├── ui/                  # shadcn/ui components
│   ├── ProductCard.tsx      # Individual product display component
│   ├── ProductModal.tsx     # Product detail modal
│   └── SearchBar.tsx        # Search input with filters
└── lib/
    └── utils.ts             # Utility functions
```

## Components Overview

### SearchBar
- Advanced search input with filtering capabilities
- Price range sliders, rating filters, vendor selection
- Sort options and active filter display
- Example search suggestions

### ProductCard
- Responsive product display with image, title, price
- Star rating system with review counts
- Vendor badges and position indicators
- Quick action buttons for viewing details
- Navigation to detailed product pages

### ProductModal
- Detailed product information in overlay
- Seller comparison and shipping details
- Quick view without page navigation

### Product Details Page (`/product/[id]`)
- Comprehensive product information display
- Image carousel with multiple product images
- Detailed specifications and features
- Reviews analysis with sentiment indicators
- Seller comparison table with pricing and shipping
- Navigation breadcrumbs and related actions
- Large product images with loading states
- Share functionality and wishlist integration
- Direct links to vendor pages

## API Features Demonstrated

1. **Search Query Processing**: Convert user input to API-compatible format
2. **Response Handling**: Parse and display product data
3. **Error Management**: Handle API errors and network issues
4. **Loading States**: Show progress during API calls
5. **Data Transformation**: Process prices, ratings, and images
6. **Filtering Logic**: Client-side filtering of API results
7. **Performance Optimization**: Memoized calculations and efficient re-renders

## What is this?

This boilerplate **reverse-engineers** the magic behind [Lovable's](https://lovable.dev) no-code AI app builder into a traditional Next.js 14 codebase that developers can understand, modify, and extend. It bridges the gap between no-code AI generation and developer control.

## Tech Stack

| Technology          | Purpose            | Version |
| ------------------- | ------------------ | ------- |
| **Next.js**         | React Framework    | 14.2.x  |
| **React**           | UI Library         | 18.3.1  |
| **TypeScript**      | Type Safety        | 5.5.3   |
| **App Router**      | File-based Routing | Latest  |
| **shadcn/ui**       | Component Library  | Latest  |
| **Tailwind CSS**    | Styling            | 3.4.11  |
| **TanStack Query**  | Data Fetching      | 5.56.2  |
| **React Hook Form** | Form Handling      | 7.53.0  |
| **Zod**             | Schema Validation  | 3.23.8  |

### Prerequisites

- Node.js 18+ or Bun
- Git

### Installation

```bash
# Clone the repository
git clone https://github.com/chihebnabil/next-boilerplate
cd lovable-next-boilerplate

# Install dependencies (npm, yarn, or bun)
npm install
# or
bun install

# Start development server
npm run dev
# or
bun dev
```

Your app will be running at `http://localhost:3000`

## Project Structure

```
lovable-next-boilerplate/
├── .github/
│   └── instructions/           # AI coding assistant instructions
│       ├── global.instructions.md
│       ├── app-router.instructions.md
│       ├── components.instructions.md
│       └── ...                 # Comprehensive instruction set
├── app/
│   ├── layout.tsx              # Root layout (Server Component)
│   ├── page.tsx                # Home page (/)
│   ├── globals.css             # Global styles
│   ├── loading.tsx             # Loading UI
│   ├── error.tsx               # Error boundaries
│   ├── not-found.tsx           # 404 page
│   └── api/                    # API routes
├── components/
│   ├── ui/                     # shadcn/ui components (40+ pre-built)
│   ├── common/                 # Shared components
│   └── features/               # Feature-specific components
├── hooks/                      # Custom React hooks
├── lib/                        # Utility functions and configurations
├── public/                     # Static assets
├── package.json                # Dependencies
├── next.config.js              # Next.js configuration
├── tailwind.config.ts          # Tailwind configuration
├── components.json             # shadcn/ui configuration
└── tsconfig.json               # TypeScript configuration
```

## Available Components

### UI Components (40+ ready-to-use)

All components are pre-configured with shadcn/ui and located in `components/ui/`:

**Layout & Navigation**

- `accordion`, `card`, `separator`, `sheet`, `sidebar`, `tabs`
- `breadcrumb`, `command`, `dropdown-menu`, `menubar`, `navigation-menu`, `pagination`

**Forms & Inputs**

- `button`, `input`, `textarea`, `select`, `checkbox`, `radio-group`, `switch`, `form`
- `calendar`, `input-otp`, `slider`, `toggle`

**Feedback & Overlays**

- `alert`, `alert-dialog`, `toast`, `sonner`, `progress`, `skeleton`
- `dialog`, `drawer`, `hover-card`, `popover`, `tooltip`

**Data Display**

- `avatar`, `badge`, `table`, `chart`, `carousel`
- `aspect-ratio`, `collapsible`, `resizable`, `scroll-area`

### Layout Principles

- **App Router**: File-based routing with layouts and nested routes
- **Server Components**: Default to Server Components for better performance
- **Client Components**: Use 'use client' only when needed for interactivity
- **Generous Spacing**: `py-16 lg:py-24` for sections
- **Consistent Rhythm**: `space-y-4 lg:space-y-6` for content
- **Responsive First**: Mobile-first responsive design
- **Typography Scale**: Hierarchical text sizing

## Development Commands

```bash
# Development
npm run dev          # Start dev server (port 3000)
npm run build        # Production build
npm run start        # Start production server
npm run lint         # Run ESLint
npm run lint:fix     # Auto-fix ESLint issues

# Using Bun (faster alternative)
bun dev             # Start dev server
bun run build       # Production build
bun start           # Start production server
```

## What Makes This Special?

1. **Reverse-Engineered**: Based on patterns from Lovable's AI app builder
2. **Next.js 14 App Router**: Modern file-based routing with Server Components
3. **AI-Optimized**: Designed specifically for AI coding assistants
4. **Design-First**: Premium visual design out of the box
5. **Performance**: Server Components and optimization by default
6. **Full-Stack Ready**: API routes, middleware, and database integration
7. **Flexible**: Easy to customize and extend
8. **Modern**: Latest Next.js patterns and best practices

**Happy coding!**
