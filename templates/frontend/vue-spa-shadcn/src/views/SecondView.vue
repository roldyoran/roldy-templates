<template>
  <div class="container mx-auto p-6 max-w-2xl">
    <!-- Encabezado con descripción -->
    <div class="text-center mb-8">
      <h1 class="text-3xl font-bold tracking-tight mb-2">Pokédex Búsqueda</h1>
      <p class="text-muted-foreground">
        Busca cualquier Pokémon por su nombre y descubre sus características principales
      </p>
    </div>

    <!-- Formulario de búsqueda -->
    <Card class="mb-6">
      <CardHeader>
        <CardTitle class="text-lg">Buscar Pokémon</CardTitle>
      </CardHeader>
      <CardContent>
        <div class="flex items-center gap-3">
          <Input 
            v-model="pokemonName" 
            placeholder="Ej: pikachu, charizard, mewtwo..." 
            class="flex-1"
            :disabled="isLoading"
            @keyup.enter="fetchPokemon"
          />
          <Button 
            @click="fetchPokemon" 
            :disabled="isLoading || !pokemonName.trim()"
            class="min-w-[100px]"
          >
            <span v-if="isLoading" class="flex items-center gap-2">
              <div class="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
              Buscando...
            </span>
            <span v-else>Buscar</span>
          </Button>
        </div>
      </CardContent>
    </Card>

    <!-- Estado de error -->
    <div v-if="errorMessage" class="mb-6">
      <Card class="border-destructive">
        <CardContent class="pt-6">
          <div class="flex items-center gap-2 text-destructive">
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
            </svg>
            <span class="font-medium">{{ errorMessage }}</span>
          </div>
        </CardContent>
      </Card>
    </div>

    <!-- Información del Pokémon -->
    <div v-else-if="pokemonData">
      <Card>
        <CardHeader class="text-center pb-4">
          <div class="flex justify-center mb-4">
            <div class="relative">
              <img 
                :src="pokemonData.sprites.front_default" 
                :alt="pokemonData.name"
                class="w-32 h-32 object-contain bg-gray-50 rounded-full border-4 border-primary/20"
              />
              <Badge class="absolute -top-2 -right-2">
                #{{ pokemonData.id }}
              </Badge>
            </div>
          </div>
          <CardTitle class="text-2xl capitalize">{{ pokemonData.name }}</CardTitle>
        </CardHeader>
        
        <CardContent>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Estadísticas básicas -->
            <div class="space-y-4">
              <h3 class="font-semibold text-lg mb-3">Información Básica</h3>
              
              <div class="flex justify-between items-center p-3 bg-muted rounded-lg">
                <span class="font-medium">Altura:</span>
                <Badge variant="secondary">{{ (pokemonData.height / 10).toFixed(1) }} m</Badge>
              </div>
              
              <div class="flex justify-between items-center p-3 bg-muted rounded-lg">
                <span class="font-medium">Peso:</span>
                <Badge variant="secondary">{{ (pokemonData.weight / 10).toFixed(1) }} kg</Badge>
              </div>
              
              <div class="flex justify-between items-center p-3 bg-muted rounded-lg">
                <span class="font-medium">Experiencia Base:</span>
                <Badge variant="secondary">{{ pokemonData.base_experience }}</Badge>
              </div>
            </div>

            <!-- Tipos -->
            <div class="space-y-4">
              <h3 class="font-semibold text-lg mb-3">Tipos</h3>
              <div class="flex flex-wrap gap-2">
                <Badge 
                  v-for="type in pokemonData.types" 
                  :key="type.slot"
                  :class="getTypeColor(type.type.name)"
                  class="capitalize"
                >
                  {{ type.type.name }}
                </Badge>
              </div>

              <h3 class="font-semibold text-lg mb-3 mt-6">Habilidades</h3>
              <div class="space-y-2">
                <Badge 
                  v-for="ability in pokemonData.abilities" 
                  :key="ability.slot"
                  variant="outline"
                  class="capitalize block w-fit"
                >
                  {{ ability.ability.name.replace('-', ' ') }}
                  <span v-if="ability.is_hidden" class="ml-1 text-xs">(Oculta)</span>
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { getPokemon } from '@/requests';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

// Estado reactivo
const pokemonName = ref('');
const pokemonData = ref<any>(null);
const errorMessage = ref('');
const isLoading = ref(false);

// Función para obtener datos del Pokémon
const fetchPokemon = async () => {
  if (!pokemonName.value.trim()) return;
  
  isLoading.value = true;
  errorMessage.value = '';
  pokemonData.value = null;
  
  try {
    const data = await getPokemon(pokemonName.value.toLowerCase().trim());
    pokemonData.value = data;
  } catch (error) {
    errorMessage.value = 'No se encontró el Pokémon. Verifica el nombre e intenta nuevamente.';
    console.error('Error fetching Pokémon:', error);
  } finally {
    isLoading.value = false;
  }
};

// Función para obtener colores de tipos de Pokémon
const getTypeColor = (type: string): string => {
  const typeColors: Record<string, string> = {
    normal: 'bg-gray-400 hover:bg-gray-500',
    fire: 'bg-red-500 hover:bg-red-600',
    water: 'bg-blue-500 hover:bg-blue-600',
    electric: 'bg-yellow-400 hover:bg-yellow-500',
    grass: 'bg-green-500 hover:bg-green-600',
    ice: 'bg-blue-200 hover:bg-blue-300 text-gray-800',
    fighting: 'bg-red-700 hover:bg-red-800',
    poison: 'bg-purple-500 hover:bg-purple-600',
    ground: 'bg-yellow-600 hover:bg-yellow-700',
    flying: 'bg-indigo-400 hover:bg-indigo-500',
    psychic: 'bg-pink-500 hover:bg-pink-600',
    bug: 'bg-green-400 hover:bg-green-500',
    rock: 'bg-yellow-800 hover:bg-yellow-900',
    ghost: 'bg-purple-700 hover:bg-purple-800',
    dragon: 'bg-indigo-700 hover:bg-indigo-800',
    dark: 'bg-gray-800 hover:bg-gray-900',
    steel: 'bg-gray-500 hover:bg-gray-600',
    fairy: 'bg-pink-300 hover:bg-pink-400 text-gray-800'
  };
  
  return typeColors[type] || 'bg-gray-400 hover:bg-gray-500';
};
</script>

<style scoped>
</style>