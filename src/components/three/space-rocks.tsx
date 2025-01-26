/* eslint-disable react/no-unknown-property */
'use client';

import { useThree } from '@react-three/fiber';
import {
  CuboidCollider,
  interactionGroups,
  MeshCollider,
  RapierRigidBody,
  RigidBody,
  vec3,
} from '@react-three/rapier';
import { createRef, useEffect, useState } from 'react';
import { MeshStandardMaterial, Plane, Vector3 } from 'three';
import { ConvexGeometry } from 'three/addons/geometries/ConvexGeometry.js';

const rockMaterial = new MeshStandardMaterial({
  color: '#6D7D8B',
  roughness: 0.8,
  metalness: 0.1,
});

// Function to generate a random rock-like geometry from 50 vertices
const generateRockGeometry = () => {
  const vertices: Vector3[] = [];

  // Generate 50 random vertices within a certain bounding box
  for (let i = 0; i < 50; i++) {
    const x = (Math.random() - 0.5) * 3; // X position within a range
    const y = (Math.random() - 0.5) * 3; // Y position within a range
    const z = (Math.random() - 0.5) * 3; // Z position within a range

    vertices.push(new Vector3(x, y, z));
  }

  // Create the geometry using ConvexGeometry to generate a convex hull from the vertices
  const geometry = new ConvexGeometry(vertices);
  geometry.computeVertexNormals(); // Ensure proper normals for lighting
  geometry.scale(5, 5, 5); // Scale the rock up for visibility

  return geometry;
};

type RockData = {
  ref: React.MutableRefObject<RapierRigidBody | null>;
  position: Vector3;
  velocity: Vector3;
  angularVelocity: Vector3;
  geometry: ConvexGeometry;
  canSplit: boolean;
  scale: number;
};

// Function to find the intersection between a plane and the edges of the triangles
const getIntersectionPoint = (
  start: Vector3,
  end: Vector3,
  plane: Plane,
): Vector3 | null => {
  const direction = new Vector3().subVectors(end, start);
  const distance = plane.distanceToPoint(start);
  const denominator = plane.normal.dot(direction);

  if (denominator === 0) return null; // Parallel, no intersection

  const t = -distance / denominator;
  if (t >= 0 && t <= 1) {
    return new Vector3().addVectors(start, direction.multiplyScalar(t));
  }

  return null;
};

// Function to split the rock into two and add new vertices along the intersection
const splitRock = (rockGeometry: ConvexGeometry) => {
  const vertices = rockGeometry.attributes.position.array;

  const verticesA: Vector3[] = [];
  const verticesB: Vector3[] = [];
  const intersectionPoints: Vector3[] = [];

  // Split the rock along a plane, e.g., the X-axis
  const plane = new Plane(new Vector3(1, 0, 0), 0); // Plane along the X-axis

  // Iterate through each triangle in the geometry
  for (let i = 0; i < vertices.length; i += 9) {
    const v0 = new Vector3(vertices[i], vertices[i + 1], vertices[i + 2]);
    const v1 = new Vector3(vertices[i + 3], vertices[i + 4], vertices[i + 5]);
    const v2 = new Vector3(vertices[i + 6], vertices[i + 7], vertices[i + 8]);

    const distances = [
      plane.distanceToPoint(v0),
      plane.distanceToPoint(v1),
      plane.distanceToPoint(v2),
    ];

    const positiveSide: Vector3[] = [];
    const negativeSide: Vector3[] = [];

    // Add vertices to the correct side of the plane
    if (distances[0] >= 0) positiveSide.push(v0);
    else negativeSide.push(v0);

    if (distances[1] >= 0) positiveSide.push(v1);
    else negativeSide.push(v1);

    if (distances[2] >= 0) positiveSide.push(v2);
    else negativeSide.push(v2);

    // If the triangle intersects the plane, find intersection points
    if (positiveSide.length > 0 && negativeSide.length > 0) {
      for (let j = 0; j < 3; j++) {
        const p0 = [v0, v1, v2][j];
        const p1 = [v0, v1, v2][(j + 1) % 3];
        const intersection = getIntersectionPoint(p0, p1, plane);
        if (intersection) {
          positiveSide.push(intersection);
          negativeSide.push(intersection.clone());
          intersectionPoints.push(intersection.clone());
        }
      }
    }

    verticesA.push(...positiveSide);
    verticesB.push(...negativeSide);
  }

  // Add intersection outline vertices equally distributed between the rocks
  verticesA.push(...intersectionPoints);
  verticesB.push(...intersectionPoints);

  const geometryA = new ConvexGeometry(verticesA);
  const geometryB = new ConvexGeometry(verticesB);

  geometryA.computeVertexNormals();
  geometryB.computeVertexNormals();

  return [geometryA, geometryB];
};

interface SpaceRocksProps {
  visible?: boolean;
}

