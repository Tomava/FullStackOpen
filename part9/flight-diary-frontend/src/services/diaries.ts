import axios from "axios"
import { DiaryEntry } from "../types"
const baseUrl = '/api/diaries'
axios.defaults.baseURL = "http://localhost:3000";

const getAll = async (): Promise<DiaryEntry[]> => {
  const response = await axios.get(baseUrl)
  return response.data;
}

const add = async (newDiary: DiaryEntry) => {
  const response = await axios.post(baseUrl, newDiary)
  return response.data
}

export default { getAll, add }