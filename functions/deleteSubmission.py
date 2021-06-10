import json
from datetime import datetime
from functions import storage

connection = storage.connect()


def deleteSubmission(event, context):
    try:
        if not connection.open:
            connection.connect()
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
        if connection is not None and connection.open:
            connection.close()
