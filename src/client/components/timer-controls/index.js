import React from 'react'
import PropTypes from 'prop-types'
import ButtonGroup from '../button-group'
import './index.css'

const TimerControls = ({ isPaused, inBreak, isDone, onTogglePause, onToggleBreak, onRestart }) => (
  <div className='coffee-break-timer-controls'>
    <ButtonGroup
      buttons={[{
        name: 'pause',
        value: isDone 
          ? '↺ Restart'
          : (isPaused ? '▶ Resume' : '❚❚ Pause'),
        onClick: event => {
          isDone 
          ? onRestart(event)
          : onTogglePause(event)
        }
      }, {
        name: 'take-a-break',
        value: inBreak? 'Start Focusing' : 'Take a break',
        onClick: event => onToggleBreak(event)
      }]}
    />
  </div>
)

export default TimerControls