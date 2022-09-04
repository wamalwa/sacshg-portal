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
      <h2>Dashboard</h2>
      <v-row class="my-3">
        <v-col cols="12" md="3">
          <v-card
            class="mx-auto"
            outlined
            hover
            dark
            color="#00CCFD"
            link
            to="members"
          >
            <v-list-item two-line>
              <v-list-item-avatar tile left size="30">
                <v-icon x-large>mdi-wallet-membership</v-icon>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title class="subtitle-2 mb-1"
                  ><h2>{{ getCardValue("new members")["value"] }}</h2></v-list-item-title
                >
                <v-list-item-subtitle>New Members</v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-action>
                <v-btn fab text>
                  <v-icon>mdi-arrow-right</v-icon>
                </v-btn>
              </v-list-item-action>
            </v-list-item>
          </v-card>
        </v-col>

        <v-col cols="12" md="3">
          <v-card
            class="mx-auto"
            outlined
            hover
            dark
            color="#ff69b4"
            link
            to="loans"
          >
            <v-list-item two-line>
              <v-list-item-avatar tile left size="30">
                <v-icon x-large>mdi-folder-multiple-image</v-icon>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title class="subtitle-2 mb-1"
                  ><h2>{{ getCardValue("new loans")["value"] }}</h2></v-list-item-title
                >
                <v-list-item-subtitle>New Loans</v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-action>
                <v-btn fab text>
                  <v-icon>mdi-arrow-right</v-icon>
                </v-btn>
              </v-list-item-action>
            </v-list-item>
          </v-card>
        </v-col>
      </v-row>

      <v-row class="mb-2">
        <v-col cols="6">
          <v-timeline
              align-top
              dense
          >
            <v-timeline-item
                color="pink"
                small
            >
              <v-row class="pt-1">
                <v-col cols="3">
                  <strong>5pm</strong>
                </v-col>
                <v-col>
                  <strong>New Icon</strong>
                  <div class="text-caption">
                    Mobile App
                  </div>
                </v-col>
              </v-row>
            </v-timeline-item>

            <v-timeline-item
                color="teal lighten-3"
                small
            >
              <v-row class="pt-1">
                <v-col cols="3">
                  <strong>3-4pm</strong>
                </v-col>
                <v-col>
                  <strong>Design Stand Up</strong>
                  <div class="text-caption mb-2">
                    Hangouts
                  </div>
                  <v-avatar>
                    <v-img
                        src="https://avataaars.io/?avatarStyle=Circle&topType=LongHairFrida&accessoriesType=Kurt&hairColor=Red&facialHairType=BeardLight&facialHairColor=BrownDark&clotheType=GraphicShirt&clotheColor=Gray01&graphicType=Skull&eyeType=Wink&eyebrowType=RaisedExcitedNatural&mouthType=Disbelief&skinColor=Brown"
                    ></v-img>
                  </v-avatar>
                  <v-avatar>
                    <v-img
                        src="https://avataaars.io/?avatarStyle=Circle&topType=ShortHairFrizzle&accessoriesType=Prescription02&hairColor=Black&facialHairType=MoustacheMagnum&facialHairColor=BrownDark&clotheType=BlazerSweater&clotheColor=Black&eyeType=Default&eyebrowType=FlatNatural&mouthType=Default&skinColor=Tanned"
                    ></v-img>
                  </v-avatar>
                  <v-avatar>
                    <v-img
                        src="https://avataaars.io/?avatarStyle=Circle&topType=LongHairMiaWallace&accessoriesType=Sunglasses&hairColor=BlondeGolden&facialHairType=Blank&clotheType=BlazerSweater&eyeType=Surprised&eyebrowType=RaisedExcited&mouthType=Smile&skinColor=Pale"
                    ></v-img>
                  </v-avatar>
                </v-col>
              </v-row>
            </v-timeline-item>

            <v-timeline-item
                color="pink"
                small
            >
              <v-row class="pt-1">
                <v-col cols="3">
                  <strong>12pm</strong>
                </v-col>
                <v-col>
                  <strong>Lunch break</strong>
                </v-col>
              </v-row>
            </v-timeline-item>

            <v-timeline-item
                color="teal lighten-3"
                small
            >
              <v-row class="pt-1">
                <v-col cols="3">
                  <strong>9-11am</strong>
                </v-col>
                <v-col>
                  <strong>Finish Home Screen</strong>
                  <div class="text-caption">
                    Web App
                  </div>
                </v-col>
              </v-row>
            </v-timeline-item>
          </v-timeline>
        </v-col>
      </v-row>

      <h5>Coming Up</h5>
      <v-row class="mb-2">
        <v-col cols="12">
          <v-card outlined hover tile>
            <v-card-text class="d-flex flex-wrap pa-0">
              <v-col
                sm="3"
                md="2"
                class="cyan lighten-5 cyan--text text-center d-flex"
              >
                <div class="align-self-center" style="width: 100%">
                  <h2 class="pa-2">
                    {{
                      ordinalDay(
                        latestevent.event_date.split("T")[0].split("-")[2]
                      )
                    }}
                  </h2>
                  <h2 class="pa-2">
                    {{
                      months[
                        parseInt(
                          latestevent.event_date.split("T")[0].split("-")[1]
                        ) - 1
                      ]
                    }}
                  </h2>
                  <h2 class="pa-2">
                    {{ latestevent.event_date.split("T")[0].split("-")[0] }}
                  </h2>
                </div>
              </v-col>
              <v-col sm="9" md="8">
                <h3>{{ latestevent.name }}</h3>
                <p>{{ latestevent.description }}</p>
                <v-row>
                  <v-col>
                    <v-icon>mdi-clock</v-icon
                    ><span class="ml-3">{{
                      amOrPm(latestevent.event_time)
                    }}</span>
                  </v-col>
                  <v-col>
                    <v-icon>room</v-icon
                    ><span class="ml-3">{{ latestevent.venue }}</span>
                  </v-col>
                </v-row>
                <v-row class="mt-5">
                  <v-col>
                    <v-btn
                      dark
                      color="cyan"
                      class="ml-2 mt-5"
                      outlined
                      rounded
                      small
                      link
                      to="events"
                    >
                      <v-icon left>mdi-open-in-new</v-icon>
                      View All
                    </v-btn>
                  </v-col>
                </v-row>
              </v-col>
              <v-col sm="12" md="2" class="pa-0">
                <v-img :src="latestevent.main_image_url"></v-img>
              </v-col>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

      <h5>Latest News</h5>
      <v-row class="mb-3">
        <v-col cols="12">
          <v-card class="cyan--text">
            <div class="d-flex flex-no-wrap justify-space-between">
              <div>
                <v-card-title
                  class="headline"
                  v-text="`Hunger Spreads Far`"
                ></v-card-title>

                <v-card-subtitle
                  v-text="`Some great tag line`"
                ></v-card-subtitle>

                <v-card-actions>
                  <v-btn
                    class="ml-2 mt-5"
                    outlined
                    rounded
                    small
                    link
                    to="news"
                  >
                    <v-icon left>mdi-open-in-new</v-icon>
                    View All
                  </v-btn>
                </v-card-actions>
              </div>

              <v-avatar class="ma-3" size="125" tile>
                <v-img
                  src="https://api.staugustineshg.org/api/v2/files/bg1.jpg"
                ></v-img>
              </v-avatar>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-main>
  </v-app>
