const { array } = require('@sap/cds');
const cds = require('@sap/cds');


module.exports = cds.service.impl( async srv => {

    // Service Entities
    const {
        EmployeeScore,
        Employee,
        Payroll,
        Attachment
    } = srv.entities; 

    //Db connection
    const db = await cds.connect.to('db');
    

    srv.after('CREATE', Employee, async() => {
        try {
            const tx = db.tx();
            
        } catch (error) {
            
        }

    });
    srv.after('DELETE', Employee, async() => {
        try {
            const tx = db.tx();
            
        } catch (error) {
            
        }

    });
    srv.before('UPDATE', Employee, async() => {
        try {
            const tx = db.tx();
            
        } catch (error) {
            
        }

    });
    //nested read added
    srv.on('READ', Employee, async(req, res) => {
        try {
            const tx = db.tx();
            let expandParams = [];
            
            req.query.SELECT.columns.forEach(item => {
                if(item !== '*'){
                    expandParams.push(item?.ref[0]);  
                } 
            });     
            
            const result = await tx.run(SELECT.from('Employee', employee => {
                employee('*'),
                employee.score(score => {
                    score('*')
                }),
                employee.attachmentAss(attachment => {
                    attachment('*')
                }),
                employee.payrolls(payrolls => {
                    payrolls('*')
                })
            }))
            
            if(!expandParams.includes("score"))
                result.forEach(item => {
                    delete item.score
                });
            if(!expandParams.includes("attachmentAss"))
                result.forEach(item => {
                    delete item.attachmentAss;
                });  
            if(!expandParams.includes("payrolls"))
                result.forEach(item => {
                    delete item.payrolls;
                }); 

            return result;
        } catch (error) {
            req.reject(error);
        }
    });
})