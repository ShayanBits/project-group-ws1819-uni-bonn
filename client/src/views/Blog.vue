<template>
    <div class="blog">
        <h1>This is a blog page</h1>
        <form action="/api/images/upload" method="post" enctype="multipart/form-data">
            <input type="file" name="image"/>
            <button type="submit">Upload</button>
        </form>
    </div>
</template>
