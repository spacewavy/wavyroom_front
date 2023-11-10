import ImageNova from '@/assets/Products/Nova.svg';
import AddCircleBlack from '@/assets/icons/AddCircleBlack.svg';
import CloseBlack from '@/assets/icons/CloseBlack.svg';
import RightArrowBlack from '@/assets/icons/RightArrowBlack.svg';
import RightArrowOrange from '@/assets/icons/RightArrowOrange.svg';
import RightArrowWhite from '@/assets/icons/RightArrowWhite.svg';
import ProductCard from '@/components/ProductCard';
import { Button as CommonButton } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import Image from 'next/image';

function page() {
  return (
    <section className='flex flex-col w-full h-full gap-8'>
      <div className='flex flex-wrap gap-4'>
        <CommonButton variant='ghost'>버튼2</CommonButton>
        <CommonButton variant='underline'>버튼</CommonButton>
        <CommonButton variant='ghost' disabled>
          버튼2
        </CommonButton>

        <Separator orientation='vertical' className='h-10' />

        <CommonButton>버튼1</CommonButton>
        <CommonButton>
          버튼1{' '}
          <Image alt='right-arrow' src={RightArrowWhite} className='ml-2' />
        </CommonButton>

        <Separator orientation='vertical' className='h-10' />

        <CommonButton variant='outline'>버튼2</CommonButton>
        <CommonButton variant='outline'>
          버튼2{' '}
          <Image alt='right-arrow' src={RightArrowBlack} className='ml-2' />
        </CommonButton>
        <CommonButton variant='outline'>
          문의 <span className='text-darkGray'>+82.02.800.0000</span>
          <Image alt='right-arrow' src={RightArrowBlack} className='ml-2' />
        </CommonButton>

        <Separator orientation='vertical' className='h-10' />

        <CommonButton variant='secondary'>버튼1</CommonButton>
        <CommonButton variant='secondary'>
          버튼1{' '}
          <Image alt='right-arrow' src={RightArrowBlack} className='ml-2' />
        </CommonButton>

        <Separator orientation='vertical' className='h-10' />

        <CommonButton variant='ghostOrange'>버튼1</CommonButton>
        <CommonButton variant='ghostOrange'>
          버튼1{' '}
          <Image alt='right-arrow' src={RightArrowOrange} className='ml-2' />
        </CommonButton>

        {/* <GhostOrangeButton name='버튼4' />
        <GhostOrangeButton name='버튼4' withIcon /> */}

        <Separator orientation='vertical' className='h-10' />

        <CommonButton variant='ghost' disabled>
          <Image
            alt='right-arrow'
            src={RightArrowBlack}
            className='p-1 rounded-2xl border-[0.5px] border-black'
          />
        </CommonButton>
        <CommonButton variant='ghost'>
          <Image
            alt='right-arrow'
            src={RightArrowBlack}
            className='p-1 rounded-2xl border-[0.5px] border-black'
          />
        </CommonButton>

        <Separator orientation='vertical' className='h-10' />

        <CommonButton variant='ghost'>
          <Image alt='right-arrow' src={CloseBlack} className='ml-2' />
        </CommonButton>
        <CommonButton variant='ghost'>
          <Image alt='right-arrow' src={AddCircleBlack} className='ml-2' />
        </CommonButton>

        <Separator orientation='vertical' className='h-10' />

        <CommonButton variant='ghostOrange' size='lg'>
          Label L
        </CommonButton>
        <CommonButton variant='ghostOrange'>Label M</CommonButton>
        <CommonButton variant='ghostOrange' size='sm'>
          Label S
        </CommonButton>
      </div>
      <div className='grid w-full grid-cols-2'>
        <ProductCard image={ImageNova} name='Mahesh' value='1234' />
      </div>
    </section>
  );
}

export default page;
