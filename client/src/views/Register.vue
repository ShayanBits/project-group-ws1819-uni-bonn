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
                                      type="password" v-model="passwordConfirm" required></v-text-field>
                        <v-checkbox
                                label="Are you Admin?"
                                v-model="isAdmin"
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
    import postJson from '../mixins/postJson'

    export default {
        props: ['nextUrl'],
        data() {
            return {
                name: '',
                email: '',
                password: '',
                passwordConfirm: '',
                isAdmin: false,
            }
        },
        methods: {
            handleSubmit(e) {
                e.preventDefault()
                const formValid = this.password === this.passwordConfirm && this.password.length > 0
                if (formValid) {
                    postJson('/register', {
                        name: this.name,
                        email: this.email,
                        password: this.password,
                        isAdmin: this.isAdmin,
                    }, false).then(({auth, user}) => {
                        if (auth) {
                            this.$store.commit('receiveUser', user)
                            let nextRoute = this.$route.params.nextUrl || user.isAdmin ? 'admin' : 'dashboard'
                            this.$router.push(nextRoute)
                        }
                    }).catch(error => {
                        console.error(error)
                    })
                } else {
                    this.password = ''
                    this.passwordConfirm = ''

                    return alert('Passwords do not match')
                }
            },
        },
    }
</script>