import json
import pymysql

import uuid
from datetime import datetime


ENDPOINT = 'mysql-east1.csanr8y03rm6.us-east-1.rds.amazonaws.com'
USERNAME = 'admin'
PASSWORD = 'kimisthebest'
DATABASE_NAME = 'new_schema'
connection = pymysql.connect(
    host=ENDPOINT, user=USERNAME, password=PASSWORD, db=DATABASE_NAME, charset='utf8mb4')


def proposalSubmission(event, context):
    try:
        cursor = connection.cursor()
        sql = "INSERT INTO  `tbl_submission` (`submission_no`, `title`, `amount`, `type`, `submit_type`, `event_date_from`,`event_date_to`,`submit_date`,`updated_date`,`is_valid`) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)"
        body = json.loads(event['body'])
        now = datetime.now()
        cursor.execute(
            sql, (uuid.uuid1(), body['title'], body['amount'], body['proposal_type'], body['submit_type'], body['EventDateFrom'], body['EventDateTo'], now, now, 1))
        connection.commit()
        if cursor.rowcount:
            body = {
                "message": "successful!",
            }
        else:
            body = {
                "message": "unsuccessful!",
            }
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Headers': "Origin, X-Requested-With, Content-Type, Accept, Authorization,Access-Control-Allow-Origin",
                "Access-Control-Allow-Credentials": "true",
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
            },
            'body': json.dumps(body)
        }
    except Exception as e:
        print(e)
        connection.rollback()
