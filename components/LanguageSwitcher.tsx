"use client";

import { useLanguage } from "@/locales/I18nProvider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function LanguageSwitcher() {
  const { locale, setLocale } = useLanguage();

  return (
    <Select value={locale} onValueChange={(val) => setLocale(val as any)}>
      <SelectTrigger className='input w-[140px]'>
        <SelectValue placeholder='Language' />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value='en'>English (EN)</SelectItem>
        <SelectItem value='he'>עברית (HE)</SelectItem>
      </SelectContent>
    </Select>
  );
}


