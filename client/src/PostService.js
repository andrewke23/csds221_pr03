import axios from 'axios';

const url = 'api/posts';

class PostService {
    static async getPosts() {
        try {
            const res = await axios.get(url);
            const data = res.data;
            return data.map(post => ({
                ...post,
                createdAt: new Date(post.createdAt)
            }));
        } catch (err) {
            return Promise.reject(err);
        }
    }

    // Create Post
    static insertPost(text) {
        return axios.post(url, {
            text
        });
    }

    // Delete Post
    static deletePost(id) {
        return axios.delete(`${url}/${id}`);
    }

    // Update Post
    static updatePost(id, text) {
        return new Promise((resolve, reject) => {
          axios
            .put(`${url}${id}`, { text })
            .then(res => resolve(res.data))
            .catch(err => reject(err));
        });
    }
}

export default PostService;