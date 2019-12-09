# Module 1 <small> EXT 1 - Lambda Triggers</small>

**Time**: 10 minutes

Your current configuration supports a fairly generic user sign-up and sign-in flow.  If you have unique requirments for customized flows, you can leverage the built Lambda triggers.  These will trigger AWS Lambda functions during user pool operation such as user sign-up, confirmation, and sign-in.  You add authentication challenges, migrate users, and customize verification messages.

## Pre sign-up validation

Use the Lambda triggers to validate the email domain of the user to ensure it's a user from an approved domain prior to allowing them to sign-up.

1. Open the <a href="https://console.aws.amazon.com/lambda/home?" target="_blank">AWS Lambda</a> console.

2. Choose the **serverless-idm-wksp-pre-sign-up** function.

    !!! info     "The function was automatically created as part of the environment configuration CloudFormation template but is missing the application code."

3. Copy and paste the code below and save your function:

```python
from __future__ import print_function

def lambda_handler(event, context):

    # Log event
    print(event)

    # Set the user pool confirmation flags (you can user these to automatically confirm and a user and associated attributes)
    event['response']['autoConfirmUser'] = False
    event['response']['autoVerifyEmail'] = False
    event['response']['autoVerifyPhone'] = False

    # Set whitelisted domains
    domains = ["example.com"]

    # Split the email address so we can compare domains
    address = event['request']['userAttributes']['email'].split('@')

    # Validate the user is from a whitelisted domain'
    if address[1] in domains:
        print('Pre Sign Up validation succeeded for %s' % event['userName'])
    else:
        print('Pre Sign Up validation failed for %s' % event['userName'])
        raise Exception("Cannot sign up for the application with that email address.")

    # Return to Amazon Cognito
    return event
```
!!! info     "Be sure to replace the *example.com* domain after you've tested so that your user can pass the pre-signup validation."

Now that your Lambda function is configured, you can configure the trigger within your Cognito User Pool.

1. Open the <a href="https://console.aws.amazon.com/cognito/home?" target="_blank">Amazon Cognito</a> console.

2. Choose the **WildRydes** User Pool.

3. Click **Triggers** on the left navigation.

6. Under **Pre sign-up** choose **serverless-idm-wksp-pre-sign-up** and click **Save Changes**.

Now test out your pre validation logic by deleting the existing user in your User Pool (or create a new user) and ensure the function is triggering and properly validating the email address.  Feel free to play around with the logic to test out different validation scenarios. 

## Customize welcome message

Now leverage the **Custom Message** trigger to customize the welcome message.

1. Open the <a href="https://console.aws.amazon.com/lambda/home?" target="_blank">AWS Lambda</a> console.

2. Choose the **serverless-idm-wksp-custom-message** function.

    !!! info     "The function was automatically created as part of the environment configuration CloudFormation template but is missing the application code."

3. Copy and paste the code below and save your function:

```python
from __future__ import print_function

def lambda_handler(event, context):
    
    # Log event
    print(event)

    # This example uses a custom attribute 'custom:domain'
    if event['triggerSource'] == "CustomMessage_SignUp":
        event['response']['smsMessage'] = 'Bienvenido al servicio WildRydes. Su código de confirmación es %s' % event['request']['codeParameter']
        event['response']['emailSubject'] = 'Bienvenido a WildRydes!'
        event['response']['emailMessage'] = 'Bienvenido al servicio WildRydes. Su código de confirmación es %s' % event['request']['codeParameter']
    
    # Return to Amazon Cognito
    return event
```

!!! question     "Take note of the event TriggerSource.  When else will this Lambda function get triggered?"

Now that your Lambda function is configured, you can configure the trigger within your Cognito User Pool.

1. Open the <a href="https://console.aws.amazon.com/cognito/home?" target="_blank">Amazon Cognito</a> console.

2. Choose the **WildRydes** User Pool.

3. Click **Triggers** on the left navigation.

6. Under **Custom Message** choose **serverless-idm-wksp-custom-message** and click **Save Changes**.

## Customize the claims in the ID Token

Now leverage the **pre token generation** trigger to customize the claims in the ID token before it is issued.

1. Open the <a href="https://console.aws.amazon.com/lambda/home?" target="_blank">AWS Lambda</a> console.

2. Choose the **serverless-idm-wksp-pre-token-gen** function.

    !!! info     "The function was automatically created as part of the environment configuration CloudFormation template but is missing the application code."

3. Copy and paste the code below and save your function:

```python
from __future__ import print_function

def lambda_handler(event, context):

    # Log event
    print(event)

    # Customize the token
    if event['triggerSource'] == 'TokenGeneration_Authentication':
        event['response']['claimsOverrideDetails'] = {
            # Suppress the phone number claims
            'claimsToSuppress': ['phone_number', 'phone_number_verified'],
            # Add a rewards claim
            'claimsToAddOrOverride': {
                "rewards": "platinum"
            },
        }
        
    # Return to Amazon Cognito
    
    return event
```

!!! question     "Take note of the event TriggerSource.  When else will this Lambda function get triggered?"

Now that your Lambda function is configured, you can configure the trigger within your Cognito User Pool.

1. Open the <a href="https://console.aws.amazon.com/cognito/home?" target="_blank">Amazon Cognito</a> console.

2. Choose the **WildRydes** User Pool.

3. Click **Triggers** on the left navigation.

6. Under **Pre Token Generation** choose **serverless-idm-wksp-pre-token-gen** and click **Save Changes**.

Now you can authenticate to the application again, copy the ID token, and paste it into <a href="http://jwt.io" target="_blank">JWT.io</a> to verify that the claims have been dynamically updated.

[**Back to Module 1**](https://serverless-idm.awssecworkshops.com/01-user-auth/#end-of-module-1)