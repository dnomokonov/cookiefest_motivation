<script setup>
import Header from '@components/TheHeader.vue'
import Footer from '@components/TheFooter.vue'
import Button from '@components/BaseButton.vue'
import { ref } from 'vue';
import axios from 'axios';

const fullName = ref('');
const login = ref('');
const email = ref('');
const password = ref('');
const confirmPassword = ref('');

const handleRegister = async () => {
  if (!fullName.value || !login.value || !email.value || !password.value || !confirmPassword.value) {
    alert('Пожалуйста, заполните все поля.');
    return;
  }

  if (password.value !== confirmPassword.value) {
    alert('Пароли не совпадают.');
    return;
  }

  const [name, surname, patronymic] = fullName.value.split(' ');

  try {
    const response = await axios.post('http://localhost:3000/signup', {
      name,
      surname,
      patronymic,
      login: login.value,
      email: email.value,
      password: password.value,
      confirmPassword: confirmPassword.value,
    });

    if (response.data.success) {
      alert('Регистрация прошла успешно!');
      // Здесь можно добавить логику для перенаправления пользователя на страницу входа или другую страницу
    }
  } catch (error) {
    // Обработка ошибок
    if (error.response) {
      const { data } = error.response;
      if (data.emailMessage === false) {
        alert('Этот email уже используется.');
      } else if (data.loginMessage === false) {
        alert('Этот логин уже занят.');
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
  <Header :isAuthenticated="false" backgroundColor="#EFECE7" />
  <div class="register_block">
    <div class="content">
      <div class="register_form">
        <h1>Регистрация</h1>
        <form @submit.prevent="handleRegister">
          <input v-model="fullName" type="text" placeholder="ФИО" required>
          <input v-model="login" type="text" placeholder="Логин" required>
          <input v-model="email" type="email" placeholder="Электронная почта" required>
          <input v-model="password" type="password" placeholder="Пароль" required>
          <input v-model="confirmPassword" type="password" placeholder="Повторите пароль" required>
          <div class="form_btn">
            <Button backgroundColor="#6E7F91" hoverColor="#8793A3" activeColor="#5A6B7A" titleButton="Зарегистрироваться" style="padding: 12px;"/>
          </div>
        </form>
        <p>Уже есть аккаунт? 
          <a href="/auth/login">Тогда войдите</a>
        </p>
      </div>
      <div class="register_image">
        <img src="@assets/people2.png" alt="register preview">
      </div>
    </div>
  </div>
  <Footer />
</template>

<style scoped>
  .register_block {
    width: 100%;
    height: 90vh;
    display: flex;
    justify-content: center;
  }

  .register_block .content {
    width: 100%;
    max-width: 1280px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .register_form {
    display: flex;
    flex-direction: column;
  }

  .register_form h1 {
    font-size: 35px;
    margin-bottom: 20px;
  }

  .register_form form {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }

  .register_form form input {
    width: 350px;
    height: 30px;
    font-size: 14px;
    border: none;
    outline:none;
    border-radius: 10px;
    padding: 10px;
    background-color: #E8E8E8;
  }

  .register_form form .form_btn {
    display: flex;
    justify-content: center;
  }

  .register_form p {
    text-align: center;
    margin-top: 20px;
    font-size: 14px;
  }

  .register_form p a {
    text-decoration: underline;
  }

  .register_image img {
    width: 680px;
  }
</style>
