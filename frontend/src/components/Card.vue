<script setup>
    defineProps({
        titleCard: {
            type: String,
            default: 'Заработок'
        },
        dataCard: {
            type: Number,
            default: 0
        },
        typeIconData: {
            type: String,
            default: 'rub'
        }
    })

</script>

<template>
    <div class="card">
        <div class="card_body">
            <p class="card_title">{{ titleCard }}</p>
            <h1 class="card_info">{{ typeIconData === 'rub' ?  dataCard + '₽' : dataCard}}</h1>

            <template v-if="typeIconData === 'rub'">
                <img class="card_icon" src="@assets/rubles.svg" alt="rubles">
            </template>

            <template v-if="typeIconData === 'box'">
                <img class="card_icon" src="@assets/boxes.svg" alt="boxes">
            </template>
        </div>
    </div>
</template>

<style scoped>
    .card {
        display: flex;
    }

    .card_body {
        position: relative;
        width: 350px;
        height: 180px;
        border-radius: 15px;
        background: rgb(110,127,145);
        background: linear-gradient(60deg, rgba(110,127,145,1) 0%, rgba(57,76,96,1) 100%);
    }

    .card_icon {
        width: 30%;
        position: absolute;
        bottom: 0;
        right: 10px;
    }

    .card_title, .card_info {
        margin: 0;
        color: #FFFFFF;
    }

    .card_title {
        padding: 40px 10px 0px 40px;
        font-size: 18px;
    }

    .card_info {
        padding: 10px 0px 0px 40px;
        font-size: 45px;
    }
</style>