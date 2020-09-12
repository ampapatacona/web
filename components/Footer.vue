<template>
  <footer class="footer">
    <Container flex style="align-items: baseline">
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
      <ul class="language-switcher">
        <li><nuxt-link :to="switchLocalePath('es')">Castellano</nuxt-link></li>
        <li><nuxt-link :to="switchLocalePath('ca')">Valencià</nuxt-link></li>
      </ul>
    </Container>
    <Container flex>
      &copy; AMPA CEIP La Patacona {{ new Date().getFullYear() }}
    </Container>
  </footer>
</template>

<script>
import Container from '~/components/Container'

export default {
  components: {
    Container,
  },
}
</script>

<style lang="scss">
.footer {
  padding: 2rem 0;

  @media (max-width: 567px) {
    padding: 1.2rem 0;
  }
}
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
