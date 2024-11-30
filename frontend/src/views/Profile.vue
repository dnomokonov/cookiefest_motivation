<script setup>
    import Header from '@components/TheHeader.vue'
    import Card from '@components/Card.vue'
    import TableOperation from '@components/BaseList.vue'

    const username = 'Name Surname'
    const userbranch = 'sibgutis'

</script>

<template>
    <Header isAuthenticated="true" backgroundColor="#6E7F91" changeColor="#EFECE7"/>
    <div class="profile_block">
        <div class="content">
            <div class="upper_section">
                <div class="user_block">
                    <img class="avatar" src="@assets/avatar.jpg" alt="avatar">
                    <h3 class="username">{{ username }}</h3>
                    <p class="userbranch">{{ userbranch }}</p>
                </div>
                <div class="cards">
                    <Card typeIconData="rub"/>
                    <Card titleCard="Количество продаж" typeIconData="box"/>
                </div>
            </div>
            <div class="lower_section">
                <div class="table-wrapper">
                    <p class="table_history">История сделок</p>
                    <TableOperation />
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
    .profile_block {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
    }

    .profile_block .content {
        width: 100%;
        max-width: 1280px;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
    }

    .upper_section {
        width: 100%;
        height: 30vh;
        margin-top: 6vh;
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 15vh;
    }

    .upper_section .user_block {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .user_block .username {
        font-size: 25px;
        font-weight: 500;
        font-style: normal;
        margin-top: 10px;
    }

    .user_block .userbranch {
        width: 180px;
        font-size: 16px;
        word-break: break-all;
        text-align: center;
        margin: 0;
        padding: 8px 0; 
        color: #404040;
    }

    .user_block .avatar {
        width: 200px;
        padding: 5px;
        border: 4px solid #394C60;
        border-radius: 100%;
    }

    .upper_section .cards {
        display: flex;
        gap: 50px;
        margin-bottom: 40px;
    }

    .lower_section {
        width: 100%;
        height: 50vh;
        display: flex;
        justify-content: flex-end;
    }

    .table-wrapper .table_history {
        font-weight: 400;
        margin: 0;
    }

    .table-wrapper {
        width: auto;
        margin-left: auto;
    }

</style>