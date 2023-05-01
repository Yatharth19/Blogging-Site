const express = require('express');
const router = express.Router();
const { createBlog, updateBlog, deleteBlog, getBlog, getAllBlogs } = require('../controllers/blog.js');
const { loginUser, registerUser, logoutUser, getLogin, getRegister } = require('../controllers/user.js');
const { authenticateToken, createNewToken } = require('../controllers/jwt.js');

router.get('/login', getLogin);
router.get('/register', getRegister);
router.post('/login', loginUser);
router.post('/register', registerUser);
router.post('/logout', logoutUser);

router.post('/token', createNewToken);

router.post('/create', authenticateToken, createBlog);
router.put('/update/:id', authenticateToken, updateBlog);
router.delete('/delete/:id', authenticateToken, deleteBlog);

router.get('/blog/:id', authenticateToken, getBlog);
router.get('/blogs', authenticateToken, getAllBlogs);

module.exports = router;