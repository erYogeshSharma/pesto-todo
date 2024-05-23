import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import Logger from "./core/Logger";
import { config } from "./config";

import "./database/index";
import routes from "./routes";
import { NotFoundError, ApiError, InternalError, ErrorType } from "./core/ApiError";

const app = express();

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true, parameterLimit: 50000 }));
app.use(cors({ origin: config.corsURL, optionsSuccessStatus: 200 }));

//ROUTES
app.use("/v1", routes);

// catch 404 and forward to error handler
app.use((req, res, next) => next(new NotFoundError()));

/* -------------------------------------------------------------------------- */
/*                          MIDDLEWARE ERROR HANDLING                         */
/* -------------------------------------------------------------------------- */
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof ApiError) {
    ApiError.handle(err, res);
    if (err.type === ErrorType.INTERNAL) Logger.error(`500 - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
  } else {
    Logger.error(`500 - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    Logger.error(err);
    if (config.env === "development") {
      return res.status(500).send(err);
    }
    ApiError.handle(new InternalError(), res);
  }
});

export default app;
