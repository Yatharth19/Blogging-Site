const Blog = require('../models/blog');

const createBlog = async (req, res) => {
    try{
        const {title, content, email} = req.body;
        const currentDate = new Date();
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', timeZoneName: 'short' };
        const formattedDate = currentDate.toLocaleString('en-IN', options);
        console.log(formattedDate); 
        
        const blog = await new Blog({
            title: title,
            content: content, 
            email: email,
            createdAt: formattedDate
        });
        blog.save();
        res.status(200).json("blog saved successfully");
    } catch(err) {
        res.status(500).json(err);
    }
};

const updateBlog = async (req, res) => {
    try{
        const blog = await Blog.findById(req.params.id);
        if(!blog) {
            res.status(400).json({
                message: 'blog not found'
            })
        }
        await Blog.findByIdAndUpdate( req.params.id, {$set: req.body});
        
        res.status(200).json("blog Updated");

    } catch(err) {
        // console.log(err);
        res.status(500).json('Could not update blog.');
    }
};

const deleteBlog = async (req, res) => {
    try{
        await Blog.deleteOne({_id: req.params.id});
        res.status(200).json("blog Deleted");
    } catch(err) {
        console.log(err);
        res.status(500).json('Error while deleting blog');
    }
};


const getBlog = async (req, res) => {
    try{
        const blog = await Blog.findById(req.params.id);
        res.status(200).json(blog);
    } catch(err) {
        res.status(500).json(err);
    }
};

const getAllBlogs = async (req, res) => {
    try{
        const email = req.query.email;
        if(!email) {
            res.status(404).json('Email Not found');
        }
        const blogs = await Blog.find({ email: email });
        res.status(200).json(blogs);
    } catch(err) {
        res.status(500).json(err);
    }
};

module.exports = {
    createBlog,
    updateBlog,
    deleteBlog,
    getBlog,
    getAllBlogs
}