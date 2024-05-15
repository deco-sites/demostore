export default function Benefits({ items = [
  { icon: '🌍', text: 'Free Shipping Worldwide' },
  { icon: '📞', text: '24/7 Online Support' },
  { icon: '🎁', text: '15 on the first purchase' },
  { icon: '↩️', text: 'Hassle-Free Returns' },
] }: { items?: { icon: string; text: string; }[] }) {
  return (
    <div class="bg-green-600 py-4">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {items.map(({ icon, text }) => (
            <div class="flex items-center space-x-3 text-white" key={text}>
              <span class="text-3xl">{icon}</span>
              <span class="text-lg font-medium">{text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}