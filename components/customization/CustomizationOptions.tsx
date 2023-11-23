import React, { FC } from 'react'

interface option {
    option:string;
    isSelected:boolean
}
export interface CustomizationOptionsProps {
    id:number,
    name:string;
    isMutliSelect:boolean,
    isExpanded:boolean,
    options:option[]
}


const Card:FC<option> = ({option,isSelected}) => {
  return (
    <div className='p-4 flex justify-between border-[1px] rounded-xl hover:bg-[#F9F9FA]'>
        <div className="propName text-[14px] font-medium">{option}</div>
        <div className="radioButton"><input type="radio" /></div>
    </div>
  )
}



const CustomizationOptions: FC<{ customizationOptions: CustomizationOptionsProps[],handleToggle:any }> = ({ customizationOptions,handleToggle }) => {
  return (
    <div className='flex flex-col gap-4'>
        {customizationOptions.map((opt,index)=>{
            return (
                <section className='px-8 py-4' key={index}>
                    <div className='flex flex-col gap-4'>
                        <div className='flex justify-between'>
                            <span className='optionName text-[14px] font-medium'>{opt.name}</span>
                            <div className='flex gap-4'>
                                {opt.isMutliSelect && (
                                    <span className='text-[12px] font-medium text-orange'>다중 선택 가능</span>
                                )}
                                <div onClick={()=>handleToggle(opt.id)} className={`cursor-pointer ${!opt.isExpanded ? 'rotate-180' : null }`}>
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
                            </div>
                            
                        </div>
                        <div className={`options overflow-hidden transition-height duration-500 ease-out ${!opt.isExpanded ? 'h-0' : 'h-auto'}`}>
                            <div className='grid grid-cols-2 gap-4'>
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