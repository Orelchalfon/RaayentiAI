import CompanionCard from "@/components/CompanionCard";
import CompanionsList from "@/components/CompanionsList";
import Cta from "@/components/CTA";
import { recentSessions } from "@/constants";

const Page = () => {
  return (
    <main>
      <h1>Popular Companians</h1>
      <section className='home-section'>
        <CompanionCard
          id='1'
          name='Neura the Brainy Explorer'
          topic='Topic: Neural Network of the Brain'
          subject='Science'
          duration={45}
          color='#E5D0FF'
          bookmarked={false}
        />

        <CompanionCard
          id='2'
          name='Countsy the Number Wizard'
          topic='Topic: Derivatives & Integrals'
          subject='Maths'
          duration={30}
          color='#FFDA6E'
          bookmarked={false}
        />

        <CompanionCard
          id='3'
          name='Verba the Vocabulary Builder'
          topic='Topic: English Literature '
          subject='Language'
          duration={30}
          color='#BDE7FF'
          bookmarked={true}
        />
      </section>
      <section className='home-section '>
        <CompanionsList
          title='Recently completed lessons'
          companions={recentSessions}
          classNames='w-2/3 max-lg:w-full'
        />
        <Cta />
      </section>
    </main>
  );
};

export default Page;
