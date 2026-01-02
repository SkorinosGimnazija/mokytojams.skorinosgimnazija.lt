class HtmlParser {
  private parser: DOMParser

  constructor() {
    this.parser = new DOMParser()
  }

  public parse(html: string) {
    return this.parser.parseFromString(html
        .replaceAll(/[\n\r]/g, ' ')
        .replaceAll('&nbsp;', ' ')
        .replaceAll(',,', '„'),
      'text/html')
  }
}

export const htmlParser = new HtmlParser()