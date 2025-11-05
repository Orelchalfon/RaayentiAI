import CompanionCard from "@/components/CompanionCard";
import CompanionsList from "@/components/CompanionsList";
import Cta from "@/components/CTA";
import {
  GetAllCompanions,
  GetRecentSessions,
} from "@/lib/actions/companion.action";
import { getSubjectColor } from "@/lib/utils";
import { t } from "@/locales/i18n";
const ctaProps = {
  title: t("home.cta.badge"),
  header: t("home.cta.header"),
  content: t("home.cta.content"),
  btnText: t("home.cta.button"),
  href: "/companions/new",
  imagePath: "images/cta.svg",
};
export const revalidate = 60;

const Page = async () => {
  const [companions, recentCompanionSessions] = await Promise.all([
    GetAllCompanions({ limit: 3 }),
    GetRecentSessions(10),
  ]);
  return (
    <main>
      <h1>{t("home.heading")}</h1>
      <section className='home-section'>
        {companions?.map((companion) => (
          <CompanionCard
            key={companion.id}
            {...companion}
            color={getSubjectColor(companion.subject)}
          />
        ))}
      </section>
      <section className='home-section '>
        <CompanionsList
          title={t("home.recentLessons")}
          companions={recentCompanionSessions}
          classNames='w-2/3 max-lg:w-full'
        />
        <Cta {...ctaProps} />
      </section>
    </main>
  );
};

export default Page;
