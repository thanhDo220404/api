var express = require('express');
var router = express.Router();
const categoryController = require('../mongo/category.controller');
const productController = require('../mongo/product.controller');
const categoryModel = require('../mongo/category.model');

/* GET home page. */
router.get('/', async function(req, res, next) {
  try {
    const result = await categoryController.getAll()
    return res.status(200).json(result);
  } catch (error) {
    console.log('Loi lay danh sach san pham')
    return res.status(500).json({mess: error});
  }
});
//Lay danh muc bang id
router.get('/:id', async (req, res)=>{
  try {
      const {id} = req.params;
      const products = await productController.getProductsByIdCate(id);
      const category = await categoryController.getCategoryById(id);
      return res.status(200).json({Category: category, Products: products});
  } catch (error) {
      console.log("Loi lay danh muc bang id: ", error);
      return res.status(500).json({mess: error})
  }
})

//them category moi
//http://localhost:3000/categories
router.post('/', async (req, res)=>{
  try {
      const body = req.body;
      const result = await categoryController.insert(body);
      return res.status(200).json(result);
  } catch (error) {
      console.log("Loi insert: ", error);
      return res.status(500).json({mess: error})
  }
});

//UPDATE danh muc theo id
//http://localhost:3000/categories/:id
router.put('/:id', async(req,res)=>{
  try {
     const {id} = req.params
     const body = req.body
     const cateNew = await categoryController.updateById(id,body);
     return res.status(200).json({category: cateNew});
  } catch (error) {
      console.log('loi update: ', error)
      return res.status(500).json({mess: error})
  }
})

//http://localhost:3000/categories/:id
router.delete('/:id', async(req, res)=>{
  try {
      const {id} = req.params;
      const products = await productController.getProductsByIdCate(id);
      if (products && products.length > 0) {
          return res.status(200).json('Không thể xóa danh mục có tồn tại sản phẩm');
      }else{
          const result = await categoryController.removeById(id);
          return res.status(200).json({categoryDelete: result});
      }
  } catch (error) {
      console.log('loi delele: ', error)
      return res.status(500).json({mess: error}) 
  }
})
module.exports = router;
