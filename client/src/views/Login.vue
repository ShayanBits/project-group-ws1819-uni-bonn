<template>
    <v-layout row class="text-xs-center" justify-center>
        <v-flex xs3 class="grey lighten-4" >
            <v-container style="position: relative" class="text-xs-center">
                <v-card flat>
                    <v-card-title primary-title>
                        <h4>Login</h4>
                    </v-card-title>
                    <v-form>
                        <v-text-field prepend-icon="email" name="Email" label="Email" v-model="email" required></v-text-field>
                        <v-text-field prepend-icon="lock" name="Password" label="Password" type="password" v-model="password" required></v-text-field>
                        <v-card-actions>
                            <v-btn primary large block @click="handleSubmit" >Register</v-btn>
                        </v-card-actions>
                    </v-form>
                </v-card>
            </v-container>
        </v-flex>
    </v-layout>
</template>

<script>
    export default {
        data(){
            return {
                email : "",
                password : ""
            }
        },
        methods : {
            handleSubmit(e){
                e.preventDefault()
                if (this.password.length > 0) {
                    this.$http.post('http://localhost:3000/login', {
                        email: this.email,
                        password: this.password
                    })
                        .then(response => {
                            let is_admin = response.data.user.is_admin
                            localStorage.setItem('user',JSON.stringify(response.data.user))
                            localStorage.setItem('jwt',response.data.token)

                            if (localStorage.getItem('jwt') != null){
                                this.$emit('loggedIn')
                                if(this.$route.params.nextUrl != null){
                                    this.$router.push(this.$route.params.nextUrl)
                                }
                                else {
                                    if(is_admin== 1){
                                        this.$router.push('admin')
                                    }
                                    else {
                                        this.$router.push('dashboard')
                                    }
                                }
                            }
                        })
                        .catch(function (error) {
                            console.error(error.response);
                        });
                }
            }
        }
    }
</script>