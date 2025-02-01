<template>
    <nav class="bg-primary p-4 text-white">
      <div class="container mx-auto flex justify-between items-center">
        <router-link to="/" class="text-lg font-bold">Wealth Wise</router-link>
        <!-- Hamburger menu icon (mobile) -->
        <button 
          class="md:hidden focus:outline-none" 
          @click="toggleMenu"
        >
          <svg v-if="!isMenuOpen" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
          <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <!-- Desktop Menu -->
        <ul class="hidden md:flex space-x-4">
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
      <!-- Mobile Menu -->
      <div v-if="isMenuOpen" class="md:hidden mt-2">
        <ul class="flex flex-col space-y-2">
          <li>
            <router-link to="/" class="block hover:text-primary-hover" @click="closeMenu">Dashboard</router-link>
          </li>
          <li>
            <router-link to="/transactions" class="block hover:text-primary-hover" @click="closeMenu">Transactions</router-link>
          </li>
          <li>
            <router-link to="/goals" class="block hover:text-primary-hover" @click="closeMenu">Goals</router-link>
          </li>
          <li>
            <router-link to="/financial-dna" class="block hover:text-primary-hover" @click="closeMenu">DNA</router-link>
          </li>
          <li>
            <router-link to="/chatbot" class="block hover:text-primary-hover" @click="closeMenu">AI Chatbot</router-link>
          </li>
          <li>
            <button @click="logout" class="block hover:text-primary-hover">
              Logout
            </button>
          </li>
        </ul>
      </div>
    </nav>
  </template>
  
  <script setup>
  import { ref, computed } from "vue";
  import { useRouter } from "vue-router";
  
  const router = useRouter();
  
  const isLoggedIn = computed(() => {
    return localStorage.getItem("isLoggedIn") === "true";
  });
  
  const isMenuOpen = ref(false);
  
  const toggleMenu = () => {
    isMenuOpen.value = !isMenuOpen.value;
  };
  
  const closeMenu = () => {
    isMenuOpen.value = false;
  };
  
  const logout = () => {
    localStorage.removeItem("isLoggedIn");
    // Optionally update local variable or trigger reactivity if needed
    router.push("/login"); // Redirect to login page
  };
  </script>