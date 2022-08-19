<template>
  <v-app
    style="
      background: url('https://api.staugustineshg.org/api/v2/files/bg1.jpg')
        center/cover;
    "
  >
    <nav>
      <v-snackbar
        v-model="snackbar"
        multi-line
        timeout="7000"
        top
        :color="actionColor"
      >
        <span>{{ actionMessage }}</span>
        <v-btn text fab @click="snackbar = false">
          <v-icon>highlight_off</v-icon>
        </v-btn>
      </v-snackbar>
      <!--v-app-bar flat app-->
      <v-app-bar app flat color="white" class="cyan--text" dense elevation="1">
        <v-img
          src="https://api.staugustineshg.org/api/v2/files/logo.png"
          max-width="50px"
          class="ma-3"
        ></v-img>
        <v-toolbar-title class="text-uppercase cyan--text">
          <span class="font-weight-light">StAugustine</span>
          <span>SHG</span>
        </v-toolbar-title>

        <v-spacer></v-spacer>

        <v-menu transition="slide-y-transition" bottom>
          <template v-slot:activator="{ on }">
            <v-btn text class="cyan--text text-capitalize" v-on="on">
              <v-icon right>expand_more</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item href="https://staugustineshg.org">
              <v-list-item-title>
                <v-icon left>home</v-icon>
                <span>Home</span>
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-app-bar>
    </nav>

    <v-main class="mx-sm-0 ma-md-4">
      <div class="register">
        <v-container>
          <v-card class="elevation-5">
            <v-card-title class="cyan--text lighten-4">
              <h4>Member Self Registration</h4>
              <v-spacer></v-spacer>
              <v-btn text color="error" href="http://staugustineshg.org">
                Exit <v-icon right>exit_to_app</v-icon>
              </v-btn>
            </v-card-title>

            <v-divider></v-divider>

            <v-card-text>
              <v-stepper
                v-model="e1"
                non-linear
                class="elevation-0"
                style="border: 1px solid #efefef"
              >
                <v-stepper-header>
                  <v-stepper-step :complete="e1 > 1" step="1">
                    Instructions
                  </v-stepper-step>

                  <v-divider></v-divider>

                  <v-stepper-step :complete="e1 > 2" step="2">
                    Applicant Information
                  </v-stepper-step>

                  <v-divider></v-divider>

                  <v-stepper-step :complete="e1 > 3" step="3">
                    Occupation / Employment Info
                  </v-stepper-step>

                  <v-divider></v-divider>

                  <v-stepper-step :complete="e1 > 4" step="4">
                    Beneficiaries
                  </v-stepper-step>

                  <v-divider></v-divider>

                  <v-stepper-step step="5"> Next of Kin </v-stepper-step>
                </v-stepper-header>

                <v-stepper-items>
                  <v-stepper-content step="1">
                    <v-card class="mb-12" outlined>
                      <v-card-text>
                        <v-row>
                          <v-col cols="12">
                            <h3>Membership Application Instructions</h3>
                            <i
                              >Read these instructions carefully. You will be
                              required to upload the documents during specified
                              steps.</i
                            >
                            <br />
                            <br />

                            Required documents:
                            <ol>
                              <li>Copy of National ID or passport</li>
                              <li>Copy of KRA PIN certificate</li>
                              <li>
                                Copy of Next of Kin national ID or passport
                              </li>
                              <li>Passport Size photograph</li>
                              <li>
                                Proof of relationship to beneficiaries <br />
                                <i
                                  >Birth certificates, Marriage certificates,
                                  Sworn affidavit or any other legal proof of
                                  relationship</i
                                >
                              </li>
                              <li>
                                Duly filled Membership Application Form <br />
                                <i
                                  >Download the blank form below and fill it in.
                                  You will be required to upload the filled form
                                  at a later stage.</i
                                >
                              </li>
                            </ol>
                          </v-col>
                        </v-row>
                        <v-row>
                          <v-col>
                            <v-btn
                              outlined
                              color="info"
                              href="https://api.staugustineshg.org/api/v2/files/Appendix II MEMBERSHIP APPLICATION FORM.pdf"
                              ><v-icon left>download</v-icon> Download
                              Registration Form</v-btn
                            >
                          </v-col>
                        </v-row>
                      </v-card-text>
                    </v-card>

                    <v-btn color="primary" @click="e1 = 2"> Continue </v-btn>
                  </v-stepper-content>

                  <v-stepper-content step="2">
                    <v-card class="mb-12" flat color="">
                      <v-card-title>
                        <h4>Basic Information</h4>
                      </v-card-title>
                      <v-card-text>
                        <v-row>
                          <v-col cols="12" sm="12" md="7">
                            <v-row>
                              <v-col cols="12" sm="12" md="4">
                                <v-autocomplete
                                  label="Salutation"
                                  v-model="newmember.applicant.salutation"
                                  dense
                                  outlined
                                  :items="['Mr', 'Mrs', 'Miss']"
                                ></v-autocomplete>
                              </v-col>
                              <v-col cols="12" sm="12" md="8">
                                <v-text-field
                                  outlined
                                  dense
                                  label="First Name*"
                                  v-model="newmember.applicant.first_name"
                                  :error-messages="firstNameErrors"
                                  :counter="20"
                                  @input="
                                    $v.newmember.applicant.first_name.$touch()
                                  "
                                  @blur="
                                    $v.newmember.applicant.first_name.$touch()
                                  "
                                ></v-text-field>
                              </v-col>
                              <v-col cols="12" sm="12" md="6">
                                <v-text-field
                                  outlined
                                  dense
                                  label="Last Name*"
                                  v-model="newmember.applicant.surname"
                                  :error-messages="surnameErrors"
                                  :counter="20"
                                  @input="
                                    $v.newmember.applicant.surname.$touch()
                                  "
                                  @blur="
                                    $v.newmember.applicant.surname.$touch()
                                  "
                                ></v-text-field>
                              </v-col>
                              <v-col cols="12" sm="12" md="6">
                                <v-text-field
                                  outlined
                                  dense
                                  label="Other Name(s)"
                                  v-model="newmember.applicant.other_names"
                                ></v-text-field>
                              </v-col>
                              <v-col cols="12" sm="12" md="6">
                                <v-autocomplete
                                  label="Nationality"
                                  v-model="newmember.applicant.nationality"
                                  dense
                                  outlined
                                  :items="nationalities"
                                  :error-messages="nationalityErrors"
                                  @input="
                                    $v.newmember.applicant.nationality.$touch()
                                  "
                                  @blur="
                                    $v.newmember.applicant.nationality.$touch()
                                  "
                                ></v-autocomplete>
                              </v-col>
                              <v-col cols="12" sm="12" md="6">
                                <v-text-field
                                  outlined
                                  dense
                                  label="National ID / Passport No.*"
                                  v-model="newmember.applicant.id_number"
                                  :error-messages="idNumberErrors"
                                  :counter="20"
                                  @input="
                                    $v.newmember.applicant.id_number.$touch()
                                  "
                                  @blur="
                                    $v.newmember.applicant.id_number.$touch()
                                  "
                                ></v-text-field>
                              </v-col>
                              <v-col cols="12" sm="12" md="6">
                                <v-text-field
                                  outlined
                                  dense
                                  label="Phone No.*"
                                  v-model="newmember.applicant.phone_number"
                                  :error-messages="phoneNumberErrors"
                                  :counter="15"
                                  @input="
                                    $v.newmember.applicant.phone_number.$touch()
                                  "
                                  @blur="
                                    $v.newmember.applicant.phone_number.$touch()
                                  "
                                ></v-text-field>
                              </v-col>
                              <v-col cols="12" sm="12" md="6">
                                <v-menu
                                  ref="menu1"
                                  v-model="menu1"
                                  :close-on-content-click="false"
                                  :return-value.sync="
                                    newmember.applicant.date_of_birth
                                  "
                                  transition="scale-transition"
                                  offset-y
                                  min-width="auto"
                                >
                                  <template v-slot:activator="{ on, attrs }">
                                    <v-text-field
                                      label="Date of Birth*"
                                      v-model="
                                        newmember.applicant.date_of_birth
                                      "
                                      outlined
                                      dense
                                      readonly
                                      v-bind="attrs"
                                      v-on="on"
                                      :error-messages="dateOfBirthErrors"
                                      @input="
                                        $v.newmember.applicant.date_of_birth.$touch()
                                      "
                                      @blur="
                                        $v.newmember.applicant.date_of_birth.$touch()
                                      "
                                    ></v-text-field>
                                  </template>
                                  <v-date-picker
                                    v-model="newmember.applicant.date_of_birth"
                                    no-title
                                    scrollable
                                    :max="
                                      new Date().toISOString().substr(0, 10)
                                    "
                                    min="1940-01-01"
                                  >
                                    <v-spacer></v-spacer>
                                    <v-btn
                                      text
                                      color="primary"
                                      @click="menu1 = false"
                                    >
                                      Cancel
                                    </v-btn>
                                    <v-btn
                                      text
                                      color="primary"
                                      @click="
                                        $refs.menu1.save(
                                          newmember.applicant.date_of_birth
                                        )
                                      "
                                    >
                                      OK
                                    </v-btn>
                                  </v-date-picker>
                                </v-menu>
                              </v-col>
                              <v-col cols="12" sm="12" md="4">
                                <v-autocomplete
                                  label="Gender"
                                  v-model="newmember.applicant.gender"
                                  dense
                                  outlined
                                  :items="['Male', 'Female', 'Other']"
                                  :error-messages="genderErrors"
                                  @input="
                                    $v.newmember.applicant.gender.$touch()
                                  "
                                  @blur="$v.newmember.applicant.gender.$touch()"
                                ></v-autocomplete>
                              </v-col>
                              <v-col cols="12" sm="12" md="4">
                                <v-autocomplete
                                  label="Marital Status"
                                  v-model="newmember.applicant.marital_status"
                                  dense
                                  outlined
                                  :items="[
                                    'Married',
                                    'Single',
                                    'Widowed',
                                    'Other',
                                  ]"
                                  :error-messages="maritalStatusErrors"
                                  @input="
                                    $v.newmember.applicant.marital_status.$touch()
                                  "
                                  @blur="
                                    $v.newmember.applicant.marital_status.$touch()
                                  "
                                ></v-autocomplete>
                              </v-col>
                              <v-col cols="12" sm="12" md="4">
                                <v-autocomplete
                                  label="Religion"
                                  v-model="newmember.applicant.religion"
                                  dense
                                  outlined
                                  :items="['Catholic', 'Other']"
                                  :error-messages="religionErrors"
                                  @input="
                                    $v.newmember.applicant.religion.$touch()
                                  "
                                  @blur="
                                    $v.newmember.applicant.religion.$touch()
                                  "
                                ></v-autocomplete>
                              </v-col>
                            </v-row>
                          </v-col>
                          <v-col cols="12" sm="12" md="5">
                            <v-row>
                              <v-col cols="12" sm="12" md="12">
                                <v-card class="rounded-xl border" outlined>
                                  <v-card-title>
                                    <h4>Uploads</h4>
                                  </v-card-title>
                                  <v-card-text>
                                    <v-row>
                                      <v-col cols="12">
                                        <v-file-input
                                          accept="image/*"
                                          label="Passport Size Photo*"
                                          outlined
                                          dense
                                          v-model="newmember.applicant.passport"
                                          prepend-icon="mdi-account-box-outline"
                                          id="passport"
                                          ref="passport"
                                          @change="handleUpload"
                                          :error-messages="passportErrors"
                                          @input="
                                            $v.newmember.applicant.passport.$touch()
                                          "
                                          @blur="
                                            $v.newmember.applicant.passport.$touch()
                                          "
                                        ></v-file-input>
                                      </v-col>
                                      <v-col cols="12">
                                        <v-file-input
                                          accept="image/*"
                                          label="National ID / Passport Scan*"
                                          outlined
                                          dense
                                          v-model="newmember.applicant.idscan"
                                          prepend-icon="mdi-card-account-details-outline"
                                          id="idscan"
                                          ref="idscan"
                                          :error-messages="idscanErrors"
                                          @input="
                                            $v.newmember.applicant.idscan.$touch()
                                          "
                                          @blur="
                                            $v.newmember.applicant.idscan.$touch()
                                          "
                                        ></v-file-input>
                                      </v-col>
                                      <v-col cols="12">
                                        <v-file-input
                                          accept="application/pdf"
                                          label="Copy of KRA PIN Certificate*"
                                          outlined
                                          dense
                                          v-model="newmember.applicant.kra"
                                          prepend-icon="mdi-id-card"
                                          id="kra"
                                          ref="kra"
                                          :error-messages="kraErrors"
                                          @input="
                                            $v.newmember.applicant.kra.$touch()
                                          "
                                          @blur="
                                            $v.newmember.applicant.kra.$touch()
                                          "
                                        ></v-file-input>
                                      </v-col>
                                      <v-col cols="12">
                                        <v-file-input
                                          accept="application/pdf"
                                          label="Filled application form*"
                                          outlined
                                          dense
                                          v-model="
                                            newmember.applicant.application_form
                                          "
                                          prepend-icon="mdi-form-select"
                                          id="application_form"
                                          ref="application_form"
                                          :error-messages="applicationFormErrors"
                                          @input="
                                            $v.newmember.applicant.application_form.$touch()
                                          "
                                          @blur="
                                            $v.newmember.applicant.application_form.$touch()
                                          "
                                        ></v-file-input>
                                      </v-col>
                                    </v-row>
                                  </v-card-text>
                                </v-card>
                              </v-col>
                            </v-row>
                          </v-col>
                        </v-row>
                        <v-divider></v-divider>
                        <br />
                        <v-row>
                          <v-col cols="12"><h4>Other Info</h4></v-col>
                          <v-col cols="12">
                            <v-text-field
                              dense
                              outlined
                              label="Current Address"
                              v-model="newmember.applicant.address"
                              :error-messages="addressErrors"
                              @input="$v.newmember.applicant.address.$touch()"
                              @blur="$v.newmember.applicant.address.$touch()"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="12" md="4">
                            <v-text-field
                              dense
                              outlined
                              label="Area of Residence"
                              v-model="newmember.applicant.residence"
                              :error-messages="residenceErrors"
                              @input="$v.newmember.applicant.residence.$touch()"
                              @blur="$v.newmember.applicant.residence.$touch()"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="12" md="4">
                            <v-autocomplete
                              item-text="name"
                              item-value="id"
                              :items="counties"
                              dense
                              outlined
                              label="County"
                              v-model="newmember.applicant.county_id"
                              @change="countyTowns"
                              :error-messages="countyIdErrors"
                              @input="$v.newmember.applicant.county_id.$touch()"
                              @blur="$v.newmember.applicant.county_id.$touch()"
                            ></v-autocomplete>
                          </v-col>
                          <v-col cols="12" sm="12" md="4">
                            <v-autocomplete
                              item-text="name"
                              item-value="id"
                              :items="towns"
                              dense
                              outlined
                              label="Town"
                              v-model="newmember.applicant.town_id"
                              :loading="townloading"
                              :disabled="towndisabled"
                              :error-messages="townIdErrors"
                              @input="$v.newmember.applicant.town_id.$touch()"
                              @blur="$v.newmember.applicant.town_id.$touch()"
                            ></v-autocomplete>
                          </v-col>
                          <v-col cols="12" sm="12" md="6">
                            <v-text-field
                              dense
                              outlined
                              label="Estate/Village"
                              v-model="newmember.applicant.estate"
                              :error-messages="estateErrors"
                              @input="$v.newmember.applicant.estate.$touch()"
                              @blur="$v.newmember.applicant.estate.$touch()"
                            ></v-text-field>
                          </v-col>
                        </v-row>
                      </v-card-text>
                    </v-card>

                    <v-btn color="primary" @click="applicantNext()">
                      Continue
                    </v-btn>

                    <v-btn text @click="e1 = 1"> Back </v-btn>
                  </v-stepper-content>

                  <v-stepper-content step="3">
                    <v-card class="mb-12" outlined>
                      <v-card-title>
                        <h4>Member Occupation</h4>
                      </v-card-title>
                      <v-card-text>
                        <v-row>
                          <v-col cols="12">
                            <v-radio-group v-model="employed" column>
                              <v-radio
                                label="I'm currently employed"
                                value="employed"
                                color="success"
                                class="mb-4"
                              ></v-radio>
                              <v-radio
                                label="I own a business"
                                value="business"
                                color="info"
                                class="mb-4"
                              ></v-radio>
                              <v-radio
                                label="I don't have any source of income"
                                value="unemployed"
                                color="error"
                              ></v-radio>
                            </v-radio-group>
                          </v-col>
                        </v-row>
                        <v-row
                          v-show="this.employed === 'employed' ? true : false"
                        >
                          <v-col cols="12" md="6">
                            <v-divider></v-divider>
                          </v-col>
                          <v-col cols="12">
                            <v-text-field
                              label="Employer Name"
                              outlined
                              dense
                              v-model="newmember.occupation.current_employer"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" md="6">
                            <v-text-field
                              label="Employer Address"
                              outlined
                              dense
                              v-model="newmember.occupation.employer_address"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" md="3">
                            <v-menu
                              ref="menu2"
                              v-model="menu2"
                              :close-on-content-click="false"
                              :return-value.sync="
                                newmember.occupation.employment_date
                              "
                              transition="scale-transition"
                              offset-y
                              min-width="auto"
                            >
                              <template v-slot:activator="{ on, attrs }">
                                <v-text-field
                                  label="Start Date"
                                  v-model="newmember.occupation.employment_date"
                                  outlined
                                  dense
                                  readonly
                                  v-bind="attrs"
                                  v-on="on"
                                ></v-text-field>
                              </template>
                              <v-date-picker
                                v-model="newmember.occupation.employment_date"
                                no-title
                                scrollable
                                :max="new Date().toISOString().substr(0, 10)"
                                min="1940-01-01"
                              >
                                <v-spacer></v-spacer>
                                <v-btn
                                  text
                                  color="primary"
                                  @click="menu2 = false"
                                >
                                  Cancel
                                </v-btn>
                                <v-btn
                                  text
                                  color="primary"
                                  @click="
                                    $refs.menu2.save(
                                      newmember.occupation.employment_date
                                    )
                                  "
                                >
                                  OK
                                </v-btn>
                              </v-date-picker>
                            </v-menu>
                          </v-col>
                          <v-col cols="12" md="3">
                            <v-autocomplete
                              :items="income"
                              dense
                              outlined
                              label="Avg. Monthly Income"
                              v-model="newmember.occupation.avg_monthly_income"
                            ></v-autocomplete>
                          </v-col>
                          <v-col cols="12" md="3">
                            <v-text-field
                              label="Employer Phone"
                              outlined
                              dense
                              v-model="newmember.occupation.employer_phone"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" md="3">
                            <v-text-field
                              label="Employer Email Address"
                              outlined
                              dense
                              v-model="newmember.occupation.employer_email"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" md="3">
                            <v-autocomplete
                              item-text="name"
                              item-value="id"
                              :items="counties"
                              dense
                              outlined
                              label="County"
                              v-model="newmember.occupation.employer_county"
                              @change="countyTowns1"
                            ></v-autocomplete>
                          </v-col>
                          <v-col cols="12" md="3">
                            <v-autocomplete
                              item-text="name"
                              item-value="id"
                              :items="towns1"
                              dense
                              outlined
                              label="Town"
                              :loading="townloading1"
                              :disabled="towndisabled1"
                              v-model="newmember.occupation.employer_city"
                            ></v-autocomplete>
                          </v-col>
                        </v-row>
                        <v-row
                          v-show="this.employed === 'business' ? true : false"
                        >
                          <v-col cols="12" md="6">
                            <v-divider></v-divider>
                          </v-col>
                          <v-col cols="12">
                            <v-text-field
                              label="Business Name"
                              outlined
                              dense
                              v-model="newmember.occupation.current_employer"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" md="6">
                            <v-text-field
                              label="Business Address"
                              outlined
                              dense
                              v-model="newmember.occupation.employer_address"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" md="3">
                            <v-menu
                              ref="menu3"
                              v-model="menu3"
                              :close-on-content-click="false"
                              :return-value.sync="
                                newmember.occupation.employment_date
                              "
                              transition="scale-transition"
                              offset-y
                              min-width="auto"
                            >
                              <template v-slot:activator="{ on, attrs }">
                                <v-text-field
                                  label="Start Date"
                                  v-model="newmember.occupation.employment_date"
                                  outlined
                                  dense
                                  readonly
                                  v-bind="attrs"
                                  v-on="on"
                                ></v-text-field>
                              </template>
                              <v-date-picker
                                v-model="newmember.occupation.employment_date"
                                no-title
                                scrollable
                                :max="new Date().toISOString().substr(0, 10)"
                                min="1940-01-01"
                              >
                                <v-spacer></v-spacer>
                                <v-btn
                                  text
                                  color="primary"
                                  @click="menu3 = false"
                                >
                                  Cancel
                                </v-btn>
                                <v-btn
                                  text
                                  color="primary"
                                  @click="
                                    $refs.menu3.save(
                                      newmember.occupation.employment_date
                                    )
                                  "
                                >
                                  OK
                                </v-btn>
                              </v-date-picker>
                            </v-menu>
                          </v-col>
                          <v-col cols="12" md="3">
                            <v-autocomplete
                              :items="income"
                              dense
                              outlined
                              label="Avg. Monthly Income"
                              v-model="newmember.occupation.avg_monthly_income"
                            ></v-autocomplete>
                          </v-col>
                          <v-col cols="12" md="3">
                            <v-text-field
                              label="Business Phone"
                              outlined
                              dense
                              v-model="newmember.occupation.employer_phone"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" md="3">
                            <v-text-field
                              label="Business Email Address"
                              outlined
                              dense
                              v-model="newmember.occupation.employer_email"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" md="3">
                            <v-autocomplete
                              item-text="name"
                              item-value="id"
                              :items="counties"
                              dense
                              outlined
                              label="County"
                              v-model="newmember.occupation.employer_county"
                              @change="countyTowns1"
                            ></v-autocomplete>
                          </v-col>
                          <v-col cols="12" md="3">
                            <v-autocomplete
                              item-text="name"
                              item-value="id"
                              :items="towns1"
                              dense
                              outlined
                              label="Town"
                              :loading="townloading1"
                              :disabled="towndisabled1"
                              v-model="newmember.occupation.employer_city"
                            ></v-autocomplete>
                          </v-col>
                        </v-row>
                      </v-card-text>
                    </v-card>

                    <v-btn color="primary" @click="e1 = 4"> Continue </v-btn>

                    <v-btn text @click="e1 = 2"> Back </v-btn>
                  </v-stepper-content>

                  <v-stepper-content step="4">
                    <v-card class="mb-12" outlined>
                      <v-card-title>
                        <h4>Beneficiaries</h4>
                      </v-card-title>
                      <v-card-text>
                        <v-data-table
                          :headers="headers"
                          :items="newmember.beneficiaries"
                          class="elevation-1"
                        >
                          <template v-slot:top>
                            <v-toolbar flat>
                              <v-toolbar-title>Beneficiaries</v-toolbar-title>
                              <v-divider
                                class="mx-4"
                                inset
                                vertical
                              ></v-divider>
                              <v-spacer></v-spacer>
                              <v-dialog
                                v-model="beneficiaryDialog"
                                max-width="800px"
                              >
                                <template v-slot:activator="{ on, attrs }">
                                  <v-btn
                                    color="#FE00FE"
                                    dark
                                    large
                                    class="mb-2"
                                    v-bind="attrs"
                                    v-on="on"
                                  >
                                    <v-icon left
                                      >mdi-briefcase-plus-outline</v-icon
                                    >
                                    New Beneficiary
                                  </v-btn>
                                </template>
                                <v-card>
                                  <v-card-title>
                                    <span class="headline">{{
                                      formTitle
                                    }}</span>
                                  </v-card-title>

                                  <v-card-text>
                                    <v-container>
                                      <v-row>
                                        <v-col cols="12" md="8">
                                          <v-text-field
                                            v-model="editedItem.full_name"
                                            label="Full Names"
                                            outlined
                                            dense
                                          ></v-text-field>
                                        </v-col>
                                        <v-col cols="12" md="4">
                                          <v-autocomplete
                                            v-model="editedItem.relationship"
                                            label="Relationship"
                                            outlined
                                            dense
                                            :items="[
                                              'Spouse',
                                              'Child',
                                              'Sibling',
                                              'Parent',
                                              'Other',
                                            ]"
                                          ></v-autocomplete>
                                        </v-col>
                                        <v-col cols="12" md="4">
                                          <v-menu
                                            ref="menu"
                                            v-model="menu"
                                            :close-on-content-click="false"
                                            transition="scale-transition"
                                            offset-y
                                            min-width="auto"
                                          >
                                            <template
                                              v-slot:activator="{ on, attrs }"
                                            >
                                              <v-text-field
                                                v-model="
                                                  editedItem.date_of_birth
                                                "
                                                label="Date of Birth"
                                                outlined
                                                dense
                                                readonly
                                                v-bind="attrs"
                                                v-on="on"
                                              ></v-text-field>
                                            </template>
                                            <v-date-picker
                                              ref="picker"
                                              v-model="editedItem.date_of_birth"
                                              :max="
                                                new Date()
                                                  .toISOString()
                                                  .substr(0, 10)
                                              "
                                              min="1940-01-01"
                                              @change="saveDate"
                                            ></v-date-picker>
                                          </v-menu>
                                        </v-col>
                                        <v-col cols="12" md="4">
                                          <v-autocomplete
                                            :items="['Male', 'Female', 'Other']"
                                            v-model="editedItem.gender"
                                            label="Gender"
                                            outlined
                                            dense
                                          ></v-autocomplete>
                                        </v-col>
                                        <v-col cols="12" md="4">
                                          <v-text-field
                                            v-model="editedItem.allocation"
                                            label="Allocation(%)"
                                            outlined
                                            dense
                                            type="number"
                                          ></v-text-field>
                                        </v-col>
                                      </v-row>
                                    </v-container>
                                  </v-card-text>

                                  <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn
                                      color="blue darken-1"
                                      text
                                      @click="closeBeneficiary"
                                    >
                                      Cancel
                                    </v-btn>
                                    <v-btn
                                      color="blue darken-1"
                                      text
                                      @click="saveBeneficiary"
                                    >
                                      Save
                                    </v-btn>
                                  </v-card-actions>
                                </v-card>
                              </v-dialog>
                              <v-dialog
                                v-model="dialogDelete"
                                max-width="500px"
                              >
                                <v-card>
                                  <v-card-title class="headline"
                                    >Are you sure you want to remove this person
                                    from Beneficiaries list?</v-card-title
                                  >
                                  <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn
                                      color="blue darken-1"
                                      text
                                      @click="closeDelete"
                                      >Cancel</v-btn
                                    >
                                    <v-btn
                                      color="blue darken-1"
                                      text
                                      @click="deleteItemConfirm"
                                      >OK</v-btn
                                    >
                                    <v-spacer></v-spacer>
                                  </v-card-actions>
                                </v-card>
                              </v-dialog>
                            </v-toolbar>
                          </template>
                          <template v-slot:item.actions="{ item }">
                            <v-icon small class="mr-2" @click="editItem(item)">
                              mdi-pencil
                            </v-icon>
                            <v-icon small @click="deleteItem(item)">
                              mdi-delete
                            </v-icon>
                          </template>
                        </v-data-table>
                      </v-card-text>
                    </v-card>

                    <v-btn color="primary" @click="e1 = 5"> Continue </v-btn>

                    <v-btn text @click="e1 = 3"> Back </v-btn>
                  </v-stepper-content>

                  <v-stepper-content step="5">
                    <v-card class="mb-12" outlined>
                      <v-card-title>
                        <h4>Next of Kin</h4>
                      </v-card-title>
                      <v-card-text>
                        <v-row>
                          <v-col cols="12" md="6">
                            <v-text-field
                              label="Next of Kin's Full Name"
                              outlined
                              dense
                              v-model="newmember.nok.name"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" md="6">
                            <v-text-field
                              label="Relationship to Member"
                              outlined
                              dense
                              v-model="newmember.nok.relationship"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" md="6">
                            <v-text-field
                              label="Mobile Phone Number"
                              outlined
                              dense
                              v-model="newmember.nok.mobile_number"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" md="6">
                            <v-text-field
                              label="ID/Passport Number"
                              outlined
                              dense
                              v-model="newmember.nok.id_passport"
                            ></v-text-field>
                          </v-col>
                        </v-row>
                      </v-card-text>
                    </v-card>

                    <v-btn
                      color="primary"
                      @click.prevent="saveMemberExt"
                      :loading="saving"
                    >
                      Submit
                    </v-btn>
                    <v-btn text @click="e1 = 4"> Back </v-btn>
                  </v-stepper-content>
                </v-stepper-items>
              </v-stepper>
            </v-card-text>
          </v-card>
        </v-container>
      </div>
    </v-main>
  </v-app>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import axios from "axios";
