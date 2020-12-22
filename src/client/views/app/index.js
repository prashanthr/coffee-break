import React, { useState } from 'react';
import Layout from '../layout'
import Timer from '../../components/timer'
import './index.css'
import TimerControls from '../../components/timer-controls'
import AppSettings from '../../components/app-settings';

const App = () => {
  const [isPaused, togglePause] = useState(false)
  const takeABreak = () => {}
  return (
    <Layout>
      <div className='coffee-break-app-container'>
        <div className='coffee-break-timer-grid'>
          <Timer 
            className='coffee-break-timer' 
            digitClassName='coffee-break-timer-digit' 
            isPaused={isPaused}
          />
          <TimerControls isPaused={isPaused} onTogglePause={togglePause} onBreak={takeABreak} />
        </div>
        <div className='coffee-break-settings-grid'>
          <AppSettings />
        </div>
      </div>
    </Layout>
  )
}

export default App
