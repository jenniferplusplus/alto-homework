import {readFileSync} from 'fs'

const fb = readFileSync(new URL('./data.json', import.meta.url));
const dataSet = JSON.parse(fb.toString());

class vehicleAdapter{
    constructor(){
        const data = {...dataSet}
        this.data = data.results;
        this.map = {};
        this.data.forEach((each) => {
            this.map[each.id] = each
        });
    }

    get(vehicleId){
        return this.map[vehicleId];
    }

    update(vehicleId, updateData){
        let vehicle = this.get(vehicleId)
        if (!vehicle) return undefined;

        Object.assign(vehicle, updateData);
        return vehicle;
    }
}

const singleton = new vehicleAdapter()

export default singleton