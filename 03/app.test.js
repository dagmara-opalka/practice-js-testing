import randomNumber from './app';

test('powinno zwrócić 1, gdy min i max wynoszą 1', () => {
    expect(randomNumber(1, 1)).toBe(1);
});

test('powinno rzucić błąd, jeśli argumenty nie są liczbami', () => {
    expect(() => randomNumber('a', 'b')).toThrow();
});
test('powinno rzucić błąd, jeśli min jest większe niż max', () => {
    expect(() => randomNumber(5, 3)).toThrow();
});
test('powinno zwrócić liczbę w określonym przedziale', () => {
    const min = 1;
    const max = 10;
    const result = randomNumber(min, max);
    expect(result).toBeGreaterThanOrEqual(min);
    expect(result).toBeLessThanOrEqual(max);
});