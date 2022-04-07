import axios from 'axios';

const endpoint = 'http://localhost:3000/tags/';

describe('create a tag', () => {
  it('it should successfully create a new comment', async () => {
    const testData = {
      title: 'my new tag 99',
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