import Footer from '@/components/Footer'
import '@/styles/globals.css'
import { configureStore } from '@reduxjs/toolkit';
import type { AppProps } from 'next/app'
import selectedexercise from './features/selectedExercise'
import { Provider } from 'react-redux';

  const store = configureStore({
    reducer:{
      exercise:selectedexercise,
    }
  })
export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store = {store}>
      <div className='px-[5%] bg-red-50'>
        <Component {...pageProps} />
        {/* <Footer/> */}
      </div>
    </Provider>
  )
}

