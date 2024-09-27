import { ImageWidget } from 'apps/admin/widgets.ts';

interface Props {
  /**
   * @format rich-text
   */
  title?: string;
  /**
   * @format textarea
   */
  startupName?: string;
  buttonText?: string;
  /**
   * @format color-input
   */
  backgroundColor?: string;
  /**
   * @format color-input
   */
  textColor?: string;
}

export default function StartupTracker({
  title = "Picus Capital startup tracker",
  startupName = "Startup name",
  buttonText = "Track",
  backgroundColor = "#f0f0f0",
  textColor = "#000000"
}: Props) {
  return (
    <div class="flex items-center justify-center min-h-screen" style={{ backgroundColor }}>
      <div class="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
        <h1 class="text-2xl font-bold mb-6 text-center" style={{ color: textColor }} dangerouslySetInnerHTML={{ __html: title }}></h1>
        <div class="flex space-x-4">
          <input
            type="text"
            placeholder={startupName}
            class="input input-bordered flex-grow"
          />
          <button class="btn btn-primary">{buttonText}</button>
        </div>
      </div>
    </div>
  );
}