</template>

<script>
import Navbar from "@/components/Navbar";
import {mapGetters} from "vuex";

export default {
  name: "Dashboard",
  components: {
    Navbar,
  },

  data: () => ({
    authUser: {
      name: "",
    },
    loading: false,
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
    latestevent: {
      id: 2,
      event_date: "2021-04-20T21:00:00.000Z",
      event_time: "10:00:00",
      name: "Annual General Meeting",
      venue: "St. Augustine Parish Center",
      description:
        "This is an annual event that brings together all members to decide on key operations of the association.",
      main_image_url: "https://api.staugustineshg.org/api/v2/files/full_logo.png",
    },
    timelines: [
      {
        color: "red lighten-2",
        icon: "mdi-star",
      },
      {
        color: "purple darken-1",
        icon: "mdi-book-variant",
      },
      {
        color: "green lighten-1",
        icon: "mdi-airballoon",
      },
    ],
  }),

  computed: {
    ...mapGetters({
      dashboard: "landing/DASHBOARD",
    }),
  },

  methods: {
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
    getCardValue(id) {
      return this.dashboard.find((item) => {
        return item.identifier === id;
      })
    }
  },

  mounted() {
    this.$store
      .dispatch("user/GET_STATE")
      .then(() => {
        if (JSON.parse(localStorage.getItem("user"))) {
          this.authUser = JSON.parse(localStorage.getItem("user"));
          this.$store.dispatch("landing/GET_DASHBOARD").then(() => {
            this.loading = false;
          });
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
