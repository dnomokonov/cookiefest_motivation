<script setup>
    import { ref } from 'vue'

    const isAuthenticated = ref(false);

    defineProps({
        logoMarginLeft: {
            type: String,
            default: '0px',
        },
        isAuthenticated: {
            type: Boolean,
            required: true,
        },
        backgroundColor: {
            type: String,
            default: '#FFFFFF',
        },
        changeColor: {
            type: String,
            default: '#394C60',
        },
    })

    const handleAuthAction = () => {
        if (isAuthenticated) {
            console.log("2")
        } else [
            console.log("1")
        ]
    }

</script>

<template>
    <header class="header" :style="{ backgroundColor: backgroundColor}">
        <div class="header_content">
            <div class="logo">
                <a href="/" :style="{color: changeColor}">balance</a>
            </div>
            <nav class="menu">
                <ul>
                    <li>
                        <a v-if="isAuthenticated" href="/rating">Рейтинг</a>
                    </li>
                    <li>
                        <a v-if="isAuthenticated" href="/profile">Профиль</a>
                    </li>
                </ul>
            </nav>
            <a href="#" class="auth-link" :style="{color: changeColor}" @click.prevent="handleAuthAction">
                <template v-if="isAuthenticated">
                    <img src="@assets/icon_logout.svg" alt="logout">
                </template>

                <template v-else>
                    Вход
                </template>
            </a>
        </div>
    </header>
</template>

<style scoped>
    .header {
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: center;
    }

    .header_content {
        max-width: 1280px;
        display: flex;
        justify-content: space-between; 
        align-items: center;
        flex: 1;
        padding: 20px;
    }

    .logo a {
        font-size: 24px;
        font-weight: 700;
        text-transform: uppercase;
    }

    .menu ul {
        display: flex;
        gap: 15px;
        margin: 0;
        padding: 0;
    }

    .menu li {
        font-size: 16px;
    }

    .menu a {
        text-decoration: none;
        transition: color 0.3s;
    }

    .auth-link {
        text-decoration: none;
        font-size: 16px;
        cursor: pointer;
        transition: color 0.3s ease;
    }

</style>