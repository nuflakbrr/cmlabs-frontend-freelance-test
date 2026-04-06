import { genPageMetadata } from '@/app/seo';
import { IngredientMealsContent } from './_components/IngredientMealsContent';

type PageProps = {
  params: Promise<{ ingredient: string }>;
};

export async function generateMetadata(props: PageProps) {
  const params = await props.params;
  const decodedIngredient = decodeURIComponent(params.ingredient || '');

  return genPageMetadata({
    title: `${decodedIngredient} Meals | MealApp Explorer`,
    description: `Explore all delicious meals and recipes made with ${decodedIngredient}. Discover new tastes today!`,
    alternates: {
      canonical: `/ingredients/${params.ingredient}`,
    },
  });
}

export default async function IngredientDetailPage(props: PageProps) {
  const params = await props.params;
  const decodedIngredient = decodeURIComponent(params.ingredient || '');

  return <IngredientMealsContent ingredient={decodedIngredient} />;
}
