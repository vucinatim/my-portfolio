'use client';

import Rocket from '@/components/three/rocket';
import SpaceEnvironment from '@/components/three/space-environment';
import SpaceRocks from '@/components/three/space-rocks';
import { AdaptiveDpr, OrthographicCamera } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Physics } from '@react-three/rapier';
import { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';

const RocketScene = () => {
  const [eventSource, setEventSource] = useState<HTMLElement | null>(null);

  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
  const isBigScreen = useMediaQuery({ query: '(min-width: 2000px)' });

  // Find and set the event source element
  // This allows us to listen to events from the parent window
  // meaning this scene can be overlayed with other content and still receive events
  useEffect(() => {
    if (document) {
      const root = document.getElementById('three-root');
      if (root) {
        console.log('🚀 Found three-root element');
        setEventSource(root);
      } else {
        console.error('🚀 Could not find three-root element');
      }
    }
  }, []);

  if (!eventSource) {
    return null;
  }

  return (
    <div className="absolute inset-0">
      <Canvas
        frameloop={'demand'}
        eventSource={eventSource}
        eventPrefix="page"
        performance={{ min: 0.5 }}>
        <AdaptiveDpr pixelated />

        {/* <Perf /> */}
        <OrthographicCamera
          makeDefault
          position={[0, 0, 100]}
          frames={60}
          zoom={isMobile ? 0.5 : isBigScreen ? 1 : 0.7}
          near={0.1}
          far={10000}
        />

        <ambientLight intensity={Math.PI / 8} />
        <directionalLight position={[0, 0, 100]} intensity={Math.PI / 2} />
        <Physics gravity={[0, 0, 0]} colliders={false}>
          <Rocket />
          <SpaceRocks />
        </Physics>
        <SpaceEnvironment />
      </Canvas>
    </div>
  );
};

export default RocketScene;
