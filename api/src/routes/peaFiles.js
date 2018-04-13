/*
 * European Variation Archive (EVA) - Open-access database of all types of genetic
 * variation data from all species
 *
 * Copyright 2018 EMBL - European Bioinformatics Institute
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var   mysql    = require('mysql'),
  express  = require('express'),
  _     = require('underscore'),
  router = express.Router();

// Database Connection
var pool = require('../db/pea');

router.get('/dac/get_downloaders_count', function (req, res, next) {
  pool.getConnection(function(err, connection) {
    if(!err){
      const sql = "SELECT count(distinct(p.account_stable_id)) as count,d.dac_stable_id, dc.description FROM account_permissions p\n" +
        "JOIN dataset d on d.stable_id = p.dataset_stable_id JOIN dac dc on dc.stable_id = d.dac_stable_id\n" +
        "where d.stable_id in (select stable_id from dataset where dac_stable_id in ('EGAC00001000135','EGAC00001000641','EGAC00001000010','EGAC00001000205','EGAC00001000165'))\n"+
        "group by d.dac_stable_id"
      connection.query(sql,[req.params.id], function(err, rows, fields) {
        connection.release();
        if (!err){
          var response = [];
          if (!_.isEmpty(rows)) {
            response = {
              status: 'success',
              count: rows.length,
              data: rows,
              message: ''
            }
          } else {
            response.push({'result' : 'error', 'msg' : 'No Results Found'});
            response = {
              status: 'error',
              msg: 'No Results Found'
            }
          }
          res.setHeader('Content-Type', 'application/json');
          res.status(200).send(JSON.stringify(response));
        } else {
          res.status(400).send(err);
        }
      });
    } else {
      res.status(400).send(err);
    }
  });

});


module.exports = router;
