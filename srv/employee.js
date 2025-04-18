const { array } = require('@sap/cds');
const { tx } = require('@sap/cds');
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
    

    srv.after('CREATE', Employee, async(req) => {
        
        const tx = db.tx();
        try {
            const payload = req;
            await tx.run(INSERT.into(Employee).entries(payload));
            tx.commit();
            //response.status(201);
        } catch (error) {
            tx.rollback();
            //response.send(error);
        }

    });
    // srv.after('DELETE', Employee, async() => {
    //     try {
    //         const tx = db.tx();
            
    //     } catch (error) {
            
    //     }

    // });
    // srv.before('UPDATE', Employee, async() => {
    //     try {
    //         const tx = db.tx();
            
    //     } catch (error) {
            
    //     }

    // });
    //nested read added
    srv.on('READ', Employee, async(req, res) => {
        const tx = db.tx();
        try {
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
            //response.send(error);
        }
    });
})