'use client';

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'; // ShadCN Sheet
import { Menu } from 'lucide-react'; // Icon for the hamburger menu
import Link from 'next/link';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

const Logo = () => {
  return <span className="text-xl font-bold">Tim&apos;s Portfolio</span>;
};

const Navbar = () => {
  return (
    <nav
      className="sticky top-0 z-10 flex items-center justify-center"
      style={{ height: 'var(--navbar-height)' }}>
      <div className="mx-auto w-full max-w-[1200px] px-4 sm:px-8">
        <div className="flex items-center justify-between overflow-hidden rounded-full border border-gray-800 bg-black/40 px-8 py-4 backdrop-blur-sm">
          {/* Branding */}
          <Logo />

          {/* Desktop Navigation */}
          <div className="hidden space-x-6 font-semibold md:flex">
            <LinkButton href="#who-am-i">Who am I?</LinkButton>
            <LinkButton href="#technical-skills">Technical Skills</LinkButton>
            <LinkButton href="#projects">Projects</LinkButton>
          </div>

          {/* Social Links */}
          <div className="hidden items-center space-x-4 md:flex">
            <Link
              href="https://www.linkedin.com/in/tim-vu%C4%8Dina-945153196/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-gray-400">
              <FaLinkedin size={24} />
            </Link>
            <Link
              href="https://github.com/vucinatim"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-gray-400">
              <FaGithub size={24} />
            </Link>
          </div>

          {/* Mobile Hamburger Menu */}
          <div className="flex md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <button className="text-white hover:text-gray-400">
                  <Menu size={24} />
                </button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-zinc-900 text-white">
                <SheetTitle className="text-white">
                  <Logo />
                </SheetTitle>

                <SheetDescription className="mt-6 hidden text-sm text-gray-400">
                  Hi, I&apos;m Tim Vucina, a frontend engineer from Ljubljana,
                  Slovenia. I&apos;m passionate about creating innovative and
                  user-friendly products that make a positive impact on the
                  world. I&apos;m excited to share my knowledge and experiences
                  with you!
                </SheetDescription>

                <nav className="mt-16 flex flex-col space-y-6 font-semibold">
                  <LinkButton href="#who-am-i">Who am I?</LinkButton>
                  <LinkButton href="#technical-skills">
                    Technical Skills
                  </LinkButton>
                  <LinkButton href="#projects">Projects</LinkButton>

                  <div className="mt-6 flex space-x-4">
                    <Link
                      href="https://www.linkedin.com/in/tim-vu%C4%8Dina-945153196/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white hover:text-gray-400">
                      <FaLinkedin size={24} />
                    </Link>
                    <Link
                      href="https://github.com/vucinatim"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white hover:text-gray-400">
                      <FaGithub size={24} />
                    </Link>
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};

interface LinkButtonProps {
  href: string;
  children: React.ReactNode;
}

const LinkButton = ({ href, children }: LinkButtonProps) => {
  return (
    <Link
      href={href}
      className="text-white transition-colors hover:text-sky-500">
      {children}
    </Link>
  );
};

export default Navbar;