const SpaceRocks = ({ visible = true }: SpaceRocksProps) => {
  const [rocks, setRocks] = useState<Map<string, RockData>>(new Map());

  useEffect(() => {
    const rockMap = new Map<string, RockData>();
    const idPrefix = new Date().getTime(); // Unique ID prefix for current iteration of rocks
    const gridCellSize = 100; // Grid cell size: enough space for two rocks + buffer
    const gridWidth = 800; // Total width of the grid
    const gridHeight = 800; // Total height of the grid

    // Calculate the number of grid cells in each dimension
    const cellsX = Math.floor(gridWidth / gridCellSize);
    const cellsY = Math.floor(gridHeight / gridCellSize);

    // Generate all grid cell positions
    const gridCells: Vector3[] = [];
    for (let x = 0; x < cellsX; x++) {
      for (let y = 0; y < cellsY; y++) {
        const xPos = x * gridCellSize - gridWidth / 2;
        const yPos = y * gridCellSize - gridHeight / 2;
        gridCells.push(new Vector3(xPos, yPos, 0)); // Z-coordinate fixed
      }
    }

    // Shuffle the grid cells to randomize positions
    for (let i = gridCells.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [gridCells[i], gridCells[j]] = [gridCells[j], gridCells[i]];
    }

    // Now assign rocks to the first N grid cells (N = 10 in this case)
    for (let i = 0; i < 10; i++) {
      const rockId = `${idPrefix}_rock_${i + 1}`;
      const position = gridCells[i];
      const scale = 3 + Math.random() * 4;

      rockMap.set(rockId, {
        ref: createRef<RapierRigidBody>(),
        position,
        velocity: new Vector3(
          (Math.random() - 0.5) * 10,
          (Math.random() - 0.5) * 10,
          0,
        ),
        angularVelocity: new Vector3(
          (Math.random() - 0.5) * 0.1,
          (Math.random() - 0.5) * 0.1,
          (Math.random() - 0.5) * 0.1,
        ),
        geometry: generateRockGeometry(),
        scale: scale,
        canSplit: true,
      });
    }

    setRocks(rockMap);
  }, []);

  const handleCollision = (rockId: string, force: Vector3) => {
    setRocks((prevRocks) => {
      const rock = prevRocks.get(rockId);
      if (!rock) return prevRocks;

      // Split the rock into two new rocks
      const [geometryA, geometryB] = splitRock(rock.geometry);
      const pos = vec3(rock.ref.current?.worldCom());

      // Create new rocks at the same position with slightly adjusted velocities and positions
      const newRock1 = {
        ref: createRef<RapierRigidBody>(),
        position: pos,
        velocity: rock.velocity.clone().add(force),
        angularVelocity: rock.angularVelocity,
        geometry: geometryA,
        scale: rock.scale,
        canSplit: false,
      };

      const newRock2 = {
        ref: createRef<RapierRigidBody>(),
        position: pos,
        velocity: rock.velocity.clone().sub(force),
        angularVelocity: rock.angularVelocity,
        geometry: geometryB,
        scale: rock.scale,
        canSplit: false,
      };

      // Remove the old rock and add the new ones
      prevRocks.delete(rockId);
      prevRocks.set(`${rockId}A`, newRock1);
      prevRocks.set(`${rockId}B`, newRock2);

      return new Map(prevRocks);
    });
  };

  return (
    <group visible={visible}>
      <Bounds />
      {Array.from(rocks.entries()).map(([key, rock]) => {
        return (
          <RigidBody
            key={key}
            ref={rock.ref}
            position={rock.position}
            linearVelocity={rock.velocity.toArray()}
            angularVelocity={rock.angularVelocity.toArray()}
            collisionGroups={collisionInteractions.ROCKS}
            enabledTranslations={[true, true, false]}
            restitution={0.9} // Rocks bounce when they collide
            friction={0.1} // Add slight friction to prevent endless motion
            density={0.001}
            type="dynamic" // Physics body type is dynamic for movement
            gravityScale={0} // Disable gravity to simulate space
            onContactForce={(payload) => {
              const descaleBy = 100000;
              const forceMag = payload.totalForceMagnitude / descaleBy;
              const forceVec = vec3({
                x: payload.totalForce.x,
                y: payload.totalForce.y,
                z: 0,
              }).divideScalar(descaleBy / 3);
              if (!rock.canSplit) return;
              if (forceMag < 80) return; // Ignore small collisions
              handleCollision(key, forceVec);
            }} // Trigger the split on collision
          >
            <MeshCollider type="hull">
              <mesh geometry={rock.geometry} scale={rock.scale}>
                <primitive attach="material" object={rockMaterial} />
              </mesh>
            </MeshCollider>
          </RigidBody>
        );
      })}
    </group>
  );
};

export default SpaceRocks;

const Bounds = () => {
  const { viewport } = useThree();
  return (
    <>
      <CuboidCollider
        name="Bounds (top)"
        collisionGroups={collisionInteractions.BOUNDS}
        position={[0, viewport.height / 2 + 1, 0]}
        restitution={1}
        friction={0}
        args={[viewport.width, 1, 1]}
      />
      <CuboidCollider
        name="Bounds (bottom)"
        collisionGroups={collisionInteractions.BOUNDS}
        position={[0, -viewport.height / 2 - 1, 0]}
        restitution={1}
        friction={0}
        args={[viewport.width, 1, 1]}
      />
      <CuboidCollider
        name="Bounds (left)"
        collisionGroups={collisionInteractions.BOUNDS}
        position={[-viewport.width / 2 - 1, 0, 0]}
        restitution={1}
        friction={0}
        args={[1, viewport.height, 1]}
      />
      <CuboidCollider
        name="Bounds (right)"
        collisionGroups={collisionInteractions.BOUNDS}
        position={[viewport.width / 2 + 1, 0, 0]}
        restitution={1}
        friction={0}
        args={[1, viewport.height, 1]}
      />
    </>
  );
};

export const layer = {
  ROCKET: 1,
  ROCKS: 2,
  BOUNDS: 4,
};

export const collisionInteractions = {
  ROCKET: interactionGroups(layer.ROCKET, [layer.ROCKS]),
  ROCKS: interactionGroups(layer.ROCKS, [
    layer.ROCKS,
    layer.ROCKET,
    layer.BOUNDS,
  ]),
  BOUNDS: interactionGroups(layer.BOUNDS, [layer.ROCKS]),
};
