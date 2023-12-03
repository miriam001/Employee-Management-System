export const idlFactory = ({ IDL }) => {
  const Employee = IDL.Record({
    'id' : IDL.Text,
    'isEmployed' : IDL.Bool,
    'salary' : IDL.Float64,
    'updatedAt' : IDL.Opt(IDL.Nat64),
    'department' : IDL.Text,
    'position' : IDL.Text,
    'lastName' : IDL.Text,
    'firstName' : IDL.Text,
  });
  const _AzleResult = IDL.Variant({
    'Ok' : IDL.Opt(Employee),
    'Err' : IDL.Text,
  });
  const _AzleResult_1 = IDL.Variant({ 'Ok' : Employee, 'Err' : IDL.Text });
  const _AzleResult_2 = IDL.Variant({
    'Ok' : IDL.Vec(Employee),
    'Err' : IDL.Text,
  });
  return IDL.Service({
    'deleteEmployee' : IDL.Func([IDL.Text], [_AzleResult], []),
    'fireEmployee' : IDL.Func([IDL.Text], [_AzleResult_1], []),
    'getEmployee' : IDL.Func([IDL.Text], [_AzleResult_1], ['query']),
    'getEmployees' : IDL.Func([], [_AzleResult_2], ['query']),
    'hireEmployee' : IDL.Func([Employee], [_AzleResult_1], []),
    'searchEmployees' : IDL.Func([IDL.Text], [_AzleResult_2], ['query']),
    'updateEmployee' : IDL.Func([IDL.Text, Employee], [_AzleResult_1], []),
  });
};
export const init = ({ IDL }) => { return []; };
