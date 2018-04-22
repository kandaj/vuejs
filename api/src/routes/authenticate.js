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
var express  = require('express'),
    _     = require('underscore'),
    router = express.Router(),
    axios = require('axios')


var http = axios.create({
  baseURL: 'http://ega-vault.ebi.ac.uk/ega_admin',
  withCredentials: true
});


router.post('/authenticate', authenticate);

function authenticate(req, res, next) {
  var loginData = {
    "username": req.body.username,
    "password": req.body.password
  }
  const headers = {
    'Content-Type': 'application/json',
  }
  var options = {
    headers
  }
  return http.post(`/test-login/user/token`,loginData,options)
    .then(response => {
        console.log(response)
    })
    .catch(e => {
      console.log(e)
    })
  // res.status(200)
  //   .json({
  //     status: 'success',
  //     message: 'test'
  //   });
}

function tokenToCompareFromLogin() {
  return axios.post(`/test-login/user/token`)
    .then(response => {
      if (response.data.token == tokenToCompareFromLogin) {
        console.log ("We are finally logged in","");
        loggedIn = true
        return loggedIn
      } else {
        console.log ("We are not logged in", "");
      }
      console.log('Token', response.data.token);
      console.log('Login', tokenToCompareFromLogin);
    })
    .catch(e => {
      console.log(e)
    })

}

module.exports = router;
