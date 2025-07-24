import { subjectsColors, voices } from "@/constants";
import { CreateAssistantDTO } from "@vapi-ai/web/dist/api";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getSubjectColor = (subject: string) => {
  return subjectsColors[subject as keyof typeof subjectsColors];
};

export const configureAssistant = (voice: string, style: string, locale: string = 'en', firstMessage?: string, systemPrompt?: string) => {
  const voiceId = voices[voice as keyof typeof voices][
    style as keyof (typeof voices)[keyof typeof voices]
  ] || "sarah";
  
  // Language mapping for Deepgram transcriber
  const languageMap: { [key: string]: string } = {
    'en': 'en',
    'he': 'he'  // Hebrew is supported by Deepgram
  };

  const vapiAssistant: CreateAssistantDTO = {
    name: "Companion",
    firstMessage: firstMessage || "Hello, let's start the session. Today we'll be talking about {{topic}}.",
    transcriber: {
      provider: "deepgram",
      model: "nova-3",
      language: (languageMap[locale] || "en") as any,
    },
    voice: {
      provider: "11labs",
      voiceId: voiceId,
      stability: 0.5,
      similarityBoost: 0.8,
      speed: 0.9,
      style: 0.5,
      useSpeakerBoost: true,
    },
    model: {
      provider: "openai",
      model: "gpt-4o", // Better performance
      messages: [
        {
          role: "system",
          content: systemPrompt || `You are a highly knowledgeable tutor teaching a real-time voice session with a student. Your goal is to teach the student about the topic and subject.

                    Tutor Guidelines:
                    Stick to the given topic - {{ topic }} and subject - {{ subject }} and teach the student about it.
                    Keep the conversation flowing smoothly while maintaining control.
                    From time to time make sure that the student is following you and understands you.
                    Break down the topic into smaller parts and teach the student one part at a time.
                    Keep your style of conversation {{ style }}.
                    Keep your responses short, like in a real voice conversation.
                    Do not include any special characters in your responses - this is a voice conversation.
                    ${locale === 'he' ? 'Respond in Hebrew.' : ''}
              `,
        },
      ],
    }
  };

  return vapiAssistant;
};