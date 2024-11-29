# Asistente en terminal con Hugging Face 🤖

## Descripción
Este proyecto es un asistente inteligente que funcionana directamente en la terminal, utilizando los modelos de Hugging Face. Está diseñado para mantener conversaciones naturales "con memoria" volatil, es decir, que no guarda información de conversaciones anteriores, y proporcionar respuestas útiles basadas en el rol que se le asigne.

## Características principales
- 🎯 Interfaz de terminal intuitiva.
- 🔄 Historial de conversación.
- 🌙 Indicador visual de "pensamiento" con animación lunar.
- 🎨 Interfaz colorida y amigable usando chalk.
- 🔐 Configuración segura mediante variables de entorno.

##  Configuración inicial
1. Clona el repositorio:
    ```bash
    git clone git@github.com:aledjv22/terminal-assistant.git # SSH
    # git clone https://github.com/aledjv22/terminal-assistant.git # HTTPS
    ```
2. Instala las dependencias:
    ```bash
    npm install
    ```
3. Configurar las variables de entorno:
   1. Crear un archivo `.env` basado en `.env.example`.
   2. Configura las siguientes variables:
        ```env
        HUGGING_FACE_TOKEN=tu_token_aquí (requerido)
        MODEL=modelo_a_usar (default: mistralai/Mixtral-8x7B-Instruct-v0.1)
        MAX_TOKENS=tokens_máximos (default: 1000)
        TEMPERATURE=temperatura (default: 0.1)
        SEED=semilla (default: 42)
        ROLE_SYSTEM_CONTENT=rol_del_asistente (default: '')
        ```

## Uso
1. Inicia el asistente:
    ```bash
    npm start
    ```
2. Interactúa con el asistente:
   1. Escribe tus preguntas o comentarios, las cuales aparecerán en azul.
   2. El asistente mostrará un indicador lunar mientras "piensa".
   3. Las respuestas aparecerán en verde.
3. Para salir puedes utilizar cualquieras de las siguientes palabras:
   1. exit
   2. salir
   3. chau
   4. bye
   5. adios
   6. quit
   7. q
   8. s
   9. goodbye

