const Router = require("koa-router");

const router = new Router({ prefix: "/goods" });

const {
  upload,
  update,
  findAll,
  remove,
  up,
  down,
} = require("../controller/goods.controller");

const { auth, hasAdminPermission } = require("../middleware/auth.middleware");
const { validater } = require("../middleware/goods.middleware");

// 商品查询
router.get("/", findAll);

// 商品上传
router.post("/", auth, hasAdminPermission, validater, upload);

router.put("/:id", auth, hasAdminPermission, validater, update);

// 商品删除
router.delete("/:id", auth, hasAdminPermission, remove);

// 商品上架
router.put("/:id/on", auth, hasAdminPermission, up);

// 商品下架
router.put("/:id/off", auth, hasAdminPermission, down);

module.exports = router;
