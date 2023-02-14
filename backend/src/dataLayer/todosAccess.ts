import * as AWS from 'aws-sdk'
import { DocumentClient } from 'aws-sdk/clients/dynamodb'
import { createLogger } from '../utils/logger'
import { TodoItem } from '../models/TodoItem'
import { TodoUpdate } from '../models/TodoUpdate';

var AWSXRay = require('aws-xray-sdk');

const XAWS = AWSXRay.captureAWS(AWS)

const logger = createLogger('TodosAccess')

// TODO: Implement the dataLayer logic
export class TodosAccess {
  constructor(
    private readonly docClient: DocumentClient = new XAWS.DynamoDB.DocumentClient(),
    private readonly todosTable = process.env.TODOS_TABLE,
    private readonly todosIndex = process.env.INDEX_NAME
   ) {}

  async getAllTodos(userId: string): Promise<TodoItem[]> {
    
    logger.info('Retrieving all the todo functions.')

    const todos = await this.docClient.query({
      TableName: this.todosTable,
      IndexName: this.todosIndex,
      KeyConditionExpression: 'userId = :userId',
      ExpressionAttributeValues: { ':userId': userId }
    }).promise()

    const items = todos.Items 
    
    return items as TodoItem[]
  }

  async createTodoItem(todoItem: TodoItem): Promise<TodoItem> {

    logger.info('Creating a TodoItem.')

    const todo = await this.docClient.put({
      TableName: this.todosTable, Item: todoItem
    }).promise()

    logger.info('Todo Item Created', todo)

    return todoItem as TodoItem
  }

  async updateTodoItem(todoId: string, userId: string, todoUpdate: TodoUpdate): Promise<TodoUpdate> {

    logger.info('Updating a TodoItem.')

    const todo = await this.docClient.update({
      TableName: this.todosTable, 
      Key: { todoId, userId },
      UpdateExpression: 'set #name = :name, dueDate = :dueDate, done = :done',
      ExpressionAttributeValues: {
        ':name': todoUpdate.name, ':dueDate': todoUpdate.dueDate, ':done': todoUpdate.done
      },
      ExpressionAttributeNames: { '#name': 'name' },
      ReturnValues: 'ALL_NEW'
    }).promise()

    const todoItemUpdate = todo.Attributes

    logger.info('Todo Item Updated', todoItemUpdate)

    return todoItemUpdate as TodoUpdate
  }

  async deleteTodoItem(todoId: string, userId: string): Promise<string> {

    logger.info('Deleting a TodoItem')

    const todo = await this.docClient.delete({
      TableName: this.todosTable, Key: { todoId, userId }
    }).promise()

    logger.info('Todo Item Deleted', todo)

    return todoId as string
  }

  async updateTodoAttachmentUrl(todoId: string, userId: string, attachmentUrl: string): Promise<void> {

    logger.info('Updating the Todo Attachment Url.')

    await this.docClient.update({
      TableName: this.todosTable, Key: { todoId, userId }, 
      UpdateExpression: 'set attachmentUrl = :attachmentUrl',
      ExpressionAttributeValues: { ':attachmentUrl': attachmentUrl }
    }).promise()
  }

}