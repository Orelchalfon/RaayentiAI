import CompanionForm from "@/components/CompanionForm";
import { newCompanionPermissions } from "@/lib/actions/companion.action";
import { auth } from "@clerk/nextjs/server";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { t } from "@/locales/i18n";
const ctaProps = {
  title: t("companions.limit.badge"),
  header: t("companions.limit.header"),
  content: t("companions.limit.content"),
  btnText: t("companions.limit.button"),
  href: "/subscription",
  imagePath: "/images/cta.svg",
};

const NewCompanion = async () => {
  const { userId } = await auth();
  !userId && redirect("/sign-in");
  const canCreateComanion = await newCompanionPermissions();
  return (
    <main className='min-lg:w-1/3 min-md:w-2/3 items-center justify-center '>
      {canCreateComanion ? (
        <article className='flex flex-col gap-4'>
          <h1>{t("companions.builderHeading")}</h1>
          <CompanionForm />
        </article>
      ) : (
        <article className='companion-limit'>
          <Image
            src={ctaProps.imagePath}
            alt='companions limit reached'
            width={360}
            height={230}
          />
          <div className='cta-badge'>{ctaProps.title}</div>
          <h1 className='text-xl  lg:text-2xl  '>{ctaProps.header}</h1>
          <p>{ctaProps.content}</p>
          <Link
            href={ctaProps.href}
            className='btn-primary flex items-center gap-2'>
            {ctaProps.btnText}
          </Link>
        </article>
      )}
    </main>
  );
};

export default NewCompanion;
