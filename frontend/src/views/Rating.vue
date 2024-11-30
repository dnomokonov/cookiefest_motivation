<script setup>
    import { ref, computed } from 'vue'
    import Header from '@components/TheHeader.vue'
    import TableOperation from '@components/BaseList.vue'

    const myRate = 0;

    const categories = ref([
        { id: 'overall', name: 'Общий рейтинг' },
        { id: 'branch', name: 'Среди филиала' },
        { id: 'branches', name: 'Среди филиалов' },
        { id: 'topSales', name: 'Топ продаж' },
        { id: 'topProfit', name: 'Топ по заработку' },
    ]);

    const columnHeaders = [
        { label: '№', key: 'id' },
        { label: 'Название', key: 'name' },
        { label: 'Контрагент', key: 'сontractor' },
        { label: 'Стоимость ₽', key: 'value' },
        { label: 'Заработок ₽', key: 'profit' },
    ]

    const operations = [
        { id: 1, name: 'Операция 1', сontractor: 'ООО Михаил', value: 5, profit: 1500 },
        { id: 2, name: 'Операция 2', сontractor: 'ООО Михаил', value: 2, profit: 800 },
        { id: 3, name: 'Операция 3', сontractor: 'ООО Михаил', value: 1, profit: 200 },
    ]

    const selectedCategory = ref('overall')

    const currentHeaders = computed(() => {
        return categories.value.find(category => category.id === selectedCategory.value)?.headers || []
    })

    const selectCategory = (categoryId) => {
        selectedCategory.value = categoryId
    }
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
                        <TableOperation :columnHeaders="columnHeaders" :tableData="operations" />
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