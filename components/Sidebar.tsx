"use client";
import Logo from "@/public/images/Logo.svg";
import RightArrowBlack from "@/assets/icons/RightArrowBlack.svg";
import RightArrowGray from "@/assets/icons/RightArrowGray.svg";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn, makeImageUrl } from "@/lib/utils";
import Image from "next/image";
import React, { useEffect, useMemo, useState } from "react";
import SelectLang from "./SelectLang";
import Button from "./Button";
import Link from "next/link";
import CallInquery from "./CallInquery";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/redux/reducers";
import {
  fetchModelDetailData,
  fetchNavigationModelData,
} from "@/app/redux/actions/modelActions";
import { AnyAction } from "redux";
import { NavigationModelItem } from "@/app/redux/types";
import {
  fetchCustomizationOptionsData,
  navigateToSettings,
} from "@/app/redux/actions/customizationActions";

interface SidebarItemChildren {
  id: number;
  title: string;
  desc?: string;
  rate?: string;
  onClick?(): void;
  link?: string;
}

interface SidebarItem extends SidebarItemChildren {
  childrens?: SidebarItemChildren[];
}

const sidebarItemChildrens: SidebarItemChildren[] = [
  { id: 1, title: "Evo", desc: "숙박용", rate: "7평" },
  { id: 2, title: "Nova", desc: "주거용", rate: "7평" },
  { id: 3, title: "Max", desc: "주거용", rate: "7평" },
  { id: 4, title: "Studio", desc: "주거용", rate: "7평" },
  { id: 5, title: "Mini", desc: "다목적용", rate: "7평" },
  { id: 6, title: "전체보기", desc: "", rate: "" },
];

const sidebarItems: SidebarItem[] = [
  { id: 1, title: "메뉴", link: "/" },
  { id: 1, title: "회사소개", link: "/about" },
  { id: 2, title: "모델", childrens: sidebarItemChildrens },
  { id: 3, title: "주문방법", link: "/how-to-order" },
  { id: 4, title: "포트폴리오", link: "/portfolio" },
  { id: 5, title: "미디어", link: "/media" },
  { id: 6, title: "고객센터", link: "/contact-us" },
];

