import axios from 'axios';
import { API_BASE_URL } from '../config/contants';

export const api = axios.create({
    baseURL: API_BASE_URL
});