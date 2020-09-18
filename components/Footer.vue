<template>
  <footer class="footer">
    <div class="container">
      <div class="columns is-mobile">
        <div class="column">
          <ul class="social-icons">
            <li class="icon">
              <a
                href="https://www.instagram.com/ceiplapatacona/"
                target="_blank"
                class="nav-link"
              >
                <font-awesome-icon :icon="['fab', 'instagram']" />
              </a>
            </li>
            <li class="icon">
              <a
                href="https://www.facebook.com/ceiplapatacona/"
                target="_blank"
                class="nav-link"
              >
                <font-awesome-icon :icon="['fab', 'facebook']" />
              </a>
            </li>
          </ul>
        </div>
        <div class="column has-text-right">
          <ul
            v-if="
              $route.name !== 'blog-slug___es' &&
              $route.name !== 'blog-slug___ca' &&
              $route.name !== 'login___es' &&
              $route.name !== 'login___ca'
            "
            class="language-switcher"
          >
            <li><nuxt-link :to="switchLocalePath('es')">Cas</nuxt-link></li>
            <li><nuxt-link :to="switchLocalePath('ca')">Val</nuxt-link></li>
          </ul>
        </div>
      </div>

      <div class="columns">
        <div class="column is-four-fifths">
          <img src="~assets/img/logoCEIP-sense-lletres.png" alt />

          <p>&copy; AMPA CEIP La Patacona {{ new Date().getFullYear() }}</p>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  components: {}
}
</script>

<style lang="scss">
.language-switcher {
  font-size: 0.8rem;
}
.social-icons,
.language-switcher {
  padding: 0;
  margin: 0;
  list-style-type: none;
  line-height: 1;

  li {
    display: inline;

    a {
      display: inline-block;
      padding: 1.1rem 1rem 1rem 1rem;
      box-shadow: none;
    }
  }
}
</style>
