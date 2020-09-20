<template>
  <div>
    <h2>{{ title }}</h2>
    <div class="field">
      <label class="label">{{ fullname }}*</label>
      <div class="control">
        <input
          v-model="contact.name"
          class="input"
          type="text"
          :placeholder="fullname"
        />
      </div>
    </div>

    <div class="field">
      <label class="label"> {{ email }}* </label>
      <div class="control">
        <input
          v-model="contact.email"
          class="input"
          type="email"
          placeholder="example@email.com"
        />
      </div>
    </div>

    <div class="field">
      <label class="label">{{ subject }}*</label>
      <div class="control">
        <input
          v-model="contact.subject"
          class="input"
          type="text"
          :placeholder="subject"
        />
      </div>
    </div>

    <div class="field">
      <label class="label"> {{ message }}* </label>
      <div class="control">
        <textarea
          v-model="contact.message"
          class="textarea"
          :placeholder="message"
        ></textarea>
      </div>
    </div>

    <div class="field is-grouped">
      <div class="control">
        <button
          class="button is-link"
          :class="{ 'is-loading': loading }"
          @click.prevent="send"
        >
          {{ submit }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: 'Form'
    },
    fullname: {
      type: String,
      default: 'Name'
    },
    email: {
      type: String,
      default: 'Email'
    },
    subject: {
      type: String,
      default: 'Subject'
    },
    message: {
      type: String,
      default: 'Message'
    },
    submit: {
      type: String,
      default: 'Submit'
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      contact: {
        name: '',
        email: '',
        subject: '',
        message: ''
      }
    }
  },
  methods: {
    send() {
      if (
        this.contact.name === '' ||
        this.contact.email === '' ||
        this.contact.subject === '' ||
        this.contact.message === ''
      ) {
        return this.$emit('error')
      }
      this.$emit('send', this.contact)
    }
  }
}
</script>

<style></style>
