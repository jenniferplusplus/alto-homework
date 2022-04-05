import tripAdapter from './dataAdapter.js'
import logger from '../../lib/logger.js'


class TripService{
    /***
     * I would normally like to do some dependency injection for the adapters needed by this kind of logic service.
     * But, this has already taken longer than is ideal.
     */
    constructor(passengerId) {
        this.passengerId = passengerId;
        this.tripAdapter = tripAdapter;
    }

    static log = logger(import.meta);

    getTrip(tripId){
        TripService.log(`Looking up ${tripId} for ${this.passengerId}`)
        const trip = this.tripAdapter.get(tripId, this.passengerId)
        return trip;
    }

    getTripInProgress(){
        TripService.log(`Looking up in progress trip for ${this.passengerId}`)
        const trip = this.tripAdapter.getCurrent(this.passengerId)
        return trip;
    }

    searchTrips(fromDate, toDate, includeCancelled){
        TripService.log(`Searching trips for ${this.passengerId}`)
        const trips = this.tripAdapter.query(fromDate, toDate, includeCancelled, this.passengerId);

        TripService.log(`Found ${trips.length} trips for ${this.passengerId}`);
        return trips;
    }

    cancelTrip(tripId){
        TripService.log(`Cancelling trip ${tripId} for ${this.passengerId}`)
        const trip = this.tripAdapter.get(tripId, this.passengerId)

        if (!trip){
            TripService.log(`Trip ${tripId} not found for ${this.passengerId}`)
            return;
        }

        if (!!trip.completed){
            TripService.log(`Trip ${tripId} has already been completed up and cannot be cancelled`)
            return {reason: "Already completed"};
        }
        else if (!!trip.pickedUp){
            TripService.log(`Trip ${tripId} has already been picked up and cannot be cancelled`)
            return {reason: "Already picked up"};
        }
        else if (trip.cancelled){
            TripService.log(`Trip ${tripId} is already cancelled`)
            return trip;
        }

        const cancelled = this.tripAdapter.update(tripId, {cancelled: true}, this.passengerId)
        return cancelled;
    }

    updateNote(tripId, note){
        TripService.log(`Updating note on trip ${tripId} for ${this.passengerId}`)
        const trip = this.tripAdapter.get(tripId, this.passengerId)

        if (!trip){
            TripService.log(`Trip ${tripId} not found for ${this.passengerId}`)
            return;
        }

        if (!!trip.completed){
            TripService.log(`Trip ${tripId} has already been completed up and cannot be updated`)
            return {reason: "Already completed"};
        }
        else if (!!trip.pickedUp){
            TripService.log(`Trip ${tripId} has already been picked up and cannot be updated`)
            return {reason: "Already picked up"};
        }
        else if (trip.cancelled){
            TripService.log(`Trip ${tripId} is cancelled and cannot be updated`)
            return {reason: "Trip is cancelled"};
        }

        const updated = this.tripAdapter.update(tripId, {note: note}, this.passengerId)
        return updated;
    }
}


export default TripService