<script setup>
    import { ref, computed } from 'vue'

    const props = defineProps({
        columnHeaders: {
            type: Array,
            default: () => [],
        },
        tableData: {
            type: Array,
            default: () => [],
        },
    })

    const currentPage = ref(1)
    const itemsPerPage = ref(10)

    const paginatedData = computed(() => {
        const start = (currentPage.value - 1) * itemsPerPage.value
        const end = start + itemsPerPage.value
        return props.tableData.slice(start, end)
    })

    const totalPages = computed(() => Math.ceil(props.tableData.length / itemsPerPage.value))

    const goToPage = (page) => {
        if (page >= 1 && page <= totalPages.value) {
            currentPage.value = page
        }
    }
</script>

<template>
    <div class="table-container">
        <table>
            <thead>
                <tr>
                    <th v-for="(header, index) in columnHeaders" :key="index">
                        {{ header.label }}
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="row in paginatedData" :key="row.id">
                    <td 
                        v-for="(header, index) in columnHeaders" 
                        :key="index"
                    >
                        {{ row[header.key] }}
                    </td>
                </tr>
            </tbody>
        </table>

        <div class="pagination">
            <button 
                v-for="page in totalPages" 
                :key="page" 
                :class="{ active: page === currentPage }" 
                @click="goToPage(page)"
            >
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
        word-wrap: break-word;
        word-break: break-word;
        white-space: normal;
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
