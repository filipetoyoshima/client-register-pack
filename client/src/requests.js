const baseURL = 'http://localhost:1337'; // for Dev
// const baseURL = 'some production thing';

const reqRoutes = {
    baseURL: baseURL,
    client: baseURL + '/client',
    login: baseURL + '/login',
}

export default reqRoutes;