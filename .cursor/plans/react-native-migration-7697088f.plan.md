<!-- 7697088f-275b-47df-a081-8d9a798ac434 3bda138b-36c6-44bb-a32f-314dee2851e9 -->
# RaayentiAI - React Native/Expo Migration Plan (Updated 2025)

## Phase 1: Project Initialization & Core Setup

### 1.1 Create New Expo Project with expo-stack

Use `expo-stack` for a better configured setup with TypeScript, Expo Router, and NativeWind out of the box:

```bash
pnpm create expo-stack@latest raayenti-mobile
cd raayenti-mobile
```

When prompted, select:

- ✅ TypeScript
- ✅ Expo Router
- ✅ NativeWind (v4)
- ✅ Absolute Imports

### 1.2 Install Core Dependencies

```bash
# Authentication
pnpm add @clerk/clerk-expo

# Database
pnpm add @supabase/supabase-js

# Forms & Validation
pnpm add react-hook-form @hookform/resolvers zod

# UI & Additional Styling
pnpm add react-native-svg
pnpm expo install expo-linear-gradient

# Voice & Audio (Updated for Expo SDK 52+)
pnpm expo install expo-av expo-speech
pnpm add openai      # For Whisper transcription/ChatGPT

# Animations
pnpm add react-native-reanimated
pnpm add lottie-react-native

# i18n
pnpm add react-i18next i18next

# Additional utilities (if not included by expo-stack)
pnpm add clsx class-variance-authority tailwind-merge
pnpm expo install expo-secure-store  # For Clerk token storage

# Safe area handling (already included with Expo Router setup)
# react-native-safe-area-context is NOT deprecated - it's the recommended solution
pnpm expo install react-native-safe-area-context react-native-screens
```

### 1.3 Verify Project Configuration

Expo-stack should have already configured:

- `app.json` with Expo Router plugin
- `tailwind.config.js` with NativeWind v4
- TypeScript with path aliases (@/)
- Basic `app/_layout.tsx`

Verify `app.json` includes:

```json
{
  "expo": {
    "name": "RaayentiAI",
    "slug": "raayenti-ai",
    "scheme": "raayenti",
    "plugins": ["expo-router", "expo-secure-store"],
    "experiments": {
      "typedRoutes": true
    }
  }
}
```

## Phase 2: Project Architecture Setup

### 2.1 Verify Folder Structure

Expo-stack creates a good base structure. Expand it to match the project needs:

```
app/
  _layout.tsx                 # Root layout with providers
  index.tsx                   # Home screen
  (auth)/
    sign-in.tsx              # Sign in screen
  companions/
    _layout.tsx              # Nested layout
    index.tsx                # Companions library
    [id].tsx                 # Companion session
    new.tsx                  # Create companion
  my-journey.tsx             # User profile
components/
  ui/                        # Reusable UI components
    Button.tsx
    Input.tsx
    Select.tsx
    Card.tsx
    Accordion.tsx
  CompanionCard.tsx
  CompanionComponent.tsx
  CompanionForm.tsx
  CompanionsList.tsx
  SearchInput.tsx
  SubjectFilter.tsx
lib/
  actions/
    companion.action.ts      # Supabase data layer
  supabase.ts               # Supabase client
  clerk.ts                  # Clerk utilities
  voice.ts                  # Voice AI integration
  utils.ts
locales/
  i18n.ts
  I18nProvider.tsx
  translations.ts
constants/
  index.ts
  soundwaves.json
types/
  index.d.ts
  vapi.d.ts
assets/
  icons/                    # PNG or SVG icons
  images/
```

### 2.2 Configure NativeWind v4

Expo-stack should have created `tailwind.config.js`. Verify and update:

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}"
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#fe5933",
        muted: {
          DEFAULT: "#6b7280",
          foreground: "#9ca3af"
        }
      },
    },
  },
  plugins: [],
}
```

Update `global.css` (or `app/global.css` if created by expo-stack):

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

## Phase 3: Authentication Layer

### 3.1 Setup Clerk Provider

Create `lib/clerk.ts` with token cache configuration:

```typescript
import * as SecureStore from 'expo-secure-store';
import { TokenCache } from '@clerk/clerk-expo/dist/cache';

