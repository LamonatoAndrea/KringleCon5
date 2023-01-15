import boto3

ec2 = boto3.resource('ec2', region_name='us-east-1')


# create a new EC2 instance
instances = ec2.create_instances(
    ImageId='ami-0ed9277fb7eb570c9',
    MinCount=1,
    MaxCount=2,
    InstanceType='t2.micro',
    KeyName='new_nwtesting'
)
