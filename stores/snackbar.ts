/* eslint-disable import/prefer-default-export */
type Message = {
  id: Symbol,
  message: string,
  type?: 'error' | 'success' | 'warning' | 'info',
  icon?: string,
};

type State = {
  messages: Message[]
};

const initialState: State = {
  messages: [],
};

export const useSnackBarStore = defineStore('snackbarStore', () => {
  const messages = ref(initialState.messages);

  const hide = (id: Symbol) => {
    messages.value = messages.value.filter((message) => message.id !== id);
  };

  const show = (payload: Omit<Message, 'id'>, timeout = 3000) => {
    const msg = {
      ...payload,
      id: Symbol(payload.message),
    };

    messages.value.push(msg);
    setTimeout(() => hide(msg.id), timeout);
  };

  return {
    messages,

    show,
    hide,
  };
});
