using { sap.hr.backend.db as Model } from '../db/schema';


service EmployeeScoresService @(path: '/EmployeeScores')  {

    entity EmployeeScores as projection on Model.EmployeeScores;
}