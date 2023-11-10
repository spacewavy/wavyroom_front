'use client';
import Logo from '@/assets/Logo.svg';
import SidebarProduct from '@/assets/Products/SidebarProduct.png';
import RightArrowBlack from '@/assets/icons/RightArrowBlack.svg';
import RightArrowGray from '@/assets/icons/RightArrowGray.svg';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { useMemo, useState } from 'react';
import Button from './Button';
import SelectLang from './SelectLang';

interface SidebarItemChildren {
  id: number;
  title: string;
  desc?: string;
  rate?: string;
  onClick?(): void;
}

interface SidebarItem extends SidebarItemChildren {
  childrens?: SidebarItemChildren[];
}

const sidebarItemChildrens: SidebarItemChildren[] = [
  { id: 1, title: 'Evo', desc: '주거용', rate: '7평' },
  { id: 2, title: 'Nova', desc: '주거용', rate: '7평' },
  { id: 3, title: 'Max', desc: '주거용', rate: '7평' },
  { id: 4, title: 'Studio', desc: '주거용', rate: '7평' },
  { id: 5, title: 'Mini', desc: '주거용', rate: '7평' },
  { id: 6, title: '전체보기', desc: '', rate: '' },
];
const sidebarItems: SidebarItem[] = [
  { id: 1, title: '회사소개', childrens: sidebarItemChildrens },
  { id: 2, title: '모델', childrens: sidebarItemChildrens },
  { id: 3, title: '주문방법', childrens: sidebarItemChildrens },
  { id: 4, title: '미디어', childrens: sidebarItemChildrens },
  { id: 5, title: '고객센터', childrens: sidebarItemChildrens },
];

const Sidebar = () => {
  const [selectedMenuId, setSelectedMenuId] = useState(0);
  const [selectedListId, setSelectedListId] = useState(0);

  const selectedMenu: SidebarItem | undefined = useMemo(
    () => sidebarItems.find((obj) => obj.id === selectedMenuId),
    [selectedMenuId]
  );

  const selectedProduct = useMemo(
    () => sidebarItemChildrens.find((obj) => obj.id === selectedListId),
    [selectedListId]
  );

  return (
    <div className='grid grid-cols-2 gap-2'>
      <Sheet
        onOpenChange={() => {
          setSelectedMenuId(0);
          setSelectedListId(0);
        }}>
        <SheetTrigger asChild>
          <Image
            className='w-auto h-8 cursor-pointer'
            src={Logo}
            alt='Spacewavy'
          />
        </SheetTrigger>
        <SheetContent
          side='left'
          className={cn(
            'max-w-full w-full sm:max-w-full md:w-fit flex gap-0 !p-0 bg-gray',
            !!selectedListId && 'md:w-full'
          )}>
          <section
            className={cn(
              'w-full md:w-[240px] flex md:flex gap-8 flex-col p-6 md:border-r md:border-r-black',
              !!selectedMenuId && 'hidden'
            )}>
            <SheetHeader>
              <SheetTitle>
                <Image className='w-auto h-8' src={Logo} alt='Spacewavy' />
              </SheetTitle>
            </SheetHeader>
            <div className='flex flex-col flex-1 gap-10 py-12'>
              {sidebarItems.map((item: SidebarItem) => (
                <p
                  key={item.id}
                  className={cn(
                    'text-sm font-normal cursor-pointer w-fit',
                    item.id === selectedMenuId
                      ? 'text-black border-b border-black'
                      : 'text-midGray',
                    selectedMenuId === 0 && '!text-black'
                  )}
                  onClick={() => setSelectedMenuId(item.id)}>
                  {item.title}
                </p>
              ))}
            </div>
            <div className='flex flex-col justify-between w-full h-20'>
              <SelectLang />
              <Button name='문의 +82.02.80.000' varient='outline' />
            </div>
          </section>
          {!!selectedMenuId && (
            <section
              className={cn(
                'w-full md:w-[400px] flex md:flex gap-12 flex-col p-6 md:border-r md:border-r-black',
                !!selectedListId && 'hidden'
              )}>
              <p className='text-lg pt-28'>{selectedMenu?.title}</p>
              <ul className='flex flex-col flex-1 text-xs font-light'>
                {selectedMenu?.childrens?.map((obj, i) => (
                  <li
                    key={obj.title}
                    className={cn(
                      'flex justify-between py-4 border-b text-black border-black items-center',
                      i === 0 && 'border-t',
                      selectedListId > 0 &&
                        obj.id !== selectedListId &&
                        '!text-midGray !border-midGray'
                    )}>
                    <span className='text-sm font-normal'>{obj.title}</span>
                    <span className='text-sm font-normal'>{obj.desc}</span>
                    <span className='text-sm font-normal'>{obj.rate}</span>
                    <Image
                      className='cursor-pointer'
                      alt='right-arrow'
                      src={
                        obj.id === selectedListId || selectedListId === 0
                          ? RightArrowBlack
                          : RightArrowGray
                      }
                      width={24}
                      height={24}
                      onClick={() => setSelectedListId(obj.id)}
                    />
                  </li>
                ))}
              </ul>
            </section>
          )}
          {!!selectedListId && (
            <section className='flex flex-col flex-1'>
              <Image
                className='object-cover h-[420px] w-full'
                src={SidebarProduct}
                alt='Vercel Image'
                width={800}
                height={432}
              />
              <div className='w-full p-8'>
                <h2 className='h-14'>{selectedProduct?.title}</h2>
                <ul className='flex flex-col flex-1 text-xs font-light'>
                  <li
                    className={cn(
                      'grid grid-cols-3 py-4 gap-6 text-sm font-normal'
                    )}>
                    <span className='truncate'>
                      가격
                      <br />
                      ￦35,000,000~
                    </span>
                    <span className='truncate'>
                      사이즈
                      <br />
                      7평
                    </span>
                    <span className='truncate'>
                      사이즈
                      <br />
                      7평
                    </span>
                  </li>
                  <li
                    className={cn(
                      'grid grid-cols-3 py-4 gap-6 text-sm font-normal'
                    )}>
                    <span className='truncate'>
                      외부 색
                      <br />
                      화이트
                      <br />
                      베이지
                    </span>
                    <span className='truncate'>
                      외부 색
                      <br />
                      화이트
                      <br />
                      베이지
                    </span>
                    <span className='truncate'>
                      외부 색
                      <br />
                      화이트
                      <br />
                      베이지
                    </span>
                  </li>
                  <li
                    className={cn(
                      'grid grid-cols-3 py-4 gap-6 text-sm font-normal'
                    )}>
                    <span className='truncate'>
                      스트럭쳐
                      <br />
                      정밀설계 광궤강골조
                    </span>
                    <span className='truncate'>
                      클래딩
                      <br />
                      2인치 정밀 공업
                    </span>
                    <span className='truncate'>
                      클래딩
                      <br />
                      2인치 정밀 공업
                    </span>
                  </li>
                </ul>
              </div>
            </section>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default Sidebar;
