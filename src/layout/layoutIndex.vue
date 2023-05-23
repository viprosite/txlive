<template>
    <div class="layout" :class="{ 'menu-open': !isCollapse }">
        <div class="layout__side-bar">
            <sideBar></sideBar>
        </div>
        <div class="layout__app-main">
            <appMain></appMain>
        </div>
    </div>
</template>

<script lang="ts" setup>
import sideBar from './sideBar.vue'
import appMain from './appMain.vue';

import { computed } from 'vue'
import { useStore } from 'vuex';
import { key } from '@/store'




const store = useStore(key)
let isCollapse = computed(() => {
    return store.state.app.leftMenuIsCollapse
})

</script>

<style lang="scss">
.layout {
    width: 100%;
    height: 100%;
    display: flex;


    .layout__side-bar {
        width: calc(var(--el-menu-icon-width) + var(--el-menu-base-level-padding) * 2);
        transition: all .23s;
    }

    .layout__app-main {
        width: calc(100% - var(--el-menu-icon-width) + var(--el-menu-base-level-padding) * 2);
    }

    &.menu-open {
        .layout__side-bar {
            width: 180px;
        }

        .layout__app-main {
            width: calc(100% - 180px);
        }
    }
}
</style>