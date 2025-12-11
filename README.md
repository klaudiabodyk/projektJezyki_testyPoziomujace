# Language Proficiency Tests

A modern web application for taking language proficiency (placement) tests. Currently supports English and German language assessments to help students determine their skill level according to the CEFR (Common European Framework of Reference for Languages).

## 🌐 Overview

This application allows users to:
- Take placement tests for **English** (A0-C1 levels) and **German** languages
- Get instant feedback on their language proficiency level
- Receive test results via email
- Share results via WhatsApp

### English Tests
- **Basic Test**: 50 questions covering levels A0 to A2.1
  - 0-20 points → A1.1
  - 21-35 points → A1.2
  - 36-50 points → A2.1
  
- **Advanced Test**: 51 questions covering levels A2.2 to C1
  - 0-10 points → A2.2
  - 11-35 points → B1
  - 36-50 points → B2
  - 51/51 points → C1 🎉

### German Tests
Similar structure with basic and advanced placement tests.

## 🛠️ Tech Stack

- **Vite** - Fast build tool and dev server
- **React 19** - UI library
- **TypeScript** - Type-safe JavaScript
- **React Router** - Client-side routing
- **Vitest** - Testing framework
- **React Testing Library** - Component testing utilities
- **Express + Nodemailer** - Email sending backend
- **Netlify Functions** - Serverless deployment

## 📦 Installation

```bash
# Clone the repository
git clone <repository-url>
cd projektJezyki_testyPoziomujace

# Install dependencies
npm install
```

## 🚀 Available Scripts

### Development
```bash
npm run dev          # Start development server
npm run mail-server  # Start local mail server (Express on port 3001)
```

### Building
```bash
npm run build        # Build for production
npm run preview      # Preview production build
```

### Testing
```bash
npm run test         # Run tests in watch mode
npm run test:ui      # Run tests with UI interface
npm run test:run     # Run all tests once
```

### Linting
```bash
npm run lint         # Check code for errors
```

## 📁 Project Structure

```
src/
├── App.tsx                    # Main application component with routing
├── main.tsx                   # Application entry point
├── components/
│   ├── ContactSection/        # Contact information section
│   ├── HelpSection/           # Help/FAQ section
│   ├── HeroSection/           # Landing page hero
│   ├── LanguagesSection/      # Language selection cards
│   ├── SectionWrapper/        # Reusable section container
│   ├── Test/                  # Test-related components
│   │   ├── EmailBlock.tsx     # Email input for results
│   │   ├── QuestionList.tsx   # Questions renderer
│   │   ├── ResultPanel.tsx    # Score and level display
│   │   ├── TestForm.tsx       # Main test form container
│   │   ├── TestHeader.tsx     # Test header with instructions
│   │   └── types.ts           # TypeScript interfaces
│   └── TopNav/                # Navigation bar
├── hooks/
│   └── useTestState.ts        # Custom hook for test logic
├── pages/
│   ├── EnglishTestsPage.tsx   # English placement tests
│   └── GermanTestsPage.tsx    # German placement tests
├── utils/
│   ├── sendResults.ts         # API call to send results
│   └── validation.ts          # Form validation helpers
├── styles/
│   └── animations.css         # CSS animations
├── assets/                    # Images and static assets
└── test/
    └── setup.ts               # Test configuration

server/
└── server.js                  # Express mail server

netlify/
└── functions/
    └── send-result.js         # Netlify serverless function
```

## ✉️ Email Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
# API URL (for local development)
VITE_API_BASE_URL=http://localhost:3001

# SMTP Configuration (required)
MAIL_HOST=smtp.example.com
MAIL_PORT=587
MAIL_SECURE=false
MAIL_USER=your-email@example.com
MAIL_PASS=your-password

# Optional settings
MAIL_FROM=noreply@example.com
MAIL_TO=recipient@example.com
MAIL_SUBJECT=Placement Test Result
CORS_ORIGIN=*
```

### Local Testing

1. Set up your `.env` file with SMTP credentials
2. Start the mail server: `npm run mail-server`
3. In another terminal: `npm run dev`
4. Test results will be sent via `http://localhost:3001/api/send-result`

## 🌍 Deployment (Netlify)

### Configuration
The `netlify.toml` file configures:
- Build command: `npm run build`
- Publish directory: `dist`
- Functions directory: `netlify/functions/`
- API redirect: `/api/*` → `/.netlify/functions/:splat`

### Required Environment Variables (Netlify Dashboard)
- `MAIL_HOST` - SMTP host (required)
- `MAIL_USER` - SMTP username (required)
- `MAIL_PASS` - SMTP password (required)
- `MAIL_PORT` - SMTP port (optional, default: 587)
- `MAIL_SECURE` - Use TLS (optional, default: false)
- `MAIL_FROM` - Sender email (optional)
- `MAIL_TO` - Recipient email (optional)
- `MAIL_SUBJECT` - Email subject (optional)
- `CORS_ORIGIN` - CORS origin (optional, default: *)

### Deploy Steps
1. Connect your repository to Netlify
2. Configure environment variables in Netlify dashboard
3. Deploy automatically on push, or manually with:
   ```bash
   npm run build
   netlify deploy --prod
   ```

## 🧪 Testing

The project uses Vitest with React Testing Library for component testing.

```bash
# Run tests
npm run test

# Run with coverage
npm run test -- --coverage
```

## 🌐 Internationalization (i18n)

The application supports multiple languages using `react-i18next`. Translation files are located in `src/i18n/locales/`.

Supported languages:
- 🇵🇱 Polish (default)
- 🇬🇧 English

## 📄 License

This project is private and proprietary.

## 👤 Contact

- **Joanna Adamek**
- WhatsApp: [+48 512 253 179](https://wa.me/48512253179)
- Email: [kontakt@joannaadamek.edu.pl](mailto:kontakt@joannaadamek.edu.pl)
- Website: [joannaadamek.com.pl](https://joannaadamek.com.pl)
