import { ImageWidget } from 'apps/admin/widgets.ts';

interface Props {
  image?: ImageWidget;
}

export default function ImageComponent({
  image = "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/1818/6fe9404a-f69c-472a-b521-78f6c1f87326"
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