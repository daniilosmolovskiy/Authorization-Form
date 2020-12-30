<template>
<div class="wrapper">
  <h1>Авторизация</h1>
  <form class="form">

    <input
    type="text"
    placeholder="Логин"
    name="login"
    v-model="user.login"
    @keyup.enter="validateForm"
    id="login">

    <input
    type="password"
    placeholder="Пароль"
    name="password"
    v-model="user.password"
    @keyup.enter="validateForm"
    id="password">

    <button @click.prevent="validateForm" type="submit">Отправить</button>
  </form>
  <div v-if="error" class="error">
    <p>Поля не могут быть пустыми</p>
  </div>
  <div v-if="authError" class="error">
    <p>Ошибка авторизации. <br> Попробуйте еще раз.</p>
  </div>
</div>
</template>

<script>

export default {
  name: 'home',
  data() {
    return {
      user: {
        login: '',
        password: '',
      },
      error: false,
      authError: false,
    };
  },
  methods: {

    // функция валидации формы
    validateForm() {
      // обрезаю у полей пробелы, проверяю длину строки, чтоб не было просто пробела
      if (this.user.login.trim().length === 0
      && this.user.password.trim().length === 0) {
        this.error = true;
        setTimeout(() => {
          this.error = false;
        }, 2000);
        return;
      }

      // формирую xml форму
      const user = `
        <User>
          <login>${this.user.login}</login>
          <password>${this.user.password}</password>
        </User>
        `;
      const url = 'http://localhost:3000/login';

      // делаю post запрос при помощи fetch
      fetch(url, {
        method: 'post',
        headers: {
          'Content-Type': 'application/xml',
        },
        body: user,
      })

      // получаю ответ от сервера, проверяю его, если все ок,
      // делаю редирект на страницу благодарности
        .then((response) => response.text())
        .then((data) => {
          const parser = new DOMParser();
          const xmlDOM = parser.parseFromString(data, 'text/xml');
          const value = xmlDOM.getElementsByTagName('Status')[0].childNodes[0].nodeValue;
          if (value === 'error') {
            this.authError = true;
            setTimeout(() => {
              this.authError = false;
              this.user.login = '';
              this.user.password = '';
            }, 3000);
          } else {
            this.$router.push('thanks');
          }
        })
        .catch(() => console.log('Can’t access response. Blocked by browser?'));
    },
  },
};
</script>
<style lang="css" scoped>
  h1 {
    text-align: center;
    font-size: 24px;
    line-height: 30px;
  }
  .form {
    display: flex;
    flex-direction: column;
    margin: 0 auto;
    padding: 20px 10px;
    border-radius: 7px;
    box-shadow: 2px 5px 13px 5px rgba(0,0,0,0.61);
    width: 100%;
    max-width: 400px;
    margin-bottom: 40px;
  }
  input {
    margin-bottom: 20px;
  }
  .error {
    width: 300px;
    margin: 0 auto;
    padding: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba(235, 64, 52, .5);
    border-radius: 7px;
    box-shadow: 2px 5px 13px 5px rgba(0,0,0,0.61);
  }
  @media (max-width: 768px) {
    .form {
      width: 260px;
    }
  }
</style>
