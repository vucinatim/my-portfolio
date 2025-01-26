import { cn } from '@/lib/utils';
import { Eye } from 'lucide-react';
import Image from 'next/image'; // If you're using Next.js for optimized image rendering
import React from 'react';
import { FaGithub } from 'react-icons/fa';

type ProjectItemProps = {
  name: string;
  description: string;
  contribution?: string;
  link?: string;
  github?: string;
  image: string;
  technologies: string[];
  group: 'personal' | 'zerodays';
};

const ProjectItem: React.FC<ProjectItemProps> = ({
  name,
  description,
  contribution,
  link,
  github,
  image,
  technologies,
  group = 'personal',
}) => {
  return (
    <div className="overflow-hidden rounded-xl bg-zinc-900 shadow-md">
      {/* Image Section */}
      <div className="flex flex-col items-start gap-6 p-4 md:flex-row">
        <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-zinc-600 bg-black sm:w-[200px]">
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 200px"
          />
        </div>

        {/* Content Section */}
        <div className="flex flex-1 flex-col">
          <div className="mb-2 flex items-center justify-between gap-2">
            <h3 className="text-xl font-bold text-white">{name}</h3>
            <span
              className={cn(
                'rounded-full border px-3 py-0.5 text-xs',
                group === 'personal'
                  ? 'border-sky-500 text-sky-400'
                  : 'border-white text-gray-300',
              )}>
              {group}
            </span>
          </div>
          <p className="mb-4 text-gray-400">{description}</p>
          {contribution && (
            <p className="mb-4 text-sm text-gray-300">
              <span className="font-semibold text-white">My Contribution:</span>{' '}
              {contribution}
            </p>
          )}

          {/* Technologies */}
          <div className="mb-4 flex flex-wrap gap-2">
            {technologies.map((tech) => (
              <span
                key={tech}
                className="rounded-full bg-sky-700 px-3 py-1 text-xs font-semibold text-white">
                {tech}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-8">
            {link && (
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-auto flex items-center gap-2 self-start text-sky-500 hover:underline">
                <Eye className="h-5 w-5" />
                View Project
              </a>
            )}

            {github && (
              <a
                href={github}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-auto flex items-center gap-2 self-start text-sky-500 hover:underline">
                <FaGithub className="h-5 w-5" />
                View Code
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectItem;
