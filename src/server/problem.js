import {baseApi} from '../server/api.js';
import {post} from "../server/api";
export const addProblem = p => post(baseApi+'/addProblem', p);
export const getProblem = p => post(baseApi+'/getProblems', p);
export const searchProblem = p => post(baseApi+'/searchProblem', p);
