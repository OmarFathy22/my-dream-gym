import React from 'react'
import ONE from '@/components/exerciseDetails/ONE';
import Head from 'next/head';


type Props = {}

const index = (props: Props) => {
  return (
    <div>
         <Head>
       <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests"/>
       </Head>
      <ONE/>
    </div>
  )
}

export default index