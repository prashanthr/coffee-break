import React from 'react'
import PropTypes from 'prop-types'
import Link from '../link'
import config from '../../config'
import './index.css'

const Footer = ({ className }) => (
  <div className={`coffee-break-footer ${className}`}>
    Support this project by <Link href={config.coffeeUrl}>buying me a coffee</Link>
    <br />
    Built with 💙 by <Link href={config.author.url}>{config.author.name}</Link>
  </div>
)

Footer.propTypes = {
  className: PropTypes.string
}

Footer.defaultProps = {
  className: ''
}

export default Footer
