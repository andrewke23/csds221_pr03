<template>
  <div class="container">
    <h1>Lakers Central</h1>
    <button class="toggle-btn" @click="toggleDarkMode">
      {{ isDarkMode ? '☀️ Light Mode' : '🌙 Dark Mode' }}
    </button>

    <div class="create-post">
      <label for="create-post">Say something..</label>
      <input type="text" id="create-post" v-model="text" placeholder="Create a post">
      <button v-on:click="createPost">Post!</button>
    </div>
    <hr>
    <p class="error" v-if="error">{{ error }}</p>
    <div class="posts-container">
      <div class="post"
        v-for="(post, index) in posts"
        v-bind:item="post"
        v-bind:index="index"
        v-bind:key="post._id"
        @dblclick="deletePost(post._id)"
      >
        <div class="created-at">
          {{ new Date(post.createdAt).toLocaleDateString() }}
        </div>
        <p class="text">{{ post.text }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import PostService from '@/PostService';

export default {
  name: 'PostComponent',
  data() {
    return {
      posts: [],
      error: '',
      text: '',
      isDarkMode: false,
    };
  },
  async created() {
    try {
      this.posts = (await PostService.getPosts()).reverse();
    } catch (err) {
      this.error = err.message;
    }
  },
  methods: {
    async createPost() {
      await PostService.insertPost(this.text);
      this.posts = (await PostService.getPosts()).reverse();
    },
    async deletePost(id) {
      try {
        await PostService.deletePost(id);
        this.posts = this.posts.filter(post => post._id !== id); // update local state
      } catch (err) {
        this.error = 'Failed to delete post.';
        console.error(err);
      }
    },
    toggleDarkMode() {
      this.isDarkMode = !this.isDarkMode; // Toggle dark mode
      if (this.isDarkMode) {
        document.body.classList.add('custom-dark-mode');
      } else {
        document.body.classList.remove('custom-dark-mode');
      }
    }
  }
};
</script>

<style>
/* Default light mode styles */
body {
  background-color: white;
  transition: background-color 0.3s ease;
}

.container {
  max-width: 800px;
  margin: 0 auto;
  transition: background-color 0.3s ease;
}

h1 {
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  font-size: 300%;
  color: #552583;
}

div.create-post {
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
}

.create-post input {
  padding: 10px;
  border: 2px solid #ddd;
  border-radius: 8px;
  margin-top: 5px;
  font-size: 16px;
}

.create-post button {
  margin-top: 10px;
  padding: 10px;
  background-color: #552583;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.create-post button:hover {
  background-color: #321d69;
}

/* Post container styles */
div.post {
  position: relative;
  border-radius: 10px;
  border: none;
  background: #fff;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  padding: 15px 20px;
  margin-bottom: 20px;
  transition: transform 0.2s ease;
  animation: fadeIn 0.4s ease;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

div.post:hover {
  transform: scale(1.01);
  cursor: pointer;
}

div.created-at {
  display: inline-block;
  background-color: #552583;
  color: white;
  padding: 5px 10px;
  border-radius: 20px;
  font-size: 12px;
  margin-bottom: 8px;
}

p.text {
  font-size: 22px;
  font-weight: 700;
  margin-bottom: 0;
}

p.error {
  border: 1px solid #ff5b5f;
  background-color: #ffc5c1;
  padding: 10px;
  margin-bottom: 15px;
}

/* Dark mode styles */
body.custom-dark-mode {
  background-color: #552583; /* Purple background for dark mode */
}

body.custom-dark-mode .container {
  background-color: #552583; /* Purple background for the container */
}

body.custom-dark-mode h1 {
  color: white; /* White text for the header */
}

/* Post styles in dark mode */
body.custom-dark-mode .post {
  background-color: #8c5a9b; /* Light purple background for posts */
  color: white; /* White text */
  border: none;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

body.custom-dark-mode .create-post input {
  background-color: #321d69; /* Darker input field for dark mode */
  color: white;
  border: 2px solid #8c5a9b;
}

body.custom-dark-mode .create-post button {
  background-color: white;
  color: #552583;
  border: 2px solid #552583;
}

/* Dark mode error message */
body.custom-dark-mode .error {
  background-color: #ff5b5f;
  color: white;
}

/* Dark mode button styles */
body.custom-dark-mode button {
  background-color: white;
  color: #552583;
  border: 2px solid #552583;
}

body.custom-dark-mode .toggle-btn {
  background-color: #ffffff;
  color: #552583;
  border: 2px solid #552583;
}

body.custom-dark-mode .toggle-btn:hover {
  background-color: #321d69;
  color: white;
}

.toggle-btn {
  position: absolute;
  top: 20px;
  right: 20px;
  background-color: #ffffff;
  color: #552583;
  border: 2px solid #552583;
  padding: 8px 16px;
  font-size: 14px;
  font-weight: bold;
  border-radius: 30px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
}

.toggle-btn:hover {
  background-color: #552583;
  color: white;
}
body.custom-dark-mode .create-post label {
  color: white;
}

</style>
