const AjaxHelper = {
    sendPost: function(url, json) {
        return axios.post(url, json)
            .then(response => response.data)
            .catch(error => {
                console.error('Error:', error);
                throw error; // 重新抛出错误以便调用者处理
            });
    },

    sendGet: function(url, params) {
        return axios.get(url, { params: params })
            .then(response => response.data)
            .catch(error => {
                console.error('Error:', error);
                throw error; // 重新抛出错误以便调用者处理
            });
    },

    sendPostSync: async function(url, json) {
        try {
            const response = await axios.post(url, json);
            return response.data;
        } catch (error) {
            console.error('Error:', error);
            throw error;
        }
    },

    sendGetSync: async function(url, params) {
        try {
            const response = await axios.get(url, { params: params });
            return response.data;
        } catch (error) {
            console.error('Error:', error);
            throw error;
        }
    }
};
