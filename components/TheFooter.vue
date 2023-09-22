<template>
  <footer class="bg-white relative rounded-t-[40px] py-6 sm:py-7 lg:py-10 overflow-hidden">
    <div class="max-w-[1646px] px-4 mx-auto">
      <div class="grid lg:grid-cols-12 gap-x-5">
        <div class="lg:col-span-7">
          <div class="flex flex-col justify-between sm:flex-row">
            <div class="relative sm:max-w-[285px] lg:max-w-sm">
              <img src="@/assets/images/tire.svg" alt="Шины" class="absolute hidden sm:block -top-7 lg:-top-10 sm:-right-24 lg:-right-48" />

              <p class="text-[40px]/[1] xl:text-[58px]/[1] uppercase relative" v-html="contacts.address"></p>
            </div>

            <div class="relative mt-6 sm:mt-0 sm:w-1/2 shrink-0 lg:w-auto">
              <ul class="space-y-6">
                <li class="flex flex-col">
                  <a :href="`tel:${rawPhone(contacts.phone)}`" class="text-2xl font-bold">
                    {{ contacts.phone }}
                  </a>
                  <span class="text-[#868686] font-medium mt-1"> Телефон для консультирования </span>
                </li>
                <li class="flex flex-col">
                  <a :href="`mailto:${contacts.email}`" class="text-2xl font-bold">
                    {{ contacts.email }}
                  </a>
                  <span class="text-[#868686] font-medium mt-1"> Почта для запросов </span>
                </li>
                <li class="flex items-center space-x-3">
                  <a
                    v-for="social in socials"
                    :key="social.name"
                    :href="social.url"
                    class="inline-flex items-center justify-center w-8 h-8 bg-[#FFD600] rounded-full"
                    :aria-label="social.name"
                  >
                    <span :class="['w-4 h-4', social.icon]"></span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div class="w-full mt-8 sm:mt-10 lg:col-span-5 lg:mt-0">
          <ClientOnly>
            <YandexMap :coordinates="[32, 50]" class="h-36 sm:h-72 lg:h-64 overflow-hidden rounded-[20px]">
              <YandexMarker :marker-id="1" :coordinates="[32, 50]"></YandexMarker>
            </YandexMap>
          </ClientOnly>
        </div>
      </div>

      <div class="grid mt-2 sm:grid-cols-3 sm:mt-3 lg:grid-cols-12 gap-x-5 gap-y-2">
        <div class="sm:col-span-1 lg:col-span-7">
          <small class="text-sm text-[#868686]"> &copy; {{ siteName }}, {{ year }} </small>
        </div>

        <div class="sm:col-span-2 lg:col-span-5">
          <div class="flex flex-col justify-between sm:items-center sm:flex-row">
            <a href="#" class="text-sm text-[#868686]"> Политика конфиденциальности </a>
            <a href="#" class="inline-flex items-center mt-2 sm:mt-0">
              <span class="text-sm text-[#868686]">Разработка сайта:</span>
              <img src="/serptop.svg" class="w-24 translate-y-0.5 ml-2" alt="Разработка сайта - SerpTop" />
            </a>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { YandexMap, YandexMarker } from "vue-yandex-maps";

const { siteName, contacts, socials } = useAppConfig();
const year = useDateFormat(useNow(), "YYYY");
</script>
