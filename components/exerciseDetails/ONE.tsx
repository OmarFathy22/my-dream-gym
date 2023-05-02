import Image from "next/image";
import bodyPartlogo from "../../public/assets/icons/body-part.png";
import equipmentlogo from "../../public/assets/icons/equipment.png";
import targetlogo from "../../public/assets/icons/target.png";
import styled from "styled-components";
import Loading from "@/components/Loading";

const SimilarbyTarget = dynamic(() => import("./SimilarbyTarget"), {
  ssr: false,
  loading: () => <Loading />,
  suspense: true,
});
const SimilarByEquipment = dynamic(() => import("./SimilarByEquipment"), {
  ssr: false,
  loading: () => <Loading />,
  suspense: true,
});
const SimilarYoutube = dynamic(() => import("./SimilarYoutube"), {
  ssr: false,
  loading: () => <Loading />,
  suspense: true,
});
const Footer = dynamic(() => import("../Footer"), {
  ssr: false,
  loading: () => <Loading />,
  suspense: true,
});
import { useDocument } from "react-firebase-hooks/firestore";
import { doc } from "firebase/firestore";
import { db } from "@/firebase";
import dynamic from "next/dynamic";
import { Suspense } from "react";
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
const Main = styled.main`
  animation: animate 1s 1;
  transition: all 1s ease-in-out;

`
const arrayData = [bodyPartlogo , equipmentlogo , targetlogo]
const Details = ({ uId }: any) => {  
  const [value, loading, error] = useDocument(doc(db, "ITEM", 'res'));
  if (error) console.log(error);
  if(loading){
    return <Loading/>
  }
  return (
  
  <div>
      {value?.data() && <div className="pt-4">
    </div>}
      <ParentSection>
        <Main className="flex items-center">
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
        </Main>

        <Suspense fallback={<Loading />}>
          {value && <SimilarbyTarget target={value?.data()?.SELECTEDITEM?.target}  />}
          {value && <SimilarByEquipment equipment={value?.data()?.SELECTEDITEM?.equipment} />}
          {value && <SimilarYoutube NameOfExercise={value?.data()?.SELECTEDITEM?.name} />}
    </Suspense>
      </ParentSection>
      <Footer />
    </div>
  );
};

export default Details;
