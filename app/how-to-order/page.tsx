import Imageh from "@/assets/how-to-order/order-page-img.png";
import SidebarProduct from "@/assets/Products/SidebarProduct.png";
import OrderCard from "@/components/OrderCard";
import Image from "next/image";

const HowToOrder = () => {
  const data = [
    {
      Image: Imageh,
      heading: "1일",
      subHeading: "계약 진행",
      text: "주문하기를 통해 산출된 견적서 토대로 담당자가 1일내로 연락하여 계약절차를 안내드립니다.",
      imageRight: false,
    },
    {
      Image: Imageh,
      heading: "3~6개월",
      subHeading: "계약 진행",
      text: "건축을 위한 인허가는 통상적으로 3~6개월 정도 소요됩니다. 웨이비룸은 인허가 절차에 필요한 모든 도면과 서류가 준비되어있어 보다 빠른 진행이 가능합니다.",
      imageRight: true,
    },
    {
      Image: Imageh,
      heading: "6~12주",
      subHeading: "웨이비룸 제작",
      text: "건축신고를 마친 후 제작 동의서를 안내드립니다. 제작을 시작할 수 있는 가장 빠른 일정이 정해지는대로 예상 일정을 고객에게 전달드립니다.*기초작업이 필요한 경우 별도로 제작을 시작할 수 있는 가장 빠른 일정이 정해지는대로 예상 일정을 고객에게 전달드립니다.*기초 인프라작업이 필요한 경우 별도로 문의주시면 함께 진행해드립니다.",
      imageRight: false,
    },
    {
      Image: Imageh,
      heading: "2일",
      subHeading: "제품 검수 및 출고",
      text: "제작 완료 후 웨이비룸 공장에서 고객님과 최종 검수를 진행합니다.",
      imageRight: true,
    },
    {
      Image: Imageh,
      heading: "1일",
      subHeading: "설치",
      text: "출고 후 운반팀을 통해 현장에 설치합니다.",
      imageRight: false,
    },
  ];
  return (
    <main className="flex flex-col flex-1">
      <section className="pt-16 md:pt-32 lg:pt-[120px] px-8 lg:px-0 pb-8 lg:pb-[120px] text-[28px] md:text-[40px] lg:text-[58px] font-light text-center">
        <h1 className="text-darkGray">
          나만의 공간을 최대한 쉽게. <br />
        </h1>
        <h1 className="text-jetBlack">
          웨이비룸의 제작 과정을 알아보세요.
        </h1>
      </section>

      <section
        className="grid w-full grid-cols-1 gap-[48px] md:gap-0 py-16 lg:py-[120px] px-0 md:px-8 lg:px-[264px]"
      >
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
          Welcome!<br></br>복잡한 건설과정과 작별인사를 하고,<br></br>
          웨이비룸에서 파티를 열어보세요!
        </p>
        <div className="flex justify-center gap-[4px] px-4 py-2">
          <p className="text-orange text-center text-sm font-medium text-[14px]">주문하기</p>
          <svg xmlns="http://www.w3.org/2000/svg" width="19" height="18" viewBox="0 0 19 18" fill="none">
            <g clip-path="url(#clip0_2475_818)">
            <path d="M10.52 4.23828L9.9875 4.77078L13.8425 8.62578H3.875V9.37578H13.85L9.9875 13.2383L10.5125 13.7633L15.2825 9.00828L10.52 4.23828Z" fill="#FF5B00"/>
            </g>
            <defs>
            <clipPath id="clip0_2475_818">
            <rect width="18" height="18" fill="white" transform="translate(0.5)"/>
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
            src={SidebarProduct}
            alt="Main Image"
          />
        </div>
      </section>
    </main>
  );
};

export default HowToOrder;
