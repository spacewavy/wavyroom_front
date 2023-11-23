import React from 'react'
import SelectColorCard from './SelectColorCard'
import CustomizationOptions, { CustomizationOptionsProps } from './CustomizationOptions'

const customizationOptions:CustomizationOptionsProps[] = [
	{
		name:'형태',
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
		name:'캐노피',
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
		name:'데크',
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
		name:'창문',
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
		name:'창문',
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
		name:'창문',
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
		name:'창문',
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
	}
]

const CustomizationPanel = () => {
  return (
    <>
        <section className='w-full'>
            <div className="productName flex gap-4 m-8" >
                <span>Evo</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <g clip-path="url(#clip0_1099_11599)">
                    <path d="M12.0004 15.7104L5.65039 9.35039L6.35039 8.65039L12.0004 14.2904L17.6504 8.65039L18.3504 9.35039L12.0004 15.7104Z" fill="black"/>
                    </g>
                    <defs>
                    <clipPath id="clip0_1099_11599">
                    <rect width="24" height="24" fill="white"/>
                    </clipPath>
                    </defs>
                </svg>
            </div>
            <div className="tabs flex mx-8 mb-8">
                <div className="exteriorTab w-6/12">
                    <p className='text-[12px] border-b-[1px] border-jetBlack font-medium py-4'>외부</p>
                </div>
                <div className="interiroTab w-6/12">
                    <p className='text-[12px] border-b-[1px] font-medium py-4 text-midGray'>내부</p>
                </div>
            </div>
            <div className="selectColor mb-4">
                <SelectColorCard />
            </div>
            <div className="customOption">
                <CustomizationOptions customizationOptions={customizationOptions} />
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
                        <span>커스텀하기</span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                        <g clip-path="url(#clip0_2583_274)">
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
    </>
  )
}

export default CustomizationPanel
