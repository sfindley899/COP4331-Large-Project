/*
const app = require('./server')
app.listen(5000)
const supertest = require('supertest')
const request = supertest(app)
*/

/*
const { request } = require('express');
const { TestScheduler } = require('jest');
const server = require('./server');
*/

const express = require('express')
const request = require('supertest')
const server = require('./server')

// Simple test for sanity
test('Tests if server is running by checking the /user endpoint', async () => {
    // Sends GET request to /user endpoint
    const res = await request(server).get('/user')

    expect(res.status).toBe(200)
    expect(res.text).toBe("Helloo")
});

//test.todo('Login User Endpoint');

test('Login User with correct credentials and verified email', async () => {
    const res = await request(server).post('/login').send({"email":"lap65222@cuoly.com", "password":"8xkI7cX$oJUnT5fzp3D!xj"})

    expect(res.status).toBe(200)
    expect(res.body.name).toBe(null)
    expect(res.body.email).toBe("lap65222@cuoly.com")
});

test('Login User with correct credentials with an unverified email', async () => {
    const res = await request(server).post('/login').send({"email":"jagoh46664@idcbill.com", "password":"!^$b$fN6moHRE&@XjRW6iL"})

    expect(res.status).toBe(401) // 401 = Unauthorized
    expect(res.body.response).toBe("email not verified")
});

test('Login User with incorrect credentials', async () => {
    const res = await request(server).post('/login').send({"email":"sflap65222@cuoly.com", "password":"sdfs8xkI7cX$oJUnT5fzp3D!xj"})

    expect(res.status).toBe(400) // 400 = Bad Request
    expect(res.body.response).toBe("There is no user record corresponding to this identifier. The user may have been deleted.")
});

test('Login User with bad fields', async () => {
    const res = await request(server).post('/login').send({"doesntExsist":"sflap65222@cuoly.com"})

    expect(res.status).toBe(500) // 500 = Internal Server Error
});

//test.todo('Forgot Password Endpoint');

test.skip('Forgot Password on a valid account', async () => {
    const res = await request(server).post('/resetPassword').send({"email":"lap65222@cuoly.com", "password":"sdfs8xkI7cX$oJUnT5fzp3D!xj"})

    expect(res.status).toBe(200)
    expect(res.body.response).toBe("email ver sent")
});

test('Forgot Password on a nonexsistant account', async () => {
    const res = await request(server).post('/resetPassword').send({"email":"sdfsfsfjagoh46664@idcbill.com"})

    expect(res.status).toBe(400)
    expect(res.body.response.message).toBe("There is no user record corresponding to this identifier. The user may have been deleted.")
});

test('Forgot Password with bad fields', async () => {
    const res = await request(server).post('/resetPassword').send({"notAnEmail":"sdfsfsfjagoh46664@idcbill.com"})

    expect(res.status).toBe(500)
});

//test.todo('Change User Email Endpoint');


test.skip('Change email with valid email', async () => {
    const res = await request(server).post('/resetPassword').send({"email":"lap65222@cuoly.com"})

    expect(res.status).toBe(200)
    expect(res.body.response).toBe("email ver sent")
});

test('Change email with invalid email', async () => {
    const res = await request(server).post('/resetPassword').send({"email":"sdsfdsfsfsffsfsfjagoh46664@idcbill.com"})

    expect(res.status).toBe(400)
});

test('Change email with bad fields', async () => {
    const res = await request(server).post('/resetPassword').send({"notAnEmail":"sdsfdsfsfsffsfsfjagoh46664@idcbill.com"})

    expect(res.status).toBe(500)
});


//test.todo('Create User Endpoint');

test.skip('Create user with all valid info', async () => {
    // Generates a random 7 digit string
    let prefix = Math.random().toString(36).substring(7)
    let password = Math.random().toString(36).substring(7)
    let email = prefix + "@idcbill.com"
    const res = await request(server).post('/register').send({"email": email, "password": password})

    expect(res.status).toBe(400)
    expect(res.body.response).toBe({response:"Register successful email verification sent to " + email})
});

test('Create user with bad fields', async () => {
    // Generates a random 7 digit string
    let prefix = Math.random().toString(36).substring(7)
    let email = prefix + "@idcbill.com"
    const res = await request(server).post('/register').send({"email": email})

    expect(res.status).toBe(500)
});



test('A test test', () => {
    expect(1+1).toBe(2);
});


afterAll(done => {
    server.close()
    done()
});
