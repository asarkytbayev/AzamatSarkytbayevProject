/**
 * Defines the class for opening times.
 * Cannot be imported into other files on its own.
 */
class OpeningTimes {
    days: string;
    opening: string;
    closing: string;
    closed: boolean;
}

/**
 * Defines the class for reviews.
 */
export class Review {
    author: string;
    rating: number;
    reviewText: string;
};

/**
 * Defines the main class for a pitch
 */
export class Pitch {
    _id: string;
    name: string;
    address: string;
    rating: number;
    coords: [number];
    distance: number;
    facilities: string[];
    openingTimes: [OpeningTimes];
    reviews: [Review];
};