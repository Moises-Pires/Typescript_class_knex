import { Router } from "express";
import { UserController } from "../controllers/UserController";

const router = Router();
const useController = new UserController();
router.get("/search-all", useController.searchAll);

export default router;
