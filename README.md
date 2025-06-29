# AnglersNet - Fishing Social App

A comprehensive fishing social platform that combines activity tracking, AI-powered features, and collection mechanics. Users can photograph their catches, get AI-powered species identification and length measurements, share experiences with the community, and build their personal fish collection.

## Features

### 🎣 Core Fishing Features
- **Photo Upload**: Capture and upload fish photos with detailed catch information
- **AI Species Identification**: Automatic fish species recognition with confidence scoring
- **AI Length Measurement**: Intelligent fish length estimation from photos using OpenAI Vision
- **Catch Logging**: Record weight, length, location, and personal notes
- **Personal Catch History**: Track all your fishing achievements

### 🤖 AI-Powered Tools
- **Species Recognition**: Advanced AI identifies fish species from photos
- **Length Measurement**: Computer vision analyzes photos to estimate fish length
- **Smart Suggestions**: Get tips for better photos and measurement accuracy

### 👥 Social Features
- **Activity Feed**: See recent catches from the fishing community
- **Like & Comment**: Engage with other anglers' catches
- **Follow System**: Connect with fellow fishing enthusiasts
- **User Profiles**: Showcase your fishing achievements and statistics

### 🏆 Collection System
- **Species Collection**: Pokemon-style collection with rarity ratings
- **Progress Tracking**: Monitor your species discovery progress
- **Personal Bests**: Track your biggest catches for each species
- **Achievement System**: Unlock badges and milestones

### 📱 Mobile-First Design
- **Responsive Interface**: Optimized for mobile fishing experiences
- **Touch-Friendly**: Easy navigation with bottom tab bar
- **Ocean Theme**: Beautiful blue-green color scheme
- **Modern UI**: Built with Shadcn/ui components

## Technology Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for fast development and building
- **Wouter** for client-side routing
- **TanStack React Query** for server state management
- **React Hook Form** with Zod validation
- **Tailwind CSS** with Shadcn/ui components

### Backend
- **Node.js** with Express.js
- **PostgreSQL** database with Drizzle ORM
- **Neon Database** serverless connection
- **Multer** for image uploads
- **OpenAI Vision API** for AI features

### Authentication
- **Replit Auth** with OpenID Connect
- **Express Sessions** with PostgreSQL storage
- **Secure HTTP-only cookies**

## Getting Started

### Prerequisites
- Node.js 20 or higher
- PostgreSQL database
- OpenAI API key (for AI features)

### Environment Variables
```env
DATABASE_URL=your_postgresql_connection_string
OPENAI_API_KEY=your_openai_api_key
SESSION_SECRET=your_session_secret
```

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/anglersnet.git
cd anglersnet
```

2. Install dependencies:
```bash
npm install
```

3. Set up the database:
```bash
npm run db:push
```

4. Start the development server:
```bash
npm run dev
```

The app will be available at `http://localhost:5000`

## Project Structure

```
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Page components
│   │   ├── hooks/          # Custom React hooks
│   │   └── lib/            # Utility functions
├── server/                 # Express backend
│   ├── index.ts           # Server entry point
│   ├── routes.ts          # API routes
│   ├── storage.ts         # Database operations
│   ├── openai.ts          # AI integration
│   ├── db.ts              # Database connection
│   └── replitAuth.ts      # Authentication setup
├── shared/                 # Shared types and schemas
│   └── schema.ts          # Database schema and types
└── uploads/               # Image storage directory
```

## API Endpoints

### Authentication
- `GET /api/auth/user` - Get current user
- `GET /api/login` - Initiate login
- `GET /api/logout` - Logout user

### Catches
- `GET /api/catches/feed` - Get activity feed
- `POST /api/catches` - Create new catch
- `GET /api/catches/user/:userId` - Get user's catches
- `DELETE /api/catches/:id` - Delete catch

### AI Features
- `POST /api/ai/identify` - AI species identification
- `POST /api/ai/measure-length` - AI length measurement

### Social
- `POST /api/follows` - Follow user
- `DELETE /api/follows/:userId` - Unfollow user
- `POST /api/catches/:catchId/like` - Like catch
- `POST /api/catches/:catchId/comments` - Add comment

### Species & Collection
- `GET /api/species` - Get all species
- `GET /api/species/collection` - Get user's collection

## Database Schema

The app uses PostgreSQL with the following main tables:
- `users` - User profiles and authentication
- `species` - Fish species reference data
- `catches` - Fishing catch records
- `follows` - User follow relationships
- `catch_likes` - Like interactions
- `catch_comments` - Comment system
- `achievements` - Achievement definitions
- `user_achievements` - User achievement progress

## AI Integration

### Species Identification
Currently uses a placeholder system that randomly selects from common fish species. Ready for integration with actual AI vision services.

### Length Measurement
Powered by OpenAI's GPT-4 Vision model, analyzes fish photos to estimate length based on:
- Fish anatomy and proportions
- Reference objects in photos
- Visual scale cues
- Species-specific characteristics

## Deployment

### Vercel Deployment (Recommended)
The app is restructured for seamless Vercel deployment with serverless functions:

1. **Quick Deploy to Vercel:**
   [![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/anglersnet)

2. **Manual Deployment:**
   - Push your code to GitHub
   - Connect repository to Vercel
   - Add environment variables in Vercel dashboard
   - Deploy automatically

3. **Required Environment Variables:**
   ```
   DATABASE_URL=your_postgresql_connection_string
   OPENAI_API_KEY=your_openai_api_key
   SESSION_SECRET=your_secure_session_secret
   ```

### Alternative: Replit Deployment
The app also works on Replit with:
- Automatic scaling and load balancing
- Built-in PostgreSQL database
- Secure environment variable management

See [VERCEL_DEPLOYMENT.md](./VERCEL_DEPLOYMENT.md) for detailed Vercel deployment instructions.

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes and test thoroughly
4. Commit your changes: `git commit -m 'Add feature description'`
5. Push to the branch: `git push origin feature-name`
6. Submit a pull request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Built with modern web technologies and best practices
- AI features powered by OpenAI
- UI components from Shadcn/ui
- Icons from Lucide React
- Fish images from Unsplash

---

**Happy Fishing!** 🎣