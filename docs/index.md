# Overview

In this workshop, you learn how to build a serverless customer-facing microservices application demonstrating end-to-end authentication and authorization using Amazon Cognito, Amazon API Gateway, AWS Lambda, and all things AWS Identity and Access Management (IAM). You have the opportunity to build an end-to-end functional app with a secure identity provider showcasing user authentication patterns. 

* **Level**: Advanced
* **Duration**: 2 hours
* **<a href="https://www.nist.gov/cyberframework/online-learning/components-framework" target="_blank">CSF Functions</a>**: Protect
* **<a href="https://d0.awsstatic.com/whitepapers/AWS_CAF_Security_Perspective.pdf" target="_blank">CAF Components</a>**: Preventative
* **<a href="https://awssecworkshops.com/getting-started/" target="_blank">Prerequisites</a href>**: AWS Account, Admin IAM User
* **AWS Services**: <a href="https://aws.amazon.com/cognito/" target="_blank">Amazon Cognito</a>, <a href="https://aws.amazon.com/api-gateway/" target="_blank">Amazon API Gateway</a>, <a href="https://aws.amazon.com/lambda/" target="_blank">AWS Lambda</a>, <a href="https://aws.amazon.com/iam/" target="_blank">AWS IAM</a>

## Architecture

The microservices application you'll be building enables users to request unicorn rides from the Wild Rydes fleet. The application will present users with a user interface for signing-up, signing-in, indicating their location to request a ride, and managing their rider profile.

The application architecture demonstrates end-to-end authentication and authorization patterns through the use of **Amazon Cognito**, **Amazon API Gateway**, **AWS Lambda**, and **AWS IAM**. A single page <a href="https://reactjs.org/" target="_blank">React JS</a> web app hosts the HTML, CSS, and JavaScript to render the front-end which then connects to a public serverless backend API built using Amazon API Gateway and AWS Lambda. Amazon Cognito provides user identity management and authentication functions to secure the backend API. Finally, DynamoDB provides a persistence layer where data is stored and retrieved via the API's Lambda function.

See the diagram below for a depiction of the complete architecture.

![Wild Rydes Web Application Architecture](./images/wildrydes-complete-architecture2.png)

## Presentation deck
<a href="./images/SEC403.pdf" target="_blank">Workshop Presentation Deck</a>

## Modules

This workshop is split into multiple modules. Each module builds upon the previous module as you expand the Wild Rydes application. You must complete each module before proceeding to the next.

1. **User flows** - In this module, you will create a Cognito User Pool for identity management and user authentication and will integrate it with a pre-existing WildRydes React JS Web Application. You will also configure Cognito Identity Pools, which provides the ability to assume an Identity and Access Management (IAM) role from within an application.

2. **Backend authorization with Amazon API Gatway** - In this module, you will add a serverless backend to our Wild Rydes application leveraging API Gateway and Lambda. You will then enable authentication and authorization on your API to secure the backend to only accept valid, authorized requests.

3. **Retrieving and using temporary AWS credentials** - In this module, you will expand your Wild Rydes application by enabling profile management and profile photo management capabilities. Amazon Cognito will be used to store your user's profile information and attributes whereas Amazon S3 will store your user's profile pictures, with a link to the photo stored in the user's profile information.

4. **Cleanup** - To prevent your account from accruing additional charges, you'll go through and cleanup all the resources you've used for this workshop.

Proceed to the next module to setup your environment.

