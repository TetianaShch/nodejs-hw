import { Router } from "express";
import { authenticate } from "../middleware/authenticate.js";
import { updateUserAvatar } from "../controllers/userController.js";

import { upload } from "../middleware/multer";

const router = Router();

router.patch(
  "/avatar",
  authenticate,
  upload.single("avatar"),
  updateUserAvatar
);

export default router;

