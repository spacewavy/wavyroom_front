const SelectLang = ({fontStyleClass = 'font-normal'}: any) => {
  return (
    <section className='flex justify-between w-[63px] h-[22px]'>
      <span className={`w-[27px] h-[22px] text-sm  border-b-2 border-black cursor-pointer ${fontStyleClass}`}>
        KOR
      </span>
      <span className={`w-[27px] h-[22px] text-sm border-b-2 border-transparent opacity-50 cursor-pointer ${fontStyleClass}`}>
        ENG
      </span>
    </section>
  );
};

export default SelectLang;
