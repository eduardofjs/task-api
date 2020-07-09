import { getRepository } from 'typeorm'
import { Tasks } from '../entity/Tasks'
import { Request, Response, request } from 'express'

export const getTasks = async (request: Request, response: Response) => {
    const tasks = await getRepository(Tasks).find()
    return response.json(tasks)
};

export const getTask = async (request: Request, response: Response) => {
    const { id } = request.params
    const task = await getRepository(Tasks).findOne(id)
    return response.json(task)
};

export const saveTask = async (request: Request, response: Response) => {
    const tasks =  await getRepository(Tasks).save(request.body)
    return response.json(tasks)
};

export const updateTask = async (request: Request, response: Response) => {
    const { id } = request.params

    const task = await getRepository(Tasks).update(id, request.body)

    if (task.affected === 1) {
        const taskUpadated = await getRepository(Tasks).findOne(id)
        return response.json(taskUpadated)
    }

    return response.status(404).json({message: "Task not found!"})
}

export const finishTask = async (request: Request, response: Response) => {
    const { id } = request.params

    const task = await getRepository(Tasks).update(id, {
        finished: true
    })

    if (task.affected === 1) {
        const taskUpadated = await getRepository(Tasks).findOne(id)
        return response.json(taskUpadated)
    }

    return response.status(404).json({message: "Task not found!"})
}