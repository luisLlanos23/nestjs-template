# Server Template With NestJs

## Luis llanos Information
[![Linkedin](https://img.shields.io/badge/-LinkedIn-blue?style=flat&logo=Linkedin&logoColor=white)](https://www.linkedin.com/in/luis-alfonso-llanos-a64639206/)[![Github](https://img.shields.io/badge/-Github-000?style=flat&logo=Github&logoColor=white)](https://github.com/luisLlanos23)


## Environments Config:
1. Create .env file
2. config environments with the next template
```
DATABASE_HOST=
DATABASE_NAME=
DATABASE_SCHEMA=
DATABASE_PORT=
DATABASE_USER=
DATABASE_PASS=
PORT=
RUN_MIGRATIONS=
SECRET_TOKEN=
```
  __Note:__ To generate the migrations and run the migrations the Run_Migrations field in True can then be in false
## Resolve dependencies
```
npm install
```
or
```
npm install --save
```
# Build
```
npm run build
```
# Create Migration
```
npm run migration:generate
```
__note:__ This step is necessary if there is a new module in the API which has an entity, you must fill out migration with the table data.
# Run Server
1. Production Environment
```
npm run start
```

## SWAGGER Link
```
http://<your_host>:<sever_port>/docs/api
```
Example: http://localhost:8000/docs/api
## 📌 Languages and Tools
<code><img width="20%" src="https://www.vectorlogo.zone/logos/nodejs/nodejs-ar21.svg"></code><code><img width="20%" src="https://www.vectorlogo.zone/logos/nestjs/nestjs-ar21.svg"></code><code><code><img width="20%" src="https://www.vectorlogo.zone/logos/typescriptlang/typescriptlang-ar21.svg"></code><code><img width="20%" src="https://www.vectorlogo.zone/logos/postgresql/postgresql-ar21.svg"></code><code><img width="20%" src="https://www.vectorlogo.zone/logos/jestjsio/jestjsio-ar21.svg"></code><code><img width="20%" src="https://www.vectorlogo.zone/logos/git-scm/git-scm-ar21.svg"></code></code><code><img width=20% src="https://www.vectorlogo.zone/logos/terraformio/terraformio-ar21.svg"></code><code><img width="20%" src="https://www.vectorlogo.zone/logos/kubernetes/kubernetes-ar21.svg"></code><code><img width="20%" src="https://www.vectorlogo.zone/logos/docker/docker-ar21.svg"></code>