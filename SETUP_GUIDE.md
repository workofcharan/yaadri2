# YAADRI Setup & Deployment Guide

## Quick Start (Development)

### Prerequisites
- Node.js 18.x or higher
- npm or yarn
- A modern web browser

### Installation

1. **Create React App with Vite (Fast)**
```bash
npm create vite@latest yaadri -- --template react
cd yaadri
npm install
```

2. **Install Dependencies**
```bash
npm install react-router-dom lucide-react axios
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

3. **Configure Tailwind** (in `tailwind.config.js`)
```javascript
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        amber: {
          50: '#FAF8F3',
          700: '#B45309',
          900: '#78350F',
        },
        rose: {
          50: '#FDF2F8',
          400: '#F472B6',
          600: '#E11D48',
        },
        emerald: {
          400: '#34D399',
          500: '#10B981',
          600: '#059669',
        },
        teal: {
          50: '#F0FDFA',
          400: '#2DD4BF',
        },
      },
      fontFamily: {
        serif: ['Georgia', 'serif'],
      },
      borderRadius: {
        '3xl': '24px',
      },
    },
  },
  plugins: [],
}
```

4. **Copy Component**
- Replace `src/App.jsx` with the `yaadri-app.jsx` content provided
- Update `src/main.jsx`:

```javascript
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
```

5. **Configure CSS** (in `src/index.css`)
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  body {
    @apply bg-white text-gray-900;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
}

/* Animations */
@keyframes fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}

.animate-fade-in {
  animation: fade-in 0.8s ease-in;
}

.animation-delay-1 {
  animation-delay: 0.2s;
}

.animation-delay-2 {
  animation-delay: 0.4s;
}

/* Reduce motion for accessibility */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

6. **Run Development Server**
```bash
npm run dev
```

The app will be available at `http://localhost:5173`

---

## Project Structure

```
yaadri/
├── public/
│   └── index.html
├── src/
│   ├── App.jsx              # Main application component
│   ├── main.jsx             # Entry point
│   ├── index.css            # Global styles
│   └── utils/               # Helper functions (add as needed)
├── package.json
├── vite.config.js
├── tailwind.config.js
└── postcss.config.js
```

---

## Configuration Files

### `vite.config.js`
```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    open: true,
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
  },
})
```

### `postcss.config.js`
```javascript
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

---

## Development Features

### Hot Module Replacement
Changes to code are reflected instantly without page reload.

### Responsive Testing
- Test on mobile: `npm run dev` then visit from phone on same network
- Use browser dev tools device emulation (DevTools → Device Mode)

### Performance Profiling
```bash
# Analyze bundle size
npm run build
npm install -g http-server
http-server ./dist
```

---

## Environment Variables (Future)

Create `.env` file for configuration:

```bash
# .env (local, not committed)
VITE_API_URL=http://localhost:3000/api
VITE_SUPABASE_URL=your-supabase-url
VITE_SUPABASE_ANON_KEY=your-anon-key
VITE_LANGUAGE=en
```

Access in app:
```javascript
const apiUrl = import.meta.env.VITE_API_URL
```

---

## Production Build

### Optimize for Production
```bash
npm run build
```

This creates a `dist/` folder with:
- Minified JavaScript
- Optimized CSS
- Optimized assets
- Source maps (optional)

### Deploy to Vercel (Easiest)

1. **Install Vercel CLI**
```bash
npm install -g vercel
```

2. **Deploy**
```bash
vercel
```

3. **Follow prompts** to connect GitHub and configure

### Deploy to Netlify

1. **Build locally**
```bash
npm run build
```

2. **Connect to Netlify**
- Drag `dist/` folder to [netlify.com](https://netlify.com)
- Or use Netlify CLI

3. **Continuous Deployment**
- Connect GitHub repo
- Auto-deploy on push

### Deploy to AWS (Static S3 + CloudFront)

```bash
# Build
npm run build

# Install AWS CLI
pip install awscli

# Deploy
aws s3 sync dist/ s3://yaadri-bucket/ --delete
aws cloudfront create-invalidation --distribution-id YOUR_ID --paths "/*"
```

### Deploy to Docker

Create `Dockerfile`:
```dockerfile
FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

