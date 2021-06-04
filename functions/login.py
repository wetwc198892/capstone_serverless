import json
import pymysql

ENDPOINT = 'mysql-east1.csanr8y03rm6.us-east-1.rds.amazonaws.com'
USERNAME = 'admin'
PASSWORD = 'kimisthebest'
DATABASE_NAME = 'new_schema'
connection = pymysql.connect(
    host=ENDPOINT, user=USERNAME, password=PASSWORD, db=DATABASE_NAME, charset='utf8mb4', cursorclass=pymysql.cursors.DictCursor)


def getUser(event, context):
    cursor = connection.cursor()
    sql = "SELECT * FROM user_table where account = %s and password = %s"
    body = json.loads(event['body'])
    cursor.execute(sql, (body['account'], body['password']))
    rows = cursor.fetchone()
    if rows:
        body = {
            "data": rows
        }
    else:
        body = {
            "message": "unsuccessful!",
        }
    response = {"statusCode": 200, "body": json.dumps(body)}
    return response
