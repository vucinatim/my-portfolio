/* eslint-disable react/no-unknown-property */
'use client';
import { Instance, Instances } from '@react-three/drei';
import { GroupProps, useFrame, useThree } from '@react-three/fiber';
import { memo, useEffect, useMemo, useRef, useState } from 'react';
import {
  Color,
  Float32BufferAttribute,
  Group,
  MeshStandardMaterial,
  Object3DEventMap,
  ShaderMaterial,
  Vector3,
} from 'three';

// Planet colors
const planetColors = [
  '#FF00FF', // Neon Magenta
  '#00FFFF', // Neon Cyan
  '#FF6FFF', // Soft Neon Pink
  '#6FFFE5', // Soft Neon Cyan
  '#FF99FF', // Bright Magenta
  '#66FFFF', // Bright Cyan
  '#CC33FF', // Deep Neon Purple
  '#99FFFF', // Light Neon Cyan
  '#FF66CC', // Neon Pink
];

// Shader material for stars with a twinkle effect
const StarShaderMaterial = new ShaderMaterial({
  uniforms: {
    color: { value: new Color('white') },
    opacity: { value: 0 }, // Start with opacity 0
    time: { value: 0 }, // Time uniform to control the twinkle effect
    dpr: { value: 1.0 }, // Device Pixel Ratio uniform
  },
  vertexShader: `
    varying vec2 vUv;
    varying float vTwinkle; // Pass the twinkle factor to fragment shader
    uniform float time;
    uniform float dpr; // Uniform for device pixel ratio

    void main() {
      vUv = uv;

      // Introduce twinkle effect using position and time
      vTwinkle = 0.5 + 0.5 * sin(time + position.x * 10.0 + position.y * 10.0);

      // Adjust gl_PointSize by dpr
      gl_PointSize = (2.0 + sin(position.x + position.y)) * dpr; // Adjust the size if necessary
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    uniform vec3 color;
    uniform float opacity;
    varying vec2 vUv;
    varying float vTwinkle;

    void main() {
      float r = 0.0, delta = 0.0, alpha = opacity * vTwinkle; // Apply twinkle effect to alpha
      vec2 cxy = 2.0 * gl_PointCoord - 1.0;
      r = dot(cxy, cxy);
      if (r > 1.0) {
        discard;
      }
      gl_FragColor = vec4(color, alpha); // Use the twinkling alpha
    }
  `,
  transparent: true,
});

// Function to get a random position inside a cylinder with optional inner padding
const getRandomInCylinder = (
  radius: number,
  height: number,
  innerPadding = 0,
) => {
  const angle = Math.random() * 2 * Math.PI;
  const r = innerPadding + Math.random() * (radius - innerPadding);
  const x = r * Math.cos(angle);
  const z = r * Math.sin(angle);
  const y = (Math.random() - 0.5) * height; // Random height within the cylinder
  return new Vector3(x, y, z);
};

const PlanetMaterial = new MeshStandardMaterial({
  color: '#7D92A0',
  transparent: true,
  opacity: 0,
});

const SpaceEnvironment = memo((props: GroupProps) => {
  const height = useThree((state) => state.viewport.height);
  const [debug] = useState(false);
  const environmentRef = useRef<Group<Object3DEventMap>>(null);
  const radius = 2000; // Cylinder radius
  const innerPadding = 1500; // Inner padding for a hole in the center of the cylinder
  const fadeSpeed = 0.5;

  useEffect(() => {
    StarShaderMaterial.uniforms.opacity.value = 0;
  }, []);

  useFrame((state, delta) => {
    // Rotate the environment and update the time uniform
    if (environmentRef.current) {
      environmentRef.current.rotation.y += delta * 0.015;
      StarShaderMaterial.uniforms.time.value = state.clock.getElapsedTime();
    }

    // Fade in/out the environment based on the visible prop
    if (props.visible === false) {
      StarShaderMaterial.uniforms.opacity.value = 0;
      PlanetMaterial.opacity = 0;
    } else {
      if (StarShaderMaterial.uniforms.opacity.value < 1) {
        StarShaderMaterial.uniforms.opacity.value += delta * fadeSpeed;
      }
      if (PlanetMaterial.opacity < 1) {
        PlanetMaterial.opacity += delta * fadeSpeed;
      }
    }

    // Update the device pixel ratio uniform
    // (if window is screen changes - like dragging browser window from one screen to another
    if (window) {
      StarShaderMaterial.uniforms.dpr.value = window.devicePixelRatio;
    }
  });

  // Generate stars
  // It generates stars in a cylinder shape with a hole in the center
  // height of the cylinder spans the entire viewport height
  const stars = useMemo(() => {
    const numStars = 2000;
    const stars = new Float32BufferAttribute(numStars * 3, 3);

    for (let i = 0; i < numStars; i++) {
      const starPosition = getRandomInCylinder(
        radius + 1000,
        height,
        innerPadding + 1000,
      );
      stars.setXYZ(i, starPosition.x, starPosition.y, starPosition.z);
    }
    return stars;
  }, [radius, height, innerPadding]);

  // Generate planets
  // It generates planets in a cylinder shape with a hole in the center
  // height of the cylinder spans the entire viewport height
  // utilizes mesh instancing for performance
  const planets = useMemo(() => {
    const numPlanets = 20;

    return Array.from({ length: numPlanets }).map((_, index) => (
      <Instance
        key={index}
        position={getRandomInCylinder(radius, height, innerPadding)}
        scale={Math.random() * 100}
        color={planetColors[index % planetColors.length]}
      />
    ));
  }, [radius, height, innerPadding]);

  return (
    <group {...props} ref={environmentRef}>
      {/* DEBUG ONLY: Wireframe to visualize the cylinder */}
      <mesh visible={debug}>
        <cylinderGeometry args={[radius, radius, height, 32]} />
        <meshBasicMaterial color="white" wireframe />
      </mesh>

      {/* DEBUG ONLY: Visualize inner padding */}
      <mesh visible={debug}>
        <cylinderGeometry args={[innerPadding, innerPadding, height, 32]} />
        <meshBasicMaterial color="red" wireframe />
      </mesh>

      {/* Instanced stars */}
      <points position={[0, 0, 0]}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" {...stars} />
        </bufferGeometry>
        <primitive attach="material" object={StarShaderMaterial} />
      </points>

      {/* Instanced planets */}
      <Instances limit={100} material={PlanetMaterial}>
        <sphereGeometry args={[1, 32, 32]} />
        {planets}
      </Instances>
    </group>
  );
});

SpaceEnvironment.displayName = 'SpaceEnvironment';

export default SpaceEnvironment;
