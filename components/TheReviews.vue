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
            <img src="@/assets/images/form-bg.png" alt="" />
          </div>

          <div class="px-4 py-6 md:p-8">
            <div class="max-w-lg mx-auto">
              <span class="block text-2xl text-center uppercase lg:text-4xl">
                Получите бесплатную консультацию
              </span>

              <form class="grid mt-8 lg:grid-cols-2 gap-x-6 gap-y-8">
                <div class="relative">
                  <input
                    type="text"
                    id="review-name"
                    class="block w-full py-2 bg-transparent border-0 border-b border-[#C3C3C3]/50 appearance-none focus:outline-none focus:ring-0 peer"
                    placeholder=" "
                  />
                  <label
                    for="review-name"
                    class="absolute duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] peer-focus:left-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-7"
                  >
                    Имя
                  </label>
                </div>
                <div class="relative">
                  <input
                    type="tel"
                    id="review-phone"
                    class="block w-full py-2 bg-transparent border-0 border-b border-[#C3C3C3]/50 appearance-none focus:outline-none focus:ring-0 peer"
                    placeholder=" "
                  />
                  <label
                    for="review-phone"
                    class="absolute duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] peer-focus:left-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-7"
                  >
                    Телефон
                  </label>
                </div>
                <div class="relative lg:col-span-2">
                  <textarea
                    id="review-message"
                    placeholder=" "
                    class="block w-full py-2 bg-transparent border-0 border-b border-[#C3C3C3]/50 appearance-none focus:outline-none focus:ring-0 peer resize-y max-h-20"
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
                    <input type="checkbox" />
                    <span class="text-xs text-[#868686] ml-1.5">
                      Нажимая на кнопку, вы соглашаетесь с политикой обработки
                      <a href="#" class="text-black">персональных данных</a>.
                    </span>
                  </label>
                </div>
                <div class="text-center lg:col-span-2">
                  <button
                    type="submit"
                    class="bg-[#FFD600] px-7 py-4 font-semibold rounded-full"
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

<script setup></script>
