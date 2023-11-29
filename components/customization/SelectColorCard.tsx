import React from 'react'



const SelectColorCard = () => {
    const colorsOptions = [
        {
            colorCode: 'offBlack',
            isSelected: true
        },
        {
            colorCode: 'offBlack',
            isSelected: false
        },
        {
            colorCode: 'white',
            isSelected: false
        },
    ]
  return (
    <section className='px-[24px] md:px-8 py-4'>
        <div className="materialColor flex flex-col gap-4">
            <div className="flex justify-between title text-[14px] font-medium">
                <span className='text-jetBlack'>외장재 색상</span>
            </div>
            <div className='flex justify-between flex-col md:flex-row gap-2'>
                <div className="colors flex gap-2">
                    {colorsOptions.map((x, index ) => {
                        return (
                            <div key={`color-${index}`} className={`w-[36px] h-[36px] ${ x.isSelected ? 'border-jetBlack' : 'border-[#B3B3B3]' } border-[1px] rounded-full flex justify-center items-center`}>
                                <div className={`w-[28px] h-[28px] bg-${x.colorCode} rounded-full`}></div>
                            </div>
                        )
                    })}
                </div>
                <span className='text-[12px] font-light'>에보니 블랙</span>
            </div>     
        </div>
    </section>
  )
}

export default SelectColorCard
