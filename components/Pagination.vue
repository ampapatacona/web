<template>
  <ul v-if="totalPages > 1" class="pagination">
    <li class="pagination-item">
      <button
        class="button is-small"
        type="button is-small"
        :disabled="isInFirstPage"
        @click="onClickFirstPage"
      >
        {{ $t('pagination.first') }}
      </button>
    </li>

    <li class="pagination-item">
      <button
        class="button is-small"
        type="button is-small"
        :disabled="isInFirstPage"
        @click="onClickPreviousPage"
      >
        {{ $t('pagination.previous') }}
      </button>
    </li>

    <li v-for="(page, index) in pages" :key="index" class="pagination-item">
      <button
        class="button is-small"
        type="button is-small"
        :disabled="page.isDisabled"
        :class="{ 'is-primary': isPageActive(page.name) }"
        @click="onClickPage(page.name)"
      >
        {{ page.name }}
      </button>
    </li>

    <li class="pagination-item">
      <button
        class="button is-small"
        type="button is-small"
        :disabled="isInLastPage"
        @click="onClickNextPage"
      >
        {{ $t('pagination.next') }}
      </button>
    </li>

    <li class="pagination-item">
      <button
        class="button is-small"
        type="button is-small"
        :disabled="isInLastPage"
        @click="onClickLastPage"
      >
        {{ $t('pagination.last') }}
      </button>
    </li>
  </ul>
</template>
<script>
export default {
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
    currentPage: {
      type: Number,
      required: true
    }
  },
  computed: {
    startPage() {
      // When on the first page
      if (this.currentPage === 1) {
        return 1
      }
      // When on the last page
      if (
        this.currentPage === this.totalPages &&
        this.totalPages > this.maxVisibleButtons
      ) {
        return this.totalPages - this.maxVisibleButtons
      }
      // When in between
      return this.currentPage - 1
    },
    pages() {
      const range = []

      for (
        let i = this.startPage;
        i <=
        Math.min(this.startPage + this.maxVisibleButtons - 1, this.totalPages);
        i += 1
      ) {
        range.push({
          name: i,
          isDisabled: i === this.currentPage
        })
      }

      return range
    },
    isInFirstPage() {
      return this.currentPage === 1
    },
    isInLastPage() {
      return this.currentPage === this.totalPages
    }
  },
  methods: {
    onClickFirstPage() {
      this.$emit('pagechanged', 1)
    },
    onClickPreviousPage() {
      this.$emit('pagechanged', this.currentPage - 1)
    },
    onClickPage(page) {
      this.$emit('pagechanged', page)
    },
    onClickNextPage() {
      this.$emit('pagechanged', this.currentPage + 1)
    },
    onClickLastPage() {
      this.$emit('pagechanged', this.totalPages)
    },
    isPageActive(page) {
      return this.currentPage === page
    }
  }
}
</script>

<style>
.pagination {
  list-style-type: none;
}

.pagination-item {
  display: inline-block;
}

.active {
  background-color: #4aae9b;
  color: #ffffff;
}
</style>
