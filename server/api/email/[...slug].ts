import { Resend } from "resend";
import { createRouter, useBase, defineEventHandler } from "h3";

const config = useRuntimeConfig();

const resend = new Resend(config.resendApiKey);
const router = createRouter();

router.post(
  "/send",
  defineEventHandler(async (event) => {
    try {
      const { name, phone, message = "" } = await readBody(event);
      const data = await resend.emails.send({
        from: "Acme <onboarding@resend.dev>",
        to: ["delivered@resend.dev"],
        subject: "Hello world",
        html: "<strong>It works!</strong>",
      });
      return data;
    } catch (error) {
      return { error };
    }
  })
);

export default useBase("/api/email", router.handler);
