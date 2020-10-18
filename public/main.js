
const TopPage = {
  template: '#top-page',
  data: function() {
    return {
      isSmartphone: Boolean,
      loginMsg: 'ログイン',
      showPassword: false,
      username: '',
      isLogin: false,
      isLoginSuccessOrFailureMessage: '',
      usernameRules: [
        value => !!value || `入力必須項目です`,
        value => value.length <= 10 || '10文字以内で入力してください'
      ],
      passwordRules: [
        value => !!value || `入力必須項目です`,
        value => /^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?\d)[a-zA-Z\d]{8,32}$/.test(value) || `半角の大文字/小文字/数字をそれぞれ1つ以上含む8文字以上32文字以下の文字列`
      ],
      baseURL: '',
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
        login: false,
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
      },
      userData: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    openLoginDialog: function() {
      this.isLoginSuccessOrFailureMessage = ''
      if (this.isLogin) {
        const result = confirm('ログアウトしますか？')
        if (result) {
          this.isLogin = false
          this.loginMsg = 'ログイン'
          this.todos = []
          this.archives = []
          this.registerScreenInit()
          document.cookie = "ssid=; max-age=0"
          if (this.$refs.form_check) {
            this.$refs.form_check.resetValidation()
          }
          return
        } else {
          return
        }
      }
      this.changes.login = !this.changes.login
    },
    login: function() {
      if (this.$refs.form_check.validate()) {
        axios.post(this.baseURL + '/account/login', this.userData)
        .then(res => {
          if (!res.data.isLogin) {
            this.isLogin = false
            this.isLoginSuccessOrFailureMessage = res.data.msg
          } else {
            this.isLogin = true
            this.isLoginSuccessOrFailureMessage = res.data.msg
            this.username = res.data.username
            document.cookie = `ssid=${res.data.id}`
            this.loginMsg = 'ログアウト'
            setTimeout(() => this.changes.login = false, 1000)
          }
        })
        .then(() => {
          if (this.isLogin) { this.getTodoData() }
        })
        .then(() => {
          if (this.isLogin) { this.getArchiveData() }
        })
        .catch(err => {
          console.log(err);
        })
      } else {
        this.isLoginSuccessOrFailureMessage = '入力項目を確認してください'
        this.error_class = true
      }
    },
    register: function() {
      if (this.$refs.form_check.validate()) {
        axios.post(this.baseURL + '/account/register', this.userData)
        .then(res => {
          this.isLoginSuccessOrFailureMessage = res.data.msg
          if (res.data.isInit) {
            this.registerScreenInit()
            this.$refs.form_check.resetValidation()
          }
        })
        .catch(err => {
          console.log(err);
        })
      } else {
        this.isLoginSuccessOrFailureMessage = '入力項目を確認してください'
      }
    },
    getTodoData: function() {
        axios.post(this.baseURL + '/control/getdata', { username: this.username})
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
        axios.post(this.baseURL + '/control/getarchivedata', { username: this.username })
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
    registerScreenInit: function() {
      this.userData = {
        username: '',
        password: ''
      }
    },
    addTodo: function(idx) {
      this.todoData.rating = this.rating
      this.todoData.comment = this.ratingComment[idx]
      this.todoData.username = this.username
      axios.post(this.baseURL + '/control/add', this.todoData)
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
      axios.post(this.baseURL + '/control/delete' + `/${id}`)
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
      this.updateTodoData.username = this.username
      axios.post(this.baseURL + '/control/update' + `/${id}`, this.updateTodoData)
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
      axios.post(this.baseURL + '/control/archive' + `/${id}`)
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
      axios.post(this.baseURL + '/control/list' + `/${id}`)
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
    },
    splitCookieToObject: function(cookies) {
      const cookieObj = {}
      cookies.split('; ').forEach(cookie => {
        const key = cookie.split('=')[0]
        const value = cookie.split('=')[1]
        cookieObj[key] = value
      })
      return cookieObj
    }
  },
  created: function() {
    if (!!document.cookie) {
      const cookieData = this.splitCookieToObject(document.cookie)
      axios.post(this.baseURL + '/account/login', cookieData)
      .then((res) => {
        this.username = res.data.username
        this.isLogin = true
        this.loginMsg = 'ログアウト'
        this.getTodoData()
      })
      .then(() => {
        this.getArchiveData()
      })
      .catch(err => {
        console.log(err);
      })
    }
    if (navigator.userAgent.match(/(iPhone|iPad|iPod|Android)/i)) {
      this.isSmartphone = true
    } else {
      this.isSmartphone = false
    }
    if (location.hostname === 'localhost') {
      this.baseURL = 'http://localhost:3000'
    } else {
      this.baseURL = 'https://whispering-temple-91855.herokuapp.com'
    }
    console.log(this.baseURL);
  }
}


new Vue({
  el: '#app',
  components: {
    'top-page': TopPage
  },
  vuetify: new Vuetify()
})
