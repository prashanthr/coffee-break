import React from 'react'
import Layout from '../layout'
import Link from '../../components/link'
import screenshot from '../../assets/screenshot/app.png'
import { sample } from 'lodash'
import './index.css'

const prompts = [
  `Go to App`,
  `Let's be productive`,
  `Let's focus`,
  `Let's finish that project`,
  `Let's get stuff done`
]

const Home = () => (
  <Layout>
    <div className='coffee-break-view-home-container'>
      <div className='coffee-break-view-home-tagline'>
          Welcome to <span className='coffee-break-accent'>Coffee Break</span>&nbsp;☕️
          <br /> 
          <span className='coffee-break-view-home-sub-tagline'>
            A productivity app to help you focus and get things done
          </span>
      </div>
      <div className='coffee-break-view-home-cta animate__animated animate__fadeInLeftBig animate__animated animate__fadeInLeft'>
        <Link href='/app' isInternal>{sample(prompts)} → </Link>
      </div>
      <div className='coffee-break-view-home-img animate__animated animate__fadeInLeft animate__animated animate__fadeInLeft'>
        <img src={screenshot} alt='screenshot' />
      </div>
    </div>
  </Layout>
)

export default Home
