import type {ClassData} from "./type.ts";
import api from "../../../plugins/api.ts";

export const getClassListApi = async (): Promise<ClassData[]> => {
    const { data } = await api.get<ClassData[]>('/master/class/');
    return data;
};