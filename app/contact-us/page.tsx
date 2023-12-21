import CallInquery from "../../components/CallInquery";
import FaqItem from "../../components/FaqItem";
import Title from "../../components/Title";

const ContactUs = () => {
  const FAQs = [
    {
      question: "Wavyroom은 다른 모듈식 하우스와 어떻게 다르나요?",
      answer:
        "무통장 입금은 상품 구매 대금은 PC뱅킹, 인터넷뱅킹, 텔레뱅킹 혹은 가까운 은행에서 직접 입금하시면 됩니다.주문시 입력한 입금자명과 실제입금자의 성명이 반드시 일치하여야 하며, 7일 이내로 입금을 하셔야 하며 입금되지 않은 주문은 자동취소 됩니다.",
    },
    {
      question: "장치가 완성된 형태로 운송되나요?",
      answer:
        "무통장 입금은 상품 구매 대금은 PC뱅킹, 인터넷뱅킹, 텔레뱅킹 혹은 가까운 은행에서 직접 입금하시면 됩니다.주문시 입력한 입금자명과 실제입금자의 성명이 반드시 일치하여야 하며, 7일 이내로 입금을 하셔야 하며 입금되지 않은 주문은 자동취소 됩니다.",
    },
    {
      question: "Wavyroom은 배송 시간은 어떻게 되나요?",
      answer:
        "무통장 입금은 상품 구매 대금은 PC뱅킹, 인터넷뱅킹, 텔레뱅킹 혹은 가까운 은행에서 직접 입금하시면 됩니다.주문시 입력한 입금자명과 실제입금자의 성명이 반드시 일치하여야 하며, 7일 이내로 입금을 하셔야 하며 입금되지 않은 주문은 자동취소 됩니다.",
    },
    {
      question: "Wavyroom은 몇년 동안 사용하기에 적합하나요?",
      answer:
        "무통장 입금은 상품 구매 대금은 PC뱅킹, 인터넷뱅킹, 텔레뱅킹 혹은 가까운 은행에서 직접 입금하시면 됩니다.주문시 입력한 입금자명과 실제입금자의 성명이 반드시 일치하여야 하며, 7일 이내로 입금을 하셔야 하며 입금되지 않은 주문은 자동취소 됩니다.",
    },
    {
      question: "Wavyroom은 다른 모듈식 하우스와 어떻게 다르나요?",
      answer:
        "무통장 입금은 상품 구매 대금은 PC뱅킹, 인터넷뱅킹, 텔레뱅킹 혹은 가까운 은행에서 직접 입금하시면 됩니다.주문시 입력한 입금자명과 실제입금자의 성명이 반드시 일치하여야 하며, 7일 이내로 입금을 하셔야 하며 입금되지 않은 주문은 자동취소 됩니다.",
    },
  ];

  return (
    <main className="flex flex-col flex-1">
      <section className="px-4 py-16 md:px-8 md:py-32">
        <div className="flex flex-col lg:flex-row">
          <Title className="flex-1">고객센터</Title>
          <div className="flex flex-col flex-1">
            <div className="flex flex-col md:flex-row border-b border-gray py-12 gap-4">
              <div className="flex md:flex-1">상담센터</div>
              <div className="flex flex-col items-start gap-4 md:flex-1 lg:flex-2">
                <div className="text-titleSM lg:text-titleMD text-darkGray">
                  웨이비룸 고객지원센터 상담사가 상시 대기 중입니다.
                </div>
                <CallInquery />
              </div>
            </div>
            <div className="flex flex-col md:flex-row border-b border-gray py-12 gap-4">
              <div className="flex md:flex-1">운영 시간</div>
              <div className="flex flex-col items-start gap-4 md:flex-1 lg:flex-2">
                <div className="text-titleSM lg:text-titleMD text-darkGray">
                  월~금: 09:00 ~ 18:00
                </div>
              </div>
            </div>
            <div className="flex flex-col md:flex-row border-b border-gray py-12 gap-4">
              <div className="flex md:flex-1">사무실 주소</div>
              <div className="flex flex-col items-start gap-4 md:flex-1 lg:flex-2">
                <div className="text-titleSM lg:text-titleMD text-darkGray">
                  HQ: 서울시 강남구 청담동 17-10
                  <br />
                  공장: 경기도 화성시 서신면 전곡리 1088-6
                </div>
              </div>
            </div>
            <div className="flex flex-col md:flex-row border-b border-gray py-12 gap-4">
              <div className="flex md:flex-1">제품 & 파트너십 문의</div>
              <div className="flex flex-col items-start gap-4 md:flex-1 lg:flex-2">
                <div className="text-titleSM lg:text-titleMD text-darkGray">
                  <div>
                    제품문의
                  </div>
                  <div>
                    hello@spacewavy.com
                  </div><br />
                  <div>
                     비즈니스 | 파트너쉽 문의
                  </div>
                  <div>
                   info@spacewavy.com
                  </div><br />
                  <div>
                   채용문의
                  </div>
                  <div>
                    career@spacewavy.com
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
      <section className="px-4 py-16 md:px-8 md:py-32">
        <div className="flex flex-col lg:flex-row gap-4">
          <Title className="flex flex-1">자주 묻는 질문</Title>
          <div className="flex flex-col flex-1 md:py-8 lg:py-0">
            {FAQs.map((item, index) => (
              <FaqItem
                key={"faq" + index}
                question={item.question}
                answer={item.answer}
              />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default ContactUs;
