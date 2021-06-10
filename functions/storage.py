import configparser
import pymysql


config = configparser.ConfigParser()
config.read('functions/config.ini')


def connect():
    return pymysql.connect(host=config['mysqlDB']['host'],
                           user=config['mysqlDB']['user'],
                           password=config['mysqlDB']['pass'],
                           db=config['mysqlDB']['db'],
                           charset='utf8mb4',
                           cursorclass=pymysql.cursors.DictCursor
                           )
