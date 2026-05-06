# Snip — Modern URL Shortener

A production-grade URL shortener built with **Next.js 15**, **Prisma**, **PostgreSQL**, and **TailwindCSS v4**.

## ✨ Features

| Feature | Detail |
|---------|--------|
| 🔗 URL Shortening | Instant, nanoid-based short codes |
| 🎨 Custom Slugs | Choose your own slug (collision-checked) |
| ⏰ Link Expiry | 1h / 24h / 7d / 30d / Never |
| 📊 Click Analytics | Visits + device + referrer tracking |
| 🏷️ Auto Page Title | Fetches title from original URL |
| 🗑️ Delete Links | Session-scoped link management |
| 🔒 httpOnly Cookies | Secure session management |

## 🚀 Tech Stack

- **Framework**: Next.js 15 (App Router, Turbopack)
- **Language**: TypeScript
- **ORM**: Prisma 6
- **Database**: PostgreSQL (NeonDB)
- **UI**: TailwindCSS v4 + Lucide Icons
- **Validation**: Zod
- **Notifications**: react-hot-toast

## 🛠️ Setup

```bash
git clone https://github.com/Mobeenkhxn01/url-shortener
cd url-shortener
npm install

cp .env.example .env
# Fill in DATABASE_URL and NEXT_PUBLIC_BASE_URL

npx prisma db push
npm run dev
```

## 📁 Project Structure

```
src/
├── app/
│   ├── [short]/page.tsx     # Redirect + click tracking
│   ├── api/
│   │   ├── shorten/route.ts # POST: create short URL
│   │   └── urls/route.ts    # GET: list | DELETE: remove
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── url-shorten-form.tsx # Form with advanced options
│   └── url-shorten-list.tsx # URL list with actions
└── lib/
    ├── prisma.ts            # Singleton client
    └── validations.ts       # Zod schemas
```

## 🔄 Improvements Over Original

- ✅ `cuid` IDs instead of auto-increment integers  
- ✅ Zod validation on all inputs  
- ✅ Custom slug support with collision detection  
- ✅ Link expiry system (auto-invalidates on redirect)  
- ✅ Click model with device + referrer tracking  
- ✅ Page title auto-fetch  
- ✅ DELETE endpoint for link management  
- ✅ `httpOnly` cookie for session security  
- ✅ Skeleton loaders, hover delete, expiry labels  
- ✅ Full dark mode UI redesign  
- ✅ Security headers in Next.js config
