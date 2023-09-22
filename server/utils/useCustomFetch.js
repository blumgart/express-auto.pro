import { defu } from "defu";

export const customFetch = (url, options = {}) => {
  const config = useRuntimeConfig();

  const defaults = {
    baseURL: config.apiBase,
    key: url,
  };

  const params = defu(defaults, options);

  return $fetch(url, params);
};
