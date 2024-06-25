interface Props {
  /**
   * @description The main title text.
   */
  title?: string;
  /**
   * @description The description or subtitle text.
   * @format textarea
   */
  description?: string;
  /**
   * @description The background color of the section.
   * @format color-input
   */
  bgColor?: string;
  /**
   * @description The text color of the section.
   * @format color-input
   */
  textColor?: string;
  /**
   * @description The text for the subscribe button.
   */
  buttonText?: string;
}

export default function Newsletter({ 
  title = "Subscribe to our Newsletter", 
  description = "Stay up to date with our latest news and offers.",
  bgColor = "#f0f0f0",
  textColor = "#333",
  buttonText = "Subscribe"
}: Props) {
  return (
    <section class="py-16" style={{ backgroundColor: bgColor, color: textColor }}>
      <div class="container mx-auto px-4">
        <h2 class="text-3xl font-bold mb-4 text-center">{title}</h2>
        <p class="text-lg mb-8 text-center">{description}</p>
        <form class="max-w-lg mx-auto">
          <div class="flex flex-col md:flex-row">
            <input 
              type="email" 
              placeholder="Enter your email" 
              class="w-full md:w-2/3 px-4 py-2 mb-4 md:mb-0 md:mr-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
            />
            <button 
              type="submit" 
              class="w-full md:w-1/3 px-4 py-2 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600 transition duration-200"
            >
              {buttonText}
            </button>
          </div>
        </form>
      </div>
    </section>
  )
}