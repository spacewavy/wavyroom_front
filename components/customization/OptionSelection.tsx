import React from 'react'

const OptionSelection = () => {
    const options = [
        {
            option:'Selected',
            isSelected:true
        },
        {
            option:'Unselected',
            isSelected:false
        },
        {
            option:'On hover',
            isSelected:false
        }
    ]
  return (
    <section className="px-[24px] sm:px-8 py-4">
    <div className="flex flex-col">
      <div className="flex justify-between">
        <span
          className={`optionName text-[14px] font-medium`}
        >
          옵션 셀렉션
        </span>
        <div></div>
      </div>
      <div
        className="options"
      >
        <div className="grid grid-cols-2 gap-4 pt-4">
            {options.map((o, index)=>{
                return (
                    <div key={`options-${index}`} className={`p-4 flex justify-between items-center border-[1px] rounded-xl border-[#E5E5E5]} `}>
                        <div className={`propName text-[12px] font-medium`}>{o.option}</div>
                        <div className="radioButton flex" onClick={()=>{}}>
                            <input
                            className="w-6 h-6 inline-block mr-2 rounded-full border border-grey flex-no-shrink"
                            type="radio"
                            value={o.option}
                            checked={o.isSelected}
                            onChange={() =>{}}
                            />
                        </div>
                    </div>
                )
            })}
        </div>
      </div>
    </div>
  </section>
  )
}

export default OptionSelection
