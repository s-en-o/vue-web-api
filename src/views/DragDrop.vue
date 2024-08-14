<template>
    <div class="p-4">
        <h2>Item to drop</h2>
        <ul class="grid grid-cols-2 md:grid-cols-3 gap-4" id="dragArea">
            <li
                :id="`item${idx}`"
                draggable="true"
                @dragstart="handleDragStart"
                ref="imgEls"
                v-for="(item, idx) in items"
                :key="item.src">
                <img
                    class="h-auto max-w-full rounded-lg"
                    :src="item.src"
                    :alt="item.alt" />
            </li>
        </ul>

        <h2 class="my-5">Drop area</h2>
        <ul
            id="dropArea"
            class="grid grid-cols-2 md:grid-cols-3 gap-4 empty-list p-4"
            ref="dropArea"
            @drop="handleDrop"
            @dragover="handleDragOver"></ul>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const dropArea = ref<HTMLDivElement>()
const imgEls = ref<HTMLLIElement[]>([])

const items = ref<{ src: string; alt: string }[]>([
    {
        src: 'https://loremflickr.com/800/800/brazil',
        alt: 'Brazil',
    },
    {
        src: 'https://loremflickr.com/800/800/indonesia',
        alt: 'Indonesia',
    },
    {
        src: 'https://loremflickr.com/800/800/newzealand',
        alt: 'New Zealand',
    },
])

// Drag start
const handleDragStart = (ev: DragEvent) => {
    if (!ev.dataTransfer) return

    const target = ev.target as HTMLLIElement
    // Set data
    ev.dataTransfer.setData('application/my-app', target.parentElement!.id)
    ev.dataTransfer.effectAllowed = 'move'
}

// Drop
const handleDrop = (ev: DragEvent) => {
    if (!ev.dataTransfer) return
    ev.preventDefault()

    const data = ev.dataTransfer.getData('application/my-app')
    // Find the correct id
    const child = imgEls.value.find((li) => li.id === data)
    dropArea.value?.appendChild(child as Node)
}

// Drag over
const handleDragOver = (ev: DragEvent) => {
    if (!ev.dataTransfer) return
    ev.preventDefault()
    ev.dataTransfer.dropEffect = 'move'
}
</script>

<style lang="scss" scoped>
.empty-list {
    border: 1px solid red;
}

ul {
    list-style: none;
}

li {
    cursor: pointer;
}
</style>
