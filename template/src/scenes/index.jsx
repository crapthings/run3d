import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { Perf } from 'r3f-perf'

// Face colors preserve the favicon's lime top, bright right side, and shaded left side.
const cubeColors = ['#bef264', '#65a30d', '#a3e635', '#65a30d', '#65a30d', '#bef264']

// Three rounded streaks trail the cube in the initial camera's screen plane.
function SpeedLines () {
  return (
    <group rotation-y={Math.atan2(4, 6)} position={[0, 0, 1.1]}>
      {[0.32, 0, -0.32].map((height, index) => (
        <mesh key={height} position={[-1.15 + index * 0.08, height, 0]} rotation-z={Math.PI / 2}>
          <capsuleGeometry args={[0.055, 0.65 - index * 0.15, 4, 8]} />
          <meshBasicMaterial color='#e2e8f0' />
        </mesh>
      ))}
    </group>
  )
}

// An orbitable cube and speed lines recreate the run3d favicon in three dimensions.
export function Scene () {
  return (
    <Canvas orthographic camera={{ position: [4, 3.4, 6], zoom: 100, near: 0.1, far: 100 }} dpr={[1, 2]}>
      <color attach='background' args={['#0f172a']} />
      {import.meta.env.DEV && <Perf position='top-right' />}
      <mesh>
        <boxGeometry args={[1.8, 1.8, 1.8]} />
        {cubeColors.map((color, index) => (
          <meshBasicMaterial key={index} attach={`material-${index}`} color={color} />
        ))}
      </mesh>
      <SpeedLines />
      <OrbitControls makeDefault target={[-0.25, 0, 0]} minZoom={50} maxZoom={200} />
    </Canvas>
  )
}
