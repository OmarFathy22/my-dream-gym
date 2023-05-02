import React, { useRef } from "react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import styled from "styled-components";
import "swiper/css";
import "swiper/css/navigation";
import { doc } from "firebase/firestore";
import { db } from "@/firebase";
import { useDocument } from "react-firebase-hooks/firestore";
import ForTesting from "../ForTesting";
import Loading from "@/components/Loading";
import { useDispatch } from "react-redux";
import { EXERCISENAME } from "@/components/features/exerciseName";
type Props = {};
const Main = styled.main`
  margin: 200px 0 150px 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 40px;
  @media (max-width: 768px) {
    justify-content: flex-start;
    height: fit-content;
    margin: 100px 0 100px 0;
  }
`;
const Text = styled.h1`
  font-size: 35px;
  width: 100%;
  font-weight: 500;
  text-align: center;
`;
const SearchBox = styled.form`
  width: 100%;
  display: flex;
`;
const SearchBar = styled.input`
  flex: 9;
  border: 1px solid #888;
  border-radius: 2px;
  padding: 10px;
  color: #888;
  &:focus {
    outline: none;
  }
`;
const SearchButton = styled.button`
  border: none;
  background-color: #fe3535;
  color: #e0dede;
  border-radius: 2px;
  flex: 2;
`;
export const CardsBox = styled.div`
  width: 100%;
  height: 500px;
  display: flex;
  gap: 30px;
  flex-wrap: wrap;
  align-items: center;
  position: relative;
  justify-content: center;
`;
export const ExerciseCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 30px;
  cursor: pointer;
  width: 300px;
  height: 100% !important;
  border: 1px solid #888;
  border-radius: 3px;
  margin-bottom: 60px;
`;
export const ExercisesName = styled.h1`
  font: 20px;
  font-weight: 700;
`;

export default function SecondSection() {
  const Ref:any = useRef(null);
  const dispatch = useDispatch();
  const handleSearch = (e:any) => {
    e.preventDefault();
    setTimeout(() => {
      dispatch(EXERCISENAME(Ref?.current?.value));
      Ref.current.value = "";
      window.scrollTo({ top: 1700, behavior: "smooth" });
    }, 200);
   }
  const [Value, loading, error] = useDocument(
    doc(db, "List of bodyparts", "result")
  );
  if (error) console.log(error);
  if (loading) return <Loading />;
  return (
    <Main style={{  animation: "animate 1s 1" , transition: "all 1s ease-in-out"}}>
      <Text>
        Awesome Exercises You <br /> Should Know
      </Text>
      <SearchBox onSubmit={handleSearch}>
        <SearchBar ref={Ref} placeholder="Search Exercises" />
        <SearchButton onClick={handleSearch}>Search</SearchButton>
      </SearchBox>
      <CardsBox>
        <ForTesting/>
      </CardsBox>
    </Main>
  );
};

