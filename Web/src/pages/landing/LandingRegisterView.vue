<template>
  <register-form />
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import RegisterForm from "@/components/app/RegisterForm.vue";

@Component({
  components: {
    RegisterForm,
  },
})
export default class LandingRegisterView extends Vue {
}
</script>
