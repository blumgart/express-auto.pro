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
                  <form @submit.prevent="onSubmitForm" class="space-y-8">
                    <div class="relative z-0">
                      <input
                        type="text"
                        id="modal-name"
                        :class="[
                          'block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b  appearance-none focus:outline-none focus:ring-0 peer',
                          v$.name.$error
                            ? 'border-red-500'
                            : 'border-[#C3C3C3]/50',
                        ]"
                        placeholder=" "
                        v-model="v$.name.$model"
                      />
                      <label
                        for="modal-name"
                        class="absolute text-[#C3C3C3] text-sm duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                      >
                        Имя
                      </label>
                      <span v-if="v$.name.$error" class="text-xs text-red-600">
                        Обязательное поле
                      </span>
                    </div>
                    <div class="relative z-0">
                      <input
                        type="tel"
                        id="modal-phone"
                        :class="[
                          'block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b  appearance-none focus:outline-none focus:ring-0 peer',
                          v$.name.$error
                            ? 'border-red-500'
                            : 'border-[#C3C3C3]/50',
                        ]"
                        placeholder=" "
                        v-model="v$.phone.$model"
                      />
                      <label
                        for="modal-phone"
                        class="absolute text-[#C3C3C3] text-sm duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                      >
                        Телефон
                      </label>
                      <span v-if="v$.phone.$error" class="text-xs text-red-600"
                        >Обязательное поле</span
                      >
                    </div>
                    <div>
                      <label class="flex items-start">
                        <input
                          type="checkbox"
                          class="w-5 h-5"
                          v-model="v$.privacy.$model"
                        />
                        <span class="text-[#868686] text-xs ml-2">
                          Нажимая на кнопку, вы соглашаетесь с политикой
                          обработки
                          <a href="#" class="text-black">персональных данных</a>
                        </span>
                      </label>
                    </div>
                    <button
                      type="submit"
                      class="font-semibold bg-[#FFD600] rounded-full px-4 py-5 w-full disabled:cursor-not-allowed disabled:opacity-20"
                      :disabled="v$.$error"
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
import { useVuelidate } from "@vuelidate/core";
import { required, sameAs } from "@vuelidate/validators";

const { isOpen, close } = useModal("callback");

watch(isOpen, (value) => {
  if (!value) {
    v$.value.$reset();
    state.name = state.phone = "";
    state.privacy = false;
  }
});

const state = reactive({
  name: "",
  phone: "",
  privacy: false,
});

const rules = {
  name: { required },
  phone: { required },
  privacy: { sameAs: sameAs(true) },
};

const v$ = useVuelidate(rules, state);

const onSubmitForm = async () => {
  const result = await v$.value.$validate();

  if (!result) {
    return;
  }

  await useFetch("/api/email/send", {
    method: "POST",
    body: {
      name: state.name,
      phone: state.phone,
    },
  });

  state.name = state.phone = "";
  state.privacy = false;
};
</script>
