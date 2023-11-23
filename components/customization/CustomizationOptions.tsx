import React, { FC } from 'react'

interface option {
    option:string;
    isSelected:boolean
}
export interface CustomizationOptionsProps {
    name:string;
    options:option[]
}


const Card:FC<option> = ({option,isSelected}) => {
  return (
    <div className='p-4 flex justify-between border-[1px] rounded-xl'>
        <div className="propName text-[14px] font-medium">{option}</div>
        <div className="radioButton"><input type="radio" /></div>
    </div>
  )
}



const CustomizationOptions: FC<{ customizationOptions: CustomizationOptionsProps[] }> = ({ customizationOptions }) => {

  return (
    <div className='flex flex-col gap-4'>
        {customizationOptions.map((opt,index)=>{
            return (
                <section className='px-8 py-4' key={index}>
                    <div className='flex flex-col gap-4'>
                        <div className='flex justify-between'>
                            <span className='optionName text-[14px] font-medium'>{opt.name}</span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                            <g clip-path="url(#clip0_2287_20488)">
                            <path d="M13.7633 7.9868L9.00078 3.2168L4.23828 7.9868L4.77078 8.5118L8.62578 4.6493V14.2493H9.37578V4.6568L13.2308 8.5118L13.7633 7.9868Z" fill="black"/>
                            </g>
                            <defs>
                            <clipPath id="clip0_2287_20488">
                            <rect width="18" height="18" fill="white"/>
                            </clipPath>
                            </defs>
                            </svg>
                        </div>
                        <div className="options">
                            <div className="grid grid-cols-2 gap-4">
                                {opt.options.map((o,index)=>{
                                    return (
                                        <Card key={index} isSelected={o.isSelected} option={o.option} />
                                    )
                                })}
                            </div>
                        </div>
                        </div>
                </section>
            )
        })}
    </div>
  )
}

export default CustomizationOptions
