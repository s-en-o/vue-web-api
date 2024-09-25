<template>
    <section>
        <header class="flex flex-wrap">
            <h1 class="mr-4">Audio Recording</h1>
            <small>(recording permission needs to be approved)</small>
        </header>

        <article ref="clipContainer" class="my-8">
            <audio ref="elAudio" controls v-show="clipLabel"></audio>
            <p v-show="clipLabel">{{ 'Title: ' + clipLabel }}</p>
            <a
                ref="elDownload"
                download
                v-show="clipLabel"
                class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 mt-4 inline-block"
                >Download file</a
            >
        </article>

        <button
            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            @click="recStart">
            Record
        </button>
        <button
            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            @click="recStop">
            Stop
        </button>
    </section>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'

const clipContainer = ref<HTMLElement>()
const clipLabel = ref<string | null>(null)
const elAudio = ref<HTMLAudioElement>()
const elDownload = ref<HTMLAnchorElement>()

let mediaRecorder: MediaRecorder
const chunks = ref<Blob[]>([])

onMounted(async () => {
    if (navigator.mediaDevices) {
        try {
            // Getting device media
            const devices = navigator.mediaDevices
            // Set media type to be recorded
            const constraints = { audio: true }
            const stream = await devices.getUserMedia(constraints)
            // Add media stream to media recorder
            mediaRecorder = new MediaRecorder(stream)
            // Attach media recorder method
            // When stop
            mediaRecorder.onstop = () => {
                if (elAudio.value === undefined) return
                // Prompt user to name the audio
                const clipName = prompt('Enter a clip name')
                // Set the clip name
                clipLabel.value = clipName as string
                // Create blob and set the file format
                const blob = new Blob(chunks.value, {
                    type: 'audio/ogg; codecs=opus',
                })
                // Reset blob holder
                chunks.value = []
                // Create Blob url
                const audioURL = URL.createObjectURL(blob)
                // Set audio source
                elAudio.value.src = audioURL
                elDownload.value!.href = audioURL
            }
            // When data available
            mediaRecorder.ondataavailable = (e) => {
                chunks.value.push(e.data)
            }
        } catch (error) {
            console.error('Recording error: ', error)
        }
    }
})
// Start recording
const recStart = () => {
    mediaRecorder.start()
}
// Stop recording
const recStop = () => {
    mediaRecorder.stop()
}
</script>
