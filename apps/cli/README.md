# 🚀 Create Launch Pad App

A powerful CLI tool to bootstrap full-stack SaaS applications instantly. Launch your SaaS faster with pre-configured authentication, payments, databases, analytics, and more.

## 📦 Installation

### Global Installation (Recommended)
```bash
npm install -g create-launch-pad-app2
```

### One-time Usage (npx)
```bash
npx create-launch-pad-app2
```

## 🎯 Quick Start

### Interactive Mode (Default)
```bash
# Start the interactive setup
create-launch-pad-app2

# Or specify a project name
create-launch-pad-app2 my-saas-app
```

### Non-Interactive Mode
```bash
# Use default configuration
create-launch-pad-app2 my-app --yes

# Custom configuration
create-launch-pad-app2 my-app \
  --database postgres \
  --auth betterAuth \
  --payment stripe \
  --analytics umami \
  --git \
  --install
```

## ⚙️ Configuration Options

### Database Options
- **`postgres`** - PostgreSQL with pg driver (default)
- **`supabase`** - Supabase with built-in auth and realtime
- **`mongodb`** - MongoDB with Mongoose ODM

### Authentication
- **`betterAuth`** - Modern auth library with TypeScript support (default)
- **`supabaseAuth`** - Supabase authentication (only with supabase database)
- **`none`** - No authentication setup

### Payment Processing
- **`stripe`** - Stripe integration with webhooks (default)
- **`lemonsqueezy`** - Lemon Squeezy for digital products
- **`none`** - No payment processing

### Analytics
- **`umami`** - Privacy-focused analytics (default)
- **`posthog`** - Product analytics and feature flags
- **`none`** - No analytics

### Package Managers
- **`npm`** - Node Package Manager
- **`yarn`** - Yarn Classic
- **`pnpm`** - Performant npm
- **`bun`** - Fast all-in-one toolkit

## 🛠️ CLI Flags

| Flag | Type | Default | Description |
|------|------|---------|-------------|
| `--yes` | boolean | false | Skip prompts, use default configuration |
| `--database` | string | postgres | Database type (postgres/supabase/mongodb) |
| `--auth` | string | betterAuth | Authentication method |
| `--payment` | string | stripe | Payment processing |
| `--analytics` | string | umami | Analytics provider |
| `--git` | boolean | true | Initialize git repository |
| `--package-manager` | string | auto-detect | Package manager to use |
| `--install` | boolean | true | Install dependencies after creation |

## 📁 Generated Project Structure

```
my-saas-app/
├── app/                    # Next.js app directory
│   ├── (auth)/            # Authentication routes
│   ├── (dashboard)/       # Protected dashboard
│   ├── api/               # API routes
│   └── globals.css        # Global styles
├── components/            # Reusable UI components
│   ├── ui/               # Base UI components (shadcn/ui)
│   └── custom/           # Custom components
├── lib/                  # Utility libraries
│   ├── auth.ts          # Authentication config
│   ├── db.ts            # Database connection
│   └── utils.ts         # Helper functions
├── hooks/               # Custom React hooks
├── types/               # TypeScript type definitions
├── public/              # Static assets
├── .env.local          # Environment variables
├── package.json        # Dependencies and scripts
├── tsconfig.json       # TypeScript configuration
└── next.config.ts      # Next.js configuration
```

## 🧩 Included Features

### Core Stack
- **Next.js 15** - React framework with App Router
- **TypeScript** - Type safety and better DX
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Beautiful and accessible components

### Database & ORM
- PostgreSQL with native `pg` driver
- Supabase with real-time capabilities
- MongoDB with Mongoose ODM
- Prisma ORM support (configurable)

### Authentication
- **Better Auth** - Modern, type-safe authentication
- **Supabase Auth** - Built-in authentication with social providers
- Protected routes and middleware
- Session management

### Payment Processing
- **Stripe** - Complete payment solution with webhooks
- **Lemon Squeezy** - Digital product payments
- Subscription management
- Customer portal integration

### Analytics & Monitoring
- **Umami** - Privacy-first web analytics
- **PostHog** - Product analytics with feature flags
- Event tracking and conversion funnels

### Development Tools
- ESLint configuration
- Prettier code formatting
- Husky git hooks
- TypeScript strict mode
- Hot reloading and fast refresh

## 🎨 UI Components

The generated project includes a comprehensive set of pre-built components:

- **Navigation** - Responsive navbar and sidebar
- **Forms** - Login, signup, contact forms with validation
- **Dashboard** - Analytics cards and data tables
- **Marketing** - Landing page sections and CTAs
- **Settings** - User profile and preferences
- **Billing** - Subscription management and invoicing

## 🔧 Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Type checking
npm run check-types

# Lint code
npm run lint

# Format code
npm run format
```

## 🌐 Environment Variables

The CLI automatically generates `.env.local` with required variables:

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/dbname"

# Authentication
AUTH_SECRET="your-auth-secret"
AUTH_URL="http://localhost:3000"

# Payment (Stripe example)
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_..."

# Analytics (Umami example)
NEXT_PUBLIC_UMAMI_WEBSITE_ID="your-website-id"
UMAMI_URL="https://analytics.example.com"
```

## 📚 Examples

### Create a SaaS with PostgreSQL and Stripe
```bash
create-launch-pad-app2 my-saas \
  --database postgres \
  --auth betterAuth \
  --payment stripe \
  --analytics umami
```

### Create a simple app with MongoDB (no payments)
```bash
create-launch-pad-app2 simple-app \
  --database mongodb \
  --auth betterAuth \
  --payment none \
  --analytics none
```

### Use Supabase as backend-as-a-service
```bash
create-launch-pad-app2 supabase-app \
  --database supabase \
  --auth supabaseAuth \
  --payment lemonsqueezy
```

## 🔄 Post-Generation Steps

After creating your project:

1. **Configure environment variables** in `.env.local`
2. **Set up your database** (create tables, run migrations)
3. **Configure payment webhooks** (Stripe/Lemon Squeezy)
4. **Set up analytics tracking** (Umami/PostHog)
5. **Deploy to your preferred platform** (Vercel, Netlify, etc.)

## 🐛 Troubleshooting

### Common Issues

**Q: CLI command not found**
```bash
npm install -g create-launch-pad-app2
# or
npx create-launch-pad-app2
```

**Q: Permission errors during installation**
```bash
sudo npm install -g create-launch-pad-app2
# or use a node version manager
```

**Q: Database connection issues**
- Check your `DATABASE_URL` in `.env.local`
- Ensure database server is running
- Verify connection credentials

**Q: Build errors after generation**
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

## 🤝 Contributing

This CLI is part of a larger monorepo. To contribute:

1. Clone the repository
2. Install dependencies: `npm install`
3. Navigate to CLI: `cd apps/cli`
4. Make changes and test: `npm run dev`
5. Build: `npm run build`
6. Test locally: `npm link` then `create-launch-pad-app2`

## 📄 License

ISC License - see the [LICENSE](LICENSE) file for details.

## 🔗 Links

- [Documentation](https://docs.launchpad.com)
- [GitHub Repository](https://github.com/your-org/launch-pad)
- [Report Issues](https://github.com/your-org/launch-pad/issues)
- [Discord Community](https://discord.gg/launchpad)

---

Built with ❤️ to help developers ship faster.
