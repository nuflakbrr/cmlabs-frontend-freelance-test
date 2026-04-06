import type { FC } from 'react';
import type { MealLookUp } from '@/interfaces/features/meal';

type MealContentProps = {
  meal: MealLookUp;
  ingredients: string[];
};

export const MealContent: FC<MealContentProps> = ({ meal, ingredients }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
      {/* Image Section */}
      <div className="relative aspect-square md:aspect-video lg:aspect-square rounded-[3rem] overflow-hidden shadow-2xl">
        <img src={meal.strMealThumb} alt={meal.strMeal} className="w-full h-full object-cover" />
      </div>

      {/* Details Section */}
      <div className="flex flex-col gap-10">
        <section>
          <h2 className="text-3xl font-bold text-[#2D3E50] mb-6">Instructions</h2>
          <div className="text-[#5C6E8C] leading-relaxed space-y-4 whitespace-pre-line text-lg">
            {meal.strInstructions}
          </div>
        </section>

        <section>
          <h2 className="text-3xl font-bold text-[#2D3E50] mb-6">Recipes</h2>
          <ul className="list-disc list-inside space-y-2 text-[#5C6E8C] text-lg font-medium">
            {ingredients.map((item, index) => (
              <li key={index} className="pl-2">
                <span className="relative -left-2">{item}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
};
