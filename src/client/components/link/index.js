import React from 'react'
import PropTypes from 'prop-types'
import { Link as RouterLink } from 'react-router-dom'
import './index.css'

const Link = ({ className, children, href, isInternal }) => (
  isInternal 
  ? (
    <RouterLink to={href}>
      <span className={`${className}`}>
        {children}
      </span>
    </RouterLink>
  )
  : (
    <a href={href} target={'_blank'} rel="noopener noreferrer">
      <span className={`${className}`}>
        {children}
      </span>
    </a>
  )
)

Link.propTypes = {
  className: PropTypes.string,
  isInternal: PropTypes.bool
}

Link.defaultProps = {
  className: '',
  isInternal: false
}

export default Link
