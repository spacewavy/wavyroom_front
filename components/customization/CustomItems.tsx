import React,{FC, useState} from 'react'
import CustomizationCard from './CustomizationCard';
import { Product } from '@/app/customization/page';

interface CustomItemsProps {
  navigateToSettings:any;
  products:Product[];
  selectedItem:number;
  handleSelectedItem:any;

}

const CustomItems:FC<CustomItemsProps> = ({navigateToSettings,products,handleSelectedItem,selectedItem}) => {

  return (
    <div className='flex flex-col h-[65vh] lg:h-[100vh]'>
      <div className='w-full overflow-y-scroll'>
        <div className="p-8">
          <div className="text-[24px] md:text-[32px] font-light mb-4"><h1>웨이비룸</h1></div>
          <div>
            <p className="text-[14px] font-light color-[#4D4D4D]">
              {'모듈러건축시스템 기반으로 \'웨이비룸\'이라는 주거공간을 만들고 있으며, \'공간의 제품화\'에 집중합니다.'}
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-2">
            {products.map((d) =>
              <CustomizationCard key={`model-${d.id}`} id={d.id} heading={d.heading} subheading={d.subheading} price={d.price} image={d.Image} selectedItem={selectedItem} handleSelectedItem={handleSelectedItem}/>
            )}
        </div>
      </div>
      <div className="p-4 border-t-[1px]"> 
         <button onClick={() => navigateToSettings(true)} className=" flex justify-center items-center gap-1 w-full bg-black text-white py-[10px] px-4 text-[12px] font-medium rounded-full">
            <span>
              커스텀하기
            </span>
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
            <g clipPath="url(#clip0_2619_2241)">
              <path d="M10.02 4.23828L9.4875 4.77078L13.3425 8.62578H3.375V9.37578H13.35L9.4875 13.2383L10.0125 13.7633L14.7825 9.00828L10.02 4.23828Z" fill="white"/>
            </g>
            <defs>
              <clipPath id="clip0_2619_2241">
                <rect width="18" height="18" fill="white"/>
              </clipPath>
            </defs>
          </svg>
        </button>
      </div>
    </div>
  )
}

export default CustomItems
