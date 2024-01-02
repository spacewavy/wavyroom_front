import { setCustomizationSelectedColor } from "@/app/redux/actions/customizationActions";
import { ModelColors } from "@/app/redux/types";
import React, { FC, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { AnyAction } from "redux";
import { useThree } from "../../context/threeContext";
import { useTranslation } from "react-i18next";

interface SelectColorCardPorps {
  modelColors: ModelColors[];
}

const SelectColorCard: FC<SelectColorCardPorps> = ({ modelColors }) => {
  const [selectedColorName, setSelectedColorName] = useState("");
  const { t } = useTranslation();

  const { changeModelColorFromHex } = useThree();
  const dispatch = useDispatch();

  const handleColorClick = (id: string) => {
    dispatch(setCustomizationSelectedColor(id) as unknown as AnyAction);
  };

  useEffect(() => {
    if (modelColors) {
      const selectedName =
        modelColors.find((color) => color.isSelected)?.name ||
        modelColors.find((color) => color.isDefault)?.name;
      setSelectedColorName(selectedName!);
    }
  }, [modelColors]);

  return (
    <section className="px-[24px] md:px-8 py-4">
      <div className="materialColor flex flex-col gap-4">
        <div className="flex justify-between title text-[14px] font-medium">
          <span className="text-jetBlack">
            {t("customization.exterior-color")}
          </span>
        </div>
        <div className="flex justify-between flex-col md:flex-row gap-2">
          <div className="colors flex gap-2">
            {modelColors
              .sort((a: ModelColors, b: ModelColors) => a.order - b.order)
              .map((x: ModelColors, index) => {
                return (
                  <div
                    key={"color" + index}
                    className="relative w-10 h-10 p-1 cursor-pointer"
                    onClick={() => {
                      handleColorClick(x.id);
                      changeModelColorFromHex(x.colorId);
                    }}
                  >
                    <div
                      className="w-full h-full rounded-full"
                      style={{
                        backgroundColor: x.colorId,
                        borderWidth: 1,
                        borderColor: "rgba(0, 0, 0, 0.1)",
                      }}
                    />
                      <div className={`absolute bg-black top-0 bottom-0 left-0 right-0  bg-transparent transition-all duration-500 ease ${x.isSelected ? 'border-[1px] border-orange' : 'border-[0]' } rounded-full`} />
                  </div>
                );
              })}
          </div>
          <span className="text-[12px] font-light">{selectedColorName}</span>
        </div>
      </div>
    </section>
  );
};

export default SelectColorCard;
