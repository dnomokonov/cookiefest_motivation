<script setup>
    import { ref, computed } from 'vue'
    import Header from '@components/TheHeader.vue'
    import TableOperation from '@components/BaseList.vue'

    const myRate = 1;

    const categories = ref([
        { id: 'overall', name: 'Общий рейтинг' },
        { id: 'branch', name: 'Среди филиала' },
        { id: 'branches', name: 'Среди филиалов' },
        { id: 'topSales', name: 'Топ продаж' },
        { id: 'topProfit', name: 'Топ по заработку' },
    ]);

    const columnHeaders = [
        { label: '№', key: 'id' },
        { label: 'Пользователей', key: 'name' },
        { label: 'Контрагент', key: 'сontractor' },
        { label: 'Заработок ₽', key: 'profit' },
    ];

    const operationsData = {
        overall: [
            { id: 1, name: 'User1', сontractor: 'ООО Михаил', value: 5, profit: 150000 },
            { id: 2, name: 'User2', сontractor: 'ООО Михаил', value: 2, profit: 80000 },
            { id: 3, name: 'User3', сontractor: 'ООО Михаил', value: 1, profit: 29000 },
            { id: 4, name: 'User4', сontractor: 'ООО Михаил', value: 1, profit: 25000 },
            { id: 5, name: 'User5', сontractor: 'ООО Михаил', value: 1, profit: 20010 },
            { id: 6, name: 'User6', сontractor: 'ООО Михаил', value: 1, profit: 12300 },
        ],
        branch: [
            { id: 1, name: 'Операция A', сontractor: 'ООО Иванов', value: 10, profit: 3000 },
            { id: 2, name: 'Операция B', сontractor: 'ООО Петров', value: 7, profit: 1200 },
        ],
        branches: [
            { id: 1, name: 'Филиал 1', сontractor: 'ООО Москва', value: 50, profit: 10000 },
            { id: 2, name: 'Филиал 2', сontractor: 'ООО Санкт-Петербург', value: 40, profit: 8000 },
        ],
        topSales: [
            { id: 1, name: 'Продажа X', сontractor: 'ООО Успех', value: 15, profit: 5000 },
            { id: 2, name: 'Продажа Y', сontractor: 'ООО Удача', value: 12, profit: 4500 },
        ],
        topProfit: [
            { id: 1, name: 'Заработок Q', сontractor: 'ООО Профит', value: 5, profit: 8000 },
            { id: 2, name: 'Заработок R', сontractor: 'ООО Резерв', value: 3, profit: 7000 },
        ],
    };

    const selectedCategory = ref('overall');

    const currentOperations = computed(() => {
        return operationsData[selectedCategory.value] || [];
    });

    const selectCategory = (categoryId) => {
        selectedCategory.value = categoryId;
    };
</script>

<template>
    <Header isAuthenticated="true" backgroundColor="#6E7F91" changeColor="#EFECE7"/>

    <div class="rating_block">
        <div class="content">
            <div class="upper_block">
                <div class="categories_block">
                    <h3>Категории</h3>
                    <ul class="categories_list">
                        <li 
                            v-for="category in categories" 
                            :key="category.id" 
                            :class="{ active: selectedCategory === category.id }"
                            @click="selectCategory(category.id)"
                            class="category_item">
                            {{ category.name }}
                        </li>
                    </ul>
                </div>
                <div class="user_rate_block">
                    <h3 class="rating_title">Рейтинг</h3>
                    <div class="rating_info">
                        <div class="rating_diamond">
                            <span class="rating_number">{{ myRate }}</span>
                        </div>
                        <p class="rating_text">Ваше место</p>
                    </div>
                </div>
            </div>
            <div class="lower_block">
                <div class="block_list_users">
                    <div class="table-wrapper">
                        <TableOperation :columnHeaders="columnHeaders" :tableData="currentOperations" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
    .rating_block {
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .rating_block .content {
        width: 100%;
        max-width: 1280px;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
    }

    .upper_block {
        width: 100%;
        position: relative;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        margin-top: 100px;
        z-index: 2;
    }

    .categories_block {
        width: 250px;
        border-radius: 10px;
        padding: 20px;
        background-color: #E9E9E9;
    }

    .categories_block h3 {
        font-size: 18px;
        font-weight: bold;
        margin-bottom: 15px;
        text-align: center;
    }

    .categories_list {
        list-style: none;
        padding: 0;
        margin: 0;
    }

    .category_item {
        font-size: 16px;
        padding: 10px;
        margin: 4px;
        border-radius: 5px;
        cursor: pointer;
        transition: background-color 0.3s;
    }

    .category_item:hover {
        background-color: #D6D6D6;
    }

    .category_item.active {
        font-weight: bold;
        background-color: #D6D6D6;
    }

    .user_rate_block {
        width: 100%;
        max-width: 920px;
        height: 20vh;
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 10px;
        background-color: #E9E9E9;
    }

    .rating_title {
        position: absolute;
        top: 15px;
        left: 15px;
        font-size: 22px;
        font-weight: bold;
    }

    .rating_info {
        position: absolute;
        display: flex;
        flex-direction: column;
        align-items: center;
        top: -20px;
    }

    .rating_diamond {
        width: 100px;
        height: 100px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 10px;
        margin-bottom: 10px;
        background-color: #A38970;
        transform: rotate(45deg);
    }

    .rating_number {
        font-size: 40px;
        font-weight: bold;
        color: white;
        transform: rotate(-45deg);
    }

    .rating_text {
        font-size: 16px;
        font-weight: 600;
        font-style: normal;
    }

    .lower_block {
        width: 100%;
        display: flex;
        justify-content: flex-end;
        margin-top: -60px;
        z-index: 1;
    }

</style>