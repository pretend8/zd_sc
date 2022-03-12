const Router = require("koa-router");

const router = new Router({ prefix: "/goods" });

const {
  upload,
  create,
  update,
  findAll,
  remove,
  up,
  down,
} = require("../controller/goods.controller");

const { auth, hasAdminPermission } = require("../middleware/auth.middleware");
const { validator } = require("../middleware/goods.middleware");

// 商品查询
router.get("/", findAll);

// 商品图片上传
router.post("/upload", hasAdminPermission, upload);
// 商品发布
router.post("/", auth, hasAdminPermission, validator, create);

// 商品修改
router.put("/:id", auth, hasAdminPermission, validator, update);

// 商品删除
router.delete("/:id", auth, hasAdminPermission, remove);

// 商品上架
router.put("/:id/on", auth, hasAdminPermission, up);

// 商品下架
router.put("/:id/off", auth, hasAdminPermission, down);

module.exports = router;
