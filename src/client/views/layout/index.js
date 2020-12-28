import React from 'react'
import Logo from '../../components/logo'
import './index.css'

const Layout = ({ children }) => (
  <React.Fragment>
    <Logo />
    <div className='site-heading'>
      <h1>Coffee Break</h1>
    </div>
    <div className='content'>
      {children}
    </div>
  </React.Fragment>
)

export default Layout
