<template>
    <div class="bg-white p-4 rounded-lg shadow">
        <h2 class="text-h2 text-foreground mb-4">Spending Trend</h2>
        <!-- Use the imported component's PascalCase name -->
        <ApexChart type="line" :options="chartOptions" :series="series" height="200"></ApexChart>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import ApexChart from 'vue3-apexcharts';
import mockData from '@/mockData';

const series = ref([]);
const chartOptions = ref({});

onMounted(() => {
    series.value = [
        {
            name: 'Spending',
            data: mockData.spendingTrend.data,
        }
    ];

    chartOptions.value = {
        chart: {
            id: 'spending-trend',
            toolbar: { show: false },
        },
        xaxis: {
            categories: mockData.spendingTrend.labels,
        },
        yaxis: {
            title: { text: 'Amount ($)' },
        },
        stroke: {
            curve: 'smooth'
        },
        tooltip: {
            enabled: true
        }
    };
});
</script>