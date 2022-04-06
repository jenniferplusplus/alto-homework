import tripDataAdapter from '../trips/dataAdapter.js'
import vehicleDataAdapter from './dataAdapter.js'
import logger from '../../lib/logger.js'

// This doesn't exist, but it would need to. The vehicle client would encapsulate whatever mechanism is used to interact
// with vehicles, as opposed to simply getting stored data about them
//import vehicleClientAdapter from './vehicleClient.js

class VehicleService {
    constructor(passengerId) {
        this.passengerId = passengerId;
        this.vehicleAdapter = vehicleDataAdapter;
        this.tripDataAdapter = tripDataAdapter
    }

    static log = logger(import.meta);

    getAssigned(){
        const trip = this.tripDataAdapter.getCurrent(this.passengerId);
        if (trip === undefined) return;

        const vehicle = this.vehicleAdapter.get(trip.vehicleId);
        return vehicle;
    }

    identifyAssigned(){
        const vehicle = this.getAssigned()
        if (vehicle === undefined) return;

        /**
         * client = new vehicleClientAdapter(vehicle)
         * result = client.identify()
         *
         * return result
         */

        return {success: true};
    }

    updateVibe(vibe){
        const vehicle = this.getAssigned()
        if (vehicle === undefined) return;

        /**
         * client = new vehicleClientAdapter(vehicle)
         * result = client.setVibe(vibe)
         *
         * // update using result
         * Or, depending on the architecture, this update might be done by a vehicle service elsewhere in the system.
         * In which case, this seems likely to be async, and we would return {success: result} instead.
         */
        const updated = this.vehicleAdapter.update(vehicle.id, {vibe})
        return updated;
    }
}

export default VehicleService;