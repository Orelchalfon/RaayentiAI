import CompanionCard from "@/components/CompanionCard";
import CompanionsList from "@/components/CompanionsList";
import Cta from "@/components/CTA";
import { recentSessions } from "@/constants";
import { useTranslations } from 'next-intl';

const Page = () => {
  const t = useTranslations();
  
  return (
    <main>
      <h1>{t('home.title')}</h1>
      <section className='home-section'>
                <CompanionCard
          id='1'
          name={t('companions.neura.name')}
          topic={t('companions.neura.topic')}
          subject={t('subjects.science')}
          duration={45}
          color='#E5D0FF'
          bookmarked={false}
        />

        <CompanionCard
          id='2'
          name={t('companions.countsy.name')}
          topic={t('companions.countsy.topic')}
          subject={t('subjects.maths')}
          duration={30}
          color='#FFDA6E'
          bookmarked={false}
        />

        <CompanionCard
          id='3'
          name={t('companions.verba.name')}
          topic={t('companions.verba.topic')}
          subject={t('subjects.language')}
          duration={30}
          color='#BDE7FF'
          bookmarked={true}
        />
      </section>
      <section className='home-section '>
        <CompanionsList
          title={t('home.recentSessions')}
          companions={recentSessions}
          classNames='w-2/3 max-lg:w-full'
        />
        <Cta />
      </section>
    </main>
  );
};

export default Page;
