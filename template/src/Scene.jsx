import { Canvas } from '@react-three/fiber'
import { Grid, OrbitControls } from '@react-three/drei'

function Box () {
  return (
    <mesh castShadow position-y={0.7}>
      <boxGeometry args={[1.4, 1.4, 1.4]} />
      <meshStandardMaterial color='#38bdf8' metalness={0.15} roughness={0.35} />
    </mesh>
  )
}

export function Scene () {
  return (
    <Canvas camera={{ position: [3, 2.4, 4.6], fov: 45 }} shadows>
      <color attach='background' args={['#f8fafc']} />
      <ambientLight intensity={0.8} />
      <directionalLight castShadow intensity={2} position={[4, 6, 3]} />
      <Box />
      <Grid
        args={[12, 12]}
        cellColor='#cbd5e1'
        cellSize={0.5}
        cellThickness={0.6}
        fadeDistance={18}
        fadeStrength={1}
        infiniteGrid
        sectionColor='#94a3b8'
        sectionSize={2}
        sectionThickness={1}
      />
      <OrbitControls makeDefault />
    </Canvas>
  )
}
