import { ImageWidget } from 'apps/admin/widgets.ts';

interface Props {
  /**
   * @format rich-text
   */
  title?: string;
  /**
   * @format textarea
   */
  placeholder?: string;
  /**
   * @format color-input
   */
  backgroundColor?: string;
  /**
   * @format rich-text
   */
  buttonText?: string;
}

export default function TodoList({
  title = "To Do List",
  placeholder = "Write your to do",
  backgroundColor = "#FF0000",
  buttonText = "Add to do"
}: Props) {
  return (
    <div class="max-w-md mx-auto p-6 rounded-lg shadow-lg" style={{ backgroundColor }}>
      <h1 class="text-2xl font-bold mb-4 text-white">{title}</h1>
      <div class="mb-4">
        <input
          type="text"
          placeholder={placeholder}
          class="w-full p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <button class="w-full bg-white text-black font-semibold py-2 px-4 rounded hover:bg-gray-100 transition duration-300">
        {buttonText}
      </button>
    </div>
  );
}