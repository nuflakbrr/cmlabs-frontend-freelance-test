import { Fragment, type FC } from 'react';
import { Home } from 'lucide-react';
import Link from 'next/link';
import type { Route } from 'next';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

export type BreadcrumbItemData = {
  label: string;
  href?: string | Route;
  active?: boolean;
};

type GenericBreadcrumbProps = {
  items: BreadcrumbItemData[];
  className?: string;
};

/**
 * A reusable Breadcrumb component that supports dynamic navigation lists.
 * Standardizes the look and feel of page navigation across the entire app.
 *
 * @param {BreadcrumbItemData[]} items - Array of navigation items (label, href, and active state).
 * @param {string} [className] - Optional custom CSS classes for the container.
 */
export const GenericBreadcrumb: FC<GenericBreadcrumbProps> = ({ items, className }) => {
  return (
    <Breadcrumb className={className}>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href="/" className="flex items-center text-gray-400 hover:text-black">
              <Home className="size-4 mr-1.5" />
              Home
            </Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        {items.map((item, index) => (
          <Fragment key={index}>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              {item.active ? (
                <BreadcrumbPage className="capitalize text-gray-900 font-bold">
                  {item.label}
                </BreadcrumbPage>
              ) : (
                <BreadcrumbLink asChild>
                  <Link
                    href={item.href as Route}
                    className="text-gray-400 hover:text-black capitalize"
                  >
                    {item.label}
                  </Link>
                </BreadcrumbLink>
              )}
            </BreadcrumbItem>
          </Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
};
