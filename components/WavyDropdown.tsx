"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import DownArrowBlack from "@/assets/icons/DownArrowBlack.svg";
import Image from "next/image";
import Select from "react-select";
import classNames from "classnames";

export interface DropdownProps {
  options: any;
  defaultValue: any;
  onChange: any;
}

export interface ListProps {
  index: number;
  name: string;
  href?: any;
}

const WavyDropdown = ({ options, defaultValue, onChange }: DropdownProps) => {
  // return (
  //   <DropdownMenu>
  //     <div className="relative w-full">
  //       <DropdownMenuTrigger
  //         asChild
  //         className="w-full bg-lightGray focus:outline-none p-0"
  //       >
  //         <button
  //           type="button"
  //           id="dropdownDefaultButton"
  //           className="flex items-center justify-between bg-white text-black text-xs h-full p-4"
  //           data-dropdown-toggle="dropdown"
  //         >
  //           <div>{name}</div>
  //           <div>
  //             <Image src={DownArrowBlack} alt="downArrow" />
  //           </div>
  //         </button>
  //       </DropdownMenuTrigger>
  //       <DropdownMenuContent className="flex origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
  //         <DropdownMenuGroup className="w-full">
  //           {list?.length > 0 &&
  //             list?.map(({ name, href, index }: ListProps) => (
  //               <DropdownMenuItem key={index}>
  //                 <Link
  //                   href={href}
  //                   className="block px-4 py-2 text-xs text-midGray w-full"
  //                 >
  //                   HIHI
  //                 </Link>
  //               </DropdownMenuItem>
  //             ))}
  //         </DropdownMenuGroup>
  //       </DropdownMenuContent>
  //     </div>
  //   </DropdownMenu>
  // );

  // <Dropdown
  //   placeholder={"HLLO"}
  //   className="bg-red-400 flex flex-row flex-1"
  //   controlClassName="flex flex-1 flex-row bg-red-400 items-cetner justify-between"
  //   menuClassName="bg-blue-400 flex flex-row items-cetner justify-between"
  //   arrowClassName="bg-black"
  //   arrowClosed={
  //     <div className="bg-blue-400">
  //       <Image src={DownArrowBlack} alt="dropdown" />
  //     </div>
  //   }
  //   arrowOpen={
  //     <div className="bg-blue-400">
  //       <Image src={DownArrowBlack} alt="dropdown" />
  //     </div>
  //   }
  //   options={options}
  //   onChange={(value) => {
  //     console.log(value);
  //   }}
  // />
  return (
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
        container: (baseStyles, state) => ({
          ...baseStyles,
          borderWidth: 0,
          backgroundColor: "#f7f7f7",
          ":focus": {
            borderWidth: 2,
            borderColor: "yellow",
            backgroundColor: "blue",
          },
        }),
        control: (baseStyles) => ({
          ...baseStyles,
          borderRadius: 0,
          borderWidth: 0,
          border: "none",
          borderColor: "none",
          backgroundColor: "#f7f7f7",
        }),
        indicatorSeparator: () => ({ display: "hidden" }),
        menu: (baseStyles) => ({
          ...baseStyles,
          backgroundColor: "#f7f7f7",
          borderRadius: 0,
          // marginTop: 0,
          marginTop: 1,
        }),
        menuList: (baseStyles) => ({
          ...baseStyles,
          ":hover": {
            backgroundColor: "#f7f7f7",
          },
        }),
        valueContainer: (baseStyles) => ({
          ...baseStyles,
          backgroundColor: "#f7f7f7",
          fontSize:'14px'
        }),
        indicatorsContainer: (baseStyles) => ({
          ...baseStyles,
          backgroundColor: "#f7f7f7",
        }),
        option: (baseStyles) => ({
          ...baseStyles,
          fontSize:'14px',
          ":hover": {
            backgroundColor: "#b2b2b2",
            color: "white",
           
          },
        }),
      }}
      options={options}
      defaultValue={defaultValue}
      onChange={onChange}
    />
  );
};

export default WavyDropdown;
