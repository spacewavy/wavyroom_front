import ImageNova from "@/assets/Products/Nova.svg";
import SidebarProduct from "@/assets/Products/SidebarProduct.png";
import ProductCard, { ProductAllCard } from "@/components/ProductCard";
import ProductCarousel from "@/components/ProductCarousel";
import { Button as CommonButton } from "@/components/ui/button";
import Image from "next/image";

const Home = () => {
  return (
    <main className="flex flex-col flex-1">
      <section className="md:px-8 md:pb-8 lg:pb-16">
        <div className="relative w-full" style={{ aspectRatio: 1376 / 744 }}>
          <Image
            layout="fill"
            objectFit="cover"
            src={SidebarProduct}
            alt="Main Image"
          />
        </div>
      </section>
      <section className="px-4 py-8 md:px-8 md:py-8 lg:px-8 lg:py-16">
        <CommonButton
          className="p-0 text-labelSM lg:text-labelLG text-orange md:text-labelMD"
          variant="ghostOrange"
        >
          웨이비룸
        </CommonButton>
        <h1 className="font-light text-displaySM md:text-displayMD lg:text-displayLG">
          간편하게 주문하고 <br /> 품질 높은 공간을 받아보세요
        </h1>
        <p className="font-light text-bodySM md:text-bodyMD lg:text-bodyLG">
          나에게 맞는 모델을 선택하여 나만의 공간을 만들어 보세요
        </p>
      </section>
      <section className="py-8 md:py-16 lg:py-24">
        <ProductCarousel />
      </section>
      <section className="px-4 py-8 md:px-8 md:py-8 lg:px-8 lg:py-16">
        <CommonButton
          className="p-0 text-labelSM lg:text-labelLG text-orange md:text-labelMD"
          variant="ghostOrange"
        >
          Label L
        </CommonButton>
        <h1 className="font-light text-displaySM md:text-displayMD lg:text-displayLG">
          혁신적인 제품으로 <br /> 재탄생하다
        </h1>
      </section>
      <section className="grid w-full grid-cols-1 lg:grid-cols-2">
        <ProductCard
          image={ImageNova}
          name="Nova / 주거용"
          value="100,000,000원~"
        />
        <ProductCard
          image={ImageNova}
          name="Evo / 주거용"
          value="78,000,000원~"
        />
        <ProductCard
          image={ImageNova}
          name="Max / 주거용"
          value="65,000,000원~"
        />
        <ProductCard
          image={ImageNova}
          name="Studio / 주거용"
          value="46,000,000원~"
        />
        <ProductCard
          image={ImageNova}
          name="Mini / 주거용"
          value="35,000,000원~"
        />
        <ProductAllCard />
      </section>
    </main>
  );
};

export default Home;
