import { Fragment, useSelector, useDispatch } from 'react-redux'
import { useState, useEffect } from 'react'
import { useSnackbar } from 'notistack'
import { setAddressAction, setBalanceAction } from '@/store/actions'
import { WalletIcon, DocumentDuplicateIcon } from '@heroicons/react/24/outline'
import { Menu, Transition } from '@headlessui/react'

export default function WalletConnect() {
  const dispatch = useDispatch()
  const walletState = useSelector((RootState) => RootState.wallet)

  const { enqueueSnackbar } = useSnackbar()
  const [account, setAccount] = useState('')
  const [balance, setBalance] = useState(0)

  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }

  const truncateAddress = () => {
    const newAddress = account.slice(0, 5) + '...' + account.slice(-5)
    return newAddress
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

  const connectWallet = async () => {
    if (window.LiteX) {
      const accounts = await window.LiteX.requestAccounts()
      setAccount(accounts[0])
      dispatch(setAddressAction(accounts[0]))

      const walletBalance = await window.LiteX.getBalance()
      if (walletBalance) setBalance(walletBalance.total)
    } else {
      disconnect()
      enqueueSnackbar('Install LiteX wallet and reload page.', {
        variant: 'error',
        autoHideDuration: 3000,
        anchorOrigin: {
          vertical: 'bottom',
          horizontal: 'right',
        },
      })
    }
  }

  const disconnect = () => {
    setAccount(null)
    dispatch(setAddressAction(null))
    dispatch(setBalanceAction(0))
  }

  useEffect(() => {
    if (walletState.account) connectWallet()
  }, [walletState])

  if (account) {
    return (
      <Menu as='div' className='relative ml-2'>
        <div>
          <Menu.Button className='bg-blue-500 rounded py-1 px-2 text-white'>
            <span className='sr-only'>Open user menu</span>
            <p className='flex items-center'>
              <WalletIcon className='block h-5 w-5 mr-1' aria-hidden='true' />
              {truncateAddress()}
            </p>
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter='transition ease-out duration-100'
          enterFrom='transform opacity-0 scale-95'
          enterTo='transform opacity-100 scale-100'
          leave='transition ease-in duration-75'
          leaveFrom='transform opacity-100 scale-100'
          leaveTo='transform opacity-0 scale-95'
        >
          <Menu.Items className='absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-gray-900 border dark:border-gray-700'>
            <Menu.Item>
              <span
                className={classNames(
                  'flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-100 cursor-pointer'
                )}
              >
                Address: {truncateAddress(account)}
                <DocumentDuplicateIcon
                  className='w-4 h-4 ml-1'
                  onClick={() => copyClipboard(account, 'Address')}
                />
              </span>
            </Menu.Item>
            <Menu.Item>
              <span
                className={classNames(
                  'block px-4 py-2 text-sm text-gray-700 dark:text-gray-100 cursor-pointer'
                )}
              >
                Balance: {(balance / 100000000).toFixed(3)} LTC
              </span>
            </Menu.Item>
            <Menu.Item>
              <span
                className={classNames(
                  'block px-4 py-2 text-sm text-gray-700 dark:text-gray-100 cursor-pointer'
                )}
                onClick={disconnect}
              >
                Disconnect
              </span>
            </Menu.Item>
          </Menu.Items>
        </Transition>
      </Menu>
    )
  } else {
    return (
      <button
        className='bg-blue-500 rounded py-1 px-2 text-white ml-2'
        onClick={connectWallet}
      >
        <p className='flex items-center'>
          <WalletIcon className='block h-5 w-5 mr-1' aria-hidden='true' />
          Connect wallet
        </p>
      </button>
    )
  }
}
