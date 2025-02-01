<template>
    <nav class="bg-primary p-4 text-white">
        <div class="container mx-auto flex justify-between items-center">
            <router-link to="/" class="text-lg font-bold">Wealth Wise</router-link>
            <ul v-if="isLoggedIn" class="flex space-x-4">
                <li>
                    <router-link to="/" class="hover:text-primary-hover">Dashboard</router-link>
                </li>
                <li>
                    <router-link to="/transactions" class="hover:text-primary-hover">Transactions</router-link>
                </li>
                <li>
                    <router-link to="/goals" class="hover:text-primary-hover">Goals</router-link>
                </li>
                <li>
                    <router-link to="/financial-dna" class="hover:text-primary-hover">DNA</router-link>
                </li>
                <li>
                    <router-link to="/chatbot" class="hover:text-primary-hover">AI Chatbot</router-link>
                </li>
                <li>
                    <button @click="logout" class="hover:text-primary-hover">
                        Logout
                    </button>
                </li>
            </ul>
        </div>
    </nav>
</template>

<script setup>
import { useRouter } from "vue-router";
import { computed } from "vue";

const router = useRouter();

const isLoggedIn = computed(() => {
    return localStorage.getItem("isLoggedIn") === "true";
});

const logout = () => {
    localStorage.removeItem("isLoggedIn");
    isLoggedIn.value = false;
    router.push("/login"); // Redirect to login page
};
</script>