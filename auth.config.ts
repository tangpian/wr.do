import type { NextAuthConfig } from "next-auth";
import Github from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import Resend from "next-auth/providers/resend";

import { env } from "@/env.mjs";

import { siteConfig } from "./config/site";
import { getVerificationEmailHtml, resend } from "./lib/email";

const linuxDoProvider: any = {
  id: "linuxdo",
  name: "Linux Do",
  version: "2.0",
  type: "oauth",
  authorization: "https://connect.linux.do/oauth2/authorize",
  token: "https://connect.linux.do/oauth2/token",
  userinfo: "https://connect.linux.do/api/user",
  clientId: env.LinuxDo_CLIENT_ID,
  clientSecret: env.LinuxDo_CLIENT_SECRET,
  checks: ["state"],
  profile: (profile: any) => {
    console.log("profile", profile);
    return {
      id: profile.id.toString(),
      name: profile.username,
      image: profile.avatar_url,
      email: profile.email,
      active: profile.active ? 1 : 0,
      // username: profile.username,
      // trust_level: profile.trust_level,
      // silenced: profile.user.silenced,
      // email: profile.user.email,
    };
  },
};

export default {
  providers: [
    Google({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),
    Github({
      clientId: env.GITHUB_ID,
      clientSecret: env.GITHUB_SECRET,
    }),
    Resend({
      apiKey: env.RESEND_API_KEY,
      from: "Hi <hi@omnibox.app>",
      async sendVerificationRequest({ identifier: email, url, provider }) {
        try {
          // 使用 Resend 发送自定义验证邮件
          const { data, error } = await resend.emails.send({
            from: provider.from || "hi@omnibox.app",
            to: [email],
            subject: "Verify your email address",
            html: getVerificationEmailHtml({ url, appName: siteConfig.name }),
          });

          if (error) {
            throw new Error(`Resend error: ${JSON.stringify(error)}`);
          }
        } catch (error) {
          console.error("Error sending verification email", error);
          throw new Error("Error sending verification email");
        }
      },
    }),
    linuxDoProvider,
  ],
} satisfies NextAuthConfig;
