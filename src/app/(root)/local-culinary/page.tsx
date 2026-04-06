import { genPageMetadata } from '@/app/seo';
import { LocalCulinaryContent } from './_components/LocalCulinaryContent';

export const metadata = genPageMetadata({
  title: 'Local Culinary | Global Food Explorer',
  description:
    'Embark on a global culinary journey. Explore traditional recipes and local specialties from every corner of the world.',
});

export default function LocalCulinaryPage() {
  return <LocalCulinaryContent />;
}
