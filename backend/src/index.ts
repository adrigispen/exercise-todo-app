import { createApp } from "./app";
import { TodoService } from "./services/todoService";

const todoService = new TodoService();
const app = createApp(todoService);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
