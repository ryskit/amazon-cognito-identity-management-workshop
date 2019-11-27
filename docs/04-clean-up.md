# Module 4: Clean up

!!! warning     "If you are doing this workshop as part of an AWS sponsored event where Event Engine is being used, you can SKIP clean up.  The Event Engine system will take care of the clean up."

To prevent your account from accruing additional charges, you should remove any resources that are no longer needed.

## Empty and delete the S3 Bucket

First, you need to empty the ***S3 bucket*** that was created by the Serverless Backend CloudFormation template.

From your **Cloud9 developer environment** run the following:
	
```
aws s3 rb s3://MY-BUCKET-NAME --force 
```

!!! tip "Copy and paste your Bucket name from your scratch pad."

## Remove the Cognito Resources

From your **Cloud9 developer environment** run the following:
	
```
aws cognito-identity delete-identity-pool --identity-pool-id YOUR-IDENTITY-POOL-ID-HERE
```

!!! tip "Copy and paste your Cognito identity pool ID from your scratch pad (example: us-west-2:b4b755cd-d359-42a1-9b49-f0e73f5b2571)."

Next, run the following command to delete the Cognito User Pool you created:

```
aws cognito-idp delete-user-pool --user-pool-id YOUR-USER-POOL-ID-HERE
```
	
!!! tip "Copy and paste your user pool ID from your scratch pad (example: us-west-2:us-west-2_srLwFQiEC)."

## Delete Roles and detach IAM Policy

Before you delete the backend stack, you will need to remove the IAM Policy that you manually attached to the **Auth** role. 

1. Open the <a href="https://console.aws.amazon.com/iam/home?" target="_blank">AWS IAM</a> console.

2. Search for the **Auth** role and click into it.

	![Find Auth Role](./images/iam-cleanup-findAuthRole.png)

!!! info "Cognito Identity Pool Roles"
    If you don't need the Identity Pool Roles for a different Pool you can delete the following roles:

    * **Cognito_wildrydes_identity_poolUnauth_Role**
    * **Cognito_wildrydes_identity_poolAuth_Role**

**If you completed the Module 2 extension and need to keep your Cognito Roles, you can complete the next two steps to delete the attached policy**
	
2. On the Role Summary page, find the policy named **WildRydesAPI-StandardUserPolicy** in the Permissions tab. Once you locate the policy, click the **X** to remove this policy from the IAM Role. A popup window will ask you to confirm that you want to remove it - click the red **Detach** button.
3. Repeat for the policy named **WildRydes-S3Access**.

## Remove WildRydes Backend

Next, you will need to remove the *CloudFormation stack* for the API. This stack should be named **serverless-idm-backend**. Once again, from the your terminal window, run:

```
aws cloudformation delete-stack --stack-name serverless-idm-backend
```

## Remove Cloud9 and VPC Stack

1. Lastly, you will need to remove the *CloudFormation Stack* for the **Cloud9 instance** and the its VPC. This stack should be named **serverless-idm-cloud9**. Deleting this stack will **shut down and permanently delete your Cloud9 environment** and all code or projects within so be sure you want to proceed before executing this command.

```
aws cloudformation delete-stack --stack-name serverless-idm-cloud9
```


## Finished!

Congratulations on completing this workshop! This is the workshop's permanent home, so feel free to revisit as often as you'd like.


