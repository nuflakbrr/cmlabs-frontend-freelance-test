import type { FC } from 'react';
import type { MealLookUp } from '@/interfaces/features/meal';

type MealTutorialProps = {
  meal: MealLookUp;
};

export const MealTutorial: FC<MealTutorialProps> = ({ meal }) => {
  if (!meal.strYoutube) {
    return (
      <section className="flex flex-col items-center">
        <h2 className="text-4xl font-bold text-[#2D3E50] mb-12 text-center italic">Tutorials</h2>
        <div className="w-full max-w-4xl aspect-video rounded-3xl overflow-hidden shadow-xl bg-gray-100 flex items-center justify-center text-gray-400">
          No video tutorial available
        </div>
      </section>
    );
  }

  const videoId = meal.strYoutube.split('v=')[1];

  return (
    <section className="flex flex-col items-center">
      <h2 className="text-4xl font-bold text-[#2D3E50] mb-12 text-center italic">Tutorials</h2>
      <div className="w-full max-w-4xl aspect-video rounded-3xl overflow-hidden shadow-xl">
        <iframe
          src={`https://www.youtube.com/embed/${videoId}`}
          title={`${meal.strMeal} Tutorial`}
          className="w-full h-full"
          allowFullScreen
        ></iframe>
      </div>
    </section>
  );
};
