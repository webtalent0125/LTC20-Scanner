import Head from 'next/head'
import Header from '@/components/header'
import {
  CheckCircleIcon,
  KeyIcon,
  FolderOpenIcon,
  FingerPrintIcon,
  SwatchIcon,
  ShieldCheckIcon,
  BoltIcon,
} from '@heroicons/react/24/outline'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { Carousel } from 'react-responsive-carousel'
import Image from 'next/image'
import { useTheme } from 'next-themes'

export default function Wallet() {
  const { theme, setTheme } = useTheme()

  return (
    <main className='bg-gray-100 dark:bg-gray-900 min-h-screen'>
      <Head>
        <title>LTC20 - Inscribe</title>
        <meta name='description' content='LTC20 token inscribe.' />
      </Head>
      <Header />

      <div className='max-w-[1200px] m-auto py-10 px-3 flex flex-wrap justify-between'>
        <div className='w-full md:w-6/12 md:pt-32'>
          <h1 className='text-center text-4xl md:text-5xl font-bold mb-3'>
            LiteX Wallet
          </h1>

          <h2 className='text-center text-xl md:text-2xl mb-10'>
            Opensource Litecoin extension wallet - LTC20 supported
          </h2>

          <p className='text-center md:text-md mb-10'>
            Introducing the ultimate destination for secure and effortless
            cryptocurrency management – our cutting-edge Crypto Wallet website
          </p>

          <div className='mt-10 w-full flex flex-wrap justify-center gap-5 font-bold'>
            <a
              className='w-[300px] sm:w-fit rounded px-3 py-2 bg-blue-700 text-white dark:bg-white dark:text-black flex items-center justify-center'
              href='/wallet.crx'
            >
              Download from site
              {theme === 'light' ? (
                <Image
                  src={'/logo-light.png'}
                  width={30}
                  height={30}
                  alt='github image'
                  className='ml-2'
                />
              ) : (
                <Image
                  src={'/logo.png'}
                  width={30}
                  height={30}
                  alt='github image'
                  className='ml-2'
                />
              )}
            </a>
            <a
              className='w-[300px] sm:w-fit rounded px-3 py-2 bg-blue-700 text-white dark:bg-white dark:text-black flex items-center justify-center'
              href='https://github.com'
              target={'_blank'}
            >
              Download from Github
              {theme === 'light' ? (
                <Image
                  src={'/github-white.png'}
                  width={25}
                  height={25}
                  alt='github image'
                  className='ml-2'
                />
              ) : (
                <Image
                  src={'/github.png'}
                  width={25}
                  height={25}
                  alt='github image'
                  className='ml-2'
                />
              )}
            </a>
          </div>
        </div>
        <div className='w-full md:w-4/12 mt-10 px-10 sm:px-20 md:px-0 md:mt-0'>
          <Carousel
            autoPlay={true}
            infiniteLoop={true}
            showThumbs={false}
            showArrows={false}
            showStatus={false}
            showIndicators={false}
          >
            <div>
              <img src='/wallet1.png' />
            </div>
            <div>
              <img src='/wallet2.png' />
            </div>
            <div>
              <img src='/wallet3.png' />
            </div>
            <div>
              <img src='/wallet4.png' />
            </div>
          </Carousel>
        </div>

        <div className='w-full mt-20 text-center'>
          <h2 className='text-4xl font-bold'>
            You Deserve Easy Access to Cryptocurrencies
          </h2>

          <p className='text-xl mt-5'>LiteX Wallet is for you if you want to</p>

          <div className='flex flex-wrap'>
            <div className='w-full sm:w-6/12 md:w-4/12 mt-5 p-3'>
              <div className='border px-3 py-5 rounded-lg bg-gray-300 dark:bg-gray-800 flex'>
                <div className='w-2/12'>
                  <KeyIcon className='w-10 h-10 mr-2' />
                </div>
                <div className='w-10/12'>
                  <p className='text-left text-xl font-bold'>
                    Non-custodial Wallet
                  </p>
                  <p className='text-left mt-3'>
                    Only you have access to your accounts, funds, private keys
                    and data. We cannot help you restore once they are lost.
                  </p>
                </div>
              </div>
            </div>

            <div className='w-full sm:w-6/12 md:w-4/12 mt-5 p-3'>
              <div className='border px-3 py-5 rounded-lg bg-gray-300 dark:bg-gray-800 flex'>
                <div className='w-2/12'>
                  <FingerPrintIcon className='w-10 h-10 mr-2' />
                </div>
                <div className='w-10/12'>
                  <p className='text-left text-xl font-bold'>
                    Respected User Privacy
                  </p>
                  <p className='text-left mt-3'>
                    We do not track any personal identifiable information, your
                    account addresses or asset balances.
                  </p>
                </div>
              </div>
            </div>

            <div className='w-full sm:w-6/12 md:w-4/12 mt-5 p-3'>
              <div className='border px-3 py-5 rounded-lg bg-gray-300 dark:bg-gray-800 flex'>
                <div className='w-2/12'>
                  <FolderOpenIcon className='w-10 h-10 mr-2' />
                </div>
                <div className='w-10/12'>
                  <p className='text-left text-xl font-bold'>
                    Fully Open Source
                  </p>
                  <p className='text-left mt-3'>
                    As a Web3 project, we keep our GitHub open-sourced so that
                    anyone can audit our codes.
                  </p>
                </div>
              </div>
            </div>

            <div className='w-full sm:w-6/12 md:w-4/12 mt-5 p-3'>
              <div className='border px-3 py-5 rounded-lg bg-gray-300 dark:bg-gray-800 flex'>
                <div className='w-2/12'>
                  <BoltIcon className='w-10 h-10 mr-2' />
                </div>
                <div className='w-10/12'>
                  <p className='text-left text-xl font-bold'>
                    Independent Audit
                  </p>
                  <p className='text-left mt-3'>
                    We have officially passed independent security audit 02
                    times and received certification.
                  </p>
                </div>
              </div>
            </div>

            <div className='w-full sm:w-6/12 md:w-4/12 mt-5 p-3'>
              <div className='border px-3 py-5 rounded-lg bg-gray-300 dark:bg-gray-800 flex'>
                <div className='w-2/12'>
                  <SwatchIcon className='w-10 h-10 mr-2' />
                </div>
                <div className='w-10/12'>
                  <p className='text-left text-xl font-bold'>
                    Cold Wallet Support
                  </p>
                  <p className='text-left mt-3'>
                    You can use Polkadot Vault, Ledger and Keystone with
                    SubWallet to better secure your assets.
                  </p>
                </div>
              </div>
            </div>

            <div className='w-full sm:w-6/12 md:w-4/12 mt-5 p-3'>
              <div className='border px-3 py-5 rounded-lg bg-gray-300 dark:bg-gray-800 flex'>
                <div className='w-2/12'>
                  <ShieldCheckIcon className='w-10 h-10 mr-2' />
                </div>
                <div className='w-10/12'>
                  <p className='text-left text-xl font-bold'>
                    Phishing Prevention
                  </p>
                  <p className='text-left mt-3'>
                    {`We have integrated phishing lists from Polkadot {.js} and ChainPatrol to protect you from scams.`}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
