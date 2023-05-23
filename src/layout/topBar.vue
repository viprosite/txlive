<template>
    <div class="top-bar">
        <el-dropdown>
            <span class="el-dropdown-link">
                <el-icon size="30">
                    <Avatar />
                </el-icon>
                <el-icon size="15" class="el-icon--right">
                    <arrow-down />
                </el-icon>
            </span>
            <template #dropdown>
                <el-dropdown-menu>
                    <el-dropdown-item>Action 1</el-dropdown-item>
                    <el-dropdown-item>Action 2</el-dropdown-item>
                    <el-dropdown-item>Action 3</el-dropdown-item>
                    <el-dropdown-item disabled>Action 4</el-dropdown-item>
                    <el-dropdown-item divided>Action 5</el-dropdown-item>
                </el-dropdown-menu>
            </template>
        </el-dropdown>
    </div>
</template>

<script>
export default {

}
</script>

<style lang="scss">
.top-bar {
    display: flex;
    justify-content: flex-end;
    padding-right: 20px;

    .el-dropdown {
        .el-dropdown-link {
            display: flex;
            align-items: center;

            .el-icon--right {
                margin-top: 8px;
            }
        }
    }
}
</style>