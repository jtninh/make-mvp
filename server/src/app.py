from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from pathlib import Path
import json
from decimal import Decimal

from modules.csv_converter.csv_to_json import convert_csv_to_json

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:postgres@db/public'
db = SQLAlchemy(app)

def default(obj):
    if isinstance(obj, Decimal):
        return str(obj)
    return obj

@app.route("/api/data", methods=["GET"])
def get_data():
    with open('../assets/top50.csv', encoding = "ISO-8859-1") as f:
        data = convert_csv_to_json(f)
    response = app.response_class(
        response = json.dumps(data),
        mimetype = 'application/json'
    )
    return response


ALL_DATA_QUERY = (Path(__file__).parent / "sql" / "getAll.sql").read_text()
@app.route("/api/data/all", methods=["GET"])
def get_all_data():
    result = db.session.execute(ALL_DATA_QUERY)
    res = []
    for row in result:
        obj = {}
        for key, value in row.items():
            obj[key] = value
        res.append(obj)
    return json.dumps(res, default=default)

if __name__ == '__main__':
    app.run(debug=True)
