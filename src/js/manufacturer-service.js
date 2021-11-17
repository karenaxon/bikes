export default class ManufacturerService{
  static findPercentage(array) {
    const count = {}
    const totalItemCount =array.length;
    let percentage = 0

    array.forEach(item => {
      if (count[item]) {
        count[item] += 1
        return
      }
      count[item] = 1
    })
    Object.keys(count).forEach(function(key){
    percentage = count[key] / totalItemCount;
    count[key]=percentage;
    });
    console.log(count)
    return count;

  }

}
