const admin = require('firebase-admin')
const { connectFirestore } = require('../src/firestore')


exports.getBlogs = (req, res) => {
    const db = connectFirestore()
    db.collection('blogs').orderBy("iat", "desc")
    .get()
    .then((collection) => {
        let allBlogs = collection.docs.map((doc) => {
            let blog = doc.data()
            blog.id = doc.id
            return blog
        })
        res.send(allBlogs)
    })
    .catch((error) => res.send('Error', error.message))
}

exports.getBlogId = (req, res) => {
    const db = connectFirestore() // slug: 'yankee-stadium-fun'
    const { blogId } = req.params
    db.collection('blogs')
        // .where('slug','==', blogId)
        .doc(blogId)
        .get()
    .then((doc) => {
            let blog = doc.data()
            blog.id = doc.id
            res.send(blog)
        })
}

exports.addBlog = (req, res) => {
    const db = connectFirestore()
    let newData = req.body
    newData.iat = admin.firestore.FieldValue.serverTimestamp()
    db.collection('blogs').add(newData)
    .then(() => this.getBlogs(req, res))
    .catch((error) => res.send('Error', + error.message))
}

exports.editBlog = (req, res) => {
    const db = connectFirestore()
    const { blogId } = req.params
    db.collection('blogs')
    .doc(blogId)
    .update(newData)
    .then(() => this.getBlogs(req, res))
    .catch((error) => res.send('Error', + error.message))
}