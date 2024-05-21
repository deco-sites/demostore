import { Temperature } from "apps/weather/loaders/temperature.ts";

interface Props {
  temperature?: Temperature | null;
}

export default function Section({ temperature }: Props) {
  return (
    <div class="w-full h-40 flex justify-center items-center">
      <h2 class="text-5xl">
        Your Current Temperature is: {temperature?.celsius ?? "unknown"}
      </h2>
    </div>
  );
}