const tokenCache: TokenCache = {
  async getToken(key: string) {
    try {
      return SecureStore.getItemAsync(key);
    } catch (err) {
      return null;
    }
  },
  async saveToken(key: string, value: string) {
    try {
      return SecureStore.setItemAsync(key, value);
    } catch (err) {
      return;
    }
  },
};

export { tokenCache };
```

### 3.2 Root Layout (`app/_layout.tsx`)

Wrap app with `ClerkProvider` and i18n provider:

```typescript
import { ClerkProvider } from '@clerk/clerk-expo';
import { Stack } from 'expo-router';
import { tokenCache } from '@/lib/clerk';
import { I18nProvider } from '@/locales/I18nProvider';
import '../global.css';

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!;

export default function RootLayout() {
  return (
    <ClerkProvider tokenCache={tokenCache} publishableKey={publishableKey}>
      <I18nProvider initialLocale="en">
        <Stack>
          <Stack.Screen name="index" options={{ title: 'Home' }} />
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          <Stack.Screen name="companions" options={{ headerShown: false }} />
          <Stack.Screen name="my-journey" options={{ title: 'My Journey' }} />
        </Stack>
      </I18nProvider>
    </ClerkProvider>
  );
}
```

### 3.3 Auth Screens

Create sign-in screen at `app/(auth)/sign-in.tsx` using Clerk's prebuilt components:

```typescript
import { useSignIn } from '@clerk/clerk-expo';
import { useRouter } from 'expo-router';
import { View, Text, Pressable } from 'react-native';
import { SignIn } from '@clerk/clerk-expo';

export default function SignInScreen() {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <SignIn />
    </View>
  );
}
```

### 3.4 Protected Routes

Create route guards using Clerk's `useAuth()` hook in screens that require authentication.

## Phase 4: Database & Data Layer

### 4.1 Supabase Client (`lib/supabase.ts`)

Adapt the existing Supabase setup for React Native with Clerk integration:

```typescript
import { createClient } from '@supabase/supabase-js';
import { useAuth } from '@clerk/clerk-expo';

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!;

export const createSupabaseClientPublic = () =>
  createClient(supabaseUrl, supabaseAnonKey);

export const createSupabaseClientAuth = async () => {
  const { getToken } = useAuth();
  const token = await getToken();
  
  return createClient(supabaseUrl, supabaseAnonKey, {
    global: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  });
};
```

### 4.2 Migrate Actions (`lib/actions/companion.action.ts`)

Port all server actions to work in React Native context. Remove `'use server'` directive and adapt:

- `CreateCompanion` - Create new AI companion
- `GetAllCompanions` - Fetch companions with filters
- `GetCompanion` - Fetch single companion by ID
- `AddToSessionHistory` - Track session completion
- `GetRecentSessions` - Fetch recent learning sessions
- `getUserSessions` - User-specific sessions
- `getUserCompanions` - User-created companions
- `addBookmark` / `removeBookmark` - Bookmark management
- `getBookmarkedCompanions` - Fetch bookmarked companions

## Phase 5: Voice AI Integration

### 5.1 Voice Service (`lib/voice.ts`)

Create comprehensive voice management service to replace Vapi web SDK:

```typescript
import { Audio } from 'expo-av';
import * as Speech from 'expo-speech';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.EXPO_PUBLIC_OPENAI_API_KEY,
});

export class VoiceService {
  private recording: Audio.Recording | null = null;
  private isRecording: boolean = false;
  
  // Start audio recording
  async startRecording() { /* ... */ }
  
  // Stop recording and get audio file
  async stopRecording() { /* ... */ }
  
  // Transcribe audio using Whisper
  async transcribeAudio(audioUri: string) { /* ... */ }
  
  // Generate AI response using ChatGPT
  async generateResponse(transcript: string, context: any) { /* ... */ }
  
