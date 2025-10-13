# Simple URL Shortener 🚀

A fast and lightweight URL shortening web application built with **Next.js 15**, **TypeScript**, **Prisma ORM**, and **shadcn/ui**. Shorten long URLs instantly and track click statistics in real-time.

## Features

- ⚡ **Instant URL Shortening** - Shorten URLs in less than 2 seconds
- 📊 **Click Tracking** - Monitor how many times each link is clicked
- 🔗 **Copy to Clipboard** - One-click copy functionality
- 📱 **Fully Responsive** - Works seamlessly on desktop, tablet, and mobile
- 🎨 **Modern UI** - Clean interface built with Tailwind CSS and shadcn/ui
- 🔐 **Secure** - HTTPS encrypted, no account required
- ⚙️ **Session-based** - URLs are filtered per session

## Tech Stack

- **Frontend:** Next.js 15+, React, TypeScript, Tailwind CSS
- **UI Components:** shadcn/ui
- **Backend:** Next.js API Routes
- **Database:** Prisma ORM + PostgreSQL (Neon DB)
- **Icons:** Lucide React
- **Notifications:** React Hot Toast
- **Hosting:** Vercel

## Getting Started

### Prerequisites

- Node.js v18 or higher
- npm or yarn package manager
- PostgreSQL database (Neon DB recommended for free hosting)

### Installation

1. **Clone the repository:**

```bash
git clone https://github.com/Mobeenkhxn01/url-shortener.git
cd url-shortener
```

2. **Install dependencies:**

```bash
npm install
```

3. **Set up environment variables:**

Create a `.env.local` file in the root directory:

```env
DATABASE_URL="postgresql://user:password@host/database"
NEXT_PUBLIC_BASE_URL="https://your-domain.vercel.app"
```

**To get a free PostgreSQL database:**
- Visit [Neon DB](https://neon.tech)
- Create a free account and project
- Copy your connection string to `DATABASE_URL`

4. **Set up the database:**

```bash
npx prisma migrate dev --name init
```

5. **Generate Prisma client:**

```bash
npx prisma generate
```

6. **Start the development server:**

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

1. Enter a long URL in the input field on the homepage
2. Click **"Shorten URL"** button
3. Your short URL appears in the list below
4. Click the **copy icon** to copy the short link to clipboard
5. Share the short URL anywhere - it will redirect to your original link
6. Monitor **click count** next to each shortened URL

## Project Structure

```
src/
├── app/
│   ├── page.tsx              # Homepage
│   ├── layout.tsx            # Root layout
│   ├── globals.css           # Global styles
│   └── api/
│       ├── shorten/          # POST endpoint to shorten URLs
│       └── urls/             # GET endpoint to fetch URLs
├── components/
│   ├── url-shorten-form.tsx  # Input form component
│   ├── url-shorten-list.tsx  # URLs list component
│   └── ui/                   # shadcn/ui components
└── lib/
    └── db.ts                 # Prisma client
prisma/
├── schema.prisma             # Database schema
└── migrations/               # Database migrations
```

## API Endpoints

### Shorten URL

**POST** `/api/shorten`

Request:
```json
{
  "url": "https://example.com/very/long/url/path"
}
```

Response:
```json
{
  "id": "abc123",
  "originalUrl": "https://example.com/very/long/url/path",
  "shortUrl": "https://your-domain.vercel.app/abc123",
  "views": 0
}
```

### Get All URLs

**GET** `/api/urls`

Response:
```json
[
  {
    "originalUrl": "https://example.com/...",
    "shortUrl": "https://your-domain.vercel.app/abc123",
    "views": 5
  }
]
```

### Redirect

**GET** `/:shortCode`

Redirects to the original URL and increments the view count.

## Database Schema

```prisma
model Url {
  id           String   @id @default(cuid())
  originalUrl  String
  shortCode    String   @unique
  views        Int      @default(0)
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt
}
```

## Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Visit [Vercel](https://vercel.com)
3. Click **"New Project"** and select your repository
4. Add environment variables:
   - `DATABASE_URL` - Your Neon DB connection string
   - `NEXT_PUBLIC_BASE_URL` - Your Vercel domain
5. Click **"Deploy"**

Or use the Vercel CLI:

```bash
npm install -g vercel
vercel
```

## Development

### Run tests

```bash
npm run test
```

### Build for production

```bash
npm run build
npm start
```

### View database in Prisma Studio

```bash
npx prisma studio
```

## Contributing

Contributions are welcome! Feel free to submit issues or pull requests.

## License

MIT License - feel free to use this project for personal or commercial purposes.

## Support & Questions

- 📧 Email: [developermobeen7@gmail.com]
- 🐛 Issues: [GitHub Issues](https://github.com/Mobeenkhxn01/url-shortener/issues)
- 💬 Discussions: [GitHub Discussions](https://github.com/Mobeenkhxn01/url-shortener/discussions)

---

Made with ❤️ by [Mobeen Khan](https://github.com/Mobeenkhxn01)