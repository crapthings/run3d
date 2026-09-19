import { Canvas, extend } from '@react-three/fiber'
import { Grid, OrbitControls, Sky, SpotLight } from '@react-three/drei'
import { Perf } from 'r3f-perf'
import { SunLight } from 'three/addons/lights/SunLight.js'

extend({ SunLight })

const SUN_POSITION = [30, 45, 20]

function Box () {
  return (
    <mesh castShadow position-y={0.7}>
      <boxGeometry args={[1.4, 1.4, 1.4]} />
      <meshStandardMaterial color='#38bdf8' metalness={0.15} roughness={0.35} />
    </mesh>
  )
}

function Atmosphere () {
  return (
    <>
      <Sky
        distance={80}
        mieCoefficient={0.005}
        mieDirectionalG={0.8}
        rayleigh={1}
        sunPosition={SUN_POSITION}
        turbidity={6}
      />
      <SpotLight
        angle={0.35}
        anglePower={4}
        attenuation={80}
        castShadow={false}
        color='#fff2e3'
        distance={70}
        intensity={0}
        opacity={0.035}
        position={SUN_POSITION}
        radiusBottom={14}
        radiusTop={1}
      />
    </>
  )
}

export function Scene () {
  return (
    <Canvas camera={{ position: [6, 4.8, 9.2], fov: 45, far: 100 }} dpr={[1, 1.5]} shadows>
      {import.meta.env.DEV && <Perf position='top-right' />}
      <color attach='background' args={['#b9d2e5']} />
      <fogExp2 attach='fog' args={['#b9d2e5', 0.01]} />
      <sunLight
        args={[0xfff2e3, 3]}
        castShadow
        position={SUN_POSITION}
        shadow-camera-far={60}
      />
      <Atmosphere />
      <Box />
      <mesh receiveShadow rotation-x={-Math.PI / 2} position-y={-0.01}>
        <planeGeometry args={[60, 60]} />
        <shadowMaterial transparent opacity={0.25} depthWrite={false} />
      </mesh>
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
      <OrbitControls makeDefault target={[0, 0.7, 0]} />
    </Canvas>
  )
}
