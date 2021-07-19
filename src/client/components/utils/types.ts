
/**
 * Loadable wraps data to provide a simple helper type
 * for tracking status of request/action
 */
export type Loadable<T> =
  | { tag: 'idle' }
  | { tag: 'loading' }
  | { tag: 'success'; data: T }
  | { tag: 'error'; error: Error };


export type EmployeeName = {
  first: string;
  last: string;
  title: string;
};

export type EmployeePicture = {
  thumbnail: string;
  large?: string;
  medium?: string;
}

export type Employee = {
  id: string;
  name: EmployeeName;
  email: string;
  picture: EmployeePicture;
};

export type AllEmployeeData = {
  people: ReadonlyArray<Employee>;
}

export type EmployeeData = {
  person: Employee;
}
