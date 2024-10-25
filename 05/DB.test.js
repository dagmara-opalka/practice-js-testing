import DB from './DB';

describe('DB', () => {
    let db;

    beforeEach(() => {
        db = new DB();
    });

    describe('insert', () => {
        it('should insert a new record', async () => {
            const data = { a: 1, b: 2 };
            const result = await db.insert(data);
            expect(result).toEqual({ id: 1, a: 1, b: 2 });
        });

        it('should assign an ID to new records', async () => {
            await db.insert({ a: 1 });
            const result = await db.insert({ a: 2 });
            expect(result.id).toBe(2); 
        });

        it('should reject if ID is not a number', async () => {
            await expect(db.insert({ id: 'a', a: 1 })).rejects.toEqual('ID can be only number!');
        });

        it('should reject if ID is duplicated', async () => {
            await db.insert({ id: 1, a: 1 });
            await expect(db.insert({ id: 1, a: 2 })).rejects.toEqual('ID can\'t be duplicated!');
        });
    });

    describe('select', () => {
        it('should return the correct record by ID', async () => {
            await db.insert({ id: 1, a: 1 });
            const result = await db.select(1);
            expect(result).toEqual({ id: 1, a: 1 });
        });

        it('should reject if the ID is not found', async () => {
            await expect(db.select(999)).rejects.toEqual('ID not found');
        });
    });

    describe('remove', () => {
        it('should remove a record by ID', async () => {
            await db.insert({ id: 1, a: 1 });
            await db.remove(1);
            await expect(db.select(1)).rejects.toEqual('ID not found');
        });

        it('should reject if trying to remove a non-existing record', async () => {
            await expect(db.remove(999)).rejects.toEqual('Item not exist!');
        });
    });

    describe('update', () => {
        it('should update an existing record', async () => {
            await db.insert({ id: 1, a: 1 });
            const updatedData = { id: 1, a: 2 };
            const result = await db.update(updatedData);
            expect(result).toEqual(updatedData);
        });

        it('should reject if ID is not set', async () => {
            await expect(db.update({ a: 1 })).rejects.toEqual('ID have to be set!');
        });

        it('should reject if the ID is not found', async () => {
            await expect(db.update({ id: 999 })).rejects.toEqual('ID not found!');
        });
    });

    describe('truncate', () => {
        it('should remove all records', async () => {
            await db.insert({ id: 1, a: 1 });
            await db.truncate();
            const result = await db.getRows();
            expect(result).toEqual([]);
        });
    });

    describe('getRows', () => {
        it('should return all records', async () => {
            await db.insert({ id: 1, a: 1 });
            await db.insert({ id: 2, b: 2 });
            const result = await db.getRows();
            expect(result).toEqual([{ id: 1, a: 1 }, { id: 2, b: 2 }]);
        });
    });
});
