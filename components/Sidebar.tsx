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
import { useTranslation } from "react-i18next";

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


const Sidebar = ({ open, setOpen, menuType }: any) => {
  const [selectedMenuId, setSelectedMenuId] = useState(0);
  const [selectedListId, setSelectedListId] = useState("");
  const { t } = useTranslation() 
  
  const sidebarItems: SidebarItem[] = [
    { id: 1, title: t('sidebar.items.about'), link: "/about" },
    { id: 2, title: t('sidebar.items.model'), childrens: sidebarItemChildrens },
    { id: 3, title: t('sidebar.items.how-to-order'), link: "/how-to-order" },
    { id: 4, title: t('sidebar.items.portfolio'), link: "/portfolio" },
    { id: 5, title: t('sidebar.items.media'), link: "/media" },
    { id: 6, title: t('sidebar.items.customer'), link: "/contact-us" },
  ];
  const dispatch = useDispatch();
  const { data, error } = useSelector(
    (state: RootState) => state.navigationModel
    );
    const { language } = useSelector((state: any) => state.locale);
    
  useEffect(() => {
    dispatch(fetchNavigationModelData() as unknown as AnyAction);
  }, [language]);

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
          <div className="hidden md:flex text-[20px] mb-4">{t('sidebar.items.menu')}</div>
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
          <SelectLang />
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
        <div className="flex text-[20px]">{t('sidebar.items.model')}</div>
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
                "flex justify-between py-4 border-b text-black border-black items-center",
                selectedListId != "" && "!text-midGray !border-midGray"
              )}
            >
              <span className="flex flex-1 text-sm">전체보기</span>
              <span className="flex flex-1 text-sm"></span>
              <span className="flex flex-1 text-sm"></span>
              <Image
                className="cursor-pointer"
                alt="right-arrow"
                src={selectedListId === "" ? RightArrowBlack : RightArrowGray}
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
    return (
      <section className="flex flex-col flex-1 w-[100vw]">
        {/* <div className="relative sm:block hidden w-full aspect-[800/432]"> */}
        <div className="relative sm:block hidden w-full h-[432px]">
          <Image
            src={makeImageUrl(selectedProduct.heroImageURL)}
            alt="Model Hero Image"
            // fill={true}
            fill
            objectFit="cover"
          />
        </div>
        <div className="flex flex-1 flex-col p-8 gap-4">
          <h2 className="text-[20px]">{selectedProduct?.name} {t('sidebar.details.specification')}</h2>
          <ul className="flex flex-col flex-1 text-xs font-light pb-10">
            <li className="grid grid-cols-4 py-4 gap-6 text-sm">
              <div className="flex flex-col gap-2">
                <span className="truncate font-normal">{t('sidebar.details.price')}</span>
                <span className="truncate">
                  {selectedProduct.minPrice.toLocaleString()}
                </span>
              </div>
              <div className="flex flex-col gap-2">
                <span className="truncate font-normal">{t('sidebar.details.standard')}</span>
                <span className="truncate">{selectedProduct.size}</span>
              </div>
              <div className="flex flex-col gap-2">
                <span className="truncate font-normal">{t('sidebar.details.floor-plan')}</span>
                <span className="truncate">{selectedProduct.sizeDetail}</span>
              </div>
              <div className="flex flex-col gap-2">
                <span className="truncate font-normal">{t('sidebar.details.exterior-material')}</span>
                <span className="truncate">
                  {selectedProduct.exteriorMaterial.map((x: any) => {
                    return (
                      <React.Fragment key={x}>
                        <span className="truncate">{x}</span>
                        <br />
                      </React.Fragment>
                    );
                  })}
                </span>
              </div>
              <div className="flex flex-col gap-2">
                <span className="truncate font-normal">{t('sidebar.details.exterior-color')}</span>
                <div className="flex flex-row gap-1 flex-wrap">
                  {selectedProduct.modelColors.map((x: any) => {
                    return (
                      <div
                        key={x.colorId}
                        className="h-6 w-6 rounded-full border border-wavyGray"
                        style={{
                          backgroundColor: x.colorId,
                        }}
                      />
                    );
                  })}
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <span className="truncate font-normal">{t('sidebar.details.insulation')}</span>
                <span className="truncate">{selectedProduct.insulation}</span>
              </div>
              <div className="flex flex-col gap-2">
                <span className="truncate font-normal">{t('sidebar.details.framework')}</span>
                <span className="truncate">{selectedProduct.structure}</span>
              </div>
              <div className="flex flex-col gap-2">
                <span className="truncate font-normal">{t('sidebar.details.windows')}</span>
                <span className="truncate">
                  {selectedProduct.windows.map((x: any) => {
                    return (
                      <React.Fragment key={x}>
                        <span>{x}</span>
                        <br />
                      </React.Fragment>
                    );
                  })}
                </span>
              </div>
              <div className="flex flex-col gap-2">
                <span className="truncate font-normal">{t('sidebar.details.furniture')}</span>
                <span className="truncate">
                  {" "}
                  {selectedProduct.furniture.map((x: any) => {
                    return (
                      <React.Fragment key={x}>
                        <span>{x}</span>
                        <br />
                      </React.Fragment>
                    );
                  })}
                </span>
              </div>
              <div className="flex flex-col gap-2">
                <span className="truncate font-normal">{t('sidebar.details.purpose')}</span>
                <span className="truncate">
                  {selectedProduct.purpose.map((x: any) => {
                    return (
                      <React.Fragment key={x}>
                        <span>{x}</span>
                        <br />
                      </React.Fragment>
                    );
                  })}
                </span>
              </div>
              <div className="flex flex-col gap-2">
                <span className="truncate font-normal">{t('sidebar.details.purpose-discription')}</span>
                <span className="truncate">
                  {selectedProduct.purposeDetail.map((x: any) => {
                    return (
                      <React.Fragment key={x}>
                        <span>{x}</span>
                        <br />
                      </React.Fragment>
                    );
                  })}
                </span>
              </div>
            </li>
          </ul>
          <div className="flex flex-row gap-2 fixed bottom-[33px]">
            <Link
              href={`/customization?id=${selectedListId}`}
              onClick={handlePlaceOrderClick}
            >
              <button className="border-[1px] rounded-full border-[black] px-4 py-2 bg-black text-white flex gap-[4px] items-center text-[12px] font-normal">
                <span>{t('sidebar.details.order')}</span>
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
              {t('sidebar.details.see-product')}
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
          selectedMenuId={selectedMenuId}
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
