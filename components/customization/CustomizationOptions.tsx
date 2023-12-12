import React, { FC } from 'react'

interface option {
    optId?: number;
    title: string ;
    price: string | number;
    isSelected?: boolean;
    onClickHandler?: any
}
export interface CustomizationOptionsProps {
    id: number,
    name: string;
    isMutliSelect: boolean,
    options: option[]
}


export const Card: FC<option> = ({title, price, isSelected, onClickHandler}) => {
  return (
    <div className={`p-4 border-[1px] rounded-xl border-[#E5E5E5] hover:bg-[#F9F9FA] cursor-pointer ${isSelected ? "border-[darkGray]" : "border-[#B3B3B3]"}`} onClick={()=>{onClickHandler(title)}}>
      <div className={`flex flex-col gap-2 font-medium text-jetBlack ${isSelected ? 'text-jetBlack' : 'text-gray'}`}>
        <span className='text-[14px]'>{title}</span>
        <span className='text-[10px]'>+{price}원</span>
      </div>
    </div>
  )
}

const CustomizationOptions: FC<{ customizationOptions: CustomizationOptionsProps[], handleOptionChange: any }> = ({ customizationOptions, handleOptionChange }) => {
  return (
    <div className='flex flex-col gap-4'>
        {customizationOptions.map((opt, index) => {
            return (
              <section className="px-[24px] sm:px-8 py-4" key={`opt-${index}`}>
                <div className="flex flex-col">
                  <div className="flex justify-between">
                    <div className='flex gap-2 items-center'>
                      <span
                        className='optionName text-[14px] font-normal text-jetBlack'
                      >
                        {opt.name}
                      </span>
                      {opt.isMutliSelect && (
                        <span className='text-[12px] font-light text-midGray'>
                          {opt.options.filter((x) => (x.isSelected === true)).length}/{opt.options.length}
                        </span>
                      )}
                    </div>
                    <div className="flex gap-4">
                      {opt.isMutliSelect && (
                        <span
                          className='text-[12px] font-medium text-orange'
                        >
                          다중 선택 가능
                        </span>
                      )}
                    </div>
                  </div>
                    <div className="grid grid-cols-2 gap-2 pt-4">
                      {opt.options.map((o, index) => {
                        return (
                          <Card
                            key={`card-${index}`}
                            optId={o.optId}
                            isSelected={o.isSelected}
                            title={o.title}
                            price={o.price.toLocaleString()}
                            onClickHandler={() => {handleOptionChange(opt.id, o.optId)}}
                          />
                        );
                      })}
                    </div>
                  </div>
              </section>
            );
        })}
    </div>
  )
}

export default CustomizationOptions
