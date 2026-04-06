import { genPageMetadata } from '@/app/seo';
import { CategoryContent } from './_components/CategoryContent';

type PageProps = {
  params: Promise<{ category: string }>;
};

export async function generateMetadata(props: PageProps) {
  const params = await props.params;
  const decodedCategory = decodeURIComponent(params.category || '');

  return genPageMetadata({
    title: `${decodedCategory} Meals`,
    description: `Temukan beragam resep dan hidangan lezat dalam kategori ${decodedCategory}. Lihat cara memasak dan bahan-bahan yang dibutuhkan.`,
    alternates: {
      canonical: `/foods/${params.category}`,
    },
  });
}

export default async function GenericCategoryPage(props: PageProps) {
  const params = await props.params;
  const decodedCategory = decodeURIComponent(params.category || '');

  return <CategoryContent category={decodedCategory} />;
}
