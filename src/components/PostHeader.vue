<template>
  <header>
    <div class="pt-24">
      <div class="max-w-xl md:max-w-3xl xl:max-w-4xl mx-auto text-center px-6">
        <!-- <p class="text-gray-700 text-xs mb-2 uppercase">
          min read
        </p> -->
        <h1
          class="text-3xl sm:text-5xl leading-tight font-sans font-bold mb-2 text-black"
        >
          {{ post.title }}
        </h1>
        <p class="text-gray-700">
          <span v-if="post.author">
            <g-link
              :to="`${post.author.path}/`"
              class="text-gray-700 capitalize border-b border-transparent hover:border-gray-400 transition-colors duration-300"
              >{{ titleCase(post.author.title) }}</g-link
            >
            &bull;
          </span>
          <!-- <time :datetime="post.datetime" class="capitalize">{{
            formattedPublishDate
          }}</time> -->
        </p>
      </div>
    </div>
  </header>
</template>

<script>
import moment from "moment";
import Parallax from "vue-parallaxy";

export default {
  props: ["post"],
  components: {
    Parallax
  },
  methods: {
    titleCase(str) {
      return str
        .replace("-", " ")
        .split(" ")
        .map(s => s.charAt(0).toUpperCase() + s.substring(1))
        .join(" ");
    }
  },
  computed: {
    formattedPublishDate() {
      return moment(this.post.datetime).format("DD MMMM, YYYY");
    },
    speedFactor() {
      return this.post.fullscreen ? 0.21 : 0.37;
    }
  }
};
</script>
