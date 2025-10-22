read -p "Nama module: " module

base_dir="src/modules/$module"

mkdir -p $base_dir/{api,components,composables,schemas,services,stores,pages,routes}

# Capitalize first letter manually
capitalized_module=$(echo "$module" | awk '{print toupper(substr($0,1,1)) tolower(substr($0,2))}')

# Optional: buat file kosong supaya langsung terlihat strukturnya
touch "$base_dir/api/${module}Api.ts"
touch "$base_dir/pages/${capitalized_module}Pages.vue"
touch "$base_dir/components/${capitalized_module}Form.vue"
touch "$base_dir/composables/use${module}Form.ts"
touch "$base_dir/stores/${module}.ts"
touch "$base_dir/schemas/${module}Schema.ts"
touch "$base_dir/services/${module}Service.ts"
touch "$base_dir/routes/${module}Route.ts"

echo "✅ Module '$module' berhasil dibuat di $base_dir"