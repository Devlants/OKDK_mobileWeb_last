import { createProxyMiddleware } from "http-proxy-middleware";

export default function (app) {
  app.use(
    createProxyMiddleware("/api", {
      target: "http://3.36.95.105/",
      changeOrigin: true,
    })
  );
}
