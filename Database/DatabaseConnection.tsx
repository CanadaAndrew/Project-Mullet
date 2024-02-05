const sql = require('mssql')
const express = require('express')
const cors = require('cors');
const app = express();
//Wanted to have these through exports, but exports do not seem to be working, will fix later.
const monthsNum = {
    January: '01',
    February: '02',
    March: '03',
    April: '04',
    May: '05',
    June: '06',
    July: '07',
    August: '08',
    September: '09',
    October: '10',
    November: '11',
    December: '12'
}

const monthsWritten = {
    January: 'January',
    February: 'February',
    March: 'March',
    April: 'April',
    May: 'May',
    June: 'June',
    July: 'July',
    August: 'August',
    September: 'September',
    October: 'October',
    November: 'November',
    December: 'December'
}
/**
 * This is config, it creates an object that stores log information in order to connect to the server.
 * This will be passed on to connect, and if it is valid it will return an object.
 */
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

/**
 * 
 * This function is a template function that shows the basics of connecting and running through the columns/rows.
 */
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

/**
 * This function attempts to connect the database using config.
 * If successful,
 * @returns poolConnection, an object used to request actions to the dbs.
 */
async function connect(){
    try {
        var poolConnection = await sql.connect(config);
        return poolConnection;
    }catch(err){
        console.error(err.message);
    }
}

/**
 * This takes in a result from the queried database, makes them into objects, and puts them in an array to create an array of those objects.
 * @param resultSet, the queried information not yet sorted into proper arrays. 
 * @returns ret, an array of objects created from the resultSet given.
 */
