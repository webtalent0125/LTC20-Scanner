import Head from 'next/head'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Header from '@/components/header'
import { DocumentDuplicateIcon } from '@heroicons/react/24/outline'
import { useSnackbar } from 'notistack'
import Image from 'next/image'

export default function Inscribe() {
  const [callType, setCallType] = useState('deploy')
  const [tickName, settickName] = useState('')
  const [mintAmount, setMintAmount] = useState('')
  const [totalSupply, setTotalSupply] = useState('100000000')
  const [mintLimit, setMintLimit] = useState('10')
  const [orderDetail, setOrderDetail] = useState(null)
  const [deployError, setDeployError] = useState('')
  const [loading, setLoading] = useState(false)
  const [showInvoice, setShowInvoice] = useState(false)
  const [requestString, setRequestString] = useState('')
  const [requestSize, setRequestSize] = useState(0)
  const [receiveAddress, setReceiveAddress] = useState('')
  const [networkFee, setNetworkFee] = useState(2)
  const [customFee, setCustomFee] = useState(7)
  const [showCustomeFee, setShowCustomeFee] = useState(false)
  const [paymentConfirmed, setPaymentConfirmed] = useState(false)
  const [txHash, setTxHash] = useState('')
  const [repeat, setRepeat] = useState(1)

  const walletState = useSelector((RootState) => RootState.wallet)

  const { enqueueSnackbar } = useSnackbar()

  const commonOption = {
    method: 'POST',
    headers: {
      Accept: 'application.json',
      'Content-Type': 'application/json',
    },
  }

  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }

  const payOrder = async () => {
    const to_address = orderDetail.newAddress
    const amount = orderDetail.ltcAmount * 100000000

    try {
      const txid = await window.LiteX.sendLitecoin(to_address, amount)

      if (txid) {
        enqueueSnackbar('Payment confirmed successfully.', {
          variant: 'success',
          autoHideDuration: 5000,
          anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'right',
          },
        })
      }

      setTxHash(txid)
      setPaymentConfirmed(true)
    } catch (error) {
      console.log(error)
    }
  }

  const requestOrder = async () => {
    setLoading(true)

    const url = 'https://ordinalslite.xyz/api/order'

    const fileName =
      callType === 'deploy'
        ? `${tickName}.txt`
        : `${tickName}-${mintAmount}-${repeat}.txt`

    try {
      const params = {
        method: 'POST',
        body: JSON.stringify({
          receiveAddress: receiveAddress,
          fee: showCustomeFee ? customFee : networkFee,
          referral: 'true&tab',
          files: [
            {
              size: requestSize,
              name: fileName,
              type: 'plain/text',
              url: '',
              dataURL: `data:plain/text;base64,${btoa(requestString)}`,
            },
          ],
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      }

      const response = await fetch(url, params)
      const result = await response.json()

      if (result && result.status) setOrderDetail(result)
      setLoading(true)
    } catch (error) {
      console.log(error)
    }
  }

  const copyClipboard = async (text, type) => {
    try {
      await navigator.clipboard.writeText(text)
      enqueueSnackbar(`${type} copied to clipboard.`, {
        variant: 'info',
        autoHideDuration: 5000,
        style: {
          backgroundColor: '#202946',
        },
        anchorOrigin: {
          vertical: 'bottom',
          horizontal: 'right',
        },
      })
    } catch (err) {
      console.error('Failed to copy: ', err)
    }
  }

  const changeMintAmount = (value) => {
    if (value < 0) return false
    setMintAmount(value)
  }

  const makeInvoice = async () => {
    let inscribeString
    if (callType === 'deploy') {
      inscribeString = `{"p":"ltc-20","op":"${callType}","tick":"${tickName}","max":"${totalSupply}","lim":"${mintLimit}"}`
    } else {
      inscribeString = `{"p":"ltc-20","op":"${callType}","tick":"${tickName}","amt":"${mintAmount}"}`
    }

    setRequestString(inscribeString)
    setRequestSize(inscribeString.length)
    setShowInvoice(true)
  }

  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }

  const handleTypeChange = (e) => {
    setCallType(e.currentTarget.value)
  }

  useEffect(() => {
    setDeployError('')
  }, [mintLimit])

  return (
    <main className='bg-gray-100 dark:bg-gray-900 min-h-screen'>
      <Head>
        <title>LTC20 - Inscribe</title>
        <meta name='description' content='LTC20 token inscribe.' />
      </Head>
      <Header />

      <div className='p-3'>
        <h1 className='text-4xl sm:text-5xl mt-10 text-center mb-5'>
          {'Inscribe LTC-20 token'}
        </h1>

        <div className='max-w-[700px] bg-white dark:bg-gray-800 m-auto mt-5 p-5 rounded shadow-md text-center'>
          {showInvoice ? (
            <>
              {paymentConfirmed ? (
                <div className='flex flex-wrap justify-center py-10'>
                  <Image
                    src={'/success.svg'}
                    width={100}
                    height={100}
                    alt='success image'
                  />
                  <div className='w-full'>
                    <p className='text-3xl sm:text-4xl mt-3'>
                      Congratulations!
                    </p>
                    <p className='text-md sm:text-xl mt-5'>
                      Payment received. Your order will be proceed shortly.
                    </p>
                  </div>
                </div>
              ) : (
                <div className='p-3'>
                  <div className='px-5 py-10 border border-dashed border-gray-500'>
                    <div className='bg-gray-200 dark:bg-gray-600 p-5'>
                      <p className='font-bold break-words'>{requestString}</p>
                      <p>{(requestSize / 1000).toFixed(2)} KB</p>
                    </div>
                  </div>

                  <div>
                    <p className='my-3 font-bold'>
                      Tell us the LTC address you want the inscription sent or
                      add it later:
                    </p>

                    <input
                      type='text'
                      className='w-full bg-gray-100 px-3 py-2 text-black rounded'
                      placeholder='Receive LTC address'
                      value={receiveAddress}
                      onChange={(e) => setReceiveAddress(e.target.value)}
                    />
                  </div>

                  <div>
                    <p className='my-3 font-bold'>
                      Select the network fee you want to pay:
                    </p>

                    <div className='flex flex-wrap justify-between px-5'>
                      <div
                        className={classNames(
                          networkFee === 2 && !showCustomeFee
                            ? 'border-green-400'
                            : 'border-gray-500',
                          'w-full sm:w-3/12 mt-2 dark:border border-2 rounded py-3 cursor-pointer'
                        )}
                        onClick={() => {
                          setShowCustomeFee(false)
                          setNetworkFee(2)
                        }}
                      >
                        <p className='font-bold'>Economy</p>
                        <p className='text-gray-400'>2 lits/vB</p>
                        <p className='mt-4 text-[12px] text-gray-400'>
                          6+ hours
                        </p>
                      </div>

                      <div
                        className={classNames(
                          networkFee === 4 && !showCustomeFee
                            ? 'border-green-500'
                            : 'border-gray-500',
                          'w-full sm:w-3/12 mt-2 dark:border border-2 rounded py-3 cursor-pointer'
                        )}
                        onClick={() => {
                          setShowCustomeFee(false)
                          setNetworkFee(4)
                        }}
                      >
                        <p className='font-bold'>Normal</p>
                        <p className='text-gray-400'>4 lits/vB</p>
                        <p className='mt-4 text-[12px] text-gray-400'>
                          15 minutes
                        </p>
                      </div>

                      <div
                        className={classNames(
                          showCustomeFee
                            ? 'border-green-500'
                            : 'border-gray-500',
                          'w-full sm:w-3/12 mt-2 dark:border border-2 rounded py-3 cursor-pointer'
                        )}
                        onClick={() => setShowCustomeFee(true)}
                      >
                        <p className='font-bold'>Custom</p>
                        <p className='text-gray-400'>{customFee} lits/vB</p>
                        <p className='mt-4 text-[12px] text-gray-400'>
                          30 minutes
                        </p>
                      </div>
                    </div>
                  </div>

                  {showCustomeFee && (
                    <div className='mt-5 p-5 dark:bg-gray-600 bg-gray-300'>
                      <p className='text-left'>
                        You can add a custom fee below:
                      </p>
                      <input
                        type='number'
                        className='w-full px-3 py-2 bg-white dark:bg-gray-200 text-black rounded'
                        value={customFee}
                        onChange={(e) => setCustomFee(e.target.value)}
                      />
                    </div>
                  )}

                  <div className='mt-10'>
                    <button
                      className='rounded px-3 py-2 bg-blue-600 text-white disabled:bg-gray-400 disabled:cursor-not-allowed'
                      onClick={requestOrder}
                      disabled={
                        !receiveAddress ||
                        (showCustomeFee && !customFee) ||
                        orderDetail ||
                        loading
                      }
                    >
                      {orderDetail ? (
                        <>{'Waiting for payment'}</>
                      ) : (
                        <>
                          {loading ? (
                            <>{'Loading...'}</>
                          ) : (
                            <>{'Submit & pay invoice'}</>
                          )}
                        </>
                      )}
                    </button>
                  </div>
                  {orderDetail && (
                    <div className='mt-10 bg-gray-200 dark:bg-gray-600 py-5'>
                      <p className='font-bold mb-5 flex justify-center items-center gap-2'>
                        Total: {orderDetail.ltcAmount} LTC
                      </p>

                      <div>
                        <button
                          className='px-3 py-2 rounded bg-blue-500 text-white'
                          onClick={payOrder}
                        >
                          Pay with wallet
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </>
          ) : (
            <>
              <div className='flex justify-center gap-12 mb-10'>
                <p className='flex items-center'>
                  <label
                    htmlFor='deploy'
                    className={classNames(
                      'cursor-pointer',
                      callType === 'deploy'
                        ? 'text-orange-500 font-bold'
                        : 'font-medium'
                    )}
                  >
                    Deploy
                  </label>
                  <input
                    type='radio'
                    value='deploy'
                    id='deploy'
                    className={classNames(
                      'h-4 w-4 text-indigo-600 ml-2 focus:ring-orange-600 cursor-pointer',
                      callType === 'deploy' ? 'text-orange-500' : ''
                    )}
                    checked={callType === 'deploy'}
                    onChange={handleTypeChange}
                  />
                </p>

                <p className='flex items-center'>
                  <label
                    htmlFor='mint'
                    className={classNames(
                      callType === 'mint'
                        ? 'text-orange-500 font-bold'
                        : 'font-medium',
                      'cursor-pointer'
                    )}
                  >
                    Mint
                  </label>
                  <input
                    type='radio'
                    value='mint'
                    id='mint'
                    className={classNames(
                      'h-4 w-4 text-indigo-600 ml-2 focus:ring-orange-600 cursor-pointer',
                      callType === 'mint' ? 'text-orange-500' : ''
                    )}
                    checked={callType === 'mint'}
                    onChange={handleTypeChange}
                  />
                </p>
              </div>

              {callType === 'mint' ? (
                <div className='mint-form'>
                  <div className='flex items-center'>
                    <div className='w-3/12 md:w-2/12'>
                      <label htmlFor='tickName' className='cursor-pointer'>
                        Tick:
                      </label>
                    </div>

                    <div className='w-9/12 md:w-10/12'>
                      <input
                        type='text'
                        maxLength={4}
                        id='tickName'
                        value={tickName}
                        onChange={(e) => settickName(e.target.value)}
                        className='w-full rounded block flex-1 border border-gray-300  dark:border-0 py-1.5 px-3 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 text-gray-800 dark:bg-gray-300 font-medium'
                        placeholder='3-4 characters like abcd...'
                      />
                    </div>
                  </div>

                  <div className='flex items-center mt-7'>
                    <div className='w-3/12 md:w-2/12'>
                      <label htmlFor='amount' className='cursor-pointer'>
                        Amount:
                      </label>
                    </div>

                    <div className='w-9/12 md:w-10/12'>
                      <input
                        type='number'
                        id='amount'
                        value={mintAmount}
                        onChange={(e) => changeMintAmount(e.target.value)}
                        className='w-full rounded block flex-1 border border-gray-300  dark:border-0 py-1.5 px-3 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 text-gray-800 dark:bg-gray-300 font-medium'
                        placeholder='Mint amount.'
                      />
                    </div>
                  </div>

                  <div className='text-center'>
                    <button
                      className='bg-orange-500 px-2 py-1 rounded mt-5 text-white disabled:bg-gray-400'
                      disabled={mintAmount <= 0 || loading}
                      onClick={makeInvoice}
                    >
                      {loading ? <>Loading...</> : <>{'Next'}</>}
                    </button>
                  </div>
                </div>
              ) : (
                <div className='deploy-form'>
                  <div className='flex items-center flex-wrap'>
                    <div className='w-3/12 md:w-2/12'>
                      <label htmlFor='tickName' className='cursor-pointer'>
                        Tick:
                      </label>
                    </div>

                    <div className='w-9/12 md:w-10/12'>
                      <input
                        type='text'
                        id='tickName'
                        maxLength={4}
                        value={tickName}
                        onChange={(e) => settickName(e.target.value)}
                        className='w-full rounded block flex-1 border border-gray-300 dark:border-0 py-1.5 px-3 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 text-gray-800 dark:bg-gray-300 font-medium'
                        placeholder='3-4 characters like abcd...'
                      />
                    </div>
                    <div className='w-3/12 md:w-2/12'></div>
                  </div>

                  <div className='flex items-center mt-7'>
                    <div className='w-3/12 md:w-2/12'>
                      <label htmlFor='totalSupply' className='cursor-pointer'>
                        Total Supply:
                      </label>
                    </div>

                    <div className='w-9/12 md:w-10/12'>
                      <input
                        type='number'
                        id='totalSupply'
                        value={totalSupply}
                        onChange={(e) => setTotalSupply(e.target.value)}
                        className='w-full rounded block flex-1 border border-gray-300 dark:border-0 py-1.5 px-3 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 text-gray-800 dark:bg-gray-300 font-medium'
                        placeholder='Total Supply amount.'
                      />
                    </div>
                  </div>

                  <div className='flex items-center mt-7 flex-wrap'>
                    <div className='w-3/12 md:w-2/12'>
                      <label htmlFor='limitAmount' className='cursor-pointer'>
                        Mint Limit:
                      </label>
                    </div>

                    <div className='w-9/12 md:w-10/12'>
                      <input
                        type='number'
                        id='limitAmount'
                        value={mintLimit}
                        onChange={(e) => setMintLimit(e.target.value)}
                        className='w-full rounded block flex-1 border border-gray-300 dark:border-0 py-1.5 px-3 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 text-gray-800 dark:bg-gray-300 font-medium'
                        placeholder='Limit amount.'
                      />
                    </div>
                    <div className='w-3/12 md:w-2/12'></div>
                    <div className='w-9/12 md:w-10/12'>
                      {deployError && (
                        <p className='block text-sm text-orange-600 text-left'>
                          {deployError}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className='text-center'>
                    <button
                      className='bg-orange-500 px-2 py-1 rounded mt-5 text-white disabled:bg-gray-400'
                      disabled={
                        !tickName ||
                        !totalSupply ||
                        !mintLimit ||
                        loading ||
                        !walletState.account
                      }
                      onClick={makeInvoice}
                    >
                      {loading ? (
                        <>Loading...</>
                      ) : (
                        <>
                          {walletState.account ? (
                            <>Next</>
                          ) : (
                            <>Connect wallet</>
                          )}
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </main>
  )
}
