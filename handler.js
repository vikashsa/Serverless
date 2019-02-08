/*"use strict";

/*module.exports.hello = async (event, context) => {
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Go Serverless v1.0! Your function executed successfully!',
      input: event,
    }),
  };

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};  */

//const fs = require("fs");

//-----------------------------------------------------------

const AmazonCognitoIdentity = require("amazon-cognito-identity-js");
const CognitoUserPool = AmazonCognitoIdentity.CognitoUserPool;
const AWS = require("aws-sdk");
const request = require("request");
const url = require("url");
global.fetch = require("node-fetch");

const poolData = {
  UserPoolId: "us-east-2_N8ISmOsPL",
  ClientId: "65gpq60qfsn28a6gqs8n82b1um"
};
const pool_region = "us-east-1";

function Register(name1, password) {
  console.log(name1, password);
  var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
  var attributeList = [];
  var dataEmail = {
    Name: "email",
    Value: "email@mydomain.com"
  };

  var dataPhoneNumber = {
    Name: "phone_number",
    Value: "+15555555555"
  };
  var attributeEmail = new AmazonCognitoIdentity.CognitoUserAttribute(
    dataEmail
  );
  var attributePhoneNumber = new AmazonCognitoIdentity.CognitoUserAttribute(
    dataPhoneNumber
  );

  attributeList.push(attributeEmail);
  attributeList.push(attributePhoneNumber);

  userPool.signUp(name1, password, attributeList, null, function(err, result) {
    console.log(attributeList);
    console.log(name, password);
    if (err) {
      //alert(err.message || JSON.stringify(err));
      console.log("error occurred");
      return;
    }
    var cognitoUser = result.user;
    console.log("user name is " + cognitoUser.getUsername());
    return cognitoUser.getUsername();
  });
}

module.exports.hello = (event, context, callback) => {
  let name = event.queryStringParameters.name;
  let password = event.queryStringParameters.password;

  let result = Register(name, password);
  const response = { statusCode: 200, body: result };
  callback(null, response);
};
