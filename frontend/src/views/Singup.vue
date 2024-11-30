<script setup>
  import { ref } from 'vue'
  import axios from 'axios'
  import Header from '@components/TheHeader.vue'
  import Button from '@components/BaseButton.vue'
  
  const fullName = ref('')
  const username = ref('')
  const email = ref('')
  const branch = ref('')
  const password = ref('');
  const confirmPassword = ref('')
  const errorMessage = ref('')
  const isLoading = ref(false)

  const handleRegistration = async() => {
      errorMessage.value = ''

      if (password.value !== confirmPassword.value) {
        errorMessage.value = 'Пароли не совпадают.';
        return;
      }

      isLoading.value = true

      try {
          const response = await axios.post(import.meta.env.VITE_SERVER_API + '/reg', {
            fullName: fullName.value,
            username: username.value,
            email: email.value,
            branch: branch.value,
            password: password.value,
          })

          console.log('Успешная регистрация:', response.data)
          window.location.href = '/auth/login'

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
  <Header :isAuthenticated="false" backgroundColor="#EFECE7" />
  <div class="singup_block">
    <div class="content">
      <div class="singup_from">
        <h1>Регистрация</h1>
        <form @submit.prevent="handleRegistration">
          <input v-model="fullName" type="text" placeholder="ФИО" required>
          <input v-model="username" type="text" placeholder="Логин" required>
          <input v-model="email" type="email" placeholder="Почта" required>
          <input v-model="branch" type="text" placeholder="Филиал" required>
          <input v-model="password" type="password" placeholder="Пароль" required>
          <input v-model="confirmPassword" type="password" placeholder="Повторите пароль" required>
          <div class="form_btn">
            <Button backgroundColor="#6E7F91" hoverColor="#8793A3"
            activeColor="#5A6B7A" titleButton="Зарегистрироваться" style="padding: 12px;"/>
          </div>
        </form>
        <p>Уже есть аккаунт? 
          <a href="/auth/login">Тогда войдите</a>
        </p>
      </div>
      <div class="singup_image">
        <img src="@assets/people2.png" alt="people2">
      </div>
    </div>
  </div>
</template>

<style scoped>
  .singup_block {
    width: 100%;
    height: 90vh;
    display: flex;
    justify-content: center;
  }

  .singup_block .content {
    width: 100%;
    max-width: 1280px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .singup_from {
    display: flex;
    flex-direction: column;
  }

  .singup_from h1 {
    font-size: 35px;
    margin-bottom: 20px;
  }

  .singup_from form {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }

  .singup_from form input {
    width: 350px;
    height: 30px;
    font-size: 14px;
    border: none;
    outline:none;
    border-radius: 10px;
    padding: 10px;
    background-color: #E8E8E8;
  }

  .singup_from form .form_btn {
    display: flex;
    justify-content: center;
  }

  .singup_from p {
    text-align: center;
    margin-top: 20px;
    font-size: 14px;
  }

  .singup_from p a {
    text-decoration: underline;
  }

  .singup_image img {
    width: 680px;
  }

</style>
