import axios from 'axios';

const endpoint = 'http://localhost:3000/categories/';

describe('get category by ID',()=> {
    beforeAll(() => {
        // käivitatbeforeAll(() => {akse enne testi paki algust (nt. tee test andmebaasi ja täida see)
      });
    
    it("should return category by ID", async ()=>{
    
        const response = await axios.get(
        endpoint + '/0a65c6f7-90a7-4ae3-bf94-5a8465a47104' //siia kategooria id
        
        );
        expect(response?.data).toHaveProperty('id');
        expect(response?.data?.title).toEqual('title for random category');
        });

    it('Should return error for non existing ID', async () => {
        const response = await axios.get(endpoint + '/nonExististentID');
        const data = response.data;
        console.log(data);
        expect(data).toHaveProperty('message');
        expect(data.message).toEqual('no category found with given ID');
        return;
      });

    afterAll(() => {
        // käivitatakse peale testi pakki (nt. kustuta test andmebaas)
      });
});