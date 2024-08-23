# Getting Started
## Dev Setup (VSCode/Docker version)
The easiest method to run our application is using Docker and VS Code. It's prefered that you run our backend container in a Dev Container within VS Code. This dev setup section provides these instructions.

1. Install Docker and VS Code
2. Within VS Code, install the "Dev Containers" extension, [VS Marketplace Link:](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers)
3. Copy `.envtemplate` into a new file `.env`. Make sure `.env` is in the same directory as `.envtemplate`. Change the values from the template as needed.
3. Create a `.devcontainer` directory under `clue_game_backend` directory. Create the following file, `devcontainer.json`, inside of `.devcontainer`. Copy the following code snippet into this new file. Change the contents as needed.
    ```
    // For format details, see https://aka.ms/devcontainer.json. For config options, see the
    // README at: https://github.com/devcontainers/templates/tree/main/src/docker-outside-of-docker
    {
        "name": "Clue Game Backend",
        "context": "..",
        "dockerFile": "../Dockerfile",
        "forwardPorts": [
            8000
        ],
        "runArgs": [
            "--network=host",
            "--name=clue-game-api-dev-container",
            "--env-file",
            ".devcontainer/devcontainer.env"
        ],
        "mounts": [
            "source=/var/run/docker.sock,target=/var/run/docker.sock,type=bind"
        ],
        "extensions": [
            "aaron-bond.better-comments",
            "augustocdias.tasks-shell-input", // Required to extend inputs property so that it supports the command property, some tasks require commands like list all migrations by app.
            // "batisteo.vscode-django",
            "bierner.markdown-shiki", // Highlights code in markdown preview to match the colors in text editor
            "christian-kohler.path-intellisense", // Autocompletes filenames
            "clemenspeters.format-json", // Formats JSON file contents
            "cweijan.vscode-database-client2", // Connect to databases from VSCode
            // "donjayamanne.python-environment-manager",
            "eamodio.gitlens", // Tracks git changes
            // "ecmel.vscode-html-css",
            "ericsia.pythonsnippets3", // Auto suggestion for Python3 syntax
            // "njqdev.vscode-python-typehint", // Is this really needed since I already have pythonsnippets3
            "formulahendry.auto-rename-tag", // Auto updates closing tag of the tag being editted
            "formulahendry.code-runner", // Ability to run highlighted code
            // "github.remotehub",
            "grapecity.gc-excelviewer", // Edit Excel spreadsheets and CSV files in Visual Studio Code
            "gruntfuggly.todo-tree", // Easily manage TODOs
            "gurumukhi.selected-lines-count",
            // "hbenl.vscode-test-explorer",
            "johnpapa.vscode-peacock", // Change color of VSCode window
            // "littlefoxteam.vscode-python-test-adapter",
            "mechatroner.rainbow-csv", // Auto, syntax color highlighter for csv files
            "mhutchie.git-graph",
            "mikestead.dotenv", // .env syntax color highlighter
            "ms-azuretools.vscode-docker",
            "ms-python.black-formatter", // Auto formats Python code to meet PEP 8 standards
            "ms-python.flake8", // A line wrapper that covers style, syntax, and complexity
            // "ms-python.isort",
            "ms-python.python",
            "ms-python.vscode-pylance",
            "ms-vscode-remote.remote-containers",
            "ms-vscode.cpptools",
            "ms-vscode.remote-repositories",
            "ms-vscode.test-adapter-converter",
            "ms-vsliveshare.vsliveshare", // Share screen
            // "naumovs.color-highlight", // css/html syntax color highlighter
            "njpwerner.autodocstring",
            "oderwat.indent-rainbow",
            "redhat.vscode-yaml",
            // "thiscodeworks.savecode",
            "visualstudioexptteam.intellicode-api-usage-examples", // Browse code that's similar to yours
            "visualstudioexptteam.vscodeintellicode",
            "yzhang.markdown-all-in-one"
        ],
    }
    ```
4. Second, within `.devcontainer` directory create another environment file, call it `devcontainer.env`. Inside of it copy the contents from `.env.template` and update `CLUE_GAME_DB_HOST` to be `localhost`
5. Re-open the `clue_game_backend` in a Dev Container (this is a VS Code command)

6. Next, create a directory called `.vscode`. Create this directory at the same level as `.devcontainer`. Inside of `.vscode` create a file called `settings.json`. Paste the following contents in it
    ```
    {
        "files.trimTrailingWhitespace": true,
        "editor.tabSize": 4,
        "editor.detectIndentation": false,
        // Extension settings
        "python.linting.lintOnSave": true,
        "python.linting.pylintEnabled": false,
        "autoDocstring.docstringFormat": "pep257",
        "python.formatting.provider": "black",
        "editor.formatOnSave": false, // enable per language
        "[python]": {
            "editor.defaultFormatter": "ms-python.black-formatter",
            "editor.formatOnSave": true,
        },
        "editor.defaultFormatter": "ms-python.black-formatter",
        "auto-rename-tag.activationOnLanguage": [
            "xml"
        ],
        "python.linting.flake8Enabled": true,
        "flake8.args": [
            "--max-line-length=120",
            "--ignore=E402,F841,F401,E302,E305",
            "--select=C,E,F,W,B,B950",
            "--exclude:.venv,build",
            "--ignore=E501,W503,E203,F541"
        ],
        "python.linting.flake8Args": [
            "--max-line-length=120",
            "--ignore=E402,F841,F401,E302,E305",
            "--select=C,E,F,W,B,B950",
            "--exclude:.venv,build",
            "--ignore=E501,W503,E203,F541"
        ],
        "black-formatter.args": [
            "--line-length",
            "120",
            "--target-version",
            "py37",
            "--exclude", "'/(\\.git|\\.venv|venv|)/'"
        ],
        "python.formatting.blackArgs": [
            "--line-length",
            "120",
            "--target-version",
            "py37",
            "--exclude", "'/(\\.git|\\.venv|venv|)/'"
        ],
        "[json]": {
            "editor.defaultFormatter": "vscode.json-language-features"
        },
    }
    ```

At this point, you are now working out of a container on the clue game backend code base. Any changes you make inside the container will automatically be reflected on your host machine. The next step is to spin up a container for the backend's Postgres database. Follow the steps below.

1. On your local machine, inside of the `clue_game_backend` directory, run the following command: `docker-compose up clue-game-db -d`. This command will ensure that the ClueGame database is running.
2. Next, inside of your dev container, open a terminal and run `python3 manage.py migrate`. This command will run all migration which have not been applied to your local Postgres database. If this is your first time running the command, expect 10-15 migrations to run.
3. Verify that the migrations did what they are supposed to do. To do so, within your dev container's terminal run `postgres://${CLUE_GAME_DB_USER}:${CLUE_GAME_DB_PASSWORD}@${CLUE_GAME_DB_HOST}:${CLUE_GAME_DB_PORT}/${CLUE_GAME_DB_NAME}`, followed by `\dt`. In the standard output, you should see "characters" table. FYI, the content of ${} in the database connection string can be found in the `.envtemplate` or your `.env` file.
4. To start our API move onto the next section

## Using Clue Game Api
Our API runs on port 8000 and the Postgres database runs on port 5432!

To use the modules in another Python application you'll need to install our Clue Game API's library. Follow these steps to leverage our `clue_game_api` code base.
1. \<tbd\>

If you want to only run our API and not extend or leverage it's modules, then run one of the following commands:
* `python3 -u manage.py runserver --verbosity 2 0.0.0.0:8000` (must be ran in your Dev Container)
* `docker-compose up clue-game-api -d`