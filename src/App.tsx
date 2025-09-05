import { ReactLenis } from 'lenis/react';
import type { LenisRef } from 'lenis/react';
import { useRef } from 'react';
import SuquenceCanvas from './components/SequenceCanvas';

function App() {
  const lenisRef = useRef<LenisRef>(null)

  return (
    <>
      <ReactLenis root options={{ smoothWheel: true }} ref={lenisRef} >
        <div className='relative h-[6000px]'>
          <SuquenceCanvas />
        </div>
      </ReactLenis>
      <div className='h-[600px]'>aaa</div>
    </>
  )
}

export default App;