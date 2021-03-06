const functions = require("firebase-functions");
const express = require("express")
const cors = require("cors")
const { getBlogs, addBlog, getBlogId, deleteBlog, updateBlog } = require('./src/blog')

const app = express()
app.use(cors())

app.get('/blogs', getBlogs) 
app.post('/blogs', addBlog)
app.get('/blogs/:blogId', getBlogId)
app.delete('/blogs/:blogId',deleteBlog )
app.patch('/blogs/:blogId', updateBlog )

exports.app = functions.https.onRequest(app)

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
