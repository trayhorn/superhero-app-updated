import axios from "axios";

export const BASE_URL = "http://localhost:3000";

axios.defaults.baseURL = BASE_URL;

export const getAllHerousRequest = (page: number) => {
  return axios.get(`/superhero?page=${page}&limit=5`);
}

export const getHeroByIdRequest = (id: string) => {
  return axios.get(`/superhero/${id}`);
}

export const addHeroRequest = (body: FormData) => {
	return axios.post("/superhero/create", body);
};

export const deleteHeroRequest = (id: string) => {
  return axios.delete(`/superhero/${id}`);
}

export const editHeroRequest = (id: string, body: FormData) => {
	return axios.put(`/superhero/${id}`, body);
};