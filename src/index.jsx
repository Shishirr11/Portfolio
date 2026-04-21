import './style.css'
import ReactDOM from 'react-dom/client'
import { Canvas } from '@react-three/fiber'
import Experience from './Experience.jsx'
import Portfolio from './Portfolio.jsx'
import { useState } from 'react'

function App() {
    const [fullscreen, setFullscreen] = useState(false)
    return fullscreen
        ? <Portfolio onClose={() => setFullscreen(false)} fullscreen />
        : (
            <Canvas className="r3f" camera={{ fov: 45, near: 0.1, far: 2000, position: [0, 2, -6] }} dpr={[1,2]}>
                <Experience onFullscreen={() => setFullscreen(true)} />
            </Canvas>
        )
}

ReactDOM.createRoot(document.querySelector('#root')).render(<App />)