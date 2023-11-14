import React from "react";
import ProductCard from "../../components/ProductCard";
import ImageNova from "@/assets/Products/Nova.svg";

const Models = () => {
  const MODELS = [];
  return (
    <main className="flex flex-col flex-1">
      <section className="px-4 pt-16 pb-4 md:px-8 md:pt-32 md:pb-8">
        <div className="flex flex-1 flex-col gap-4">
          <div className="flex flex-1 text-displaySM md:text-displayMD lg:text-displayLG">
            모델
          </div>
        </div>
      </section>
      <section>
        <div className="flex flex-1 flex-col">
          <ProductCard image={ImageNova} name="Nova" value="100,000,000원~" />
          <ProductCard image={ImageNova} name="Nova" value="100,000,000원~" />
          <ProductCard image={ImageNova} name="Nova" value="100,000,000원~" />
          <ProductCard image={ImageNova} name="Nova" value="100,000,000원~" />
        </div>
      </section>
    </main>
  );
};

export default Models;
