"use client";
import React, { useEffect, useState } from 'react'
import Select from "react-select";
import SelectColorCard from './SelectColorCard'
import CustomizationOptions, { Card, CustomizationOptionsProps } from './CustomizationOptions'

const CustomizationPanel = () => {
    const [estimatedQutation ,setEstimatedQutation] = useState(0)
    const [floorOptions ,setFloorOptions] = useState([
        {
            title: "단층",
            price: 10000000,
            isSelected: true,
        },
        {
            title: "복층",
            price: 10000000,
            isSelected: false,
        },
    ])
    const [customizationOptions ,setCustomizationOptions] = useState<CustomizationOptionsProps[]>([
        {
            id: 1,
            name: '형태',
            isMutliSelect: false,
            options: [
                {   
                    optId: 1,
                    title:  '선택안됨',
                    price:  0,
                    isSelected: true
                },	
                {
                    optId: 2,
                    title: '선택안됨',
                    price: 10000000,
                    isSelected: false
                },	
            ]
        },
        {
            id: 2,
            name: '형태',
            isMutliSelect: false,
            options: [
                {   
                    optId: 1,
                    title: '선택안됨',
                    price: 10000000,
                    isSelected: true
                },	
                {
                    optId: 2,
                    title: '선택안됨',
                    price: 10000000,
                    isSelected: false
                },	
                {
                    optId: 3,
                    title: '선택안됨',
                    price: 10000000,
                    isSelected: false
                },	
                {
                    optId: 4,
                    title: '선택안됨',
                    price: 10000000,
                    isSelected: false
                },	
            ]
        },
        {
            id: 3,
            name: '형태',
            isMutliSelect: true,
            options: [
                {
                    optId: 1,
                    title: '선택안됨',
                    price: 10000000,
                    isSelected: false
                },	
                {
                    optId: 2,
                    title: '선택안됨',
                    price: 10000000,
                    isSelected: false
                },	
                {
                    optId: 3,
                    title: '선택안됨',
                    price: 10000000,
                    isSelected: false
                },	
                {
                    optId: 4,
                    title: '선택안됨',
                    price: 10000000,
                    isSelected: false
                },	
            ]
        },
        {
            id: 4,
            name: '형태',
            isMutliSelect: true,
            options: [
                {
                    optId: 1,
                    title: '선택안됨',
                    price: 10000000,
                    isSelected: false
                },	
                {
                    optId: 2,
                    title: '선택안됨',
                    price: 10000000,
                    isSelected: false
                },	

            ]
        },
    ])

    const calculateTotal = () => {
        let total = 0;
    
        customizationOptions.forEach(node => {
          if (node.options.some(opt => opt.isSelected)) {
            node.options.forEach(opt => {
              if (opt.isSelected) {
                total += opt.price;
              }
            });
          }
        });

        setEstimatedQutation(total);
    };

    useEffect(()=>{
        calculateTotal();
    },[customizationOptions])

    const OPTIONS = [
        {value:'Evo1' ,label:'Evo'},
        {value:'Evo2' ,label:'Evo'},
        {value:'Evo3' ,label:'Evo'},
    ]


    const handleFloorChange = (value: string) => {
        if (value) {
            const updatedFloorOptions = floorOptions.map((x) => ({
                ...x, isSelected: x.title === value
            })); 
            setFloorOptions(updatedFloorOptions);
        }
    }

    const handleOptionChange = (nodeId: number,optId: number) => {
        setCustomizationOptions((prevData) =>
        prevData.map((node) =>
          node.id === nodeId
            ? {
                ...node,
                options: node.isMutliSelect
                  ? node.options.map((opt) =>
                      opt.optId === optId
                        ? { ...opt, isSelected: !opt.isSelected }
                        : opt
                    )
                  : node.options.map((opt) =>
                      opt.optId === optId
                        ? { ...opt, isSelected: !opt.isSelected }
                        : { ...opt, isSelected: false }
                    ),
              }
            : node
        )
      );
    }

  return (
    <div className='flex flex-col justify-between h-[65vh] lg:h-[100vh] '>
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
                            display: 'flex',
                            height: '45px',

                        }),
                        indicatorSeparator: () => ({ display: "hidden" }),
                        menuList: (baseStyles) => ({
                        ...baseStyles,
                        marginTop: '-4px',
                        marginBottom: '-4px'
                        }),
                        valueContainer: (baseStyles: any) => ({
                        
                        }),
                        indicatorsContainer: (baseStyles: any) => ({
                            display:'flex',
                            alignItems:'center',
                        }),
                        option: (baseStyles: any) => ({
                            background: '#F7F7F7',
                            padding: '16px',
                            color: 'black',
                            fontSize: '14px',
                            fontWeight: '500',
                            marginTop: '0px',
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
                <section className='px-[24px] sm:px-8 py-4 mb-4'>
                    <div className='flex flex-col'>
                        <div className='flex justify-between'>
                            <span className='optionName text-[14px] font-medium'>층수 형태</span>
                            <span className='text-[12px] font-light text-orange'>층수 형태를 선택해주세요</span>
                        </div>
                        <div className={`options overflow-hidden transition-max-height duration-500 ease-in-out`}>
                            <div className='grid grid-cols-2 gap-2 pt-4'>
                                { floorOptions.map((o, index)=>{
                                    return (<Card key={`card-${index}`}  title={o.title} price={o.price}isSelected={o.isSelected} onClickHandler={handleFloorChange}/>)
                                })}
                            </div>
                        </div>
                    </div>
                </section>
            <div className="selectColor mb-4">
                <SelectColorCard  />
            </div>
            <div className="customOption">
                <CustomizationOptions customizationOptions={customizationOptions} handleOptionChange={handleOptionChange} />
            </div>
        </section>
        <div className="footer w-full">
            <section className='flex flex-col p-4 md:px-8 md:pt-8 md:pb-4 gap-2 items-center border-t-2'>
                <div className='flex justify-between w-full items-end'>
                    <div className='flex-col hidden md:flex'>
                        <span className='text-[12px] font-normal text-darkGray'>예상 견적</span>
                        <span className='text-[24px] font-light'>
                          {estimatedQutation}원
                        </span>
                    </div>
                    <div>
                        <div className='menu border-[1px] rounded-full p-[11px] hidden lg:flex'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                            <g clip-path="url(#clip0_2935_7444)">
                            <path d="M15.75 4.5H2.25V5.25H15.75V4.5Z" fill="black"/>
                            <path d="M15.75 8.625H2.25V9.375H15.75V8.625Z" fill="black"/>
                            <path d="M15.75 12.75H2.25V13.5H15.75V12.75Z" fill="black"/>
                            </g>
                            <defs>
                            <clipPath id="clip0_2935_7444">
                            <rect width="18" height="18" fill="white"/>
                            </clipPath>
                            </defs>
                            </svg>
                        </div>
                        <div className='gap-2 hidden md:flex lg:hidden'>
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
                        </div>
                    </div>
                </div>
                <div className="customizeButton flex gap-[4px] px-4 py-2 text-white rounded-full justify-center w-full items-center bg-offBlack">
                    <span className='text-[12px] font-medium hidden md:block'>다음</span>
                    <span className='text-[12px] font-medium block md:hidden'>커스텀하기</span>
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
