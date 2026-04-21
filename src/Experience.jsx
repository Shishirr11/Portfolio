import { useRef, useState, useEffect, useMemo } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { Text, Html, ContactShadows, Float, useGLTF, PresentationControls } from '@react-three/drei'
import * as THREE from 'three'
import Portfolio from './Portfolio.jsx'

const CAM_START  = new THREE.Vector3(0, 2, -6)
const CAM_END    = new THREE.Vector3(-3, 1.5, 4)
const CAM_ZOOMED = new THREE.Vector3(0, 1.1, 1.8)
const CAM_END_MOBILE    = new THREE.Vector3(0, 2, 6)
const CAM_ZOOMED_MOBILE = new THREE.Vector3(0, 1.1, 2.5)
const ease = t => 1 - Math.pow(1 - t, 3)

function Particles({ count = 60 }) {
    const mesh = useRef()
    const positions = useMemo(() => {
        const arr = new Float32Array(count * 3)
        for (let i = 0; i < count; i++) {
            arr[i*3]   = (Math.random() - 0.5) * 10
            arr[i*3+1] = (Math.random() - 0.5) * 10
            arr[i*3+2] = (Math.random() - 0.5) * 10
        }
        return arr
    }, [count])
        const circleTexture = useMemo(() => {
        const canvas = document.createElement('canvas')
        canvas.width = 64
        canvas.height = 64
        const ctx = canvas.getContext('2d')
        const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32)
        gradient.addColorStop(0, 'white')
        gradient.addColorStop(1, 'transparent')
        ctx.fillStyle = gradient
        ctx.fillRect(0, 0, 64, 64)
        return new THREE.CanvasTexture(canvas)
    }, [])
    useFrame((_, d) => {
        if (!mesh.current) return
        const pos = mesh.current.geometry.attributes.position
        for (let i = 0; i < count; i++) {
            // particles moves
            pos.array[i*3+1] -= d * 0.3

            // circular drift on x/z
            const angle = Date.now() * 0.0001 + i * 0.5
            pos.array[i*3]   += Math.sin(angle) * 0.002
            pos.array[i*3+2] += Math.cos(angle) * 0.002

            if (pos.array[i*3+1] < -5) {
                pos.array[i*3+1] = 5
            }
        }
        pos.needsUpdate = true
    })

    return (
        <points ref={mesh}>
            <bufferGeometry>
                <bufferAttribute attach="attributes-position" args={[positions, 3]} />
            </bufferGeometry>
            <pointsMaterial 
    size={4} 
    color="#000000" 
    sizeAttenuation={false} 
    transparent 
    opacity={1.5}
    alphaMap={circleTexture}
    alphaTest={0.01}
    depthWrite={false}
/>
        </points>
    )
}

function FloatingObjects() {
    const refs = [useRef(), useRef(), useRef()]
    useFrame((s) => {
        const t = s.clock.elapsedTime
        if (refs[0].current) { refs[0].current.rotation.x = t*0.3; refs[0].current.rotation.y = t*0.2 }
        if (refs[1].current) { refs[1].current.rotation.y = t*0.4; refs[1].current.position.y = -2.5 + Math.sin(t*0.6)*0.3 }
        if (refs[2].current) { refs[2].current.rotation.y = t*0.5; refs[2].current.position.y = 1.5 + Math.sin(t*0.8+1)*0.25 }
    })
    return <>
        <mesh ref={refs[0]} position={[-6,1,-3]}><torusGeometry args={[1,0.3,16,40]} /><meshStandardMaterial color="#111" roughness={0.8} metalness={0.1} /></mesh>
        <mesh ref={refs[1]} position={[5,-2.5,-4]}><icosahedronGeometry args={[1.2,0]} /><meshStandardMaterial color="#111" roughness={0.8} metalness={0.1} wireframe /></mesh>
        <mesh ref={refs[2]} position={[6,1.5,1]}><torusKnotGeometry args={[0.6,0.2,80,16]} /><meshStandardMaterial color="#111" roughness={0.8} metalness={0.1} wireframe /></mesh>
    </>
}

// plane to get the click for camera view change 
function KeyboardClickZone({ onClick }) {
    return (
        <mesh position={[0, -0.3, -0.2]} rotation-x={-1.57} onClick={onClick}>
            <planeGeometry args={[2.8, 1.8]} />
            <meshBasicMaterial transparent opacity={0} depthWrite={false} />
        </mesh>
    )
}

