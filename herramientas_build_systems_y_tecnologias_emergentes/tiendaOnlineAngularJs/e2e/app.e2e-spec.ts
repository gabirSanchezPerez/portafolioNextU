import { TiendaOnlineAngularJsPage } from './app.po';

describe('tienda-online-angular-js App', function() {
  let page: TiendaOnlineAngularJsPage;

  beforeEach(() => {
    page = new TiendaOnlineAngularJsPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('ang2 works!');
  });
});
