"use client";
import React, { useEffect } from "react";
import ProductCard from "../../components/ProductCard";
import { useDispatch, useSelector } from 'react-redux';
import { fetchModelData } from "../redux/actions/modelActions";
import { AnyAction } from "redux";
import { RootState } from "../redux/reducers";
import {ModelItem} from "../redux/types"

const Models = () => {
  const dispatch = useDispatch();
  const { data, error } = useSelector(
    (state: RootState) => state.model
  );

  useEffect(()=>{
    dispatch(fetchModelData()  as unknown as AnyAction)
  },[])


  return (
    <main className="flex flex-col flex-1">
      <section className="px-4 pt-16 pb-4 md:px-8 md:pt-32 md:pb-8">
        <div className="flex flex-1 flex-col gap-4">
          <div className="flex flex-1 text-displaySM md:text-displayMD lg:text-displayLG">
            모델
          </div>
        </div>
      </section>
      <section>
        {!error && (
          <div className="flex flex-1 flex-col">
          {data.map((item:ModelItem,index:number)=>{
            return (
              <ProductCard key={index} image={item.representativeImageURL} name={item.name} value={item.minPrice} purpose={item.purpose[0]} />
            )
          })}
        </div>
        )}
      </section>
    </main>
  );
};

export default Models;
