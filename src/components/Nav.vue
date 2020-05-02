<template>
  <nav class="flex items-center justify-between flex-wrap p-6 fixed">
    <div class="flex items-center flex-shrink-0 text-white mr-6">
      <g-link to="/">
        <img src="../assets/plantas_logo-01.svg" width="50" />
      </g-link>
      <span class="font-semibold text-xl tracking-tight hidden">Plantas</span>
    </div>

    <div class=" block flex-grow flex items-center w-auto">
      <div class="text-sm flex-grow">
        <g-link to="/about" class="text-red-200 hover:text-red-300 mr-4">
          About
        </g-link>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "Nav"
};
</script>
