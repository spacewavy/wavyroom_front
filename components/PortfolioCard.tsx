import Image, { StaticImageData } from "next/image";
import RightArrowBlack from "@/assets/icons/RightArrowBlack.svg";

export interface PortfolioCardProps {
  portfolio: PortfolioProps;
}

export interface PortfolioProps {
  address: string;
  type: string;
  size: number;
  image: StaticImageData;
}

const PortfolioCard = ({ portfolio }: PortfolioCardProps) => {
  return (
    <div className="flex flex-1 flex-col">
      <div className="relative w-full aspect-[3/2]">
        <Image
          layout="fill"
          objectFit="cover"
          src={portfolio.image}
          alt="portfolio img"
        />
      </div>
      <div className="flex flex-col py-2 gap-2">
        <div
          className="flex flex-row items-center justify-between cursor-pointer"
          onClick={() => {
            console.log("open portfolio detail modal");
          }}
        >
          <div className="text-[14px]">{portfolio.address}</div>
          <Image alt="right-arrow" src={RightArrowBlack} />
        </div>
        <div className="flex flex-row gap-2">
          <div className="text-[14px] font-medium">{portfolio.type}</div>
          <div className="text-[14px] font-medium">{portfolio.size}평</div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioCard;
