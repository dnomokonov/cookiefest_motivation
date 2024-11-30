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
            <Button titleButton="Войти" style="width: 180px; height: 40px; background-color: #6E7F91;"/>
            </form>
            <p>
                Еще нет аккаунта?
                <a href="/register">Зарегистрироваться</a>
            </p>
        </div>
        <div class="login_illustration">
            <img src="@assets/people3.png" alt="people3" />
        </div>
        </div>
    </div>

</template>

<style scoped>
/* Стили для блока входа */
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
        font-size: 36px;
        margin-bottom: 80px;
    }

    .login_form button {
        align-items: center;
    }

    .form_group {
        margin-bottom: 20px;
    }

    input {
        width: 100%;
        padding: 10px;
        border: 1px solid #ccc;
        border-radius: 5px;
        font-size: 16px;
    }

    input:focus {
        border-color: #6c757d;
        outline: none;
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
