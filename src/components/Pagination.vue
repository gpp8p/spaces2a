<template>
  <ul class="pagination">
    <li class="pagination-item" v-if="!isInFirstPage">
      <button
          type="button"
          @click="onClickFirstPage"
          :disabled="isInFirstPage"
      >
        First
      </button>
    </li>

    <li class="pagination-item" v-if="!isInFirstPage">
      <button
          type="button"
          @click="onClickPreviousPage"
          :disabled="isInFirstPage"
      >
        Previous
      </button>
    </li>

    <!-- Visible Buttons Start -->

    <li
        v-for="page in pages"
        :key="page.name"
        class="pagination-item"
    >
      <button
          type="button"
          @click="onClickPage(page.name)"
          :disabled="page.isDisabled"
          :class="{ active: isPageActive(page.name) }"
      >
        {{ page.name }}
      </button>
    </li>

    <!-- Visible Buttons End -->

    <li class="pagination-item">
      <button
          type="button"
          @click="onClickNextPage"
          :disabled="isInLastPage"
      >
        Next
      </button>
    </li>

    <li class="pagination-item">
      <button
          type="button"
          @click="onClickLastPage"
          :disabled="isInLastPage"
      >
        Last
      </button>
    </li>
  </ul>
</template>

<script>
import utils from '../components/utils.vue';
export default {
name: "Pagination",
  mixins: [utils],
  props: {
    maxVisibleButtons: {
      type: Number,
      required: false,
      default: 3
    },
    totalPages: {
      type: Number,
      required: true

    },
    perPage: {
      type: Number,
      required: true
    },
    currentPage: {
      type: Number,
      required: true,
    }
  },
  computed: {
    isInFirstPage() {
      return this.currentPage === 1;
    },
    isInLastPage() {
      return this.currentPage === this.totalPages;
    },
    startPage() {
      // When on the first page
      if (this.currentPage === 1) {
        return 1;
      }

      // When on the last page
      if (this.currentPage === this.totalPages) {
        return this.totalPages - this.maxVisibleButtons;
      }

      // When inbetween
//      return this.currentPage - 1;
      return this.currentPage;
    },
    pages() {
      const range = [];

      for (
          let i = this.startPage;
          i <= Math.min(this.startPage + this.maxVisibleButtons - 1, this.totalPages);
          i++
      ) {
        range.push({
          name: i,
          isDisabled: i === this.currentPage
        });
      }

      return range;
    },
  },
  methods: {
    isPageActive(page) {
      return this.currentPage === page;
//      return this.currentPage === page+1;

    },
    onClickFirstPage() {
      this.$emit('cevt',['firstPage']);
//      this.$emit('pagechanged', 1);
    },
    onClickPreviousPage() {
      this.$emit('cevt',['previousPage', this.currentPage - 1]);
//      this.$emit('pagechanged', this.currentPage - 1);
    },
    onClickPage(page) {
      console.log('onClickPage-', page);
      this.$emit('cevt',['page', page]);
//      this.$emit('pagechanged', page);
    },
    onClickNextPage() {
//      this.$emit('pagechanged', this.currentPage + 1);
      debugger;
      this.$emit('cevt',['nextPage', this.currentPage + 1]);
    },
    onClickLastPage() {
      this.$emit('pagechanged', this.totalPages);
      this.$emit('cevt',['lastPage', this.totalPages]);
    }
  }
}
</script>

<style scoped>
.pagination {
  list-style-type: none;
}

.pagination-item {
  display: inline-block;
}

.active {
  background-color: #4AAE9B;
  color: #ffffff;
}
</style>
