import Imageh from "@/assets/Howtoorder/image.png";
import SidebarProduct from "@/assets/Products/SidebarProduct.png";
import OrderCard from "@/components/OrderCard";
import Image from "next/image";

const HowToOrder = () => {

  const data = [
  {
    Image:Imageh,
    heading:'1일',
    subHeading:'계약 진행',
    text:"주문하기를 통해 산출된 견적서 토대로 담당자가 1일내로 연락하여 계약절차를 안내드립니다.",
    imageRight:false,
    isLast:false
  },
  {
    Image:Imageh,
    heading:'3~6개월' ,
    subHeading:'계약 진행',
    text:"건축을 위한 인허가는 통상적으로 3~6개월 정도 소요됩니다. 웨이비룸은 인허가 절차에 필요한 모든 도면과 서류가 준비되어있어 보다 빠른 진행이 가능합니다.",
    imageRight:true,
    isLast:false
  },
  {
    Image:Imageh,
    heading:'6~12주',
    subHeading:'웨이비룸 제작',
    text:'건축신고를 마친 후 제작 동의서를 안내드립니다. 제작을 시작할 수 있는 가장 빠른 일정이 정해지는대로 예상 일정을 고객에게 전달드립니다.*기초작업이 필요한 경우 별도로 제작을 시작할 수 있는 가장 빠른 일정이 정해지는대로 예상 일정을 고객에게 전달드립니다.*기초 인프라작업이 필요한 경우 별도로 문의주시면 함께 진행해드립니다.',
    imageRight:false,
    isLast:false
  },
  {
    Image:Imageh,
    heading:'2일',
    subHeading:'제품 검수 및 출고',
    text:'제작 완료 후 웨이비룸 공장에서 고객님과 최종 검수를 진행합니다.',
    imageRight:true,
    isLast:false
  },
  {
    Image:Imageh,
    heading:'1일',
    subHeading:'설치',
    text:'출고 후 운반팀을 통해 현장에 설치합니다.',
    imageRight:false,
    isLast:true
  },
]
  return (
    <main className="flex flex-col flex-1">
      <section className="px-4 md:px-8 lg:px-8" style={{margin:'120px 0'}} >
        <h1 className="font-light text-displaySM md:text-displayMD lg:text-displayLG text-center font-light font-light text-5xl text-gray-700">
        나만의 공간을 최대한 쉽게. <br /> 
        </h1>
        <h1 className="font-light text-displaySM md:text-displayMD lg:text-displayLG text-center font-light font-light text-5xl text-black">
        웨이비룸의 제작 과정을 알아보세요.
        </h1>
      </section>

       <section className="grid w-full grid-cols-1" style={{marginTop:'120px'}}>

        {data.map((d)=>{
          return (
            <OrderCard image={d.Image} heading={d.heading} subheading={d.subHeading} text={d.text} imageRight={d.imageRight} isLast={d.isLast} />
          )
        })}

       </section>

     <section className="px-4 py-8 md:px-8 md:py-8 lg:px-8 lg:py-16">
     </section>

     <hr className="my-0 h-0.5 border-t-0 bg-neutral-100 opacity-100 dark:opacity-50" />
      <section className="py-8 md:py-16 lg:py-24 bg-black m-8">
        <p className="text-white text-center text-2xl font-light">Welcome!<br></br>복잡한 건설과정과 작별인사를 하고,<br></br>웨이비룸에서 파티를 열어보세요!</p>
        <p className="text-orange text-center text-sm font-medium">주문하기</p>
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
