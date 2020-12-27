import React from 'react'
import { Progress } from '@universal-apps/swan-react'
import './index.css'

const Energy = ({ value, label }) => {
  let computedValue = value/100
  let className = computedValue > 0.7
    ? '' 
    : computedValue > 0.5
      ? 'coffee-break-energy-progress-wrap-50'
      : computedValue > 0.25
        ? 'coffee-break-energy-progress-wrap-25'
        : 'coffee-break-energy-progress-wrap-0'
  return (
    <div className='coffee-break-energy-grid'>
      <span>{label}</span>
      <div className={`coffee-break-energy-progress-wrap ${className}`}>
        <Progress className='coffee-break-energy-progress' value={value/100} />
      </div>
    </div>
  )
}
  

Energy.defaultProps = {
  label: 'Energy' // 'Mana'
}

export default Energy
