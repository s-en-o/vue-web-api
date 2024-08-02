<template>
    <section>
        <h2>Upload a file</h2>
        <form action="/upload-url" @submit.prevent="handleSubmit" ref="formEL">
            <input type="file" id="file" ref="inputEL" @change="handleChange" />

            <button type="submit">Submit</button>
        </form>
    </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const fileList = ref<FileList>()
const formEL = ref<HTMLFormElement>()

const handleChange = (event: Event) => {
    const el = event.target as HTMLInputElement
    const files = el.files

    // No file validation
    if (!files?.length) return

    fileList.value = files
    console.log(fileList.value[0])
}

const handleSubmit = () => {
    // No file validation
    if (!fileList.value?.length) {
        alert('No file selected.')

        return
    }

    const fileData = new FormData()
    fileData.append('file', fileList.value[0])

    const action = formEL.value?.action

    fetch(`${action}`, {
        method: 'POST',
        body: fileData,
    })

    console.log('Submitted!')
}
</script>
