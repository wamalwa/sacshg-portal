<template>
  <v-app>
    <Navbar
        :actionColor="actionColor"
        :actionMessage="actionMessage"
        :role="authUser.type"
        :snackbar="snackbar"
        :userfullname="authUser.name"
    />
    <v-main class="ma-4">
      <div class="events">
        <h1 class="subheading text--gray">Feedback</h1>
        <v-container>
          <v-card>
            <v-data-table
                :headers="headers"
                :items="feedback"
                :items-per-page="100"
                :loading="loading"
                class="elevation-1"
            >
              <template #item.datecreated="{ item }">
                <v-chip color="white border-green" light small>
                  {{ item.datecreated | formatDateTime }}
                </v-chip>
              </template>
            </v-data-table>
          </v-card>
        </v-container>
      </div>
    </v-main>

  </v-app>
</template>

<script>
import Navbar from "@/components/Navbar";
import {mapGetters} from "vuex";

export default {
  name: 'Messages',
  components: {
    Navbar,
  },
  data: () => ({
    loading: true,
    headers: [
      { text: '#', value: 'id'},
      {
        text: 'Contact Name',
        align: 'start',
        sortable: true,
        value: 'name',
      },
      { text: 'Contact Email', value: 'email' },
      { text: 'Message', value: 'message' },
      { text: 'Date', value: 'datecreated' },
    ],
    authUser: {
      name: "",
    },
  }),
  computed: {
    ...mapGetters({
      authenticated: "user/AUTHENTICATED",
      feedback: "feedback/FEEDBACK",
    }),
  },
  mounted() {
    this.$store
        .dispatch("user/GET_STATE")
        .then(() => {
          this.$store.dispatch("feedback/GET_FEEDBACK").then(() => {
            this.loading = false;
          });

          if (JSON.parse(localStorage.getItem("user"))) {
            this.authUser = JSON.parse(localStorage.getItem("user"));
          } else {
            this.$router.replace({
              name: "login",
            });
          }
        })
        .catch((err) => {
          this.actionMessage = err.message + "! Please refresh this page to retry.";
          this.actionColor = "red";
          this.snackbar = true;
          this.loading = false;
        });
  },
}

</script>
