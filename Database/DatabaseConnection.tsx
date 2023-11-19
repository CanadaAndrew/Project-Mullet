const sql = require('mssql')
const express = require('express')
const cors = require('cors');
const app = express()

const config = {
    user: 'hdw530', // better stored in an app setting such as process.env.DB_USER
    password: '#RecyclingTeam', // better stored in an app setting such as process.env.DB_PASSWORD
    server: 'hair-done-wright530.database.windows.net', // better stored in an app setting such as process.env.DB_SERVER
    port: 1433, // optional, defaults to 1433, better stored in an app setting such as process.env.DB_PORT
    database: 'mobile_app', // better stored in an app setting such as process.env.DB_NAME
    authentication: {
        type: 'default'
    },
    options: {
        encrypt: true
    }
}

//console.log("Starting...");
//connectAndQuery()

async function connectAndQuery() {
    try {
        console.log(config.user);
        var poolConnection = await sql.connect(config);
        console.log("Reading rows from the Table...");
        var resultSet = await poolConnection.request().query(`
        SELECT *
        FROM Clients;`);

        console.log(`${resultSet.recordset.length} rows returned.`);

        // output column headers
        var columns = "";
        for (var column in resultSet.recordset.columns) {
            columns += column + ", ";
        }
        console.log("%s\t", columns.substring(0, columns.length - 2));
        let ret = [];
        let i = 0;
        // ouput row contents from default record set
        resultSet.recordset.forEach(client => {
            console.log("%s\t%s", client.PhoneNumberEmail, client.FirstName, client.MiddleName, client.LastName, client.PreferredWayOfContact);
            ret[i] = client.PhoneNumberEmail + ' ' + client.FirstName + ' ' + client.MiddleName + ' ' + client.LastName + ' ' +client.PreferredWayOfContact +'\n' ;
            console.log(ret[i]);
            i += 1;
        });

        // close connection only when we're certain application is finished
        poolConnection.close();
        return ret;
    } catch (err) {
        console.error(err.message);
    }
}

async function connect(){
    try {
        var poolConnection = await sql.connect(config);
        return poolConnection;
    }catch(err){
        console.error(err.message);
    }
}

function sortingResults(resultSet){
    let ret = [];
    let i = 0;
    resultSet.recordset.forEach(object => {
        const arrayObject = {};
        for (var column in resultSet.recordset.columns) {
            arrayObject[column] = object[column];
        }
        ret[i] = arrayObject;
        i += 1;
    })
    return ret;
}

async function queryUsers(){
    try {
        var poolConnection = await connect();
        var resultSet = await poolConnection.request().query(`
        SELECT *
        FROM Users;`);
        poolConnection.close();
        return sortingResults(resultSet);
    } catch (err) {
        console.error(err.message);
    }
}

async function queryClients(){
    try {
        var poolConnection = await connect();
        var resultSet = await poolConnection.request().query(`
        SELECT *
        FROM ClientView;`);
        poolConnection.close();
        return sortingResults(resultSet);
    } catch (err) {
        console.error(err.message);
    }
}

async function queryAdmins(){
    try {
        var poolConnection = await connect();
        var resultSet = await poolConnection.request().query(`
        SELECT *
        FROM AdminView;`);
        poolConnection.close();
        return sortingResults(resultSet);
    } catch (err) {
        console.error(err.message);
    }
}

async function queryCurrentClients(){
    try {
        var poolConnection = await connect();
        var resultSet = await poolConnection.request().query(`
        SELECT *
        FROM CurrentClientView;`);
        poolConnection.close();
        return sortingResults(resultSet);
    } catch (err) {
        console.error(err.message);
    }
}

async function queryNewClients(){
    try {
        var poolConnection = await connect();
        var resultSet = await poolConnection.request().query(`
        SELECT *
        FROM NewClientView;`);
        poolConnection.close();
        return sortingResults(resultSet);
    } catch (err) {
        console.error(err.message);
    }
}

async function queryServicesWanted(){
    try {
        var poolConnection = await connect();
        var resultSet = await poolConnection.request().query(`
        SELECT *
        FROM ServicesWanted;`);
        poolConnection.close();
        return sortingResults(resultSet);
    } catch (err) {
        console.error(err.message);
    }
}

async function queryAppointments(){
    try {
        var poolConnection = await connect();
        var resultSet = await poolConnection.request().query(`
        SELECT *
        FROM Appointments;`);
        poolConnection.close();
        return sortingResults(resultSet);
    } catch (err) {
        console.error(err.message);
    }
}

async function customQuery(queryString){
    try {
        var poolConnection = await connect();
        var resultSet = await poolConnection.request().query(queryString);
        poolConnection.close();
        return sortingResults(resultSet);
    } catch (err) {
        console.error(err.message);
    }
}

app.use(cors());
app.get('/queryUsers', (req, res) => queryUsers().then((ret) => res.send(ret)).catch(() => console.log('error')))
app.get('/queryAdmins', (req, res) => queryAdmins().then((ret) => res.send(ret)).catch(() => console.log('error')))
app.get('/queryClients', (req, res) => queryClients().then((ret) => res.send(ret)).catch(() => console.log('error')))
app.get('/queryCurrentClient', (req, res) => queryCurrentClients().then((ret) => res.send(ret)).catch(() => console.log('error')))
app.get('/queryNewClient', (req, res) => queryNewClients().then((ret) => res.send(ret)).catch(() => console.log('error')))
app.get('/queryServicesWanted', (req, res) => queryServicesWanted().then((ret) => res.send(ret)).catch(() => console.log('error')))
app.get('/queryNewClient', (req, res) => queryNewClients().then((ret) => res.send(ret)).catch(() => console.log('error')))
app.get('/customQuery', (req, res) => {
    const query = req.query.query;
    console.log(query);
    customQuery(query)
.then((ret) => res.send(ret))
.catch(() => console.log('error'));
}
)
app.listen(3000, () => console.log('up'));