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
        // Log the ID before cleaning to make sure we understand the problem
        console.log('Original ID before cleaning:', id);
    
        const cleanId = id.replace(/^\/+/, ''); // Remove leading slashes
        console.log('Cleaned ID:', cleanId);
    
        const fullUrl = `${url}/${cleanId}`;
        console.log('Full delete URL:', fullUrl); // Log full URL for the delete request
    
        return axios.delete(fullUrl);  // Make the actual delete request
    }

    // Update Post
    static updatePost(id, text) {
        return new Promise((resolve, reject) => {
          axios
            .put(`${url}/${id}`, { text })
            .then(res => resolve(res.data))
            .catch(err => reject(err));
        });
    }
}

export default PostService;