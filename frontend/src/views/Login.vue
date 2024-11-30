<script setup>
import Header from '@components/TheHeader.vue'
import Button from '@components/BaseButton.vue'
import { ref } from 'vue';
import axios from 'axios';

const login = ref('');
const password = ref('');

const handleLogin = async () => {
  try {
    const response = await axios.post('http://localhost:3000/login', {
      login: login.value,
      password: password.value
    });
    // Если логин успешен
    if (response.data.success) {
      alert(`Добро пожаловать, ${response.data.nickname}!`);
      // Здесь можно добавить логику для перенаправления пользователя на другую страницу
    }
  } catch (error) {
    // Обработка ошибок
    if (error.response) {
      const { data } = error.response;
      if (data.userMessage === false) {
        alert('Пользователь не найден');
      } else if (data.passMessage === false) {
        alert('Неверный пароль');
      } else {
        alert('Произошла ошибка: ' + data.description);
      }
    } else {
      alert('Произошла ошибка: ' + error.message);
    }
  }
};
</script>

<template>
  <Header :isAuthenticated="false" backgroundColor="#EFECE7"/>

  <div class="login_block">
    <div class="content">
      <div class="login_form">
        <h1>Войти</h1>
        <form @submit.prevent="handleLogin">
          <div class="form_group">
            <input
              id="login"
              v-model="login"
              type="text"
              placeholder="Логин"
              required
            />
          </div>
          <div class="form_group">
            <input
              id="password"
              v-model="password"
              type="password"
              placeholder="Пароль"
              required
            />
          </div>
          <Button 
            titleButton="Войти" 
            hoverColor="#8793A3"
            activeColor="#5A6B7A" 
            backgroundColor="#6E7F91" 
            style="width: 180px; height: 40px;"
          />
        </form>
        <p>
          Еще нет аккаунта?
          <a href="/auth/singup">Зарегистрироваться</a>
        </p>
      </div>
      <div class="login_illustration">
        <img src="@assets/people3.png" alt="people3" />
      </div>
    </div>
  </div>
</template>

<style scoped>
  .login_block {
    width: 100%;
    height: 80vh;
    display: flex;
    justify-content: center;
  }

  .content {
    min-width: 1280px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .login_form {
    max-width: 350px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    align-items: center;
  }

  .form_group {
    width: 100%;
  }

  .form_group input {
    width: 100%;
    background: #f8f8f8;
    border-radius: 8px;
    border: none;
    padding: 10px;
    font-size: 16px;
    outline: none;
  }

  .form_group input:focus {
    border: 1px solid #6e7f91;
  }

  .login_form p {
    text-align: center;
    margin-top: 20px;
  }

  .login_illustration img {
    width: 600px;
    height: auto;
  }
</style>
