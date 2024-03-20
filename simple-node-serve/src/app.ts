import express from "express";
import { userRouter } from "./routes/user";
import i18n from "i18next";
import NextFsBackend from "i18next-fs-backend";
import { LanguageDetector, handle } from "i18next-http-middleware";

i18n.use(NextFsBackend).use(LanguageDetector).init({
  fallbackLng: "en",
  lng: "en",
  ns: ["common"],
  defaultNS: "common",
  backend: {
    loadPath: "locales/{{lng}}/{{ns}}.json",
  },
  detection: {
    lookupHeader: "accept-language",
  }
});

const app = express();
app.use(express.json());
app.use(handle(i18n));

app.use(userRouter);

export default app;
