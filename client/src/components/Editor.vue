<template>
  <div class="container-fluid">
    <form v-on:submit.prevent="updatePost" class="editor-form">
      <div class="edit-box container-fluid align-top" id="editor">
        <RouterLink v-bind:to="'/posts/'" class="btn btn-sm btn-outline-dark">Go back</RouterLink>
        <h1 class="text-center"> {{ md.name }} </h1>
        <hr>
        <textarea :value="md.body" @input="update" id="input" class="form-control" required></textarea>
        <div v-html="compiledMarkdown" id="md-view"></div>
        <button type="submit" class="submit-button btn btn-sm btn-outline-dark">Save</button>
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
        md: {

        }
      }
    },
    name: 'Editor',
    computed: {
      compiledMarkdown: function () {
        return marked(this.md.body, {sanitize: true})
      }
    },
    methods: {
      update: _.debounce(function (e) {
        this.md.body = e.target.value
      }, 300),

      updatePost: function () {
        let updatedPost = {
          body: this.md.body
        };

        axios.put('http://localhost:3000/posts/' + this.$route.params.id, updatedPost);
        this.$router.push({
          name: 'Posts'
        });
      }
    },
    created() {
      fetch('http://localhost:3000/posts')
        .then(data => data.json())
        .then(data => data.data.find(note => note._id === this.$route.params.id))
        .then(notes => this.md = notes);
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
</style>
