<template>
  <div class="home">
    <upload-dialog/>
  </div>
</template>

<script>
    // @ is an alias to /src
    import uploadDialog from '@/components/UploadDialog.vue'

    export default {
        name: 'gallery',
        components: {
            uploadDialog
        }
    }
</script>
