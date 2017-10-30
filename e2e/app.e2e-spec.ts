import { KashmanPage } from './app.po';

describe('kashman App', function() {
  let page: KashmanPage;

  beforeEach(() => {
    page = new KashmanPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
