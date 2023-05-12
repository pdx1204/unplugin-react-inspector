/* eslint-disable @typescript-eslint/ban-ts-comment */
import connect from "connect";
import http from "http";

// @ts-ignore
import launchMiddleware from "launch-editor-middleware";

export const createServer = (port: number) => {
  const app = connect();
  app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    next();
  });
  app.use(launchMiddleware());
  http.createServer(app).listen(port);
};