  // Synthesize speech from text
  async synthesizeSpeech(text: string, voice: string) { /* ... */ }
  
  // Full conversation flow
  async handleConversationTurn(audioUri: string, context: any) { /* ... */ }
}
```

Key functions to implement:

- `startRecording()` - Use `expo-av` Audio.Recording
- `stopRecording()` - Stop and get audio file URI
- `transcribeAudio()` - Send to OpenAI Whisper API
- `synthesizeSpeech()` - Use `expo-speech` or ElevenLabs
- `generateResponse()` - Send to OpenAI ChatGPT with companion context
- Event emitters for status updates (like Vapi)

### 5.2 Replace Vapi Integration in CompanionComponent

Adapt `components/CompanionComponent.tsx` to use new `VoiceService` instead of `@vapi-ai/web`.

## Phase 6: Navigation & Routing

### 6.1 Configure Expo Router

Expo-stack has already set up file-based routing. Verify structure:

- `app/index.tsx` - Home
- `app/(auth)/sign-in.tsx` - Authentication
- `app/companions/index.tsx` - Companions library
- `app/companions/[id].tsx` - Session with dynamic route
- `app/companions/new.tsx` - Create companion
- `app/my-journey.tsx` - User profile

### 6.2 Navigation Component

Create mobile-friendly navigation using Expo Router tabs or custom header:

Option A: Tab Navigation (create `app/(tabs)/_layout.tsx`)

Option B: Header with drawer (implement in `_layout.tsx`)

### 6.3 Deep Linking

Configure in `app.json`:

```json
{
  "expo": {
    "scheme": "raayenti",
    "android": {
      "intentFilters": [
        {
          "action": "VIEW",
          "data": [{ "scheme": "raayenti" }]
        }
      ]
    }
  }
}
```

Test deep links: `raayenti://companions/[id]`

## Phase 7: UI Components Migration

### 7.1 Core UI Components (`components/ui/`)

Rebuild shadcn-style components for React Native using NativeWind:

**Button.tsx** - Using Pressable:

```typescript
import { Pressable, Text } from 'react-native';
import { cva } from 'class-variance-authority';

const buttonVariants = cva("items-center justify-center rounded-lg", {
  variants: {
    variant: { default: "bg-primary", outline: "border border-primary" },
    size: { default: "px-4 py-2", lg: "px-6 py-3" }
  }
});
```

**Input.tsx** - Using TextInput

**Select.tsx** - Using @react-native-picker/picker or custom modal

**Card.tsx** - Using View with shadow/border styling

**Accordion.tsx** - Using Collapsible or Animated.View

### 7.2 Feature Components

Migrate and adapt with React Native equivalents:

- `CompanionCard.tsx` - Pressable card with Image, use FlatList
- `CompanionsList.tsx` - FlatList with companion items
- `CompanionForm.tsx` - ScrollView with form inputs and react-hook-form
- `SearchInput.tsx` - TextInput with search icon overlay
- `SubjectFilter.tsx` - Custom filter dropdown/modal
- `LanguageSwitcher.tsx` - Picker or segmented control

### 7.3 Convert SVG Icons

Convert SVG icons to React Native:

Option A: Use `react-native-svg` to render inline SVG

Option B: Convert to PNG assets (easier but less flexible)

Option C: Use icon libraries like `@expo/vector-icons`

## Phase 8: Screen/Page Migration

### 8.1 Home Screen (`app/index.tsx`)

Port `app/page.tsx` to React Native:

```typescript
import { ScrollView, View, Text } from 'react-native';
import { useEffect, useState } from 'react';
import CompanionCard from '@/components/CompanionCard';
import { GetAllCompanions, GetRecentSessions } from '@/lib/actions/companion.action';

export default function HomeScreen() {
  const [companions, setCompanions] = useState([]);
  const [recentSessions, setRecentSessions] = useState([]);
  
  useEffect(() => {
    // Fetch data
  }, []);
  
  return (
    <ScrollView className="flex-1 bg-white">
      <View className="p-4">
        <Text className="text-2xl font-bold">Popular Companions</Text>
        {/* FlatList of companions */}
      </View>
    </ScrollView>
  );
}
```

