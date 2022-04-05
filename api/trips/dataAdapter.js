import {readFileSync} from 'fs'

const fb = readFileSync(new URL('./data.json', import.meta.url));
const dataSet = JSON.parse(fb.toString());

/***
 * This whole thing is super not production worthy. But, the idea is that it would
 * expose an interface that's reasonably similar to what you could expect from a real
 * ORM.
 * The class is exposed as a singleton that maintains an in-memory copy of its own data.
 * A real adapter would be heavily dependent on the ORM, data model, and storage
 * technology being used. Which I imagine is not simple for your system.
 */
class TripAdapter{
    constructor(){
        const data = {...dataSet}
        this.data = data.results;
        this.map = {};
        this.data.forEach((each) => {
            this.map[each.id] = each
        });
    }

    get(tripId, passengerId){
        const trip = this.map[tripId];
        if (trip?.passengerId === passengerId){
            return trip;
        }
    }

    getCurrent(passengerId){
        return this.data.find((e, i, a) => {
            return e.inProgress === true && e.passengerId === passengerId
        })
    }

    query(fromDate, toDate, includeCancelled, passengerId){
        return this.data.filter((e, i, a) => {
            if(e.passengerId !== passengerId) return false;
            if(!includeCancelled && e.cancelled) return false;
            const afterFromDate = !!fromDate
                ? new Date(e.completed || e.requested) >= fromDate
                : true
            const beforeEndDate = !!toDate
                ? new Date(e.completed || e.requested) <= toDate
                : true
            return afterFromDate && beforeEndDate
        })
    }

    update(tripId, updateData, passengerId){
        let trip = this.get(tripId, passengerId)
        if (!trip) return undefined;

        Object.assign(trip, updateData);
        return trip;
    }
}

const singleton = new TripAdapter()

export default singleton