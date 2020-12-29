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
          ? '⟲ Restart'
          : (isPaused ? '▶ Start' : '❚❚ Pause'),
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

TimerControls.propTypes = {
  isPaused: PropTypes.bool,
  inBreak: PropTypes.bool,
  isDone: PropTypes.bool,
  onTogglePause: PropTypes.func,
  onToggleBreak: PropTypes.func,
  onRestart: PropTypes.func
}

export default TimerControls