Key changes:

- Replace `<main>` with `<ScrollView>`
- Replace `<section>` with `<View>`
- Replace `<h1>` with `<Text>` with styling
- Use FlatList for lists
- Convert async server components to useEffect + useState

### 8.2 Companions Library (`app/companions/index.tsx`)

Port `app/companions/page.tsx`:

```typescript
import { FlatList, View } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import CompanionCard from '@/components/CompanionCard';
import SearchInput from '@/components/SearchInput';
import SubjectFilter from '@/components/SubjectFilter';

export default function CompanionsLibrary() {
  const { subject, topic } = useLocalSearchParams();
  
  return (
    <View className="flex-1">
      <View className="flex-row p-4 gap-2">
        <SearchInput />
        <SubjectFilter />
      </View>
      <FlatList
        data={companions}
        renderItem={({ item }) => <CompanionCard {...item} />}
        numColumns={2}
        refreshControl={/* pull-to-refresh */}
      />
    </View>
  );
}
```

Features:

- Search and filter functionality
- Grid layout using `numColumns={2}`
- Pull-to-refresh with RefreshControl

### 8.3 Companion Session (`app/companions/[id].tsx`)

Port `app/companions/[id]/page.tsx` with voice interaction:

```typescript
import { View, Text, Pressable, Image } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import CompanionComponent from '@/components/CompanionComponent';
import { useUser } from '@clerk/clerk-expo';

export default function CompanionSession() {
  const { id } = useLocalSearchParams();
  const { user } = useUser();
  
  return (
    <View className="flex-1 p-4">
      {/* Companion header card */}
      <CompanionComponent
        companionId={id}
        userName={user?.firstName}
        userImage={user?.imageUrl}
        // ... other props
      />
    </View>
  );
}
```

Key features:

- Voice interaction UI with mic button
- Real-time transcription display (ScrollView with reversed)
- Animated companion avatar using Lottie
- Call status indicators

### 8.4 Create Companion (`app/companions/new.tsx`)

Port `app/companions/new/page.tsx`:

```typescript
import { ScrollView, View } from 'react-native';
import CompanionForm from '@/components/CompanionForm';
import { newCompanionPermissions } from '@/lib/actions/companion.action';

export default function NewCompanion() {
  const [hasPermission, setHasPermission] = useState(false);
  
  // Check permissions on mount
  useEffect(() => {
    checkPermissions();
  }, []);
  
  if (!hasPermission) {
    return <LimitReachedView />;
  }
  
  return (
    <ScrollView className="flex-1 p-4">
      <CompanionForm />
    </ScrollView>
  );
}
```

Features:

- Multi-field form with validation (react-hook-form + zod)
- Subject/voice/style pickers using custom Select components
- Permission checks with upgrade CTA

### 8.5 User Profile (`app/my-journey.tsx`)

Port `app/my-journey/page.tsx`:

```typescript
import { ScrollView, View, Text, Image } from 'react-native';
import { useUser } from '@clerk/clerk-expo';
import { useState, useEffect } from 'react';
import Accordion from '@/components/ui/Accordion';
import CompanionsList from '@/components/CompanionsList';

export default function MyJourneyScreen() {
  const { user } = useUser();
  const [stats, setStats] = useState({ sessions: 0, companions: 0 });
  
  return (
    <ScrollView className="flex-1 p-4">
      <View className="flex-row items-center gap-4 mb-6">
        <Image source={{ uri: user?.imageUrl }} className="w-24 h-24 rounded-full" />
        <View>
          <Text className="text-2xl font-bold">{user?.firstName} {user?.lastName}</Text>
          <Text className="text-gray-500">{user?.emailAddresses[0]?.emailAddress}</Text>
        </View>
      </View>
      
      {/* Stats cards */}
      <View className="flex-row gap-4 mb-6">
        <StatCard icon="check" value={stats.sessions} label="Lessons Completed" />
        <StatCard icon="cap" value={stats.companions} label="Companions Created" />
      </View>
      
      {/* Accordion sections */}
      <Accordion>
        {/* Bookmarks, Recent Sessions, My Companions */}
      </Accordion>
    </ScrollView>
  );
}
```

