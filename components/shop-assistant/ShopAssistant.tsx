import { useSignal } from "@preact/signals";
import { useCallback, useEffect, useState } from "preact/hooks";
import { ChatContainer } from "./ChatContainer.tsx";
import {
  AssistantContentMessage,
  AssistantIds,
  Message,
} from "./types/shop-assistant.ts";
import { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";
import { ChatProvider, useChatContext } from "./ChatContext.tsx";
import { useUI } from "../../sdk/useUI.ts";
import { sendEvent } from "../../sdk/analytics.tsx";

export interface MainColors {
  /**
   * @format color
   * @title Primary
   * @default #E9E1D8
   */
  "primary": string;
  /**
   * @format color
   * @title Secondary
   * @default #fff
   */
  "secondary": string;
  /**
   * @format color
   * @title Text Color
   * @default #000
   */
  "tertiary": string;
  /**
   * @format color
   * @title Logo Color
   * @default #df8292
   */
  "logo": string;
}

export interface Props {
  openChat?: boolean;
  mainColors?: MainColors;
  logo?: { src: ImageWidget; alt: string };
}

function Chat({ mainColors, logo, openChat = false }: Props) {
  const ws = useSignal<WebSocket | null>(null);
  const messageList = useSignal<Message[]>([]);
  const assistantIds = useSignal<AssistantIds>({
    threadId: "",
    assistantId: "",
  });
  const [showChat, setShowChat] = useState<boolean>(false);
  const { minimizeChat, isChatMinimized } = useChatContext();
  const { displayCart } = useUI();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const isOpen = JSON.parse(sessionStorage.getItem("isOpen") ?? "false") ||
        false;
      setShowChat(isOpen);
    } else {
      setShowChat(false);
    }
  }, []);

  useEffect(() => {
    minimizeChat(displayCart.value);
  }, [displayCart.value]);

  function hexToRgb(hex: string): string {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `${r}, ${g}, ${b}`;
  }

  useEffect(() => {
    if (isChatMinimized) {
      setShowChat(false);
    }
  }, [isChatMinimized]);

  useEffect(() => {
    loadChatSession();
  }, []);

  useEffect(() => {
    if (mainColors) {
      // Set the regular color variables
      document.documentElement.style.setProperty(
        "--primary-color-hex",
        mainColors.primary,
      );
      document.documentElement.style.setProperty(
        "--secondary-color-hex",
        mainColors.secondary,
      );
      document.documentElement.style.setProperty(
        "--tertiary-color-hex",
        mainColors.tertiary,
      );
      document.documentElement.style.setProperty(
        "--logo-color-hex",
        mainColors.logo,
      );

      // Set the RGB color variables
      document.documentElement.style.setProperty(
        "--primary-color",
        hexToRgb(mainColors.primary),
      );
      document.documentElement.style.setProperty(
        "--secondary-color",
        hexToRgb(mainColors.secondary),
      );
      document.documentElement.style.setProperty(
        "--opaque-white",
        "rgba(255, 255, 255, 0.5)",
      );
    }
  }, [mainColors]);

  useEffect(() => {
    const host = window.location.host;
    const websocket = window.location.protocol === "https:" ? "wss" : "ws";
    // TODO: make chat name dynamic via prop
    ws.value = new WebSocket(
      `${websocket}://${host}/live/invoke/ai-assistants/actions/chat.ts?assistant=deco`,
    );

    // All messages belong to this category
    const handleJSONMessage = (
      data: AssistantContentMessage,
      isWelcomeMessage: boolean,
    ) => {
      if (!hasChatHistory() || !isWelcomeMessage) {
        addNewMessageToList({
          content: data.content,
          type: data.type,
          role: data.role ?? "assistant",
        });
      }
    };

    ws.value.onmessage = (event: MessageEvent) => {
      try {
        if (isJSON(event.data)) {
          const parsedData = JSON.parse(event.data);
          handleJSONMessage(parsedData, parsedData.isWelcomeMessage);
          updateAssistantIds({
            threadId: parsedData.threadId,
            assistantId: parsedData.assistantId,
          });
        } else {
          console.error("Data received is not a JSON.");
        }
      } catch (error) {
        console.error("Error processing message:", error);
      }
    };
  }, []);

  useEffect(() => {
    // TODO: Refactor
    const updatedMessageList = [...messageList.value];

    // Clear the first function_calls message if there's more than one
    const functionCallMsgs = updatedMessageList.filter((msg) =>
      msg.type === "function_calls"
    );
    if (functionCallMsgs.length > 1) {
      const firstFunctionCallIndex = updatedMessageList.findIndex((msg) =>
        msg.type === "function_calls"
      );
      if (firstFunctionCallIndex !== -1) {
        updatedMessageList.splice(firstFunctionCallIndex, 1);
      }
    }

    // Update messageList only if there are changes
    if (
      JSON.stringify(messageList.value) !== JSON.stringify(updatedMessageList)
    ) {
      messageList.value = updatedMessageList;
    }
  }, [messageList.value]);

  const isJSON = (str: string) => {
    try {
      JSON.parse(str);
      return true;
    } catch (err) {
      return false;
    }
  };

  const send = useCallback((text: string) => {
    if (ws.value) {
      ws.value.send(text);
    }
  }, []);

  const addNewMessageToList = (newMessage: Message): void => {
    const isChatOpen = JSON.parse(
      sessionStorage.getItem("isOpen") ?? "false",
    );
    messageList.value = [...messageList.value, newMessage];
    storeChatSession({
      messageList: messageList.value,
      isChatOpen: isChatOpen,
    });
  };

  const updateAssistantIds = (newIds: AssistantIds): void => {
    assistantIds.value = newIds;
    sessionStorage.setItem("threadId", newIds.threadId);
    sessionStorage.setItem("assistantId", newIds.assistantId);
  };

  const updateMessageListArray = (newMessageList: Message[]): void => {
    const isChatOpen = JSON.parse(
      sessionStorage.getItem("isOpen") ?? "false",
    );
    messageList.value = newMessageList;
    storeChatSession({ messageList: newMessageList, isChatOpen: isChatOpen });
  };

  const storeChatSession = (
    { messageList, isChatOpen }: {
      messageList: Message[];
      isChatOpen: boolean;
    },
  ) => {
    sessionStorage.setItem("chatHistory", JSON.stringify(messageList));
    sessionStorage.setItem("isOpen", JSON.stringify(isChatOpen));
  };

  // TODO(@ItamarRocha): add get ids from session storage and send it to the server
  const loadChatSession = () => {
    const chatHistory = JSON.parse(
      sessionStorage.getItem("chatHistory") ?? "[]",
    );
    const isChatOpen = JSON.parse(
      sessionStorage.getItem("isOpen") ?? "false",
    );
    messageList.value = chatHistory;
    setShowChat(isChatOpen);
  };

  const hasChatHistory = () => {
    const chatHistory = JSON.parse(
      sessionStorage.getItem("chatHistory") ?? "[]",
    );
    return chatHistory.length > 0;
  };

  const handleClick = () => {
    setShowChat(!showChat);
    sessionStorage.setItem("isOpen", JSON.stringify(!showChat));
    sendEvent({
      name: "select_promotion",
      params: {
        promotion_id: "chat-sales-assistant",
        promotion_name: "chat-sales-assistant",
        assistantId: assistantIds.value.assistantId,
        assistantThreadID: assistantIds.value.threadId,
        openChat: !showChat,
      },
    });
  };

  return (
    <>
      <style>
        {`
          .bg-primary-90 {
            background-color: rgba(var(--primary-color), 0.95);
          }
          .bg-secondary-70 {
            background-color: rgba(var(--secondary-color), 0.70);
          }
          .bg-chatSecondary:hover {
            box-shadow: inset 0 0 0 1000px rgba(0, 0, 0, 0.1);
          }
          `}
        {`@keyframes expandChat {
          from {
            transform: scale(0);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }`}
        {`@keyframes pulse {
          0% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.1);
          }
          100% {
            transform: scale(1);
          }
        }`}
      </style>
      <div class="right-0 fixed bottom-0 sm:bottom-4 z-[999]">
        {showChat
          ? (
            <div
              class={`mr-0 ${
                displayCart.value ? "sm:mr-[28rem]" : "sm:mr-[1.2rem]"
              }`}
              style={{
                animation: "expandChat 0.5s ease-out forwards",
                transformOrigin: "bottom right",
              }}
            >
              <ChatContainer
                logo={logo}
                send={send}
                assistantIds={assistantIds}
                messageList={messageList}
                addNewMessageToList={addNewMessageToList}
                handleShowChat={handleClick}
                updateMessageListArray={updateMessageListArray}
                updateAssistantIds={updateAssistantIds}
              />
            </div>
          )
          : (
            <button
              onClick={handleClick}
              style={{ animation: "pulse 1.5s infinite" }}
              class={`mr-6 ${
                displayCart.value ? "sm:mr-[28rem]" : "sm:mr-[1.2rem]"
              } mb-8 hover:shadow-custom-inset sm:mb-0 bg-chatLogo rounded-full flex justify-center items-center w-16 h-16 p-4 shadow-md`}
            >
              {logo
                ? (
                  <Image
                    src={logo.src}
                    alt={logo.alt}
                    width={50}
                    height={50}
                  />
                )
                : <img src="/deco-icon.svg"></img>}
            </button>
          )}
      </div>
    </>
  );
}

export default function ShopAssistant(
  { mainColors, logo, openChat }: Props,
) {
  return (
    <ChatProvider>
      <Chat mainColors={mainColors} logo={logo} openChat={openChat} />
    </ChatProvider>
  );
}
