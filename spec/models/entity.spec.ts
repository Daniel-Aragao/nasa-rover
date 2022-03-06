import { Entity } from "../../src/models/entity";
import { Directions } from "../../src/enums/directions";
import { Direction } from "../../src/interfaces/models/direction";
import { Movement } from "../../src/enums/movement";

describe("Entity model nameGenerator", function () {
    it("should return the size 5", function () {
        let name = Entity.nameGenerator();

        expect(name.length).toBe(5);
    });

    it("should return the size 15", function () {
        let name = Entity.nameGenerator(15);

        expect(name.length).toBe(15);
    });
});

describe("Entity model after created", () => {
    let entity: Entity;
    let name = "Test entity";
    let defaultDirection: Direction = {
        X: 5,
        Y: 5,
        Z: Directions.N,
    };

    beforeEach(() => {
        entity = new Entity(defaultDirection, name);
    });

    it("should return a named entity", () => {
        expect(entity.name.length).toBe(name.length);
    });

    it("should return a named entity with default params", () => {
        entity = new Entity({
            X: 5,
            Y: 5,
            Z: Directions.N,
        });

        expect(entity.name.length).toBe(5);
    });

    it("should return the default direction", () => {
        expect(entity.direction.X).toBe(defaultDirection.X);
        expect(entity.direction.Y).toBe(defaultDirection.Y);
        expect(entity.direction.Z).toBe(defaultDirection.Z);
    });

    it("should return the default direction", () => {
        expect(entity.direction.X).toBe(defaultDirection.X);
        expect(entity.direction.Y).toBe(defaultDirection.Y);
        expect(entity.direction.Z).toBe(defaultDirection.Z);
    });

    it("should return different direction objects", () => {
        expect(entity.direction === defaultDirection).toBeFalse();
    });
});

describe("Entity model generateMovement method", () => {
    let entity: Entity;
    let name = "Test entity";
    let defaultDirection: Direction = {
        X: 5,
        Y: 5,
        Z: Directions.N,
    };

    beforeEach(() => {
        entity = new Entity(defaultDirection, name);
    });

    it("should return a MovementConfirmation object", () => {
        let movementRequest = entity.generateMovement(Movement.L);

        expect(movementRequest.apply).toBeTruthy();
        expect(movementRequest.direction).toBeTruthy();
    });

    it("should not return the same direction object called", () => {
        let movementRequest = entity.generateMovement(Movement.L);

        expect(movementRequest.direction === entity.direction).toBeFalse();
    });

    it("should return direction W when passed L", () => {
        let movementRequest = entity.generateMovement(Movement.L);

        expect(movementRequest.direction.Z).toBe(Directions.W);
    });

    it("should return direction E when passed R", () => {
        let movementRequest = entity.generateMovement(Movement.R);

        expect(movementRequest.direction.Z).toBe(Directions.E);
    });

    it("should not change X and Y when passed L", () => {
        let movementRequest = entity.generateMovement(Movement.L);

        expect(movementRequest.direction.X).toBe(entity.direction.X);
        expect(movementRequest.direction.Y).toBe(entity.direction.Y);
    });

    it("should not change X and Y when passed R", () => {
        let movementRequest = entity.generateMovement(Movement.R);

        expect(movementRequest.direction.X).toBe(entity.direction.X);
        expect(movementRequest.direction.Y).toBe(entity.direction.Y);
    });

    it("should not change Z when passed M", () => {
        let movementRequest = entity.generateMovement(Movement.M);

        expect(movementRequest.direction.Z).toBe(Directions.N);
    });

    it("should the returned apply method apply directions to the entity", () => {
        let movementRequest = entity.generateMovement(Movement.L);
        movementRequest.apply();

        expect(entity.direction.X).toBe(movementRequest.direction.X);
        expect(entity.direction.Y).toBe(movementRequest.direction.Y);
        expect(entity.direction.Z).toBe(movementRequest.direction.Z);
    });

    it("should return direction W when applying L 4 times", () => {
        let movementRequest = entity.generateMovement(Movement.L);
        movementRequest.apply();
        movementRequest.apply();
        movementRequest.apply();

        expect(movementRequest.direction.Z).toBe(Directions.W);
    });

    it("should return direction W when applying L 5 times", () => {
        let movementRequest = entity.generateMovement(Movement.L);
        movementRequest.apply();
        movementRequest = entity.generateMovement(Movement.L);
        movementRequest.apply();
        movementRequest = entity.generateMovement(Movement.L);
        movementRequest.apply();
        movementRequest = entity.generateMovement(Movement.L);
        movementRequest.apply();
        movementRequest = entity.generateMovement(Movement.L);
        movementRequest.apply();

        expect(movementRequest.direction.Z).toBe(Directions.W);
    });

    it("should return direction.Y equals 6 when passing M", () => {
        let movementRequest = entity.generateMovement(Movement.M);

        expect(movementRequest.direction.Y).toBe(6);
    });

    it("should not change direction.X when passing M", () => {
        let movementRequest = entity.generateMovement(Movement.M);

        expect(movementRequest.direction.X).toBe(5);
    });

    it("should return direction.X equals 6 when passing R and M", () => {
        let movementRequest = entity.generateMovement(Movement.R);
        movementRequest.apply();
        movementRequest = entity.generateMovement(Movement.M);

        expect(movementRequest.direction.X).toBe(6);
    });

    it("should not change direction.Y when passing R M", () => {
        let movementRequest = entity.generateMovement(Movement.R);
        movementRequest.apply();
        movementRequest = entity.generateMovement(Movement.M);

        expect(movementRequest.direction.Y).toBe(5);
    });
});
