<template>
  <main>
    <custom-container>
      <h1>{{ $t('contacte.title') }}</h1>
      <p>{{ $t('contacte.contingut', { correu: 'hola@ampatacona.com' }) }}</p>
      <formulari-contacte
        v-if="show"
        :title="$t('contacte.formulari.title')"
        :fullname="$t('contacte.formulari.fullname')"
        :email="$t('contacte.formulari.email')"
        :subject="$t('contacte.formulari.subject')"
        :message="$t('contacte.formulari.message')"
        :submit="$t('contacte.formulari.submit')"
        :loading="loading"
        @send="send"
        @error="formError"
      />
      <custom-modal
        :title="modal.title"
        :message="modal.message"
        :active="modal.active"
        @close="modal.active = false"
      />
    </custom-container>
  </main>
</template>

<script>
import CustomContainer from '~/components/CustomContainer'
import FormulariContacte from '~/components/FormulariContacte'
import CustomModal from '~/components/CustomModal'

export default {
  components: {
    CustomContainer,
    FormulariContacte,
    CustomModal
  },
  data() {
    return {
      show: true,
      loading: false,
      modal: {
        title: 'Error',
        message: 'error',
        active: false
      }
    }
  },
  methods: {
    async send(e) {
      this.loading = true
      const form = JSON.parse(JSON.stringify(e))
      // console.log('form', form)
      const response = await this.$axios.$post('/contact', form)
      // console.log('response', response)

      if (response.success) {
        this.show = false
        this.modal.title = this.$t('contacte.formulari.modal.success.title')
        this.modal.message = this.$t('contacte.formulari.modal.success.message')
        this.modal.active = true
        this.loading = false
      } else {
        this.modal.active = true
        this.loading = false
      }
    },
    formError() {
      this.modal.title = this.$t('contacte.formulari.modal.error.title')
      this.modal.message = this.$t('contacte.formulari.modal.error.message')
      this.modal.active = true
      this.loading = false
    }
  }
}
</script>

<style></style>
