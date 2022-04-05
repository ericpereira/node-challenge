require('dotenv').config();
var mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

const mongoServer = new MongoMemoryServer();

var UserServices = require('./UserServices')
//var jest = require('jest')
jest.setTimeout(30000)
//jest.useFakeTimers()

describe("register user", () => {
  const mockObject = {
    email: `${Math.floor(Math.random() * Math.pow(16, 16)).toString(16)}test@hotmail.com`,
    role: 'admin'
  }

  //antes de tudo, faça isso aquis
  beforeAll(async () => {
    const dbUser = process.env.DB_USER;
    const dbPass = process.env.DB_PASS;
    //console.log('Connect to ', `mongodb+srv://${dbUser}:${dbPass}@cluster0.a67js.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`);
    await mongoose
      .connect(`mongodb+srv://${dbUser}:${dbPass}@cluster0.a67js.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`)
  })

  afterAll(async () => {
    await mongoose.connection.close(true)
    await mongoServer.stop()
  })

  // beforeEach(() => {
  //   jest.useFakeTimers()
  // })

  //todos os testes relacionados a criação de usuário

  //cada it é um teste que queremos executar
  it("should be possible to create an user", async () => {        
    //chamada para o serviço
    await UserServices
        .create(mockObject)
        .then(data => {                
            expect(data).toHaveProperty('email', mockObject.email)
            expect(data).toHaveProperty('password')
        })
    //esperar retorno
    //expect(2+2).toBe(4)
  })

  it("should not be able to create an existing user", async () => {
    await expect(UserServices.create(mockObject)).rejects.toEqual(
        new Error("Email already used.")
    )
  })
})