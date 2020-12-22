import React from 'react'
import LogoImg from '../../assets/logo.svg'
import Link from '../link'
import './index.css'

const Logo = () => (
  <div className='today-web-logo'>
    <Link href={'/'} isInternal>
      <img src={LogoImg} alt='logo' />
    </Link>
  </div>
)

export default Logo
