import { BlogPostCard } from '@/components/common/blog-post';
import Navbar from '@/components/common/navbar';
import ProjectItem from '@/components/common/project-item';
import ResponsiveRadarChart from '@/components/common/radar-chart';
import ScrollIndicator from '@/components/common/scroll-indicator';
import RocketScene from '@/components/three/rocket-scene';
import Link from 'next/link';
import { Suspense } from 'react';

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navbar */}
      <Navbar />

      <div className="relative" id="three-root">
        {/* Hero Section */}
        <section
          className="relative z-10 flex items-center justify-center"
          style={{
            height: '100dvh',
          }}>
          <div className="flex flex-col items-center justify-center gap-4 font-bold">
            <h1 className="text-center text-5xl md:text-7xl">Hi 👋</h1>
            <h4 className="text-center text-5xl md:text-7xl">I&apos;m Tim</h4>
          </div>
          <ScrollIndicator />
        </section>

        <Suspense>
          <RocketScene />
        </Suspense>
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black to-transparent" />
      </div>

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
                  label="React Native & Expo"
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

      <section id="projects" className="container mx-auto py-20">
        <h2 className="mb-8 text-3xl font-bold text-white">Projects 🚀</h2>
        <div className="flex flex-col gap-8">
          <ProjectItem
            name="VizEngine"
            description="Audio Visualization Engine for the Web. (Master's Thesis WIP)"
            link="https://viz-engine.vercel.app/"
            github="https://github.com/vucinatim/viz-engine"
            image="/images/projects/viz-engine.png"
            technologies={[
              'React',
              'Next.js',
              'Zustand',
              'Three.js',
              'Web Audio API',
            ]}
            group="personal"
          />
          <ProjectItem
            name="Campin"
            description="A platform to help campers find the perfect spot while providing tools for campsite owners to manage reservations."
            link="https://campin-frontend-lj93.vercel.app/"
            github="https://github.com/tjazsilovsek/campin-frontend"
            image="/images/projects/campin.png"
            technologies={['React', 'Next.js', 'Supabase', 'Stripe']}
            group="personal"
          />
          <ProjectItem
            name="Arena of Tanks"
            description="A local multiplayer tank game built with Unity and C#."
            image="/images/projects/arena-of-tanks.png"
            technologies={['Unity', 'C#', 'AirConsole']}
            group="personal"
          />
          <ProjectItem
            name="AI Video Editor"
            description="A tool to automatically produce videos using AI."
            github="https://github.com/vucinatim/content-creator"
            image="/images/projects/content-creator.png"
            technologies={['React', 'Next.js', 'Remotion', 'Supabase']}
            group="personal"
          />
          <ProjectItem
            name="Breakout (browser game)"
            description="A breakout game built with R3F and React."
            github="https://github.com/vucinatim/three-playground"
            image="/images/projects/breakout.png"
            technologies={['React', 'R3F', 'Zustand']}
            group="personal"
          />
          <ProjectItem
            name="Youtube playlist downloader"
            description="A tool to batch download all/selected the videos from a Youtube playlist."
            github="https://github.com/vucinatim/youtube-playlist-to-mp3"
            image="/images/projects/yt-to-mp3.png"
            technologies={['React', 'Next.js', 'ytdl-core', 'ffmpeg']}
            group="personal"
          />
          <ProjectItem
            name="AstraAI"
            description="Astra AI is an intelligent tutor, harnessing the power of GPT-4o, to allow users to pose any math-related question."
            contribution="One of 3 active frontend developers on the team."
            link="https://ai.astra.si/"
            image="/images/projects/astraai.png"
            technologies={[
              'Next.js',
              'OpenAI API',
              'Supabase',
              'TailwindCSS',
              'Vercel',
            ]}
            group="zerodays"
          />
          <ProjectItem
            name="Gl Charge"
            description="A web app for managing electric vehicle charging sessions."
            contribution="One of 3 frontend developers on the team. Implemented customizable grid layout for the dashboard."
            link="https://glcharge.com/"
            image="/images/projects/glcharge.webp"
            technologies={['Next.js', 'Supabase', 'TailwindCSS']}
            group="zerodays"
          />
          <ProjectItem
            name="Curious App"
            description="A mobile app for experience sampling developed for Faculty of Education at Ljubljana."
            contribution="Project setup, design, and development."
            link="https://play.google.com/store/apps/details?id=dev.zerodays.esm&hl=en-us"
            image="/images/projects/curious.webp"
            technologies={['React Native', 'Expo', 'TailwindCSS']}
            group="zerodays"
          />
        </div>
        <div className="flex items-center justify-center py-16 text-center text-lg">
          more coming soon... (im too lazy to add them all atm)
        </div>
      </section>

      <section id="blog" className="container mx-auto py-20">
        <h2 className="mb-8 text-3xl font-bold text-white">Blog 📝</h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <BlogPostCard
            href="https://dev.to/zerodays/building-an-interactive-3d-rocket-easter-egg-with-react-three-fiber-4pc"
            title="Building an Interactive 3D Rocket Easter Egg with React Three Fiber"
            image="https://media2.dev.to/dynamic/image/width=1000,height=420,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2Fmaj98k0ljpzfm2a8n9dv.png"
            date={new Date('2024-09-17')}
          />
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800 py-6 text-pink-500">
        <div className="container mx-auto text-center text-sm text-gray-500">
          {'</> with ❤️ by Me.'}
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
