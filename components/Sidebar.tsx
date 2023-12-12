"use client";
import Logo from "@/public/images/Logo.svg";
import SidebarProduct from "@/assets/Products/SidebarProduct.png";
import RightArrowBlack from "@/assets/icons/RightArrowBlack.svg";
import RightArrowGray from "@/assets/icons/RightArrowGray.svg";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import SelectLang from "./SelectLang";
import Button from "./Button";
import Link from "next/link";
import CallInquery from "./CallInquery";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/redux/reducers";
import { fetchNavigationModelData } from "@/app/redux/actions/modelActions";
import { AnyAction } from "redux";
import { NavigationModelItem } from "@/app/redux/types";

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

  const renderMenus = () => {
    return (
      <section
        className={cn(
          "w-full md:w-[240px] flex md:flex gap-8 flex-col p-8 md:border-r md:border-r-black",
          !!selectedMenuId && "hidden"
        )}
      >
        <SheetHeader>
          <SheetTitle>
            <Image className="w-auto h-8" src={Logo} alt="Spacewavy" />
          </SheetTitle>
        </SheetHeader>
        <div className="flex flex-col flex-1 gap-8 py-12">
          {sidebarItems.map((item: SidebarItem) => {
            const isLink = !!item.link;
            return isLink ? (
              <Link
                key={item.id}
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
          "w-full md:w-[400px] flex md:flex gap-12 flex-col p-8 md:border-r md:border-r-black",
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
    if (!selectedListId) return;
    return (
      <section className="flex flex-col flex-1">
        <Image
          className="object-cover h-[420px] w-full sm:block hidden"
          src={`https://spacewavy.s3.ap-northeast-2.amazonaws.com/${selectedProduct.representativeImageURL}`}
          alt="Vercel Image"
          width={800}
          height={432}
        />
        <div className="w-full p-8 h-full">
          <h2 className="h-14">{selectedProduct?.name}</h2>
          <ul className="flex flex-col flex-1 text-xs font-light">
            <li className={cn("grid grid-cols-4 py-4 gap-6 text-sm")}>
              <span className="truncate">
                가격
                <br />
                {selectedProduct.minPrice}
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
                    <>
                      <span>{x}</span>
                      <br />
                    </>
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
                    <>
                      <span>{x.name}</span>
                      <br />
                    </>
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
                    <>
                      <span>{x}</span>
                      <br />
                    </>
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
                    <>
                      <span>{x}</span>
                      <br />
                    </>
                  );
                })}
              </span>
              <span className="truncate">
                용도
                <br />
                {selectedProduct.purpose.map((x: any) => {
                  return (
                    <>
                      <span>{x}</span>
                      <br />
                    </>
                  );
                })}
              </span>
              <span className="truncate">
                용도 설명
                <br />
                {selectedProduct.purposeDetail.map((x: any) => {
                  return (
                    <>
                      <span>{x}</span>
                      <br />
                    </>
                  );
                })}
              </span>
            </li>
          </ul>
          <div className="flex flex-row gap-2 fixed bottom-[33px]">
            <Link href="" onClick={closeSidebar}>
              <Button name="주문하기" arrow varient="default" />
            </Link>
            <Link href="/model-details">
              <Button name="제품 상세보기" />
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
            "max-w-full w-full sm:max-w-full md:w-fit flex gap-0 !p-0 bg-gray",
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
