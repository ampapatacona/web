<template>
  <main>
    <custom-container>
      <h1>{{ $t('areaSocis.title') }}</h1>
      <p>{{ $t('construccio') }}</p>
      <profile-container :user="members[0]"></profile-container>
    </custom-container>
  </main>
</template>

<script>
import CustomContainer from '~/components/CustomContainer'
import ProfileContainer from '~/components/ProfileContainer'
import currentUser from '~/queries/currentUser.gql'

export default {
  name: 'AppIndex',
  components: {
    CustomContainer,
    ProfileContainer
  },
  data() {
    return {
      members: []
    }
  },
  middleware: 'auth',
  apollo: {
    members: {
      query: currentUser
    }
  }
}
</script>

<style></style>
