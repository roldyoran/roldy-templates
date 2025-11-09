<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { 
  Rocket, 
  Zap, 
  Shield, 
  Code, 
  Github, 
  ExternalLink,
  Star,
  Users,
  Cpu
} from 'lucide-vue-next'
</script>

<template>
  <div class="min-h-screen bg-background">
    <!-- Hero Section -->
    <section class="relative overflow-hidden">
      <div class="container mx-auto px-4 py-16 md:py-24">
        <div class="text-center space-y-8">
          <div class="flex justify-center">
            <Badge variant="secondary" class="px-3 py-1">
              <Rocket class="w-4 h-4 mr-2" />
              Vue 3 + TypeScript + Shadcn-vue + Vite + Axios
            </Badge>
          </div>
          
          <h1 class="text-4xl md:text-6xl font-bold tracking-tight text-foreground">
            Bienvenido a 
            <span class="text-primary">
              Vue SPA
            </span>
          </h1>
          
          <p class="text-xl text-muted-foreground max-w-2xl mx-auto">
            Una plantilla moderna para uso rápido construida con Vue 3, TypeScript, shadcn-vue y Axios. 
            Lista para crear experiencias de usuario increíbles.
          </p>
          
          <div class="flex flex-wrap justify-center gap-4">
            <Button as-child size="lg" class="gap-2">
              <RouterLink to="/second" class="flex items-center gap-2">
                <Star class="w-5 h-5" />
                Comenzar
              </RouterLink>
            </Button>
            <Button variant="outline" size="lg" class="gap-2">
              <a href="https://github.com/roldyoran/roldy-templates" target="_blank" rel="noopener noreferrer" class="flex items-center gap-2"> 

                <Github class="w-5 h-5" />
                Ver en GitHub
                <ExternalLink class="w-4 h-4" />
              </a>
            </Button>
          </div>
        </div>
      </div>
      

    </section>

    <Separator class="my-8" />

    <!-- Features Section -->
    <section class="container mx-auto px-4 py-16">
      <div class="text-center mb-12">
        <h2 class="text-3xl font-bold text-foreground mb-4">
          Construido con Tecnologías Modernas
        </h2>
        <p class="text-muted-foreground max-w-2xl mx-auto">
          Esta plantilla incluye todo lo que necesitas para construir una aplicación Vue lista para producción.
        </p>
      </div>

      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card class="hover:shadow-lg transition-shadow">
          <CardHeader>
            <div class="flex items-center gap-3">
              <div class="p-2 bg-muted rounded-lg">
                <Zap class="w-6 h-6" />
              </div>
              <CardTitle class="text-xl">Súper Rápido</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <CardDescription class="text-base">
              Impulsado por Vite para reemplazo de módulos instantáneo y builds de producción optimizados.
            </CardDescription>
          </CardContent>
        </Card>

        <Card class="hover:shadow-lg transition-shadow">
          <CardHeader>
            <div class="flex items-center gap-3">
              <div class="p-2 bg-muted rounded-lg">
                <Shield class="w-6 h-6" />
              </div>
              <CardTitle class="text-xl">Tipado Seguro</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <CardDescription class="text-base">
              Construido con TypeScript para una mejor experiencia de desarrollo y menos errores en tiempo de ejecución.
            </CardDescription>
          </CardContent>
        </Card>

        <Card class="hover:shadow-lg transition-shadow">
          <CardHeader>
            <div class="flex items-center gap-3">
              <div class="p-2 bg-muted rounded-lg">
                <Cpu class="w-6 h-6" />
              </div>
              <CardTitle class="text-xl">UI Moderna</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <CardDescription class="text-base">
              Componentes hermosos de shadcn-vue y Tailwind CSS para desarrollo de interfaces rápido.
            </CardDescription>
          </CardContent>
        </Card>
      </div>
    </section>

    <Separator class="my-8" />

    <!-- Stats Section -->
    <section class="container mx-auto px-4 py-16">
      <div class="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        <div class="space-y-2">
          <div class="text-3xl font-bold text-foreground">Vue 3</div>
          <div class="text-muted-foreground">Composition API</div>
        </div>
        <div class="space-y-2">
          <div class="text-3xl font-bold text-foreground">TypeScript</div>
          <div class="text-muted-foreground">Tipado Seguro</div>
        </div>
        <div class="space-y-2">
          <div class="text-3xl font-bold text-foreground">Vite</div>
          <div class="text-muted-foreground">Herramienta de Build</div>
        </div>
        <div class="space-y-2">
          <div class="text-3xl font-bold text-foreground">Axios</div>
          <div class="text-muted-foreground">Cliente HTTP</div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="border-t bg-muted/50">
      <div class="container mx-auto px-4 py-8">
        <div class="text-center text-muted-foreground">
          <p>Construido con ❤️ usando Vue 3, TypeScript, shadcn-vue y Axios</p>
        </div>
      </div>
    </footer>
  </div>
</template>
