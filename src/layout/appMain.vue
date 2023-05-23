<template>
    <div class="main">
        <div class="main__top">
            <TopBar />
        </div>
        <div class="main__content">
            content
        </div>
    </div>
</template>

<script lang="ts" setup>
import TopBar from './topBar.vue'
</script>

<style lang="scss">
.main {
    height: 100%;
}
</style>