export default function Experience({ onFullscreen }) {
    const computer = useGLTF('https://threejs-journey.com/resources/models/macbook_model.gltf')
    const { camera, size } = useThree()
    const lidRef   = useRef()
    const progress = useRef(0)

    const [phase, setPhase]             = useState('rising')
    const [laptopY, setLaptopY]         = useState(-6)
    const [screenReady, setScreenReady] = useState(false)
    const isMobile = size.width < 768

    const camFrom = useRef(new THREE.Vector3())
    const camTo   = useRef(new THREE.Vector3())

    useEffect(() => {
        if (!computer?.scene) return
        computer.scene.traverse((child) => {
            if (child.name === 'Top') { lidRef.current = child; child.rotation.x = 3.14 }
            if (child.isMesh && child.material) {
                child.material.envMapIntensity = 0
                child.material.metalness = 0
                child.material.roughness = 0.6
            }
        })
        camera.position.copy(CAM_START)
        camera.lookAt(0, 0, 0)
    }, [computer.scene])

    // esc to back up the cam
    useEffect(() => {
        const onKey = (e) => {
            if (e.key === 'Escape' && phase === 'zoomed') zoomOut()
        }
        window.addEventListener('keydown', onKey)
        return () => window.removeEventListener('keydown', onKey)
    }, [phase])

        const zoomIn = () => {
            if (phase !== 'idle') return
            camFrom.current.copy(camera.position)
            camTo.current.copy(isMobile ? CAM_ZOOMED_MOBILE : CAM_ZOOMED)
            progress.current = 0
            setPhase('zooming-in')
        }

        const zoomOut = () => {
            camFrom.current.copy(camera.position)
            camTo.current.copy(isMobile ? CAM_END_MOBILE : CAM_END)
            progress.current = 0
            setPhase('zooming-out')
        }

    useFrame((_, delta) => {
        if (phase === 'rising') {
            progress.current = Math.min(progress.current + delta * 0.6, 1)
            setLaptopY(THREE.MathUtils.lerp(-6, -1.2, ease(progress.current)))
            if (progress.current >= 1) { progress.current = 0; setPhase('opening') }
        }
        if (phase === 'opening') {
            progress.current = Math.min(progress.current + delta * 0.7, 1)
            if (lidRef.current) lidRef.current.rotation.x = THREE.MathUtils.lerp(3.14, 1.2, ease(progress.current))
            if (progress.current >= 1) { progress.current = 0; setPhase('arcing') }
        }
        if (phase === 'arcing') {
            progress.current = Math.min(progress.current + delta * 0.5, 1)
            camera.position.lerpVectors(CAM_START, isMobile ? CAM_END_MOBILE : CAM_END, ease(progress.current))
            camera.lookAt(0, 0, 0)
            if (progress.current >= 1) { progress.current = 0; setPhase('idle'); setScreenReady(true) }
        }
        
        if (phase === 'zooming-in') {
            progress.current = Math.min(progress.current + delta * 1.2, 1)
            camera.position.lerpVectors(camFrom.current, camTo.current, ease(progress.current))
            camera.lookAt(0, 0.8, 0)
            if (progress.current >= 1) { progress.current = 0; setPhase('zoomed') }
        }
        if (phase === 'zooming-out') {
            progress.current = Math.min(progress.current + delta * 1.2, 1)
            camera.position.lerpVectors(camFrom.current, camTo.current, ease(progress.current))
            camera.lookAt(0, 0, 0)
            if (progress.current >= 1) { progress.current = 0; setPhase('idle') }
        }
    })

    const isZoomed = phase === 'zoomed'
    const isZooming = phase === 'zooming-in' || phase === 'zooming-out'

    return <>
        <color args={['#f0eeeb']} attach="background" />
        <ambientLight intensity={1.0} color="#f5f5f5" />
        <directionalLight position={[4, 6, 4]} intensity={0.5} color="#ffffff" />
        <directionalLight position={[-4, 2, -2]} intensity={0.2} color="#ffffff" />
        <Particles />
        <FloatingObjects />
        {isZoomed && (
            <mesh position={[0, 0, -3]} onClick={zoomOut}>
                <planeGeometry args={[200, 200]} />
                <meshBasicMaterial transparent opacity={0} depthWrite={false} side={2} />
            </mesh>
        )}
        <PresentationControls
            global rotation={[0.13, 0.1, 0]} damping={0.4}
            azimuth={isMobile ? [-1.5, 1.5] : [-1.5, 1]}
            config={{ mass: 2, tension: 400 }} 
            snap={isMobile ? false : true}
            enabled={phase === 'idle'}
        >
            <Float rotationIntensity={phase === 'idle' ? 0.3 : 0} floatIntensity={isZoomed || isZooming ? 0 : 1} speed={isZoomed || isZooming ? 0 : 1}>
                <rectAreaLight width={2.5} height={1.65} intensity={8} color="#e8e8e8"
                    rotation={[-0.1, Math.PI, 0]} position={[0, 0.55, -1.15]} />

                <primitive object={computer.scene} position-y={laptopY}>
                    {screenReady && (<>

                        <Html transform wrapperClass="htmlScreen"
                            distanceFactor={1.17}
                            position={[0, 1.54, -1.54]}
                            rotation-x={-0.365}
                        >
                            <div
                                style={{ width:'1024px', height:'670px', overflow:'visible', borderRadius:'4px', position:'relative' }}
                                onWheel={e => e.stopPropagation()}
                                onPointerDown={e => { if (isZoomed) e.stopPropagation() }}
                                onPointerUp={e => { if (isZoomed) e.stopPropagation() }}
                                onClick={e => { if (isZoomed) e.stopPropagation() }}
                            >
                                <div style={{
                                    position:'absolute', inset:0, pointerEvents:'none', zIndex:10,
                                    background:'linear-gradient(135deg,rgba(255,255,255,0.08) 0%,transparent 40%)',
                                    borderRadius:'4px'
                                }}/>
                                {!isZoomed && (
                                    <div style={{ position:'absolute', inset:0, zIndex:20, cursor:'pointer' }}
                                        onClick={zoomIn} />
                                )}
                                <Portfolio isZoomed={isZoomed} />
                            </div>
                        </Html>

                        <KeyboardClickZone onClick={zoomIn} />

                        {isZoomed && (
                            <Html transform
                                distanceFactor={1.17}
                                position={[0, -0.55, 0.6]}
                                rotation-x={-1.57}
                            >
                                <div onClick={zoomOut} style={{
                                    color:'#888', fontSize:'11px', fontFamily:'monospace',
                                    cursor:'pointer', userSelect:'none', whiteSpace:'nowrap',
                                    padding:'4px 10px', borderRadius:'4px',
                                    border:'1px solid #ccc', background:'rgba(255,255,255,0.8)'
                                }}>esc / click to exit</div>
                            </Html>
                        )}

                    </>)}
                </primitive>

                <Text font="./bangers-v20-latin-regular.woff"
                    fontSize={isMobile ? 0.35 : 0.5}
                    position={isMobile ? [1.5,0.5,0.5] : [2,0.75,0.75]}
                    rotation-y={-1.25} maxWidth={3} color="#1a1a1a"
                >
                    Hey, Nice to{'\n'}see you here.
                </Text>
                {isMobile && (
    <Text font="./bangers-v20-latin-regular.woff"
        fontSize={0.18}
        position={[1.5, -0.1, 0.5]}
        rotation-y={-1.25}
        maxWidth={3}
        color="#888888"
        textAlign="left"
    >
        * 3D Rendering works best{'\n'}on desktop browsers
    </Text>
)}

                {screenReady && (
                    <Html
                        position={isMobile ? [1, 1.2, -0.3] : [2, 0.1, 0.75]}
                        rotation-y={-1.25}
                    >
                        <button onClick={onFullscreen} style={{
                            background: '#1a1a1a', border: 'none', borderRadius: '6px',
                            color: '#fff', fontSize: '11px', fontWeight: 600,
                            padding: '7px 20px', cursor: 'pointer',
                            letterSpacing: '1.5px', textTransform: 'uppercase',
                            fontFamily: 'monospace', whiteSpace: 'nowrap',
                            boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
                        }}>⛶ fullscreen</button>
                    </Html>
                )}

            </Float>
        </PresentationControls>
      {screenReady && (
    <ContactShadows position-y={-1.4} opacity={0.1} scale={5} blur={1} frames={1} color="#000" />
)}
    </>
}
