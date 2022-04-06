import driverDataAdapter from './dataAdapter.js'
import tripDataAdapter from '../trips/dataAdapter.js'
import logger from '../../lib/logger.js'

class DriverService {
    constructor(passengerId) {
        this.passengerId = passengerId;
        this.driverDataAdapter = driverDataAdapter;
        this.tripDataAdapter = tripDataAdapter;
    }

    static log = logger(import.meta);

    getAssigned(){
        const trip = this.tripDataAdapter.getCurrent(this.passengerId);
        if (trip === undefined) return;

        const driver = this.driverDataAdapter.get(trip.driverId);
        delete driver.assignedPhone;

        return driver;
    }

    getContact(){
        DriverService.log(`Getting assigned driver phone number for ${this.passengerId}`)
        const trip = this.tripDataAdapter.getCurrent(this.passengerId);
        if (trip === undefined) return;

        const {assignedPhone} = this.driverDataAdapter.get(trip.driverId);
        return {assignedPhone};
    }
}

export default DriverService;