Build and run:
```bash
docker build -t yaadri .
docker run -p 3000:80 yaadri
```

---

## Testing

### Unit Testing Setup

1. **Install Vitest**
```bash
npm install -D vitest @testing-library/react @testing-library/jest-dom
```

2. **Create test** (`src/utils/__tests__/translations.test.js`)
```javascript
import { describe, it, expect } from 'vitest'
import { translations } from '../../data/translations'

describe('Translations', () => {
  it('should have English and Assamese', () => {
    expect(translations.en).toBeDefined()
    expect(translations.as).toBeDefined()
  })

  it('should translate greeting', () => {
    const greeting = translations.en.goodMorning
    expect(greeting).toContain('Good Morning')
  })
})
```

3. **Run tests**
```bash
npm run test
```

---

## Performance Monitoring

### Lighthouse Audit
```bash
# Chrome DevTools
1. Open DevTools (F12)
2. Go to Lighthouse tab
3. Click "Analyze page load"
```

Target scores:
- Performance: > 90
- Accessibility: > 95
- Best Practices: > 90
- SEO: > 90

### Web Vitals
```javascript
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals'

getCLS(console.log)
getFID(console.log)
getFCP(console.log)
getLCP(console.log)
getTTFB(console.log)
```

---

## Accessibility Testing

### Browser Extensions
- WAVE (WebAIM)
- axe DevTools
- Lighthouse (built-in)

### Manual Testing
- Keyboard navigation (Tab, Enter, Escape)
- Screen reader (NVDA on Windows, VoiceOver on Mac)
- Color contrast checker
- Text scaling (Cmd/Ctrl + +)

### Checklist
- ✅ All buttons keyboard accessible
- ✅ Focus visible on all interactive elements
- ✅ Color contrast ratio 4.5:1 minimum
- ✅ Text at least 16px
- ✅ Touch targets 44-48px minimum
- ✅ Semantic HTML (h1, button, etc.)
- ✅ ARIA labels for complex components
- ✅ Prefers-reduced-motion respected

---

## Debugging

### VS Code Setup

1. **Install Debugger for Chrome**
```
Cmd+Shift+P → Install Extension → Debugger for Chrome
```

2. **Create `.vscode/launch.json`**
```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "chrome",
      "request": "launch",
      "name": "Launch Chrome",
      "url": "http://localhost:5173",
      "webRoot": "${workspaceFolder}/src",
      "sourceMapPathOverride": {
        "webpack:///src/*": "${workspaceRoot}/src/*"
      }
    }
  ]
}
```

3. **Start debugging**
- Set breakpoints in code
- Press F5 to start debugging

### React DevTools

1. **Install extension** from Chrome Web Store
2. Open DevTools → Components tab
3. Inspect component tree
4. Edit props in real-time

### Console Logging
```javascript
// Debug Memory Rescue flow
console.log('Stage:', stage)
console.log('Selected:', selected)
console.log('Is Correct:', isCorrect)
```

---

## Common Issues & Solutions

### Issue: Port 5173 already in use
**Solution**:
```bash
# Kill process using port
lsof -ti:5173 | xargs kill -9

# Or use different port
npm run dev -- --port 3000
```

### Issue: Tailwind styles not applying
**Solution**:
1. Check `tailwind.config.js` content paths
2. Restart dev server
3. Clear browser cache (Cmd+Shift+Delete)

### Issue: Images/emojis not displaying
**Solution**:
1. For emojis: Use directly in JSX (no file needed)
2. For images: Ensure file path is correct
3. Use `import` for images:
```javascript
import familyPhoto from './assets/family.jpg'
<img src={familyPhoto} alt="Family" />
```

### Issue: Mobile doesn't work on `localhost`
**Solution**:
```bash
# Find your machine's local IP
# macOS: ifconfig | grep inet
# Windows: ipconfig | findstr IPv4

# Access from phone: http://YOUR_IP:5173
```

### Issue: Slow bundle
**Solution**:
```bash
# Analyze bundle
npm install -D rollup-plugin-visualizer
# Add to vite.config.js, then check dist/stats.html
```

---

## Migration to Backend (When Ready)

### Step 1: Create Backend (Node.js + Supabase)

