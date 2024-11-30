<script setup>
import Header from '@components/TheHeader.vue'
import Button from '@components/BaseButton.vue'
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
                type="text"
                placeholder="Логин"
                required
                />
            </div>
            <div class="form_group">
                <input
                id="password"
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

    }

    .login_form h1 {
        font-size: 3rem;
        margin-bottom: 20px;
        font-weight: bold;
    }

    .login_form button {
        align-items: center;
    }

    .form_group {
        margin-bottom: 20px;
    }


    input {
        width: 100%;
        height: 40px;
        padding: 8px 12px;
        font-size: 1rem;
        border: 0px solid #ccc;
        border-radius: 10px; 
        background-color: #E8E8E8; 
        color: #000000;
        font-family: 'Montserrat Alternates', sans-serif;
    }

    input:focus {
        border-color: #6c757d;
        outline: none;
    }

    input::placeholder{
        color: #000000;
    }

    p {
        margin-top: 20px;
        font-size: 14px;
        text-align: center;
    }

    p a {
        color: #007bff;
        text-decoration: none;
    }



    .login_illustration img {
        width: 550px;
    }
</style>
