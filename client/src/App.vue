<template>
    <div data-app id="app">
        <div id="nav">
            <ul class="navmenu">
                <li>
                    <router-link to="/about">Home</router-link>
                </li>
                <li>
                    <router-link to="/gallery">Gallery</router-link>
                </li>
                <li>
                    <router-link to="/blog">Blog</router-link>
                </li>
                <li>
                    <router-link to="/newsletter">Newsletter</router-link>
                </li>
            </ul>
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
        display: flex;
        flex-direction: column;
        height: 100vh;
    }

    #nav {
    }

    #nav a {
        font-weight: bold;
        color: #637688;
    }

    #nav a.router-link-exact-active {
        color: #42b983;
    }

    ul.navmenu {
        left: 0;
        top: 0;
        width: 100%;
        list-style-type: none;
        margin: 0;
        padding: 0;
        overflow: hidden;
        background-color: #2c3e50;
        display: flex;
        flex-direction: row; /* keep the contents in a row */
        flex-wrap: wrap; /* bring contents to the next line if necessary */
        justify-content: center; /* keep the contents in the middle */
        flex-grow: 1;
    }

    ul.navmenu li {
        float: left;
    }

    ul.navmenu li a {
        color: white;
        display: block;
        text-align: center;
        padding: 14px 16px;
        text-decoration: none;
    }

    ul.navmenu li a:hover {
        background-color: darkslategray;
    }

    ul.navmenu li a:active {
        background-color: darkslategray;
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