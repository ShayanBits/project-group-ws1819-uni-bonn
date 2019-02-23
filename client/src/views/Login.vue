<template>
    <v-layout row class="text-xs-center" justify-center>
        <v-flex xs3 class="grey lighten-4">
            <v-container style="position: relative" class="text-xs-center">
                <v-card flat>
                    <v-card-title primary-title>
                        <h4>Login</h4>
                    </v-card-title>
                    <v-form>
                        <v-text-field prepend-icon="email" name="Email" label="Email" v-model="email"
                                      required></v-text-field>
                        <v-text-field prepend-icon="lock" name="Password" label="Password" type="password"
                                      v-model="password" required></v-text-field>
                        <v-card-actions>
                            <v-btn primary large block @click="handleSubmit">Login</v-btn>
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
        data() {
            return {
                email: '',
                password: '',
            }
        },
        methods: {
            handleSubmit(e) {
                e.preventDefault()
                if (this.password.length > 0) {
                    postJson('/login', {
                        email: this.email,
                        password: this.password,
                    }, false).then(({auth, user}) => {
                        if (auth) {
                            this.$store.commit('receiveUser', user)
                            let nextRoute = this.$route.params.nextUrl || user.isAdmin ? 'admin' : 'dashboard'
                            this.$router.push(nextRoute)
                        }
                    }).catch(function (error) {
                        console.error(error.response)
                    })
                }
            },
        },
    }
</script>