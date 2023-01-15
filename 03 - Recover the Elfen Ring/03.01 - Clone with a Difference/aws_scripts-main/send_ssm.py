import boto3
import json


ssm_client = boto3.client('ssm')
commands = ['echo "hello world"']
instance_ids = ['i-0b9a3527e7ddfe7ae']
resp = ssm_client.send_command(
    DocumentName="AWS-RunShellScript", #DocumentName="AWS-RunPowerShellScript",
    Parameters={'commands': commands},
    InstanceIds=instance_ids,
)
#ssm_client.list_command_invocations(InstanceId=instance_ids[0])
command_id = resp['Command']['CommandId']
output = ssm_client.get_command_invocation(
    CommandId=command_id,
    InstanceId=instance_ids[0],
)

print(json.dumps(output, indent=2, sort_keys=True, default=str))
# This can be used to list all commands IDs have been run
print(json.dumps(ssm_client.list_command_invocations(InstanceId=instance_ids[0]), indent=2, sort_keys=True, default=str))

