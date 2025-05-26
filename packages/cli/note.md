Write README.md for me:

# esmate

Uncomplicate JavaScript

## fmt

Run prettier

bash esmate fmt

bash esmate fmt --fix

## lint

Run eslint

bash esmate lint

bash esmate lint --fix

## task

The task will be defined in package.json.

### series

json { "tasks": { "build": "tsc && vite build" } }

json { "tasks": { "build": ["tsc", "vite build"] } }

### parallel

json { "tasks": { "build": { "styles": "sass --watch input.scss output.css", "scripts": "tsc --watch" } } }