```javascript
// backend/server.js
import express from 'express'
import { createClient } from '@supabase/supabase-js'

const app = express()
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
)

app.get('/api/patient/:id', async (req, res) => {
  const { data, error } = await supabase
    .from('patients')
    .select('*')
    .eq('id', req.params.id)
  res.json(data)
})

app.post('/api/activity', async (req, res) => {
  const { error } = await supabase
    .from('activities')
    .insert([req.body])
  res.json({ success: !error })
})

app.listen(3000)
```

### Step 2: Update Frontend to Use API

```javascript
// In App.jsx
const fetchPatient = async () => {
  const response = await fetch('/api/patient/patient_001')
  const patient = await response.json()
  setPatientData(patient)
}

const logActivity = async (activity) => {
  await fetch('/api/activity', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(activity)
  })
}
```

### Step 3: Environment Setup
```bash
# .env.local
VITE_API_URL=http://localhost:3000/api
```

---

## Monitoring & Analytics (Production)

### Add Error Tracking (Sentry)

```bash
npm install @sentry/react
```

```javascript
import * as Sentry from "@sentry/react"

Sentry.init({
  dsn: "YOUR_SENTRY_DSN",
  environment: "production",
  tracesSampleRate: 0.1,
})

export default Sentry.withProfiler(App)
```

### Add Analytics (Plausible)

```html
<script defer data-domain="yaadri.app" src="https://plausible.io/js/script.js"></script>
```

Or use Google Analytics:
```bash
npm install @react-ga/react-ga
```

---

## Version Control (Git)

### Initial Setup
```bash
git init
git add .
git commit -m "Initial YAADRI commit"
git remote add origin https://github.com/your-org/yaadri.git
git push -u origin main
```

### Branching Strategy
```bash
# Feature development
git checkout -b feature/face-recognition-game
# ... make changes ...
git commit -m "Add face recognition game"
git push origin feature/face-recognition-game
# Create PR, merge to main

# Hotfixes
git checkout -b hotfix/translation-fix
# ... fix ...
git commit -m "Fix Assamese translation"
git push origin hotfix/translation-fix
```

### `.gitignore`
```
node_modules/
.env.local
.env.*.local
dist/
build/
*.log
.DS_Store
```

---

## CI/CD Pipeline (GitHub Actions)

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy YAADRI

on:
  push:
    branches: [main]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run tests
        run: npm run test
      
      - name: Build
        run: npm run build
      
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
```

---

## Backup & Disaster Recovery

### Database Backups (Future Supabase)
```bash
# Automated daily backups via Supabase
# Manual backup:
supabase db dump -f backup.sql
```

### Data Export
```bash
# Export all patient data
supabase db dump --data-only -f data_export.sql
```

---

## Performance Optimization Tips

1. **Code Splitting**
```javascript
const PatientMode = React.lazy(() => import('./PatientMode'))
<Suspense fallback={<Loading />}>
  <PatientMode />
</Suspense>
```

2. **Image Optimization**
- Use WebP format
- Compress images (TinyPNG, Squoosh)
- Use proper dimensions

3. **Lazy Loading**
```javascript
const LivingMemoryGraph = React.lazy(() => import('./LivingMemoryGraph'))
```

4. **CSS Minification**
- Tailwind automatically purges unused CSS
- Production build is optimized

---

## Support & Resources

### Documentation
- [React Docs](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Vite Guide](https://vitejs.dev/guide/)

### Community
- GitHub Issues
- Discord/Slack community (setup later)
- Stack Overflow

### Performance Tools
- [PageSpeed Insights](https://pagespeed.web.dev)
- [WebPageTest](https://webpagetest.org)
- [GTmetrix](https://gtmetrix.com)

---

## Scaling to Production Checklist

- ✅ Environment configuration
- ✅ Error handling & logging
- ✅ Rate limiting
- ✅ CORS configuration
- ✅ SSL/HTTPS
- ✅ CDN setup
- ✅ Database indexing
- ✅ Cache strategy
- ✅ Monitoring alerts
- ✅ Incident response plan

---

This guide should cover everything needed to run, develop, and deploy YAADRI. Start with the Quick Start section and refer back as needed.
