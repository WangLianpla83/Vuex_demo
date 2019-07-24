<template>
    <div id="app">
        <a-input placeholder="请输入任务" class="my_ipt" :value='inputVal' @change="inputChange" />
        <a-button type="primary" @click="add">添加事项</a-button>

        <a-list bordered :dataSource="infoList" class="dt_list">
            <a-list-item slot="renderItem" slot-scope="item">
                <!-- 复选框 -->
                <a-checkbox :checked='item.done' @change="(e)=>{cdChange(e,item.id)}">{{item.info}}</a-checkbox>
                <!-- 删除链接 -->
                <a slot="actions" @click="remove(item.id)">删除</a>
            </a-list-item>
            <!-- footer区域 -->
            <div slot="footer" class="footer">
                <!-- 未完成的任务个数 -->
                <span>{{undone}}条剩余</span>
                <!-- 操作按钮 -->
                <a-button-group>
                    <a-button :type="viewKey==='all'?'primary':'default'" @click="changeList('all')">全部</a-button>
                    <a-button @click="changeList('undone')" :type="viewKey==='undone'?'primary':'default'">未完成</a-button>
                    <a-button @click="changeList('done')" :type="viewKey==='done'?'primary':'default'">已完成</a-button>
                </a-button-group>
                <!-- 把已经完成的任务清空 -->
                <a @click="clean">清除已完成</a>
            </div>
        </a-list>
    </div>
</template>

<script>
import { mapActions, mapState, mapMutations, mapGetters } from 'vuex'
export default {
    name: 'app',
    data () {
        return {
        }
    },
    created () {
        // this.$store.dispatch('getList')
        this.getList()
    },
    methods: {
        ...mapActions(['getList']),
        ...mapMutations(['setInputVal']),
        // 监听文本框内容变化
        inputChange (e) {
            // console.log(e.target.value);
            this.$store.commit('setInputVal', e.target.value)
        },
        // 添加事项事件
        add () {
            if (this.inputVal.trim().length <= 0) {
                return this.$message.warning('文本框不能为空!')
            }
            this.$store.commit('addList')
        },
        // 根据id删除事项
        remove (id) {
            // alert(id)
            this.$store.commit('removeItem', id)
        },
        // 监听复选框改变事件
        cdChange (e, id) {
            // 接收到最新的选中状态
            //   console.log(e.target.checked)
            //   console.log(id);
            var param = {
                id: id,
                status: e.target.checked
            };
            this.$store.commit('changeStatus', param)
        },
        // 清除已完成
        clean () {
            this.$store.commit('cleanDone')
        },
        // 修改页面展示的列表数据
        changeList (key) {
            // console.log(key);
            this.$store.commit('changeView', key)
        }

    },
    computed: {
        ...mapState(['inputVal', 'viewKey']),
        ...mapGetters(['undone', 'infoList'])
    }
}
</script>

<style scoped>
#app {
    padding: 10px;
}

.my_ipt {
    width: 500px;
    margin-right: 10px;
}

.dt_list {
    width: 500px;
    margin-top: 10px;
}

.footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
</style>
