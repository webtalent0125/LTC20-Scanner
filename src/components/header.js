import Head from 'next/head'
import Navbar from './navbar'

const Header = () => {
  return (
    <div className='relative z-10'>
      <Head>
        <meta property='og:url' content='https://ltc20-scanner.netlify.app/' />
        <meta property='og:type' content='website' />
        <meta property='og:title' content='LTC-20 scanner' />
        <meta
          property='og:description'
          content='LTC-20 token scanner website'
        />
        <meta
          property='og:image'
          content='https://ltc20-scanner.netlify.app/logo.png'
        />
        <meta name='twitter:card' content='LTC-20 scanner' />
        <meta property='twitter:domain' content='ltc20-scanner.netlify.app' />
        <meta
          property='twitter:url'
          content='https://ltc20-scanner.netlify.app/'
        />
        <meta name='twitter:title' content='LTC-20 scanner' />
        <meta
          name='twitter:description'
          content='LTC-20 token scanner website'
        />
        <meta
          name='twitter:image'
          content='https://ltc20-scanner.netlify.app/logo.png'
        />

        <meta property='og:image:type' content='image/png' />
        <meta property='og:image:width' content='1080' />
        <meta property='og:image:height' content='1080' />
        <meta property='og:image:alt' content='Logo' />
      </Head>
      <Navbar></Navbar>
    </div>
  )
}

export default Header
