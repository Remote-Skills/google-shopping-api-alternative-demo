#### 🔧 `.env.local` Configuration
After copying the `.env.example` file, add your actual API credentials:

```bash
cp .env.example .env.local
```

Example `.env.local` file:
```env
# 🔒 Your actual RapidAPI credentials (keep private!)
RAPIDAPI_KEY=abc123def456...

# 🌐 API host (public, safe to expose)
NEXT_PUBLIC_RAPIDAPI_HOST=product-search-api.p.rapidapi.com

# 📍 Default search country
NEXT_PUBLIC_DEFAULT_COUNTRY=us
```

> **🔥 Important**: Never commit your `.env.local` file to version control. It contains your private API key!
