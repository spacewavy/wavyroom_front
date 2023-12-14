import { setCustomizationSelectedColor } from '@/app/redux/actions/customizationActions';
import { ModelColors } from '@/app/redux/types'
import React, { FC, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { AnyAction } from 'redux';

interface SelectColorCardPorps  {
    modelColors:ModelColors[];
}

const SelectColorCard:FC<SelectColorCardPorps> = ({modelColors}) => {
    const [selectedColorName ,setSelectedColorName] = useState('')
    const dispatch = useDispatch();
    const handleColorClick = (id:string) => {
        dispatch(setCustomizationSelectedColor(id) as unknown as AnyAction);
    }

    useEffect(()=>{
        if(modelColors) {
            const selectedName = modelColors.find((color)=> color.isSelected)?.name;
            setSelectedColorName(selectedName!)
        }
    },[modelColors])

  return (
    <section className='px-[24px] md:px-8 py-4'>
        <div className="materialColor flex flex-col gap-4">
            <div className="flex justify-between title text-[14px] font-medium">
                <span className='text-jetBlack'>외장재 색상</span>
            </div>
            <div className='flex justify-between flex-col md:flex-row gap-2'>
                <div className="colors flex gap-2">
                    {modelColors.map((x:ModelColors, index ) => {
                        return (
                            <span key={`color-${index}`} onClick={()=>handleColorClick(x.id)} className={`w-[36px] h-[36px] ${ x.isSelected ? 'border-jetBlack' : 'border-[#B3B3B3]' } border-[1px] rounded-full flex justify-center items-center`}>
                                <span className={`w-[28px] h-[28px] bg-[${x.colorId.toString()}] rounded-full`}></span>
                            </span>
                        )
                    })}
                </div>
                <span className='text-[12px] font-light'>{selectedColorName}</span>
            </div>     
        </div>
    </section>
  )
}

export default SelectColorCard