const Sidebar = ({ open, setOpen, menuType }: any) => {
  const [selectedMenuId, setSelectedMenuId] = useState(0);
  const [selectedListId, setSelectedListId] = useState("");

  const dispatch = useDispatch();
  const { data, error } = useSelector(
    (state: RootState) => state.navigationModel
  );

  useEffect(() => {
    dispatch(fetchNavigationModelData() as unknown as AnyAction);
  }, []);

  useEffect(() => {
    if (!open) return;
    initData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const selectedMenu: SidebarItem | undefined = useMemo(
    () => sidebarItems.find((obj) => obj.id === selectedMenuId),
    [selectedMenuId]
  );

  const selectedProduct = useMemo(
    () => data.find((obj: any) => obj.id === selectedListId),
    [selectedListId]
  );

  const initData = () => {
    setSelectedMenuId(menuType === "model" ? 2 : 0);
    setSelectedListId("");
  };

  const closeSidebar = () => {
    setOpen(false);
  };

  const handlePlaceOrderClick = () => {
    dispatch(
      fetchCustomizationOptionsData(selectedListId) as unknown as AnyAction
    );
    dispatch(navigateToSettings(true) as unknown as AnyAction);
  };

  const renderMenus = () => {
    return (
      <section
        className={cn(
          "w-full lg:w-[240px] flex lg:flex gap-8 flex-col p-8 md:border-r md:border-r-black",
          !!selectedMenuId && "hidden"
        )}
      >
        <SheetHeader>
          <SheetTitle>
            <Image className="w-auto h-8" src={Logo} alt="Spacewavy" />
          </SheetTitle>
        </SheetHeader>
        <div className="flex flex-col flex-1 gap-8 py-12">
          {sidebarItems.map((item: SidebarItem, index) => {
            const isLink = !!item.link;
            return isLink ? (
              <Link
                key={index}
                href={item?.link || ""}
                onClick={closeSidebar}
                className={cn(
                  "text-sm cursor-pointer w-fit mb-1",
                  item.id === selectedMenuId
                    ? "text-black border-b border-black"
                    : "text-midGray",
                  selectedMenuId === 0 && "!text-black"
                )}
              >
                {item.title}
              </Link>
            ) : (
              <p
                key={item.id}
                className={cn(
                  "text-sm cursor-pointer w-fit mb-1",
                  item.id === selectedMenuId
                    ? "text-black border-b border-black"
                    : "text-midGray",
                  selectedMenuId === 0 && "!text-black"
                )}
                onClick={() => {
                  setSelectedMenuId(item.id);
                }}
              >
                {item.title}
              </p>
            );
          })}
        </div>
        <div className="flex flex-col items-start w-full gap-8">
          <SelectLang fontStyleClass="" />
          <CallInquery />
        </div>
      </section>
    );
  };

  const renderModels = () => {
    if (!selectedMenuId) return;
    return (
      <section
        className={cn(
          "w-full lg:w-[400px] flex lg:flex gap-12 flex-col p-8 md:border-r md:border-r-black",
          !!selectedListId && "hidden"
        )}
      >
        <p className="text-lg pt-16">{selectedProduct?.title}</p>
        <ul className="flex flex-col flex-1 text-xs font-light">
          {data.map((obj: NavigationModelItem, i: number) => (
            <li key={obj.name}>
              <Link
                href=""
                className={cn(
                  "flex justify-between py-4 border-b text-black border-black items-center",
                  i === 0 && "border-t",
                  selectedListId != "" &&
                    obj.id !== selectedListId &&
                    "!text-midGray !border-midGray"
                )}
                onClick={() => {
                  setSelectedListId(obj.id);
                }}
              >
                <span className="flex flex-1 text-sm">{obj.name}</span>
                <span className="flex flex-1 text-sm">{obj.purpose[0]}</span>
                <span className="flex flex-1 text-sm">{obj.size}</span>
                <Image
                  className="cursor-pointer"
                  alt="right-arrow"
                  src={
                    obj.id === selectedListId || selectedListId === ""
                      ? RightArrowBlack
                      : RightArrowGray
                  }
                  width={24}
                  height={24}
                />
              </Link>
            </li>
          ))}
          <li>
            <Link
              href="/models"
              onClick={closeSidebar}
              className={cn(
                "flex justify-between py-4 border-b text-black border-black items-center "
              )}
            >
              <span className="flex flex-1 text-sm">전체보기</span>
              <span className="flex flex-1 text-sm"></span>
              <span className="flex flex-1 text-sm"></span>
              <Image
                className="cursor-pointer"
                alt="right-arrow"
                src={RightArrowBlack}
                width={24}
                height={24}
              />
            </Link>
          </li>
        </ul>
      </section>
    );
  };

  const renderModelDetail = () => {
    const handleNavigateToModelDetail = () => {
      dispatch(
        fetchModelDetailData(selectedListId || "") as unknown as AnyAction
      );
      setOpen(false);
    };
    if (!selectedListId) return;
    console.log("selectedProduct", selectedProduct);
    return (
      <section className="flex flex-col flex-1 w-[100vw]">
        <div className="relative sm:block hidden w-full aspect-[800/432]">
          <Image
            src={makeImageUrl(selectedProduct.heroImageURL)}
            alt="Model Hero Image"
            fill={true}
          />
        </div>
        <div className="flex flex-1 flex-col p-8 gap-8">
          <h2 className="text-[20px]">{selectedProduct?.name} 스펙</h2>
          <ul className="flex flex-col flex-1 text-xs font-light">
            <li className={cn("grid grid-cols-4 py-4 gap-6 text-sm")}>
              <span className="truncate">
                가격
                <br />
                {selectedProduct.minPrice.toLocaleString()}
              </span>
              <span className="truncate">
                가격
                <br />
                {selectedProduct.size}
              </span>
              <span className="truncate">
                평형 디테일
                <br />
                {selectedProduct.sizeDetail}
              </span>
              <span className="truncate">
                외장재
                <br />
                {selectedProduct.exteriorMaterial.map((x: any) => {
                  return (
                    <React.Fragment key={x}>
                      <span>{x}</span>
                      <br />
                    </React.Fragment>
                  );
                })}
              </span>
            </li>
            <li className={cn("grid grid-cols-4 py-4 gap-6 text-sm")}>
              <span className="truncate">
                외부색
                <br />
                {selectedProduct.modelColors.map((x: any) => {
                  return (
                    <React.Fragment key={x}>
                      <span>{x.name}</span>
                      <br />
                    </React.Fragment>
                  );
                })}
              </span>
              <span className="truncate">
                단열
                <br />
                {selectedProduct.insulation}
              </span>
              <span className="truncate">
                골조 (스트럭쳐)
                <br />
                {selectedProduct.structure}
              </span>
              <span className="truncate">
                창호
                <br />
                {selectedProduct.windows.map((x: any) => {
                  return (
                    <React.Fragment key={x}>
                      <span>{x}</span>
                      <br />
                    </React.Fragment>
                  );
                })}
              </span>
            </li>
            <li className={cn("grid grid-cols-4 py-4 gap-6 text-sm")}>
              <span className="truncate">
                가구
                <br />
                {selectedProduct.furniture.map((x: any) => {
                  return (
                    <React.Fragment key={x}>
                      <span>{x}</span>
                      <br />
                    </React.Fragment>
                  );
                })}
              </span>
              <span className="truncate">
                용도
                <br />
                {selectedProduct.purpose.map((x: any) => {
                  return (
                    <React.Fragment key={x}>
                      <span>{x}</span>
                      <br />
                    </React.Fragment>
                  );
                })}
              </span>
              <span className="truncate">
                용도 설명
                <br />
                {selectedProduct.purposeDetail.map((x: any) => {
                  return (
                    <React.Fragment key={x}>
                      <span>{x}</span>
                      <br />
                    </React.Fragment>
                  );
                })}
              </span>
            </li>
          </ul>
          <div className="flex flex-row gap-2 fixed bottom-[33px]">
            <Link href="/customization" onClick={handlePlaceOrderClick}>
              <button className="border-[1px] rounded-full border-[black] px-4 py-2 bg-black text-white flex gap-[4px] items-center text-[12px] font-normal">
                <span>주문하기</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                >
                  <g clipPath="url(#clip0_4008_2982)">
                    <path
                      d="M10.02 4.2373L9.4875 4.7698L13.3425 8.6248H3.375V9.3748H13.35L9.4875 13.2373L10.0125 13.7623L14.7825 9.0073L10.02 4.2373Z"
                      fill="white"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_4008_2982">
                      <rect width="18" height="18" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </button>
            </Link>
            <Link
              href={`/model-detail?id=${selectedListId}`}
              onClick={handleNavigateToModelDetail}
            >
              <button className="border-[1px] rounded-full border-[black] px-4 py-2 text-[12px] font-normal">
                상세보기
              </button>
            </Link>
          </div>
        </div>
      </section>
    );
  };

  return (
    <div className="grid grid-cols-2 gap-2">
      <Sheet
        open={open}
        defaultOpen={false}
        onOpenChange={() => {
          setSelectedMenuId(0);
          setSelectedListId("");
        }}
      >
        <SheetContent
          side="left"
          className={cn(
            "max-w-full w-full sm:max-w-full lg:w-fit flex gap-0 !p-0 bg-gray",
            !!selectedListId && "md:w-full"
          )}
          onInteractOutside={closeSidebar}
          onCloseClick={closeSidebar}
          menuType={menuType}
        >
          {renderMenus()}
          {renderModels()}
          {renderModelDetail()}
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default Sidebar;
