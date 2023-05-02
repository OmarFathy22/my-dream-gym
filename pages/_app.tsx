import '@/styles/globals.css'
import { configureStore } from '@reduxjs/toolkit';
import type { AppProps } from 'next/app'
import selectedexercise from '../components/features/selectedExercise'
import exerciseName from '../components/features/exerciseName';
import { Provider } from 'react-redux';
import dynamic from 'next/dynamic';
const Header = dynamic(() => import("@/components/Header"), {
  ssr: false,
  suspense: true,
});
const Footer = dynamic(() => import("@/components/Footer"), {
  ssr: false,
  suspense: true,
});

  const store = configureStore({
    reducer:{
      exercise:selectedexercise,
      exercisename:exerciseName,
    }
  })
export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store = {store}>
      <div className='px-[5%] bg-red-50'>
         <Header/>
        <Component {...pageProps} />
        <Footer/>
      </div>
    </Provider>
  )
}

