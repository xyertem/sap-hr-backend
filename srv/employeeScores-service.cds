using { sap.hr.backend.db as Model } from '../db/schema';


service EmployeeScoresService @(path: 'hr')  {

    entity EmployeeScores as projection on Model.EmployeeScores;
}