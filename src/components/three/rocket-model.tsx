/* eslint-disable react/no-unknown-property */
import { Merged, useGLTF } from '@react-three/drei';
import { ThreeElements, useFrame } from '@react-three/fiber';
import useSpline from '@splinetool/r3f-spline';
import { memo, useMemo, useRef } from 'react';
import { Mesh, MeshStandardMaterial } from 'three';

const black = '#2A2A2A';
const primaryColor = '#A8B5BE';
const accentColor = '#5591C8';
const steelColor = '#A8A8A8';
const flameColor = '#ff7f00';

type MergedMesh = React.FC<ThreeElements['mesh']>;

const RocketModel = memo(() => {
  const logoModel = useGLTF('/3d/logo-opt.glb');
  const { nodes } = useSpline(
    'https://prod.spline.design/h2auRO9klLG4MpPj/scene.splinecode',
  );
  const flameRef = useRef<Mesh>(null);

  useFrame((state) => {
    if (flameRef.current) {
      const scale = 1 + Math.sin(state.clock.getElapsedTime() * 10) * 0.2;
      flameRef.current.scale.y = scale;
    }
  });

  const meshes = useMemo(() => {
    return {
      logo: new Mesh(
        (logoModel.nodes.Curve as Mesh).geometry,
        new MeshStandardMaterial({ color: accentColor }),
      ),
      fin: new Mesh(
        nodes.back.geometry,
        new MeshStandardMaterial({ color: accentColor }),
      ),
      window: new Mesh(
        nodes.window.geometry,
        new MeshStandardMaterial({ color: black }),
      ),
      windownFrame: new Mesh(
        nodes['windown-frame'].geometry,
        new MeshStandardMaterial({ color: accentColor }),
      ),
      nozzle: new Mesh(
        nodes.nozzle.geometry,
        new MeshStandardMaterial({
          color: steelColor,
          metalness: 0.8,
          roughness: 0.1,
        }),
      ),
      flame: new Mesh(
        nodes.flame.geometry,
        new MeshStandardMaterial({
          color: flameColor,
          emissive: flameColor,
          emissiveIntensity: 1,
          toneMapped: false,
        }),
      ),
      rocketCap: new Mesh(
        nodes['rocket-cap'].geometry,
        new MeshStandardMaterial({ color: accentColor }),
      ),
      rocketBody: new Mesh(
        nodes['rocket-body'].geometry,
        new MeshStandardMaterial({ color: primaryColor }),
      ),
    };
  }, [logoModel, nodes]);

  if (!nodes) return null;

  return (
    <group>
      <Merged meshes={Object.values(meshes)}>
        {(
          Logo: MergedMesh,
          Fin: MergedMesh,
          Window: MergedMesh,
          WindowFrame: MergedMesh,
          Nozzle: MergedMesh,
          Flame: MergedMesh,
          RocketCap: MergedMesh,
          RocketBody: MergedMesh,
        ) => (
          <>
            <Logo
              scale={12}
              position={[48.0, 65.47, -2.6]}
              rotation={[-1.56, 1.33, 1.53]}
            />
            <Window
              scale={1.3}
              position={[33.59, 59.72, -3.29]}
              rotation={[Math.PI / 2, 0.21, -Math.PI / 2]}
            />
            <WindowFrame
              scale={1}
              position={[39.8, 62.47, -3.6]}
              rotation={[-1.56, 1.33, 1.53]}
            />
            <Nozzle
              position={[-0.3, -44.75, -0.01]}
              rotation={[Math.PI, 0, 0]}
            />
            <Flame ref={flameRef} position={[-1.43, -80.52, 0.18]} />
            <RocketCap position={[-0.47, 124.46, -0.99]} />

            <RocketBody position={[-0.47, 35.98, -0.99]} />

            <group name="fins" position={[0, -26.01, 0]}>
              <>
                <Fin
                  name="fin-1"
                  position={[-44.06, 11.06, 0]}
                  rotation={[-Math.PI, 0, -Math.PI]}
                />
                <Fin
                  name="fin-2"
                  position={[44.06, 11.06, 0]}
                  rotation={[0, 0, 0]}
                />
                <Fin
                  name="fin-3"
                  position={[0, 11.06, -44.06]}
                  rotation={[0, Math.PI / 2, 0]}
                />
                <Fin
                  name="fin-4"
                  position={[0, 11.06, 44.06]}
                  rotation={[0, -Math.PI / 2, 0]}
                />
              </>
            </group>
          </>
        )}
      </Merged>
    </group>
  );
});

RocketModel.displayName = 'RocketModel';

export default RocketModel;
