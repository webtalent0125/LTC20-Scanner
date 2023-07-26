import Head from 'next/head'
import { Inter } from 'next/font/google'
import Header from '@/components/header'
import Featured from '@/components/featuredSection'
import PriceTable from '@/components/priceTable'
import Footer from '@/components/footer'
// import Banner from '@/components/banner'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main className={`${inter.className} bg-gray-100 dark:bg-gray-900`}>
      <Head>
        <title>LTC-20 scanner</title>
        <meta name='description' content='LTC-20 token scanner website' />
      </Head>
      <Header />
      {/* <Banner /> */}
      <div className='mx-auto max-w-6xl px-2 sm:px-6 lg:px-8 main-content'>
        <Featured />
        <PriceTable />
      </div>
      <Footer />
    </main>
  )
}
