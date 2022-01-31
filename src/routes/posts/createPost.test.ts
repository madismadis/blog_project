import axios from 'axios';

const endpoint = 'http://localhost:3000/posts/';

describe('create a post', () => {
  it('it should successfully create a new post', async () => {
    const testData = {
      authorId: '089ddda5-f4c8-4bca-974a-e69d616e504a',
      title: 'my new post 3',
      content:
        'Nunc ac viverra justo, et aliquam nibh. Morbi lectus velit, pretium id risus eget, rutrum maximus orci. Nam urna lorem, malesuada sit amet odio ac, egestas blandit velit. Maecenas et fermentum nulla, non egestas ex. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Fusce auctor faucibus quam, ut lacinia erat tempus in. Nam suscipit mauris quis imperdiet laoreet.\nCurabitur tincidunt fermentum neque non venenatis. Vestibulum id lorem ullamcorper, gravida sem eu, egestas massa. Fusce imperdiet leo elit, eget sollicitudin diam malesuada sed. Mauris sodales malesuada odio, non lobortis risus dapibus quis. Fusce placerat ullamcorper luctus. Vivamus sed laoreet nisi. Morbi eu venenatis eros.',
      summary: 'small summary for nonsense post 3'
    };

    const response = await axios.post(endpoint, testData, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const responseData = response.data;

    expect(responseData.authorId).toEqual(testData.authorId);
    expect(responseData.title).toEqual(testData.title);
    expect(responseData.content).toEqual(testData.content);
    expect(responseData.summary).toEqual(testData.summary);

    return;
  });
});