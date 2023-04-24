import { useRouter } from 'next/router';
import React from 'react'
import ONE from '../components/exerciseDetails/ONE'

type Props = {}

const Post = (props: Props) => {
  const router = useRouter();
  const {uId} = router.query;
  return (
    <div>
     <ONE uId = {uId}/>
    </div>
  )
}

export default Post