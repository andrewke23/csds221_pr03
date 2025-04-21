const express = require('express');
const mongodb = require('mongodb');

const router = express.Router();

// Get Posts
router.get('/', async (req,res) => {
    const posts = await loadPostsCollection();
    res.send(await posts.find({}).toArray());
});

// Add Post
router.post('/', async (req, res) => {
    const posts = await loadPostsCollection();
    await posts.insertOne({
        text: req.body.text,
        createdAt: new Date()
    });

    res.status(201).send();
})
// Delete Post
router.delete('/:id', async (req, res) => {
    const posts = await loadPostsCollection();
    await posts.deleteOne({_id: new mongodb.ObjectId(req.params.id)});
    res.status(200).send();
});

router.put('/:id', async (req, res) => {
    const posts = await loadPostsCollection();
    const { text } = req.body;

    console.log('Received update request for ID:', req.params.id);
    console.log('New text:', text);

    if (!text || !text.trim()) {
        return res.status(400).send({ error: 'Text is required' });
    }

    try {
        const result = await posts.updateOne(
            { _id: new mongodb.ObjectId(req.params.id) },
            { $set: { text: text } }
        );
        console.log('MongoDB update result:', result);

        if (result.modifiedCount === 0) {
            return res.status(404).send({ error: 'Post not found or text unchanged' });
        }

        res.status(200).send();
    } catch (err) {
        console.error('Error updating post:', err);
        res.status(500).send({ error: 'Failed to update post' });
    }
});


async function loadPostsCollection() {
    const client = await mongodb.MongoClient.connect('mongodb+srv://awk53:Sh84rWdv7LfLmyqj@fullstackpr03.cn4lsjb.mongodb.net/?retryWrites=true&w=majority&appName=FullStackPr03', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    
    return client.db('FullStackPr03').collection('posts');
}

module.exports = router;