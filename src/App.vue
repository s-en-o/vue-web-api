<script setup lang="ts">
import { RouterView, RouterLink } from 'vue-router'
</script>

<template>
    <main>
        <h1>main page</h1>
        <ul>
            <li><RouterLink to="/">Home page</RouterLink></li>
        </ul>
        <RouterView />
    </main>
</template>

<style scoped></style>
