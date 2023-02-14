import { TodosAccess } from '../dataLayer/todosAccess';
import { AttachmentUtils } from '../helpers/attachmentUtils';
import { TodoItem } from '../models/TodoItem';
import { CreateTodoRequest } from '../requests/CreateTodoRequest';
import { UpdateTodoRequest } from '../requests/UpdateTodoRequest';
import { createLogger } from '../utils/logger';
import * as uuid from 'uuid';
import { TodoUpdate } from '../models/TodoUpdate';

// TODO: Implement businessLogic
const logger = createLogger('TodosAccess')

const attachmentUtils = new AttachmentUtils()

const todosAccess = new TodosAccess()

// write get todos function
export async function getTodos(userId: string): Promise<TodoItem[]> {

  logger.info("Getting all the todos for a user.")

  return todosAccess.getAllTodos(userId)
}

export async function createTodo(newTodo: CreateTodoRequest, userId: string): Promise<TodoItem> {

  logger.info('Calling the Create Todo function.')

  const todoId = uuid.v4()

  const createdAt = new Date().toISOString()

  const s3AttachmentUrl = attachmentUtils.getAttachmentUrl(todoId)

  const newItem = { userId, todoId, createdAt, done: false, attachmentUrl: s3AttachmentUrl, ...newTodo }

  return await todosAccess.createTodoItem(newItem)
}

export async function updateTodo(todoId: string, todoUpdate: UpdateTodoRequest, userId: string): 
 Promise<TodoUpdate> {

  logger.info('Calling the Update Todo function.')

  return todosAccess.updateTodoItem(todoId, userId, todoUpdate)
} 

export async function deleteTodo(todoId: string, userId: string): Promise<string> {

  logger.info('Calling the Delete todo function.')

  return todosAccess.deleteTodoItem(todoId, userId)
}

export async function createAttachmentPresignedUrl(todoId: string, userId: string): Promise<string> {

  logger.info('Calling the Presigned URL', userId, todoId)

  return attachmentUtils.getUploadUrl(todoId)
}