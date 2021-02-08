const { request, response } = require("express");
const MySql = require('../../libs/MySql');

module.exports = server => {
    // const commentsDB = require('../data/comments.json');
    // const commentsDB = server.data.comments;
    const controller = {};
    
    controller.list = (request, response) => {
        console.log(`\n${(new Date()).toJSON().replace('T', ' ')} - Access via GET: ${request.url}`);

        MySql.executeQuery(`SELECT * FROM comments`)
            .then(result => {    
                const commentsDB = {
                    data: result
                }

                response.status(200).json(commentsDB);
            });
    }

    controller.save = (request, response) => {
        console.log(`\n${(new Date()).toJSON().replace('T', ' ')} - Access via POST: ${request.url}`);

        MySql.executeQuery(`INSERT INTO comments (id, text) VALUES (NULL, '${request.body.text}')`)
            .then(result => {
                if (result.insertId && result.insertId > 0) {
                    MySql.executeQuery(`SELECT * FROM comments as c WHERE c.id = (SELECT MAX(id) FROM comments)`)
                    .then(subResult => {
                        response.status(201).json(subResult[0]);
                    });
                }                
            });
    }

    controller.delete = (request, response) => {
        console.log(`\n${(new Date()).toJSON().replace('T', ' ')} - Access via DELETE: ${request.url}`);

        const { commentId } = request.params;

        MySql.executeQuery(`DELETE FROM comments WHERE comments.id = ${commentId}`)
            .then(result => {    
                if (result.affectedRows && result.affectedRows > 0) {
                    response.status(200).json({
                        message: 'Comment successfully deleted',
                        success: true
                    });
                }
                else {
                    response.status(404).json({
                        message: 'Comment not found in database',
                        success: false
                    });
                }
            });
    }

    controller.update = (request, response) => {
        console.log(`\n${(new Date()).toJSON().replace('T', ' ')} - Access via PUT: ${request.url}`);

        const { commentId } = request.params;
        
        MySql.executeQuery(`UPDATE comments SET text = '${request.body.text}' WHERE comments.id = ${commentId}`)
            .then(result => {    
                if (result.affectedRows && result.affectedRows > 0) {                   
                    response.status(200).json({
                        message: 'Comment successfully updated',
                        success: true
                    });
                }
                else {
                    response.status(404).json({
                        message: 'Comment not found in database',
                        success: false
                    });
                }
            });        
    }
  
    return controller;
}