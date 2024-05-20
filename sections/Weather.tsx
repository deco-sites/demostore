export { default as loader } from "apps/weather/loaders/temperature.ts"

interface Props {

  celsius?: string;
}

export default function Section(props: Props) {
  return <div class="w-full h-40 flex justify-center items-center">
    <h2 class="text-5xl">Your Current Temperature is: {props.celsius}</h2>
  </div>
}