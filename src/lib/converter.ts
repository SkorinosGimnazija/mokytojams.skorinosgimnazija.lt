export const htmlToMarkdown = (html: string) => {
  const norm = normalize(html);
  const md = markdown(norm);

  return md;
};

const markdown = (html: string) => {
  const md = html
    .replaceAll(/<[/]?span>/g, '')
    .replaceAll(/<(?:i|em)>(.*?)<\/(?:i|em)>/g, '*$1*')
    .replaceAll(/<(?:b|strong)>(.*?)<\/(?:b|strong)>/g, '**$1**')
    .replaceAll(/<a href="(.*?)">(.*?)<\/a>/g, (_, link: string, text: string) => {
      //encode link ?
      return `[${text}](${link})`;
    })
    .replaceAll(/<p>(.*?)<\/p>/g, (_, text: string) => {
      return `${text.trim()}\n\n`;
    })
    .replaceAll(
      /<li md-li-level="(.*?)" md-li-prefix="(.*?)" md-li-last="(.*?)">(.*?)<\/li>/g,
      (_, level: string, prefix: string, isLast: string, text: string) => {
        return '  '.repeat(Number(level) - 1) + `${prefix} ${text}\n${Number(isLast) ? '\n' : ''}`;
      }
    );

  return md.trim();
};

const normalize = (html: string) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(
    html.replaceAll(/\n|\r/g, ' ').replaceAll(/\s{2,}/g, ' '),
    'text/html'
  );
  const body = doc.body;

  for (const node of Array.from(body.childNodes)) {
    if (node.nodeType !== Node.ELEMENT_NODE) {
      node.remove();
    }
  }

  const listElements = body.querySelectorAll('p[class^="MsoListParagraph"]');

  for (const element of Array.from(listElements)) {
    const level = element.getAttribute('style')?.match(/level(\d+)/i)?.[1] ?? '1';
    const olNumber = element.childNodes[1]?.textContent?.match(/(\d+)/i)?.[0];
    const prefix = olNumber ? `${olNumber}.` : '-';
    const isLast =
      element.classList.contains('MsoListParagraphCxSpLast') ||
      element.classList.contains('MsoListParagraph');

    for (let i = 0; i <= 2; i++) {
      // remove ms word addiotional list stuff
      element.childNodes[0].remove();
    }

    const li = doc.createElement('li');
    li.innerHTML = element.innerHTML;
    li.setAttribute('md-li-level', level);
    li.setAttribute('md-li-prefix', prefix);
    li.setAttribute('md-li-last', String(Number(isLast)));

    element.replaceWith(li);
  }

  const allElements = body.querySelectorAll('*');
  const removeTags = ['o:p', 'v:f', 'v:shapetype', 'v:shape', 'v:imagedata'];
  const saveAttributes = ['href', 'md-li-level', 'md-li-prefix', 'md-li-last'];

  for (const element of Array.from(allElements)) {
    if (removeTags.includes(element.tagName.toLowerCase())) {
      element.remove();
      continue;
    }

    for (const attribute of Array.from(element.attributes)) {
      const name = attribute.name;
      if (!saveAttributes.includes(name)) {
        element.removeAttribute(name);
      }
    }
  }

  for (const element of Array.from(allElements)) {
    const text = element.textContent;
    if (!text) {
      element.remove();
    }
  }

  return body.innerHTML;
};
