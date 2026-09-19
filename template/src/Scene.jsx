import { useMemo, useRef } from 'react'
import { Canvas, extend, useFrame, useThree } from '@react-three/fiber'
import { Grid, KeyboardControls, OrbitControls, Sky, SpotLight, useKeyboardControls } from '@react-three/drei'
import { Perf } from 'r3f-perf'
import { Vector3 } from 'three'
import { SunLight } from 'three/addons/lights/SunLight.js'

extend({ SunLight })

const SUN_POSITION = [30, 45, 20]
const BOX_POSITION = [0, 0.7, 0]
const MOVEMENT_SPEED = 3
const MOVEMENT_RESPONSE = 12
const TURN_RESPONSE = 12
const MAX_FRAME_DELTA = 0.1
const MOVEMENT_EPSILON_SQ = 0.0001
const KEYBOARD_MAP = [
  { name: 'forward', keys: ['KeyW'] },
  { name: 'backward', keys: ['KeyS'] },
  { name: 'left', keys: ['KeyA'] },
  { name: 'right', keys: ['KeyD'] }
]

function Box () {
  const boxRef = useRef(null)
  const controlsRef = useRef(null)
  const camera = useThree((state) => state.camera)
  const [, getKeys] = useKeyboardControls()
  const { targetVelocity, velocity, displacement, cameraForward, cameraRight } = useMemo(() => ({
    targetVelocity: new Vector3(),
    velocity: new Vector3(),
    displacement: new Vector3(),
    cameraForward: new Vector3(),
    cameraRight: new Vector3()
  }), [])

  useFrame((_, delta) => {
    const box = boxRef.current
    const controls = controlsRef.current
    if (!box || !controls) return

    const { forward, backward, left, right } = getKeys()
    const inputForward = Number(forward) - Number(backward)
    const inputRight = Number(right) - Number(left)
    const frameDelta = Math.min(delta, MAX_FRAME_DELTA)

    // Project camera-relative movement onto the ground plane.
    camera.getWorldDirection(cameraForward)
    cameraForward.y = 0
    cameraForward.normalize()
    cameraRight.crossVectors(cameraForward, camera.up).normalize()

    targetVelocity
      .set(0, 0, 0)
      .addScaledVector(cameraForward, inputForward)
      .addScaledVector(cameraRight, inputRight)

    targetVelocity.normalize().multiplyScalar(MOVEMENT_SPEED)

    velocity.lerp(
      targetVelocity,
      1 - Math.exp(-MOVEMENT_RESPONSE * frameDelta)
    )
    if (targetVelocity.lengthSq() === 0 && velocity.lengthSq() < MOVEMENT_EPSILON_SQ) {
      velocity.set(0, 0, 0)
    }
    displacement.copy(velocity).multiplyScalar(frameDelta)

    if (velocity.lengthSq() > MOVEMENT_EPSILON_SQ) {
      // Local +Z is forward; wrap the angle to take the shortest turn.
      const targetAngle = Math.atan2(velocity.x, velocity.z)
      const angleDifference = targetAngle - box.rotation.y
      const shortestAngle = Math.atan2(Math.sin(angleDifference), Math.cos(angleDifference))
      box.rotation.y += shortestAngle * (1 - Math.exp(-TURN_RESPONSE * frameDelta))
    }

    // Translate camera and target together; Drei handles OrbitControls updates.
    box.position.add(displacement)
    camera.position.add(displacement)
    controls.target.copy(box.position)
  })

  return (
    <>
      <mesh ref={boxRef} castShadow position={BOX_POSITION}>
        <boxGeometry args={[1.4, 1.4, 1.4]} />
        <meshStandardMaterial color='#38bdf8' metalness={0.15} roughness={0.35} />
      </mesh>
      <OrbitControls
        ref={controlsRef}
        dampingFactor={0.08}
        enableDamping
        enablePan={false}
        makeDefault
        maxDistance={14}
        maxPolarAngle={Math.PI / 2 - 0.05}
        minDistance={4}
        minPolarAngle={0.05}
        target={BOX_POSITION}
      />
    </>
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
    <KeyboardControls map={KEYBOARD_MAP}>
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
      </Canvas>
    </KeyboardControls>
  )
}
