<template>
    <div class="bg-white p-6 rounded-lg shadow">
        <h2 class="text-2xl font-bold mb-4">Financial DNA Questionnaire</h2>

        <div v-for="(question, index) in questions" :key="index" class="mb-6">
      <p class="font-medium mb-2">{{ question.text }}</p>
      <div class="flex space-x-4">
        <label v-for="option in 5" :key="option" class="flex items-center">
          <input 
            type="radio" 
            :name="`question-${index}`" 
            :value="option" 
            v-model="store.answers[question.strand]"
            class="mr-2" 
          />
          {{ option }}
        </label>
      </div>
    </div>

        <button @click="submitQuestionnaire" class="bg-primary text-white px-4 py-2 rounded hover:bg-primary-hover">
            Generate DNA Profile
        </button>
        <div v-if="store.showVisualization" class="mt-8">
      <h3 class="text-xl font-bold mb-4">Your Financial DNA Profile</h3>
      <DNAVisualization :dna-profile="store.dnaProfile" />
    </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import DNAVisualization from './DNAVisualization.vue';
import { FinancialDNA } from '@/models/FinancialDNA';
import { useFinancialDNAStore } from '@/stores/financialDNAStore';

const store = useFinancialDNAStore();
const showVisualization = ref(false);
const dnaProfile = ref(null);
const answers = ref({});

const questions = [
    {
        text: "How comfortable are you with financial risk?",
        strand: "riskTolerance"
    },
    {
        text: "How consistently do you save money?",
        strand: "savingBehavior"
    },
    {
        text: "How would you describe your spending style?",
        strand: "spendingStyle"
    },
    {
        text: "How do you approach investing?",
        strand: "investmentApproach"
    },
    {
        text: "How do you manage your debt?",
        strand: "debtManagement"
    },
    {
        text: "How important is financial security to you?",
        strand: "securityImportance"
    },
    {
        text: "How do you feel about debt?",
        strand: "debtAttitude"
    },

];

const submitQuestionnaire = () => {
    const dna = new FinancialDNA();
    dna.calculateProfile(store.answers);

    // Group results by category
    const categories = Object.entries(dna.categories).map(([name, data]) => ({
        name,
        color: data.color,
        strands: data.strands.map(strand => ({
            name: strand,
            value: dna.strands[strand]
        }))
    }));

    dnaProfile.value = { ...dna, categories };
    store.setDNAProfile(dnaProfile.value);

    store.showVisualization = true;
};

onMounted(() => {
    store.hydrate();
});
</script>