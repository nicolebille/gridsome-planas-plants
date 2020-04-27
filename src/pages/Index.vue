<template>
  <Layout class="bg-white">
    <main>
      <div class="flex-none md:flex">
        <div class=" full h-screen50 md:w-6/12 overflow-hidden">
          <img
            src="../../src/assets/plantas_logo-01.svg"
            class="p-10 object-contain flex-auto mx-auto full h-screen50 object-contain"
          />
        </div>
        <div
          class="flex justify-center items-center full h-screen50 md:w-6/12 overflow-hidden text-center"
        >
          <h2
            class="p-10  font-mono font-black text-4xl object-contain text-green-600 "
          >
            {{ getNextDayOfTheWeek("Saturday", false, new Date(), false) }}
          </h2>
        </div>
      </div>

      <div>
        <div class="full">
          <div class="grid grid-cols-1 gap-4 md:grid md:grid-cols-3 md:gap-4">
            <div
              v-for="({ url }, index) in instagramImage"
              :key="index"
              class=""
            >
              <g-image :src="url" class="object-contain" />
            </div>
          </div>
        </div>
        <div class="container mx-auto px-4 mt-10">
          <h3
            class="font-mono font-black text-4xl object-contain text-green-600"
          >
            {{ this.$page.post.title }}
          </h3>
          <div
            :class="{ 'pb-10': $page.post.author || $page.post.tags }"
            class="markdown text-lg leading-normal text-gray-700"
            v-html="$page.post.content"
          />
        </div>
      </div>
    </main>
  </Layout>
</template>

<script>
import moment from "moment";
import config from "~/.temp/config.js";
import SiteFooter from "@/components/Footer";
import PostItem from "@/components/PostItem";
import Pagination from "@/components/Pagination";
import PostHeader from "~/components/PostHeader";

export default {
  components: {
    PostItem,
    Pagination,
    SiteFooter,
    PostHeader
  },
  data: function() {
    return {
      count: 0,
      instagramImage: ""
    };
  },
  metaInfo() {
    return {
      title: `${this.$page.post.title} ${
        this.$page.post.tag ? "- " + this.$page.post.tag.name : ""
      }`,
      meta: [
        {
          key: "description",
          name: "description",
          content: this.description(this.$page.post)
        },

        { property: "og:type", content: "article" },
        { property: "og:title", content: this.$page.post.title },
        {
          property: "og:description",
          content: this.description(this.$page.post)
        },
        { property: "og:url", content: this.postUrl },
        {
          property: "article:published_time",
          content: moment(this.$page.post.date).format("YYYY-MM-DD")
        },
        { property: "og:image", content: this.ogImageUrl },

        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: this.$page.post.title },
        {
          name: "twitter:description",
          content: this.description(this.$page.post)
        },
        { name: "twitter:site", content: "@cossssmin" },
        { name: "twitter:creator", content: "@cossssmin" },
        { name: "twitter:image", content: this.ogImageUrl }
      ]
    };
  },
  methods: {
    instaImage() {
      this.instagramImage = this.$page.allInstagramPhoto.edges
        .reverse()
        .map((value, index) => {
          return { url: value.node.display_url };
        });
    },
    getNextDayOfTheWeek(dayName, excludeToday, refDate, cancel) {
      const dayOfWeek = [
        "sun",
        "mon",
        "tue",
        "wed",
        "thu",
        "fri",
        "sat"
      ].indexOf(dayName.slice(0, 3).toLowerCase());
      if (dayOfWeek < 0) return;
      refDate.setHours(0, 0, 0, 0);
      refDate.setDate(
        refDate.getDate() +
          !!excludeToday +
          ((dayOfWeek + 7 - refDate.getDay() - !!excludeToday) % 7)
      );
      const dtf = new Intl.DateTimeFormat("en", {
        year: "numeric",
        month: "short",
        day: "2-digit"
      });
      const [
        { value: mo },
        ,
        { value: da },
        ,
        { value: ye }
      ] = dtf.formatToParts(refDate);
      const next = cancel
        ? `Plantas is closed ! Sorry !`
        : `Next Plantas is ${mo} ${da} ${ye}`;
      return next;
    },
    imageLoadError(e) {
      e.target.src = `/images/authors/default.png`;
    },
    description(post, length, clamp) {
      if (post.description) {
        return post.description;
      }

      length = length || 280;
      clamp = clamp || " ...";
      let text = post.content
        .replace(/<pre(.|\n)*?<\/pre>/gm, "")
        .replace(/<[^>]+>/gm, "");

      return text.length > length ? `${text.slice(0, length)}${clamp}` : text;
    },
    titleCase(str) {
      return str
        .replace("-", " ")
        .split(" ")
        .map(s => s.charAt(0).toUpperCase() + s.substring(1))
        .join(" ");
    }
  },
  computed: {
    config() {
      return config;
    },
    ogImageUrl() {
      return (
        this.$page.post.cover || `${this.config.siteUrl}/images/bleda-card.png`
      );
    }
  },
  mounted() {
    this.instaImage();
  }
};
</script>

<style scoped>
.circle {
  max-width: 400px;
  max-height: 400px;
}
</style>

<page-query>
query {
  post (path: "/about") {
      title
      path
      slug
      datetime: date (format: "YYYY-MM-DD HH:mm:ss")
      content
      description
      timeToRead
      cover
      fullscreen
      schedule
      author {
        id
        title
        path
      }
      tags {
        id
        title
        path
    }
  }
  allInstagramPhoto {
    edges {
      node {
        display_url
        edge_media_to_caption {
          edges {
            node {
              text
            }
          }
        }
      }
    }
  }
}
</page-query>

/* <page-query>
  query Home ($page: Int) {
    posts: allPost (page: $page, perPage: 6) @paginate {
      totalCount
      pageInfo {
        totalPages
        currentPage
      }
      edges {
        node {
          id
          title
          timeToRead
          datetime: date (format: "YYYY-MM-DD HH:mm:ss")
          content
          excerpt
          description
          path
          cover
          tags {
            id
            title
            path
          }
          author {
            id
            title
            path
          }
        }
      }
    }
  }
</page-query> */

<static-query>
query {
  metadata {
    siteName
    siteUrl
    siteDescription
  }
}
</static-query>