Features:

- User profile with stats
- Collapsible accordion sections
- FlatList for each data section

## Phase 9: Internationalization

### 9.1 Setup i18n for React Native

Create `locales/i18n.ts`:

```typescript
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { translations } from './translations';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: translations.en },
      he: { translation: translations.he },
      ar: { translation: translations.ar },
    },
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
export const t = (key: string) => i18n.t(key);
```

### 9.2 Create I18n Provider

Port `locales/I18nProvider.tsx`:

```typescript
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';

export function I18nProvider({ children, initialLocale = 'en' }) {
  useEffect(() => {
    i18n.changeLanguage(initialLocale);
  }, [initialLocale]);
  
  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}
```

### 9.3 Port Translations

Copy the existing `locales/translations.ts` structure (already compatible).

Use in components:

```typescript
import { useTranslation } from 'react-i18next';

const { t } = useTranslation();
```

## Phase 10: Styling & Polish

### 10.1 Theme Configuration

Define color scheme in `tailwind.config.js` (already done in Phase 2.2).

Create theme constants in `constants/theme.ts`:

```typescript
export const colors = {
  primary: '#fe5933',
  subjects: {
    science: '#E5D0FF',
    maths: '#FFDA6E',
    language: '#BDE7FF',
    coding: '#FFC8E4',
    history: '#FFECC8',
    economics: '#C8FFDF',
  },
};

export const spacing = { /* ... */ };
export const typography = { /* ... */ };
```

### 10.2 Dark Mode Support (Optional)

Use `expo-system-ui` or `react-native-appearance` for dark mode if needed.

### 10.3 Responsive Design

Test on various screen sizes:

- Use `className="max-sm:flex-col"` style responsive utilities with NativeWind
- Test on phone and tablet simulators
- Use `useWindowDimensions()` for dynamic sizing

### 10.4 Animations

**Lottie animations:**

```typescript
import LottieView from 'lottie-react-native';

<LottieView
  ref={animationRef}
  source={require('@/constants/soundwaves.json')}
  autoPlay={false}
  loop
/>
```

**Reanimated transitions:**

```typescript
import Animated, { FadeIn, SlideInRight } from 'react-native-reanimated';

<Animated.View entering={FadeIn}>
  {/* content */}
</Animated.View>
```

## Phase 11: Environment Setup & Testing

### 11.1 Environment Variables

Create `.env` file:

```env
EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
EXPO_PUBLIC_SUPABASE_URL=https://...supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=eyJh...
EXPO_PUBLIC_OPENAI_API_KEY=sk-...
```

Install dotenv support:

```bash
pnpm add expo-env
```

### 11.2 Testing

- Test all screens and navigation flows
- Verify voice recording/playback on real device (not simulator for audio)
- Test authentication flow (sign in, sign out, protected routes)
- Validate all forms and error handling
- Test deep linking
- Test on both iOS and Android

Run the app:

```bash
pnpm start
# Then press 'i' for iOS or 'a' for Android
```

### 11.3 Build Configuration

For production builds, configure `eas.json`:

```bash
pnpm add -D eas-cli
pnpm eas build:configure
```

Create `eas.json`:

```json
{
  "build": {
    "preview": {
      "ios": { "simulator": true },
      "android": { "buildType": "apk" }
    },
    "production": {
      "ios": { "buildType": "release" },
      "android": { "buildType": "app-bundle" }
    }
  }
}
```

## Key Migration Notes

### Voice AI Architecture

Since Vapi's web SDK won't work in React Native, implement custom voice solution:

