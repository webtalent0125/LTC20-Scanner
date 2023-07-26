import { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'
import Image from 'next/image'

export default function Footer() {
  const [mounted, setMounted] = useState(false)

  const { theme, resolvedTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  const logo = theme === 'dark' ? '/logo-light.png' : '/logo.png'

  return (
    <div className='mt-10 bg-white text-center text-sm dark:bg-gray-800 py-5'>
      {mounted && (
        <Image
          src={logo}
          width={70}
          height={70}
          alt='site logo'
          className='m-auto'
        />
      )}
      <p className='font-bold mt-5'>&copy;2023 All right reserved.</p>
    </div>
  )
}
