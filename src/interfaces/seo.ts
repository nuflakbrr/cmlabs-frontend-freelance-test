import type { Metadata } from 'next';

export interface PageSEOProps extends Partial<Metadata> {
  title: string;
  description?: string;
  image?: string;
}
