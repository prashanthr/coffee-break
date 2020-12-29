import React from 'react'
import PropTypes from 'prop-types'
import Link from '../link'
import config from '../../config'
import './index.css'

const Footer = ({ }) => (
  <div className='coffee-break-footer'>
    Support this project by <Link href={config.coffeeUrl}>buying me a coffee</Link>
    <br />
    Built with 💙 by <Link href={config.author.url}>{config.author.name}</Link>
  </div>
)

export default Footer
