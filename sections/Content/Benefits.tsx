import Icon, { AvailableIcons } from "../../components/ui/Icon.tsx";
import Header from "../../components/ui/SectionHeader.tsx";

interface Benefit {
  label?: string;
  /**
   * @format icon-select
   * @options site/loaders/availableIcons.ts
   */
  icon?: AvailableIcons;
  description?: string;
}

export interface Props {
  /**
   * @default Benefits
   */
  title?: string;
  /**
   * @default Check out the benefits
   */
  description?: string;
  benefits?: Array<Benefit>;
  layout?: {
    variation?: "Simple" | "With border" | "Color reverse";
    headerAlignment?: "center" | "left";
  };
}

export default function Benefits(
  props: Props = {
    title: "Benefits",
    description: "Check out the benefits",
    benefits: [{
      icon: "Truck",
      label: "Entrega em todo Brasil",
      description: "Consulte o prazo no fechamento da compra.",
    }, {
      icon: "Discount",
      label: "15 na primeira compra",
      description: "Aplicado direto na sacola de compras.",
    }, {
      icon: "ArrowsPointingOut", 
      label: "Devolução grátis",
      description: "Veja as condições para devolver seu produto.",
    }, {
      icon: "Shield",
      label: "Compra segura",
      description: "Devolução garantida sem complicação.",
    }],
    layout: {
      variation: "Simple",
      headerAlignment: "center",
    },
  },
) {
  const {
    title,
    description, 
    benefits,
    layout,
  } = props;

  const listOfBenefits = benefits?.map((benefit, index) => {
    const showDivider = index < (benefits?.length ?? 0) - 1;
    const reverse = layout?.variation === "Color reverse";
    const benefitLayout = !layout?.variation || layout?.variation === "Simple"
      ? "tiled"
      : "piledup";

    return (
      <div
        class={`${
          reverse ? "bg-blue-600 text-blue-100 p-4 lg:px-8 lg:py-4" : ""
        } flex gap-4 ${
          benefitLayout == "piledup" ? "flex-col items-center text-center" : ""
        } ${
          showDivider && benefitLayout !== "piledup"
            ? "border-b border-neutral-300" 
            : ""
        } ${showDivider ? "pb-4 lg:pr-8 lg:border-r lg:border-b-0" : ""} ${
          showDivider && !reverse ? "lg:pb-0" : ""  
        }`}
      >
        {benefit.icon && (
          <div class="flex-none">
            <Icon
              id={benefit.icon}
              class={`${reverse ? "text-blue-100" : "text-blue-600"}`} 
              width={36}
              height={36}
              strokeWidth={0.01}
              fill="currentColor"
            />
          </div>
        )}
        <div class="flex-auto flex flex-col gap-1 lg:gap-2">
          {benefit.label && (
            <div
              class={`text-base lg:text-xl leading-7 ${
                reverse ? "text-blue-100" : "text-blue-600"
              }`}
            >
              {benefit.label}
            </div>
          )}
          {benefit.description && (
            <p
              class={`text-sm leading-5 ${
                reverse ? "text-blue-100" : "text-neutral"  
              } ${benefitLayout == "piledup" ? "hidden lg:block" : ""}`}
            >
              {benefit.description}
            </p>
          )}
        </div>
      </div>
    );
  });

  return (
    <>
      {(!layout?.variation || layout?.variation === "Simple") && (
        <div class="w-full container px-4 py-8 flex flex-col gap-8 lg:gap-10 lg:py-10 lg:px-0">
          <Header
            title={title}
            description={description}
            alignment={layout?.headerAlignment}
          />
          <div class="w-full flex justify-center">
            <div class="flex flex-col gap-4 lg:gap-8 w-full lg:grid grid-flow-col auto-cols-fr">
              {listOfBenefits}
            </div>
          </div>
        </div>
      )}
      {layout?.variation === "With border" && (
        <div class="w-full container flex flex-col px-4 py-8 gap-8 lg:gap-10 lg:py-10 lg:px-0">
          <Header
            title={title}
            description={description}
            alignment={layout?.headerAlignment}
          />
          <div class="w-full flex justify-center">
            <div class="grid grid-cols-2 gap-4 w-full py-6 px-4 border border-blue-600 lg:gap-8 lg:grid-flow-col lg:auto-cols-fr lg:p-10">
              {listOfBenefits}
            </div>
          </div>
        </div>
      )}
      {layout?.variation === "Color reverse" && (
        <div class="w-full container flex flex-col px-4 py-8 gap-8 lg:gap-10 lg:py-10 lg:px-0">
          <Header
            title={title}
            description={description}
            alignment={layout?.headerAlignment}
          />
          <div class="w-full flex justify-center">
            <div class="grid grid-cols-2 gap-4 w-full lg:gap-8 lg:grid-flow-col lg:auto-cols-fr">
              {listOfBenefits}
            </div>
          </div>
        </div>
      )}
    </>
  );
}