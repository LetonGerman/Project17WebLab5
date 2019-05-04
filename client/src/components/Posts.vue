<template>
  <div class="posts container">
    <div v-for="(post, index) in posts" v-bind:key="post._id" class="md-list">
      <p> {{ post.name }} </p>
      <RouterLink v-bind:to="'/editor/' + post._id" class="btn btn-sm btn-outline-dark">View/Edit</RouterLink>
      <button v-bind:id="post._id" v-on:click="deletePost(post._id, index)" class="btn btn-sm btn-outline-dark">Delete</button>
      <hr>
    </div>
    <div class="row d-flex justify-content-center">
      <RouterLink v-bind:to="'/editor/'" class="btn btn-lg btn-outline-dark">Create</RouterLink>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'

  export default {
    name: 'posts',
    data() {
      return {
        posts: {
        }
      }
    },
    created() {
      fetch('http://localhost:3000/posts')
        .then(data => data.json())
        .then(notes => this.posts = notes.data);
    },
    methods: {
      deletePost: function (id, index) {
        this.posts.splice(index, 1);
        axios.delete('http://localhost:3000/posts/' + id);
      },
      getData: function(){
        fetch('http://localhost:3000/posts')
          .then(data => data.json())
          .then(notes => this.posts = notes.data);
      }
    },
    mounted() {
      let that = this;
      setTimeout(() => {that.getData()}, 600);
    }
  }
</script>

<style scoped>
  .md-list {
    width: 100%;
    text-align: center;
    vertical-align: center;
  }

  p {
    font-size: 20px;
    font-family: Helvetica;
  }
</style>
