"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { subjects } from "@/constants";
import { CreateCompanion } from "@/lib/actions/companion.action";
import { redirect } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Textarea } from "./ui/textarea";
import { t } from "@/locales/i18n";

const formSchema = z.object({
  name: z.string().min(2, { message: t("forms.companion.name.required") }),
  subject: z.string().min(2, { message: t("forms.companion.subject.required") }),
  topic: z.string().min(2, { message: t("forms.companion.topic.required") }),
  voice: z.string().min(2, { message: t("forms.companion.voice.required") }),
  style: z.string().min(2, { message: t("forms.companion.style.required") }),
  student: z.string().min(2, { message: t("forms.companion.student.required") }),
  duration: z.coerce.number().min(2, { message: t("forms.companion.duration.required") }),
});

const CompanionForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      subject: "",
      topic: "",
      voice: "",
      style: "",
      student: "",
      duration: 15,
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.

    const companion = await CreateCompanion(values);
    if (!companion) {
      redirect("/");
    }
    redirect(`/companions/${companion.id}`);
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6 pb-6 '>
        <FormField
          control={form.control}
          name='name'
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("forms.companion.name.label")}</FormLabel>
              <FormControl>
                <Input
                  placeholder={t("forms.companion.name.placeholder")}
                  {...field}
                  className='input'
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='subject'
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("forms.companion.subject.label")}</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  value={field.value}
                  defaultValue={field.value}>
                  <SelectTrigger className='input capitalize'>
                    <SelectValue placeholder={t("forms.companion.subject.placeholder")} />
                  </SelectTrigger>
                  <SelectContent>
                    {subjects.map((subject) => (
                      <SelectItem
                        value={subject}
                        key={subject}
                        className='capitalize'>
                        {subject}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='topic'
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("forms.companion.topic.label")}</FormLabel>
              <FormControl>
                <Textarea
                  placeholder={t("forms.companion.topic.placeholder")}
                  {...field}
                  className='input'
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='voice'
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("forms.companion.voice.label")}</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  value={field.value}
                  defaultValue={field.value}>
                  <SelectTrigger className='input'>
                    <SelectValue placeholder={t("forms.companion.voice.placeholder")} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='male'>{t("forms.companion.options.voice.male")}</SelectItem>
                    <SelectItem value='female'>{t("forms.companion.options.voice.female")}</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='style'
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("forms.companion.style.label")}</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  value={field.value}
                  defaultValue={field.value}>
                  <SelectTrigger className='input'>
                    <SelectValue placeholder={t("forms.companion.style.placeholder")} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='formal'>{t("forms.companion.options.style.formal")}</SelectItem>
                    <SelectItem value='casual'>{t("forms.companion.options.style.casual")}</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='student'
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("forms.companion.student.label")}</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  value={field.value}
                  defaultValue={field.value}>
                  <SelectTrigger className='input'>
                    <SelectValue placeholder={t("forms.companion.student.placeholder")} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='children'>{t("forms.companion.options.student.children")}</SelectItem>
                    <SelectItem value='adult'>{t("forms.companion.options.student.adult")}</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='duration'
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("forms.companion.duration.label")}</FormLabel>
              <FormControl>
                <Input
                  type='number'
                  placeholder={t("forms.companion.duration.placeholder")}
                  {...field}
                  className='input'
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type='submit' className='w-full cursor-pointer'>
          {t("forms.companion.actions.build")}
        </Button>
      </form>
    </Form>
  );
};

export default CompanionForm;
