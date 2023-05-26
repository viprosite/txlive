<template>
    <div class="logo">
        <el-icon>
            <Odometer />
        </el-icon>
        <span v-show="!isCollapse">K</span>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useStore } from 'vuex'
import { key } from '@/store'
const store = useStore(key)
let isCollapse = computed(() => {
    return store.state.app.leftMenuIsCollapse
})
</script>

<style lang="scss">
.logo {
    padding: 6px 0;
    display: flex;
    justify-content: center;
    align-content: center;
    width: 100%;

    .el-icon {
        width: 50px;
        height: 50px;
    }

    span {
        font-weight: 700;
        line-height: 50px;
        margin-left: 10px;
    }
}
</style>