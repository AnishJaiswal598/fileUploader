/**
 * @constructor Generates a constructor for a given data structure
 * @param {string} keys separated by a comma + whitespace. struct('id, name, age')
 * @returns {constructor} Constructor for the new struct
 */
function makeStruct(keys) {
    if (!keys) return null;
    const k = keys.split(', ');
    const count = k.length;

    /** @constructor */
    function constructor() {
        for (let i = 0; i < count; i++) this[k[i]] = arguments[i];
    }
    return constructor;
}

function coordinates(j) {
    const a = Math.ceil(Math.sqrt(Math.pow(j.lat, 2) + Math.pow(j.long, 2)));
    return a;
}

const arr=[];
const availableServ = async (userDestination, city) => {    //userDestinaton is a vector of x0 and y0
    const destination=new makeStruct("lat, long, name, id");
    const arrServ = await Service.find({ city: city });     // Targeting the servies only in the required city
    for (let i = 0; i < arrServ.length; i++) {
        const leastDist=new destination(10000, 10000, "", "");
        // start lowest with {10000,10000}
        // services schema will be having a field named stops with a vector pair {x1:lat,y1:long}
        // lowest{lat,long}
        for (let j = 0; j < i.stops.length; j++) {
            if (coordinates(j) - coordinates(userDestination) < coordinates(leastDist)) {
                leastDist.lat = j.lat, leastDist.long = j.long, leastDist.name = stop.name,leastDist._id = i._id;
            }
            
        }
        // make a vector of vectors array
        // newArray.push({{lowest.lat,lowest.long},{lowest.name,lowest._id}})
        arr.push(leastDist);

        return arr;
    }
}
