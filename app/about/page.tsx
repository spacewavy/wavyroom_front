import Image from "next/image";
import React from "react";
import AboutMainImage from "@/public/images/about/about_main.png";
import AboutDetail1 from "@/public/images/about/about_detail_1.png";
import AboutDetail21 from "@/public/images/about/about_detail_2_1.png";
import AboutDetail22 from "@/public/images/about/about_detail_2_2.png";
import COLORS from "../../lib/colors";

const About = () => {
  return (
    <main className="flex flex-col flex-1">
      <section>
        <div className="flex flex-col lg:flex-col-reverse">
          <div className="flex flex-col md:flex-row px-4 py-8 md:px-8 md:py-16 gap-2">
            <div className="flex flex-1 text-displaySM md:text-displayMD lg:text-displayLG font-light">
              Spacewavy
            </div>
            <div className="flex flex-1 items-end">
              <div className="text-titleSM md:text-titleMD lg:text-titleLG font-light">
                우리는 집의 제품화, 건설업의 제조업화를 통하여 정교하게 설계되고
                완벽하게 제작된 제품에 집중합니다.
              </div>
            </div>
          </div>
          <div className="w-full pb-8 lg:pb-16">
            <Image
              className="object-cover w-full h-full"
              src={AboutMainImage}
              alt="Main Image"
            />
          </div>
        </div>
      </section>
      <section>
        <div className="flex flex-col md:flex-row px-4 py-8 md:px-8 md:py-16 md:gap-4">
          <div className="flex-1 hidden md:flex" />
          <div className="flex flex-1 flex-col gap-8">
            <div className="flex flex-col gap-2">
              <div className="text-[#FF5B00] text-labelSM md:text-labelMD lg:text-labelLG">
                우리의 비전과 미션
              </div>
              <div className="text-displaySM md:text-displayMD lg:text-displayLG">
                공간의 제품화를 통한 문화의 움직임
              </div>
            </div>
            <div className="text-bodySM md:text-bodyMD lg:text-bodyLG">
              우리는 건설방식에서의 더 나은 방법을 만들었습니다. 설계와 디자인에
              대한 확실성을 최우선으로 고려하고 품질을 타협하지 않습니다.
              <br />
              <br />
              당사는 자체 생산시설을 보유한 공장에서부터 프로젝트 관리 서비스 및
              설치 현장까지 당사 팀은 모듈화된 공간을 설계하고 수행할 수 있는
              지식과 경험을 보유하고 있습니다. 2019년부터 국내에서 공급을
              시작하고 현재 해외시장에 수출을 진행하며, 이 모든 과정의 중심에
              고객을 두고 있습니다. &quot;집&quot;의 의미를 재정립하고, 제품화를
              통하여 영구적인 공간을 창출하고 있습니다.
            </div>
            <div className="w-full">
              <Image
                className="object-cover w-full h-full"
                src={AboutDetail1}
                alt="Main Image"
              />
            </div>
          </div>
        </div>
      </section>
      <section className="bg-[#f7f7f7] px-4 py-8 md:px-8 md:py-16">
        <div className="text-[#FF5B00] text-labelSM md:text-labelMD lg:text-labelLG mb-2 md:mb-6">
          우리의 제품
        </div>
        <div className="flex flex-1 flex-col md:flex-row">
          <div className="flex flex-1 flex-col lg:flex-row gap-4">
            <div className="lg:flex lg:flex-1 text-displaySM md:text-displayMD lg:text-displayLG">
              세심하게 설계되고,
              <br />
              완벽하게 제작된 공간
            </div>
            <div className="lg:flex lg:flex-1 text-bodySM md:text-bodyMD lg:text-bodyLG">
              우리는 모두에게 더 나은 집이 있는 미래를 바라봅니다. 모든 사람들이
              각자 세심하게 설계되고 잘 지어진 집에서 사는 것, 공간이 영감을
              주고 기능하며 환경을 생각하는 것, 우리가 사는 공간이 우리의 삶을
              개선하는 세상을 바라봅니다.
              <br />
              <br />
              웨이비룸은 여러분이 사는 방식에 맞게 아름답고 유연한 공간을 갖춘
              모든 부지에서의 잠재력을 새롭게 상상하도록 영감을 드립니다. 내가
              쉴 수 있는 세컨드하우스, 사업화를 통한 추가 수입 목적의 숙박 공간,
              손님과 가족을 초대하여 행복한 시간을 보내기 위한 게스트 홈, 그리고
              사무실, F&B 등 여러분을 중심으로 지금, 그리고 미래에 맞는 공간을
              제공합니다.
            </div>
          </div>
          <div className="flex flex-1 hidden md:flex lg:hidden" />
        </div>
      </section>
      <section className="bg-[#f7f7f7]">
        <div className="flex flex-1 flex-col md:flex-row py-4 px-0 md:p-8 gap-4">
          <div className="flex flex-1">
            <Image
              className="object-cover w-full h-full"
              src={AboutDetail21}
              alt="Main Image"
            />
          </div>
          <div className="flex flex-1">
            <Image
              className="object-cover w-full h-full"
              src={AboutDetail22}
              alt="Main Image"
            />
          </div>
        </div>
      </section>
      <section>
        <div className="flex flex-1 flex-col px-4 py-8 md:px-8 md:py-16 gap-2 md:gap-6">
          <div className="text-[#FF5B00] text-labelSM md:text-labelMD lg:text-labelLG">
            우리의 가치
          </div>
          <div className="flex flex-1 flex-col md:flex-row gap-6 md:gap-4">
            <div className="flex flex-1 text-displaySM md:text-displayMD lg:text-displayLG">
              쉬운 건설과정
              <br />
              가치있는 주거공간
            </div>
            <div className="flex flex-1 flex-col gap-8">
              <div className="text-[12px] md:text-[14px] lg:text-[16px]">
                기술은 산업을 변화시켰습니다. 다음은 건설 방식입니다. 이제
                우리는 집을 지을 수 있는 더 나은 방법을 만들었습니다. 투명한
                가격과 디자인에 대한 확실성을 최우선으로 고려하고 품질과
                타협하지 않으며, 완성도 높은 &quot;집&quot;이라는 제품을
                생산합니다.
              </div>
              <div className="flex flex-1 flex-col">
                <div className="flex flex-1 flex-col py-4 md:py-8">
                  <div className="text-[24px] md:text-[28px] lg:text-[32px]">
                    일정하고 높은 품질의 생산
                  </div>
                  <div className="text-[#4D4D4D] text-[12px] md:text-[14px] lg:text-[16px]">
                    자체적으로 운영하는 제조설비 공장에서 스페이스웨이비의
                    노하우가 담긴 생산라인을 통하여 일정하게 높은 품질의 집을
                    생산합니다.
                  </div>
                </div>
                <div className="h-[1px] bg-[#E5E5E5]" />
                <div className="flex flex-1 flex-col py-4 md:py-8">
                  <div className="text-[24px] md:text-[28px] lg:text-[32px]">
                    뛰어난 디자인
                  </div>
                  <div className="text-[#4D4D4D] text-[12px] md:text-[14px] lg:text-[16px]">
                    글로벌 건축시장에서 활동하던 건축가, 산업디자이너,
                    공간디자이너로 구성된 R&D 조직에서 아름답고 기능적인
                    디자인을 제공합니다.
                  </div>
                </div>
                <div className="h-[1px] bg-[#E5E5E5]" />
                <div className="flex flex-1 flex-col py-4 md:py-8">
                  <div className="text-[24px] md:text-[28px] lg:text-[32px]">
                    빠른 제작 기간
                  </div>
                  <div className="text-[#4D4D4D] text-[12px] md:text-[14px] lg:text-[16px]">
                    4~6주 만에 완제품으로 제작되는 웨이비룸은 설치 바로
                    다음날부터 사용이 가능합니다.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="p-4 md:p-8">
        <div className="flex flex-1 flex-col bg-[#1C1C1F] items-center justify-center gap-4 px-4 py-24 md:py-42">
          <div className="text-[#ffffff] text-[14px] md:text-[24px]">
            스페이스 웨이비에 합류하고 싶나요?
          </div>
          <div className="text-[#FF5B00] text-[14px]">채용정보 보기</div>
        </div>
      </section>
    </main>
  );
};

export default About;
