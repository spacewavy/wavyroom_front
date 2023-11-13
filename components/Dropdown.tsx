"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";

export interface DropdownProps {
  name: string;
  list: any;
}

export interface ListProps {
  name: string;
  href: any;
  index: number;
}

const Dropdown = ({ name, list }: DropdownProps) => {
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger
          asChild
          className="border-none w-[100px] h-[22px] focus:outline-none"
        >
          <button
            className="inline-flex justify-start gap-x-1.5 bg-white px-3 py-2 text-black font-normal text-xs"
            id="dropdownDefaultButton"
            data-dropdown-toggle="dropdown"
            type="button"
          >
            {name}
            <svg
              className="h-[18px] w-[18px]"
              viewBox="0 0 20 25"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <DropdownMenuGroup>
            {list?.length > 0 &&
              list?.map(({ name, href, index }: ListProps) => (
                <DropdownMenuItem key={index}>
                  <Link
                    href={href}
                    className="block px-4 py-2 text-xs text-midGray"
                  >
                    {name}
                  </Link>
                </DropdownMenuItem>
              ))}
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default Dropdown;
