Interface Trip: {
    id: string;
    passengerId: string;
    origin: Address;
    destination: Address;
    requested: Date;
    completed: Date;
    inProgress: bool;
    cancelled: bool;
    pickedUp?: Date;
    droppedOff?: Date;
    pickupEta: Date;
    dropoffEta: Date;
    estFare: {
        low: string;
        high: string;
    };
    paymentMethod: string;
    note: string;
    vehicleId: string;
    driverId: string;
}

Interface Address: {
    line1: string;
    line2: string;
    city: string;
    state: string;
    zip: string;
}