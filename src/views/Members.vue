<template>
  <v-app>
    <Navbar
      :userfullname="authUser.name"
      :snackbar="snackbar"
      :actionColor="actionColor"
      :actionMessage="actionMessage"
      :role="authUser.type"
    />
    <v-main class="ma-4">
      <div class="events">
        <h1 class="subheading text--gray">
          Members
          <v-btn outlined color="primary" link to="register" target="_blank">
            <v-icon left>mdi-open-in-new</v-icon>
            Register Member
          </v-btn>
        </h1>

        <v-container class="my-5">
          <v-dialog v-model="loading" hide-overlay persistent width="300">
            <v-card color="cyan" dark>
              <v-card-text>
                Please stand by
                <v-progress-linear
                  indeterminate
                  color="white"
                  class="mb-0"
                ></v-progress-linear>
              </v-card-text>
            </v-card>
          </v-dialog>

          <v-card>
            <v-toolbar color="cyan" dense dark flat>
              <template>
                <v-tabs v-model="tab" align-with-title>
                  <v-tabs-slider color="yellow"></v-tabs-slider>

                  <v-tab>Management</v-tab>
                  <v-tab>Operations</v-tab>
                  <v-tab>Review</v-tab>
                  <v-tab>Rejected</v-tab>
                  <v-tab>Approved</v-tab>
                </v-tabs>
              </template>
            </v-toolbar>

            <v-tabs-items v-model="tab">
              <v-tab-item>
                <v-card flat>
                  <v-card-text>
                    <v-data-table
                      :headers="headers"
                      :items="members.management"
                      :search="searchManagement"
                      dense
                    >
                      <template #item.full_name="{ item }"
                        >{{ item.salutation }} {{ item.surname }},
                        {{ item.first_name }} {{ item.other_names }}</template
                      >

                      <template #item.actions="{ item }">
                        <v-icon
                          small
                          class="mr-2"
                          @click="editItem(item)"
                          color="primary"
                        >
                          mdi-eye
                        </v-icon>
                      </template>

                      <template #item.status="{ item }">
                        <v-chip
                          :color="
                            item.mgmt_action === 'pending'
                              ? 'deep-orange darken-1'
                              : 'green lighten-3'
                          "
                          dark
                          small
                        >
                          {{
                            item.mgmt_action === "pending"
                              ? "Pending"
                              : item.mgmt_action === "approve"
                              ? "approved"
                              : "Unknown"
                          }}
                        </v-chip>
                      </template>
                    </v-data-table>
                  </v-card-text>
                </v-card>
              </v-tab-item>
              <v-tab-item>
                <v-card flat>
                  <v-card-text>
                    <v-data-table
                      :headers="headers"
                      :items="members.operations"
                      :search="searchOperations"
                      dense
                    >
                      <template #item.full_name="{ item }"
                        >{{ item.salutation }} {{ item.surname }},
                        {{ item.first_name }} {{ item.other_names }}</template
                      >

                      <template #item.actions="{ item }">
                        <v-icon
                          small
                          class="mr-2"
                          @click="editItem(item)"
                          color="primary"
                        >
                          mdi-eye
                        </v-icon>
                      </template>

                      <template #item.status="{ item }">
                        <v-chip
                          :color="
                            item.mgmt_action === 'pending'
                              ? 'deep-orange darken-1'
                              : 'green lighten-3'
                          "
                          dark
                          small
                        >
                          {{
                            item.mgmt_action === "pending"
                              ? "Pending"
                              : item.mgmt_action === "approve"
                              ? "approved"
                              : "Unknown"
                          }}
                        </v-chip>
                      </template>
                    </v-data-table>
                  </v-card-text>
                </v-card>
              </v-tab-item>
              <v-tab-item>
                <v-card flat>
                  <v-card-text>
                    <v-data-table
                      :headers="headers"
                      :items="members.review"
                      :search="searchReview"
                      dense
                    >
                      <template #item.full_name="{ item }"
                        >{{ item.salutation }} {{ item.surname }},
                        {{ item.first_name }} {{ item.other_names }}</template
                      >

                      <template #item.actions="{ item }">
                        <v-icon
                          small
                          class="mr-2"
                          @click="editItem(item)"
                          color="primary"
                        >
                          mdi-eye
                        </v-icon>
                      </template>

                      <template #item.status="{ item }">
                        <v-chip
                          :color="
                            item.mgmt_action === 'pending'
                              ? 'deep-orange darken-1'
                              : 'green lighten-3'
                          "
                          dark
                          small
                        >
                          {{
                            item.mgmt_action === "pending"
                              ? "Pending"
                              : item.mgmt_action === "approve"
                              ? "approved"
                              : "Unknown"
                          }}
                        </v-chip>
                      </template>
                    </v-data-table>
                  </v-card-text>
                </v-card>
              </v-tab-item>
              <v-tab-item>
                <v-card flat>
                  <v-card-text>
                    <v-data-table
                      :headers="headers"
                      :items="members.rejected"
                      :search="searchRejected"
                      dense
                    >
                      <template #item.full_name="{ item }"
                        >{{ item.salutation }} {{ item.surname }},
                        {{ item.first_name }} {{ item.other_names }}</template
                      >

                      <template #item.actions="{ item }">
                        <v-icon
                          small
                          class="mr-2"
                          @click="editItem(item)"
                          color="primary"
                        >
                          mdi-eye
                        </v-icon>
                      </template>

                      <template #item.status="{ item }">
                        <v-chip
                          :color="
                            item.mgmt_action === 'pending'
                              ? 'deep-orange darken-1'
                              : 'green lighten-3'
                          "
                          dark
                          small
                        >
                          {{
                            item.mgmt_action === "pending"
                              ? "Pending"
                              : item.mgmt_action === "approve"
                              ? "approved"
                              : "Unknown"
                          }}
                        </v-chip>
                      </template>
                    </v-data-table>
                  </v-card-text>
                </v-card>
              </v-tab-item>
              <v-tab-item>
                <v-card flat>
                  <v-card-text>
                    <v-data-table
                      :headers="headers"
                      :items="members.approved"
                      :search="searchApproved"
                      dense
                    >
                      <template #item.full_name="{ item }"
                        >{{ item.salutation }} {{ item.surname }},
                        {{ item.first_name }} {{ item.other_names }}</template
                      >

                      <template #item.actions="{ item }">
                        <v-icon
                          small
                          class="mr-2"
                          @click="editItem(item)"
                          color="primary"
                        >
                          mdi-eye
                        </v-icon>
                      </template>

                      <template #item.status="{ item }">
                        <v-chip
                          :color="
                            item.mgmt_action === 'pending'
                              ? 'deep-orange darken-1'
                              : 'green lighten-3'
                          "
                          dark
                          small
                        >
                          {{
                            item.mgmt_action === "pending"
                              ? "Pending"
                              : item.mgmt_action === "approve"
                              ? "approved"
                              : "Unknown"
                          }}
                        </v-chip>
                      </template>
                    </v-data-table>
                  </v-card-text>
                </v-card>
              </v-tab-item>
            </v-tabs-items>
          </v-card>
        </v-container>
      </div>
    </v-main>
  </v-app>
