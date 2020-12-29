import React from 'react'
import Footer from '../../components/footer'
import Logo from '../../components/logo'
import './index.css'

const Layout = ({ children }) => (
  <React.Fragment>
    <Logo />
    <div className='content'>
      {children}
    </div>
    <Footer />
  </React.Fragment>
)

export default Layout
