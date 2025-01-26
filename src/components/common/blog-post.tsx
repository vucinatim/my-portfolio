'use client';

import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface BlogPostCardProps {
  href: string;
  title: string;
  image: string;
  date: Date;
}

export const BlogPostCard = ({
  href,
  title,
  image,
  date,
}: BlogPostCardProps) => {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="bg-card group flex cursor-pointer flex-col transition-all hover:brightness-125">
      <div className="relative mx-auto min-h-64 w-full overflow-hidden rounded-xl">
        <Image
          src={image}
          alt={title}
          className="object-cover object-center"
          fill
        />
      </div>
      <div className="flex grow flex-col justify-between gap-4 pt-8">
        <h3 className="text-xl font-semibold md:text-3xl">{title}</h3>
        <div className="flex w-full flex-row items-center justify-between">
          <div className="whitespace-nowrap text-slate-300">
            {date.toLocaleDateString('en')}
          </div>
          <div className="w-full" />
          <div className="flex items-center gap-2 whitespace-nowrap text-slate-300">
            <span className="text-sm font-semibold">Read more</span>
            <span className="text-xs font-medium">
              <ArrowRight size={16} />
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};
