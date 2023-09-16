import { Router } from "express";
import * as mongoDB from 'mongodb'

import { closeDatabaseConnection, collections, connectToDatabase } from "../services/server";

export const imgageProcessingRouter = Router();

imgageProcessingRouter.get('', async (req, res, next) => {
    // req = imagem, id do usuario, localização usuario
    const base64Image: string = req.query.base64Image as string;

    const buffer = Buffer.from(base64Image, 'base64');

    // envia para a API da IA que da o resultado

    const aiReponseDto: AiResponse = { result: true, type: AiApiResultEnum.Melanoma, acurracy: 0.8 }

    if (aiReponseDto.result) {
        // fetch no google maps usando o localização usuario
        let client: mongoDB.MongoClient | null = null

        try {
            client = await connectToDatabase()
            const user = collections.users
            // TODO - Pegar os top 15 consultórios mais próximos

            const doctorsList : Doctor[] = [];
            const imageProcessingResponse: ImageProcessingResponse = {
                AiReponse: aiReponseDto,
                Doctors: doctorsList
            };

            res
                .status(200)
                .send(imageProcessingResponse);

        } catch (error) {
            next(error)
        } finally {
            if (client) {
                await closeDatabaseConnection(client)
            }
        }
    }
})