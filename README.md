# TutorAI - Multilingual AI Tutoring Platform

A Next.js application that provides real-time AI tutoring sessions with voice interaction, now supporting both English and Hebrew languages.

## 🌍 Language Support

TutorAI now supports **Hebrew** language alongside English, providing a truly multilingual learning experience:

- **Full UI Translation**: All interface elements are translated to Hebrew
- **RTL Support**: Proper right-to-left layout for Hebrew users
- **Voice AI in Hebrew**: AI tutors that speak and understand Hebrew
- **Hebrew Speech Recognition**: Voice input processing in Hebrew
- **Localized Content**: Subject names, companion descriptions, and system messages in Hebrew

## ✨ Features

### Core Features
- Interactive AI tutoring companions for various subjects
- Real-time voice conversations with AI tutors
- Subject-specific learning sessions (Math, Science, Language, History, Coding, Economics)
- User progress tracking and session history
- Responsive design for all devices

### Language Features
- **Bilingual Interface**: Seamless switching between English (EN) and Hebrew (עב)
- **Culturally Adapted Content**: Hebrew translations that feel natural to native speakers
- **RTL Layout Support**: Proper text direction and layout for Hebrew
- **Voice AI Multilingual**: Uses ElevenLabs Multilingual v2 for Hebrew voice synthesis
- **Speech Recognition**: Deepgram with Hebrew language support

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- pnpm (recommended) or npm
- Clerk account for authentication
- Vapi AI account for voice interactions
- Supabase account for database

### Environment Variables
Create a `.env.local` file with:

```env
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key

# Vapi AI for Voice Interactions  
NEXT_PUBLIC_VAPI_WEB_TOKEN=your_vapi_token

# Supabase Database
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd tutor-ai

# Install dependencies
pnpm install

# Run development server
pnpm dev
```

Visit [http://localhost:3000](http://localhost:3000) to see the application.

## 🌐 Language Implementation Details

### How Hebrew Support Works

#### 1. **Internationalization (i18n) with next-intl**
- Uses `next-intl` for robust internationalization
- Locale-based routing with `/en` and `/he` prefixes
- Dynamic message loading based on user's language preference

#### 2. **Voice AI Configuration**
- **ElevenLabs Integration**: Uses Multilingual v2 model supporting Hebrew
- **Deepgram Speech Recognition**: Configured for Hebrew language input
- **Dynamic Language Selection**: AI model adapts based on user's locale
- **Hebrew Voice Synthesis**: Natural-sounding Hebrew voices for tutoring

#### 3. **RTL (Right-to-Left) Support**
- CSS styling for proper Hebrew text direction
- Layout adjustments for RTL languages
- Navbar and component positioning optimized for Hebrew

#### 4. **Content Localization**
- All UI text translated to Hebrew
- Subject names and descriptions localized
- AI tutor personas adapted for Hebrew-speaking users
- System prompts and messages in Hebrew

### File Structure for Languages

```
├── messages/
│   ├── en.json          # English translations
│   └── he.json          # Hebrew translations
├── i18n/
│   ├── request.ts       # i18n configuration
│   └── routing.ts       # Locale routing setup
├── app/
│   ├── [locale]/        # Locale-based routing
│   │   ├── layout.tsx   # Locale-specific layout
│   │   ├── page.tsx     # Home page with translations
│   │   └── ...          # Other pages
│   └── globals.css      # RTL support styles
```

### Voice AI Hebrew Configuration

The application automatically configures the AI assistant based on the user's language:

```typescript
// Hebrew AI Configuration
const configureAssistant = (voice, style, locale, firstMessage, systemPrompt) => {
  return {
    transcriber: {
      language: locale === 'he' ? 'he' : 'en'  // Hebrew speech recognition
    },
    model: {
      messages: [{
        role: "system",
        content: systemPrompt + (locale === 'he' ? 'Respond in Hebrew.' : '')
      }]
    }
  }
}
```

## 🎯 Usage

### Switching Languages
1. Look for the language switcher in the top navigation
2. Click **EN** for English or **עב** for Hebrew  
3. The entire interface will update, including:
   - Navigation menu
   - Page content
   - Companion names and descriptions
   - Button text and system messages

### Starting a Hebrew Session
1. Switch to Hebrew language (עב)
2. Select a learning companion
3. Click "התחל שיעור" (Start Session)
4. Speak in Hebrew - the AI will understand and respond in Hebrew

## 🛠 Technical Architecture

### Language Switching Flow
1. **User clicks language toggle** → Updates URL with locale
2. **Middleware processes locale** → Validates and sets language context
3. **Layout renders with locale** → Loads appropriate translation messages  
4. **Components use translations** → Display content in selected language
5. **Voice AI configures language** → Sets Hebrew speech recognition and synthesis

### Key Technologies
- **Next.js 15** with App Router
- **next-intl** for internationalization
- **Tailwind CSS** with RTL support
- **Clerk** for authentication
- **Vapi AI** for voice interactions
- **ElevenLabs** for Hebrew voice synthesis
- **Deepgram** for Hebrew speech recognition

## 🎨 Customization

### Adding New Languages
1. Create translation file in `messages/[locale].json`
2. Add locale to `i18n/routing.ts`
3. Update language mapping in `lib/utils.ts`
4. Add RTL support if needed in `globals.css`

### Customizing Hebrew Content
Edit `messages/he.json` to modify:
- Companion names and descriptions
- UI text and labels
- AI tutor system prompts
- Subject names

## 📱 Mobile Support

The application is fully responsive and supports Hebrew on mobile devices:
- Touch-friendly language switcher
- RTL layout optimization for mobile
- Voice interactions work on mobile browsers
- Responsive Hebrew typography

## 🔧 Deployment

### Vercel (Recommended)
```bash
# Build and deploy
pnpm build
vercel --prod
```

### Environment Setup for Production
Ensure all environment variables are configured in your deployment platform.

## 🤝 Contributing

When contributing to Hebrew language features:
1. Test RTL layout thoroughly
2. Verify Hebrew text rendering
3. Ensure voice AI works in Hebrew
4. Check mobile responsiveness

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

## 🔮 Future Enhancements

- **More Languages**: Arabic, French, Spanish support
- **Voice Cloning**: Custom Hebrew voices for personalized tutoring
- **Advanced RTL**: Enhanced RTL support for complex layouts
- **Cultural Adaptation**: Region-specific content and teaching styles
- **Accessibility**: Enhanced screen reader support for RTL languages

Built with ❤️ for global learners
