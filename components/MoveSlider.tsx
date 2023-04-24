import React from 'react'
import { useSwiper } from 'swiper/react';
import Image from 'next/image';
import forwardIcon from "../public/assets/icons/right-arrow.png";
import backwardIcon from "../public/assets/icons/left-arrow.png";
import styled from 'styled-components';

type Props = {}
export const Moveslider = styled.div`
  display: flex;
  flex-direction: row-reverse;
  gap: 50px;
`;

const MoveSlider = ({handleNext , handlePrev}:any) => {

  return (
    <Moveslider>
        <Image
         className="cursor-pointer "
          onClick={handleNext}
          height={30}
          width={30}
          src={forwardIcon}
          alt="icon"
        />
      <Image
       className="cursor-pointer"
        onClick={handlePrev}
        height={30}
        width={30}
        src={backwardIcon}
        alt="icon"
      />
    </Moveslider>
  )
}

export default MoveSlider