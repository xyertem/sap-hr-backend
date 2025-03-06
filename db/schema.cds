namespace sap.hr.backend.db;

using {
    cuid,
    managed
} from '@sap/cds/common';


entity EmployeeScores : cuid, managed {
    key ID                 : UUID;
        employeeId         : String;
        employeeName       : String;
        employeeDepartment : String;
        employeeRole       : String;
        userScores         : Decimal(9, 2);
        userWeight         : Integer;
        departmentWeight   : Integer;
        departmentScore    : Decimal(9, 2);
        totalScore         : Decimal(9, 2);
        expanse            : String;
        performanceTitle   : String;
        title              : String(16);
        period             : String;
}
