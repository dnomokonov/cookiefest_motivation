<script setup>
import Header from '@components/TheHeader.vue'
import Footer from '@components/TheFooter.vue'
import Button from '@components/BaseButton.vue'
import { ref } from 'vue'

const fullName = ref('')
const username = ref('')
const email = ref('')
const password = ref('')
const repeatpassword = ref('')

const handleRegister = () => {
  if (!fullName.value || !username.value || !email.value || !password.value || !repeatpassword.value) {
    alert('Пожалуйста, заполните все поля.')
    return
  }
  console.log('Регистрация:', { fullName: fullName.value, username: username.value, email: email.value, password: password.value, repeatpassword: repeatpassword.value })
}
</script>

<template>
  <Header :isAuthenticated="false" backgroundColor="#EFECE7" />

 

  <div class="register_block">
    <div class="content">
      <div class="register_form">
        <h1>Регистрация</h1>
        <p>Создайте свой аккаунт</p>

        <input  type="text" id="fullName" v-model="fullName" placeholder="ФИО" />

        <input type="text" id="username" v-model="username" placeholder="Логин" />

        <input type="email" id="email" v-model="email" placeholder="Электронная почта" />

        <input type="password" id="password" v-model="password" placeholder="Пароль" />

        <input type="repeatpassword" id="repeatpassword" v-model="repeatpassword" placeholder="Повторите пароль" />

        <Button 
          titleButton="Зарегистрироваться"
          style="width: 100%; max-width: 250px; height: 50px; background-color: #6E7F91; margin: 0 auto;"
          @click="handleRegister"
        />

        <p style="margin: auto; padding:10px">
            Уже есть аккаунт? Тогда
            <a style="text-decoration: underline;" href="/auth/login">войдите</a>
        </p>

        
      </div>

      <div class="register_preview">
        <img src="@assets/people2.png" alt="register preview" />
      </div>
    </div>
  </div>

  <Footer/>
</template>

<style scoped>

.register_block {
  width: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  background-color: #FFFFFF;
}

.content {
  width: 100%;
  max-width: 1280px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
}


.register_form {
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 450px;
  margin-bottom: 20px; 
}

.register_form h1 {
  font-size: 3rem;
  margin-bottom: 10px;
  font-weight: bold;
}

.register_form p {
  font-size: 1rem;
  color: #6E7F91;
  margin-bottom: 20px;
}

input {
  width: 100%;
  height: 40px;
  padding: 8px 12px;
  margin-bottom: 20px;
  font-size: 1rem;
  border: 0px solid #ccc;
  border-radius: 10px; 
  background-color: #E8E8E8; 
  color: #000000;
  font-family: 'Montserrat Alternates', sans-serif;
}

input::placeholder {
  color: #000000;
  font-size: 1rem;
}

input:focus {
  border-color: #6E7F91;
}

.register_preview {
  width: 100%;
  max-width: 500px;
  display: flex;
  justify-content: center;
}

.register_preview img {
  width: 170%;
  max-width: 170%;
  height: auto; 
}

</style>
