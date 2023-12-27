"use client"
import CallInquery from "../../components/CallInquery";
import FaqItem from "../../components/FaqItem";
import Title from "../../components/Title";
import { useTranslation } from "react-i18next";

const ContactUs = () => {
  const { t } = useTranslation();

  const FAQs = [
  {
      question:  t('contact-us.section-2-faq.faq-1.question'),
      answer: t('contact-us.section-2-faq.faq-1.answer'),
    },
    {
      question:  t('contact-us.section-2-faq.faq-2.question'),
      answer: t('contact-us.section-2-faq.faq-2.answer'),   
    },
    {
      question:  t('contact-us.section-2-faq.faq-3.question'),
      answer: t('contact-us.section-2-faq.faq-3.answer'),
    },
    {
      question: t('contact-us.section-2-faq.faq-4.question'),
      answer: t('contact-us.section-2-faq.faq-4.answer'),
    },
    {
      question:  t('contact-us.section-2-faq.faq-5.question'),
      answer: t('contact-us.section-2-faq.faq-5.answer'),
    },
    {
      question:  t('contact-us.section-2-faq.faq-6.question'),
      answer: t('contact-us.section-2-faq.faq-6.answer'),
    },
    {
      question:  t('contact-us.section-2-faq.faq-7.question'),
      answer: t('contact-us.section-2-faq.faq-7.answer'),
    }
  ];

  return (
    <main className="flex flex-col flex-1">
      <section className="px-4 py-16 md:px-8 md:py-32">
        <div className="flex flex-col lg:flex-row">
          <Title className="flex-1">   {t('contact-us.section-1.title')}</Title>
          <div className="flex flex-col flex-1">
            <div className="flex flex-col md:flex-row border-b border-gray py-12 gap-4">
              <div className="flex md:flex-1">   {t('contact-us.section-1-side.heading-1')}</div>
              <div className="flex flex-col items-start gap-4 md:flex-1 lg:flex-2">
                <div className="text-titleSM lg:text-titleMD text-darkGray">
                {t('contact-us.section-1-side.para-1')}
                </div>
                <CallInquery />
              </div>
            </div>
            <div className="flex flex-col md:flex-row border-b border-gray py-12 gap-4">
              <div className="flex md:flex-1">{t('contact-us.section-1-side.heading-2')}</div>
              <div className="flex flex-col items-start gap-4 md:flex-1 lg:flex-2">
                <div className="text-titleSM lg:text-titleMD text-darkGray">
                {t('contact-us.section-1-side.para-2')}
                </div>
              </div>
            </div>
            <div className="flex flex-col md:flex-row border-b border-gray py-12 gap-4">
              <div className="flex md:flex-1">{t('contact-us.section-1-side.heading-3')}</div>
              <div className="flex flex-col items-start gap-4 md:flex-1 lg:flex-2">
                <div className="text-titleSM lg:text-titleMD text-darkGray">
                {t('contact-us.section-1-side.para-3.text-1')}
                  <br />
                  {t('contact-us.section-1-side.para-3.text-2')}
                </div>
              </div>
            </div>
            <div className="flex flex-col md:flex-row border-b border-gray py-12 gap-4">
              <div className="flex md:flex-1">{t('contact-us.section-1-side.heading-4')}</div>
              <div className="flex flex-col items-start gap-4 md:flex-1 lg:flex-2">
                <div className="text-titleSM lg:text-titleMD text-darkGray">
                  <div>
                  {t('contact-us.section-1-side.para-4.text-1')}
                  </div>
                  <div>
                    hello@spacewavy.com
                  </div><br />
                  <div>
                  {t('contact-us.section-1-side.para-4.text-2')}
                  </div>
                  <div>
                   info@spacewavy.com
                  </div><br />
                  <div>
                  {t('contact-us.section-1-side.para-4.text-3')}
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
          <Title className="flex flex-1">  {t('contact-us.section-2.title')}</Title>
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
