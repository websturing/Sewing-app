#!/bin/bash

read -p "Nama module: " module

base_dir="src/modules/$module"

mkdir -p $base_dir/{api,components,composables,schemas,services,stores,pages, routes}

# Optional: buat file kosong supaya langsung terlihat strukturnya
touch $base_dir/api/${module^}Api.ts
touch $base_dir/pages/${module^}Pages.vue
touch $base_dir/components/${module^}Form.vue
touch $base_dir/composables/use${module^}Form.ts
touch $base_dir/stores/${module}.ts
touch $base_dir/schemas/${module}Schema.ts
touch $base_dir/services/${module}Service.ts
touch $base_dir/routes/${module}Route.ts

echo "✅ Module '$module' berhasil dibuat di $base_dir"
