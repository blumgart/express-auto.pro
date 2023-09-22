export const useModal = (modal: string) => {
  const isOpen = useState(`${modal}-show`, () => false);

  const open = () => {
    isOpen.value = true;
  };

  const close = () => {
    isOpen.value = false;
  };

  return {
    isOpen,
    open,
    close,
  };
};
