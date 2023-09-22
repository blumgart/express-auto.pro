<template>
  <HeadlessTransitionRoot :show="isOpen" as="template">
    <HeadlessDialog as="div" @close="close" class="relative z-10">
      <HeadlessTransitionChild
        as="template"
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black/50"></div>
      </HeadlessTransitionChild>

      <div class="fixed inset-0 overflow-y-auto">
        <div
          class="flex items-center justify-center min-h-full p-4 text-center"
        >
          <HeadlessTransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <div class="relative">
              <button
                type="button"
                class="absolute w-6 h-6 text-white duration-300 -top-6 -right-6 i-heroicons-x-mark-solid hover:rotate-90"
              ></button>

              <HeadlessDialogPanel
                class="w-full max-w-lg px-10 py-6 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl"
              >
                <HeadlessDialogTitle
                  as="h3"
                  class="text-2xl font-medium tracking-tight text-center"
                >
                  Оставьте заявку и мы свяжемся<span class="block"></span> с
                  вами в ближайшее время
                </HeadlessDialogTitle>
                <div class="mt-8">
                  <form @submit="onSubmitForm" class="space-y-8">
                    <div class="relative z-0">
                      <input
                        type="text"
                        id="modal-name"
                        class="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b border-[#C3C3C3]/50 appearance-none focus:outline-none focus:ring-0 peer"
                        placeholder=" "
                      />
                      <label
                        for="modal-name"
                        class="absolute text-[#C3C3C3] text-sm duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                      >
                        Имя
                      </label>
                    </div>
                    <div class="relative z-0">
                      <input
                        type="tel"
                        id="modal-phone"
                        class="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b border-[#C3C3C3]/50 appearance-none focus:outline-none focus:ring-0 peer"
                        placeholder=" "
                      />
                      <label
                        for="modal-phone"
                        class="absolute text-[#C3C3C3] text-sm duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                      >
                        Телефон
                      </label>
                    </div>
                    <div>
                      <label class="flex items-start">
                        <input type="checkbox" class="w-5 h-5" />
                        <span class="text-[#868686] text-xs ml-2">
                          Нажимая на кнопку, вы соглашаетесь с политикой
                          обработки
                          <a href="#" class="text-black">персональных данных</a>
                        </span>
                      </label>
                    </div>
                    <button
                      type="submit"
                      class="font-semibold bg-[#FFD600] rounded-full px-4 py-5 w-full"
                    >
                      Оставить заявку
                    </button>
                  </form>
                </div>
              </HeadlessDialogPanel>
            </div>
          </HeadlessTransitionChild>
        </div>
      </div>
    </HeadlessDialog>
  </HeadlessTransitionRoot>
</template>

<script setup>
const { isOpen, close } = useModal("callback");

const onSubmitForm = () => {};
</script>
