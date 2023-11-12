"use client";

import { useState } from "react";
import Button from "./Button";
import Dropdown from "./Dropdown";
import Sidebar from "./Sidebar";

const Navbar = () => {
  const [lang, setLang] = useState("KOR");
  const [open, setOpen] = useState(false);
  return (
    <nav className="bg-white">
      <div className="px-2 mx-auto sm:px-6 lg:px-6">
        <div className="flex items-center justify-between h-24">
          <Sidebar open={open} setOpen={setOpen} />
          <div className="inset-y-0 right-0 flex items-center justify-between sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-20 sm:space-x-8">
                <Dropdown
                  name="모델"
                  list={[
                    { name: "Demo1", href: "#" },
                    { name: "Demo2", href: "#" },
                    { name: "Demo3", href: "#" },
                    { name: "Demo4", href: "#" },
                  ]}
                />
                <Dropdown
                  name="메뉴"
                  list={[
                    { name: "Demo1", href: "#" },
                    { name: "Demo2", href: "#" },
                    { name: "Demo3", href: "#" },
                    { name: "Demo4", href: "#" },
                  ]}
                />
                <div className="flex flex-row gap-2">
                  <div
                    className={`px-3 py-2 text-xs font-normal ${
                      lang === "KOR" ? "text-black" : "text-[#B2B2B2]"
                    } rounded-md cursor-pointer`}
                    onClick={() => {
                      setLang("KOR");
                    }}
                  >
                    KOR
                  </div>
                  <div
                    className={`px-3 py-2 text-xs font-normal ${
                      lang === "ENG" ? "text-black" : "text-[#B2B2B2]"
                    } rounded-md cursor-pointer`}
                    onClick={() => {
                      setLang("ENG");
                    }}
                  >
                    ENG
                  </div>
                </div>
              </div>
            </div>
            <div className="ml-[80px]">
              <Button name="주문하기" arrow varient="default" />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
