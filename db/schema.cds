namespace sap.hr.backend.db;

using {
    cuid,
    managed
} from '@sap/cds/common';

entity Employee : cuid, managed {
    key ID                 : UUID;
    key employeeId         : String @title: '{i18n>employeeId}';
        employeeName       : String @title: '{i18n>employeeName}';
        employeeDepartment : String @title: '{i18n>employeeDepartment}';
        employeeRole       : String @title: '{i18n>employeeRole}';
        score              : Composition of many EmployeeScore
                                 on score.employee = $self;
        attachmentAss      : Composition of many Attachment
                                 on attachmentAss.employee = $self ;
        payrolls           : Association to many Payroll
                                 on payrolls.employee = $self;

}

entity EmployeeScore : cuid, managed {
    key ID               : UUID;
        userScores       : Decimal(9, 2) @title: '{i18n>userScores}';
        userWeight       : Integer       @title: '{i18n>userWeight}';
        departmentWeight : Integer       @title: '{i18n>departmentWeight}';
        departmentScore  : Decimal(9, 2) @title: '{i18n>departmentScore}';
        totalScore       : Decimal(9, 2) @title: '{i18n>totalScore}';
        expanse          : String        @title: '{i18n>expanse}';
        performanceTitle : String        @title: '{i18n>performanceTitle}';
        title            : String(16)    @title: '{i18n>title}';
        period           : String        @title: '{i18n>period}';
        employee         : Association to Employee;
}

//Attachment
entity Attachment : cuid {
    key ID         : UUID;
        filename   : String(255);
        mimetype   : String(100); 
        size       : Integer; 
        url        : String(1024);
        base64Data    : LargeBinary; 
        uploadedAt : Timestamp;
        uploadedBy : String(100);
        employee   : Association to Employee;
}

entity Payroll : cuid {
    key ID            : UUID;
        periodStart   : Date; 
        periodEnd     : Date; 
        baseSalary    : Decimal(15, 2); 
        bonus         : Decimal(15, 2); 
        deductions    : Decimal(15, 2); 
        netSalary     : Decimal(15, 2); 
        paymentDate   : Date; 
        paymentMethod : String(50); 
        status        : String(20); 
        createdAt     : Timestamp;
        createdBy     : String(100);
        employee      : Association to Employee; 
}
