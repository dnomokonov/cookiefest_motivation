<script setup>
    import Header from '@components/TheHeader.vue'
    import Footer from '@components/TheFooter.vue'
    import Button from '@components/BaseButton.vue'
</script>

<template>
    <Header/>

    <div class="welcome_block">
        <div class="content">
            <div class="welcome_text">
                <h1>balance</h1>
                <h3>Современная система мотивации</h3>
                <p>Платформа, которая позволяет сотрудникам в режиме онлайн видеть результаты своего труда и заработанные показатели. </p>
                <Button titleButton="Приступить" style="width: 180px; height: 50px;"/>
            </div>
            <div class="welcome_preview">
                <img src="@assets/welcomeblock.png" alt="welcomeblock">
            </div>
        </div>
    </div>

    <div class="convenient_block">
        <div class="content">
            <div class="convenient_text">
                <h1>Удобная система<br><span></span>контроля доходов</h1>
                <p>
                    <span>
                        Система контроля дохода позволяет пользователю отслеживать историю своих продаж и сделок, видеть общее количество выполненных операций и суммарный доход за весь период работы.
                    </span>
                </p>
            </div>
            <div class="convenient_preview">
                <img src="@assets/people1.png" alt="people1">
            </div>
        </div>
        
    </div>

    <div class="rating_block">
        <div class="content">
            <div class="rating_text">
                <h1>Докажи всем, кто номер 1</h1>
                <p>
                    <span>
                        Система рейтинга отображает список лучших сотрудников, основанный на их достижениях.
                        <br>
                        <br>
                        Пользователи могут фильтровать рейтинг по количеству или обороту продаж за неделю, месяц или год, вдохновляясь результатами коллег и стремясь к новым высотам.
                    </span>
                </p>
            </div>
            <div class="rating_preview">
                <img src="@assets/upperGraphs.png" alt="upperGraphs">
            </div>
        </div>
    </div>

    <Footer/>
</template>

<style scoped>
    .welcome_block {
        width: 100%;
        height: 750px;
        display: flex;
        justify-content: center;
        background-color: #EFECE7;
    }

    .content {
        min-width: 1280px;
        display: flex;
        justify-content: space-between; 
        align-items: center;
    }

    .welcome_text {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
    }

    .welcome_text h1 {
        text-transform: uppercase;
        font-size: 90px;
    }

    .welcome_text h3 {
        margin-bottom: 20px;
        font-size: 30px;
        color: #394C60;
    }

    .welcome_text p {
        max-width: 450px;
        font-size: 18px;
        color: #6E7F91;
    }

    .welcome_preview img {
        width: 650px;
    }

    .convenient_block {
        width: 100%;
        height: 100vh;
        display: flex;
        justify-content: center;
    }

    .convenient_block .content {
        flex-direction: row-reverse;
    }

    .convenient_text h1 {
        font-size: 45px;
        margin-bottom: 10%;
    }

    .convenient_text h1 span {
        padding-left: 85px;
    }

    .convenient_text p {    
        height: 140px;
        display: flex;
        align-items: center;
        font-size: 18px;
        border-radius: 10px;
        padding: 15px;
        background-color: #EFECE7;
    }

    .convenient_text p span {
        display: inline-block;  
        max-width: 420px;
    }

    .convenient_preview img {
        width: 650px;
    }

    .rating_block {
        width: 100%;
        height: 100vh;
        display: flex;
        justify-content: center;
    }

    .rating_text h1 {
        font-size: 45px;
        margin-bottom: 15%;
    }

    .rating_text p {
        height: 220px;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        font-size: 18px;
        border-radius: 10px;
        padding: 15px;
        background-color: #EFECE7;
    }

    .rating_text p span {
        display: inline-block;  
        max-width: 500px;
    }

    .rating_preview img {
        width: 550px;
    }

</style>