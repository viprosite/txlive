<template>
    <div class="side-bar">
        <Logo></Logo>
        <div class="side-bar__control-icon flex">
            <el-icon @click="handleToggleMenu">
                <Expand v-if="isCollapse" />
                <Fold v-else />
            </el-icon>
        </div>
        <el-menu default-active="/" class="el-menu-vertical-demo" :collapse="isCollapse" :collapse-transition="false"
            :router="true">
            <el-sub-menu index="/">
                <template #title>
                    <el-icon>
                        <location />
                    </el-icon>
                    <span>Navigator One</span>
                </template>
                <el-menu-item-group>
                    <template #title><span>Group One</span></template>
                    <el-menu-item index="1-1">item one</el-menu-item>
                </el-menu-item-group>
                <el-sub-menu index="1-4">
                    <template #title><span>item four</span></template>
                    <el-menu-item index="1-4-1">item one</el-menu-item>
                </el-sub-menu>
            </el-sub-menu>
            <!-- <el-menu-item index="2">
                <el-icon>
                    <document />
                </el-icon>
                <template #title>Navigator Two</template>
            </el-menu-item> -->
            <el-menu-item index="/live">
                <el-icon>
                    <document />
                </el-icon>
                <template #title>live</template>
            </el-menu-item>
        </el-menu>
    </div>
</template>

<script lang="ts" setup>
import Logo from './appLogo.vue'
import { ref, computed, onMounted } from 'vue'
import { useStore } from 'vuex';
import { key } from '@/store'


const store = useStore(key)
let isCollapse = computed(() => {
    return store.state.app.leftMenuIsCollapse
})
let handleToggleMenu = (): void => {
    store.commit('toggleMenuIsCollapse')
}
let handleLiveList = (): void => {
    this.$router.push({ path: '/live/list' })
}


</script>

<style lang="scss">
.side-bar {
    height: 100%;
    border-right: solid 1px var(--el-menu-border-color);
    overflow: hidden;

    .side-bar__control-icon {
        background-color: #f4f4f4;
        padding: 5px 0;

        .el-icon {
            cursor: pointer;
        }

    }

    .el-menu {
        border-right: none;
    }
}
</style>