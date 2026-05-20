import { ImageWidget } from 'apps/admin/widgets.ts';

interface Props {
  image?: ImageWidget;
}

export default function ImageComponent({
  image = "https://decoims.com/demostore/7f4e6f52-0aa2-4d97-a1db-e8fe0ae44221/6fe9404a_6fe9404a-f69c-472a-b521-78f6c1f87326.png"
}: Props) {
  return (
    <div class="w-full max-w-4xl mx-auto">
      <img 
        src={image} 
        alt="Large image" 
        class="w-full h-auto object-cover rounded-lg shadow-lg"
      />
    </div>
  );
}