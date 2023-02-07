import { ArticleEntity } from './article.entity';

describe('Article', () => {
  it('should be defined', () => {
    expect(new ArticleEntity()).toBeDefined();
  });
});
