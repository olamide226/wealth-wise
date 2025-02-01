<template>
    <div class="relative w-full">
        <div v-if="!isInitialized" class="w-full h-[500px] flex items-center justify-center bg-gray-100">
            Loading DNA Visualization...
        </div>
        <div ref="container" class="w-full h-[500px] transition-opacity duration-300"
             :class="{ 'opacity-0': !isInitialized, 'opacity-100': isInitialized }"></div>
        <div v-if="error" class="absolute top-4 left-4 bg-red-100 text-red-600 p-2 rounded">
            {{ error }}
        </div>
        <!-- Legend: List each category and its strands -->
        <div class="absolute top-4 right-4 bg-white/80 p-2 rounded">
            <div v-if="props.dnaProfile.categories"
                 v-for="[categoryName, category] in Object.entries(props.dnaProfile.categories)" :key="categoryName"
                 class="mb-3">
                <div class="flex items-center mb-1">
                    <div :style="{ backgroundColor: category.color }" class="w-4 h-4 mr-2"></div>
                    <span class="text-sm font-bold">{{ categoryName.toUpperCase() }}</span>
                </div>
                <div v-for="strand in category.strands" :key="strand" class="flex items-center ml-6 mb-1">
                    <div :style="{ backgroundColor: category.color }" class="w-3 h-3 mr-2"></div>
                    <span class="text-xs">{{ strand }}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, watch, onBeforeUnmount } from 'vue';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const props = defineProps({
    dnaProfile: {
        type: Object,
        required: true
    }
});

const container = ref(null);
const isInitialized = ref(false);
const error = ref(null);
const defaultDimensions = { width: 800, height: 500 };
let scene, camera, renderer, controls;
let dnaGroup;

const init = () => {
    try {
        if (!container.value) throw new Error('Container not found');

        const width = container.value.clientWidth || defaultDimensions.width;
        const height = container.value.clientHeight || defaultDimensions.height;

        scene = new THREE.Scene();
        camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
        renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(width, height);
        renderer.setPixelRatio(window.devicePixelRatio);
        container.value.appendChild(renderer.domElement);

        controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;

        isInitialized.value = true;
        error.value = null;

        camera.position.z = 30;

        const light = new THREE.DirectionalLight(0xffffff, 1);
        light.position.set(10, 10, 10);
        scene.add(light);
        scene.add(new THREE.AmbientLight(0xffffff, 0.5));

        createDNA();
        animate();
    } catch (err) {
        error.value = err.message;
        console.error('Initialization error:', err);
    }
};

onBeforeUnmount(() => {
    window.removeEventListener('resize', handleResize);
    if (renderer) {
        renderer.dispose();
        if (container.value && container.value.contains(renderer.domElement)) {
            container.value.removeChild(renderer.domElement);
        }
    }
    if (controls) {
        controls.dispose();
    }
});

const createDNA = () => {
    if (dnaGroup) {
        scene.remove(dnaGroup);
        dnaGroup = null;
    }
    dnaGroup = new THREE.Group();
    const categories = Object.entries(props.dnaProfile.categories);
    const points = 100;
    const globalBaseRadius = 4;
    const height = 40;

    categories.forEach(([categoryName, category], catIndex) => {
        // Compute base radius offset for each category.
        const categoryRadius = globalBaseRadius + catIndex * 3;

        category.strands.forEach((strandName, index) => {
            const rawValue = props.dnaProfile.strands[strandName];
            const value = isNaN(rawValue) ? 0 : rawValue;
            const thickness = 0.2 + ((value || 0) / 100) * 0.8;

            for (let i = 0; i < points; i++) {
                const t = (i / points) * Math.PI * 4;
                const y = (i / points) * height - height / 2;

                const sphere = createSphere(thickness, new THREE.Color(category.color));
                positionInHelix(sphere, t, y, categoryRadius, index);
                dnaGroup.add(sphere);

                if (i % 10 === 0 && value > 60) {
                    const indicator = createValueIndicator(value, new THREE.Color(category.color));
                    positionInHelix(indicator, t, y, categoryRadius * 1.1, index);
                    dnaGroup.add(indicator);
                }

                if (i % 5 === 0) {
                    const rod = createConnectingRod(categoryRadius, t, y);
                    rod.position.x += 0.2 * index;
                    dnaGroup.add(rod);
                }
            }
        });
    });

    scene.add(dnaGroup);
};

const createSphere = (size, color) => {
    const geometry = new THREE.SphereGeometry(size, 16, 16);
    const material = new THREE.MeshPhongMaterial({
        color,
        emissive: color,
        emissiveIntensity: 0.2
    });
    return new THREE.Mesh(geometry, material);
};

const createValueIndicator = (value, color) => {
    const geometry = new THREE.ConeGeometry(0.3, 1, 8);
    const material = new THREE.MeshPhongMaterial({
        color,
        transparent: true,
        opacity: 0.6
    });
    return new THREE.Mesh(geometry, material);
};

const createConnectingRod = (radius, t, y) => {
    const validRadius = isNaN(radius) ? 4 : radius;
    t = t || 0;
    y = y || 0;
    const rodHeight = Math.max(validRadius * 2, 0.1);
    const rodGeometry = new THREE.CylinderGeometry(0.1, 0.1, rodHeight, 8, 1);
    const rodMaterial = new THREE.MeshPhongMaterial({
        color: 0xcccccc,
        transparent: true,
        opacity: 0.6,
        shininess: 30
    });
    const rod = new THREE.Mesh(rodGeometry, rodMaterial);
    rod.position.set(0, y, 0);
    rod.rotation.z = t;
    return rod;
};

const positionInHelix = (object, t, y, radius, index) => {
    if (!object || !radius || isNaN(radius)) return;
    t = t || 0;
    y = y || 0;
    index = index || 0;

    const x = Math.cos(t + (index * Math.PI)) * radius;
    const z = Math.sin(t + (index * Math.PI)) * radius;
    if (isFinite(x) && isFinite(y) && isFinite(z)) {
        object.position.set(x, y, z);
    } else {
        console.warn('Invalid computed position:', { x, y, z });
    }
};

const animate = () => {
    requestAnimationFrame(animate);
    controls.update();
    if (dnaGroup) {
        dnaGroup.rotation.y += 0.005;
    }
    renderer.render(scene, camera);
};

const handleResize = () => {
    if (!container.value) return;
    const width = container.value.clientWidth || defaultDimensions.width;
    const height = container.value.clientHeight || defaultDimensions.height;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
};

watch(() => props.dnaProfile.strands, createDNA, { deep: true });

onMounted(() => {
    init();
    window.addEventListener('resize', handleResize);
});
</script>