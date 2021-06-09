import json
import pymysql

import uuid
from datetime import datetime


ENDPOINT = 'mysql-east1.csanr8y03rm6.us-east-1.rds.amazonaws.com'
USERNAME = 'admin'
PASSWORD = 'kimisthebest'
DATABASE_NAME = 'new_schema'


def deleteSubmission(event, context):
    try:
        connection = pymysql.connect(
            host=ENDPOINT, user=USERNAME, password=PASSWORD, db=DATABASE_NAME, charset='utf8mb4')
        cursor = connection.cursor()
        sql = "UPDATE `tbl_submission` set `is_valid`= 0, updated_date = %s where id = %s"
        body = json.loads(event['body'])
        now = datetime.now()
        print(sql)
        cursor.execute(
            sql, (now, body["id"]))
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
    finally:
        connection.close()
