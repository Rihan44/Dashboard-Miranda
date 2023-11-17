
export const fetchFunction = async({url = '', method = '', bodyData = null, returnData = true, id = ''}) => {
    const token  = localStorage.getItem('token') || '';

    try {
        const response = await fetch(url, {
            mode: 'cors',
            method: method,
            headers: {
              'Content-Type': 'application/json',
              token: token
            },
          });
        
        if(response.ok) {
            if(returnData) {
                const data = await response.json();
                return data.result;
            } else {
                return id;
            }
        } else {
            throw new Error("Error fetching the rooms");
        }
  
    } catch (error) {
      throw new Error(`Failed to connect: ${error}`);
    }
}


