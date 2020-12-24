import React from 'react'
import PropTypes from 'prop-types'
import ButtonGroup from '../button-group'
import './index.css'

const TimerControls = ({ isPaused, inBreak, isDone, onTogglePause, onToggleBreak }) => (
  <div className='coffee-break-timer-controls'>
    <ButtonGroup
      buttons={[{
        name: 'pause',
        value: isPaused ? '▶ Resume' : '❚❚ Pause',
        onClick: event => onTogglePause(event)
      }, {
        name: 'take-a-break',
        value: inBreak? 'Start Working' : 'Take a break',
        onClick: event => onToggleBreak(event)
      }]}
    />
  </div>
)

export default TimerControls