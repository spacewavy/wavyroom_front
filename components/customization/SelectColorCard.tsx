import React from 'react'

const SelectColorCard = () => {
    const colorsOptions = [
        {
            colorCode:'white',
            isSelected:false
        },
        {
            colorCode:'spaceBlack',
            isSelected:false
        },
        {
            colorCode:'midGray',
            isSelected:false
        },
        {
            colorCode:'gray',
            isSelected:true
        },
        {
            colorCode:'wavyGary',
            isSelected:false
        },
    ]
  return (
    <section className='px-[24px] md:px-8 py-4'>
        <div className="materialColor flex flex-col gap-4">
            <div className="flex justify-between title text-[14px] font-medium">
                <span>외장재 색상</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <g clipPath="url(#clip0_1099_11610)">
                        <path d="M13.7633 7.9868L9.00078 3.2168L4.23828 7.9868L4.77078 8.5118L8.62578 4.6493V14.2493H9.37578V4.6568L13.2308 8.5118L13.7633 7.9868Z" fill="black"/>
                    </g>
                    <defs>
                        <clipPath id="clip0_1099_11610">
                            <rect width="18" height="18" fill="white"/>
                        </clipPath>
                    </defs>
                </svg>
            </div>
            <div className="colors flex gap-2">
                {colorsOptions.map((x, index )=>{
                    return (
                        <div key={`color-${index}`} className={`w-[36px] h-[36px] ${x.isSelected ? 'border-jetBlack' : ''} border-[1px] rounded-full flex justify-center items-center`}>
                            <div className={`w-[28px] h-[28px] bg-${x.colorCode} rounded-full`}></div>
                        </div>
                    )
                })}
            </div>
        </div>
    </section>
  )
}

export default SelectColorCard
