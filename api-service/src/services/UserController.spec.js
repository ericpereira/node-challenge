var UserServices = require('../services/UserServices');
//var jest = require('jest');
jest.setTimeout(30000);

describe("register user", () => {
    //todos os testes relacionados a criação de usuário
    
    //cada it é um teste que queremos executar
    it("should be possible to create an user", async () => {
        await UserServices.connect();
        
        const mockObject = {
            email: '8eric.pereira@hotmail.com',
            role: 'admin'
        }
        //chamada para o serviço
        await UserServices
            .create(mockObject)
            .then(data => {                
                expect(data).toHaveProperty('email', mockObject.email)
                expect(data).toHaveProperty('password')
            });
        //esperar retorno
        //expect(2+2).toBe(4);
    })
})