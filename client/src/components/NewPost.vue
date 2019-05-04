<template>
  <div class="container-fluid">
    <form v-on:submit.prevent="submitPost" class="editor-form">
      <div class="edit-box container-fluid align-top" id="editor">
        <RouterLink v-bind:to="'/posts/'" class="btn btn-sm btn-outline-dark">Go back</RouterLink>
        <div class="input-group">
          <div class="input-group-prepend">
            <span class="input-group-text">Title</span>
          </div>
          <input v-model="name" id="name" required/>
        </div>
        <hr>
        <textarea v-model="body" @input="update" id="input" class="form-control" required></textarea>
        <div v-html="compiledMarkdown" id="md-view"></div>
        <button type="submit" class="submit-button btn btn-sm btn-outline-dark">Submit md post</button>
      </div>
    </form>
  </div>
</template>

<script>
  import marked from 'marked'
  import _ from 'lodash'
  import axios from 'axios'

  export default {
    data() {
      return {
        md: {},
        name: '',
        body: ''
      }
    },
    name: 'NewPost',
    computed: {
      compiledMarkdown: function () {
        return marked(this.body, {sanitize: true})
      }
    },
    methods: {
      update: _.debounce(function (e) {
        this.body = e.target.value
      }, 300),

      submitPost: function () {
        let postName = {
          name: this.name,
          body: this.body
        };

        axios.post('http://localhost:3000/posts', postName);
        this.$router.push({
          name: 'Posts'
        });
      }
    }
  }
</script>

<style scoped>
  textarea, #md-view {
    display: inline-block;
    min-height: 300px;
    width: 49%;
    height: 100%;
    vertical-align: top;
  }

  textarea {
    resize: none;
  }

  #md-view {
    background-color: #f6f6f6;
  }

  .btn {
    margin-top: 20px;
  }

  .input-group {
    margin-bottom: 20px;
    margin-top: 20px;
  }
</style>
