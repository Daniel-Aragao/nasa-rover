import { Directions } from "../../src/enums/directions";
import { Rover } from "../../src/models/rover";

describe("Rover creation", function () {
    it("should instantiate a name", function () {
        let rover = new Rover({
            X: 1,
            Y: 1,
            Z: Directions.E,
        });

        expect(rover.name).toBeTruthy();
    });

    it("should contain a name of size 11", function () {
        let rover = new Rover({
            X: 1,
            Y: 1,
            Z: Directions.E,
        });

        expect(rover.name.length).toBe(11);
    });

    it("should contain a name that contains the word Rover", function () {
        let rover = new Rover({
            X: 1,
            Y: 1,
            Z: Directions.E,
        });

        expect(rover.name).toContain("Rover ");
    });
});
