import { genPageMetadata } from '@/app/seo';
import { IngredientsContent } from './_components/IngredientsContent';

export const metadata = genPageMetadata({
  title: 'All Ingredients | MealApp API Explorer',
  description:
    'Explore our wide collection of ingredients for the best worldwide meals and recipes.',
});

export default function IngredientsPage() {
  return <IngredientsContent />;
}
