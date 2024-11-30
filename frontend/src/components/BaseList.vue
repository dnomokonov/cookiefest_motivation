<script setup>
    import { ref, computed } from 'vue'

    // Массив с данными для отображения в таблице
    const operations = ref([
        { id: 1, name: 'Операция 1', quantity: 5, profit: 1500 },
        { id: 2, name: 'Операция 2', quantity: 2, profit: 800 },
        { id: 3, name: 'Операция 3', quantity: 1, profit: 200 },
        { id: 4, name: 'Операция 4', quantity: 10, profit: 4000 },
        { id: 5, name: 'Операция 5', quantity: 7, profit: 2800 },
        { id: 6, name: 'Операция 6', quantity: 3, profit: 1200 },
        { id: 7, name: 'Операция 7', quantity: 8, profit: 3200 },
        { id: 8, name: 'Операция 8', quantity: 6, profit: 2400 },
        { id: 9, name: 'Операция 9', quantity: 4, profit: 1600 },
        { id: 10, name: 'Операция 10', quantity: 9, profit: 3600 },
        { id: 11, name: 'Операция 11', quantity: 5, profit: 1900 },
        { id: 12, name: 'Операция 12', quantity: 2, profit: 750 },
    ]);

    const currentPage = ref(1);
    const itemsPerPage = ref(10);

    const paginatedData = computed(() => {
        const start = (currentPage.value - 1) * itemsPerPage.value;
        const end = start + itemsPerPage.value;
        return operations.value.slice(start, end);
    });

    const totalPages = computed(() => Math.ceil(operations.value.length / itemsPerPage.value));

    const goToPage = (page) => {
        if (page >= 1 && page <= totalPages.value) {
            currentPage.value = page;
        }
    };

</script>

<template>
    <div class="table-container">
        <table>
            <thead>
                <tr>
                    <th>№</th>
                    <th>Название</th>
                    <th>Количество</th>
                    <th>Заработок</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="operation in paginatedData" :key="operation.id">
                    <td>{{ operation.id }}</td>
                    <td>{{ operation.name }}</td>
                    <td>{{ operation.quantity }}</td>
                    <td>{{ operation.profit }}</td>
                </tr>
            </tbody>
        </table>

        <div class="pagination">
            <button 
                v-for="page in totalPages" 
                :key="page" 
                :class="{ active: page === currentPage }" 
                @click="goToPage(page)">
                {{ page }}
            </button>
        </div>
    </div>
</template>

<style scoped>
    .table-container {
        width: 900px;
        max-width: 100%;
        margin: 20px auto;
        padding: 10px;
        border: 1px solid #ddd;
        border-radius: 8px;
        background-color: #f9f9f9;
    }

    table {
        width: 100%;
        border-collapse: collapse;
    }

    th, td {
        text-align: left;
        padding: 8px;
        border-bottom: 1px solid #ddd;
    }

    th {
        background-color: #6E7F91;
        color: #ffffff;
        font-weight: 500;
    }

    tr:hover {
        background-color: #f1f1f1;
    }

    tr:nth-child(even) {
        background-color: #f2f2f2;
    }

    .pagination {
        margin-top: 10px;
        display: flex;
        justify-content: center;
        gap: 5px;
    }

    .pagination button {
        padding: 5px 10px;
        background-color: #6E7F91;
        color: white;
        border: none;
        cursor: pointer;
    }

    .pagination button.active {
        background-color: #5A6B7A;
    }

</style>
