import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { doc } from "firebase/firestore";
import { db } from "@/firebase";
import { useDocument } from "react-firebase-hooks/firestore";
import { EffectCards } from "swiper";
import "swiper/swiper-bundle.min.css";
import { EXERCISENAME } from "../components/features/exerciseName";
import { useDispatch } from "react-redux";

const ForTesting = () => {
  const [Value, loading, error] = useDocument(
    doc(db, "List of bodyparts", "result")
  );
  const dispatch = useDispatch();

  return (
    <div>
      <Swiper
        effect={"cards"}
        grabCursor={true}
        modules={[EffectCards]}
        className="mySwiper-1 justify-center items-center flex"
      >
        {Value?.data()?.firstArray?.map((exercise: any, index: number) => {
          return (
            <SwiperSlide
              onClick={() => {
                setTimeout(() => {
                  window.scrollTo({ top: 1600, behavior: "smooth" });
                }, 1000);
                dispatch(EXERCISENAME(exercise));
              }}
              className="swiper-slide-1 !flex !justify-center !items-center"
              key={index}
            >
              <h1>{exercise}</h1>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default ForTesting;
