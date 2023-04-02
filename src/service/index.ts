import dynamoDBClient from "../model";
import { TodoService }  from "./todo.service"

const todoService = new TodoService(dynamoDBClient());

export default todoService;
