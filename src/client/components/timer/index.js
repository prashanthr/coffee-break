import React, { Fragment, useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import { Timer as TimerLibrary } from '@universal-apps/swan-react'
import useInterval from '../../effects/use-interval'
import './index.css'

const TimerComponent = TimerLibrary.Timer
const { tick } = TimerLibrary.effects

const Timer = ({ fresh, previousStart, start, className, digitClassName, isPaused, strokeColor, reset, timerRef }) => {
  const { hour, minute, second } = start
  const [currentTime, setTime] = useState({ hour, minute, second })
  // useInterval(() => {
  //   // Your custom logic here
  //   setTime(tick({ time: currentTime, countdown: true, isPaused, start }))
  // }, 1000, { previous: previousStart, current: start }, timerRef)
  console.log('start/currentTime', start, currentTime)
  // const timer = useRef(null)
  useEffect(() => {
    console.log('Running main effect', start)
    if (fresh !== null) {
      timerRef.current = setTimeout(() => {
        setTime(tick({ time: currentTime, countdown: true, isPaused }))
      }, 1000)
      // Clear timeout if the component is unmounted
      return () => clearTimeout(timerRef.current)
    }
  })
  useEffect(() => {
    setTime(start)
  }, [start])
  // useEffect(() => {
  //   // Clear timeout if start changes
  //   console.log('clearing timeout because start changed', start)
  //   if (reset) {
  //     clearTimeout(timer.current)
  //   }
  // })
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
  reset: false,
  start: {
    hour: 0,
    minute: 15,
    second: 0
  }
}

export default Timer
