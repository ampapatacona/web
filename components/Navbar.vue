<template>
  <nav class="navbar has-shadow" role="navigation" aria-label="main navigation">
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
          <a class="navbar-link"> {{ $t('menu.nosaltres') }} </a>

          <div class="navbar-dropdown">
            <a class="navbar-item"> {{ $t('menu.quiSom') }} </a>
            <a class="navbar-item"> Jobs </a>
            <a class="navbar-item"> Contact </a>
            <hr class="navbar-divider" />
            <a class="navbar-item"> Report an issue </a>
          </div>
        </div>
        <nuxt-link to="/contacte" class="navbar-item">{{
          $t('menu.contacte')
        }}</nuxt-link>
      </div>

      <div class="navbar-end">
        <div class="navbar-item">
          <div class="buttons">
            <nuxt-link to="/alta" class="button is-primary">{{
              $t('menu.alta')
            }}</nuxt-link>
          </div>
        </div>
      </div>
    </div>
  </nav>
  <!-- <nav class="navbar" role="navigation">
    <div class="navbar-inner">
      <div class="brand">
        <nuxt-link to="/" class="nav-link">AMPA</nuxt-link>
      </div>
      <ul class="menu-items">
        <li>
          <nuxt-link to="/alta" class="nav-link">{{
            $t('menu.alta')
          }}</nuxt-link>
        </li>
        <li>
          <nuxt-link to="/contacte" class="nav-link">{{
            $t('menu.contacte')
          }}</nuxt-link>
        </li>
      </ul>
    </div>
  </nav> -->
</template>
<script>
export default {
  data() {
    return {
      isActive: false,
    }
  },
  methods: {
    toogleIsActive() {
      this.isActive = !this.isActive
    },
  },
}
</script>

<style lang="scss" scoped>
// .navbar {
//   width: 100%;
//   font-family: 'Rubik', sans-serif;

//   .navbar-inner {
//     display: flex;
//     flex-direction: row;
//     justify-content: space-between;
//     max-width: 1200px;
//     margin: 0 auto;
//     align-items: center;

//     .brand {
//       display: block;
//       font-weight: 700;
//       text-align: left;

//       img {
//         height: 24px;
//         display: block;
//       }

//       a {
//         padding: 1rem;
//         display: block;
//         box-shadow: none;
//       }
//     }

//     .menu-items {
//       padding: 0;
//       margin: 0;
//       list-style-type: none;
//       line-height: 1;

//       li {
//         display: inline;

//         a {
//           display: inline-block;
//           padding: 1.1rem 1rem 1rem 1rem;
//           box-shadow: none;
//         }
//       }
//     }
//   }
// }
</style>
