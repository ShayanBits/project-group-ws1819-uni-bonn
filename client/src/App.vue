<template>
    <v-app>
        <div data-app id="app">
            <v-snackbar v-model="snackbarRequireAdmin">
                This requires Admin privileges.
                <v-btn color="pink" flat @click="snackbarRequireAdmin = false">Close</v-btn>
            </v-snackbar>
            <div id="nav">
                <div class="router-links">
                    <router-link to="/about">About</router-link>
                    <router-link to="/gallery">Gallery</router-link>
                    <router-link to="/blog">Blog</router-link>
                    <router-link to="/newsletter">Newsletter</router-link>
                    <router-link v-if="!user" to="/register">Register</router-link>
                    <router-link v-if="!user" to="/login">Login</router-link>
                    <router-link v-if="user" to="/dashboard">Dashboard</router-link>
                    <router-link v-if="user" to="/admin">Admin</router-link>
                </div>
                <div class="user-box" v-if="user">
                    <span>{{user.name}} (</span><span class="logout" @click="logout">Logout</span><span>)</span>
                </div>
            </div>
            <div id="content">
                <router-view/>
            </div>
            <Footer/>
        </div>
    </v-app>
</template>

<style>
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        display: flex;
        flex-direction: column;
        height: 100vh;
    }

    #nav {
        display: block;
        background-color: #2c3e50;
    }

    #nav, #nav a, .user-box > span {
        font-weight: bold;
        color: #637688;
    }

    .user-box > span {
        color: white;
    }

    .logout {
        cursor: pointer;
    }

    #nav a.router-link-exact-active {
        color: #42b983;
    }

    #content {
        flex-grow: 1;
    }

    .router-links {
        overflow: hidden;
        display: flex;
        flex-direction: row; /* keep the contents in a row */
        flex-wrap: wrap; /* bring contents to the next line if necessary */
        justify-content: center; /* keep the contents in the middle */
        flex-grow: 1;
    }

    .router-links > a, .user-box {
        text-align: center;
        padding: 14px 16px;
        text-decoration: none;
    }

    .router-links li a:hover {
        background-color: darkslategray;
    }

    .router-links li a:active {
        background-color: darkslategray;
    }
</style>

<script>
    import Footer from './components/Footer'
    import WebFontLoader from 'webfontloader'
    import postJson from './mixins/postJson'

    export default {
        data() {
            return {
                snackbarRequireAdmin: false,
            }
        },
        computed: {
            user() {
                return this.$store.getters.user
            },
        },
        mounted() {
            this.$root.$on('requireAdmin', () => {
                this.snackbarRequireAdmin = true
            })
            // loading fonts asynchronously
            WebFontLoader.load({
                google: {
                    families: ['Roboto:100,300,400,500,700,900'],
                },
                active: this.setFontLoaded,
            })
        },
        methods: {
            logout() {
                postJson('/logout', {}, false).then(() => {
                    this.$store.commit('clearUser')
                    this.$router.push('about')
                })
            },
            setFontLoaded() {
                this.$emit('font-loaded')
            },
        },
        components: {Footer},
    }
</script>
