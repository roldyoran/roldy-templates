#!/usr/bin/env node
import prompts from "prompts";
import { execSync } from "child_process";
import fetch from "node-fetch";
import { green, cyan, yellow, red } from "kolorist";
import fs from "fs";

const TEMPLATE_INDEX = "https://raw.githubusercontent.com/roldyoran/roldy-templates/refs/heads/main/cli/create-roldy-app/templates.json";

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
  execSync(`npx degit ${repo} ${projectName}`, { stdio: "inherit" });
  console.log(yellow(`\n📦 Instalando dependencias para runtime: ${selected.runtime}...\n`));

  try {
    if (selected.runtime === "node") {
      const pm = selected.packageManager || "pnpm";
      execSync(`cd ${projectName} && ${pm} install`, { stdio: "inherit" });
    } else if (selected.runtime === "bun") {
      execSync(`cd ${projectName} && bun install`, { stdio: "inherit" });
    } else if (selected.runtime === "deno") {
      console.log(yellow("ℹ️ Deno no requiere instalación de dependencias (usa import maps)."));
    } else {
      console.log(yellow("⚙️ No se requiere instalación de dependencias."));
    }
  } catch (e) {
    console.error(red("❌ Error instalando dependencias:"), e);
  }



  console.log(green(`\n✅ Proyecto '${projectName}' creado con éxito.`));
  console.log(cyan(`\n👉 Siguientes pasos:`));
  console.log(`cd ${projectName}`);
  if (selected.runtime === "bun") console.log(`bun dev`);
  else if (selected.runtime === "deno") console.log(`deno task start`);
  else console.log(`${selected.packageManager || "pnpm"} dev`);

}

main().catch(err => console.error(err));
