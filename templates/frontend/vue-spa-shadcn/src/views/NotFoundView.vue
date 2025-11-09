<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useRouter } from 'vue-router'

const router = useRouter()

const goBack = () => {
  if (window.history.length > 1) {
    router.go(-1)
  } else {
    router.push('/')
  }
}

const goHome = () => {
  router.push('/')
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center p-4">
    <div class="max-w-lg w-full">
      <Card class="text-center">
        <CardHeader class="space-y-4">
          <!-- Número 404 -->
          <div class="text-6xl md:text-8xl font-bold text-muted-foreground">
            404
          </div>
          
          <!-- Badge de estado -->
          <Badge variant="destructive" class="mx-auto">
            Página no encontrada
          </Badge>
          
          <!-- Título y descripción -->
          <div class="space-y-2">
            <CardTitle class="text-xl md:text-2xl">
              ¡Página no encontrada!
            </CardTitle>
            <CardDescription class="text-base">
              La página que buscas no existe o ha sido movida.
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent class="space-y-6">
          <!-- Botones de acción -->
          <div class="flex flex-col sm:flex-row gap-3 justify-center">
            <Button @click="goHome" class="w-full sm:w-auto">
              Ir al Inicio
            </Button>
            <Button @click="goBack" variant="outline" class="w-full sm:w-auto">
              Volver Atrás
            </Button>
          </div>

          <!-- Texto de ayuda -->
          <p class="text-sm text-muted-foreground pt-4 border-t">
            Verifica la URL o regresa a la página principal
          </p>
        </CardContent>
      </Card>
    </div>
  </div>
</template>

<style scoped>
/* Estilos adicionales si son necesarios */
</style>


