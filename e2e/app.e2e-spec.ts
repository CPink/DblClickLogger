import { DblclickloggerPage } from './app.po';

describe('dblclicklogger App', () => {
  let page: DblclickloggerPage;

  beforeEach(() => {
    page = new DblclickloggerPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
