import axios from 'axios';

const endpoint = 'http://localhost:3000/categories/';

describe('create a category', () => {
  it('it should successfully create a new category', async () => {
    const testData = {
      title: 'my new category 2',
    };

    const response = await axios.post(endpoint, testData, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const responseData = response.data;

    expect(responseData.title).toEqual(testData.title);

    return;
  });
});