import React from 'react'
import PropTypes from 'prop-types'
import { Button as LibraryButton } from '@universal-apps/swan-react'
import './index.css'

const Button = ({ className, name, value, onClick }) => (
  <LibraryButton 
    className={`coffee-break-button ${className}`}
    name={name}
    value={value}
    onClick={onClick}
    withBorder
  />
)

Button.propTypes = {
  className: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.any,
  onClick: PropTypes.func
}

export default Button