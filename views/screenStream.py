from flask import Flask
app =Flask(__name__)

@app.route('/flasks')
def flasks():
    return "Welcome To Flask"

if __name__=='__main__':
    app.run(host='0.0.0.1',port=3000)