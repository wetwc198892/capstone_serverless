import json
import pymysql
import datetime
from decimal import Decimal

ENDPOINT = 'mysql-east1.csanr8y03rm6.us-east-1.rds.amazonaws.com'
USERNAME = 'admin'
PASSWORD = 'kimisthebest'
DATABASE_NAME = 'new_schema'
connection = pymysql.connect(
    host=ENDPOINT, user=USERNAME, password=PASSWORD, db=DATABASE_NAME, charset='utf8mb4', cursorclass=pymysql.cursors.DictCursor)


def default(obj):
    if isinstance(obj, Decimal):
        return str(obj)
    elif isinstance(obj, datetime.datetime):
        return obj.__str__()
    raise TypeError("Object of type '%s' is not JSON serializable" %
                    type(obj).__name__)


def getSubmissions(event, context):
    cursor = connection.cursor()
    sql = "SELECT * FROM tbl_submission"
    cursor.execute(sql)
    rows = cursor.fetchall()
    if rows:
        body = {
            "data": rows
        }
    else:
        body = {
            "message": "unsuccessful!",
        }
    return {

        'statusCode': 200,
        'headers': {
            'Access-Control-Allow-Headers': "Origin, X-Requested-With, Content-Type, Accept, Authorization,access-control-allow-origin",
            "Access-Control-Allow-Credentials": "true",
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
        },
        'body': json.dumps(body, default=default)
    }
