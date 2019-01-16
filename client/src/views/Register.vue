<template>
    <v-layout row class="text-xs-center" justify-center>
        <v-flex xs3 class="grey lighten-4">
            <v-container style="position: relative" class="text-xs-center">
                <v-card flat>
                    <v-card-title primary-title>
                        <h4>Register</h4>
                    </v-card-title>
                    <v-form>
                        <v-text-field prepend-icon="email" name="Email" label="Email" v-model="email"
                                      required></v-text-field>
                        <v-text-field prepend-icon="person" name="Username" label="Username" v-model="name"
                                      required></v-text-field>
                        <v-text-field prepend-icon="lock" name="Password" label="Password" type="password"
                                      v-model="password" required></v-text-field>
                        <v-text-field prepend-icon="lock" name="Password-confirmation" label="Password-confirmation"
                                      type="password" v-model="password_confirmation" required></v-text-field>
                        <v-checkbox
                                label="Are you Admin?"
                                v-model="is_admin"
                        ></v-checkbox>
                        <v-card-actions>
                            <v-btn primary large block @click="handleSubmit">Register</v-btn>
                        </v-card-actions>
                    </v-form>
                </v-card>
            </v-container>
        </v-flex>
    </v-layout>
</template>

<script>
    export default {
        props: ["nextUrl"],
        data() {
            return {
                name: "",
                email: "",
                password: "",
                password_confirmation: "",
                is_admin: false
            }
        },
        methods: {
            handleSubmit(e) {
                e.preventDefault()

                if (this.password === this.password_confirmation && this.password.length > 0) {
                    let url = "http://localhost:3000/register"
                    if (this.is_admin != null || this.is_admin == 1) url = "http://localhost:3000/register-admin"
                    this.$http.post(url, {
                        name: this.name,
                        email: this.email,
                        password: this.password,
                        is_admin: this.is_admin
                    })
                        .then(response => {
                            localStorage.setItem('user', JSON.stringify(response.data.user))
                            localStorage.setItem('jwt', response.data.token)

                            if (localStorage.getItem('jwt') != null) {
                                this.$emit('loggedIn')
                                if (this.$route.params.nextUrl != null) {
                                    this.$router.push(this.$route.params.nextUrl)
                                } else {
                                    this.$router.push('/')
                                }
                            }
                        })
                        .catch(error => {
                            console.error(error);
                        });
                } else {
                    this.password = ""
                    this.passwordConfirm = ""

                    return alert("Passwords do not match")
                }
            }
        }
    }
</script>