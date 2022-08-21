import express from "express";
import cors from "cors";
import router from "./routers/userRouter";

class App {
  public server: express.Application;

  constructor() {
    this.server = express();
    this.middleware();
    this.router();
  }

  private middleware() {
    this.server.use(cors());
    this.server.use(express.json());
  }

  private router() {
    this.server.use("/api/typescript/v1", router);
  }
}
export default new App().server;
