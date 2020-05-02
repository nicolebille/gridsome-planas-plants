import DefaultLayout from '~/layouts/Default.vue';

export default function(Vue, { head }) {
  Vue.component('Layout', DefaultLayout);

  head.htmlAttrs = { lang: 'en', class: 'h-full' };
  head.bodyAttrs = { class: 'antialiased' };

  head.link.push({
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;700;900&display=swap'
  });
}
