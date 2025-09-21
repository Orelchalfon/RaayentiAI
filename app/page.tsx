import CompanionCard from "@/components/CompanionCard";
import CompanionsList from "@/components/CompanionsList";
import Cta from "@/components/CTA";
import {
  GetAllCompanions,
  GetRecentSessions,
} from "@/lib/actions/companion.action";
import { getSubjectColor } from "@/lib/utils";
const ctaProps = {
  title: "Start learning your way.",
  header: "Build and Personalize Learning Companion",
  content:
    "Pick a name, subject, voice, & personality — and start learning through voice conversations that feel natural and fun.",
  btnText: "Build a New Companion",
  href: "/companions/new",
  imagePath: "images/cta.svg",
};
const Page = async () => {
  const companions = await GetAllCompanions({ limit: 3 });
  const recentCompanionSessions = await GetRecentSessions(10);
  return (
    <main>
      <h1>Popular Companians</h1>
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
          title='Recently completed lessons'
          companions={recentCompanionSessions}
          classNames='w-2/3 max-lg:w-full'
        />
        <Cta {...ctaProps} />
      </section>
    </main>
  );
};

export default Page;
