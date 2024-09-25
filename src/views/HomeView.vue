<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
    <ul>
        <li>
            <RouterLink to="/file-upload"> File Upload </RouterLink>
        </li>
        <li>
            <RouterLink to="/drag-drop"> Drag & Drop </RouterLink>
        </li>
        <li>
            <RouterLink to="/audio"> Audio </RouterLink>
        </li>
    </ul>
</template>
