import Footer from '@/components/Footer'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className='px-[5%] bg-red-50'>
      <Component {...pageProps} />
      {/* <Footer/> */}
    </div>
  )
}