import { validationMixin } from "vuelidate";
import {
  required,
  maxLength,
  minLength,
  email,
} from "vuelidate/lib/validators";

export default {
  name: "Register",

  data() {
    return {
      e1: 1,
      snackbar: false,
      dialog: false,
      menu: false,
      menu1: false,
      menu2: false,
      menu3: false,
      beneficiaryDialog: false,
      dialogDelete: false,
      actionColor: "black",
      actionMessage: "",
      passporturl: null,
      idscanurl: null,
      townloading: false,
      towndisabled: true,
      townloading1: false,
      towndisabled1: true,
      saving: false,
      employed: "",
      income: [
        "Kshs. 0 - 50,000",
        "Kshs. 50,000 - 150,000",
        "Kshs. 150,000 - 250,000",
        "Above Kshs. 250,000",
      ],
      nationalities: [
        "Afghan",
        "Albanian",
        "Algerian",
        "American",
        "Argentine",
        "Argentinian",
        "Australian",
        "Austrian",
        "Bangladeshi",
        "Batswana",
        "Belgian",
        "Bolivian",
        "Brazilian",
        "British",
        "Bulgarian",
        "Cambodian",
        "Cameroonian",
        "Canadian",
        "Chilean",
        "Chinese",
        "Colombian",
        "Costa Rican",
        "Croatian",
        "Cuban",
        "Czech",
        "Danish",
        "Dominican",
        "Dutch",
        "Ecuadorian",
        "Egyptian",
        "Emirati",
        "English",
        "Estonian",
        "Ethiopian",
        "Fijian",
        "Finnish",
        "French",
        "German",
        "Ghanaian",
        "Greek",
        "Guatemalan",
        "Haitian",
        "Honduran",
        "Hungarian",
        "Icelandic",
        "Indian",
        "Indonesian",
        "Iranian",
        "Iraqi",
        "Irish",
        "Israeli",
        "Italian",
        "Jamaican",
        "Japanese",
        "Jordanian",
        "Kenyan",
        "Korean",
        "Kuwaiti",
        "Lao",
        "Latvian",
        "Lebanese",
        "Libyan",
        "Lithuanian",
        "Malagasy",
        "Malaysian",
        "Malian",
        "Maltese",
        "Mexican",
        "Mongolian",
        "Moroccan",
        "Mozambican",
        "Namibian",
        "Nepalese",
        "New Zealand",
        "Nicaraguan",
        "Nigerian",
        "Norwegian",
        "Pakistani",
        "Panamanian",
        "Paraguayan",
        "Peruvian",
        "Philippine",
        "Polish",
        "Portuguese",
        "Romanian",
        "Russian",
        "Salvadorian",
        "Saudi",
        "Scottish",
        "Senegalese",
        "Serbian",
        "Singaporean",
        "Slovak",
        "South African",
        "Spanish",
        "Sri Lankan",
        "Sudanese",
        "Swedish",
        "Swiss",
        "Syrian",
        "Taiwanese",
        "Tajikistani",
        "Thai",
        "Tongan",
        "Tunisian",
        "Turkish",
        "Ukrainian",
        "Uruguayan",
        "Venezuelan",
        "Vietnamese",
        "Welsh",
        "Zambian",
        "Zimbabwean",
        "Other",
      ],
      headers: [
        {
          text: "Full Names",
          align: "start",
          sortable: false,
          value: "full_name",
        },
        { text: "Relationship to Member", value: "relationship" },

        { text: "Date of Birth", value: "date_of_birth" },
        { text: "Gender", value: "gender" },
        { text: "Allocation (%)", value: "allocation" },
        { text: "Actions", value: "actions", sortable: false },
      ],
      editedIndex: -1,
      editedItem: {
        full_name: "",
        relationship: "",
        date_of_birth: new Date().toISOString().substr(0, 10),
        gender: "",
        allocation: 0,
      },
      defaultItem: {
        full_name: "",
        relationship: "",
        date_of_birth: new Date().toISOString().substr(0, 10),
        gender: "",
        allocation: 0,
      },
      newmember: {
        applicant: {
          passport: null,
          idscan: null,
          kra: null,
          application_form: null,
          id_number: "",
          group_id: 2,
          salutation: "",
          first_name: "",
          surname: "",
          other_names: "",
          nationality: "",
          gender: "",
          marital_status: "",
          date_of_birth: new Date().toISOString().substr(0, 10),
          phone_number: "",
          address: "",
          residence: "",
          town_id: null,
          county_id: null,
          estate: "",
          religion: "",
        },
        occupation: {
          member_id: null,
          current_employer: "",
          employment_date: new Date().toISOString().substr(0, 10),
          employer_phone: "",
          employer_email: "",
          employer_county: null,
          employer_city: null,
          avg_monthly_income: "",
        },
        nok: {
          member_id: null,
          name: "",
          relationship: "",
          mobile_number: "",
          id_passport: "",
        },
        beneficiaries: [],
      },
    };
  },

  mixins: [validationMixin],
  validations: {
    newmember: {
      applicant: {
        id_number: { required, maxLength: maxLength(20) },
        group_id: 2,
        salutation: { required },
        first_name: { required, maxLength: maxLength(20) },
        surname: { required, maxLength: maxLength(20) },
        nationality: { required },
        gender: { required },
        marital_status: { required },
        date_of_birth: { required },
        phone_number: {
          required,
          maxLength: maxLength(15),
          minLength: minLength(4),
        },
        address: { required },
        residence: { required },
        town_id: { required },
        county_id: { required },
        estate: { required },
        religion: { required },
        passport: { required },
        idscan: { required },
        kra: { required },
        application_form: { required }
      },
    },
    name: { required, maxLength: maxLength(10), minLength: minLength(3) },
    email: { required, email },
    select: { required },
    checkbox: {
      checked(val) {
        return val;
      },
    },
  },

  computed: {
    ...mapGetters({
      counties: "address/COUNTIES",
      towns: "address/COUNTY_TOWNS",
      towns1: "address/COUNTY_TOWNS1",
    }),
    formTitle() {
      return this.editedIndex === -1 ? "New Beneficiary" : "Edit Beneficiary";
    },

    firstNameErrors() {
      const errors = [];
      if (!this.$v.newmember.applicant.first_name.$dirty) return errors;
      !this.$v.newmember.applicant.first_name.maxLength &&
        errors.push("Name must be at most 10 characters long");
      !this.$v.newmember.applicant.first_name.required &&
        errors.push("Name is required.");
      return errors;
    },

    idNumberErrors() {
      const errors = [];
      if (!this.$v.newmember.applicant.id_number.$dirty) return errors;
      !this.$v.newmember.applicant.id_number.maxLength &&
        errors.push("ID/Passport No. must be at most 20 characters long");
      !this.$v.newmember.applicant.id_number.required &&
        errors.push("ID/Passport No. is required.");
      return errors;
    },

    surnameErrors() {
      const errors = [];
      if (!this.$v.newmember.applicant.surname.$dirty) return errors;
      !this.$v.newmember.applicant.surname.maxLength &&
        errors.push("Name must be at most 20 characters long");
      !this.$v.newmember.applicant.surname.required &&
        errors.push("Name is required.");
      return errors;
    },

    nationalityErrors() {
      const errors = [];
      if (!this.$v.newmember.applicant.nationality.$dirty) return errors;
      !this.$v.newmember.applicant.nationality.required &&
        errors.push("Nationality is required.");
      return errors;
    },

    genderErrors() {
      const errors = [];
      if (!this.$v.newmember.applicant.gender.$dirty) return errors;
      !this.$v.newmember.applicant.gender.required &&
        errors.push("Gender is required.");
      return errors;
    },

    maritalStatusErrors() {
      const errors = [];
      if (!this.$v.newmember.applicant.marital_status.$dirty) return errors;
      !this.$v.newmember.applicant.marital_status.required &&
        errors.push("Marital Status is required.");
      return errors;
    },

    dateOfBirthErrors() {
      const errors = [];
      if (!this.$v.newmember.applicant.date_of_birth.$dirty) return errors;
      !this.$v.newmember.applicant.date_of_birth.required &&
        errors.push("Date of Birth is required.");
      return errors;
    },

    phoneNumberErrors() {
      const errors = [];
      if (!this.$v.newmember.applicant.phone_number.$dirty) return errors;
      !this.$v.newmember.applicant.phone_number.maxLength &&
        errors.push("Phone number must be at most 15 characters long");
      !this.$v.newmember.applicant.phone_number.required &&
        errors.push("Phone number is required.");
      return errors;
    },

    addressErrors() {
      const errors = [];
      if (!this.$v.newmember.applicant.address.$dirty) return errors;
      !this.$v.newmember.applicant.address.required &&
        errors.push("Address is required.");
      return errors;
    },

    residenceErrors() {
      const errors = [];
      if (!this.$v.newmember.applicant.residence.$dirty) return errors;
      !this.$v.newmember.applicant.residence.required &&
        errors.push("Residence is required.");
      return errors;
    },

    townIdErrors() {
      const errors = [];
      if (!this.$v.newmember.applicant.town_id.$dirty) return errors;
      !this.$v.newmember.applicant.town_id.required &&
        errors.push("Town is required.");
      return errors;
    },

    countyIdErrors() {
      const errors = [];
      if (!this.$v.newmember.applicant.county_id.$dirty) return errors;
      !this.$v.newmember.applicant.county_id.required &&
        errors.push("County is required.");
      return errors;
    },

    estateErrors() {
      const errors = [];
      if (!this.$v.newmember.applicant.estate.$dirty) return errors;
      !this.$v.newmember.applicant.estate.required &&
        errors.push("Estate is required.");
      return errors;
    },

    religionErrors() {
      const errors = [];
      if (!this.$v.newmember.applicant.religion.$dirty) return errors;
      !this.$v.newmember.applicant.religion.required &&
        errors.push("Religion is required.");
      return errors;
    },

    passportErrors() {
      const errors = [];
      if (!this.$v.newmember.applicant.passport.$dirty) return errors;
      !this.$v.newmember.applicant.passport.required &&
        errors.push("Passport photo is required.");
      return errors;
    },

    idscanErrors() {
      const errors = [];
      if (!this.$v.newmember.applicant.idscan.$dirty) return errors;
      !this.$v.newmember.applicant.idscan.required &&
        errors.push("Copy of ID/passport is required.");
      return errors;
    },

    kraErrors() {
      const errors = [];
      if (!this.$v.newmember.applicant.kra.$dirty) return errors;
      !this.$v.newmember.applicant.kra.required &&
        errors.push("Copy of KRA PIN Certificate is required.");
      return errors;
    },

    applicationFormErrors() {
      const errors = [];
      if (!this.$v.newmember.applicant.application_form.$dirty) return errors;
      !this.$v.newmember.applicant.application_form.required &&
        errors.push("Duly filled application form is required.");
      return errors;
    },
  },

  watch: {
    beneficiaryDialog(val) {
      val || this.closeBeneficiary();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
    menu(val) {
      val && setTimeout(() => (this.$refs.picker.activePicker = "YEAR"));
    },
  },

  methods: {
    applicantNext() {
      this.$v.$touch();

      var proceed = true;

      if (this.firstNameErrors.length != 0) proceed = false;
      if (this.idNumberErrors.length != 0) proceed = false;
      if (this.surnameErrors.length != 0) proceed = false;
      if (this.nationalityErrors.length != 0) proceed = false;
      if (this.genderErrors.length != 0) proceed = false;
      if (this.maritalStatusErrors.length != 0) proceed = false;
      if (this.dateOfBirthErrors.length != 0) proceed = false;
      if (this.phoneNumberErrors.length != 0) proceed = false;
      if (this.addressErrors.length != 0) proceed = false;
      if (this.residenceErrors.length != 0) proceed = false;
      if (this.townIdErrors.length != 0) proceed = false;
      if (this.countyIdErrors.length != 0) proceed = false;
      if (this.estateErrors.length != 0) proceed = false;
      if (this.religionErrors.length != 0) proceed = false;
      if (this.passportErrors.length != 0) proceed = false;
      if (this.idscanErrors.length != 0) proceed = false;
      if (this.kraErrors.length != 0) proceed = false;
      if (this.applicationFormErrors.length != 0) proceed = false;

      if (proceed) {
        this.e1 = 3;
      } else {
        this.actionMessage = "Kindly correct the errors in the form before you can proceed. Make sure you have filled in all required fields.";
        this.actionColor = "red";
        this.snackbar = true;

        setTimeout(() => {
          this.actionMessage = "";
          this.actionColor = "black";
          this.snackbar = false;
        }, 4000);
      }
    },
    ...mapActions({
      addMember: "member/SAVE_MEMBER",
    }),
    saveMemberExt() {
      this.saving = true;
      let formData = new FormData();

      var benefs = [];

      this.newmember.beneficiaries.forEach((benef) => {
        benefs.push({
          fullName: benef.full_name,
          relationship: benef.relationship,
          dateOfBirth: benef.date_of_birth,
          gender: benef.gender,
          allocation: benef.allocation,
        });
      });

      var memberSave = {
        member: {
          idNumber: this.newmember.applicant.id_number,
          salutation: this.newmember.applicant.salutation,
          firstName: this.newmember.applicant.first_name,
          surname: this.newmember.applicant.surname,
          otherNames: this.newmember.applicant.other_names,
          nationality: this.newmember.applicant.nationality,
          gender: this.newmember.applicant.gender,
          maritalStatus: this.newmember.applicant.marital_status,
          dateOfBirth: this.newmember.applicant.date_of_birth,
          phoneNumber: this.newmember.applicant.phone_number,
          address: this.newmember.applicant.address,
          residence: this.newmember.applicant.residence,
          townId: this.newmember.applicant.town_id,
          countyId: this.newmember.applicant.county_id,
          estate: this.newmember.applicant.estate,
          religion: this.newmember.applicant.religion,
        },
        occupation: {
          memberId: this.newmember.occupation.member_id,
          currentEmployer: this.newmember.occupation.current_employer,
          employmentDate: this.newmember.occupation.employment_date,
          employerPhone: this.newmember.occupation.employer_phone,
          employerEmail: this.newmember.occupation.employer_email,
          employerCounty: this.newmember.occupation.employer_county,
          employerCity: this.newmember.occupation.employer_city,
          avgMonthlyIncome: this.newmember.occupation.avg_monthly_income,
        },
        nok: {
          memberId: this.newmember.nok.member_id,
          name: this.newmember.nok.name,
          relationship: this.newmember.nok.relationship,
          mobileNumber: this.newmember.nok.mobile_number,
          idPassport: this.newmember.nok.id_passport,
        },
        beneficiaries: benefs,
      };

      formData.append("member", JSON.stringify(memberSave));
      formData.append("passportPhoto", this.newmember.applicant.passport);
      formData.append("idOrPassportScan", this.newmember.applicant.idscan);
      formData.append("kraPin", this.newmember.applicant.kra);
      formData.append(
        "applicationForm",
        this.newmember.applicant.application_form
      );

      var instance = axios.create();
      delete instance.defaults.headers.common["Authorization"];

      instance
        .post("https://jsaapp.staugustineshg.org/auth/member", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          this.saving = false;
          if (res.data.statusCodeValue) {
            if (res.data.statusCodeValue === 200) {
              this.saving = true;
              this.actionMessage =
                "Your registration request has been received. You will receive an email once the vetting process is complete.";
              this.actionColor = "success";
              this.snackbar = true;

              setTimeout(() => {
                this.actionMessage = "";
                this.actionColor = "black";
                this.snackbar = false;
                document.location.href = "https://www.staugustineshg.org";
              }, 4000);
            } else {
              this.actionMessage = res.data.statusCode;
              this.actionColor = "warning";
              this.snackbar = true;

              setTimeout(() => {
                this.actionMessage = "";
                this.actionColor = "black";
                this.snackbar = false;
                //document.location.href = "https://www.staugustineshg.org";
              }, 4000);
            }
          } else {
            this.actionMessage = "An Error has occured";
            this.actionColor = "red";
            this.snackbar = true;

            setTimeout(() => {
              this.actionMessage = "";
              this.actionColor = "black";
              this.snackbar = false;
              //document.location.href = "https://www.staugustineshg.org";
            }, 4000);
          }
        })
        .catch(() => {
          this.saving = false;

          this.actionMessage = "An Error has occured";
          this.actionColor = "red";
          this.snackbar = true;

          setTimeout(() => {
            this.actionMessage = "";
            this.actionColor = "black";
            this.snackbar = false;
            //document.location.href = "https://www.staugustineshg.org";
          }, 4000);
        });
    },
    handleUpload(typ) {
      if (typ === "passport") {
        this.newmember.applicant.passport_f_type = this.newmember.applicant.passport.name
          .split(".")
          .pop();
      } else if (typ === "passport") {
        this.newmember.applicant.passport_f_type = this.newmember.applicant.passport.name
          .split(".")
          .pop();
      }
    },
    saveDate(date) {
      this.$refs.menu.save(date);
    },
    previewPhoto() {
      this.passporturl = URL.createObjectURL(this.newmember.applicant.passport);
    },
    previewId() {
      this.idscanurl = URL.createObjectURL(this.newmember.applicant.idscan);
    },
    countyTowns() {
      this.townloading = true;
      this.towndisabled = true;
      this.$store
        .dispatch(
          "address/GET_COUNTY_TOWNS",
          this.newmember.applicant.county_id
        )
        .then(() => {
          this.townloading = false;
          this.towndisabled = false;
        });
    },
    countyTowns1() {
      this.townloading1 = true;
      this.towndisabled1 = true;
      this.$store
        .dispatch(
          "address/GET_COUNTY_TOWNS1",
          this.newmember.occupation.employer_county
        )
        .then(() => {
          this.townloading1 = false;
          this.towndisabled1 = false;
        });
    },
    editItem(item) {
      this.editedIndex = this.newmember.beneficiaries.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.newmember.beneficiaries.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.newmember.beneficiaries.splice(this.editedIndex, 1);
      this.closeDelete();
    },

    closeBeneficiary() {
      this.beneficiaryDialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    saveBeneficiary() {
      if (this.editedIndex > -1) {
        Object.assign(
          this.newmember.beneficiaries[this.editedIndex],
          this.editedItem
        );
      } else {
        this.newmember.beneficiaries.push(this.editedItem);
      }
      this.closeBeneficiary();
    },

    saveMember() {
      if (this.newmember.applicant.date_of_birth) {
        let dob = this.newmember.applicant.date_of_birth.split("-");

        if (dob.length === 3) {
          this.newmember.applicant.date_of_birth =
            dob[2] + "-" + dob[1] + "-" + dob[0];
        }
      }

      this.addMember(this.newmember).then((res) => {
        console.log(res);
        this.actionMessage =
          "Your registration request has been received. You will receive an email once the vetting process is complete.";
        this.actionColor = "success";
        this.snackbar = true;
      });

      setTimeout(() => {
        this.actionMessage = "";
        this.actionColor = "black";
        this.snackbar = false;
        //document.location.href = "https://www.staugustineshg.org";
      }, 4000);
    },
  },

  mounted() {
    this.$store.dispatch("address/GET_COUNTIES");
  },
};
</script>