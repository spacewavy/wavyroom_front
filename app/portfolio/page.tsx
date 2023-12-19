"use client";
// hmmm...

import React, { useEffect } from "react";
import WavyDropdown from "@/components/WavyDropdown";
import PortfolioCard from "../../components/PortfolioCard";
import { useDispatch, useSelector } from 'react-redux';
import { fetchPortfolioData } from "../redux/actions/portfolioActions";
import { AnyAction } from "redux";
import { RootState } from "../redux/reducers";
import {PortfolioItem} from "../redux/types"

const Portfolio = () => {
  const dispatch = useDispatch();
  const { data, error } = useSelector(
    (state: RootState) => state.portfolio
  );

  useEffect(()=>{
    dispatch(fetchPortfolioData('all')  as unknown as AnyAction)
  },[])


  const OPTIONS = [
    { value: "all", label: "전체" },
    { value: "toTen", label: "~10평" },
    { value: "elevenToTwenty", label: "11~20평" },
    { value: "twentyToThirty", label: "20~30평" },
    { value: "moreThanThirty", label: "30평~" },
  ];

  const onDropdownChange = (newValue: any) => {
    dispatch(fetchPortfolioData(newValue.value)  as unknown as AnyAction)
  };

  return (
    <main className="flex flex-col flex-1">
      <section className="px-4 pt-16 pb-4 md:px-8 md:pt-32 md:pb-8">
        <div className="flex flex-1 flex-col md:flex-row gap-4">
          <div className="flex flex-1 text-displaySM md:text-displayMD lg:text-displayLG font-light">
            포트폴리오
          </div>
          <div className="flex flex-1 flex-col gap-2">
            <div className="text-[12px] text-midGray">프로젝트 사이즈</div>
            <WavyDropdown
              options={OPTIONS}
              defaultValue={OPTIONS[0]}
              onChange={onDropdownChange}
            />
          </div>
        </div>
        {!error && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-2 gap-x-4 md:gap-y-8 lg:gap-y-12 py-4 md:py-8">
          {data.map((item:PortfolioItem, index:number) => (
            <PortfolioCard key={index} portfolio={item} />
          ))}
        </div>
        )}  
      </section>
    </main>
  );
};

export default Portfolio;