1. **Record user audio** - Use `expo-av` Audio.Recording API
2. **Transcribe to text** - Send audio file to OpenAI Whisper API
3. **Generate AI response** - Send transcript + companion context to OpenAI ChatGPT
4. **Synthesize speech** - Use `expo-speech` or ElevenLabs API for voice
5. **Play audio response** - Use `expo-av` Sound API

This replaces the single Vapi SDK call with a multi-step pipeline but gives more control.

### Supabase Integration

✅ Keep existing table structure and queries - they work perfectly with React Native.

The `createSupabaseClientAuth()` function needs to be adapted to get Clerk token asynchronously.

### Clerk Authentication

✅ Use Clerk's Expo SDK (`@clerk/clerk-expo`) which handles token management automatically with `expo-secure-store`.

Key differences from Next.js:

- Use `useAuth()` hook instead of `auth()` server function
- Use `useUser()` hook instead of `currentUser()`
- Token cache is required with SecureStore

### Critical File Mappings

| Next.js (Web) | Expo Router (Mobile) |

|---------------|---------------------|

| `app/layout.tsx` | `app/_layout.tsx` |

| `app/page.tsx` | `app/index.tsx` |

| `app/companions/page.tsx` | `app/companions/index.tsx` |

| `app/companions/[id]/page.tsx` | `app/companions/[id].tsx` |

| Server actions (`'use server'`) | Regular async functions (client-side) |

### Styling Approach

Use **NativeWind v4** (Tailwind for RN) to maintain similar class-based styling from web version.

Key differences:

- No arbitrary values: use theme config instead
- No pseudo-classes like `:hover` (use Pressable states)
- Some utilities work differently (flexbox, positioning)

### Assets Handling

**SVG Icons:**

- Option 1: Use `react-native-svg` with SVGR to convert SVGs to components
- Option 2: Export as PNG @2x, @3x for retina displays
- Option 3: Use icon fonts or `@expo/vector-icons`

**Images:**

- Store in `assets/images/` directory
- Reference with `require()` or `Image.resolveAssetSource()`

### Safe Area Context

**IMPORTANT**: `react-native-safe-area-context` is **NOT deprecated**. It is the **recommended solution** for handling safe areas in React Native and is actively maintained. The old `SafeAreaView` from React Native core is what was deprecated in favor of this library.

Always wrap screens with `SafeAreaView` from `react-native-safe-area-context`:

```typescript
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Screen() {
  return (
    <SafeAreaView className="flex-1">
      {/* content */}
    </SafeAreaView>
  );
}
```

### Package Manager

This plan uses **pnpm** throughout for consistency and performance benefits:

- Faster installs
- Disk space efficient
- Strict dependency management

Commands:

- `pnpm add <package>` - Add dependency
- `pnpm add -D <package>` - Add dev dependency
- `pnpm expo install <package>` - Install Expo-compatible version
- `pnpm start` - Start Expo dev server

### To-dos

- [ ] Initialize Expo project using pnpm create expo-stack@latest with TypeScript, Expo Router, and NativeWind
- [ ] Install all core dependencies (Clerk, Supabase, voice packages) using pnpm
- [ ] Verify project folder structure and configurations (app.json, tailwind.config.js)
- [ ] Implement Clerk authentication with SecureStore token cache and root layout provider
- [ ] Create Supabase clients (public and auth) and port all data actions from lib/actions/
- [ ] Rebuild UI components (Button, Input, Select, Card, Accordion) for React Native with NativeWind
- [ ] Build voice AI service with expo-av, expo-speech, and OpenAI integration to replace Vapi
- [ ] Port home screen with FlatList for companions and recent sessions
- [ ] Build companions library screen with search, filters, and grid layout
- [ ] Build companion session screen with voice interaction, Lottie animations, and real-time transcription
- [ ] Build create companion form screen with react-hook-form validation and permission checks
- [ ] Build user profile/journey screen with stats cards and collapsible accordion sections
- [ ] Configure i18n with react-i18next and port existing translations structure
- [ ] Convert SVG icons to react-native-svg components or PNG alternatives
- [ ] Test all features on iOS and Android, fix bugs, and polish UI/animations