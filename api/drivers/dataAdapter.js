import {readFileSync} from 'fs'

const fb = readFileSync(new URL('./data.json', import.meta.url));
const dataSet = JSON.parse(fb.toString());

class driverDataAdapter{
    constructor(){
        const data = {...dataSet}
        this.data = data.results;
        this.map = {};
        this.data.forEach((each) => {
            this.map[each.id] = each
        });
    }

    get(driverId){
        return this.map[driverId];
    }
}

const singleton = new driverDataAdapter()

export default singleton