# LLM-DiscordBot

[![discord.js](https://img.shields.io/github/package-json/dependency-version/ainize-team/LLM-DiscordBot/discord.js)](https://discord.js.org/)
[![License](https://img.shields.io/badge/license-MIT-blue)](https://opensource.org/licenses/MIT)
![npm](https://img.shields.io/badge/npm-8.11.0-yellow)

Discord bot for LLM Prompt Engineering written with TypeScript

## Introduction

- This was created to make easier to use Large Language Model.
- And it was written to utilize [this](https://github.com/ainize-team/LLM-FastAPI/) API.
- It is easy to use because the command is entered with the slash command.
- Also, written in `typescript`, so code maintenance is easy.

## How to use

1. Clone this repo.

```shell
git clone https://github.com/ainize-team/LLM-DiscordBot.git
```

2. Install package

```shell
npm install -g yarn
yarn install
```

3. Edit `.env`
   > Before this process, your discord bot application must exist. [link](https://discord.com/developers/applications)  
   > In this page, you can find your token.

- Rename `sample.env` to `.env`
- Edit it appropriately
- sample
```
TOKEN='Your Token'
API_ENDPOINT='Your LLM api endpoint'
```

4. Execute your bot server

```shell
yarn start
```
