import React from 'react'
import styled from 'styled-components';
import Image from 'next/image';
import forwardIcon from "../public/assets/icons/right-arrow.png";
import backwardIcon from "../public/assets/icons/left-arrow.png";
const MoveSlider = styled.div`
  width:100%;
  display: flex;
  justify-content: center;
  align-items:center;
  flex-direction: row-reverse;
  column-gap: 50px;
  z-index: 100000;
  

`;
const Move = ({handleNext , handlePrev} :any) => {
  return (
    <div>
      <MoveSlider>
          <Image
            className="cursor-pointer ease-in duration-150 hover:scale-[90%] active:scale-[90%] "
            onClick={handleNext}
            height={30}
            width={30}
            src={forwardIcon}
            alt="icon"
          />
          <Image
            className="cursor-pointer ease-in duration-150 hover:scale-[90%] active:scale-[90%]"
            onClick={handlePrev}
            height={30}
            width={30}
            src={backwardIcon}
            alt="icon"
          />
        </MoveSlider>
    </div>
  )
}

export default Move;