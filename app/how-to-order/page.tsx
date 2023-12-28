"use client"
import Imageh from "@/assets/how-to-order/order-page-img.png";
import howToOrderImage from "@/assets/how-to-order/how-to-order.webp";
import image1 from "@/assets/how-to-order/Wavyroom_How_to_Order_1.png";
import image2 from "@/assets/how-to-order/Wavyroom_How_to_Order_2.png";
import image3 from "@/assets/how-to-order/Wavyroom_How_to_Order_3.png";
import image4 from "@/assets/how-to-order/Wavyroom_How_to_Order_4.png";
import image5 from "@/assets/how-to-order/Wavyroom_How_to_Order_5.png";
import Link from "next/link";

import OrderCard from "@/components/OrderCard";
import Image from "next/image";
import { useTranslation } from "react-i18next";

const HowToOrder = () => {
  const {t} = useTranslation()
  const data = [
    {
      Image: image1,
      heading: t('how-to-order.card-1.period'),
      subHeading: t('how-to-order.card-1.heading'),
      text: t('how-to-order.card-1.description'),
      imageRight: false,
    },
    {
      Image: image2,
      heading: t('how-to-order.card-2.period'),
      subHeading: t('how-to-order.card-2.heading'),
      text: t('how-to-order.card-2.description'),
      imageRight: true,
    },
    {
      Image: image3,
      heading: t('how-to-order.card-3.period'),
      subHeading: t('how-to-order.card-3.heading'),
      text: t('how-to-order.card-3.description'),
      imageRight: false,
    },
    {
      Image: image4,
      heading: t('how-to-order.card-4.period'),
      subHeading: t('how-to-order.card-4.heading'),
      text: t('how-to-order.card-4.description'),
      imageRight: true,
    },
    {
      Image: image5,
      heading: t('how-to-order.card-5.period'),
      subHeading: t('how-to-order.card-5.heading'),
      text: t('how-to-order.card-5.description'),
      imageRight: false,
    },
  ];
  return (
    <main className="flex flex-col flex-1">
      <section className="pt-16 md:pt-32 lg:pt-[120px] px-8 lg:px-0 pb-8 lg:pb-[120px] text-[28px] md:text-[40px] lg:text-[58px] font-light text-center text-jetBlack">
        <h1>
          {t('how-to-order.heading.text-1')}
          <br />
        </h1>
        <h1>{t('how-to-order.heading.text-2')}</h1>
      </section>

      <section className="grid w-full grid-cols-1 gap-[48px] md:gap-0 py-16 lg:py-[120px] px-0 md:px-8 md:w-[60%] md:min-w-[912px] m-auto">
        {data.map((d, index) => {
          return (
            <OrderCard
              key={"order_card" + index}
              image={d.Image}
              heading={d.heading}
              subheading={d.subHeading}
              text={d.text}
              imageRight={d.imageRight}
            />
          );
        })}
      </section>
      <hr className="my-0 h-0.5 border-t-0 bg-neutral-100 opacity-100 dark:opacity-50" />
      <section className="flex justify-center align-center flex-col gap-4 p-8 bg-black m-4 md:m-8">
        <p className="text-white text-center text-[18px] md:text-[28px] font-light">
          Welcome!<br></br>{t('how-to-order.info-card.title.text-1')}<br></br>
          {t('how-to-order.info-card.title.text-2')}
        </p>
        <div className="flex justify-center gap-[4px] px-4 py-2">
          <p className="text-orange text-center text-sm font-medium text-[14px]">
          <Link href="/customization">
            {t('how-to-order.info-card.navigation-button')}
          </Link>
          </p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="19"
            height="18"
            viewBox="0 0 19 18"
            fill="none"
          >
            <g clipPath="url(#clip0_2475_818)">
              <path
                d="M10.52 4.23828L9.9875 4.77078L13.8425 8.62578H3.875V9.37578H13.85L9.9875 13.2383L10.5125 13.7633L15.2825 9.00828L10.52 4.23828Z"
                fill="#FF5B00"
              />
            </g>
            <defs>
              <clipPath id="clip0_2475_818">
                <rect
                  width="18"
                  height="18"
                  fill="white"
                  transform="translate(0.5)"
                />
              </clipPath>
            </defs>
          </svg>
        </div>
      </section>

      <section>
        <div className="relative w-full aspect-[1376/744]">
          <Image
            layout="fill"
            objectFit="cover"
            src={howToOrderImage}
            alt="Main Image"
          />
        </div>
      </section>
    </main>
  );
};

export default HowToOrder;
