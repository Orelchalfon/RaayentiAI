import CompanionsList from "@/components/CompanionsList";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  getBookmarkedCompanions,
  getUserCompanions,
  getUserSessions,
} from "@/lib/actions/companion.action";
import { currentUser } from "@clerk/nextjs/server";
import Image from "next/image";
export const revalidate = 0;
import { redirect } from "next/navigation";
import { t } from "@/locales/i18n";
const Profile = async () => {
  const user = await currentUser();

  if (!user) return redirect("/sign-in");

  const [companions, sessionHistory, bookmarkedCompanions] = await Promise.all([
    getUserCompanions(user.id),
    getUserSessions(user.id),
    getBookmarkedCompanions(user.id),
  ]);

  return (
    <main className='min-lg:w-3/4 '>
      <section className='flex justify-between gap-4 max-sm:flex-col items-center'>
        <div className='flex items-center gap-4 '>
          <Image
            className='rounded-full'
            src={user.imageUrl}
            alt='Profile Picture'
            width={95}
            height={95}
          />
          <div className='flex flex-col gap-2'>
            <h1 className='font-bold text-2xl'>
              {user.firstName} {user.lastName}
            </h1>
            <p className='text-sm text-muted-foreground'>
              {user.emailAddresses[0].emailAddress}
            </p>
          </div>
        </div>
        <div className='flex gap-4'>
          <div className='border border-black rouded-lg p-3 gap-2 flex flex-col h-fit'>
            <div className='flex gap-2 items-center'>
              <Image
                src='/icons/check.svg'
                alt='checkmark'
                width={22}
                height={22}
              />
              <p className='text-2xl font-bold'>{sessionHistory.length}</p>
            </div>
            <div>{t("profile.lessonsCompleted")}</div>
          </div>
          <div className='border border-black rouded-lg p-3 gap-2 flex flex-col h-fit'>
            <div className='flex gap-2 items-center'>
              <Image src='/icons/cap.svg' alt='cap' width={22} height={22} />
              <p className='text-2xl font-bold'>{companions.length}</p>
            </div>
            <div>{t("profile.companionsCreated")}</div>
          </div>
        </div>
      </section>
      <Accordion type='multiple'>
        <AccordionItem value='bookmarks'>
          <AccordionTrigger className='text-2xl font-bold'>
            {t("profile.bookmarked")} {`(${bookmarkedCompanions.length})`}
          </AccordionTrigger>
          <AccordionContent>
            <CompanionsList
              companions={bookmarkedCompanions}
              title={t("profile.bookmarked")}
            />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value='recent'>
          <AccordionTrigger className='text-2xl font-bold'>
            {t("profile.recentSessions")}
          </AccordionTrigger>
          <AccordionContent>
            <CompanionsList
              title={t("profile.recentSessions")}
              companions={sessionHistory}
            />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value='companions'>
          <AccordionTrigger className='text-2xl font-bold'>
            {t("profile.myCompanions")} {`(${companions.length})`}
          </AccordionTrigger>
          <AccordionContent>
            <CompanionsList title={t("profile.myCompanions")} companions={companions} />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </main>
  );
};

export default Profile;
