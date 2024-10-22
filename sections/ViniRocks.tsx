import { Signal, useSignal } from "@preact/signals";

interface Props {
  /**
   * @format rich-text
   */
  title?: string;
  /**
   * @format textarea
   */
  internalDiameterLabel?: string;
  /**
   * @format textarea
   */
  temperatureLabel?: string;
  /**
   * @format textarea
   */
  submitButtonLabel?: string;
  /**
   * @format color-input
   */
  backgroundColor?: string;
  /**
   * @format color-input
   */
  textColor?: string;
  /**
   * @format color-input
   */
  buttonColor?: string;
}

export default function ReportGenerator({
  title = "Gerador de Relatorios",
  internalDiameterLabel = "Diametro interno",
  temperatureLabel = "Temperatura",
  submitButtonLabel = "Gerar Relatório",
  backgroundColor = "#f0f0f0",
  textColor = "#333333",
  buttonColor = "#4CAF50"
}: Props) {
  const internalDiameter = useSignal("");
  const temperature = useSignal("");

  const handleSubmit = (e: Event) => {
    e.preventDefault();
    // Here you would handle the report generation logic
    console.log("Generating report with:", {
      internalDiameter: internalDiameter.value,
      temperature: temperature.value
    });
  };

  return (
    <div class="flex justify-center items-center min-h-screen" style={{ backgroundColor }}>
      <div class="w-80 p-6 rounded-lg shadow-lg" style={{ backgroundColor: "white" }}>
        <h2 class="text-2xl font-bold mb-6 text-center" style={{ color: textColor }} dangerouslySetInnerHTML={{ __html: title }} />
        
        <form onSubmit={handleSubmit} class="space-y-4">
          <div>
            <label class="block mb-2 text-sm font-medium" style={{ color: textColor }} htmlFor="internalDiameter">
              {internalDiameterLabel}
            </label>
            <input
              type="text"
              id="internalDiameter"
              value={internalDiameter.value}
              onChange={(e) => internalDiameter.value = (e.target as HTMLInputElement).value}
              class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              required
            />
          </div>
          
          <div>
            <label class="block mb-2 text-sm font-medium" style={{ color: textColor }} htmlFor="temperature">
              {temperatureLabel}
            </label>
            <input
              type="text"
              id="temperature"
              value={temperature.value}
              onChange={(e) => temperature.value = (e.target as HTMLInputElement).value}
              class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              required
            />
          </div>
          
          <button
            type="submit"
            class="w-full py-2 px-4 rounded-md text-white font-medium hover:opacity-90 transition-opacity"
            style={{ backgroundColor: buttonColor }}
          >
            {submitButtonLabel}
          </button>
        </form>
      </div>
    </div>
  );
}