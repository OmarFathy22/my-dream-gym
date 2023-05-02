import React from 'react'
import dynamic from 'next/dynamic';
const ONE = dynamic(() => import("@/components/exerciseDetails/ONE"), {
  ssr: false,
  suspense: true,
});


type Props = {}

const index = (props: Props) => {
  return (
    <div>
      <ONE/>
    </div>
  )
}

export default index