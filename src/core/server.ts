import connect from "connect";
import http from "http";

import launchMiddleware from "launch-editor-middleware";

export const createServer = (port: number) => {
  const app = connect();
  app.use(launchMiddleware());
  http.createServer(app).listen(port);
};
