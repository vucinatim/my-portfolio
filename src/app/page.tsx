import Navbar from '@/components/common/navbar';
import ResponsiveRadarChart from '@/components/common/radar-chart';
import ScrollIndicator from '@/components/common/scroll-indicator';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <section
        className="relative flex items-center justify-center"
        style={{
          height: 'calc(100vh - var(--navbar-height))',
        }}>
        <div className="flex flex-col items-center justify-center gap-4 font-bold">
          <h1 className="text-center text-5xl md:text-7xl">Hi 👋</h1>
          <h4 className="text-center text-5xl md:text-7xl">I&apos;m Tim</h4>
        </div>
        <ScrollIndicator />
      </section>

      {/* Who Am I Section */}
      <section id="who-am-i" className="container mx-auto py-20 text-justify">
        <div>
          <h2 className="mb-4 text-3xl font-bold">Who am I 🤔</h2>
          <p className="text-lg text-gray-400">
            Im just a guy who likes to create cool new things. I was born on
            June 29, 1998, which makes me {getMyAge()}. My journey kicked off in
            a small town at Gimnazija Velenje and later took me to the Faculty
            of Information and Computer Science (FRI) in Ljubljana. I finished
            my undergrad there and am currently wrapping up my master’s thesis.
            Almost there!
          </p>
          <p className="mt-4 text-lg text-gray-400">
            When I’m not coding, you’ll find me exploring new hobbies, making or
            mixing music, gaming, or just out for a run. I like staying up to
            date with tech and world events—YouTube is my go-to source for
            pretty much everything. Oh, and I used to compete in track and
            field, so running still holds a special place for me.
          </p>
          <p className="mt-4 text-lg text-gray-400">
            My first big step into the dev world was at Result d.o.o., where I
            worked on web and mobile apps using Flutter. After that, I dabbled
            in the startup life with a platform called Campin that I co-created
            with some friends. It was all about helping campers find the perfect
            spot while giving campsite owners handy tools for managing
            reservations. It was short-lived but a fun experience.
          </p>
          <p className="mt-4 text-lg text-gray-400">
            Now, I’m a frontend engineer at Zerodays, where I’ve been for over
            two years. I’ve worked on a bunch of cool projects—web and mobile
            apps, games, AI tools like AstraAI, dashboards, health-tracking apps
            and a lot more. It’s been an amazing ride, and I’ve learned so much
            along the way. Huge shoutout to my team for making this journey
            unforgettable. If you’re a dev looking for an awesome place to work,
            check us out at{' '}
            <Link
              href="https://www.zerodays.dev/"
              className="text-sky-500 hover:underline"
              target="_blank"
              rel="noopener noreferrer">
              https://www.zerodays.dev/
            </Link>
            . We’re always looking for great people to join us!
          </p>
        </div>
      </section>

      {/* Technical Skills Section */}
      <section id="technical-skills" className="container mx-auto py-20">
        <h2 className="mb-4 text-3xl font-bold">Technical Skills 💻</h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <div>
            <div className="mb-8">
              <h3 className="mb-4 text-xl font-semibold text-zinc-300">
                Extensive knowledge and experience:
              </h3>
              <ul className="space-y-4">
                <SkillItem
                  label="React"
                  description="UI library"
                  link="https://reactjs.org"
                />
                <SkillItem
                  label="TypeScript"
                  description="Typed JavaScript"
                  link="https://www.typescriptlang.org"
                />
                <SkillItem
                  label="Next.js"
                  description="React framework"
                  link="https://nextjs.org"
                />
                <SkillItem
                  label="CSS & TailwindCSS"
                  description="Styling tools"
                  link="https://tailwindcss.com"
                />
                <SkillItem
                  label="React Native"
                  description="Mobile development"
                  link="https://reactnative.dev"
                />
                <SkillItem
                  label="Three.js & React Three Fiber"
                  description="3D graphics"
                  link="https://threejs.org"
                />
                <SkillItem
                  label="Unity with C#"
                  description="Game engine"
                  link="https://unity.com"
                />
                <SkillItem
                  label="Remix"
                  description="Web framework"
                  link="https://remix.run"
                />
                <SkillItem
                  label="Flutter"
                  description="Cross-platform apps"
                  link="https://flutter.dev"
                />
                <SkillItem
                  label="TanStack Query"
                  description="Data fetching"
                  link="https://tanstack.com/query"
                />
                <SkillItem
                  label="Zustand"
                  description="State management"
                  link="https://zustand-demo.pmnd.rs"
                />
                <SkillItem
                  label="shadcn/ui"
                  description="Component library"
                  link="https://ui.shadcn.com/"
                />
                <SkillItem
                  label="Remotion"
                  description="Video creation"
                  link="https://www.remotion.dev"
                />
                <SkillItem
                  label="Supabase"
                  description="Backend as a service"
                  link="https://supabase.com"
                />
                <SkillItem
                  label="Ableton Live"
                  description="Music production"
                  link="https://www.ableton.com"
                />
              </ul>
            </div>

            <div>
              <h3 className="mb-4 text-xl font-semibold text-zinc-300">
                Things I have worked with and am familiar with:
              </h3>
              <ul className="space-y-4">
                <SkillItem
                  label="Vue"
                  description="UI framework"
                  link="https://vuejs.org"
                />
                <SkillItem
                  label="Angular"
                  description="Web framework"
                  link="https://angular.io"
                />
                <SkillItem
                  label="tRPC"
                  description="Type-safe APIs"
                  link="https://trpc.io"
                />
                <SkillItem
                  label="Figma"
                  description="Design tool"
                  link="https://www.figma.com"
                />
                <SkillItem
                  label="Blender"
                  description="3D modeling"
                  link="https://www.blender.org"
                />
                <SkillItem
                  label="Adobe Photoshop"
                  description="Image editing"
                  link="https://www.adobe.com/products/photoshop.html"
                />
                <SkillItem
                  label="Adobe Illustrator"
                  description="Vector graphics"
                  link="https://www.adobe.com/products/illustrator.html"
                />
              </ul>
            </div>
          </div>
          <div className="flex flex-col items-center">
            <ResponsiveRadarChart
              data={{
                Frontend: 10,
                Backend: 6,
                Databases: 4,
                DevOps: 5,
                GraphicDesign: 9,
                Architecting: 8,
                AudioEngineering: 7,
              }}
              variables={[
                'DevOps',
                'Architecting',
                'Frontend',
                'GraphicDesign',
                'AudioEngineering',
                'Backend',
                'Databases',
              ]}
            />
            <ResponsiveRadarChart
              color="rgb(236, 72, 153)"
              data={{
                ProblemSolving: 9,
                Communication: 8,
                Leadership: 7,
                Teamwork: 9,
                Creativity: 10,
                Adaptability: 8,
                TimeManagement: 8,
              }}
              variables={[
                'ProblemSolving',
                'Communication',
                'Leadership',
                'Teamwork',
                'Creativity',
                'Adaptability',
                'TimeManagement',
              ]}
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800 py-6 text-pink-500">
        <div className="container mx-auto text-center text-sm text-gray-500">
          Made with ❤️ using Next.js, ShadCN, and TailwindCSS.
        </div>
      </footer>
    </div>
  );
}

interface SkillItemProps {
  label: string;
  description: string;
  link: string;
}

const SkillItem = ({ label, description, link }: SkillItemProps) => (
  <li className="flex items-center space-x-4 font-mono text-sm sm:text-base">
    <Link
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="font-medium text-sky-500 hover:underline">
      {label}
    </Link>
    <span className="text-gray-400">•</span>
    <span className="text-gray-400">{description}</span>
  </li>
);

const getMyAge = () => {
  const today = new Date();
  const birthDate = new Date('1998-06-29');

  let age = today.getFullYear() - birthDate.getFullYear();

  // Adjust if the current date is before the birthday this year
  const hasNotHadBirthdayThisYear =
    today.getMonth() < birthDate.getMonth() ||
    (today.getMonth() === birthDate.getMonth() &&
      today.getDate() < birthDate.getDate());

  if (hasNotHadBirthdayThisYear) {
    age--;
  }

  return age;
};
