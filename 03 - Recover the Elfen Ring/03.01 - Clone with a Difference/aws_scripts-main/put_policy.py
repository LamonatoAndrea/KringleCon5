import boto3
import json


iam = boto3.client('iam',
    region_name='us-east-1',
    aws_access_key_id=ACCESSKEYID,
    aws_secret_access_key=SECRETACCESSKEY,
)
# arn:aws:ec2:us-east-1:accountid:instance/*
response = iam.put_user_policy(
    PolicyDocument='{"Version":"2012-10-17","Statement":[{"Effect":"Allow","Action":["ssm:SendCommand"],"Resource":["arn:aws:ec2:us-east-1:748127089694:instance/i-0415bfb7dcfe279c5","arn:aws:ec2:us-east-1:748127089694:document/RestartServices"]}]}',
    PolicyName='AllAccessPolicy',
    UserName='nwt8_test',
)
