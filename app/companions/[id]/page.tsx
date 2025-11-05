import { GetCompanion } from "@/lib/actions/companion.action";
import { getSubjectColor } from "@/lib/utils";
import { t } from "@/locales/i18n";
import { currentUser } from "@clerk/nextjs/server";
import dynamic from "next/dynamic";
import Image from "next/image";
import { redirect } from "next/navigation";
import { Suspense } from "react";
const CompanionComponent = dynamic(
  () => import("@/components/CompanionComponent"),
  { ssr: true }
);

const CompanionSession = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  const companion = await GetCompanion(id);
  const { name, subject, topic, duration } = companion;
  const user = await currentUser();
  if (!user) redirect("/sign-in");
  if (!companion) redirect("/companion/new");
  console.log(companion);

  return (
    <main>
      <article className='flex rounded-border justify-between p-6 max-md:flex-col'>
        <div className='flex items-center gap-2'>
          <div
            className='size-[72px] flex items-center justify-center rounded-lg max-md:hidden'
            style={{ backgroundColor: getSubjectColor(subject) }}>
            <Image
              src={`/icons/${subject}.svg`}
              alt={subject}
              width={35}
              height={35}
            />
          </div>

          <div className='flex flex-col gap-2'>
            <div className='flex items-center gap-2'>
              <p className='font-bold text-2xl'>{name}</p>
              <div className='subject-badge max-sm:hidden'>{subject}</div>
            </div>
            <p className='text-lg'>{topic}</p>
          </div>
        </div>
        <div className='items-start text-2xl max-md:hidden'>
          {duration} {t("session.durationSuffix")}
        </div>
      </article>

      <Suspense fallback={<div className='h-[70vh]' />}>
        <CompanionComponent
          {...companion}
          companionId={id}
          userName={user.firstName!}
          userImage={user.imageUrl!}
        />
      </Suspense>
    </main>
  );
};

export default CompanionSession;
