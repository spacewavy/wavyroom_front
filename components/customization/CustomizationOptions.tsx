import React, { FC } from 'react'

interface option {
    option:string;
    isSelected?:boolean;
    onClickHandler?:any
    configurationEnabled?:boolean
}
export interface CustomizationOptionsProps {
    id:number,
    name:string;
    isMutliSelect:boolean,
    isExpanded:boolean,
    options:option[]
}


export const Card:FC<option> = ({option,isSelected,onClickHandler,configurationEnabled=true}) => {
  return (
    <div className={`p-4 flex justify-between items-center border-[1px] rounded-xl border-[#E5E5E5]  ${configurationEnabled ? 'hover:bg-[#F9F9FA] cursor-pointer border-[#B3B3B3]' : ''} `}>
        <div className={`propName text-[12px] font-medium ${configurationEnabled ? 'text-jetBlack' : 'text-wavyGary'}`}>{option}</div>
        <div className="radioButton flex" onClick={()=>{onClickHandler(option)}}>
            { isSelected ?
                <input
                className="w-6 h-6 inline-block mr-2 rounded-full border border-grey flex-no-shrink"
                type="radio"
                value={option}
                checked={isSelected}
                onChange={() => onClickHandler(option)}
                /> : 
                <span className="w-6 h-6 inline-block mr-2 rounded-full border border-grey flex-no-shrink"></span>
            }
        </div>
    </div>
  )
}

const CustomizationOptions: FC<{ customizationOptions: CustomizationOptionsProps[],handleToggle:any,configurationEnabled:boolean }> = ({ customizationOptions,handleToggle,configurationEnabled }) => {
  return (
    <div className='flex flex-col gap-4'>
        {customizationOptions.map((opt,index)=>{
            return (
              <section className="px-[24px] sm:px-8 py-4" key={`opt-${index}`}>
                <div className="flex flex-col">
                  <div className="flex justify-between">
                    <span
                      className={`optionName text-[14px] font-medium ${
                        configurationEnabled
                          ? "text-jetBlack"
                          : "text-[#B3B3B3]"
                      }`}
                    >
                      {opt.name}
                    </span>
                    <div className="flex gap-4">
                      {opt.isMutliSelect && (
                        <span
                          className={`text-[12px] font-medium ${
                            configurationEnabled
                              ? "text-orange"
                              : "text-[#B3B3B3]"
                          }`}
                        >
                          다중 선택 가능
                        </span>
                      )}
                      <div
                        onClick={configurationEnabled ? () => handleToggle(opt.id) : ()=>{}}
                        className={`${configurationEnabled ? 'cursor-pointer' : ''} ${
                          opt.isExpanded ? "rotate-0" : "rotate-[-180deg]"
                        }`}
                      >
                        {configurationEnabled ? (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="18"
                            height="18"
                            viewBox="0 0 18 18"
                            fill="none"
                          >
                            <g clipPath="url(#clip0_2287_20488)">
                              <path
                                d="M13.7633 7.9868L9.00078 3.2168L4.23828 7.9868L4.77078 8.5118L8.62578 4.6493V14.2493H9.37578V4.6568L13.2308 8.5118L13.7633 7.9868Z"
                                fill="black"
                              />
                            </g>
                            <defs>
                              <clipPath id="clip0_2287_20488">
                                <rect width="18" height="18" fill="white" />
                              </clipPath>
                            </defs>
                          </svg>
                        ) : (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="18"
                            height="18"
                            viewBox="0 0 18 18"
                            fill="none"
                          >
                            <g clipPath="url(#clip0_2287_20488)">
                              <path
                                d="M13.7633 7.9868L9.00078 3.2168L4.23828 7.9868L4.77078 8.5118L8.62578 4.6493V14.2493H9.37578V4.6568L13.2308 8.5118L13.7633 7.9868Z"
                                fill="#B3B3B3"
                              />
                            </g>
                            <defs>
                              <clipPath id="clip0_2287_20488">
                                <rect width="18" height="18" fill="white" />
                              </clipPath>
                            </defs>
                          </svg>
                        )}
                      </div>
                    </div>
                  </div>
                  <div
                    className={`options overflow-hidden transition-max-height duration-500 ease-in-out ${
                      opt.isExpanded ? "max-h-[100vh]" : "max-h-0"
                    }`}
                  >
                    <div className="grid grid-cols-2 gap-4 pt-4">
                      {opt.options.map((o, index) => {
                        return (
                          <Card
                            key={`card-${index}`}
                            isSelected={o.isSelected}
                            option={o.option}
                            configurationEnabled={configurationEnabled}
                            onClickHandler={() => {}}
                          />
                        );
                      })}
                    </div>
                  </div>
                </div>
              </section>
            );
        })}
    </div>
  )
}

export default CustomizationOptions
