<script setup lang="ts">
import { RouterView, RouterLink } from 'vue-router'
</script>

<template>
    <main>
        <ul>
            <li><RouterLink to="/">Home page</RouterLink></li>
        </ul>
        <RouterView />
    </main>
</template>

<style scoped></style>
