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
          Events
          <v-btn outlined color="primary" @click="dialog = true">
            <v-icon left>mdi-plus</v-icon>
            Add Event
          </v-btn>
        </h1>

        <v-dialog v-model="deleteDialog" persistent max-width="400px">
          <v-card outlined>
            <v-card-text class="error--text my-5"
              >Delete
              <b>{{ deleteIndex > -1 ? events[deleteIndex].name : "" }}</b
              >?<br /><small
                >This activity cannot be undone once you click 'Delete'
                below.</small
              ></v-card-text
            >
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="success"
                text
                small
                @click="cancelDelete"
                v-if="!deleting"
              >
                <v-icon left>mdi-close</v-icon> Cancel</v-btn
              >
              <v-btn
                color="error ml-3"
                text
                small
                @click="confirmDelete"
                :loading="deleting"
              >
                <v-icon left>mdi-delete</v-icon> Delete</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-dialog>

        <v-dialog
          v-model="dialog"
          transition="dialog-bottom-transition"
          scrollable
          max-width="1024px"
          persistent
        >
          <v-card tile>
            <v-toolbar
              flat
              dense
              dark
              color="cyan"
              src="https://api.staugustineshg.org/api/v2/files/bg2.png"
            >
              <v-btn
                icon
                dark
                @click="
                  dialog = false;
                  clearForm();
                "
              >
                <v-icon>mdi-close</v-icon>
              </v-btn>
              <v-toolbar-title>Add Event</v-toolbar-title>
            </v-toolbar>
            <v-card-text>
              <v-container>
                <v-row class="mt-4">
                  <v-col cols="12">
                    <v-text-field
                      v-model="newevent.name"
                      label="Event Name*"
                      outlined
                      dense
                      prepend-icon="mdi-calendar"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-textarea
                      v-model="newevent.description"
                      label="Event Description*"
                      hint="A few lines about the event"
                      outlined
                      prepend-icon="mdi-semantic-web"
                    ></v-textarea>
                  </v-col>
                  <v-col cols="12" md="5">
                    <v-text-field
                      v-model="newevent.venue"
                      label="Venue*"
                      outlined
                      dense
                      prepend-icon="mdi-map-marker"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="4">
                    <v-dialog
                      ref="dialog"
                      v-model="modal"
                      :return-value.sync="newevent.event_date"
                      persistent
                      width="290px"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          v-model="newevent.event_date"
                          label="Event Date*"
                          prepend-icon="mdi-calendar-range"
                          outlined
                          dense
                          readonly
                          v-bind="attrs"
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker v-model="newevent.event_date" scrollable>
                        <v-spacer></v-spacer>
                        <v-btn text color="cyan" @click="modal = false">
                          Cancel
                        </v-btn>
                        <v-btn
                          text
                          color="cyan"
                          @click="$refs.dialog.save(newevent.event_date)"
                        >
                          OK
                        </v-btn>
                      </v-date-picker>
                    </v-dialog>
                  </v-col>
                  <v-col cols="12" md="3">
                    <v-dialog
                      ref="dialog2"
                      v-model="modal2"
                      :return-value.sync="newevent.event_time"
                      persistent
                      width="290px"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          v-model="newevent.event_time"
                          label="Time*"
                          outlined
                          dense
                          prepend-icon="mdi-calendar-clock"
                          required
                          readonly
                          v-bind="attrs"
                          v-on="on"
                        >
                        </v-text-field>
                      </template>
                      <v-time-picker
                        v-if="modal2"
                        v-model="newevent.event_time"
                        full-width
                      >
                        <v-spacer></v-spacer>
                        <v-btn text color="cyan" @click="modal2 = false">
                          Cancel
                        </v-btn>
                        <v-btn
                          text
                          color="cyan"
                          @click="$refs.dialog2.save(newevent.event_time)"
                        >
                          OK
                        </v-btn>
                      </v-time-picker>
                    </v-dialog>
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-text-field
                      v-model="newevent.main_image_url"
                      label="Image URL"
                      prepend-icon="mdi-link"
                      outlined
                      dense
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-img
                      class="grey lighten-4 ma-1 elevation-3 rounded"
                      :src="
                        newevent.main_image_url != ''
                          ? newevent.main_image_url
                          : 'https://api.staugustineshg.org/api/v2/files/placeholder.png'
                      "
                    ></v-img>
                  </v-col>
                </v-row>
              </v-container>
              <small>*indicates required field</small>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="error darken-1"
                text
                @click="
                  dialog = false;
                  clearForm();
                "
              >
                Close
              </v-btn>
              <v-btn
                color="success darken-1"
                :loading="saving"
                :disabled="disabled"
                text
                @click="saveEvent"
              >
                <v-icon left>mdi-content-save-edit-outline</v-icon>
                Save
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

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

          <v-card
            outlined
            hover
            tile
            v-for="(event, index) in events"
            :key="event.id"
            class="ma-3"
          >
            <v-card-text class="d-flex flex-wrap pa-0">
              <v-col sm="3" md="2" class="cyan white--text text-center d-flex">
                <div class="align-self-center" style="width: 100%">
                  <h2 class="pa-2">
                    {{
                      ordinalDay(event.event_date.split("T")[0].split("-")[2])
                    }}
                  </h2>
                  <h2 class="pa-2">
                    {{
                      months[
                        parseInt(event.event_date.split("T")[0].split("-")[1]) -
                          1
                      ]
                    }}
                  </h2>
                  <h2 class="pa-2">
                    {{ event.event_date.split("T")[0].split("-")[0] }}
                  </h2>
                </div>
              </v-col>
              <v-col sm="9" md="8">
                <h3>{{ event.name }}</h3>
                <p>{{ event.description }}</p>
                <v-row>
                  <v-col>
                    <v-icon>mdi-clock</v-icon
                    ><span class="ml-3">{{ amOrPm(event.event_time) }}</span>
                  </v-col>
                  <v-col>
                    <v-icon>room</v-icon
                    ><span class="ml-3">{{ event.venue }}</span>
                  </v-col>
                </v-row>
                <v-row class="mt-5">
                  <v-col>
                    <v-btn
                      dark
                      color="cyan"
                      rounded
                      small
                      class="mr-3"
                      @click="editEvent(index)"
                    >
                      <v-icon left>mdi-pencil</v-icon>
                      Edit
                    </v-btn>

                    <v-btn
                      dark
                      color="error"
                      outlined
                      rounded
                      small
                      @click="deleteEvent(index)"
                    >
                      <v-icon left>mdi-delete</v-icon>
                      Delete
                    </v-btn>
                  </v-col>
                </v-row>
              </v-col>
              <v-col sm="12" md="2" class="pa-0">
                <v-img :src="event.main_image_url"></v-img>
              </v-col>
            </v-card-text>
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
  name: "Events",
  components: {
    Navbar,
  },

  data: () => ({
    saving: false,
    disabled: false,
    loading: true,
    dialog: false,
    modal: false,
    modal2: false,
    editIndex: -1,
    deleteIndex: -1,
    deleteDialog: false,
    deleting: false,
    actionColor: "black",
    actionMessage: "",
    snackbar: false,
    months: [
      "JAN",
      "FEB",
      "MAR",
      "APR",
      "MAY",
      "JUN",
      "JUL",
      "AUG",
      "SEP",
      "OCT",
      "NOV",
      "DEC",
    ],
    newevent: {
      id: null,
      event_date: "",
      event_time: "",
      name: "",
      venue: "",
      description: "",
      main_image_url: "",
    },
    authUser: {
      name: "",
    },
  }),

  computed: {
    ...mapGetters({
      events: "event/EVENTS",
      authenticated: "user/AUTHENTICATED",
    }),
  },

  methods: {
    ...mapActions({
      addEvent: "event/SAVE_EVENT",
      deleteEventV: "event/DELETE_EVENT",
      updateEvent: "event/EDIT_EVENT",
    }),
    deleteEvent(index) {
      this.deleteIndex = index;
      this.deleteDialog = true;
    },
    cancelDelete() {
      this.deleteIndex = -1;
      this.deleteDialog = false;
    },
    confirmDelete() {
      this.deleting = true;

      this.deleteEventV({
        index: this.deleteIndex,
        data: { id: this.events[this.deleteIndex].id },
      })
        .then(() => {
          this.actionMessage = "Event deleted successfully";
          this.actionColor = "success";
          this.snackbar = true;
          this.deleteIndex = -1;
          this.deleting = false;
          this.deleteDialog = false;

          setTimeout(() => {
            this.actionMessage = "";
            this.actionColor = "black";
            this.snackbar = false;
          }, 4000);
        })
        .catch((err) => {
          console.log(err);
          this.actionMessage = "An error occured when deleting.";
          this.actionColor = "red";
          this.snackbar = true;
          this.deleteIndex = -1;
          this.deleting = false;
          this.deleteDialog = false;

          setTimeout(() => {
            this.actionMessage = "";
            this.actionColor = "black";
            this.snackbar = false;
          }, 4000);
        });
    },
    editEvent(index) {
      this.editIndex = index;
      this.newevent = this.events[index];
      this.newevent.event_date = this.newevent.event_date.split("T")[0];
      this.dialog = true;
    },
    clearForm() {
      this.editIndex = -1;
      this.newevent = {
        id: null,
        event_date: "",
        event_time: "",
        name: "",
        venue: "",
        description: "",
        main_image_url: "",
      };
    },
    saveEvent() {
      this.saving = true;

      if (this.editIndex > -1) {
        this.updateEvent({
          index: this.editIndex,
          data: this.newevent,
        })
          .then(() => {
            this.actionMessage =
              "You have successfully updated the event " + this.newevent.name;
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
              "An error occured when updating event " + this.newevent.name;
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
      } else {
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
              "An error occured when adding event " + this.newevent.name;
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
      }
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
        this.$store.dispatch("event/GET_EVENTS").then(() => {
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
