import React, { Fragment, useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import { Timer as TimerLibrary } from '@universal-apps/swan-react'
import './index.css'

const TimerComponent = TimerLibrary.Timer
const { tick } = TimerLibrary.effects

const Timer = ({ type, start, className, digitClassName, isPaused, strokeColor, onEnd, onStart }) => {
  const { hour, minute, second } = start
  const [currentTime, setTime] = useState({ hour, minute, second })
  const additionalDigitClassName = (
    type === 'progress' 
    ? '' 
    : 'coffee-break-timer-digit-countdown'
  )
  useEffect(() => {
    const timer = setTimeout(() => {
      setTime(tick({ time: currentTime, countdown: true, isPaused }))
    }, 1000)
    // Clear timeout if the component is unmounted
    return () => clearTimeout(timer)
  })
  useEffect(() => {
    console.log('start changed')
    setTime(start)
    onStart()
  }, [start])
  useEffect(() => {
    if (currentTime.hour === 0 && currentTime.minute === 0 && currentTime.second === 0) {
      onEnd()
    }
  }, [currentTime])
  return (
    <TimerComponent
      type={type}
      className={className} 
      digitClassName={`${digitClassName} ${additionalDigitClassName}`}
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
  reset: false,
  start: {
    hour: 0,
    minute: 15,
    second: 0
  }
}

export default Timer
