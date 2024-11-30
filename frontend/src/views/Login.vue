<script setup>
    import { ref } from 'vue'
    import axios from 'axios'
    import Header from '@components/TheHeader.vue'
    import Button from '@components/BaseButton.vue'

    const username = ref('')
    const password = ref('')
    const errorMessage = ref('')
    const isLoading = ref(false)

    const handleLogin = async() => {
        errorMessage.value = ''
        isLoading.value = true

        try {
            console.log(username.value, password.value)

            const response = await axios.post(import.meta.env.VITE_SERVER_API + '/login', {
                username: username.value,
                password: password.value
            })

            console.log('Успешный вход:', response.data)
            window.location.href = '/rating'

        } catch(error) {
            if (error.response && error.response.data) {
                errorMessage.value = error.response.data.message || 'Ошибка авторизации.'
            } else {
                errorMessage.value = 'Произошла ошибка. Попробуйте снова позже.'
            }

            alert(errorMessage.value)

            console.error(error)
        } finally {
            isLoading.value = false
        }
    }

</script>

<template>
    <Header :isAuthenticated="false" backgroundColor="#EFECE7"/>

    <div class="login_block">
    <div class="content">
      <div class="login_from">
        <h1>Войти</h1>
        <form @submit.prevent="handleLogin">
            <input v-model="username" type="text" placeholder="Логин" required>
            <input v-model="password" type="password" placeholder="Пароль" required>
            <div class="form_btn">
                <Button backgroundColor="#6E7F91" hoverColor="#8793A3" activeColor="#5A6B7A" titleButton="Войти" style="width: 150px; height: 40px;"/>
            </div>
        </form>
        <p>Еще нет аккаунта?
            <a href="/auth/singup">Зарегистроваться</a>
        </p>
      </div>
      <div class="login_image">
        <img src="@assets/people3.png" alt="people3" width="80px">
      </div>
    </div>
  </div>

</template>

<style scoped>
    .login_block {
    width: 100%;
    height: 90vh;
    display: flex;
    justify-content: center;
  }

  .login_block .content {
    width: 100%;
    max-width: 1280px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .login_from {
    display: flex;
    flex-direction: column;
  }

  .login_from h1 {
    font-size: 35px;
    margin-bottom: 20px;
  }

  .login_from form {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .login_from form input {
    width: 350px;
    height: 30px;
    font-size: 14px;
    border: none;
    outline:none;
    border-radius: 10px;
    padding: 10px;
    background-color: #E8E8E8;
  }

  .login_from form .form_btn {
    display: flex;
    justify-content: center;
  }

  .login_from p {
    text-align: center;
    margin-top: 20px;
    font-size: 14px;
  }

  .login_from p a {
    text-decoration: underline;
  }

  .login_image img {
    width: 680px;
  }

</style>

