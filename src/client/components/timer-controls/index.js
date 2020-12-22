import React from 'react'
import PropTypes from 'prop-types'
import ButtonGroup from '../button-group'
import './index.css'

const TimerControls = ({ isPaused, onTogglePause, onBreak }) => (
  <div className='coffee-break-timer-controls'>
    <ButtonGroup
      buttons={[{
        name: 'pause',
        value: isPaused ? 'Resume' : 'Pause',
        onClick: () => onTogglePause(!isPaused)
      }, {
        name: 'take-a-break',
        value: 'Take a break',
        onClick: () => onBreak()
      }]}
    />
  </div>
)

export default TimerControls