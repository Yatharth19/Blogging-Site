const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogs')

router.get('/', blogController.viewAllBlogs);
router.post('/', blogController.addBlog);
// router.get('/edit', blogController.editBlog);
router.post('/edit', blogController.updateBlog);
router.get('/delete', blogController.deleteBlog);


module.exports = router;