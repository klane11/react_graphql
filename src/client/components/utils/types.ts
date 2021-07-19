
/**
 * Loadable wraps data to provide a simple helper type
 * for tracking status of request/action
 */
export type Loadable<T> =
  | { tag: 'idle' }
  | { tag: 'loading' }
  | { tag: 'success'; data: T }
  | { tag: 'error'; error: Error };


export interface EmployeeName {
  first: string;
  last: string;
  title: string;
};

export interface EmployeePicture {
  thumbnail: string;
}

export interface Employee {
  id: number;
  name: EmployeeName;
  email: string;
  picture: EmployeePicture;
};

export interface AllEmployeeData {
  people: ReadonlyArray<Employee>;
}

export interface EmployeeData {
  person: Employee;
}
