import axios from "axios";
import { Diary, DiaryEntryFormValues } from "./types";

const baseUrl = "http://localhost:3000/api/diaries";

export const getAllDiary = () => {
  return axios.get<Diary[]>(baseUrl).then((response) => response.data);
};

export const createDiaryEntry = (object: DiaryEntryFormValues) => {
  return axios.post<Diary>(baseUrl, object).then((response) => response.data);
};
