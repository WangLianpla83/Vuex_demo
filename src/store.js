import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 所有任务列表
    list: [],
    // 文本框的值
    inputVal: 'pla',
    // 下一个id
    nextId: 5,
    // 定义一个切换列表的key值
    viewKey: 'all'
  },
  mutations: {
    initList(state, list) {
      state.list = list
    },
    // 为store中inputVal赋值
    setInputVal(state, val) {
      state.inputVal = val
    },
    // 添加事项
    addList(state) {
      var obj = {
        id: state.nextId,
        info: state.inputVal.trim(),
        done: false
      }
      // 把obj追加到list
      state.list.push(obj),
      // id自增
      state.nextId++,
      // 文本框清空
      (state.inputVal = '')
    },
    // 根据id删除事项
    removeItem(state, id) {
      // 在list中查找索引
      var i = state.list.findIndex(x => x.id === id)
      // 根据索引 删除对应的元素
      if (i !== -1) {
        state.list.splice(i, 1)
      }
    },
    // 修改列表项的选中状态
    changeStatus(state, param) {
      var i = state.list.findIndex(x => x.id === param.id)
      if (i !== -1) {
        state.list[i].done = param.status
      }
    },
    // 清除已完成
    cleanDone(state) {
      state.list = state.list.filter(x => x.done === false)
    },
    // 修改视图切换的关键值
    changeView(state, key) {
      state.viewKey = key
    }
  },
  actions: {
    getList(context) {
      axios.get('/list.json').then(({ data }) => {
        // console.log(data)
        context.commit('initList', data)
      })
    }
  },
  getters: {
    //   统计未完成的任务
    undone(state) {
      return state.list.filter(x => x.done === false).length
    },
    // 按需显示列表数据
    infoList(state) {
      if (state.viewKey === 'all') {
        return state.list
      }
      if (state.viewKey === 'undone') {
        return state.list.filter(x => !x.done)
      }
      if (state.viewKey === 'done') {
        return state.list.filter(x => x.done)
      }
      return state.list
    }
  }
})
