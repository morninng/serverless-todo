import { DocumentClient } from "aws-sdk/clients/dynamodb";
import Todo from "../model/Todo";

export class TodoService {

  private Tablename: string = "TodosTable";

  constructor(private docClient: DocumentClient) { 
    console.log('TodoService constructor');
  }

  async getAllTodos(): Promise<Todo[]> {
    console.log('getAllTodos service');
    console.log('this.docClient', this.docClient);
    const todos = await this.docClient.scan({
      TableName: this.Tablename,
    }).promise()
    return todos.Items as Todo[];
 }

 async createTodo(todo: Todo): Promise<Todo> {
  console.log('createTodo', todo);
    await this.docClient.put({
      TableName: this.Tablename,
      Item: todo
    }).promise()
    return todo as Todo;

  }

  async getTodo(id: string): Promise<any> {

    const todo = await this.docClient.get({
      TableName: this.Tablename,
      Key: {
        todosId: id
      }
    }).promise()
    if (!todo.Item) {
        throw new Error("Id does not exit");
    }
    return todo.Item as Todo;
  }


  async updateTodo(id: string, todo: Partial<Todo>): Promise<Todo> {
    const updated = await this.docClient
        .update({
            TableName: this.Tablename,
            Key: { todosId: id },
            UpdateExpression:
                "set #status = :status",
            ExpressionAttributeNames: {
                "#status": "status",
            },
            ExpressionAttributeValues: {
                ":status": true,
            },
            ReturnValues: "ALL_NEW",
        })
        .promise();
    return updated.Attributes as Todo;
  }


}