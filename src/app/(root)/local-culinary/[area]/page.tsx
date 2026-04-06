import { genPageMetadata } from '@/app/seo';
import { LocalCulinaryMealsContent } from './_components/LocalCulinaryMealsContent';

type PageProps = {
  params: Promise<{ area: string }>;
};

export async function generateMetadata(props: PageProps) {
  const params = await props.params;

  return genPageMetadata({
    title: `${params.area} Traditional Recipes | Global Explorer`,
    description: `Discover the best traditional ${params.area} meals and recipes. Learn how to cook local favorites with our global collection.`,
    alternates: {
      canonical: `/local-culinary/${params.area}`,
    },
  });
}

export default async function LocalCulinaryDetailPage(props: PageProps) {
  const params = await props.params;

  return <LocalCulinaryMealsContent area={params.area} />;
}
