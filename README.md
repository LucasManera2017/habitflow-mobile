# 🌿 HabitFlow

O **HabitFlow** é um aplicativo móvel desenvolvido para ajudar usuários a monitorar e manter seus hábitos diários de forma intuitiva e eficiente. Com uma interface moderna e fluida, o app foca na experiência do usuário para garantir que a constância seja prioridade.

---

## 🚀 Tecnologias

Este projeto foi construído utilizando as seguintes tecnologias:

- **[React Native](https://reactnative.dev/)** — Framework para desenvolvimento mobile.
- **[Expo](https://expo.dev/)** — Plataforma para facilitar o desenvolvimento e deploy.
- **[NativeWind (Tailwind CSS)](https://www.nativewind.dev/)** — Estilização baseada em utilitários para React Native.
- **[Expo Router](https://docs.expo.dev/router/introduction/)** — Navegação baseada em arquivos.

---

## 📱 Telas e Funcionalidades

O fluxo do aplicativo foi desenhado para ser direto e motivador:

- **Get Started:** Tela de introdução e boas-vindas ao usuário.
- **Register/Login:** Fluxo de autenticação para proteger e sincronizar dados.
- **Dashboard:** Painel principal com visão geral da evolução e métricas.
- **Habits:** Gerenciamento de hábitos (criação, listagem e marcação de progresso).

---

## 📦 Instalação e Uso

Siga os passos abaixo para rodar o projeto em sua máquina:

1. **Clone o repositório:**

   ```bash
   git clone [https://github.com/seu-usuario/habitflow.git](https://github.com/seu-usuario/habitflow.git)
   cd habitflow

   ```

2. **Instale as dependências:**

   ```bash
   npm install

   ```

3. **Inicie o servidor do Expo:**

   ```bash
   npx expo start

   ```

4. **Abra no dispositivo:**
   - Use o Expo Go no seu celular (escaneie o QR Code).
   - Ou pressione a para Android Emulator ou i para iOS Simulator.

## 📂 Estrutura de Pastas

A estrutura básica baseada no **Expo Router**:

```text
├── app/                # Rotas e telas principais (File-based routing)
│   ├── index.tsx       # Tela Get Started
│   ├── (auth)/         # Grupo de rotas de autenticação (Login/Register)
│   └── (tabs)/         # Grupo de rotas principais (Dashboard/Habits)
├── components/         # Componentes reutilizáveis
├── constants/          # Cores e configurações globais
├── styles/             # Configurações do NativeWind (global.css)
└── tailwind.config.js  # Configuração do Tailwind CSS
```

## 🎨 Estilização com NativeWind

O projeto utiliza **NativeWind**, permitindo o uso de classes do Tailwind CSS diretamente nos componentes de forma declarativa:

```tsx
<View className="flex-1 items-center justify-center bg-green-50">
  <Text className="text-2xl font-bold text-green-900">HabitFlow</Text>
</View>
```

## 🤝 Contribuindo

Contribuições tornam a comunidade open source um lugar incrível para aprender e criar. Siga os passos abaixo:

1. **Faça um Fork do projeto.**
2. **Crie uma Branch para sua feature:**

```bash
   npm install
```

3. **Dê um Commit nas suas alterações:**

```bash
  git commit -m 'Add: Nova Feature'
```

4. **Faça um Push para a Branch:**

```bash
  git push origin feature/NovaFeature
```

5. **Abra um Pull Request.**

```
  Deseja que eu adicione uma seção de "Pré-requisitos" com as versões necessárias do Node.js e Java para rodar o ambiente Android?
```

## 📄 Licença

Este projeto está sob a licença **MIT**. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.