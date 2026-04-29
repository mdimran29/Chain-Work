@AGENTS.md
# Agent Overview
This project uses multiple specialized agents (LLMs) to handle different parts of the workflow, ensuring that complex tasks are broken down into manageable, specialized components.

## 🛠️ System-Agent
**Role**: Orchestrator and Code Generator
**Trigger**: User commands
**Responsibility**: Parses user requests and assigns tasks to appropriate specialized agents. It writes code based on the requirements and plans future steps. When the user updates the project goals, the System Agent reviews and updates the `requirements.md` file.

### Key Files
- `CLAUDE.md`: System Agent instructions and workflow.
- `requirements.md`: Current project requirements and goals.
- `task.md`: Generated task list for the workflow.

## 🎨 Visual-Agent
**Role**: UI/UX and Frontend Development
**Trigger**: When changes are needed in the UI
**Responsibility**: Writes, edits, and updates HTML, CSS, and JavaScript code for the user interface. Creates high-fidelity mockups (Figma) and modern, responsive designs. Manages image assets and styling.

### Key Files
- `index.html`: Main HTML structure and frontend code.
- `style.css`: Stylesheet for the application.
- `script.js`: Frontend logic and interactions.
- `design-spec.html`: Design specifications and mockups.

## 🧩 Tech-Agent
**Role**: Backend and Logic Development
**Trigger**: Complex business logic or backend tasks
**Responsibility**: Develops backend logic, database interactions, and complex algorithms. Integrates external APIs and services. Ensures data flow and application logic are robust and efficient.

### Key Files
- `app.js`: Backend application logic.
- `database.js`: Database connection and query handlers.
- `utils.js`: Utility functions and helpers.

## 📁 Auto-Agent
**Role**: File and Data Management
**Trigger**: File creation or organization tasks
**Responsibility**: Creates and manages project directories and files. Ensures proper file organization and structure according to project requirements.

### Key Files
- `index.js`: Entry point for automation scripts.
- `file-structure.json`: Configuration for file structure.

## 🚀 Test-Agent
**Role**: Quality Assurance
**Trigger**: Testing or debugging tasks
**Responsibility**: Designs test cases, runs tests, and identifies bugs. Provides solutions and improvements to ensure code quality and prevent regressions.

### Key Files
- `test-runner.js`: Test execution and reporting.
- `test-cases.json`: Test case definitions.

## 📝 Content-Agent
**Role**: Content Creation
**Trigger**: Content generation or writing tasks
**Responsibility**: Creates and edits textual content for the application, including descriptions, documentation, and marketing copy.
