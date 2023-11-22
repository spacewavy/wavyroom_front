import Image from "next/image";

export interface OrderCardProps {
  heading: string;
  subheading: string;
  text: string;
  image:any;
  imageRight:boolean;
  isLast:boolean;
}

const OrderCard = ({ heading, subheading, text, image, imageRight,isLast=false }: OrderCardProps) => {
  return (
    <div className="grid w-full grid-cols-1 md:grid-cols-3 px-4 sm:px-8 md:px-12 lg:px-50 xl:px-60 gap-4 md:gap-0" style={{direction: imageRight ? "rtl" : "ltr", minHeight: !isLast ? '384px' :''}}>
      <div className="imageSection" >
        <Image src={image} alt="order_image" className="flex items-center justify-center w-full h-" />
      </div>
      
      <div style={{alignItems:'center', flexDirection:'column'}} className="hidden md:flex">
        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="none">
          <circle cx="7.5" cy="7.5" r="7" fill="white" stroke="#B2B2B2"/>
        </svg>
        <div style={{height:'100%', width:"1px",backgroundColor:'#B2B2B2'}}></div>
      </div>

      <div className="contentSection">
        <div className="flex justify-between">
          <div className="text-black text-bodyMD md:text-bodyLG">
            <h1>
              <span style={{fontSize:"32px", fontWeight:300, color:"#000000", lineHeight:"41.6px", gap:"24px"}}>{heading} </span>
            </h1>
            <p>
            <span style={{fontSize:"20px", fontWeight:300, lineHeight:"26px", color:"#000000", gap:"8px"}}>{subheading}</span>
            </p>
            <div>
            <span style={{fontSize:"14px", fontWeight:300, lineHeight:"22.4px", color:"#6E6E73"}}>{text}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderCard;




