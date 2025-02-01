<template>
    <div class="min-h-screen flex items-center justify-center bg-cover bg-center "
        :style="{ backgroundImage: `url(${backgroundImage})`, 'background-size': '100% 100%' }">
        <div class="bg-white bg-opacity-90 p-8 rounded-lg shadow-lg w-full max-w-md backdrop-blur-sm">
            <h1 class="text-h1 text-foreground text-center mb-6">Wealth Wise</h1>
            <h2 class="text-h2 text-foreground text-center mb-8">
                Welcome Back!
            </h2>
            <form @submit.prevent="login" class="space-y-6">
                <div>
                    <label for="username" class="block text-sm font-medium text-gray-medium mb-2">Username</label>
                    <input type="text" id="username" v-model="username" required
                        class="w-full px-4 py-3 border border-gray-light rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" />
                </div>
                <div>
                    <label for="password" class="block text-sm font-medium text-gray-medium mb-2">Password</label>
                    <input type="password" id="password" v-model="password" required
                        class="w-full px-4 py-3 border border-gray-light rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" />
                </div>
                <button type="submit"
                    class="w-full bg-primary hover:bg-primary-hover text-white font-bold py-3 px-4 rounded-lg transition duration-300">
                    Login
                </button>
            </form>
            <p v-if="errorMessage" class="text-red mt-4 text-center">
                {{ errorMessage }}
            </p>
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import backgroundImage from "@/assets/background-login.jpg"; // Import the image

const router = useRouter();
const username = ref("");
const password = ref("");
const errorMessage = ref("");

const login = () => {
    // Simulate a successful login
    if (username.value === "demo" && password.value === "password") {
        localStorage.setItem("isLoggedIn", "true");
        router.push("/");

        // Update the isLoggedIn state in the root component
        isLoggedIn.value = true;
    } else {
        errorMessage.value = "Invalid username or password";
    }
};
</script>