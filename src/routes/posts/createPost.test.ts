import axios from 'axios';

const endpoint = 'http://localhost:3000/posts/';

describe('users', () => {
    it ('it should successfully create a new post', async ()=>{

        const testData = {
        authorId: "089ddda5-f4c8-4bca-974a-e69d616e504a",
        title: "my new post 1",
        content: "em ipsum dolor sit amet, consectetur adipiscing elit. Curabitur eros lacus, consectetur et interdum in, placerat sit amet nunc. Maecenas vestibulum, ante in scelerisque accumsan, justo mi vestibulum massa, a dignissim elit augue vitae risus",
        summary: "small summary for this post"
        };

        const response = await axios.post(endpoint, testData, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

const responseData= response.data;

expect(responseData.authorId).toEqual(testData.authorId);
expect(responseData.title).toEqual(testData.title);
expect(responseData.content).toEqual(testData.content);
expect(responseData.summary).toEqual(testData.summary);

return
        
});
});