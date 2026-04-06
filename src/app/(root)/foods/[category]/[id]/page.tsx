import { genPageMetadata } from '@/app/seo';
import { MealDetailContent } from './_components/MealDetailContent';
import { client } from '@/lib/api';

type PageProps = {
  params: Promise<{ category: string; id: string }>;
};

async function getMeal(id: string) {
  try {
    const res = await client.get(`${process.env.NEXT_PUBLIC_BASE_API_URL}/lookup.php?i=${id}`);
    return res.data.meals?.[0] || null;
  } catch (error) {
    console.error('Error fetching meal for metadata:', error);
    return null;
  }
}

export async function generateMetadata(props: PageProps) {
  const params = await props.params;
  const meal = await getMeal(params.id);

  if (!meal) {
    return genPageMetadata({
      title: 'Meal Not Found',
      description: 'Detail makanan tidak ditemukan atau ID tidak valid.',
    });
  }

  return genPageMetadata({
    title: `${meal.strMeal} - Resep ${meal.strCategory}`,
    description: `Pelajari cara memasak ${meal.strMeal}. Bahan-bahan Lengkap: ${meal.strInstructions?.slice(0, 100)}...`,
    image: meal.strMealThumb,
    alternates: {
      canonical: `/foods/${params.category}/${params.id}`,
    },
  });
}

export default async function GenericMealDetailPage(props: PageProps) {
  const params = await props.params;

  return <MealDetailContent category={params.category} id={params.id} />;
}
