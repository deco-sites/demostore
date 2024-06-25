import { HTMLWidget, ImageWidget } from "apps/admin/widgets.ts";

interface Props {
  /**
   * @description The newsletter section title.
   * @format textarea
   */
  title?: string;
  /**
   * @description The newsletter section description.
   * @format textarea
   */
  description?: string;
  /**
   * @description The background image for the newsletter section.
   */
  backgroundImage?: ImageWidget;
  /**
   * @description The button text for the newsletter form.
   */
  buttonText?: string;
  /**
   * @description The success message after subscribing to the newsletter.
   * @format textarea
   */
  successMessage?: string;
}

export default function NewsletterSubscribe({
  title = "Subscribe to our Newsletter",
  description = "Stay up to date with the latest news and offers.",
  backgroundImage,
  buttonText = "Subscribe",
  successMessage = "Thank you for subscribing!",
}: Props) {
  return (
    <section
      class="bg-cover bg-center py-16"
      style={`background-image: url(${backgroundImage})`}
    >
      <div class="container mx-auto px-4">
        <div class="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-lg">
          <h2 class="text-3xl font-bold mb-4">{title}</h2>
          <p class="text-gray-600 mb-6">{description}</p>
          <form>
            <div class="mb-4">
              <label for="email" class="block text-gray-700 font-bold mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your email"
                required
              />
            </div>
            <button
              type="submit"
              class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-200"
            >
              {buttonText}
            </button>
          </form>
          <p class="text-green-500 mt-4">{successMessage}</p>
        </div>
      </div>
    </section>
  );
}