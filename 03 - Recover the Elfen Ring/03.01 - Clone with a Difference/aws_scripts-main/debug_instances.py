import boto3
import pdb
import json

ec2client = boto3.client('ec2', region_name='us-east-1')
response = ec2client.describe_instances()
print(json.dumps(response, indent=2, sort_keys=True, default=str))
for reservation in response["Reservations"]:
    for instance in reservation["Instances"]:
        pdb.set_trace()
        # This sample print will output entire Dictionary object
        print(instance)
        # This will print will output the value of the Dictionary key 'InstanceId'
        print(instance["InstanceId"])
