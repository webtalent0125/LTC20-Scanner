import Head from 'next/head'
import { useState } from 'react'
import { Inter } from 'next/font/google'
import Header from '@/components/header'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import ReactPaginate from 'react-paginate'
import Footer from '@/components/footer'

const inter = Inter({ subsets: ['latin'] })

export default function Scanner() {
  const [tokenLists, setTokenLists] = useState([])
  const [address, setAddress] = useState('')
  const [loading, setLoading] = useState(false)
  const [loaded, setLoaded] = useState(false)

  const [itemOffset, setItemOffset] = useState(0)
  const itemsPerPage = 20

  const endOffset = itemOffset + itemsPerPage

  const currentItems = tokenLists.slice(itemOffset, endOffset)

  const pageCount = Math.ceil(tokenLists.length / itemsPerPage)

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % tokenLists.length
    setItemOffset(newOffset)
  }

  const searchTokens = async () => {
    if (!address) return false
    setLoading(true)
    setTokenLists([])
    const API_URL = `https://mixmaster.anymix.org/api/ltc20/tokens?address=${address}`

    try {
      const response = await fetch(API_URL)
      const result = await response.json()

      if (result.status && result.result.total > 0) {
        setTokenLists(result.result.list)
      }
    } catch (error) {
      console.log(error)
    }
    setLoading(false)
    setLoaded(true)
  }

  console.log(tokenLists)

  return (
    <main className={`${inter.className} bg-gray-100 dark:bg-gray-900`}>
      <Head>
        <title>LTC-20 scanner</title>
        <meta name='description' content='LTC-20 token scanner website' />
      </Head>
      <Header />
      <div className='text-center p-3 main-content'>
        <h1 className='text-3xl md:text-5xl mt-10 mb-3'>
          Search Litecoin Text Inscriptions
        </h1>
        <h3 className='text-md md:text-xl'>
          Discover text inscriptions in seconds.
        </h3>

        <div className='relative flex items-center m-auto max-w-[700px] mt-5 mb-5'>
          <input
            type='text'
            className='rounded dark:bg-gray-800 px-5 py-2 w-full border border-gray-300 dark:border-none'
            placeholder='LTC wallet address'
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />

          <button
            className='border-gray-800 flex items-center justify-center absolute right-2 bg-orange-400 dark:bg-orange-500 py-1 px-2 rounded'
            onClick={searchTokens}
          >
            <MagnifyingGlassIcon className='block h-5 w-5' aria-hidden='true' />{' '}
            {loading ? 'Loading...' : 'Search'}
          </button>
        </div>

        <div className='flex flex-wrap justify-center'>
          {loaded && currentItems.length === 0 ? (
            <p className='text-center w-full'>{'No data. :('}</p>
          ) : (
            <></>
          )}
          {currentItems.map((token, index) => {
            return (
              <div
                key={index}
                className='w-full sm:w-6/12 md:w-4/12 lg:w-3/12 p-3'
              >
                <div className='border border-gray-300 p-3 rounded bg-white dark:bg-gray-800 text-md dark:border-none'>
                  <p className='font-bold'>{token.ticker}</p>
                  <p className='flex justify-between'>
                    <span className='font-bold'>Transferable:</span>
                    <span>{token.transferableBalance}</span>
                  </p>
                  <p className='flex justify-between'>
                    <span className='font-bold'>Available:</span>
                    <span>{token.availableBalance}</span>
                  </p>
                  <hr />
                  <p className='flex justify-between'>
                    <span className='font-bold'>Total:</span>
                    <span>{token.overallBalance}</span>
                  </p>
                </div>
              </div>
            )
          })}

          <div className='w-full'>
            <ReactPaginate
              breakLabel='...'
              nextLabel='>'
              onPageChange={handlePageClick}
              pageRangeDisplayed={2}
              marginPagesDisplayed={1}
              pageCount={pageCount}
              previousLabel='<'
              renderOnZeroPageCount={null}
              className='pagination'
            />
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
