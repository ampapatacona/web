<template>
  <nav class="navbar has-shadow" role="navigation" aria-label="main navigation">
    <div class="container">
      <div class="navbar-brand">
        <nuxt-link :to="localePath('/')" class="navbar-item">AMPA</nuxt-link>

        <a
          role="button"
          class="navbar-burger burger"
          :class="{ 'is-active': isActive }"
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarBasicExample"
          @click="toogleIsActive"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div
        id="navbarBasicExample"
        class="navbar-menu"
        :class="{ 'is-active': isActive }"
      >
        <div class="navbar-start">
          <div class="navbar-item has-dropdown is-hoverable">
            <a class="navbar-link">
              {{ $t('menu.nosaltres') }}
            </a>

            <div class="navbar-dropdown">
              <nuxt-link :to="localePath('/quisom')" class="navbar-item">{{
                $t('menu.quiSom')
              }}</nuxt-link>
              <nuxt-link :to="localePath('/quefem')" class="navbar-item">{{
                $t('menu.queFem')
              }}</nuxt-link>
              <hr class="navbar-divider" />
              <nuxt-link
                :to="localePath('/pressupostos')"
                class="navbar-item"
                >{{ $t('menu.pressupostos') }}</nuxt-link
              >
            </div>
          </div>
          <nuxt-link :to="localePath('/infoampa')" class="navbar-item"
            >infoAMPA</nuxt-link
          >
          <nuxt-link :to="localePath('/contacte')" class="navbar-item">{{
            $t('menu.contacte')
          }}</nuxt-link>
        </div>

        <div class="navbar-end">
          <div v-if="!$store.state.token" class="navbar-item">
            <div class="buttons">
              <nuxt-link disabled to="#" class="button is-primary">{{
                $t('menu.alta')
              }}</nuxt-link>
              <nuxt-link disabled to="#" class="button is-primary is-light">{{
                $t('menu.areaSocis')
              }}</nuxt-link>
            </div>
          </div>

          <div v-else class="navbar-item">
            <div class="buttons">
              <button
                class="button is-primary"
                @click="$store.dispatch('LOGOUT')"
              >
                {{ $t('menu.logout') }}
              </button>
              <nuxt-link
                :to="localePath('/app')"
                class="button is-primary is-light"
                >{{ $t('menu.areaSocis') }}</nuxt-link
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>
<script>
export default {
  data() {
    return {
      isActive: false
    }
  },
  watch: {
    $route() {
      this.isActive = false
    }
  },
  methods: {
    toogleIsActive() {
      this.isActive = !this.isActive
    }
  }
}
</script>

<style lang="scss" scoped></style>
