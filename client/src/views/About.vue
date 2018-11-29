<template>
    <div class="about">
        <h1>Home</h1>
        <div class="index">
            <p id="p1-test">Welcome stranger to my humble website! My name is Otto and, as you may have guessed, I'm a photographer.</p>
            <p>I display my fairly infantile skills in my <router-link to="/gallery">gallery</router-link> . You can also find some
                half-truths, alternative facts and boring stories in my <router-link to="/blog">blog</router-link>. And if you can get
                enough (we both know, this won't happen), make sure, to subscribe to the
                <router-link to="/newsletter">newsletter</router-link>! There is not risk involved (unless you value your privacy and the
                money on your account, but who does that anyway).</p>
            <p>By the way, I'm available to take photos of your guests on weddings, birthday parties and during other
                occasions in order to sell them for obscene prices to the poor people who didn't bring their phone or camera.
                Cause let's be honest, my photos won't be any better. Make sure to provide me with enough food or I'll get
                edgy. You are also obliged to take all remaining photos off of my hands. Depending on how good the food was,
                you may get a (small) discount. If you are interested, <a href="mailto:otto@example.org">send me an email</a>.
            </p>
        </div>
    </div>
</template>

<style scoped>

    .about{
        flex-grow: 1;
    }

    .index{
        text-align: justify;
    }

</style>