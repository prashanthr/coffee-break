import React, { Fragment, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Timer as TimerLibrary } from '@universal-apps/swan-react'
import './index.css'

const TimerComponent = TimerLibrary.Timer
const { tick } = TimerLibrary.effects

const Timer = ({ start, className, digitClassName, isPaused, strokeColor }) => {
  const { hour, minute, second } = start
  const [currentTime, setTime] = useState({ hour, minute, second })
  console.log('start/currentTime', start, currentTime)
  useEffect(() => {
    const timer = setTimeout(() => {
      setTime(tick({ time: currentTime, countdown: true, isPaused }))
    }, 1000)
    // Clear timeout if the component is unmounted
    return () => clearTimeout(timer)
  })
  return (
    <TimerComponent
      type='progress'
      className={className} 
      digitClassName={digitClassName} 
      start={start} 
      currentTime={currentTime} 
      isPaused={isPaused}
      progressOptions={{ strokeColor }} />
  )
}

Timer.defaultProps = {
  isPaused: false,
  strokeColor: '#d367c1',
  start: {
    hour: 0,
    minute: 15,
    second: 0
  }
}

export default Timer
