import { useRouter } from 'next/router';
import React, { useEffect, useRef } from 'react'
import dynamic from 'next/dynamic';
const ONE = dynamic(() => import("../components/exerciseDetails/ONE"), {
  ssr: false,
  suspense: true,
});

const Post = (e:any) => {
  const elementRef:any = useRef();
  useEffect(() => elementRef.current.scrollIntoView());
  const router = useRouter();
  const {uId} = router.query;
  return (
    <div ref={elementRef}>
     <ONE uId = {uId}/>

    </div>
  )
}

export default Post