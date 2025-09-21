import Image from "next/image";
import Link from "next/link";

/**
 * title:Start learning your way.
 * header:Build and Personalize Learning Companion
 * Pick a name, subject, voice, & personality — and start learning through
        voice conversations that feel natural and fun.
        Build a New Companion
 * */
type CTAProps = {
  title: string;
  header: string;
  content: string;
  btnText: string;
  href: string;
  imagePath: string;
};
const Cta = ({
  title,
  header,
  content,
  btnText,
  href,
  imagePath,
}: CTAProps) => {
  return (
    <section className='cta-section'>
      <div className='cta-badge'>{title}</div>
      <h2 className='text-3xl font-bold'>{header}</h2>
      <p>{content}</p>
      <Image src={imagePath} alt='cta' width={362} height={232} />
      <button className='btn-primary'>
        <Image src='/icons/plus.svg' alt='plus' width={12} height={12} />
        <Link href={{ pathname: href }}>
          <p>{btnText}</p>
        </Link>
      </button>
    </section>
  );
};

export default Cta;
