"use client";
// hmmm...

import React, { useEffect, useState } from "react";
import WavyDropdown from "@/components/WavyDropdown";
import PortfolioCard from "../../components/PortfolioCard";
import { useDispatch, useSelector } from 'react-redux';
import { fetchPortfolioData } from "../redux/actions/portfolioActions";
import { AnyAction } from "redux";
import { RootState } from "../redux/reducers";
import {PortfolioItem} from "../redux/types"
import { useTranslation } from "react-i18next";

const Portfolio = () => {
  const { t } =useTranslation()
  const dispatch = useDispatch();
  const { data, error } = useSelector(
    (state: RootState) => state.portfolio
  );
  const { language } = useSelector((state: any) => state.locale);
   const OPTIONS= [
    { value: "all", label: t('portfolio.dropdown-opts.opt-1') },
    { value: "toTen", label: t('portfolio.dropdown-opts.opt-2') },
    { value: "elevenToTwenty", label: t('portfolio.dropdown-opts.opt-3') },
    { value: "twentyToThirty", label: t('portfolio.dropdown-opts.opt-4') },
    { value: "moreThanThirty", label: t('portfolio.dropdown-opts.opt-5') },
  ];

  useEffect(()=>{
    dispatch(fetchPortfolioData('all')  as unknown as AnyAction);
  },[language])


 

  const onDropdownChange = (newValue: any) => {
    dispatch(fetchPortfolioData(newValue.value)  as unknown as AnyAction)
  };

  return (
    <main className="flex flex-col flex-1">
      <section className="px-4 pt-16 pb-4 md:px-8 md:pt-32 md:pb-8">
        <div className="flex flex-1 flex-col md:flex-row gap-4">
          <div className="flex flex-1 text-displaySM md:text-displayMD lg:text-displayLG font-light">
          {t('portfolio.title')}
          </div>
          <div className="flex flex-1 flex-col gap-2">
            <div className="text-[12px] text-midGray">{t('portfolio.dropdown-title')}</div>
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
