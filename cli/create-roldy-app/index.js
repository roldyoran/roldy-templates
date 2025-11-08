#!/usr/bin/env node
import prompts from "prompts";
import { execSync } from "child_process";
import fetch from "node-fetch";
import { green, cyan, yellow, red } from "kolorist";
import fs from "fs";

const TEMPLATE_INDEX = "https://raw.githubusercontent.com/rol-dev/templates-index/main/templates.json";

async function loadTemplates() {
  try {
    const res = await fetch(TEMPLATE_INDEX);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (err) {
    console.log(yellow("No se pudo obtener la lista remota de plantillas. Usando el archivo local templates.json..."));
    try {
      const localPath = new URL("./templates.json", import.meta.url);
      const raw = fs.readFileSync(localPath, "utf8");
      return JSON.parse(raw);
    } catch (e) {
      console.error(red("Error cargando templates local:"), e);
      throw e;
    }
  }
}

async function main() {
  console.log(green("✨ Bienvenido al generador roldy-templates ✨"));

  const templates = await loadTemplates();

  // Esperamos un JSON con la forma:
  // { categoria: { plantillaKey: { name, repo }, ... }, ... }
  const categoryChoices = Object.keys(templates).map(key => ({
    title: key.charAt(0).toUpperCase() + key.slice(1),
    value: key
  }));

  const { category } = await prompts({
    type: "select",
    name: "category",
    message: "¿Qué categoría de proyecto quieres crear?",
    choices: categoryChoices
  });

  if (!category) {
    console.log(yellow("Operación cancelada."));
    return;
  }

  const categoryTemplates = templates[category];
  if (!categoryTemplates || Object.keys(categoryTemplates).length === 0) {
    console.log(yellow("No hay plantillas disponibles para la categoría seleccionada."));
    return;
  }

  const templateChoices = Object.entries(categoryTemplates).map(([key, val]) => ({
    title: val.name || key,
    value: key
  }));

  const responses = await prompts([
    {
      type: "select",
      name: "templateKey",
      message: "Selecciona una plantilla:",
      choices: templateChoices
    },
    {
      type: "text",
      name: "projectName",
      message: "Nombre del proyecto:",
      initial: "mi-proyecto"
    }
  ]);

  const { templateKey, projectName } = responses;
  if (!templateKey || !projectName) {
    console.log(yellow("Operación cancelada."));
    return;
  }

  const selected = categoryTemplates[templateKey];
  const repo = selected?.repo;

  // if (true){
  //   console.log(selected);
  //   console.log(repo);
  //   return;
  // }

  if (!repo) {
    console.error(red("La plantilla seleccionada no tiene repositorio configurado."));
    return;
  }

  console.log(cyan(`\n🚀 Creando proyecto '${projectName}' desde ${repo}...\n`));

  try {
    execSync(`npx degit ${repo} ${projectName}`, { stdio: "inherit" });

    console.log(yellow("\n📦 Instalando dependencias..."));
    execSync(`cd ${projectName} && pnpm install`, { stdio: "inherit" });

    console.log(green(`\n✅ Proyecto '${projectName}' creado con éxito.`));
    console.log(cyan(`\n👉 Siguientes pasos:`));
    console.log(`cd ${projectName}`);
    console.log(`pnpm dev\n`);
  } catch (err) {
    console.error(red("Ocurrió un error al crear el proyecto:"), err);
  }
}

main().catch(err => console.error(err));
