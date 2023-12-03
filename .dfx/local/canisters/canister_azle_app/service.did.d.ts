import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

export interface Employee {
  'id' : string,
  'isEmployed' : boolean,
  'salary' : number,
  'updatedAt' : [] | [bigint],
  'department' : string,
  'position' : string,
  'lastName' : string,
  'firstName' : string,
}
export type _AzleResult = { 'Ok' : [] | [Employee] } |
  { 'Err' : string };
export type _AzleResult_1 = { 'Ok' : Employee } |
  { 'Err' : string };
export type _AzleResult_2 = { 'Ok' : Array<Employee> } |
  { 'Err' : string };
export interface _SERVICE {
  'deleteEmployee' : ActorMethod<[string], _AzleResult>,
  'fireEmployee' : ActorMethod<[string], _AzleResult_1>,
  'getEmployee' : ActorMethod<[string], _AzleResult_1>,
  'getEmployees' : ActorMethod<[], _AzleResult_2>,
  'hireEmployee' : ActorMethod<[Employee], _AzleResult_1>,
  'searchEmployees' : ActorMethod<[string], _AzleResult_2>,
  'updateEmployee' : ActorMethod<[string, Employee], _AzleResult_1>,
}