function sortingResults(resultSet){
    let ret = [];
    let i = 0;
    //For each goes through each row taking one row at a time.
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

/**
 * The general querying for tables are all the same, so I'll comment this one 
 * @returns Array of Objects created from the querry
 */
async function queryUsers(){
    try {
        //First tries to connect to the dbs using the connect method, await is important
        var poolConnection = await connect();
        //Sends a request ussing the object given from connect, await is important, type in a query command that you would use in SQL
        var resultSet = await poolConnection.request().query(`
        SELECT *
        FROM Users;`);
        //Closes the connection
        poolConnection.close();
        //Sorts the result into an object array using the method and returns it.
        return sortingResults(resultSet);
    } catch (err) {
        //If any error occurs, it'll throw it over here and print it in console
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

//Custom Query is the same as the general queries except that a custom queryString is given.
async function customQuery(queryString){
    try {
        const poolConnection = await connect();
        const resultSet = await poolConnection.request().query(queryString);
        poolConnection.close();
        return sortingResults(resultSet);
    } catch (err) {
        console.error(err.message);
    }
}
//Takes the formatted date, time, and userID and updates the appointment so it is taken.
async function updateAppointment(date, time, userID){
    try {
        var poolConnection = await connect();
        //await poolConnection.request().query('UPDATE Appointments SET VacancyStatus = 1, PhoneNumberEmail = \''+ userID + '\' WHERE AppointmentDate = '+'\''+date+' '+time+'\'');
        await poolConnection.request().query('SELECT * FROM Appointments');
        poolConnection.close();
    } catch (err) {
        console.error(err.message);
    }
    
}

async function appointmentPost(queryString, values){
    try {
        const poolConnection = await connect();
        const resultSet = await poolConnection
            .request()
            .input('AppointmentDate', sql.DateTime2, values.AppointmentDate)
            .input('VacancyStatus', sql.Int, values.VacancyStatus)
            .query(queryString);
        poolConnection.close();
        return sortingResults(resultSet);
    } catch (err) {
        console.error(err.message);
        throw err; //rethrow error so that frontend can catch it
    }
}

/*async function pastAppointmentsQuery(){
    try {
        const poolConnection = await connect();
        const query = 'SELECT * FROM Appointments';
        const resultSet = await poolConnection
            .request()
            .query(query);
        poolConnection.close();
        return sortingResults(resultSet);
    } catch (err) {
        console.error(err.message);
        throw err; //rethrow error so that frontend can catch it
    }
}*/

//async function upcomingAppointmentsQuery(startDate, endDate){   
async function clientHistoryAppointmentsQuery(startDate, endDate){
    try {
        const poolConnection = await connect();
        const query = 'SELECT FirstName, LastName, AppointmentDate, TypeOfAppointment FROM Appointments JOIN Clients ON Appointments.UserID = Clients.UserID WHERE AppointmentDate BETWEEN \'' + startDate + '\' AND \'' + endDate + '\'';
        const resultSet = await poolConnection
            .request()
            .query(query);
        poolConnection.close();
        return sortingResults(resultSet);
    } catch (err) {
        console.error(err.message);
        throw err; //rethrow error so that frontend can catch it
    }
}

async function allPastAppointmentsQuery(todaysDate){
    try {
        const poolConnection = await connect();
        const query = 'SELECT FirstName, LastName, AppointmentDate, TypeOfAppointment FROM Appointments JOIN Clients ON Appointments.UserID = Clients.UserID WHERE AppointmentDate < \'' + todaysDate + '\'';
        const resultSet = await poolConnection
            .request()
            .query(query);
        poolConnection.close();
        return sortingResults(resultSet);
    } catch (err) {
        console.error(err.message);
        throw err; //rethrow error so that frontend can catch it
    }
}

async function allUpcomingAppointmentsQuery(todaysDate){
    try {
        const poolConnection = await connect();
        const query = 'SELECT FirstName, LastName, AppointmentDate, TypeOfAppointment FROM Appointments JOIN Clients ON Appointments.UserID = Clients.UserID WHERE AppointmentDate >= \'' + todaysDate + '\'';
        const resultSet = await poolConnection
            .request()
            .query(query);
        poolConnection.close();
        return sortingResults(resultSet);
    } catch (err) {
        console.error(err.message);
        throw err; //rethrow error so that frontend can catch it
    }
}

async function customDelete(queryString) {
    try {
      const poolConnection = await connect();
      const resultSet = await poolConnection
        .request()
        .query(queryString);
      poolConnection.close();
      return sortingResults(resultSet);
    } catch (err) {
      console.error(err.message);
      throw err;
    }
  }
  
async function errorHandle(currentFunction, arguement){
    let i = 0;
    let ret;
    while(i < 3){
        try{
            ret = await currentFunction(arguement);
            break;
        }catch{
            i++;
            continue;
        }
    }
    return ret;
}
app.use(cors());
//For each query/function, a REST API needs to be created, a way for the frontend of our program to call methods to our backend.
//app.get means the front end will GET stuff from the backend
//app.post means the front end will POST stuff to the backend(read up on the Axion api for more information.)
app.get('/queryUsers', (req, res) => queryUsers().then((ret) => res.send(ret)).catch(() => console.log('error')))
app.get('/queryAdmins', (req, res) => queryAdmins().then((ret) => res.send(ret)).catch(() => console.log('error')))
app.get('/queryClients', (req, res) => queryClients().then((ret) => res.send(ret)).catch(() => console.log('error')))
app.get('/queryCurrentClient', (req, res) => queryCurrentClients().then((ret) => res.send(ret)).catch(() => console.log('error')))
app.get('/queryNewClient', (req, res) => queryNewClients().then((ret) => res.send(ret)).catch(() => console.log('error')))
app.get('/queryServicesWanted', (req, res) => queryServicesWanted().then((ret) => res.send(ret)).catch(() => console.log('error')))
app.get('/queryNewClient', (req, res) => queryNewClients().then((ret) => res.send(ret)).catch(() => console.log('error')))
/**
 * This breaks down the params, getting the string and storing it before calling the query method.
 */
app.get('/customQuery', (req, res) => {
    const query = req.query.query;
    console.log(query);
    customQuery(query)
    .then((ret) => res.send(ret))
    .catch(() => errorHandle(customQuery, query))
    .then((ret) => res.send(ret))
    .catch(res.send("error"));
})

/*app.get('/pastAppointmentsQuery', async (req, res) => {
    try {
    const result = await allAppointmentsQuery()
    res.send(result);
    } catch(error) {
        res.status(500).send('Internal Server Error');
    }
});*/

//app.get('/upcomingAppointmentsQuery', async (req, res) => {
app.get('/clientHistoryAppointmentsQuery', async (req, res) => {
    try {
        const startDate = req.query.startDate;
        const endDate = req.query.endDate;
        if (!startDate) {
            throw new Error('Invalid request. Missing "startDate"');
        }
        if (!endDate) {
            throw new Error('Invalid request. Missing "endDate"');
        }
    //const result = await someAppointmentsQuery(startDate, endDate)
    const result = await clientHistoryAppointmentsQuery(startDate, endDate);
    res.send(result);   
    } catch {
        res.status(400).send('Bad Request');
    }
});

app.get('/allPastAppointmentsQuery', async (req, res) => {
    try {
        const todaysDate = req.query.todaysDate;
        if (!todaysDate) {
            throw new Error('Invalid request. Missing "todaysDate"');
        }
        const result = await allPastAppointmentsQuery(todaysDate);
        res.send(result);
    } catch {
        res.status(400).send('Bad Request');
    }
});

app.get('/allUpcomingAppointmentsQuery', async (req, res) => {
    try {
        const todaysDate = req.query.todaysDate;
        if (!todaysDate) {
            throw new Error('Invalid request. Missing "todaysDate"');
        }
        const result = await allUpcomingAppointmentsQuery(todaysDate);
        res.send(result);
    } catch {
        res.status(400).send('Bad Request');
    }
});

app.post('/appointmentPost', async (req, res) => {
    console.log('received request body: ');
    try {
        const { queryString, values } = req.body;
        if (!queryString || !values) {
            throw new Error('Invalid request body. Missing "queryString" or "values".');
        }
        const result = await appointmentPost(queryString, values);
        res.send(result);
    } catch (error) {
        console.error(error.response.data);
        res.status(400).send('Bad Request');
    }
});

app.delete('/customDelete', async (req, res) => {
    try {
        const { queryString } = req.body;
        if (!queryString) {
            throw new Error('Invalid request body. Missing "queryString".');
        }
        await customDelete(queryString);
        res.status(204).send(); // 204 means success with no content
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});
  
//Formats the date and time before sending it to the method to update the appointments.
//In the future might just format this in the front end and then send it over, might be a lot easier.
app.put('/confirmAppointment', (req, res) => {
    //Gets the date, time, and userID through parameters.
    let date = req.query.date;
    let time = req.query.time;
    let userID = req.query.userID;
    if(date && time){
        //Deals with am/pm, turning it into military time. Want to do this with Enums if can get export working.
        if(time.includes('pm')){
            time = time.split('pm');
            time = time[0].split(':');
            if(parseInt(time[0]) === 12){
                time = time[0]+':'+time[1]+':00';
            }else{
                time = (parseInt(time[0])+12)+':'+time[1]+':00';
            }
        }else{
            time = time.split('am');
            if(parseInt(time[0]) === 12){
                time = '00:'+time[0]+':00';
            }else{
                time = time[0]+':00';
            }
        }
        //Detects month and get's the number form, currently enums are copy/pasted in, want to switch to import if it can work.
        let month;
        for(month in monthsWritten){
            if(date.includes(month)){
                break;
            }
        }
        month = monthsNum[month];
        //Uses RE pattern matching, would rather do enums if it works, temporary solution.
        let day = date.match(/[0-9][0-9]th|[0-9]?[0-9]st|[0-9]?[0-9]nd|[0-9]?[0-9]rd/)
        day = parseInt(day);
        if(day.length < 2){
            day = '0'+day;
        }
        let year = date.match(/[0-9][0-9][0-9][0-9]/);

        //Formats date and sends it to the backend function.
        date = year+'-'+month+'-'+day;
        console.log(date);
        updateAppointment(date, time, userID).catch((err) => console.log(err));
    }else{
        console.log('date:' + date);
        console.log('time:' + time);
    }
    res.send("ok");
})

app.get('/findUserByID', (req, res) =>{
    const queryId = req.query.Id;
    const query = "SELECT * FROM Users WHERE UserID = " + queryId + ";";
    customQuery(query)
    .then((ret) => res.send(ret))
    .catch(() => errorHandle(customQuery, query))
    .then((ret) => res.send(ret))
    .catch(res.send("error"));
})

app.get('/findUserId', (req, res) =>{
    const emailOrPhoneNum = req.query.EmailOrPhoneNum;
    const query = "SELECT UserID FROM Users WHERE Email = '" + emailOrPhoneNum + "' OR PhoneNumber = '" + emailOrPhoneNum + "';";
    customQuery(query)
    .then((ret) => res.send(ret))
    .catch(() => errorHandle(customQuery, query))
    .then((ret) => res.send(ret))
    .catch(res.send("error"));
})

app.get('/findCurrentClientByID', (req, res) =>{
    const queryId = req.query.Id;
    const query = "SELECT * FROM CurrentClientView WHERE UserID = " + queryId + ";";
    customQuery(query)
    .then((ret) => res.send(ret))
    .catch(() => errorHandle(customQuery, query))
    .then((ret) => res.send(ret))
    .catch(res.send("error"));
})

app.get('/findNewClientViewByID', (req, res) =>{
    const queryId = req.query.Id;
    const query = "SELECT * FROM NewClientView WHERE UserID = " + queryId + ";";
    customQuery(query)
    .then((ret) => res.send(ret))
    .catch(() => errorHandle(customQuery, query))
    .then((ret) => res.send(ret))
    .catch(res.send("error"));
})

app.get('/findPasswordByID', (req, res) =>{
    const queryId = req.query.Id;
    const query = "SELECT Pass FROM Users WHERE UserID = " + queryId + ";";
    customQuery(query)
    .then((ret) => res.send(ret))
    .catch(() => errorHandle(customQuery, query))
    .then((ret) => res.send(ret))
    .catch(res.send("error"));
})

app.get('/findAvailableTimesGivenDate', (req, res) => {
    const date = req.query.date;
    const query =  "SELECT * FROM Appointments WHERE AppointmentDate >= '" + date + " 00:00:00' AND AppointmentDate <= '" + date + " 23:59:59' AND VacancyStatus = 0;";
    customQuery(query)
    .then((ret) => res.send(ret))
    .catch(() => errorHandle(customQuery, query))
    .then((ret) => res.send(ret))
    .catch(res.send("error"));
})

app.get('/queryUpcomingAppointmentsByUserIDAndDate', (req, res) =>{
    const date = req.query.date;
    const userID = req.query.userID;
    const query = "SELECT * FROM Appointments WHERE AppointmentDate >= '" + date + " 00:00:00' AND UserID = " + userID +";";
    customQuery(query)
    .then((ret) => res.send(ret))
    .catch(() => errorHandle(customQuery, query))
    .then((ret) => res.send(ret))
    .catch(res.send("error"));
})

app.get('/queryPastAppointmentsByUserIDAndDate', (req, res) =>{
    const date = req.query.date;
    const userID = req.query.userID;
    const query = "SELECT * FROM Appointments WHERE AppointmentDate <= '" + date + " 00:00:00' AND UserID = " + userID +";";
    customQuery(query)
    .then((ret) => res.send(ret))
    .catch(() => errorHandle(customQuery, query))
    .then((ret) => res.send(ret))
    .catch(res.send("error"));
})

app.get('/queryAllAppointmentsByUserID', (req, res) =>{
    const userID = req.query.userID;
    const query = "SELECT * FROM Appointments WHERE UserID = " + userID +";";
    customQuery(query)
    .then((ret) => res.send(ret))
    .catch(() => errorHandle(customQuery, query))
    .then((ret) => res.send(ret))
    .catch(res.send("error"));
})


//This opens the server, printing to console 'up' when it is up.
app.listen(3000, () => console.log('up'));