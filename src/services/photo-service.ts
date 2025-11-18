import {Photo} from "../types/photo";
import axios, {AxiosResponse} from "axios";

const API_BASE_URL = 'https://picsum.photos';

export class PhotoService {
    static async getPhotos(): Promise<Photo[]> {
        try {
            const response: AxiosResponse =  await axios.get(`${API_BASE_URL}/v2/list?page=1&limit=100`);
            return response.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static async getPhoto(id: string): Promise<Photo> {
        try {
            const response: AxiosResponse = await axios.get(`${API_BASE_URL}/id/${id}/info`);
            return response.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}