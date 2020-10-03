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
            <li class="icon">
              <a class="nav-link" href="https://t.me/infoampa" target="_blank">
                <span>
                  <font-awesome-icon
                    :icon="['fab', 'telegram']"
                  ></font-awesome-icon>
                  infoAMPA
                </span>
              </a>
            </li>
          </ul>
        </div>
        <div class="column has-text-right">
          <ul class="language-switcher">
            <li><nuxt-link :to="switchLocalePath('es')">Cas</nuxt-link></li>
            <li><nuxt-link :to="switchLocalePath('ca')">Val</nuxt-link></li>
          </ul>
        </div>
      </div>

      <div class="columns">
        <div class="column is-three-fifths">
          <img src="~assets/img/logoCEIP-sense-lletres.png" alt />

          <p>&copy; AMPA CEIP La Patacona {{ new Date().getFullYear() }}</p>
        </div>
        <div class="column has-text-right" style="align-self: flex-end">
          <h4>AMPA</h4>
          <ul class="is-size-7 is-unstyled">
            <li>
              <a
                href="https://drive.google.com/file/d/16kcSBu9FU5vi4sjz_MGy4WEeE0M7RNGK/view"
                target="_blank"
                >{{ $t('menu.estatuts') }}</a
              >
            </li>
            <li>
              <a
                href="https://drive.google.com/file/d/1wQocU2pdSq61KOQ3BBitL_YyjeOAavm-/view"
                target="_blank"
                >{{ $t('menu.reglament') }}</a
              >
            </li>
            <li>
              <a
                href="https://drive.google.com/file/d/1vjA54dc6H5VyqO0s8FVcAD0TTyuSAIli/view"
                target="_blank"
                >{{ $t('menu.pressupostos') }}</a
              >
            </li>
          </ul>
          <br />
          <p class="is-size-7"><em>hola@ampatacona.com</em></p>
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
footer p {
  margin: 0;
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
