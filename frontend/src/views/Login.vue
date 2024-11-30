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
    if (response.data.success) {
      alert(`Добро пожаловать, ${response.data.nickname}!`);
      // Здесь можно добавить логику для перенаправления пользователя на другую страницу
    }
  } catch (error) {
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
          <div class="form_btn">
            <Button 
              titleButton="Войти" 
              hoverColor="#8793A3"
              activeColor="#5A6B7A" 
              backgroundColor="#6E7F91" 
              style="width: 150px; height: 40px;"
            />
          </div>
        </form>
        <p>
          Еще нет аккаунта?
          <a href="/auth/singup">Зарегистрироваться</a>
        </p>
      </div>
      <div class="login_illustration">
        <img src="@assets/people3.png" alt="people3" width="680px" />
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

  .content {
    width: 100%;
    max-width: 1280px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .login_form {
    display: flex;
    flex-direction: column;
  }

  .login_form h1 {
    font-size: 35px;
    margin-bottom: 20px;
  }

  .login_form form {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .form_group {
    width: 100%;
  }

  .form_group input {
    width: 350px;
    height: 30px;
    font-size: 14px;
    border: none;
    outline:none;
    border-radius: 10px;
    padding: 10px;
    background-color: #E8E8E8;
  }

  .form_group input:focus {
    border: 1px solid #6e7f91;
  }

  .form_btn {
    display: flex;
    justify-content: center;
  }

  .login_form p {
    text-align: center;
    margin-top: 20px;
    font-size: 14px;
  }

  .login_form p a {
    text-decoration: underline;
  }

  .login_illustration img {
    width: 680px;
  }
</style>
