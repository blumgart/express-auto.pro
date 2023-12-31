<template>
  <SectionWrapper class="scroll-mt-10" id="reviews">
    <div
      class="grid gap-y-5 md:gap-y-0 md:grid-cols-2 md:gap-x-5 xl:grid-cols-12 lg:gap-x-5"
    >
      <div class="xl:col-span-7">
        <div
          class="p-0.5 border-[3px] border-white bg-[url('@/assets/images/form-pattern.svg')] rounded-xl"
        >
          <div class="overflow-hidden rounded-xl">
            <img
              src="@/assets/images/form-bg.png"
              alt="Получите бесплатную консультацию"
            />
          </div>

          <div class="px-4 py-6 md:p-8">
            <div class="max-w-lg mx-auto">
              <span
                class="block text-xl text-center uppercase sm:text-2xl lg:text-4xl"
              >
                Получите бесплатную консультацию
              </span>

              <form
                @submit.prevent="onSubmitForm"
                class="grid mt-8 lg:grid-cols-2 gap-x-6 gap-y-8"
              >
                <div class="relative">
                  <input
                    type="text"
                    id="review-name"
                    :class="[
                      'block w-full py-2 bg-transparent border-0 border-b appearance-none focus:outline-none focus:ring-0 peer',
                      v$.name.$error ? 'border-red-600' : 'border-[#C3C3C3]/50',
                    ]"
                    placeholder=" "
                    v-model="v$.name.$model"
                  />
                  <label
                    for="review-name"
                    class="absolute duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] peer-focus:left-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-7"
                  >
                    Имя
                  </label>
                  <span v-if="v$.name.$error" class="text-xs text-red-600">
                    Обязательное поле
                  </span>
                </div>
                <div class="relative">
                  <input
                    type="tel"
                    id="review-phone"
                    :class="[
                      'block w-full py-2 bg-transparent border-0 border-b appearance-none focus:outline-none focus:ring-0 peer',
                      v$.phone.$error
                        ? 'border-red-600'
                        : 'border-[#C3C3C3]/50',
                    ]"
                    placeholder=" "
                    v-model="v$.phone.$model"
                  />
                  <label
                    for="review-phone"
                    class="absolute duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] peer-focus:left-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-7"
                  >
                    Телефон
                  </label>
                  <span v-if="v$.phone.$error" class="text-xs text-red-600">
                    Обязательное поле
                  </span>
                </div>
                <div class="relative lg:col-span-2">
                  <textarea
                    id="review-message"
                    placeholder=" "
                    class="block w-full py-2 bg-transparent border-0 border-b border-[#C3C3C3]/50 appearance-none focus:outline-none focus:ring-0 peer resize-y max-h-20"
                    v-model="v$.message.$model"
                  ></textarea>
                  <label
                    for="review-message"
                    class="absolute duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] peer-focus:left-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-7"
                  >
                    Пожелания к авто
                  </label>
                </div>
                <div class="-mt-4 lg:col-span-2">
                  <label class="flex items-center">
                    <input type="checkbox" v-model="v$.privacy.$model" />
                    <span class="text-xs text-[#868686] ml-1.5">
                      Нажимая на кнопку, вы соглашаетесь с политикой обработки
                      <a href="#" class="text-black">персональных данных</a>.
                    </span>
                  </label>
                </div>
                <div class="text-center lg:col-span-2">
                  <button
                    type="submit"
                    class="bg-[#FFD600] px-7 py-4 font-semibold rounded-full disabled:cursor-not-allowed disabled:opacity-20"
                    :disabled="v$.$error"
                  >
                    Связаться со мной
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div class="xl:col-span-5">
        <ClientOnly>
          <iframe
            class="h-[634px] w-full md:h-full"
            src="https://yandex.ru/maps-reviews-widget/1404027166?comments"
          ></iframe>
        </ClientOnly>
      </div>
    </div>
  </SectionWrapper>
</template>

<script setup>
import { useVuelidate } from "@vuelidate/core";
import { required, sameAs } from "@vuelidate/validators";

const state = reactive({
  name: "",
  phone: "",
  message: "",
  privacy: false,
});

const rules = {
  name: { required },
  phone: { required },
  message: {},
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
      message: state.message,
    },
  });

  state.name = state.phone = state.message = "";
  state.privacy = false;
};
</script>
