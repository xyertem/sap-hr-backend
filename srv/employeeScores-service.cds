using { sap.hr.backend.db as Model } from '../db/schema';


service EmployeeService @(path: 'hr') @(imp:'employeeScores-service.js'){

    entity EmployeeScore as projection on Model.EmployeeScore;
    entity Employee as projection on Model.Employee;
    entity xd as projection on Model.Payroll;
    entity Attachment as projection on Model.Attachment;
}