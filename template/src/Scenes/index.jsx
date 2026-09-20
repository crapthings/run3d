import { Canvas, extend } from '@react-three/fiber'
import { Grid, OrbitControls, Sky } from '@react-three/drei'
import { Perf } from 'r3f-perf'
import { SunLight } from 'three/addons/lights/SunLight.js'

extend({ SunLight })

// One world unit represents one meter.
export function Scene () {
  return (
    <Canvas camera={{ position: [4, 3.4, 6], fov: 50, far: 100 }} dpr={1} shadows>
      {import.meta.env.DEV && <Perf position='top-right' />}
      <sunLight
        args={['#fff2e3', 2]}
        position={[30, 45, 20]}
        castShadow
        shadow-camera-far={60}
      />
      <Sky distance={1000} rayleigh={1} sunPosition={[30, 45, 20]} turbidity={4} />
      <mesh castShadow position-y={0.7}>
        <boxGeometry args={[1.4, 1.4, 1.4]} />
        <meshStandardMaterial color='#38bdf8' metalness={0.15} roughness={0.35} />
      </mesh>
      <mesh receiveShadow rotation-x={-Math.PI / 2} position-y={-0.01}>
        <planeGeometry args={[64, 64]} />
        <shadowMaterial transparent opacity={0.25} depthWrite={false} />
      </mesh>
      <Grid
        args={[64, 64]}
        cellColor='#cbd5e1'
        cellSize={1}
        cellThickness={0.5}
        fadeDistance={32}
        infiniteGrid
        sectionColor='#94a3b8'
        sectionSize={2}
        sectionThickness={0.8}
      />
      <OrbitControls makeDefault target={[0, 0.7, 0]} />
    </Canvas>
  )
}
