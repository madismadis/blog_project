import axios from 'axios';

const endpoint = 'http://localhost:3000/users/';

describe('get post by ID',()=> {
    beforeAll(() => {
        // käivitatbeforeAll(() => {akse enne testi paki algust (nt. tee test andmebaasi ja täida see)
      });
    
    it("should return post by ID", async ()=>{
    
        const response = await axios.get(
        endpoint + '/2050cc67-9cbd-4e9c-af50-1797c49602e4' //post-id
        
        );
        expect(response?.data).toHaveProperty('id');
        expect(response?.data?.title).toEqual('title fro for random post');
        });

    it('Should return error for non existing ID', async () => {
        const response = await axios.get(endpoint + '/nonExististentID');
        const data = response.data;
        console.log(data);
        expect(data).toHaveProperty('message');
        expect(data.message).toEqual('no user found with given ID');
        return;
      });

    afterAll(() => {
        // käivitatakse peale testi pakki (nt. kustuta test andmebaas)
      });
});