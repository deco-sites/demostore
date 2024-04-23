
interface FancyNewsletterProps {
  title?: string;
  image?: string;
  description?: string;
  date?: string;
}

export default function FancyNewsletter({
  title = "Weekly Newsletter",
  image = "green-newsletter-image.jpg",
  description = "Subscribe to our weekly newsletter for the latest updates",
  date = "January 1, 2024"
}: FancyNewsletterProps) {
  return (
    <div class="bg-green-200 p-4 rounded-md shadow-md">
      <img src={image} alt="Newsletter" class="w-full rounded-t-md" />
      <h2 class="text-xl font-semibold my-2 text-white">{title}</h2>
      <p class="text-white">{description}</p>
      <div class="text-sm text-white">
        <time>{date}</time>
      </div>
    </div>
  );
}
