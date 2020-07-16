export const getURL = {
    computed: {
        baseURL() {
            const env = process.env.NODE_ENV;
            let url = "";
            switch (env) {
                case "development":
                    url = "//127.0.0.1:9000/images/";
                    break;
                case "production":
                    url = "https://wen.cwjbjy.online/images/";
                    break;
                default:
                    break;
            }
            return url;
        }
    }
}