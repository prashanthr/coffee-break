import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Timer as TimerLibrary } from '@universal-apps/swan-react'
import './index.css'

const TimerComponent = TimerLibrary.Timer
const { tick } = TimerLibrary.effects

const Timer = ({ elapsed, type, start, className, digitClassName, isPaused, strokeColor, onEnd, onStart, onTick, onPomodoroComplete }) => {
  const { hour, minute, second } = start
  const [currentTime, setTime] = useState({ hour, minute, second })
  const [elapsedTime, setElapsedTime] = useState(elapsed)
  useEffect(() => {
    const timer = setTimeout(() => {
      setTime(tick({ time: currentTime, countdown: true, isPaused }))
      setElapsedTime(tick({ time: elapsedTime, countdown: false, isPaused }))
      onTick({ time: elapsedTime })
    }, 1000)
    // Clear timeout if the component is unmounted
    return () => clearTimeout(timer)
  })
  useEffect(() => {
    setTime(start)
    onStart()
  }, [start])
  useEffect(() => {
    if (
        currentTime.hour === 0 && 
        currentTime.minute === 0 && 
        currentTime.second === 0
      ) {
        onEnd()
      }
  }, [currentTime])
  useEffect(() => {
    if (elapsedTime.minute > 0 && elapsedTime.minute % 25 === 0) {
      onPomodoroComplete({ time: elapsedTime })
    }
  }, [elapsedTime])
  return (
    <TimerComponent
      type={type}
      className={`animate__animated animate__fadeInUp ${className}`} 
      digitClassName={digitClassName}
      start={start} 
      currentTime={currentTime} 
      isPaused={isPaused}
      progressOptions={{ strokeColor }} />
  )
}

Timer.defaultProps = {
  className: '',
  type: 'progress',
  isPaused: false,
  strokeColor: '#d367c1',
  start: {
    hour: 0,
    minute: 15,
    second: 0
  }
}

Timer.propTypes = {
  className: PropTypes.string,
  type: PropTypes.string,
  isPaused: PropTypes.bool,
  strokeColor: PropTypes.string,
  start: PropTypes.shape({
    hour: PropTypes.number,
    minute: PropTypes.number,
    second: PropTypes.number
  })
}

export default Timer
