from decimal import Decimal
import json
import datetime
from functions import storage

connection = storage.connect()


def default(obj):
    if isinstance(obj, Decimal):
        return str(obj)
    elif isinstance(obj, datetime.datetime):
        return obj.__str__()
    raise TypeError("Object of type '%s' is not JSON serializable" %
                    type(obj).__name__)


def getSubmissions(event, context):
    try:
        if not connection.open:
            connection.connect()
        cursor = connection.cursor()
        sql = "SELECT * FROM tbl_submission where is_valid = 1"
        cursor.execute(sql)
        rows = cursor.fetchall()
        print(rows)
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
    except Exception as e:
        print(e)
    finally:
        if connection is not None and connection.open:
            connection.close()
