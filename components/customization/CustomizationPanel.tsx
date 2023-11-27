"use client";
import React, { useState } from 'react'

import SelectColorCard from './SelectColorCard'
import CustomizationOptions, { CustomizationOptionsProps } from './CustomizationOptions'
import Select from "react-select";

const CustomizationPanel = () => {
    const [customizationOptions ,setCustomizationOptions] = useState<CustomizationOptionsProps[]>([
        {
            id:1,
            name:'형태',
            isMutliSelect:false,
            isExpanded:true,
            options:[
                {
                    option:'단층형',
                    isSelected:true
                },	
                {
                    option:'복층형',
                    isSelected:true
                },	
            ]
        },
        {
            id:2,
            name:'캐노피',
            isMutliSelect:false,
            isExpanded:true,
            options:[
                {
                    option:'리스트',
                    isSelected:true
                },	
                {
                    option:'리스트',
                    isSelected:true
                },	
                {
                    option:'리스트',
                    isSelected:true
                },	
                {
                    option:'리스트',
                    isSelected:true
                },	
            ]
        },
        {
            id:3,
            name:'데크',
            isMutliSelect:true,
            isExpanded:true,
            options:[
                {
                    option:'리스트',
                    isSelected:true
                },	
                {
                    option:'리스트',
                    isSelected:true
                },	
                {
                    option:'리스트',
                    isSelected:true
                },	
                {
                    option:'리스트',
                    isSelected:true
                },	
            ]
        },
        {
            id:4,
            name:'창문',
            isMutliSelect:false,
            isExpanded:true,
            options:[
                {
                    option:'리스트',
                    isSelected:true
                },	
                {
                    option:'리스트',
                    isSelected:true
                },	
                {
                    option:'리스트',
                    isSelected:true
                },	
                {
                    option:'리스트',
                    isSelected:true
                },	
            ]
        },
        {
            id:5,
            name:'창문',
            isMutliSelect:true,
            isExpanded:true,
            options:[
                {
                    option:'리스트',
                    isSelected:true
                },	
                {
                    option:'리스트',
                    isSelected:true
                },	
                {
                    option:'리스트',
                    isSelected:true
                },	
                {
                    option:'리스트',
                    isSelected:true
                },	
            ]
        },
        {
            id:6,
            name:'창문',
            isMutliSelect:false,
            isExpanded:true,
            options:[
                {
                    option:'리스트',
                    isSelected:true
                },	
                {
                    option:'리스트',
                    isSelected:true
                },	
                {
                    option:'리스트',
                    isSelected:true
                },	
                {
                    option:'리스트',
                    isSelected:true
                },	
            ]
        },
    ])

    const handleToggle=(id: number) => {
        setCustomizationOptions((prevOptions) => {
            return prevOptions.map((option) => {
              if (option.id === id) {
                return { ...option, isExpanded: !option.isExpanded };
              }

              return option;
            });
          });
    };

    const OPTIONS = [
        {value:'Evo1' ,label:'Evo'},
        {value:'Evo2' ,label:'Evo'},
        {value:'Evo3 ' ,label:'Evo'},
    ]

  return (
    <div className='flex flex-col h-[65vh] lg:h-[100vh] '>
        <section className='w-full overflow-y-scroll'>
            <div className="productName flex flex-col  gap-4 lg:gap-0  mx-[24px] md:mx-8 my-8" >
                <span className='text-[24px] lg:text-[32px] font-light items-center'>
                <Select
                    theme={(theme) => ({
                        ...theme,
                        borderRadius: 0,
                        borderWidth: 0,
                        colors: {
                        ...theme.colors,
                        primary25: "none",
                        primary: "#ff5b00",
                        },
                    })}
                    isSearchable={false}
                    styles={{
                        container: (baseStyles: any, state: any) => ({
                        ...baseStyles,
                        ":focus": {

                        },
                        }),
                        control: (baseStyles: any) => ({
                            display:'flex',
                            height:'45px',

                        }),
                        indicatorSeparator: () => ({ display: "hidden" }),
                        valueContainer: (baseStyles: any) => ({
                        
                        }),
                        indicatorsContainer: (baseStyles:any) => ({
                            display:'flex',
                            alignItems:'center',
                        }),
                        option: (baseStyles:any) => ({
                            background:'#F7F7F7',
                            padding:'16px',
                            color:'black',
                            fontSize:'14px',
                            fontWeight:'500',
                            ":hover": {
                                backgroundColor: "#E5E5E5",
                                color: "black",
                            
                            },
                        }),
                    }}
                    options={OPTIONS}
                    value={OPTIONS[0]}
                    onChange={() => {}}
                    />
                </span>

                <span className='block lg:hidden'>
                    모듈러건축시스템 기반으로 {'웨이비룸'}이라는 주거공간을 만들고 있으며,<br />
                    {'공간의 제품화'}에 집중합니다.
                </span>
            </div>
            <div className="tabs flex mx-[24px] md:mx-8 mb-8">
                <div className="exteriorTab w-6/12">
                    <p className='text-[14px] md:text-[12px] border-b-[1px] border-jetBlack font-medium py-4'>외부</p>
                </div>
                <div className="interiroTab w-6/12">
                    <p className='text-[12px] border-b-[1px] font-medium py-4 text-midGray'>내부</p>
                </div>
            </div>
            <div className="selectColor mb-4">
                <SelectColorCard />
            </div>
            <div className="customOption">
                <CustomizationOptions customizationOptions={customizationOptions} handleToggle={handleToggle} />
            </div>
        </section>
        <div className="footer w-full">
            <section className='flex p-4 gap-2 items-center border-t-2'>
                <div className="download p-[11px] border-[1px] rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
                        <path d="M10.666 8V10.6667H1.33268V8H0.666016V11.3333H11.3327V8H10.666Z" fill="#1C1C1F"/>
                        <path d="M9.23229 5.23268L8.76562 4.76602L6.33229 7.19268V0.666016H5.66562V7.19268L3.23229 4.76602L2.76562 5.23268L5.99896 8.47268L9.23229 5.23268Z" fill="#1C1C1F"/>
                    </svg>
                </div>
                <div className="export p-[11px] border-[1px] rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="14" viewBox="0 0 12 14" fill="none">
                        <path d="M7.99935 5V5.66667H10.666V13H1.33268V5.66667H3.99935V5H0.666016V13.6667H11.3327V5H7.99935Z" fill="#1C1C1F"/>
                        <path d="M5.66628 1.63938V8.99938H6.33294V1.63938L8.43294 3.73271L8.89961 3.26604L5.99961 0.359375L3.09961 3.26604L3.56628 3.73271L5.66628 1.63938Z" fill="#1C1C1F"/>
                    </svg>
                </div>
                <div className="customizeButton flex gap-[4px] px-4 py-[10px] text-white rounded-full justify-center w-full items-center bg-offBlack">
                    <span className='text-[12px] font-medium'>커스텀하기</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                        <g clipPath="url(#clip0_2583_274)">
                            <path d="M10.02 4.23828L9.4875 4.77078L13.3425 8.62578H3.375V9.37578H13.35L9.4875 13.2383L10.0125 13.7633L14.7825 9.00828L10.02 4.23828Z" fill="white"/>
                        </g>
                        <defs>
                            <clipPath id="clip0_2583_274">
                                <rect width="18" height="18" fill="white"/>
                            </clipPath>
                        </defs>
                    </svg>
                </div>
            </section>
        </div>
    </div>
  )
}

export default CustomizationPanel
