<template>
  <register-form class="pa-4"
                 style="max-width: 25vw; min-width: 400px; flex-grow: 0" />
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
