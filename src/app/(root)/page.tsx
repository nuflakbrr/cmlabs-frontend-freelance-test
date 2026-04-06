import Features from './_components/Features';
import Hero from './_components/Hero';

export default async function Home() {
  return (
    <div className="w-full">
      <Hero />
      <Features />
    </div>
  );
}