</template>

<script>
import Navbar from "@/components/Navbar";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Members",
  components: {
    Navbar,
  },

  data: () => ({
    tab: null,
    items: ["web", "shopping", "videos", "images", "news"],
    searchManagement: "",
    searchOperations: "",
    searchReview: "",
    searchRejected: "",
    searchApproved: "",
    headers: [
      {
        text: "Name",
        align: "start",
        value: "full_name",
      },
      { text: "Phone Number", value: "phone_number" },
      { text: "Address", value: "address" },
      { text: "Religion", value: "religion" },
      { text: "Status", value: "status" },
      { text: "Actions", value: "actions", align: "center" },
    ],
    saving: false,
    disabled: false,
    loading: true,
    dialog: false,
    modal: false,
    modal2: false,
    actionColor: "black",
    actionMessage: "",
    snackbar: false,
    authUser: {
      name: "",
    },
  }),

  computed: {
    ...mapGetters({
      members: "member/MEMBERS",
      authenticated: "user/AUTHENTICATED",
    }),
  },

  methods: {
    editItem(item) {
      this.$router.push("member/" + item.id);
    },

    ...mapActions({
      addEvent: "event/SAVE_EVENT",
    }),
    saveEvent() {
      this.saving = true;

      this.addEvent(this.newevent)
        .then(() => {
          this.actionMessage =
            "You have successfully added the event " + this.newevent.name;
          this.actionColor = "success";
          this.snackbar = true;
          this.newevent = {
            id: null,
            event_date: "",
            event_time: "",
            name: "",
            venue: "",
            description: "",
            main_image_url: "",
          };
          this.saving = false;
          this.dialog = false;

          setTimeout(() => {
            this.actionMessage = "";
            this.actionColor = "black";
            this.snackbar = false;
          }, 4000);
        })
        .catch((err) => {
          console.log(err);
          this.actionMessage =
            "An error occured when event " + this.newevent.name;
          this.actionColor = "red";
          this.snackbar = true;
          this.newevent = {
            id: null,
            event_date: "",
            event_time: "",
            name: "",
            venue: "",
            description: "",
            main_image_url: "",
          };
          this.saving = false;
          this.dialog = false;

          setTimeout(() => {
            this.actionMessage = "";
            this.actionColor = "black";
            this.snackbar = false;
          }, 4000);
        });
    },
    amOrPm(tm) {
      var hr = tm.split(":")[0];
      var min = tm.split(":")[1];

      if (hr >= 0 && hr <= 24 && min >= 0 && min <= 60) {
        let postF = "AM";
        if (hr > 12) postF = "PM";
        hr = hr % 12;
        return hr + ":" + min + " " + postF;
      }
    },
    ordinalDay(n) {
      var s = ["TH", "ST", "ND", "RD"],
        v = n % 100;
      return String(n).padStart(2, "0") + (s[(v - 20) % 10] || s[v] || s[0]);
    },
  },

  mounted() {
    this.$store
      .dispatch("user/GET_STATE")
      .then(() => {
        this.$store.dispatch("member/GET_MEMBERS").then(() => {
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

        setTimeout(() => {
          this.actionMessage = "";
          this.actionColor = "black";
          this.snackbar = false;
        }, 4000);
      });
  },
};
</script>
