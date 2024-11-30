<script setup>
    import Header from '@components/TheHeader.vue'
    import Button from '@components/BaseButton.vue'

    const next = () => {
        window.location.href = '/';
    }

</script>

<template>
    <Header :isAuthenticated="false" backgroundColor="#EFECE7"/>

    <div class="error_block">
        <div class="content">
            <img src="@assets/404error.png" alt="404error">
            <h2>404 - Страница не найдена</h2>
            <Button 
                titleButton="На главную" 
                backgroundColor="#6E7F91" 
                hoverColor="#8793A3"
                activeColor="#5A6B7A"
                style="width: 150px; height: 35px;"
                @click="next"
            />
        </div>
    </div>

</template>

<style scoped>
    .error_block {
        width: 100%;
        height: 80vh;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .error_block .content {
        width: 100%;
        max-width: 1280px;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 15px;
    }

    .error_block .content h2 {
        font-size: 35px;
    }

    img {
        width: 50%;
    }

</style>