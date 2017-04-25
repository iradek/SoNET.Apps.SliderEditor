import { SoNET.Apps.SliderEditorPage } from './app.po';

describe('so-net.apps.slider-editor App', () => {
  let page: SoNET.Apps.SliderEditorPage;

  beforeEach(() => {
    page = new SoNET.Apps.SliderEditorPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
