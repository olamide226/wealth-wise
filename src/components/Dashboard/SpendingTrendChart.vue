<template>
    <div class="bg-white p-4 rounded-lg shadow">
        <h2 class="text-h2 text-foreground mb-4">Spending Trend</h2>
        <div class="w-full h-48">
            <Line :data="chartData" :options="chartOptions" />
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { Line } from 'vue-chartjs';
import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    LineElement,
    PointElement,
    CategoryScale,
    LinearScale,
} from 'chart.js';
import mockData from '@/mockData';

ChartJS.register(
    Title,
    Tooltip,
    Legend,
    LineElement,
    PointElement,
    CategoryScale,
    LinearScale
);

const chartData = ref({
    labels: [], // Will be filled with mock data labels
    datasets: [
        {
            label: 'Spending',
            data: [], // Will be filled with mock data
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1,
            backgroundColor: 'rgba(75, 192, 192, 0.2)', // Add fill color
        },
    ],
});

const chartOptions = ref({
    responsive: true,
    maintainAspectRatio: false,
    scales: {
        y: {
            beginAtZero: true,
        },
    },
    plugins: {
        legend: {
            display: false, // Hide legend for single dataset
        },
    },
});

onMounted(() => {
    // Load data from mockData
    chartData.value.labels = mockData.spendingTrend.labels;
    chartData.value.datasets[0].data = mockData.spendingTrend.data;
});
</script>