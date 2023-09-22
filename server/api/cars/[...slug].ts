import { createRouter, useBase, defineEventHandler } from "h3";
import { customFetch } from "~/server/utils/useCustomFetch";

const router = createRouter();

router.get(
  "/index",
  defineEventHandler(async (event) => {
    const data = await customFetch("/cars");

    return data;
  })
);

export default useBase("/api/cars", router.handler);
