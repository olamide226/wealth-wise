<template>
    <div class="bg-white p-4 rounded-lg shadow">
        <h2 class="text-h2 text-foreground mb-4">AI Chatbot</h2>
        <p class="text-gray-medium mb-4">
            Ask questions about your finances, budgeting, and get personalized advice.
        </p>
        <!-- <div class="mt-4 border border-gray-light rounded-lg p-4 h-64 overflow-y-auto" ref="chatContainer">
            <div v-for="message in messages" :key="message.id" class="flex flex-col space-y-2 mb-2">
                <div :class="message.sender === 'user'
                    ? 'bg-primary text-white p-2 rounded-lg self-end'
                    : 'bg-gray-light p-2 rounded-lg self-start'
                    ">
                    {{ message.text }}
                </div>
            </div>
        </div> -->
        <div class="h-full flex flex-col">
            <div ref="chatContainer" class="flex-1 overflow-y-auto p-4">
                <div v-for="message in store.messages" :key="message.id"
                    :class="message.sender === 'user' ? 'ml-auto bg-primary text-white' : 'mr-auto bg-gray-200'"
                    class="max-w-[70%] rounded-lg p-3 mb-4">
                    {{ message.text }}
                </div>
            </div>
        </div>
        <div class="mt-2 flex items-center">
            <input type="text" v-model="newMessage" class="flex-1 border border-gray-light rounded-lg p-2 mr-2"
                placeholder="Type your message here..." @keyup.enter="sendMessage" />
            <button class="bg-primary hover:bg-primary-hover text-white font-bold py-2 px-4 rounded"
                @click="sendMessage">
                Send
            </button>
        </div>
    </div>
</template>

<script setup>
import { ref, onUpdated, nextTick, reactive } from "vue";
import { useChatbotStore } from '@/stores/chatbotStore';
import { FinancialDNA } from '@/models/FinancialDNA';
import { 
    getTopCategory, 
    calculateSavingsRate, 
    getStrongestTrait,
    getSavingAdvice 
} from '@/utils/financialAnalysis';
import mockData from "@/mockData";

const messages = ref([]);
const newMessage = ref("");
const chatContainer = ref(null);
const store = useChatbotStore();
const dnaProfile = reactive(new FinancialDNA());


const sendMessage = () => {
    if (newMessage.value.trim() === "") return;
    const userMessage = newMessage.value;

    store.addMessage({
        text: userMessage,
        sender: "user"
    });

    // Simulate AI response after a short delay
    setTimeout(() => {
        store.addMessage({
            text: getAiResponse(userMessage),
            sender: "ai"
        });
    }, 500);

    newMessage.value = "";
};

const getAiResponse = (userMessage) => {
    const lowerCaseMessage = userMessage.toLowerCase();

    //  Find matching topic
    const matchedTopic = Object.entries(mockData.financialTopics).find(([_, keywords]) =>
        keywords.some(keyword => lowerCaseMessage.includes(keyword))
    )?.[0];

    if (matchedTopic) {
        const context = {
            transactions: mockData.transactions,
            dnaProfile: dnaProfile,
            goals: mockData.goals
        };

        const response = getResponseTemplate(matchedTopic, context);
        if (response) return response;
    }

    // Fallback responses for common queries
    if (lowerCaseMessage.includes('hello') || lowerCaseMessage.includes('hi')) {
        return "Hello! I'm your financial assistant. How can I help you today?";
    }

    if (lowerCaseMessage.includes('help')) {
        return "I can help you with: spending analysis, saving goals, investments, debt management, and your Financial DNA profile. What would you like to know about?";
    }

    return "I'm not sure I understand. Try asking about your spending, savings, investments, or Financial DNA profile.";
};

const getResponseTemplate = (topic, data) => {
        const templates = {
            SPENDING: () => {
                const total = data.transactions.reduce((sum, t) => sum + Math.abs(t.amount), 0);
                return `Your total spending is $${total}. The top category is ${getTopCategory(data.transactions)}.`;
            },
            SAVING: () => {
                const savingsRate = calculateSavingsRate(data.transactions);
                return `Your current savings rate is ${savingsRate}%. ${getSavingAdvice(savingsRate)}`;
            },
            DNA: () => {
                const strongestTrait = getStrongestTrait(data.dnaProfile);
                return `Based on your Financial DNA, your strongest trait is ${strongestTrait}. Would you like specific advice based on this?`;
            }
        };
        return templates[topic]?.() || null;
    };

// Function to analyze spending
const analyzeSpending = (transactions) => {
    let totalSpending = 0;
    transactions.forEach((transaction) => {
        if (transaction.amount < 0) {
            totalSpending += Math.abs(transaction.amount);
        }
    });

    return `Your total spending is $${totalSpending}. You might want to review your expenses.`;
};

// Function to analyze goals
const analyzeGoals = (goals) => {
    if (goals.length === 0) {
        return "You have not set any financial goals yet.";
    }

    const goal = goals[0]; // Focus on the first goal for simplicity
    const progress = (goal.currentAmount / goal.totalAmount) * 100;

    return `You are ${progress.toFixed(2)}% on your way to achieving your ${goal.name
        } goal.`;
};

// Function to analyze DNA profile
const analyzeDNAProfile = () => {
    const strongestTrait = Object.entries(dnaProfile.strands)
        .reduce((a, b) => a[1] > b[1] ? a : b)[0];

    return `Based on your Financial DNA profile, your strongest trait is ${strongestTrait}. 
    This suggests you excel at ${getTraitDescription(strongestTrait)}.`;
};

const getTraitDescription = (trait) => {
    const descriptions = {
        riskTolerance: "balancing risk and reward in financial decisions",
        savingBehavior: "maintaining consistent savings habits",
        spendingStyle: "making mindful spending choices",
        investmentApproach: "strategic investment planning",
        debtManagement: "managing and reducing debt effectively"
    };
    return descriptions[trait];
};

// Scroll to bottom when new messages are added
onUpdated(() => {
    nextTick(() => {
        if (chatContainer.value) {
            chatContainer.value.scrollTop = chatContainer.value.scrollHeight;
        }
    });
});
</script>