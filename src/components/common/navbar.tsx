import Link from 'next/link';

const Navbar = () => {
  return (
    <nav
      className="sticky top-0 z-10 flex items-center justify-center border-b border-gray-800 bg-black"
      style={{ height: 'var(--navbar-height)' }}>
      <div className="container mx-auto flex items-center justify-between px-4">
        <span className="text-xl font-bold">Tim&apos;s Portfolio</span>
        <div className="space-x-4">
          <Link href="#who-am-i" className="text-white hover:text-gray-400">
            Who am I?
          </Link>
          <Link
            href="#technical-skills"
            className="text-white hover:text-gray-400">
            Technical Skills
          </Link>
          <Link href="#projects" className="text-white hover:text-gray-400">
            Projects
          </Link>
          <Link href="#contact" className="text-white hover:text-gray-400">
            Contact
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
