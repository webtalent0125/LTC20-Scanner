import { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Disclosure } from '@headlessui/react'
import { Bars3Icon, XMarkIcon, FireIcon } from '@heroicons/react/24/outline'
import ThemeChanger from './themeChanger'
import WalletConnect from './walletConnect'

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Scanner', href: '/scanner' },
  { name: 'Inscribe', href: '/inscribe' },
  { name: 'LiteX Wallet', href: '/wallet' },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Navbar() {
  const [mounted, setMounted] = useState(false)

  const pathname = usePathname()
  const { theme, resolvedTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  const logo = theme === 'dark' ? '/logo-light.png' : '/logo.png'

  return (
    <Disclosure as='nav' className='bg-white shadow-md dark:bg-gray-800'>
      {({ open }) => (
        <>
          <div className='mx-auto max-w-7xl px-2 sm:px-6 lg:px-8'>
            <div className='relative flex h-16 items-center justify-between'>
              <div className='absolute inset-y-0 left-0 flex items-center sm:hidden'>
                {/* Mobile menu button*/}
                <Disclosure.Button className='inline-flex items-center justify-center rounded-md p-2 text-gray-800 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white dark:text-gray-400'>
                  <span className='sr-only'>Open main menu</span>
                  {open ? (
                    <XMarkIcon className='block h-6 w-6' aria-hidden='true' />
                  ) : (
                    <Bars3Icon className='block h-6 w-6' aria-hidden='true' />
                  )}
                </Disclosure.Button>
                <ThemeChanger />
              </div>
              <div className='flex flex-1 items-center justify-center sm:items-stretch sm:justify-start'>
                <div className='flex flex-shrink-0 items-center'>
                  {mounted && (
                    <Image src={logo} width={50} height={50} alt='site logo' />
                  )}
                </div>
                <div className='hidden sm:ml-6 sm:flex items-center'>
                  <div className='flex space-x-4'>
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className={classNames(
                          pathname === item.href
                            ? 'border-b-2 border-[#2d598a] dark:bg-gray-900 dark:text-white'
                            : 'text-gray-800 hover:border-b hover:border-[#2d598a] dark:hover:bg-gray-700 dark:hover:text-white dark:text-gray-300 dark:hover:border-none',
                          'dark:rounded-md px-3 py-2 font-bold text-sm dark:border-none cursor-pointer flex items-center'
                        )}
                        aria-current={
                          pathname === item.href ? 'page' : undefined
                        }
                      >
                        {item.name === 'LiteX Wallet' && (
                          <FireIcon
                            className='block h-6 w-6 mr-1 text-orange-500'
                            aria-hidden='true'
                          />
                        )}
                        {item.name}
                        {item.name === 'LiteX Wallet' && (
                          <FireIcon
                            className='block h-6 w-6 ml-1 text-orange-500'
                            aria-hidden='true'
                          />
                        )}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
              <div className='hidden sm:flex items-center pr-2 sm:ml-6 sm:pr-0'>
                <ThemeChanger />
              </div>
              <div className='absolute inset-y-0 right-0 flex items-center sm:static sm:inset-auto'>
                <WalletConnect />
              </div>
            </div>
          </div>

          <Disclosure.Panel className='sm:hidden'>
            <div className='space-y-1 px-2 pb-3 pt-2'>
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as='a'
                  href={item.href}
                  className={classNames(
                    pathname === item.href
                      ? 'bg-gray-900 text-white'
                      : 'text-gray-800 hover:bg-gray-700 hover:text-white dark:text-gray-300',
                    'flex items-center rounded-md px-3 py-2 text-base font-medium'
                  )}
                  aria-current={pathname === item.href ? 'page' : undefined}
                >
                  {item.name === 'LiteX Wallet' && (
                    <FireIcon
                      className='block h-6 w-6 mr-1 text-orange-500'
                      aria-hidden='true'
                    />
                  )}
                  {item.name}
                  {item.name === 'LiteX Wallet' && (
                    <FireIcon
                      className='block h-6 w-6 ml-1 text-orange-500'
                      aria-hidden='true'
                    />
                  )}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}
