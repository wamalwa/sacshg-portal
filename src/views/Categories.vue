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
      <div class="categories">
        <h1 class="subheading text--gray">
          Categories
          <v-btn outlined color="primary" @click="dialog = true">
            <v-icon left>mdi-plus</v-icon>
            Add Category
          </v-btn>
        </h1>

        <v-dialog v-model="deleteDialog" persistent max-width="400px">
          <v-card outlined>
            <v-card-text class="error--text my-5"
              >Delete
              <b>{{ deleteIndex > -1 ? categories[deleteIndex].name : "" }}</b
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
          max-width="400px"
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
              <v-toolbar-title>Add Category</v-toolbar-title>
            </v-toolbar>
            <v-card-text>
              <v-container>
                <v-row class="mt-4">
                  <v-col cols="12">
                    <v-text-field
                      v-model="newcategory.name"
                      label="Category Name*"
                      outlined
                      dense
                      prepend-icon="category"
                      required
                    ></v-text-field>
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
                @click="saveCategory"
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
          <v-row>
            <v-col
              md="4"
              v-for="(category, index) in categories"
              :key="category.id"
            >
              <v-card outlined hover>
                <v-card-text>
                  <h3>{{ category.name }}</h3>
                </v-card-text>
                <v-card-actions>
                  <v-btn
                    class="ml-2"
                    outlined
                    rounded
                    small
                    color="primary"
                    @click="editCategory(index)"
                  >
                    <v-icon left>mdi-pencil</v-icon>
                    Edit
                  </v-btn>
                  <v-btn
                    class="ml-2"
                    outlined
                    rounded
                    small
                    color="error"
                    @click="deleteCategory(index)"
                  >
                    <v-icon left>mdi-delete-outline</v-icon>
                    Delete
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </div>
    </v-main>
  </v-app>
</template>

<script>
import Navbar from "@/components/Navbar";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Categories",
  components: {
    Navbar,
  },

  data: () => ({
    saving: false,
    disabled: false,
    loading: true,
    dialog: false,
    actionColor: "black",
    actionMessage: "",
    snackbar: false,
    editIndex: -1,
    deleteIndex: -1,
    deleteDialog: false,
    deleting: false,
    newcategory: {
      id: null,
      name: "",
    },
    authUser: {
      name: "",
    },
  }),

  computed: {
    ...mapGetters({
      categories: "category/CATEGORIES",
      authenticated: "user/AUTHENTICATED",
    }),
  },

  methods: {
    ...mapActions({
      addCategory: "category/SAVE_CATEGORY",
      updateCategory: "category/EDIT_CATEGORY",
      deleteCategoryV: "category/DELETE_CATEGORY",
    }),
    deleteCategory(index) {
      this.deleteIndex = index;
      this.deleteDialog = true;
    },
    cancelDelete() {
      this.deleteIndex = -1;
      this.deleteDialog = false;
    },
    confirmDelete() {
      this.deleting = true;

      this.deleteCategoryV({
        index: this.deleteIndex,
        data: { id: this.categories[this.deleteIndex].id },
      })
        .then((response) => {
          this.actionMessage = response.data.message;
          this.actionColor = "success";
          if (response.data.status === 4005) {
            this.actionColor = "warning";
          }
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
    editCategory(index) {
      this.editIndex = index;
      this.newcategory = this.categories[index];
      this.dialog = true;
    },
    clearForm() {
      this.editIndex = -1;
      this.newcategory = {
        id: null,
        name: "",
      };
    },
    saveCategory() {
      this.saving = true;

      if (this.editIndex > -1) {
        this.updateCategory({
          index: this.editIndex,
          data: this.newcategory,
        })
          .then(() => {
            this.actionMessage =
              "You have successfully updated " + this.newcategory.name;
            this.actionColor = "success";
            this.snackbar = true;
            this.newcategory = {
              id: null,
              name: "",
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
              "An error occured when updating " + this.newcategory.name;
            this.actionColor = "red";
            this.snackbar = true;
            this.newcategory = {
              id: null,
              name: "",
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
        this.addCategory(this.newcategory)
          .then(() => {
            this.actionMessage =
              "You have successfully added " +
              this.newcategory.name +
              " SACSHG news categories!";
            this.actionColor = "success";
            this.snackbar = true;
            this.newcategory = {
              id: null,
              name: "",
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
              "An error occured when adding " +
              this.newcategory.name +
              " to SACSHG news categories.";
            this.actionColor = "red";
            this.snackbar = true;
            this.newcategory = {
              id: null,
              name: "",
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
  },

  mounted() {
    this.$store
      .dispatch("user/GET_STATE")
      .then(() => {
        this.$store.dispatch("category/GET_CATEGORIES").then(() => {
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
