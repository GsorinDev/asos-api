import { CategoryEntity } from './category.entity';

describe('Category', () => {
  it('should be defined', () => {
    expect(new CategoryEntity()).toBeDefined();
  });
});
