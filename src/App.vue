<template>
  <v-app>
    <router-view></router-view>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  components: {
    
  },

  data: () => ({
    //
  }),
};
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Josefin+Sans:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;1,100;1,200;1,300;1,400;1,500;1,600;1,700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@400&display=swap");

$body-font-family: "Josefin Sans";
$title-font: "Josefin Sans";
$heading-font-family: "Josefin Sans";

#app,
#app .headline,
#app .overline,
.subtitle-1 {
  font-family: "Josefin Sans", 'Montserrat', Roboto, sans-serif !important;
}

.v-toolbar__title {
  font-family: "Josefin Sans", "Poppins", Roboto, sans-serif !important;
}

.v-application {
  font-family: $body-font-family, sans-serif !important;
  .title, .text-h6 {
    font-family: $title-font, sans-serif !important;
  }
}

$headings: (
    'h1': (
        'font-family': $heading-font-family,
    ),
    'h2': (
        'font-family': $heading-font-family,
    ),
    'h3': (
        'font-family': $heading-font-family,
    ),
    'h4': (
        'font-family': $heading-font-family,
    ),
    'h5': (
        'font-family': $heading-font-family,
    ),
    'h6': (
        'font-family': $heading-font-family,
    ),
);
</style>