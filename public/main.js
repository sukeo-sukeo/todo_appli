const TopPage = {
  template: '#top-page',
  data: function() {
    return {
      baseURL: 'http://localhost:3000',
      isActives: [],
      isActivesMenue: [],
      firstViewTagChips: true,
      todos: [],
      archives: [],
      rating: 3,
      ratingComment: {
        1: '思いつき',
        2: 'あとあと役に立つかも',
        3: 'とりあえずメモ',
        4: 'ちょっと重要',
        5: 'とても重要'
      },
      ratingStyle: {
        1: [
          'font-weight-bold'
        ],
        2: [
          'blue--text',
          'font-weight-bold'
        ],
        3: [
          'green--text',
          'font-weight-bold',
        ],
        4: [
            'purple--text',
            'text--lighten-2',
            'font-weight-bold',
        ],
        5: [
            'red--text',
            'text--darken-2',
            'font-weight-bold',
        ]
      },
      ratingLineStyle: {
        1: [],
        2: ['blue'],
        3: ['green'],
        4: ['purple'],
        5: ['red'],
      },
      tagItems: ['仕事', '家族', '友人', '勉強', '読書', 'ゲーム', 'お酒', 'その他'],
      changes: {
        calendar: false,
        updateCalendar: false,
        addTodoDialog: false,
        drawer: false,
      },
      todoData: {
        title: '',
        descript: '',
        limit: '',
        rating: '',
        comment: '',
        tags:[]
      },
      updateTodoData: {
        title: '',
        descript: '',
        limit: '',
        rating: '',
        comment: '',
        tags:[]
      }
    }
  },
  methods: {
    getTodoData: function() {
      axios.get(this.baseURL + '/getdata')
      .then(res => {
        this.todos = res.data.slice().reverse()
      })
      .then(() => {
        this.addInputScreenInit()
        this.updateInputScreenInit()
      })
      .catch(err => {
        console.log(err);
      })
    },
    getArchiveData: function() {
      axios.get(this.baseURL + '/getarchivedata')
      .then(res => {
        this.archives = res.data.slice().reverse()
      })
      .catch(err => {
        console.log(err);
      })
    },
    updBtn: function(idx) {
      //$set(対象、場所、プロパティ)
      this.$set(this.isActives, idx, this.isActives[idx] = !this.isActives[idx])
      this.updateInputScreenInit()
      setTimeout(() => this.firstViewTagChips = true, 100)
    },
    menueBtn: function(idx) {
      this.$set(this.isActivesMenue, idx, this.isActivesMenue[idx] = !this.isActivesMenue[idx])
    },
    addInputScreenInit: function() {
      this.todoData = {
        title: '',
        descript: '',
        limit: '',
        rating: '',
        commnet: '',
        tags:[]
      }
    },
    updateInputScreenInit: function() {
      this.updateTodoData = {
        title: '',
        descript: '',
        limit: '',
        rating: '',
        comment: '',
        tags:[]
      }
    },
    addTodo: function(idx) {
      this.todoData.rating = this.rating
      this.todoData.comment = this.ratingComment[idx]
      axios.post(this.baseURL + '/', this.todoData)
      .then(res => {
        this.getTodoData()
      })
      .then(res => {
        this.changes.addTodoDialog = false
        setTimeout(() => this.rating = 3, 100)
      })
      .catch(err => {
        console.log(err);
      })
    },
    deleteTodo: function(id) {
      axios.post(this.baseURL + '/delete' + `/${id}`)
      .then(res => {
        this.getArchiveData()
      })
      .then(res => {
        this.getTodoData()
      })
      .catch(err => {
        console.log(err);
      })
    },
    updateTodo: function(id, idx, rating) {
      this.updateTodoSpaceCheck(idx)
      this.updateTodoData.comment = this.ratingComment[rating]
      axios.post(this.baseURL + '/update' + `/${id}`, this.updateTodoData)
      .then(res => {
        this.getTodoData()
      })
      .then(res => {
        this.updBtn(idx)
      })
      .catch(err => {
        console.log(err);
      })
    },
    goToArchive: function(id) {
      axios.post(this.baseURL + '/archive' + `/${id}`)
      .then(res => {
        this.getTodoData()
      })
      .then(res => {
        this.getArchiveData()
      })
      .catch(err => {
        console.log(err);
      })
    },
    goToList: function(id) {
      axios.post(this.baseURL + '/list' + `/${id}`)
      .then(res => {
        this.getArchiveData()
      })
      .then(res => {
        this.getTodoData()
      })
      .catch(err => {
        console.log(err);
      })
    },
    updateTodoSpaceCheck: function(idx) {
      if (!this.updateTodoData.title) {this.updateTodoData.title = this.todos[idx].title}
      if (!this.updateTodoData.descript) {this.updateTodoData.descript = this.todos[idx].descript}
      if (!this.updateTodoData.limit) {this.updateTodoData.limit = this.todos[idx].limitDate}
      if (!this.updateTodoData.rating) {this.updateTodoData.rating = this.todos[idx].rating}
      if (!this.updateTodoData.tags.length) {this.updateTodoData.tags = this.todos[idx].tags}
    },
    removeTag: function(item) {
      this.todoData.tags.splice(this.todoData.tags.indexOf(item), 1)
      this.todoData.tags = [...this.todoData.tags]
    },
    removeUpdTag: function(item) {
      this.updateTodoData.tags.splice(this.updateTodoData.tags.indexOf(item), 1)
      this.updateTodoData.tags = [...this.updateTodoData.tags]
    }
  },
  created: function() {
    this.getTodoData()
    this.getArchiveData()
  }
}


new Vue({
  el: '#app',
  components: {
    'top-page': TopPage
  },
  vuetify: new Vuetify()
})
