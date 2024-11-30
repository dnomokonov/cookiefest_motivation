<script setup>
    import { ref } from 'vue'

    defineProps({
        titleButton : {
            type: String,
            default: 'click me'
        },
        backgroundColor : {
            type: String,
            default: '#A38970'
        },
        changeColor: {
            type: String,
            default: '#EFECE7'
        },
        hoverColor: {
            type: String,
            default: '#8B6F5B'
        },
        activeColor: {
            type: String,
            default: '#6D5644'
        }
    })

</script>

<template>
    <button 
        :style="{
            '--background-color': backgroundColor,
            '--hover-color': hoverColor,
            '--active-color': activeColor,
            '--text-color': changeColor
        }"> {{ titleButton }} </button>
</template>

<style scoped>
    button {
        border: none;
        border-radius: 8px;
        font-size: 15px;
        color: var(--text-color);
        background-color: var(--background-color);
        transition: background-color 0.3s ease, color 0.3s ease;
        cursor: pointer;   
    }

    button:hover {
        background-color: var(--hover-color);
    }

    button:active {
        background-color: var(--active-color);
    }

</style>