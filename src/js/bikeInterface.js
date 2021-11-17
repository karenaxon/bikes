export default class BikeInterface {
  static async getBikes(city) {
    try {
      const response = await fetch(`https://bikeindex.org:443/api/v3/search?page=1&per_page=25&location=${city}&distance=10&stolenness=proximity&access_token=${process.env.API_KEY}`);
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return response.json();
    } catch(error) {
      return error.message;
    }
  }
}
