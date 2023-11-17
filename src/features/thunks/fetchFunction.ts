
export const fetchFunction = async({url = 'https://rx3866rpnh.execute-api.eu-west-1.amazonaws.com', method = '', data = {}}) => {
    const token  = localStorage.getItem('token') || '';

    try {
      const response = await fetch(``, {
        mode: 'cors',
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          token: token
        },
      });
  
      const data = await response.json();
  
      return data.rooms;
  
    } catch (error) {
      throw new Error(`Failed to fetch rooms: ${error}`);
    }
}