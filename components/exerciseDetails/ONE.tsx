import Image from "next/image";
import bodyPartlogo from "../../public/assets/icons/body-part.png";
import equipmentlogo from "../../public/assets/icons/equipment.png";
import targetlogo from "../../public/assets/icons/target.png";
import styled from "styled-components";
import SimilarbyTarget from "./SimilarbyTarget";
import SimilarByEquipment from "./SimilarByEquipment";
import { useDocument } from "react-firebase-hooks/firestore";
import { doc } from "firebase/firestore";
import { db } from "@/firebase";
import SimilarYoutube from "./SimilarYoutube";
import Footer from "../Footer";
import Loading from "@/pages/Loading";
import { useEffect, useState } from "react";
const Section = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: fit-content;
  flex: 1;
  gap: 30px;
`;
const ParentSection = styled.section`
  display: flex;
  flex-direction: column;
  padding-top: 15px;
  align-items: center;
  justify-content: center;
`;
const ParentSectionMobile = styled.section`
display: flex;
padding-top: 15px;
align-items: center;
justify-content: center;
`;
const arrayData = [bodyPartlogo , equipmentlogo , targetlogo]
const Details = ({ uId }: any) => {
  const [Loader, setLoader] = useState(true)
  useEffect(() => {
    setTimeout(() => {
     setLoader(false)
    }, 1000);
    console.log('Route changed:', uId);
  }, [uId]);
  const [value, loading, error] = useDocument(doc(db, "ITEM", 'res'));
  if (error) console.log(error);
  if(loading || Loader){
    return <Loading/>
  }
  return (
    <div>
      {value?.data() && <div className="pt-4">
    </div>}
      <ParentSection>
        <main className="flex items-center">
          <Section >
            <h1 className="text-[40px] font-bold  ">{value?.data()?.SELECTEDITEM.name}</h1>
            {value?.data()?.SELECTEDITEM.gifUrl && (
              <Image
                priority={true}
                className="max-h-[500px] w-[800px]"
                width={550}
                height={500}
                src={value.data()?.SELECTEDITEM.gifUrl}
                alt="image"
              />
            )}
            <p>
              Exercieses Keep you strong. {value?.data()?.SELECTEDITEM.name} is one of the best.
              exercieses to target your {value?.data()?.SELECTEDITEM.target}.It will help you improve
              your mood and gain energy
            </p>
            <article className="flex  gap-[30px] w-full">
              {arrayData.map((item:any , index:number) => {
                return(
                  <div key={index} className="flex w-full flex-col justify-center gap-3 items-center">
                <div className="bg-yellow-100 rounded-full p-5">
                  <Image width={40} height={40} src={item} alt="icon" />
                </div>
                <h4 className="font-semibold">{
                 index === 0 ? value?.data()?.SELECTEDITEM?.bodyPart : index === 1 ? value?.data()?.SELECTEDITEM?.equipment : value?.data()?.SELECTEDITEM?.target
                }</h4>
              </div>
                )
              })}
            </article>
          </Section>
        </main>

        {value && <SimilarbyTarget target={value?.data()?.SELECTEDITEM?.target} />}
        {value && <SimilarByEquipment equipment={value?.data()?.SELECTEDITEM?.equipment} />}
        {value && <SimilarYoutube NameOfExercise={value?.data()?.SELECTEDITEM?.name} />}
      </ParentSection>
      <Footer />
    </div>
  );
};

export default Details;
