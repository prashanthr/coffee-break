import React, { useState } from 'react';
import Layout from '../layout'
import Timer from '../../components/timer'
import './index.css'
import ButtonGroup from '../../components/button-group'

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
          <ButtonGroup 
            buttons={[{
              name: 'pause',
              value: isPaused ? 'Resume' : 'Pause',
              onClick: () => togglePause(!isPaused)
            }, {
              name: 'take-a-break',
              value: 'Take a break',
              onClick: () => takeABreak()
            }]}
          />
        </div>
        <div className='coffee-break-settings-grid'>
          Settings
        </div>
      </div>
    </Layout>
  )
}

export default App
