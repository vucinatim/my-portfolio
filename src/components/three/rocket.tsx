/* eslint-disable no-case-declarations */
/* eslint-disable react/no-unknown-property */
'use client';

import Particles from '@/components/three/particles';
import RocketModel from '@/components/three/rocket-model';
import { collisionInteractions } from '@/components/three/space-rocks';
import { useFrame } from '@react-three/fiber';
import {
  CapsuleCollider,
  RapierRigidBody,
  RigidBody,
  RoundConeCollider,
  vec3,
} from '@react-three/rapier';
import { memo, useRef } from 'react';
import { Group, Mesh, Object3DEventMap, Quaternion, Vector3 } from 'three';

const initScale = 1;

const Rocket = memo(() => {
  const rocketHovered = useRef<boolean | null>(false);
  const meshRef = useRef<Group<Object3DEventMap>>(null);
  const exhaustMeshRef = useRef<Mesh>(null);
  const rigidBodyRef = useRef<RapierRigidBody>(null);

  // Reusable objects
  const direction = useRef(new Vector3());
  const targetQuaternion = useRef(new Quaternion());
  const currentQuaternion = useRef(new Quaternion());
  const slerpedQuaternion = useRef(new Quaternion());
  const rotationAxis = useRef(new Vector3(0, 0, 1));

  // This hook is called every frame
  // It handles the rocket movement and rotation based on the mouse position
  // It also handles the hover effect
  useFrame((state, delta) => {
    const viewportSize = state.viewport;
    // Slowly rotate the rocket around the y-axis
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.5;
    }
    const rocket = rigidBodyRef.current;
    if (!rocket) return;

    // Scale the rocket when hovered
    if (rocketHovered.current) {
      meshRef.current?.scale.lerp(
        new Vector3(initScale + 0.1, initScale + 0.1, initScale + 0.1),
        delta * 5,
      );
    } else {
      meshRef.current?.scale.lerp(
        new Vector3(initScale, initScale, initScale),
        delta * 5,
      );
    }

    // Convert NDC to viewport coordinates
    const x = (state.pointer.x * viewportSize.width) / 2;
    const y = (state.pointer.y * viewportSize.height) / 2;
    const currentRocketPosition = rocket.translation() as Vector3;
    const targetRocketPosition = new Vector3(x, y, currentRocketPosition.z);
    const distance = targetRocketPosition.distanceTo(currentRocketPosition);
    // Move the rocket towards the mouse position
    direction.current
      .copy(targetRocketPosition)
      .sub(currentRocketPosition)
      .normalize()
      .multiplyScalar(delta * 1000 * distance);
    rocket.applyImpulse(direction.current, true);

    // Calculate the target rotation
    const rotationAngle = Math.atan2(
      y - currentRocketPosition.y,
      x - currentRocketPosition.x,
    );
    targetQuaternion.current.setFromAxisAngle(
      rotationAxis.current,
      rotationAngle - Math.PI / 2,
    );

    // Interpolate between current rotation and target rotation
    currentQuaternion.current.copy(rocket.rotation() as Quaternion);
    slerpedQuaternion.current.slerpQuaternions(
      currentQuaternion.current,
      targetQuaternion.current,
      0.08,
    );
    rocket.setRotation(slerpedQuaternion.current, true);
  });

  return (
    <group>
      <RigidBody
        ref={rigidBodyRef}
        position={[-400, 0, 0]}
        enabledRotations={[false, false, true]}
        enabledTranslations={[true, true, false]}
        includeInvisible
        collisionGroups={collisionInteractions.ROCKET}
        density={0.001}
        linearDamping={0.99}
        angularDamping={0.99}>
        <CapsuleCollider args={[20, 50]} position={[0, 10, 0]} />
        <RoundConeCollider args={[30, 32, 15]} position={[0, 90, 0]} />
        <group
          ref={meshRef}
          name="rocket"
          // onPointerEnter={(e) => {
          //   // Since this triggers based on raycasting,
          //   // we need to stop the event from propagating
          //   // because there are multiple meshes in this group
          //   // (more would be hit and cause multiple onPointerEnter events)
          //   e.stopPropagation();
          //   document.body.style.cursor = 'pointer';
          //   rocketHovered.current = true;
          // }}
          // onPointerLeave={(e) => {
          //   e.stopPropagation();
          //   document.body.style.cursor = 'default';
          //   rocketHovered.current = false;
          // }}
        >
          <RocketModel />
          <mesh visible={false} ref={exhaustMeshRef} position={[0, -80, 0]} />
          <pointLight
            color="orange"
            position={[10, -80, 10]}
            distance={200}
            intensity={30000}
          />
        </group>
      </RigidBody>
      <Particles
        objectRef={exhaustMeshRef}
        config={{
          maxParticles: 60,
          color: 'white',
          initialVelocity: 10,
          size: 5,
          opacity: 1,
          lifetime: 0.5,
          emissionRate: 10,
          turbulence: 10,
          gravityModifier: 0,
          sizeVariance: 2.5,
          boxSize: vec3({ x: 30, y: 0, z: 30 }),
        }}
      />
    </group>
  );
});

Rocket.displayName = 'Rocket';

export default Rocket;
