import Image from "next/image";

export interface OrderCardProps {
  heading: string;
  subheading: string;
  text: string;
  image: any;
  imageRight: boolean;
}

const OrderCard = ({
  heading,
  subheading,
  text,
  image,
  imageRight,
}: OrderCardProps) => {
  return (
    <div
      className="grid w-full grid-cols-1 md:grid-cols-3 gap-4 md:gap-0 max-h-fit md:min-h-[262px] lg:min-h-[379px] last:min-h-fit"
      style={{ direction: imageRight ? "rtl" : "ltr" }}
    >
      <div className="imageSection">
        <Image
          src={image}
          alt="order_image"
          className="flex items-center justify-center w-full"
        />
      </div>

      <div className="hidden md:flex items-center md:flex-col">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="15"
          height="15"
          viewBox="0 0 15 15"
          fill="none"
        >
          <circle cx="7.5" cy="7.5" r="7" fill="white" stroke="#B2B2B2" />
        </svg>
        <div className="h-full w-[1px] bg-midGray"></div>
      </div>

      <div className="contentSection text-left px-4 md:px-0" style={{direction:'ltr'}}>
        <div>
          <div className="mb-4 md:mb-[24px]">
            <span className="text-[24px] md:text-[32px] font-light">
              {heading}{" "}
            </span>
          </div>
          <div className="mb-2">
            <span className="text-[14px] md:text-[20px] font-light">
              {subheading}
            </span>
          </div>
          <div>
            <span className="text-[12px] md:text-[14px] font-light text-wavyGray">
              {text}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderCard;
