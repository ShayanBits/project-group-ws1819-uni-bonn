<template>
    <div id="app">
        <div id="nav">
            <router-link to="/">Home</router-link>
            <router-link to="/gallery">Gallery</router-link>
            <router-link to="/blog">Blog</router-link>
            <router-link to="/newsletter">Newsletter</router-link>
        </div>
        <div id="content">
            <router-view/>
        </div>
        <Footer/>
    </div>
</template>

<style>
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        height: 100%;
        display: flex;
        flex-direction: column;
    }

    #nav {
        padding-top: 20px;
        display: flex;
        justify-content: space-around;
    }

    #nav a {
        font-weight: bold;
        color: #2c3e50;
    }

    #nav a.router-link-exact-active {
        color: #42b983;
    }

    #content {
        flex-grow: 1;
    }
</style>
<script>
    import Footer from "./components/Footer"
    import WebFontLoader from 'webfontloader'


    export default {
        // Loading fonts asynchronously
        mounted() {
            WebFontLoader.load({
                google: {
                    families: ['Roboto:100,300,400,500,700,900']
                },
                active: this.setFontLoaded
            })
        },
        methods: {
            setFontLoaded() {
                this.$emit('font-loaded')
            }
        },
        components: {Footer}
    }
</script>