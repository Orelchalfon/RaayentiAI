"use client";

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from '@/i18n/routing';
import { useParams } from 'next/navigation';

const LanguageSwitcher = () => {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();

  const switchLanguage = (newLocale: string) => {
    router.push(
      // @ts-expect-error -- Next-intl routing types need pathname and params
      { pathname, params },
      { locale: newLocale }
    );
  };

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => switchLanguage('en')}
        className={`px-2 py-1 rounded text-sm font-medium transition-colors ${
          locale === 'en' 
            ? 'bg-primary text-white' 
            : 'text-gray-600 hover:text-primary'
        }`}
      >
        EN
      </button>
      <button
        onClick={() => switchLanguage('he')}
        className={`px-2 py-1 rounded text-sm font-medium transition-colors ${
          locale === 'he' 
            ? 'bg-primary text-white' 
            : 'text-gray-600 hover:text-primary'
        }`}
      >
        עב
      </button>
    </div>
  );
};

export default LanguageSwitcher;