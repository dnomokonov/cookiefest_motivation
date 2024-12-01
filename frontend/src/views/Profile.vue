<script setup>
    import Header from '@components/TheHeader.vue'
    import Card from '@components/Card.vue'
    import TableOperation from '@components/BaseList.vue'

    const username = 'Михаил Мрих'
    const userbranch = 'sibgutis'
    
    const tableHeaders = [
        { key: 'id', label: '№1' },
        { key: 'name', label: 'Название' },
        { key: 'partner', label: 'Контрагент' },
        { key: 'cost', label: 'Стоимость (₽)' },
        { key: 'profit', label: 'Заработок (₽)' }
    ]

    const tableData = [
        { id: 1, name: 'Товар A', partner: 'ООО Рога и Копыта', cost: 5000, profit: 1200 },
        { id: 2, name: 'Товар B', partner: 'ИП Иванов', cost: 7000, profit: 1500 },
        { id: 3, name: 'Товар C', partner: 'ЗАО Пример', cost: 9000, profit: 1800 },
        { id: 4, name: 'Товар 21', partner: 'ООО Удача', cost: 12000, profit: 2100 },
        { id: 5, name: 'Товар М', partner: 'ООО Удача', cost: 12000, profit: 2100 },
        { id: 6, name: 'Товар Ф', partner: 'ООО Удача', cost: 12000, profit: 7100 },
        { id: 7, name: 'Товар Ы', partner: 'ООО Удача', cost: 13000, profit: 4100 },
        { id: 8, name: 'Товар D', partner: 'ООО Удача', cost: 15000, profit: 23100 },
        { id: 9, name: 'Товар 13', partner: 'ООО Удача', cost: 142000, profit: 4100 },
        { id: 10, name: 'Товар 42', partner: 'ООО Удача', cost: 11000, profit: 8100 },
        { id: 11, name: 'Товар ВЫФ', partner: 'ООО Удача', cost: 12000, profit: 1100 },
        { id: 12, name: 'Товар 23', partner: 'ООО Удача', cost: 12000, profit: 5100 },
    ]

    const totalTransactions = tableData.length
    const totalEarnings = tableData.reduce((sum, t) => sum + t.profit, 0)

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
                    <Card typeIconData="rub" titleCard="Заработано" :dataCard="totalEarnings"/>
                    <Card titleCard="Количество продаж" :dataCard="totalTransactions" typeIconData="box"/>
                </div>
            </div>
            <div class="lower_section">
                <div class="table-wrapper">
                    <p class="table_history">История сделок</p>
                    <TableOperation :columnHeaders="tableHeaders" :tableData="tableData" />
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